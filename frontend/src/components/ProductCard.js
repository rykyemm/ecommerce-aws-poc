import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  return (
    <Card className="product-card h-100">
      <Link to={`/products/${product.id}`}>
        <Card.Img 
          variant="top" 
          src={`/images/${product.image_url}` || 'https://via.placeholder.com/300x200'} 
          alt={product.name}
          className="product-image"
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/products/${product.id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text className="text-muted">
          {product.category_name}
        </Card.Text>
        <Card.Text>
          {product.description && product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs-5 fw-bold">{product.price.toFixed(2)} €</span>
            <Button 
              variant="primary" 
              onClick={handleAddToCart}
              disabled={product.stock_quantity < 1}
            >
              {product.stock_quantity < 1 ? 'Épuisé' : 'Ajouter au panier'}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard; 