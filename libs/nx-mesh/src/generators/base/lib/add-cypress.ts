import type { Tree } from '@nrwl/devkit';
import type { NormalizedOptions } from './normalize-options';

import { cypressProjectGenerator } from '@nrwl/cypress';
import { Linter } from '@nrwl/linter';

export async function addCypress(host: Tree, options: NormalizedOptions) {
  return await cypressProjectGenerator(host, {
    ...options,
    directory: options.projectParentDirectory,
    linter: Linter.EsLint,
    name: `${options.name}-e2e`,
    project: options.projectName,
    standaloneConfig: false,
  });
}

export default addCypress;
