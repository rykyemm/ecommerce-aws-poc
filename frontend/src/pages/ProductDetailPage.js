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
              src={`${process.env.PUBLIC_URL}/images/${product.image_url}`}
              alt={product.name} 
              className="img-fluid"
              onError={(e) => {
                e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
              }}
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
            <div className="mb-4">
              <h5>Quantité</h5>
              <div className="d-flex align-items-center">
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="me-2"
                >
                  -
                </Button>
                <span className="mx-2">{quantity}</span>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="ms-2"
                >
                  +
                </Button>
              </div>
            </div>
          )}
          
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleAddToCart}
            disabled={product.stock_quantity < 1}
          >
            {product.stock_quantity < 1 ? 'Épuisé' : 'Ajouter au panier'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage; 