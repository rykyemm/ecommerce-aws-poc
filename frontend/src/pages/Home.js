import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { sportProducts } from '../data/sportProducts';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Équipez-vous pour la performance</h1>
          <p>Découvrez notre sélection de matériel sportif de qualité</p>
          <Link to="/products" className="cta-button">Découvrir</Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <h2>Nos Catégories</h2>
        <div className="categories-grid">
          <Link to="/products?category=1" className="category-card">
            <div className="category-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/sport-shoes.jpg)` }}></div>
            <h3>Chaussures de Sport</h3>
          </Link>
          <Link to="/products?category=2" className="category-card">
            <div className="category-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/sport-clothing.jpg)` }}></div>
            <h3>Vêtements de Sport</h3>
          </Link>
          <Link to="/products?category=3" className="category-card">
            <div className="category-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/fitness-equipment.jpg)` }}></div>
            <h3>Équipement de Fitness</h3>
          </Link>
          <Link to="/products?category=4" className="category-card">
            <div className="category-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/team-sports.jpg)` }}></div>
            <h3>Sports Collectifs</h3>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Produits Populaires</h2>
        <div className="products-grid">
          {sportProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotions */}
      <section className="promotions">
        <div className="promotion-banner">
          <h2>Soldes d'Été</h2>
          <p>Jusqu'à -50% sur une sélection de produits sportifs</p>
          <Link to="/promotions" className="promotion-button">Voir les offres</Link>
        </div>
      </section>

      {/* Brand Section */}
      <section className="brands">
        <h2>Nos Marques</h2>
        <div className="brands-grid">
          <div className="brand-logo">
            <img src={`${process.env.PUBLIC_URL}/images/nike-logo.png`} alt="Nike" />
          </div>
          <div className="brand-logo">
            <img src={`${process.env.PUBLIC_URL}/images/adidas-logo.png`} alt="Adidas" />
          </div>
          <div className="brand-logo">Puma</div>
          <div className="brand-logo">Decathlon</div>
        </div>
      </section>
    </div>
  );
}

export default Home; 