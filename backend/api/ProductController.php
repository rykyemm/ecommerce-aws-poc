<?php
namespace App\Controllers;

use App\Models\Product;

class ProductController {
    private $product;

    public function __construct() {
        $this->product = new Product();
    }

    /**
     * API pour récupérer tous les produits
     */
    public function index() {
        // Récupérer les produits
        $stmt = $this->product->getAll();
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
            echo json_encode(["message" => "Aucun produit trouvé."]);
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
        // Récupérer les données POST
        $data = json_decode(file_get_contents("php://input"));

        if (
            !empty($data->name) &&
            !empty($data->price) &&
            !empty($data->stock_quantity)
        ) {
            // Définir les valeurs du produit
            $this->product->name = $data->name;
            $this->product->description = $data->description ?? "";
            $this->product->price = $data->price;
            $this->product->stock_quantity = $data->stock_quantity;
            $this->product->category_id = $data->category_id ?? null;
            $this->product->image_url = $data->image_url ?? null;

            if ($this->product->create()) {
                http_response_code(201);
                echo json_encode([
                    "message" => "Produit créé avec succès.",
                    "id" => $this->product->id
                ]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Impossible de créer le produit."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
        }
    }

    /**
     * API pour mettre à jour un produit
     * 
     * @param int $id ID du produit à mettre à jour
     */
    public function update($id) {
        if (!isset($id)) {
            http_response_code(400);
            echo json_encode(["message" => "ID du produit non fourni."]);
            return;
        }

        // Récupérer les données PUT
        $data = json_decode(file_get_contents("php://input"));

        if (!$this->product->getOne($id)) {
            http_response_code(404);
            echo json_encode(["message" => "Produit non trouvé."]);
            return;
        }

        // Mettre à jour les propriétés si elles sont fournies
        if (isset($data->name)) $this->product->name = $data->name;
        if (isset($data->description)) $this->product->description = $data->description;
        if (isset($data->price)) $this->product->price = $data->price;
        if (isset($data->stock_quantity)) $this->product->stock_quantity = $data->stock_quantity;
        if (isset($data->category_id)) $this->product->category_id = $data->category_id;
        if (isset($data->image_url)) $this->product->image_url = $data->image_url;

        if ($this->product->update()) {
            http_response_code(200);
            echo json_encode(["message" => "Produit mis à jour avec succès."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Impossible de mettre à jour le produit."]);
        }
    }

    /**
     * API pour supprimer un produit
     * 
     * @param int $id ID du produit à supprimer
     */
    public function delete($id) {
        if (!isset($id)) {
            http_response_code(400);
            echo json_encode(["message" => "ID du produit non fourni."]);
            return;
        }

        if (!$this->product->getOne($id)) {
            http_response_code(404);
            echo json_encode(["message" => "Produit non trouvé."]);
            return;
        }

        if ($this->product->delete()) {
            http_response_code(200);
            echo json_encode(["message" => "Produit supprimé avec succès."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Impossible de supprimer le produit."]);
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