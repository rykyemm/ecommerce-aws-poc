import React, { useState, useEffect } from 'react';
import { Container, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response.data.records || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await api.searchProducts(searchQuery);
      setProducts(response.data.records || []);
      setError(null);
    } catch (err) {
      console.error('Error searching products:', err);
      setError('Impossible de rechercher les produits. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="page-title">Tous les produits</h1>

      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="primary">
                Rechercher
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {loading ? (
        <p>Chargement des produits...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ProductList products={products} />
      )}
    </Container>
  );
};

export default ProductsPage; 