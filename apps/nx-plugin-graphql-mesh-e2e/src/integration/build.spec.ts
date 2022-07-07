describe('nx-plugin-graphql-mesh', () => {
  describe('build', () => {
    describe('nextjs/api', () => {
      it('should build a library that works as an Next.js API route', () => {
        cy.request('/api/graphql/health').then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body).to.have.property('message', 'alive');
        });
      });

      it('should still be running after 15 seconds', () => {
        cy.wait(1000 * 15)
          .request('/api/graphql/health')
          .then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.have.property('message', 'alive');
          });
      });
    });
  });
});
