-- Données d'exemple pour la base de données e-commerce
USE ecommerce;

-- Insertion de catégories
INSERT INTO categories (name, description, parent_id) VALUES 
('Électronique', 'Produits électroniques et gadgets', NULL),
('Vêtements', 'Vêtements et accessoires de mode', NULL),
('Livres', 'Livres, e-books et publications', NULL),
('Smartphones', 'Téléphones mobiles et accessoires', 1),
('Ordinateurs', 'Ordinateurs portables et de bureau', 1),
('Homme', 'Vêtements pour homme', 2),
('Femme', 'Vêtements pour femme', 2);

-- Insertion de produits
INSERT INTO products (name, description, price, stock_quantity, category_id, image_url) VALUES 
('iPhone 13', 'Smartphone Apple avec écran Super Retina XDR', 999.99, 50, 4, 'iphone13.jpg'),
('Samsung Galaxy S21', 'Smartphone Samsung avec écran Dynamic AMOLED', 799.99, 75, 4, 'galaxys21.jpg'),
('MacBook Pro', 'Ordinateur portable Apple avec puce M1', 1299.99, 30, 5, 'macbookpro.jpg'),
('Dell XPS 15', 'Ordinateur portable Dell avec écran InfinityEdge', 1199.99, 25, 5, 'dellxps15.jpg'),
('T-shirt basique', 'T-shirt en coton pour homme', 19.99, 100, 6, 'tshirt.jpg'),
('Jeans slim', 'Jeans slim fit pour femme', 49.99, 80, 7, 'jeans.jpg'),
('Le Petit Prince', 'Roman de Antoine de Saint-Exupéry', 9.99, 150, 3, 'lepetitprince.jpg'),
('1984', 'Roman de George Orwell', 12.99, 120, 3, '1984.jpg');

-- Insertion d'utilisateurs (le mot de passe est "password" haché)
INSERT INTO users (email, password, first_name, last_name, address, phone, role) VALUES 
('admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', '123 Admin Street', '123-456-7890', 'admin'),
('user@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Normal', 'User', '456 User Avenue', '098-765-4321', 'customer');

-- Insertion d'un panier pour l'utilisateur
INSERT INTO carts (user_id) VALUES (2);

-- Insertion d'articles dans le panier
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES 
(1, 1, 1),
(1, 5, 2);

-- Insertion d'une commande
INSERT INTO orders (user_id, status, total_price, shipping_address, payment_method) VALUES 
(2, 'delivered', 1299.99, '456 User Avenue, City, Country', 'credit_card');

-- Insertion des articles de la commande
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES 
(1, 3, 1, 1299.99); 