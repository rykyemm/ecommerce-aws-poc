import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// Métriques personnalisées
export const errorRate = new Rate('error_rate');
export const productListDuration = new Trend('product_list_duration');
export const productDetailDuration = new Trend('product_detail_duration');
export const productSearchDuration = new Trend('product_search_duration');
export const productCreateDuration = new Trend('product_create_duration');

// Configuration du test
export const options = {
  stages: [
    { duration: '1m', target: 10 },    // Montée en charge progressive jusqu'à 10 utilisateurs en 1 minute
    { duration: '3m', target: 10 },    // Maintenir 10 utilisateurs pendant 3 minutes
    { duration: '1m', target: 50 },    // Augmenter à 50 utilisateurs en 1 minute
    { duration: '3m', target: 50 },    // Maintenir 50 utilisateurs pendant 3 minutes
    { duration: '1m', target: 0 },     // Diminuer à 0 utilisateur en 1 minute
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'],                // 95% des requêtes doivent être complétées en moins de 500ms
    'http_req_failed': ['rate<0.1'],                   // Moins de 10% d'erreurs
    'product_list_duration': ['p(95)<400'],            // 95% des requêtes de liste de produits en moins de 400ms
    'product_detail_duration': ['p(95)<300'],          // 95% des requêtes de détail de produit en moins de 300ms
    'product_create_duration': ['p(95)<500'],          // 95% des créations de produits en moins de 500ms
  },
};

// Variables globales
const BASE_URL = __ENV.API_URL || 'http://localhost:8000/backend/api';
let productId = 1;  // ID par défaut pour les tests

// Configuration de base pour les requêtes
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export function setup() {
  // Cette fonction est exécutée une seule fois au début du test
  // Récupérer un ID de produit valide pour les tests
  const listResponse = http.get(`${BASE_URL}/product`, params);
  
  if (listResponse.status === 200) {
    const products = JSON.parse(listResponse.body).records;
    if (products && products.length > 0) {
      productId = products[0].id;
      console.log(`Using product ID: ${productId} for tests`);
    }
  }
  
  // Générer un token d'authentification si nécessaire
  // Cette partie est commentée car elle dépend de l'implémentation de votre API
  /*
  const loginResponse = http.post(`${BASE_URL}/user/login`, JSON.stringify({
    email: 'test@example.com',
    password: 'password'
  }), params);
  
  if (loginResponse.status === 200) {
    const authToken = JSON.parse(loginResponse.body).token;
    params.headers['Authorization'] = `Bearer ${authToken}`;
  }
  */
  
  return { productId, params };
}

export default function(data) {
  const { productId, params } = data;
  
  group('Page d\'accueil - Liste des produits', function() {
    const startTime = new Date();
    const listResponse = http.get(`${BASE_URL}/product`, params);
    const duration = new Date() - startTime;
    
    // Enregistrer la durée
    productListDuration.add(duration);
    
    // Vérifier la réponse
    const success = check(listResponse, {
      'Statut 200': (r) => r.status === 200,
      'Liste de produits retournée': (r) => {
        const body = JSON.parse(r.body);
        return body.records && Array.isArray(body.records);
      },
    });
    
    errorRate.add(!success);
    
    sleep(1);
  });
  
  group('Détail d\'un produit', function() {
    const startTime = new Date();
    const detailResponse = http.get(`${BASE_URL}/product/${productId}`, params);
    const duration = new Date() - startTime;
    
    // Enregistrer la durée
    productDetailDuration.add(duration);
    
    // Vérifier la réponse
    const success = check(detailResponse, {
      'Statut 200': (r) => r.status === 200,
      'Produit trouvé': (r) => {
        const body = JSON.parse(r.body);
        return body.id && body.name;
      },
    });
    
    errorRate.add(!success);
    
    sleep(1);
  });
  
  group('Recherche de produits', function() {
    const searchTerm = 'phone';  // Terme de recherche générique
    const startTime = new Date();
    const searchResponse = http.get(`${BASE_URL}/product/search/${searchTerm}`, params);
    const duration = new Date() - startTime;
    
    // Enregistrer la durée
    productSearchDuration.add(duration);
    
    // Vérifier la réponse
    const success = check(searchResponse, {
      'Statut 200': (r) => r.status === 200,
      'Résultats de recherche retournés': (r) => {
        const body = JSON.parse(r.body);
        return body.records && Array.isArray(body.records);
      },
    });
    
    errorRate.add(!success);
    
    sleep(1);
  });
  
  group('Création d\'un produit (1 sur 10 VUs)', function() {
    // Ne réaliser cette opération que pour 10% des utilisateurs virtuels
    if (Math.random() < 0.1) {
      const newProduct = {
        name: `Test Product ${randomString(5)}`,
        description: 'Produit créé par le test de charge',
        price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
        stock_quantity: Math.floor(Math.random() * 100) + 1,
        category_id: 1
      };
      
      const startTime = new Date();
      const createResponse = http.post(
        `${BASE_URL}/product`, 
        JSON.stringify(newProduct), 
        params
      );
      const duration = new Date() - startTime;
      
      // Enregistrer la durée
      productCreateDuration.add(duration);
      
      // Vérifier la réponse
      const success = check(createResponse, {
        'Statut 201': (r) => r.status === 201,
        'Produit créé avec succès': (r) => {
          const body = JSON.parse(r.body);
          return body.message && body.id;
        },
      });
      
      errorRate.add(!success);
      
      // Si le produit a été créé avec succès, le supprimer après
      if (success && createResponse.status === 201) {
        const body = JSON.parse(createResponse.body);
        const newProductId = body.id;
        
        // Laisser une pause avant la suppression
        sleep(1);
        
        // Supprimer le produit créé
        http.del(`${BASE_URL}/product/${newProductId}`, null, params);
      }
    }
    
    sleep(2);
  });
  
  // Pause entre les itérations
  sleep(Math.random() * 3 + 1);  // Pause aléatoire de 1-4 secondes
} 