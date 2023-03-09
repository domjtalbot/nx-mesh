import type { Tree } from '@nrwl/devkit';
import type { CreateMeshExampleOptions } from './types';

import { addDependencies } from './add-dependencies';
import { createCodegenFiles } from './create-codegen-files';
import { createSharedFiles } from './create-shared-files';

export function createMeshExample(
  tree: Tree,
  options: CreateMeshExampleOptions
) {
  createSharedFiles(tree, options);

  addDependencies(tree, {
    codegen: options.codegen,
    example: options.example,
  });

  if (options.isSdk && options.codegen) {
    createCodegenFiles(tree, options);
  }
}

export default createMeshExample;
