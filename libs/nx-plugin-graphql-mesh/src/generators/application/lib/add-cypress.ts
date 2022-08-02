import type { Tree } from '@nrwl/devkit';
import type { NormalizedSchema } from './normalize-options';

import { cypressProjectGenerator } from '@nrwl/cypress';
import { Linter } from '@nrwl/linter';

export async function addCypress(host: Tree, options: NormalizedSchema) {
  if (options.e2eTestRunner !== 'cypress') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  return cypressProjectGenerator(host, {
    ...options,
    directory: options.directory,
    linter: Linter.EsLint,
    name: `${options.name}-e2e`,
    project: options.projectName,
  });
}

export default addCypress;
