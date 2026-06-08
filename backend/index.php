<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db/init.php';
require_once __DIR__ . '/controllers/LeadController.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');
$method = $_SERVER['REQUEST_METHOD'];

try {
    // POST /api/leads/bulk-status  (must be checked before :id route)
    if ($method === 'POST' && $uri === '/api/leads/bulk-status') {
        (new LeadController())->bulkStatus();
        exit();
    }

    // /api/leads/:id
    if (preg_match('#^/api/leads/(\d+)$#', $uri, $m)) {
        $ctrl = new LeadController();
        $id   = (int) $m[1];
        match ($method) {
            'GET'    => $ctrl->getOne($id),
            'PUT'    => $ctrl->update($id),
            'DELETE' => $ctrl->delete($id),
            default  => throw new RuntimeException('Method Not Allowed', 405),
        };
        exit();
    }

    // /api/leads
    if ($uri === '/api/leads') {
        $ctrl = new LeadController();
        match ($method) {
            'GET'  => $ctrl->getAll(),
            'POST' => $ctrl->create(),
            default => throw new RuntimeException('Method Not Allowed', 405),
        };
        exit();
    }

    // Health check
    if ($uri === '/api/health') {
        echo json_encode(['status' => 'ok', 'timestamp' => date('c')]);
        exit();
    }

    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);

} catch (RuntimeException $e) {
    $code = $e->getCode() ?: 500;
    http_response_code($code);
    echo json_encode(['error' => $e->getMessage()]);
}
