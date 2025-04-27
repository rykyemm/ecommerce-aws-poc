<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

use App\Config\Database;

try {
    $db = Database::getInstance();
    $pdo = $db->getConnection();
    
    // Ajout de catégories sportives
    $categories = [
        ['Sport', 'Équipement et accessoires de sport', null],
        ['Chaussures de Sport', 'Chaussures pour différentes activités sportives', 9],
        ['Vêtements de Sport', 'Vêtements techniques pour le sport', 9],
        ['Équipement de Fitness', 'Matériel et accessoires de fitness', 9],
        ['Sports Collectifs', 'Équipement pour les sports d\'équipe', 9]
    ];
    
    $stmt = $pdo->prepare("INSERT INTO categories (name, description, parent_id) VALUES (?, ?, ?)");
    foreach ($categories as $category) {
        $stmt->execute($category);
    }
    
    // Ajout de produits sportifs
    $products = [
        ['Chaussures de Running Nike', 'Chaussures de running légères et confortables', 129.99, 30, 10, 'sport-shoes.jpg'],
        ['Veste de Sport Adidas', 'Veste respirante pour les activités sportives', 79.99, 40, 11, 'sport-clothing.jpg'],
        ['Haltères Fitness', 'Set d\'haltères ajustables pour l\'entraînement', 89.99, 20, 12, 'fitness-equipment.jpg'],
        ['Ballon de Football', 'Ballon de football officiel taille 5', 29.99, 50, 13, 'team-sports.jpg']
    ];
    
    $stmt = $pdo->prepare("INSERT INTO products (name, description, price, stock_quantity, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($products as $product) {
        $stmt->execute($product);
    }
    
    echo json_encode(['success' => true, 'message' => 'Produits sportifs ajoutés avec succès']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'ajout des produits: ' . $e->getMessage()]);
} 