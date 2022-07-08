describe('nextjs-trippin', () => {
  beforeEach(() => cy.visit('/'));

  it('should display airlines', () => {
    cy.get('[data-airline]').should('have.length.greaterThan', 0);
  });
});
