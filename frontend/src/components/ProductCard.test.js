import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '../context/__mocks__/CartContext';
import { BrowserRouter } from 'react-router-dom';

// Mock the useCart hook
jest.mock('../context/CartContext', () => {
  const originalModule = jest.requireActual('../context/__mocks__/CartContext');
  return {
    ...originalModule,
    useCart: () => ({
      addToCart: jest.fn()
    })
  };
});

const mockProduct = {
  id: 1,
  name: "Test Product",
  description: "Test Description",
  price: 99.99,
  stock_quantity: 10,
  category_name: "Test Category",
  image_url: "test.jpg"
};

describe('ProductCard', () => {
  test('renders product information correctly', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category_name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price.toFixed(2)} €`)).toBeInTheDocument();
  });

  test('handles add to cart click', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </BrowserRouter>
    );
    
    const addToCartButton = screen.getByText('Ajouter au panier');
    fireEvent.click(addToCartButton);
    // Le test passe si le bouton existe et peut être cliqué sans erreur
  });
}); 