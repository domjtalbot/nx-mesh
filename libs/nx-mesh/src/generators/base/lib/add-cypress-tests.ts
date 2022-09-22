import type { Tree } from '@nrwl/devkit';

import type { NormalizedOptions } from './normalize-options';

export function addCypressTests(host: Tree, options: NormalizedOptions) {
  const specFile = `${options.projectE2eDirectory}/src/integration/app.spec.${
    options.js ? 'js' : 'ts'
  }`;

  const content = `
describe('${options.name}', () => {
  it('should start a mesh server', () => {
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
`;

  if (content) {
    host.write(specFile, content);
  }
}

export default addCypressTests;
