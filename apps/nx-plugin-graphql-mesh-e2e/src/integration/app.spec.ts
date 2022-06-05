describe('nx-plugin-graphql-mesh', () => {
  describe('dev', () => {
    it('should start graphql-mesh in dev mode', () => {
      cy.request('/graphql/health').then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.have.property('message', 'alive');
      });
    });
  });
});
