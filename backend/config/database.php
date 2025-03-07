<?php
namespace App\Config;

use PDO;
use PDOException;
use Exception;

/**
 * Classe Database - Gère la connexion à la base de données
 */
class Database {
    private $connection;
    private static $instance = null;
    
    /**
     * Constructeur privé pour le pattern Singleton
     */
    private function __construct() {
        $config = require __DIR__ . '/database.php';
        
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
        
        try {
            $this->connection = new PDO($dsn, $config['username'], $config['password'], $config['options']);
        } catch (PDOException $e) {
            throw new Exception("Erreur de connexion à la base de données: " . $e->getMessage());
        }
    }
    
    /**
     * Obtenir l'instance unique de la base de données
     * 
     * @return Database
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Obtenir la connexion PDO
     * 
     * @return PDO
     */
    public function getConnection() {
        return $this->connection;
    }
} 