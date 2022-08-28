import type { Tree } from '@nrwl/devkit';

import { addDependenciesToPackageJson } from '@nrwl/devkit';

import {
  graphqlVersion,
  meshCliVersion,
  meshRuntimeVersion,
  meshUtilsVersion,
  meshOpenApiVersion,
} from '../../../utils/versions';

export function updateDependencies(host: Tree) {
  return addDependenciesToPackageJson(
    host,
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

export default updateDependencies;
