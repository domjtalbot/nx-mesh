describe('javascript-wiki', () => {
  it('should start a mesh server', () => {
    cy.request('/health').then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });

  it('should still be running after 15 seconds', () => {
    cy.wait(1000 * 15)
      .request('/health')
      .then((resp) => {
        expect(resp.status).to.eq(200);
      });
  });
});
