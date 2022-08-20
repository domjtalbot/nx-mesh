import type { TargetConfiguration, Tree } from '@nrwl/devkit';

import { addProjectConfiguration } from '@nrwl/devkit';

import { AppGeneratorSchema } from '../schema';
import { normalizeOptions } from './normalize-options';

export function addProject(tree: Tree, options: AppGeneratorSchema) {
  const {
    appProjectDist,
    appProjectMesh,
    appProjectRoot,
    parsedTags,
    projectName,
  } = normalizeOptions(tree, options);

  const targets: Record<string, TargetConfiguration<unknown>> = {};

  targets['build'] = {
    executor: '@domjtalbot/nx-mesh:build-gateway',
    outputs: [appProjectMesh, '{options.outputPath}'],
    options: {
      dir: appProjectRoot,
      outputPath: appProjectDist,
    },
  };

  targets['serve'] = {
    executor: '@domjtalbot/nx-mesh:serve',
    options: {
      dev: true,
      dir: appProjectRoot,
    },
    configurations: {
      production: {
        dev: false,
        dir: appProjectDist,
      },
    },
  };

  targets['validate'] = {
    executor: '@domjtalbot/nx-mesh:validate',
    options: {
      dir: appProjectRoot,
    },
  };

  addProjectConfiguration(tree, projectName, {
    root: appProjectRoot,
    projectType: 'application',
    sourceRoot: `${appProjectRoot}/`,
    targets,
    tags: parsedTags,
  });
}

export default addProject;
