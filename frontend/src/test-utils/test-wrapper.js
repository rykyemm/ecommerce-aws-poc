import React from 'react';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

export const TestWrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}; 