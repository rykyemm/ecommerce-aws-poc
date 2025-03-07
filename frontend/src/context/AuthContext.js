import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Vérifier si l'utilisateur est déjà connecté au démarrage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);
  
  // Récupérer le profil utilisateur
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // Pour cette POC, nous simulons un profil utilisateur
      const mockUser = {
        id: 1,
        email: 'user@example.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'customer'
      };
      
      // Normalement, vous feriez ceci :
      // const response = await api.getUserProfile();
      // setCurrentUser(response.data);
      
      setCurrentUser(mockUser);
      setError(null);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to authenticate user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };
  
  // Connexion
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Pour cette POC, nous simulons une réponse de connexion
      const mockResponse = {
        token: 'fake-jwt-token',
        user: {
          id: 1,
          email: email,
          first_name: 'John',
          last_name: 'Doe',
          role: 'customer'
        }
      };
      
      // Normalement, vous feriez ceci :
      // const response = await api.login({ email, password });
      // const { token, user } = response.data;
      
      const { token, user } = mockResponse;
      
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setError(null);
      return user;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Échec de la connexion';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Inscription
  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Pour cette POC, nous simulons une réponse d'inscription
      const mockResponse = {
        token: 'fake-jwt-token',
        user: {
          id: 2,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: 'customer'
        }
      };
      
      // Normalement, vous feriez ceci :
      // const response = await api.register(userData);
      // const { token, user } = response.data;
      
      const { token, user } = mockResponse;
      
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setError(null);
      return user;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || "Échec de l'inscription";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };
  
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 