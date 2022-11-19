import type { Tree } from '@nrwl/devkit';
import type { ProjectConfiguration } from 'nx/src/config/workspace-json-project-json';

import type { NormalizedOptions } from './normalize-options';

import {
  addProjectConfiguration,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { addSwcConfig } from '@nrwl/js/src/utils/swc/add-swc-config';
import { addSwcDependencies } from '@nrwl/js/src/utils/swc/add-swc-dependencies';

export function addProjectConfig(tree: Tree, options: NormalizedOptions) {
  const {
    isApp,
    isLibrary,
    isSwc,
    projectDirectory,
    projectDistDirectory,
    projectMeshDirectory,
    projectName,
    tags,
  } = options;

  if (isLibrary && isSwc) {
    tree.delete(`${options.projectDirectory}/.babelrc`);
    addSwcDependencies(tree);
    addSwcConfig(tree, projectDirectory);
  }

  const project: ProjectConfiguration = isLibrary
    ? readProjectConfiguration(tree, options.projectName)
    : {
        root: projectDirectory,
        projectType: 'application',
        sourceRoot: `${projectDirectory}/`,
        targets: {},
        tags,
      };

  const targets = { ...project?.targets };

  let buildExecutor = 'nx-mesh:build';

  if (isApp) {
    buildExecutor = `${buildExecutor}-gateway`;
  }

  if (isLibrary && isSwc) {
    buildExecutor = `${buildExecutor}-swc`;
  }

  targets['build'] = {
    executor: buildExecutor,
    outputs: [projectMeshDirectory, '{options.outputPath}'],
    options: {
      dir: projectDirectory,
      main: `${projectDirectory}/src/index.ts`,
      outputPath: projectDistDirectory,
      tsConfig: `${projectDirectory}/tsconfig.lib.json`,
    },
  };

  targets['serve'] = {
    executor: 'nx-mesh:serve',
    options: {
      dev: true,
      dir: projectDirectory,
    },
  };

  targets['validate'] = {
    executor: 'nx-mesh:validate',
    options: {
      dir: projectDirectory,
    },
  };

  if (project) {
    project.targets = targets;
  }

  if (isApp) {
    addProjectConfiguration(tree, projectName, project);
  } else {
    updateProjectConfiguration(tree, projectName, project);
  }
}

export default addProjectConfig;
