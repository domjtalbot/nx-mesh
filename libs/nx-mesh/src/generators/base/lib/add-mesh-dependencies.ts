import type { Tree } from '@nrwl/devkit';

import type { NormalizedOptions } from './normalize-options';

import { addDependenciesToPackageJson } from '@nrwl/devkit';

import { versions } from '../../../utils/versions';
import { examples } from './create-mesh-config/examples';

export function addMeshDependencies(host: Tree, options: NormalizedOptions) {
  let exampleDeps = {};

  examples[options.meshExampleProject].dependencies.forEach((dep) => {
    exampleDeps = {
      ...exampleDeps,
      ...versions[dep],
    };
  });

  return addDependenciesToPackageJson(
    host,
    {
      ...exampleDeps,
      ...versions['@graphql-mesh/cli'],
      ...versions['@graphql-mesh/runtime'],
      ...versions['@graphql-mesh/utils'],
      ...versions['graphql'],
    },
    {}
  );
}

export default addMeshDependencies;
