-- Création de la table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Création de la table des produits
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insertion des données de test
INSERT INTO categories (name) VALUES
('Electronics'),
('Clothing'),
('Books');

-- Insertion des produits de test
INSERT INTO products (name, description, price, stock_quantity, category_id) VALUES
('Test Product 1', 'Test Description 1', 99.99, 10, 1),
('Test Product 2', 'Test Description 2', 149.99, 15, 1),
('Test Product 3', 'Test Description 3', 199.99, 20, 2); 