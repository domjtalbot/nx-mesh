import type { Tree } from '@nrwl/devkit';

import type { CreateMeshExampleOptions } from './types';

import { addDependenciesToPackageJson } from '@nrwl/devkit';

import { versions } from '../../../utils/versions';
import examples from './examples';

export function addDependencies(
  host: Tree,
  options: Pick<CreateMeshExampleOptions, 'example' | 'codegen'>
) {
  let exampleDeps = {
    ...versions['@graphql-mesh/cli'],
    ...versions['@graphql-mesh/runtime'],
    ...versions['@graphql-mesh/utils'],
    ...versions['graphql'],
  };

  examples[options.example].dependencies.forEach((dep) => {
    exampleDeps = {
      ...exampleDeps,
      ...versions[dep],
    };
  });

  if (options.codegen) {
    exampleDeps = {
      ...exampleDeps,
      ...versions['@graphql-codegen/cli'],
    };

    examples[options.example].codegenDependencies.forEach((dep) => {
      exampleDeps = {
        ...exampleDeps,
        ...versions[dep],
      };
    });
  }

  return addDependenciesToPackageJson(host, exampleDeps, {});
}

export default addDependencies;
