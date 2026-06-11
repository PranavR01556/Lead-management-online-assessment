<?php
require_once __DIR__ . '/../models/Lead.php';

class LeadController
{
    private Lead $model;

    public function __construct()
    {
        $this->model = new Lead();
    }

    // GET /api/leads?search=&status=
    public function getAll(): void
    {
        $search = trim($_GET['search'] ?? '');
        $status = trim($_GET['status'] ?? '');
        $leads  = $this->model->findAll($search, $status);
        echo json_encode(['data' => $leads, 'total' => count($leads)]);
    }

    // GET /api/leads/:id
    public function getOne(int $id): void
    {
        $lead = $this->model->findById($id);
        if (!$lead) {
            http_response_code(404);
            echo json_encode(['error' => 'Lead not found']);
            return;
        }
        echo json_encode(['data' => $lead]);
    }

    // POST /api/leads
    public function create(): void
    {
        $body = $this->parseBody();
        $errors = $this->validate($body);

        if (!empty($errors)) {
            http_response_code(422);
            echo json_encode(['errors' => $errors]);
            return;
        }

        $id   = $this->model->create($body);
        $lead = $this->model->findById($id);
        http_response_code(201);
        echo json_encode(['data' => $lead, 'message' => 'Lead created successfully']);
    }

    // PUT /api/leads/:id
    public function update(int $id): void
    {
        $existing = $this->model->findById($id);
        if (!$existing) {
            http_response_code(404);
            echo json_encode(['error' => 'Lead not found']);
            return;
        }

        $body   = $this->parseBody();
        $errors = $this->validate($body);

        if (!empty($errors)) {
            http_response_code(422);
            echo json_encode(['errors' => $errors]);
            return;
        }

        $this->model->update($id, $body);
        $lead = $this->model->findById($id);
        echo json_encode(['data' => $lead, 'message' => 'Lead updated successfully']);
    }

    // POST /api/leads/bulk-status
    public function bulkStatus(): void
    {
        $body   = $this->parseBody();
        $ids    = $body['ids']    ?? [];
        $status = $body['status'] ?? '';

        $allowedStatuses = ['New', 'Contacted', 'Qualified', 'Lost'];

        if (empty($ids) || !is_array($ids)) {
            http_response_code(422);
            echo json_encode(['error' => 'ids array is required']);
            return;
        }

        if (!in_array($status, $allowedStatuses)) {
            http_response_code(422);
            echo json_encode(['error' => 'Invalid status value']);
            return;
        }

        $ids     = array_map('intval', $ids);
        $updated = $this->model->bulkUpdateStatus($ids, $status);
        echo json_encode(['message' => "{$updated} lead(s) updated", 'updated' => $updated]);
    }

    // DELETE /api/leads/:id
    public function delete(int $id): void
    {
        // TODO: Check if the lead exists first (return 404 if not found)
        // TODO: Call $this->model->deleteById($id) to delete it
        // TODO: Return HTTP 204 (No Content) on success
        // http_response_code(501);
        // echo json_encode(['error' => 'Delete not implemented yet']);
        $existing = $this->model->findById($id);

        if (!$existing) {
            http_response_code(404);
            echo json_encode(['error' => 'Lead not found']);
            return;
        }

        $this->model->deleteById($id);

        http_response_code(204);
    }

    // ─── helpers ───────────────────────────────────────────────

    private function parseBody(): array
    {
        $raw = file_get_contents('php://input');
        return json_decode($raw, true) ?? [];
    }

    private function validate(array $data): array
    {
        $errors = [];
        if (empty(trim($data['name'] ?? '')))  $errors['name']  = 'Name is required';
        if (empty(trim($data['email'] ?? ''))) $errors['email'] = 'Email is required';
        elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Invalid email format';
        }
        if (empty(trim($data['phone'] ?? ''))) $errors['phone'] = 'Phone is required';
        return $errors;
    }
}
