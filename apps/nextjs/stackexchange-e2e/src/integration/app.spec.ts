describe('nextjs-stackexchange', () => {
  beforeEach(() => cy.visit('/'));

  it('should display featured questions', () => {
    cy.get('[data-question]').should('have.length.greaterThan', 0);
  });
});
