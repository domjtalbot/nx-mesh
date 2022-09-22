import type { Tree } from '@nrwl/devkit';

import { addDependenciesToPackageJson } from '@nrwl/devkit';

import {
  graphqlVersion,
  meshCliVersion,
  meshRuntimeVersion,
  meshUtilsVersion,
  meshOpenApiVersion,
} from '../../../utils/versions';

export function addMeshDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      '@graphql-mesh/cli': meshCliVersion,
      '@graphql-mesh/openapi': meshOpenApiVersion,
      '@graphql-mesh/runtime': meshRuntimeVersion,
      '@graphql-mesh/utils': meshUtilsVersion,
      graphql: graphqlVersion,
    },
    {}
  );
}

export default addMeshDependencies;
