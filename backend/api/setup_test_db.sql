-- Création de la table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des produits
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    category_id INT,
    brand VARCHAR(100),
    size VARCHAR(50),
    color VARCHAR(50),
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insertion des catégories
INSERT INTO categories (name, description) VALUES
('Chaussures de Sport', 'Chaussures pour tous les sports'),
('Vêtements de Sport', 'Vêtements techniques pour le sport'),
('Équipement de Fitness', 'Matériel pour la musculation et le fitness'),
('Sports Collectifs', 'Équipement pour les sports d\'équipe');

-- Insertion des produits
INSERT INTO products (name, description, price, image_url, category_id, brand, size, color, stock_quantity) VALUES
('Nike Air Max 270', 'Chaussures de running légères et confortables', 129.99, 'nike_air_max_270.jpg', 1, 'Nike', '42', 'Noir/Rouge', 50),
('Adidas Ultraboost 22', 'Chaussures de running avec amorti Boost', 149.99, 'adidas_ultraboost_22.jpg', 1, 'Adidas', '43', 'Blanc/Noir', 30),
('Puma T-Shirt Dry', 'T-shirt technique respirant', 29.99, 'puma_tshirt_dry.jpg', 2, 'Puma', 'L', 'Bleu', 100),
('Haltères 5kg', 'Paire d\'haltères en caoutchouc', 39.99, 'haltères_5kg.jpg', 3, 'Decathlon', '5kg', 'Noir', 20),
('Ballon de Football', 'Ballon de football taille 5', 24.99, 'ballon_football.jpg', 4, 'Nike', 'Taille 5', 'Blanc/Noir', 15); 