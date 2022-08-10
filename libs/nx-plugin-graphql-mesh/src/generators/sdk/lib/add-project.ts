import type { Tree } from '@nrwl/devkit';

import type { NormalizedSchema } from './normalize-options';

import {
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { normalizeOptions } from './normalize-options';

export function addProject(tree: Tree, options: NormalizedSchema) {
  const { libProjectDist, libProjectMesh, libProjectRoot, projectName } =
    normalizeOptions(tree, options);

  const project = readProjectConfiguration(tree, options.libProjectName);

  const targets = { ...project?.targets };

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

  if (project) {
    project.targets = targets;
  }

  updateProjectConfiguration(tree, projectName, project);
}

export default addProject;
