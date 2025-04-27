USE ecommerce;

-- Ajout de catégories sportives
INSERT INTO categories (name, description, parent_id) VALUES 
('Sport', 'Équipement et accessoires de sport', NULL),
('Chaussures de Sport', 'Chaussures pour différentes activités sportives', 9),
('Vêtements de Sport', 'Vêtements techniques pour le sport', 9),
('Équipement de Fitness', 'Matériel et accessoires de fitness', 9),
('Sports Collectifs', 'Équipement pour les sports d\'équipe', 9);

-- Ajout de produits sportifs
INSERT INTO products (name, description, price, stock_quantity, category_id, image_url) VALUES 
('Chaussures de Running Nike', 'Chaussures de running légères et confortables', 129.99, 30, 10, 'sport-shoes.jpg'),
('Veste de Sport Adidas', 'Veste respirante pour les activités sportives', 79.99, 40, 11, 'sport-clothing.jpg'),
('Haltères Fitness', 'Set d\'haltères ajustables pour l\'entraînement', 89.99, 20, 12, 'fitness-equipment.jpg'),
('Ballon de Football', 'Ballon de football officiel taille 5', 29.99, 50, 13, 'team-sports.jpg'); 