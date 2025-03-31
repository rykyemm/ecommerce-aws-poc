import React from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const contextValue = {
    user: { id: 1, name: 'Test User', email: 'test@example.com' },
    isAuthenticated: true,
    loading: false,
    error: null,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    clearError: jest.fn()
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
}; 