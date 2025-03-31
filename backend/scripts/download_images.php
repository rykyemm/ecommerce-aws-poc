<?php
/**
 * Script pour télécharger des images d'exemple pour les produits
 */

$images = [
    'iphone13.jpg' => 'https://via.placeholder.com/500x500?text=iPhone+13',
    'galaxys21.jpg' => 'https://via.placeholder.com/500x500?text=Samsung+Galaxy+S21',
    'macbookpro.jpg' => 'https://via.placeholder.com/500x500?text=MacBook+Pro',
    'dellxps15.jpg' => 'https://via.placeholder.com/500x500?text=Dell+XPS+15',
    'airpodspro.jpg' => 'https://via.placeholder.com/500x500?text=AirPods+Pro',
    'ipadpro.jpg' => 'https://via.placeholder.com/500x500?text=iPad+Pro',
    'applewatch7.jpg' => 'https://via.placeholder.com/500x500?text=Apple+Watch+7',
    'sonywh1000xm4.jpg' => 'https://via.placeholder.com/500x500?text=Sony+WH-1000XM4',
    'nintendoswitch.jpg' => 'https://via.placeholder.com/500x500?text=Nintendo+Switch'
];

$targetDir = __DIR__ . '/../public/images/products/';

// Créer le dossier s'il n'existe pas
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Télécharger chaque image
foreach ($images as $filename => $url) {
    $targetFile = $targetDir . $filename;
    
    if (!file_exists($targetFile)) {
        echo "Téléchargement de $filename...\n";
        
        $imageData = file_get_contents($url);
        if ($imageData !== false) {
            if (file_put_contents($targetFile, $imageData)) {
                echo "✓ $filename téléchargé avec succès\n";
            } else {
                echo "✗ Erreur lors de l'enregistrement de $filename\n";
            }
        } else {
            echo "✗ Erreur lors du téléchargement de $filename\n";
        }
    } else {
        echo "✓ $filename existe déjà\n";
    }
}

echo "\nTéléchargement terminé !\n"; 