import type { Tree } from '@nrwl/devkit';

import { offsetFromRoot } from '@nrwl/devkit';

export function getRootTsConfigPathInTree(tree: Tree): string | null {
  for (const path of ['tsconfig.base.json', 'tsconfig.json']) {
    if (tree.exists(path)) {
      return path;
    }
  }

  return 'tsconfig.base.json';
}

export const getRelativePathToRootTsConfig = (
  tree: Tree,
  targetPath: string
): string => offsetFromRoot(targetPath) + getRootTsConfigPathInTree(tree);
