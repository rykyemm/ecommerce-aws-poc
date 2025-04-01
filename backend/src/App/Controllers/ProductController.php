<?php
namespace App\Controllers;

use App\Models\Product;
use App\Config\Database;
use PDO;
use PDOException;

class ProductController {
    private $db;
    private $product;

    public function __construct() {
        try {
            $database = new Database();
            $this->db = $database->getConnection();
            $this->product = new Product($this->db);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed']);
            exit;
        }
    }

    /**
     * API pour récupérer tous les produits
     */
    public function index() {
        try {
            $stmt = $this->db->query("SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode([
                'status' => 200,
                'data' => $products
            ]);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'error' => 'Failed to fetch products'
            ]);
        }
    }

    /**
     * API pour récupérer un produit par ID
     * 
     * @param int $id ID du produit
     */
    public function show($id) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$product) {
                return [
                    'status' => 404,
                    'error' => 'Product not found'
                ];
            }
            
            return [
                'status' => 200,
                'data' => $product
            ];
        } catch(PDOException $e) {
            return [
                'status' => 500,
                'error' => 'Failed to fetch product'
            ];
        }
    }

    /**
     * API pour créer un produit
     */
    public function create($data) {
        try {
            $stmt = $this->db->prepare("INSERT INTO products (name, description, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['description'],
                $data['price'],
                $data['stock_quantity'],
                $data['category_id']
            ]);
            
            return [
                'status' => 201,
                'data' => [
                    'id' => $this->db->lastInsertId(),
                    'message' => 'Product created successfully'
                ]
            ];
        } catch(PDOException $e) {
            return [
                'status' => 500,
                'error' => 'Failed to create product'
            ];
        }
    }

    /**
     * API pour mettre à jour un produit
     * 
     * @param int $id ID du produit à mettre à jour
     */
    public function update($id, $data) {
        try {
            $stmt = $this->db->prepare("UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ? WHERE id = ?");
            $stmt->execute([
                $data['name'],
                $data['description'],
                $data['price'],
                $data['stock_quantity'],
                $data['category_id'],
                $id
            ]);
            
            if ($stmt->rowCount() === 0) {
                return [
                    'status' => 404,
                    'error' => 'Product not found'
                ];
            }
            
            return [
                'status' => 200,
                'data' => [
                    'message' => 'Product updated successfully'
                ]
            ];
        } catch(PDOException $e) {
            return [
                'status' => 500,
                'error' => 'Failed to update product'
            ];
        }
    }

    /**
     * API pour supprimer un produit
     * 
     * @param int $id ID du produit à supprimer
     */
    public function delete($id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() === 0) {
                return [
                    'status' => 404,
                    'error' => 'Product not found'
                ];
            }
            
            return [
                'status' => 200,
                'data' => [
                    'message' => 'Product deleted successfully'
                ]
            ];
        } catch(PDOException $e) {
            return [
                'status' => 500,
                'error' => 'Failed to delete product'
            ];
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