import type { Tree } from '@nrwl/devkit';

import type { CreateMeshExampleOptions } from './types';

import { addDependenciesToPackageJson } from '@nrwl/devkit';

import { versions } from '../../../utils/versions';
import examples from './examples';

export function addDependencies(
  host: Tree,
  options: Pick<CreateMeshExampleOptions, 'example'>
) {
  let exampleDeps = {};

  examples[options.example].dependencies.forEach((dep) => {
    exampleDeps = {
      ...exampleDeps,
      ...versions[dep],
    };
  });

  return addDependenciesToPackageJson(host, exampleDeps, {});
}

export default addDependencies;
