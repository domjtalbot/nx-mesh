describe('example-nextjs-soap-country-info', () => {
  beforeEach(() => cy.visit('/'));

  it('should display daily forecast', () => {
    cy.get('[data-language]').should('have.length.greaterThan', 0);
  });
});
