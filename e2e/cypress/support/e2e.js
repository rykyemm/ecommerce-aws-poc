// Import des commandes personnalisées
import './commands';

// Configuration globale
beforeEach(() => {
  // Réinitialiser l'état avant chaque test
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

// Configuration des assertions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retourner false pour empêcher Cypress de faillir sur les erreurs non gérées
  return false;
}); 