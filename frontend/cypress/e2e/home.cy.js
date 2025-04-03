describe('Homepage', () => {
  it('should load the homepage', () => {
    cy.visit('/');
    cy.get('h1').should('exist');
  });
}); 