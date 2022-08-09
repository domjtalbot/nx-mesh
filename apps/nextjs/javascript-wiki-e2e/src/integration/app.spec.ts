describe('nextjs-javascript-wiki', () => {
  beforeEach(() => cy.visit('/'));

  it('should display wiki data', () => {
    cy.get('[data-wiki]').should('have.length.greaterThan', 0);
  });
});
