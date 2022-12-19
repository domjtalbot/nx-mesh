import type { Tree } from '@nrwl/devkit';
import type { SetOptional } from 'type-fest';

import type { CreateMeshExampleOptions } from './types';

import { generateFiles } from '@nrwl/devkit';
import * as path from 'path';

export function createCodegenFiles(
  tree: Tree,
  options: SetOptional<CreateMeshExampleOptions, 'configExtension' | 'isSdk'>
) {
  const examplePath = `./examples/${options.example}/codegen`;

  generateFiles(
    tree,
    path.join(__dirname, examplePath),
    options.projectDirectory,
    {
      projectDirectory: options.projectDirectory,
      tmpl: '',
    }
  );
}

export default createCodegenFiles;
