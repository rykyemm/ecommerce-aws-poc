-- Mise à jour des images pour les produits existants
UPDATE products SET image_url = 'iphone13.txt' WHERE name LIKE '%iPhone%';
UPDATE products SET image_url = 'galaxys21.txt' WHERE name LIKE '%Samsung%';
UPDATE products SET image_url = 'macbookpro.txt' WHERE name LIKE '%MacBook%';
UPDATE products SET image_url = 'dellxps15.txt' WHERE name LIKE '%Dell%';

-- Insertion de nouveaux produits avec images
INSERT INTO products (name, description, price, stock_quantity, category_id, image_url) VALUES
('AirPods Pro', 'Écouteurs sans fil Apple avec réduction de bruit active', 249.99, 100, 4, 'airpodspro.txt'),
('iPad Pro', 'Tablette Apple avec puce M2', 799.99, 45, 4, 'ipadpro.txt'),
('Apple Watch Series 7', 'Montre connectée Apple avec écran toujours actif', 399.99, 60, 4, 'applewatch7.txt'),
('Sony WH-1000XM4', 'Casque audio sans fil avec réduction de bruit', 349.99, 30, 4, 'sonywh1000xm4.txt'),
('Nintendo Switch OLED', 'Console de jeu portable avec écran OLED', 349.99, 40, 4, 'nintendoswitch.txt'); 