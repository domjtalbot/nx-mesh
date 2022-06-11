describe('nx-plugin-graphql-mesh', () => {
  describe('dev', () => {
    it('should start graphql-mesh in dev mode', () => {
      cy.request('/graphql/health').then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.have.property('message', 'alive');
      });
    });

    it('should still be running after 15 seconds', () => {
      cy.wait(1000 * 15)
        .request('/graphql/health')
        .then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body).to.have.property('message', 'alive');
        });
    });
  });
});
