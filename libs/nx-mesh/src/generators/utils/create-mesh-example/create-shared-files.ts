import type { Tree } from '@nrwl/devkit';
import type { CreateMeshExampleOptions } from './types';

import { generateFiles } from '@nrwl/devkit';
import * as path from 'path';

export function createSharedFiles(
  tree: Tree,
  options: CreateMeshExampleOptions
) {
  const examplePath = `./examples/${options.example}/shared`;

  generateFiles(
    tree,
    path.join(__dirname, examplePath),
    options.projectDirectory,
    {
      configExtension: options.configExtension,
      isSdk: options.isSdk,
      tmpl: '',
    }
  );
}

export default createSharedFiles;
