<?php
namespace App\Models;

use PDO;
use App\Config\Database;

class Product {
    // Connexion à la base de données et nom de la table
    private $conn;
    private $table = "products";

    // Propriétés
    public $id;
    public $name;
    public $description;
    public $price;
    public $stock_quantity;
    public $category_id;
    public $image_url;
    public $created_at;
    public $updated_at;
    public $category_name;

    /**
     * Constructeur avec $db comme connexion à la base de données
     */
    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Récupérer tous les produits
     * 
     * @return PDOStatement
     */
    public function getAll() {
        $query = "SELECT
                    p.id, p.name, p.description, p.price, p.stock_quantity,
                    p.category_id, p.image_url, p.created_at, p.updated_at,
                    c.name as category_name
                FROM
                    " . $this->table . " p
                    LEFT JOIN
                        categories c ON p.category_id = c.id
                ORDER BY
                    p.created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    /**
     * Récupérer un seul produit
     * 
     * @param int $id ID du produit
     * @return bool
     */
    public function getOne($id) {
        $query = "SELECT
                    p.id, p.name, p.description, p.price, p.stock_quantity,
                    p.category_id, p.image_url, p.created_at, p.updated_at,
                    c.name as category_name
                FROM
                    " . $this->table . " p
                    LEFT JOIN
                        categories c ON p.category_id = c.id
                WHERE
                    p.id = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return false;
        }

        // Définir les propriétés
        $this->id = $row['id'];
        $this->name = $row['name'];
        $this->description = $row['description'];
        $this->price = $row['price'];
        $this->stock_quantity = $row['stock_quantity'];
        $this->category_id = $row['category_id'];
        $this->image_url = $row['image_url'];
        $this->created_at = $row['created_at'];
        $this->updated_at = $row['updated_at'];
        $this->category_name = $row['category_name'];

        return true;
    }

    /**
     * Créer un produit
     * 
     * @return bool
     */
    public function create($data) {
        $query = "INSERT INTO " . $this->table . "
                (name, description, price, stock_quantity, category_id, image_url)
                VALUES
                (:name, :description, :price, :stock_quantity, :category_id, :image_url)";

        $stmt = $this->conn->prepare($query);

        // Nettoyer et lier les données
        $this->name = htmlspecialchars(strip_tags($data['name']));
        $this->description = htmlspecialchars(strip_tags($data['description'] ?? ''));
        $this->price = $data['price'];
        $this->stock_quantity = $data['stock_quantity'];
        $this->category_id = $data['category_id'] ?? null;
        $this->image_url = $data['image_url'] ?? null;

        // Lier les valeurs
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":stock_quantity", $this->stock_quantity);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":image_url", $this->image_url);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return [
                "message" => "Produit créé avec succès.",
                "id" => $this->id
            ];
        }

        throw new \Exception("Impossible de créer le produit.");
    }

    /**
     * Mettre à jour un produit
     * 
     * @return bool
     */
    public function update($id, $data) {
        $query = "UPDATE " . $this->table . "
                SET name = :name,
                    description = :description,
                    price = :price,
                    stock_quantity = :stock_quantity,
                    category_id = :category_id,
                    image_url = :image_url
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Nettoyer et lier les données
        $this->id = $id;
        $this->name = htmlspecialchars(strip_tags($data['name']));
        $this->description = htmlspecialchars(strip_tags($data['description'] ?? ''));
        $this->price = $data['price'];
        $this->stock_quantity = $data['stock_quantity'];
        $this->category_id = $data['category_id'] ?? null;
        $this->image_url = $data['image_url'] ?? null;

        // Lier les valeurs
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":stock_quantity", $this->stock_quantity);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":image_url", $this->image_url);

        if ($stmt->execute()) {
            return ["message" => "Produit mis à jour avec succès."];
        }

        throw new \Exception("Impossible de mettre à jour le produit.");
    }

    /**
     * Supprimer un produit
     * 
     * @return bool
     */
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            return ["message" => "Produit supprimé avec succès."];
        }

        throw new \Exception("Impossible de supprimer le produit.");
    }

    /**
     * Rechercher des produits
     * 
     * @param string $keywords Mots-clés à rechercher
     * @return PDOStatement
     */
    public function search($keywords) {
        $query = "SELECT
                    p.id, p.name, p.description, p.price, p.stock_quantity,
                    p.category_id, p.image_url, p.created_at, p.updated_at,
                    c.name as category_name
                FROM
                    " . $this->table . " p
                    LEFT JOIN
                        categories c ON p.category_id = c.id
                WHERE
                    p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?
                ORDER BY
                    p.created_at DESC";

        $keywords = "%{$keywords}%";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);
        $stmt->execute();

        return $stmt;
    }
} 