describe('example-nextjs-odata-trippin', () => {
  beforeEach(() => cy.visit('/'));

  it('should display airports', () => {
    cy.get('[data-airport]').should('have.length.greaterThan', 0);
  });
});
