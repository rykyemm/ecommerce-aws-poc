// Commande pour se connecter
Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: {
      email,
      password
    }
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
  });
});

// Commande pour ajouter un produit au panier
Cypress.Commands.add('addToCart', (productId) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/cart/add`,
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    },
    body: {
      product_id: productId,
      quantity: 1
    }
  });
}); 