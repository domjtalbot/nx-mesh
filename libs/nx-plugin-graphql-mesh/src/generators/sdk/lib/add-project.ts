import type { TargetConfiguration, Tree } from '@nrwl/devkit';

import { updateProjectConfiguration } from '@nrwl/devkit';

import { SdkGeneratorSchema } from '../schema';
import { normalizeOptions } from './normalize-options';

export function addProject(tree: Tree, options: SdkGeneratorSchema) {
  const {
    libProjectDist,
    libProjectMesh,
    libProjectRoot,
    parsedTags,
    projectName,
  } = normalizeOptions(tree, options);

  const targets: Record<string, TargetConfiguration<unknown>> = {};

  targets['build'] = {
    executor: '@domjtalbot/nx-plugin-graphql-mesh:build',
    outputs: [libProjectMesh, '{options.outputPath}'],
    options: {
      dir: libProjectRoot,
      main: `${libProjectRoot}/src/index.ts`,
      outputPath: libProjectDist,
      tsConfig: `${libProjectRoot}/tsconfig.lib.json`,
    },
  };

  targets['serve'] = {
    executor: '@domjtalbot/nx-plugin-graphql-mesh:serve',
    options: {
      dev: true,
      dir: libProjectRoot,
      port: 4200,
    },
  };

  targets['validate'] = {
    executor: '@domjtalbot/nx-plugin-graphql-mesh:validate',
    options: {
      dir: libProjectRoot,
    },
  };

  updateProjectConfiguration(tree, projectName, {
    root: libProjectRoot,
    projectType: 'library',
    sourceRoot: `${libProjectRoot}/`,
    targets,
    tags: parsedTags,
  });
}

export default addProject;
