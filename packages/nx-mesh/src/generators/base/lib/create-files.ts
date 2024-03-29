import type { Tree } from '@nrwl/devkit';

import type { NormalizedOptions } from './normalize-options';

import { generateFiles } from '@nrwl/devkit';
import * as path from 'node:path';

export function createFiles(tree: Tree, options: NormalizedOptions) {
  if (options.isApp) {
    generateFiles(
      tree,
      path.join(__dirname, '../files/app'),
      options.projectDirectory,
      { ...options, tmpl: '' }
    );
  }

  if (options.isLibrary) {
    tree.delete(
      `${options.projectDirectory}/src/lib/${options.projectName}.spec.ts`
    );
    tree.delete(
      `${options.projectDirectory}/src/lib/${options.projectName}.ts`
    );
    tree.delete(`${options.projectDirectory}/src/index.ts`);

    if (
      options.isSwc &&
      tree.exists(`${options.projectDirectory}/.lib.swcrc`)
    ) {
      tree.rename(
        `${options.projectDirectory}/.lib.swcrc`,
        `${options.projectDirectory}/.swcrc`
      );
    }

    generateFiles(
      tree,
      path.join(__dirname, '../files/lib'),
      options.projectDirectory,
      {
        ...options,
        tmpl: '',
      }
    );
  }
}

export default createFiles;
