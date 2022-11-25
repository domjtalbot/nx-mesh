import type { Tree } from '@nrwl/devkit';

import type { NormalizedOptions } from './normalize-options';

import { addDependenciesToPackageJson } from '@nrwl/devkit';

import { versions } from '../../../utils/versions';

export function addMeshDependencies(host: Tree, options: NormalizedOptions) {
  return addDependenciesToPackageJson(
    host,
    {
      ...versions['@graphql-mesh/cli'],
      ...versions['@graphql-mesh/runtime'],
      ...versions['@graphql-mesh/utils'],
      ...versions['graphql'],
    },
    {}
  );
}

export default addMeshDependencies;
