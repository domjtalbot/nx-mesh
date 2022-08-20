import type { Tree } from '@nrwl/devkit';

import { getRelativePathToRootTsConfig } from '@nrwl/workspace/src/utilities/typescript';

import type { NormalizedSchema } from './normalize-options';

import { generateFiles, names, offsetFromRoot } from '@nrwl/devkit';

import * as path from 'path';

import { createMeshConfig } from './create-mesh-config';

export function createApplicationFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    meshConfigExt: options.meshConfig ?? 'yml',
    meshConfigContent: createMeshConfig(options.meshConfig),
    offsetFromRoot: offsetFromRoot(options.appProjectRoot),
    rootTsConfigPath: getRelativePathToRootTsConfig(
      tree,
      options.appProjectRoot
    ),
    template: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, '../files'),
    options.appProjectRoot,
    templateOptions
  );
}

export default createApplicationFiles;
