import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  // Vérifier si le panier est vide
  if (cartItems.length === 0 && !orderCompleted) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <h4>Votre panier est vide</h4>
          <p>Vous ne pouvez pas procéder au paiement car votre panier est vide.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Parcourir les produits
          </Button>
        </Alert>
      </Container>
    );
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Simulation d'une commande réussie
    setTimeout(() => {
      clearCart();
      setOrderCompleted(true);
    }, 1500);
    
    setValidated(true);
  };
  
  if (orderCompleted) {
    return (
      <Container className="py-5">
        <Alert variant="success">
          <Alert.Heading>Commande confirmée!</Alert.Heading>
          <p>
            Votre commande a été traitée avec succès. Vous recevrez un e-mail de confirmation sous peu.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-success" onClick={() => navigate('/products')}>
              Continuer vos achats
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container>
      <h1 className="page-title">Finaliser votre commande</h1>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Informations de livraison</h5>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control required type="text" placeholder="Prénom" />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer votre prénom.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control required type="text" placeholder="Nom" />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer votre nom.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                
                <Form.Group className="mb-3" controlId="validationCustomEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" required />
                  <Form.Control.Feedback type="invalid">
                    Veuillez entrer une adresse email valide.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="validationCustomAddress">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control type="text" placeholder="Adresse" required />
                  <Form.Control.Feedback type="invalid">
                    Veuillez entrer votre adresse.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustomCity">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control type="text" placeholder="Ville" required />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer votre ville.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustomState">
                    <Form.Label>Pays</Form.Label>
                    <Form.Control type="text" placeholder="Pays" required />
                    <Form.Control.Feedback type="invalid">
                      Veuillez sélectionner votre pays.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustomZip">
                    <Form.Label>Code postal</Form.Label>
                    <Form.Control type="text" placeholder="Code postal" required />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer votre code postal.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                
                <hr className="my-4" />
                
                <h5 className="mb-3">Paiement</h5>
                
                <div className="mb-3">
                  <Form.Check
                    type="radio"
                    label="Carte de crédit"
                    name="paymentMethod"
                    id="creditCard"
                    required
                    defaultChecked
                  />
                  <Form.Check
                    type="radio"
                    label="PayPal"
                    name="paymentMethod"
                    id="paypal"
                    required
                  />
                </div>
                
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustomCardName">
                    <Form.Label>Nom sur la carte</Form.Label>
                    <Form.Control type="text" placeholder="Nom sur la carte" required />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer le nom sur la carte.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustomCardNumber">
                    <Form.Label>Numéro de carte</Form.Label>
                    <Form.Control type="text" placeholder="Numéro de carte" required />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer un numéro de carte valide.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustomExpiration">
                    <Form.Label>Date d'expiration</Form.Label>
                    <Form.Control type="text" placeholder="MM/YY" required />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer une date d'expiration valide.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustomCvv">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" placeholder="CVV" required />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer un code CVV valide.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                
                <Button variant="primary" size="lg" type="submit" className="w-100 mt-4">
                  Finaliser la commande
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Récapitulatif de la commande</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-group list-group-flush">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-muted">
                        {item.quantity} x {item.price.toFixed(2)} €
                      </small>
                    </div>
                    <span className="text-muted">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Sous-total</span>
                  <strong>{total.toFixed(2)} €</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Livraison</span>
                  <strong>Gratuit</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <span>Total</span>
                  <strong>{total.toFixed(2)} €</strong>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage; 