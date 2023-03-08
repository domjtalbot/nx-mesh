describe('openapi/javascript-wiki', () => {
  beforeEach(() => cy.visit('/sources/openapi/javascript-wiki'));

  it('should display wiki data', () => {
    cy.get('[data-wiki]').should('have.length.greaterThan', 0);
  });
});
