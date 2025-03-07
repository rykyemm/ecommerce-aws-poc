import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.getProduct(id);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Impossible de charger les détails du produit. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name} ajouté(s) au panier !`);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/products">
          <Button variant="primary">Retour aux produits</Button>
        </Link>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Produit non trouvé.</Alert>
        <Link to="/products">
          <Button variant="primary">Retour aux produits</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Link to="/products" className="btn btn-outline-secondary mb-4">
        &larr; Retour aux produits
      </Link>
      
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img 
              variant="top" 
              src={`/images/${product.image_url}` || 'https://via.placeholder.com/600x400'} 
              alt={product.name} 
              className="img-fluid"
            />
          </Card>
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p className="text-muted">{product.category_name}</p>
          <h2 className="text-primary my-4">{product.price.toFixed(2)} €</h2>
          
          <div className="mb-4">
            <h5>Description</h5>
            <p>{product.description}</p>
          </div>
          
          <div className="mb-4">
            <h5>Disponibilité</h5>
            {product.stock_quantity > 0 ? (
              <p className="text-success">En stock ({product.stock_quantity} disponibles)</p>
            ) : (
              <p className="text-danger">Épuisé</p>
            )}
          </div>
          
          {product.stock_quantity > 0 && (
            <div className="d-flex align-items-center mb-4">
              <div className="me-3">
                <label htmlFor="quantity" className="form-label">Quantité</label>
                <input 
                  type="number" 
                  id="quantity"
                  className="form-control" 
                  min="1" 
                  max={product.stock_quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock_quantity < 1}
              >
                Ajouter au panier
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage; 