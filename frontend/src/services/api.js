import axios from 'axios';

const API_URL = '/api';

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
    name: "Chaussures de Running Nike",
    description: "Chaussures de running légères et confortables",
    price: 129.99,
    stock_quantity: 30,
    category_id: 1,
    category_name: "Chaussures de Sport",
    image_url: "sport-shoes.jpg"
  },
  {
    id: 2,
    name: "Veste de Sport Adidas",
    description: "Veste respirante pour les activités sportives",
    price: 79.99,
    stock_quantity: 40,
    category_id: 2,
    category_name: "Vêtements de Sport",
    image_url: "sport-clothing.jpg"
  },
  {
    id: 3,
    name: "Haltères Fitness",
    description: "Set d'haltères ajustables pour l'entraînement",
    price: 89.99,
    stock_quantity: 20,
    category_id: 3,
    category_name: "Équipement de Fitness",
    image_url: "fitness-equipment.jpg"
  },
  {
    id: 4,
    name: "Ballon de Football",
    description: "Ballon de football officiel taille 5",
    price: 29.99,
    stock_quantity: 50,
    category_id: 4,
    category_name: "Sports Collectifs",
    image_url: "team-sports.jpg"
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
  updateProduct: async (id, data) => {
    await simulateDelay();
    const index = mockProducts.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Produit non trouvé');
    }
    mockProducts[index] = { ...mockProducts[index], ...data };
    return { data: { message: 'Produit mis à jour avec succès' } };
  },
  deleteProduct: async (id) => {
    await simulateDelay();
    const index = mockProducts.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Produit non trouvé');
    }
    mockProducts.splice(index, 1);
    return { data: { message: 'Produit supprimé avec succès' } };
  },

  // Catégories
  getCategories: async () => {
    await simulateDelay();
    const categories = [
      { id: 1, name: "Chaussures de Sport" },
      { id: 2, name: "Vêtements de Sport" },
      { id: 3, name: "Équipement de Fitness" },
      { id: 4, name: "Sports Collectifs" }
    ];
    return { data: { records: categories } };
  },
  getCategory: async (id) => {
    await simulateDelay();
    const categories = [
      { id: 1, name: "Chaussures de Sport" },
      { id: 2, name: "Vêtements de Sport" },
      { id: 3, name: "Équipement de Fitness" },
      { id: 4, name: "Sports Collectifs" }
    ];
    const category = categories.find(c => c.id === parseInt(id));
    if (!category) {
      throw new Error('Catégorie non trouvée');
    }
    return { data: category };
  },

  // Commandes
  createOrder: async (data) => {
    await simulateDelay();
    return { data: { message: 'Commande créée avec succès', id: Date.now() } };
  },
  getOrders: async () => {
    await simulateDelay();
    return { data: { records: [] } };
  },
  getOrder: async (id) => {
    await simulateDelay();
    return { data: { id, status: 'En cours de traitement' } };
  },

  // Authentification
  login: async (credentials) => {
    await simulateDelay();
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      return { data: { token: 'mock-token', user: { id: 1, email: 'admin@example.com', role: 'admin' } } };
    }
    throw new Error('Identifiants invalides');
  },
  register: async (data) => {
    await simulateDelay();
    return { data: { message: 'Inscription réussie', id: Date.now() } };
  },
  getProfile: async () => {
    await simulateDelay();
    return { data: { id: 1, email: 'admin@example.com', role: 'admin' } };
  },
  updateProfile: async (data) => {
    await simulateDelay();
    return { data: { message: 'Profil mis à jour avec succès' } };
  }
};

// Export des fonctions API
export default {
  // Produits
  getProducts: () => mockAPI.getProducts(),
  getProduct: (id) => mockAPI.getProduct(id),
  searchProducts: (keywords) => mockAPI.searchProducts(keywords),
  createProduct: (data) => mockAPI.createProduct(data),
  updateProduct: (id, data) => mockAPI.updateProduct(id, data),
  deleteProduct: (id) => mockAPI.deleteProduct(id),

  // Catégories
  getCategories: () => mockAPI.getCategories(),
  getCategory: (id) => mockAPI.getCategory(id),

  // Commandes
  createOrder: (data) => mockAPI.createOrder(data),
  getOrders: () => mockAPI.getOrders(),
  getOrder: (id) => mockAPI.getOrder(id),

  // Authentification
  login: (credentials) => mockAPI.login(credentials),
  register: (data) => mockAPI.register(data),
  getProfile: () => mockAPI.getProfile(),
  updateProfile: (data) => mockAPI.updateProfile(data)
}; 