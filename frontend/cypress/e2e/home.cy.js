describe('Homepage', () => {
  it('should load the homepage', () => {
    cy.visit('/');
    cy.get('h2').should('exist');
    cy.get('h2').should('contain', 'Produits en vedette');
  });
}); 