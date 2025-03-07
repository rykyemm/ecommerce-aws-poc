import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page non trouvée</h2>
      <p className="lead mb-5">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Retour à l'accueil
        </Button>
      </Link>
    </Container>
  );
};

export default NotFoundPage; 