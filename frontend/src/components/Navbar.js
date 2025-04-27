import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">SportShop</span>
        </Link>
        
        <div className="navbar-search">
          <input type="text" placeholder="Rechercher un produit..." />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">Produits</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories" className="nav-link">Catégories</Link>
          </li>
          <li className="nav-item">
            <Link to="/promotions" className="nav-link">Promotions</Link>
          </li>
        </ul>

        <div className="navbar-icons">
          <Link to="/cart" className="icon-link">
            <FaShoppingCart />
            <span className="cart-count">0</span>
          </Link>
          <Link to="/account" className="icon-link">
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 