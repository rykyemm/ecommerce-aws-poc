<?php
namespace App\Controllers;

class ImageController {
    private $uploadDir = __DIR__ . '/../public/images/products/';
    private $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    private $maxFileSize = 5242880; // 5MB

    public function upload() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            return;
        }

        if (!isset($_FILES['image'])) {
            http_response_code(400);
            echo json_encode(['error' => 'No image file provided']);
            return;
        }

        $file = $_FILES['image'];
        
        // Vérifier le type de fichier
        if (!in_array($file['type'], $this->allowedTypes)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid file type. Only JPG, PNG and GIF are allowed']);
            return;
        }

        // Vérifier la taille du fichier
        if ($file['size'] > $this->maxFileSize) {
            http_response_code(400);
            echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
            return;
        }

        // Générer un nom de fichier unique
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $targetPath = $this->uploadDir . $filename;

        // Déplacer le fichier
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            echo json_encode([
                'success' => true,
                'filename' => $filename,
                'path' => '/images/products/' . $filename
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to upload file']);
        }
    }

    public function delete($filename) {
        $filepath = $this->uploadDir . $filename;
        
        if (file_exists($filepath) && unlink($filepath)) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'File not found']);
        }
    }
} 