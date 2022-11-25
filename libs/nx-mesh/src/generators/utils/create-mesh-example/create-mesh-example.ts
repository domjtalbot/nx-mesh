import type { Tree } from '@nrwl/devkit';
import type { CreateMeshExampleOptions } from './types';

import { addDependencies } from './add-dependencies';
import { createSharedFiles } from './create-shared-files';

export function createMeshExample(
  tree: Tree,
  options: CreateMeshExampleOptions
) {
  createSharedFiles(tree, options);

  addDependencies(tree, {
    example: options.example,
  });
}

export default createMeshExample;
