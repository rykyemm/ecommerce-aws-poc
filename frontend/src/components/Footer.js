import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col md={4}>
            <h5>E-Shop</h5>
            <p>Votre boutique en ligne pour tous vos besoins.</p>
          </Col>
          <Col md={4}>
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/products">Produits</Link></li>
              <li><Link to="/cart">Panier</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <address>
              <p>
                123 Rue du Commerce<br />
                75000 Paris<br />
                France
              </p>
              <p>
                <a href="mailto:contact@eshop.com">contact@eshop.com</a><br />
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </p>
            </address>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p className="mb-0">&copy; {currentYear} E-Shop. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 