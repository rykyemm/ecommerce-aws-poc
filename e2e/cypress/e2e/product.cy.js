describe('Product Page', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('displays product list', () => {
    cy.get('[data-testid="product-grid"]').should('exist');
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
  });

  it('displays product details', () => {
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="product-details"]').should('exist');
    cy.get('[data-testid="product-name"]').should('exist');
    cy.get('[data-testid="product-price"]').should('exist');
    cy.get('[data-testid="product-description"]').should('exist');
  });

  it('adds product to cart when logged in', () => {
    // Se connecter
    cy.login('test@example.com', 'password');
    
    // Aller à la page des produits
    cy.visit('/products');
    
    // Cliquer sur le premier produit
    cy.get('[data-testid="product-card"]').first().click();
    
    // Ajouter au panier
    cy.get('[data-testid="add-to-cart-button"]').click();
    
    // Vérifier que le produit a été ajouté
    cy.get('[data-testid="cart-count"]').should('have.text', '1');
  });

  it('filters products by category', () => {
    cy.get('[data-testid="category-filter"]').select('electronics');
    cy.get('[data-testid="product-card"]').each(($card) => {
      cy.wrap($card).find('[data-testid="product-category"]').should('contain', 'electronics');
    });
  });

  it('sorts products by price', () => {
    cy.get('[data-testid="sort-select"]').select('price-asc');
    cy.get('[data-testid="product-card"]').first().find('[data-testid="product-price"]')
      .invoke('text')
      .then((firstPrice) => {
        cy.get('[data-testid="product-card"]').last().find('[data-testid="product-price"]')
          .invoke('text')
          .should('be.greaterThan', firstPrice);
      });
  });
}); 