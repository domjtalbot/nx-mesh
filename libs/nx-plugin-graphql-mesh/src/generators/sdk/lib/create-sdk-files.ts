import type { Tree } from '@nrwl/devkit';

import type { NormalizedSchema } from './normalize-options';

import { generateFiles, names, offsetFromRoot } from '@nrwl/devkit';
import { getRelativePathToRootTsConfig } from '@nrwl/workspace/src/utilities/typescript';
import * as path from 'path';

import { createMeshConfig } from './create-mesh-config';

export function createSdkFiles(tree: Tree, options: NormalizedSchema) {
  tree.delete(`${options.libProjectRoot}/src/index.ts`);
  tree.delete(`${options.libProjectRoot}/src/lib/${options.projectName}.ts`);
  tree.delete(
    `${options.libProjectRoot}/src/lib/${options.projectName}.spec.ts`
  );

  const templateOptions = {
    ...options,
    ...names(options.name),
    meshConfigExt: options.meshConfig ?? 'yml',
    meshConfigContent: createMeshConfig(options.meshConfig),
    offsetFromRoot: offsetFromRoot(options.libProjectRoot),
    rootTsConfigPath: getRelativePathToRootTsConfig(
      tree,
      options.libProjectRoot
    ),
    template: '',
    tmpl: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, '../files'),
    options.libProjectRoot,
    templateOptions
  );
}

export default createSdkFiles;
