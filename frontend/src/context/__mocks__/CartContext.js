import React from 'react';

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const contextValue = {
    items: [],
    total: 0,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn()
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return React.useContext(CartContext);
}; 