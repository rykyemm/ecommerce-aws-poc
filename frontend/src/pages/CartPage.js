import React from 'react';
import { Container, Table, Button, Image, Form, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, total, updateCartItemQuantity, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container>
        <h1 className="page-title">Panier</h1>
        <Alert variant="info">
          <div className="text-center">
            <h4>Votre panier est vide</h4>
            <p>Ajoutez des produits à votre panier pour les voir ici.</p>
            <Link to="/products">
              <Button variant="primary">Continuer mes achats</Button>
            </Link>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="page-title">Panier</h1>
      
      <Table responsive hover>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  <Image 
                    src={`/images/${item.image_url}` || 'https://via.placeholder.com/100x100'} 
                    alt={item.name} 
                    thumbnail 
                    width={100} 
                    height={100}
                    className="me-3"
                  />
                  <div>
                    <h5>{item.name}</h5>
                    <small className="text-muted">{item.category_name}</small>
                  </div>
                </div>
              </td>
              <td>{item.price.toFixed(2)} €</td>
              <td style={{ width: '150px' }}>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: '80px' }}
                />
              </td>
              <td>{(item.price * item.quantity).toFixed(2)} €</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Row className="mt-4">
        <Col md={6}>
          <div className="d-flex">
            <Link to="/products" className="me-3">
              <Button variant="outline-secondary">
                Continuer mes achats
              </Button>
            </Link>
            <Button 
              variant="outline-danger" 
              onClick={clearCart}
            >
              Vider le panier
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <div className="border rounded p-4 bg-light">
            <h4 className="mb-3">Récapitulatif</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Sous-total:</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Livraison:</span>
              <span>Gratuit</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <strong>Total:</strong>
              <strong>{total.toFixed(2)} €</strong>
            </div>
            <Link to="/checkout">
              <Button variant="primary" size="lg" className="w-100">
                Passer la commande
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage; 