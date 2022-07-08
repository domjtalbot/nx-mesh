describe('nextjs-weatherbit', () => {
  beforeEach(() => cy.visit('/'));

  it('should display daily forecast', () => {
    cy.get('[data-daily-forecast]').should('have.length.greaterThan', 0);
  });
});
