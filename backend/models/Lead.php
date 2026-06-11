<?php
require_once __DIR__ . '/../config/db.php';

class Lead
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function findAll(string $search = '', string $status = ''): array
    {
        $sql    = 'SELECT * FROM leads WHERE 1=1';
        $params = [];

        if ($search !== '') {
            $sql      .= ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)';
            $like      = "%{$search}%";
            $params[]  = $like;
            $params[]  = $like;
            $params[]  = $like;
        }

        if ($status !== '') {
            $sql      .= ' AND status = ?';
            $params[]  = $status;
        }

        $sql .= ' ORDER BY created_at DESC';

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function findById(int $id): array|false
    {
        $stmt = $this->db->prepare('SELECT * FROM leads WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO leads (name, email, phone, status, source, notes)
             VALUES (:name, :email, :phone, :status, :source, :notes)'
        );
        $stmt->execute([
            ':name'   => $data['name'],
            ':email'  => $data['email'],
            ':phone'  => $data['phone'],
            ':status' => $data['status'] ?? 'New',
            ':source' => $data['source'] ?? 'Website',
            ':notes'  => $data['notes']  ?? '',
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $stmt = $this->db->prepare(
            'UPDATE leads SET name=:name, email=:email, phone=:phone,
             status=:status, source=:source, notes=:notes,
             updated_at=CURRENT_TIMESTAMP
             WHERE id=:id'
        );
        return $stmt->execute([
            ':name'   => $data['name'],
            ':email'  => $data['email'],
            ':phone'  => $data['phone'],
            ':status' => $data['status'],
            ':source' => $data['source'] ?? 'Website',
            ':notes'  => $data['notes']  ?? '',
            ':id'     => $id,
        ]);
    }

    public function bulkUpdateStatus(array $ids, string $status): int
    {
        if (empty($ids)) return 0;
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $params       = array_merge($ids, [$status]);
        $stmt         = $this->db->prepare(
            "UPDATE leads SET status=?, updated_at=CURRENT_TIMESTAMP
             WHERE id IN ({$placeholders})"
        );
        // Note: parameter order — status first, then IDs
        $stmt->execute(array_merge([$status], $ids));
        return $stmt->rowCount();
    }
    public function deleteById(int $id): bool
    {
        // Write the SQL to delete the lead with the given $id
        $stmt = $this->db->prepare('DELETE FROM leads WHERE id = ?');
        $stmt->execute([$id]);
        // Return true if the lead was deleted (affected rows > 0)
        return $stmt->rowCount() > 0;
    }
}
