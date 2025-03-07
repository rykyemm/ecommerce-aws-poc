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

// Pour simuler des appels API en mode de développement
const mockProducts = [
  {
    id: 1,
    name: "iPhone 13",
    description: "Smartphone Apple avec écran Super Retina XDR",
    price: 999.99,
    stock_quantity: 50,
    category_id: 4,
    category_name: "Smartphones",
    image_url: "iphone13.jpg"
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    description: "Smartphone Samsung avec écran Dynamic AMOLED",
    price: 799.99,
    stock_quantity: 75,
    category_id: 4,
    category_name: "Smartphones",
    image_url: "galaxys21.jpg"
  },
  {
    id: 3,
    name: "MacBook Pro",
    description: "Ordinateur portable Apple avec puce M1",
    price: 1299.99,
    stock_quantity: 30,
    category_id: 5,
    category_name: "Ordinateurs",
    image_url: "macbookpro.jpg"
  },
  {
    id: 4,
    name: "Dell XPS 15",
    description: "Ordinateur portable Dell avec écran InfinityEdge",
    price: 1199.99,
    stock_quantity: 25,
    category_id: 5,
    category_name: "Ordinateurs",
    image_url: "dellxps15.jpg"
  }
];

// Helper pour simuler un délai de réseau
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// API mock pour le développement
const mockAPI = {
  // Produits
  getProducts: async () => {
    await simulateDelay();
    return { data: { records: mockProducts } };
  },
  getProduct: async (id) => {
    await simulateDelay();
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Produit non trouvé');
    }
    return { data: product };
  },
  searchProducts: async (keywords) => {
    await simulateDelay();
    const filtered = mockProducts.filter(p => 
      p.name.toLowerCase().includes(keywords.toLowerCase()) || 
      p.description.toLowerCase().includes(keywords.toLowerCase())
    );
    return { data: { records: filtered } };
  },
  createProduct: async (_data) => {
    await simulateDelay();
    return { data: { message: 'Produit créé avec succès', id: Date.now() } };
  },
  updateProduct: async (_id, _data) => {
    await simulateDelay();
    return { data: { message: 'Produit mis à jour avec succès' } };
  },
  deleteProduct: async (_id) => {
    await simulateDelay();
    return { data: { message: 'Produit supprimé avec succès' } };
  },

  // Utilisateurs
  login: async (credentials) => {
    await simulateDelay();
    return {
      data: {
        token: 'fake-jwt-token',
        user: {
          id: 1,
          email: credentials.email,
          first_name: 'John',
          last_name: 'Doe',
          role: 'customer'
        }
      }
    };
  },
  register: async (userData) => {
    await simulateDelay();
    return {
      data: {
        token: 'fake-jwt-token',
        user: {
          id: Date.now(),
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: 'customer'
        }
      }
    };
  },
  getUserProfile: async () => {
    await simulateDelay();
    return {
      data: {
        id: 1,
        email: 'user@example.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'customer'
      }
    };
  },
  updateUserProfile: async (_data) => {
    await simulateDelay();
    return { data: { message: 'Profil mis à jour avec succès' } };
  },

  // Commandes
  createOrder: async (_orderData) => {
    await simulateDelay();
    return { data: { message: 'Commande créée avec succès', id: Date.now() } };
  },
  getOrders: async () => {
    await simulateDelay();
    return { data: { records: [] } };
  },
  getOrder: async (id) => {
    await simulateDelay();
    return { data: { id, status: 'pending', total_price: 0, created_at: new Date().toISOString() } };
  }
};

// Exporter l'API réelle ou l'API mock selon l'environnement
const isDevelopment = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development';
export default isDevelopment ? mockAPI : {
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