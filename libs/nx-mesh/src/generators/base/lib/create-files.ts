import type { Tree } from '@nrwl/devkit';

import type { NormalizedOptions } from './normalize-options';

import { generateFiles } from '@nrwl/devkit';
import * as path from 'path';

export function createFiles(tree: Tree, options: NormalizedOptions) {
  generateFiles(
    tree,
    path.join(__dirname, '../files/shared'),
    options.projectDirectory,
    options
  );

  if (options.isApp) {
    generateFiles(
      tree,
      path.join(__dirname, '../files/app'),
      options.projectDirectory,
      options
    );
  }
}

export default createFiles;
