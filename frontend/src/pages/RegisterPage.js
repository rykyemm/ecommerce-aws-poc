import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      await register(formData);
      navigate('/');
      
    } catch (err) {
      setError("Échec de l'inscription. Veuillez réessayer.");
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card>
            <Card.Header>
              <h3 className="mb-0">Créer un compte</h3>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formFirstName">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Prénom" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group as={Col} md="6" controlId="formLastName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Nom" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Mot de passe" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Le mot de passe doit contenir au moins 6 caractères.
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group as={Col} md="6" controlId="formConfirmPassword">
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Confirmer le mot de passe" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    placeholder="Adresse complète" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control 
                    type="tel" 
                    placeholder="Numéro de téléphone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Inscription en cours..." : "S'inscrire"}
                  </Button>
                </div>
              </Form>
              
              <div className="mt-3 text-center">
                <p>
                  Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage; 