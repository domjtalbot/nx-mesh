describe('soap/country-info', () => {
  beforeEach(() => cy.visit('/sources/soap/country-info'));

  it('should display daily forecast', () => {
    cy.get('[data-language]').should('have.length.greaterThan', 0);
  });
});
