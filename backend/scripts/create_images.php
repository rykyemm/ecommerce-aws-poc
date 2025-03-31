<?php
/**
 * Script pour créer des fichiers texte d'exemple pour les produits
 */

$images = [
    'iphone13.txt' => 'iPhone 13',
    'galaxys21.txt' => 'Samsung Galaxy S21',
    'macbookpro.txt' => 'MacBook Pro',
    'dellxps15.txt' => 'Dell XPS 15',
    'airpodspro.txt' => 'AirPods Pro',
    'ipadpro.txt' => 'iPad Pro',
    'applewatch7.txt' => 'Apple Watch 7',
    'sonywh1000xm4.txt' => 'Sony WH-1000XM4',
    'nintendoswitch.txt' => 'Nintendo Switch'
];

$targetDir = __DIR__ . '/../public/images/products/';

// Créer le dossier s'il n'existe pas
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Créer chaque fichier
foreach ($images as $filename => $text) {
    $targetFile = $targetDir . $filename;
    
    if (!file_exists($targetFile)) {
        echo "Création de $filename...\n";
        
        if (file_put_contents($targetFile, $text)) {
            echo "✓ $filename créé avec succès\n";
        } else {
            echo "✗ Erreur lors de la création de $filename\n";
        }
    } else {
        echo "✓ $filename existe déjà\n";
    }
}

echo "\nCréation terminée !\n"; 