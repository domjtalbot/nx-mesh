describe('odata/trippin', () => {
  beforeEach(() => cy.visit('/sources/odata/trippin'));

  it('should display airports', () => {
    cy.get('[data-airport]').should('have.length.greaterThan', 0);
  });
});
