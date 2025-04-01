USE ecommerce;

INSERT INTO categories (name) VALUES
('Électronique'),
('Vêtements'),
('Livres');

INSERT INTO products (name, description, price, stock_quantity, category_id, image_url) VALUES
('Smartphone XYZ', 'Un smartphone dernière génération', 699.99, 10, 1, 'https://example.com/smartphone.jpg'),
('T-shirt Basic', 'Un t-shirt confortable', 19.99, 50, 2, 'https://example.com/tshirt.jpg'),
('Le Guide du Développeur', 'Un livre complet sur le développement web', 49.99, 15, 3, 'https://example.com/book.jpg'); 