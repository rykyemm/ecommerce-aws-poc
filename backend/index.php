<?php
/**
 * Point d'entrée principal de l'API
 */

// Activer l'affichage des erreurs en développement
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Headers pour API
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Gérer les requêtes OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Charger l'autoloader (à implémenter avec Composer)
require_once __DIR__ . '/vendor/autoload.php';

// URI de la requête
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri_segments = explode('/', trim($request_uri, '/'));

// Déterminer le contrôleur et l'action
$api_prefix = 'api';
$controller = 'Product'; // Par défaut
$action = 'index';       // Par défaut
$params = [];

if (isset($uri_segments[1]) && $uri_segments[1] === $api_prefix) {
    if (isset($uri_segments[2])) {
        $controller = ucfirst($uri_segments[2]);
    }
    
    if (isset($uri_segments[3])) {
        $action = $uri_segments[3];
    }
    
    // Récupérer les paramètres supplémentaires
    for ($i = 4; $i < count($uri_segments); $i++) {
        $params[] = $uri_segments[$i];
    }
}

// Nom complet de la classe du contrôleur
$controller_name = "App\\Controllers\\{$controller}Controller";

// Vérifier si le contrôleur existe
if (!class_exists($controller_name)) {
    http_response_code(404);
    echo json_encode(['error' => 'Controller not found']);
    exit;
}

// Créer une instance du contrôleur et appeler l'action
$controller_instance = new $controller_name();

// Vérifier si la méthode existe
if (!method_exists($controller_instance, $action)) {
    http_response_code(404);
    echo json_encode(['error' => 'Action not found']);
    exit;
}

// Appeler la méthode (action) du contrôleur avec les paramètres
call_user_func_array([$controller_instance, $action], $params); 