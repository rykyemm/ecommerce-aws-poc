<?php
namespace App\Controllers;

use App\Models\Product;
use App\Models\Database;

class ProductController {
    private $db;
    private $product;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
        $this->product = new Product($this->db);
    }

    /**
     * API pour récupérer tous les produits
     */
    public function index() {
        try {
            $products = $this->product->findAll();
            
            // Si aucun produit n'est trouvé, retourner des données mockées
            if (empty($products)) {
                $products = [
                    [
                        'id' => 1,
                        'name' => 'iPhone 13',
                        'description' => 'Smartphone Apple avec écran Super Retina XDR',
                        'price' => 999.99,
                        'stock_quantity' => 50,
                        'category_id' => 4,
                        'category_name' => 'Smartphones',
                        'image_url' => 'iphone13.txt'
                    ],
                    [
                        'id' => 2,
                        'name' => 'Samsung Galaxy S21',
                        'description' => 'Smartphone Samsung avec écran Dynamic AMOLED',
                        'price' => 799.99,
                        'stock_quantity' => 75,
                        'category_id' => 4,
                        'category_name' => 'Smartphones',
                        'image_url' => 'galaxys21.txt'
                    ],
                    [
                        'id' => 3,
                        'name' => 'MacBook Pro',
                        'description' => 'Ordinateur portable Apple avec puce M1',
                        'price' => 1299.99,
                        'stock_quantity' => 30,
                        'category_id' => 5,
                        'category_name' => 'Ordinateurs',
                        'image_url' => 'macbookpro.txt'
                    ],
                    [
                        'id' => 4,
                        'name' => 'Dell XPS 15',
                        'description' => 'Ordinateur portable Dell avec écran InfinityEdge',
                        'price' => 1199.99,
                        'stock_quantity' => 25,
                        'category_id' => 5,
                        'category_name' => 'Ordinateurs',
                        'image_url' => 'dellxps15.txt'
                    ]
                ];
            }

            // Ajouter l'URL complète pour chaque image
            foreach ($products as &$product) {
                if (!isset($product['image_url']) || empty($product['image_url'])) {
                    // Utiliser un fichier texte par défaut basé sur le nom du produit
                    $defaultImage = strtolower(str_replace(' ', '', $product['name'])) . '.txt';
                    $product['image_url'] = '/images/products/' . $defaultImage;
                } else {
                    $product['image_url'] = '/images/products/' . $product['image_url'];
                }
            }

            echo json_encode(['records' => $products]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * API pour récupérer un produit par ID
     * 
     * @param int $id ID du produit
     */
    public function read($id) {
        if (!isset($id)) {
            http_response_code(400);
            echo json_encode(["message" => "ID du produit non fourni."]);
            return;
        }

        if ($this->product->getOne($id)) {
            $product_arr = [
                "id" => $this->product->id,
                "name" => $this->product->name,
                "description" => $this->product->description,
                "price" => $this->product->price,
                "stock_quantity" => $this->product->stock_quantity,
                "category_id" => $this->product->category_id,
                "category_name" => $this->product->category_name,
                "image_url" => $this->product->image_url
            ];

            http_response_code(200);
            echo json_encode($product_arr);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Produit non trouvé."]);
        }
    }

    /**
     * API pour créer un produit
     */
    public function create() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Gérer l'upload de l'image si présente
            if (isset($_FILES['image'])) {
                $imageController = new ImageController();
                $imageResult = $imageController->upload();
                
                if (isset($imageResult['filename'])) {
                    $data['image_url'] = $imageResult['filename'];
                }
            }

            $result = $this->product->create($data);
            echo json_encode($result);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * API pour mettre à jour un produit
     * 
     * @param int $id ID du produit à mettre à jour
     */
    public function update($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Gérer l'upload de la nouvelle image si présente
            if (isset($_FILES['image'])) {
                $imageController = new ImageController();
                $imageResult = $imageController->upload();
                
                if (isset($imageResult['filename'])) {
                    // Supprimer l'ancienne image si elle existe
                    $oldProduct = $this->product->findById($id);
                    if ($oldProduct && isset($oldProduct['image_url'])) {
                        $imageController->delete($oldProduct['image_url']);
                    }
                    
                    $data['image_url'] = $imageResult['filename'];
                }
            }

            $result = $this->product->update($id, $data);
            echo json_encode($result);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * API pour supprimer un produit
     * 
     * @param int $id ID du produit à supprimer
     */
    public function delete($id) {
        try {
            // Supprimer l'image associée si elle existe
            $product = $this->product->findById($id);
            if ($product && isset($product['image_url'])) {
                $imageController = new ImageController();
                $imageController->delete($product['image_url']);
            }

            $result = $this->product->delete($id);
            echo json_encode($result);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * API pour rechercher des produits
     * 
     * @param string $keywords Mots-clés à rechercher
     */
    public function search($keywords = '') {
        if (empty($keywords)) {
            $keywords = isset($_GET['q']) ? $_GET['q'] : '';
        }

        if (empty($keywords)) {
            http_response_code(400);
            echo json_encode(["message" => "Aucun terme de recherche fourni."]);
            return;
        }

        $stmt = $this->product->search($keywords);
        $num = $stmt->rowCount();

        if ($num > 0) {
            $products_arr = [];
            $products_arr["records"] = [];

            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                extract($row);

                $product_item = [
                    "id" => $id,
                    "name" => $name,
                    "description" => $description,
                    "price" => $price,
                    "stock_quantity" => $stock_quantity,
                    "category_id" => $category_id,
                    "category_name" => $category_name,
                    "image_url" => $image_url
                ];

                array_push($products_arr["records"], $product_item);
            }

            http_response_code(200);
            echo json_encode($products_arr);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Aucun produit trouvé pour cette recherche."]);
        }
    }
} 