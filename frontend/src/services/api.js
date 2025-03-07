import axios from 'axios';

const API_URL = '/backend/api';

// Configuration de base pour axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interception des requêtes pour ajouter le token d'authentification si disponible
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // Produits
  getProducts: () => api.get('/product'),
  getProduct: (id) => api.get(`/product/${id}`),
  createProduct: (data) => api.post('/product', data),
  updateProduct: (id, data) => api.put(`/product/${id}`, data),
  deleteProduct: (id) => api.delete(`/product/${id}`),
  searchProducts: (keywords) => api.get(`/product/search/${keywords}`),

  // Utilisateurs
  login: (credentials) => api.post('/user/login', credentials),
  register: (userData) => api.post('/user/register', userData),
  getUserProfile: () => api.get('/user/profile'),
  updateUserProfile: (data) => api.put('/user/profile', data),

  // Commandes
  createOrder: (orderData) => api.post('/order', orderData),
  getOrders: () => api.get('/order'),
  getOrder: (id) => api.get(`/order/${id}`),
}; 