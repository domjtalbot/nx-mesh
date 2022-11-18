import type { Tree } from '@nrwl/devkit';
import type { NormalizedOptions } from './normalize-options';

import { cypressProjectGenerator } from '@nrwl/cypress';
import { Linter } from '@nrwl/linter';

export async function addCypress(host: Tree, options: NormalizedOptions) {
  const task = await cypressProjectGenerator(host, {
    ...options,
    directory: options.projectParentDirectory,
    linter: Linter.EsLint,
    name: `${options.name}-e2e`,
    project: options.projectName,
  });

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

  return task;
}

export default addCypress;
