import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductList from '../components/ProductList';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.getProducts();
        // Prendre les 6 premiers produits pour l'affichage
        setFeaturedProducts(response.data.records.slice(0, 6));
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <section className="mb-5">
        <Carousel className="mb-4">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1200x400?text=Promotions+de+saison"
              alt="Promotions de saison"
            />
            <Carousel.Caption>
              <h3>Promotions de saison</h3>
              <p>Découvrez nos offres spéciales pour le printemps</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1200x400?text=Nouveaux+Produits"
              alt="Nouveaux produits"
            />
            <Carousel.Caption>
              <h3>Nouveaux produits</h3>
              <p>Découvrez les dernières nouveautés</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1200x400?text=Livraison+Gratuite"
              alt="Livraison gratuite"
            />
            <Carousel.Caption>
              <h3>Livraison gratuite</h3>
              <p>Pour toute commande supérieure à 50€</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <section className="mb-5">
        <h2 className="mb-4">Produits en vedette</h2>
        {loading ? (
          <p>Chargement des produits...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <ProductList products={featuredProducts} />
        )}
        <div className="text-center mt-4">
          <Link to="/products">
            <Button variant="outline-primary">Voir tous les produits</Button>
          </Link>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="mb-4">Catégories populaires</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          <Col>
            <Card className="h-100">
              <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Electronique" />
              <Card.Body>
                <Card.Title>Électronique</Card.Title>
                <Card.Text>Découvrez nos gadgets et appareils électroniques.</Card.Text>
                <Link to="/products">
                  <Button variant="primary">Explorer</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Vêtements" />
              <Card.Body>
                <Card.Title>Vêtements</Card.Title>
                <Card.Text>Notre collection de vêtements pour hommes et femmes.</Card.Text>
                <Link to="/products">
                  <Button variant="primary">Explorer</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Img variant="top" src="https://via.placeholder.com/300x200?text=Livres" />
              <Card.Body>
                <Card.Title>Livres</Card.Title>
                <Card.Text>Des livres pour tous les goûts et tous les âges.</Card.Text>
                <Link to="/products">
                  <Button variant="primary">Explorer</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default HomePage; 