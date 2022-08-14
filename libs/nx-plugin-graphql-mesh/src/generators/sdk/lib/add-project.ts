import type { Tree } from '@nrwl/devkit';

import type { NormalizedSchema } from './normalize-options';

import {
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { addSwcConfig } from '@nrwl/js/src/utils/swc/add-swc-config';
import { addSwcDependencies } from '@nrwl/js/src/utils/swc/add-swc-dependencies';

import { normalizeOptions } from './normalize-options';

export function addProject(tree: Tree, options: NormalizedSchema) {
  const { isSwc, libProjectDist, libProjectMesh, libProjectRoot, projectName } =
    normalizeOptions(tree, options);

  if (isSwc) {
    tree.delete(`${options.libProjectRoot}/.babelrc`);
    addSwcDependencies(tree);
    addSwcConfig(tree, options.projectRoot);
  }

  const project = readProjectConfiguration(tree, options.libProjectName);

  const targets = { ...project?.targets };

  targets['build'] = {
    executor: `@domjtalbot/nx-plugin-graphql-mesh:build${isSwc ? '-swc' : ''}`,
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
