<?php

require_once 'ProductController.php';

// Fonction pour gérer les réponses API
function sendResponse($response) {
    http_response_code($response['status']);
    echo json_encode($response);
    exit;
}

// Récupérer la méthode HTTP et l'URL
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$endpoint = $request[0] ?? '';

// Instancier le contrôleur de produits
$productController = new ProductController();

// Router
switch($endpoint) {
    case 'products':
        switch($method) {
            case 'GET':
                if (isset($request[1])) {
                    // GET /api/products/{id}
                    $response = $productController->show($request[1]);
                } else {
                    // GET /api/products
                    $response = $productController->index();
                }
                break;
                
            case 'POST':
                // POST /api/products
                $data = json_decode(file_get_contents('php://input'), true);
                $response = $productController->create($data);
                break;
                
            case 'PUT':
                if (!isset($request[1])) {
                    $response = ['status' => 400, 'error' => 'Product ID required'];
                } else {
                    // PUT /api/products/{id}
                    $data = json_decode(file_get_contents('php://input'), true);
                    $response = $productController->update($request[1], $data);
                }
                break;
                
            case 'DELETE':
                if (!isset($request[1])) {
                    $response = ['status' => 400, 'error' => 'Product ID required'];
                } else {
                    // DELETE /api/products/{id}
                    $response = $productController->delete($request[1]);
                }
                break;
                
            default:
                $response = ['status' => 405, 'error' => 'Method not allowed'];
        }
        break;
        
    default:
        $response = ['status' => 404, 'error' => 'Endpoint not found'];
}

// Envoyer la réponse
sendResponse($response); 