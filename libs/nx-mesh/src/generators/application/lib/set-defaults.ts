import type { Tree } from '@nrwl/devkit';

import type { NormalizedSchema } from './normalize-options';

import {
  readWorkspaceConfiguration,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';

export function setDefaults(host: Tree, options: NormalizedSchema) {
  const workspace = readWorkspaceConfiguration(host);

  if (!workspace.defaultProject) {
    workspace.defaultProject = options.projectName;
  }

  if (workspace.tasksRunnerOptions?.['default']?.runner === '@nrwl/nx-cloud') {
    const cacheableOperations =
      (workspace.tasksRunnerOptions['default'].options
        ?.cacheableOperations as string[]) ?? [];

    if (!cacheableOperations.includes('validate')) {
      workspace.tasksRunnerOptions['default'].options = {
        ...workspace.tasksRunnerOptions['default'].options,
        cacheableOperations: [...cacheableOperations, 'validate'],
      };
    }
  }

  if (workspace.targetDependencies) {
    workspace.targetDependencies = {
      ...workspace.targetDependencies,
      validate: [
        {
          target: 'build',
          projects: 'self',
        },
      ],
    };
  }

  workspace.generators = workspace.generators || {};
  workspace.generators['@domjtalbot/nx-mesh'] =
    workspace.generators['@domjtalbot/nx-mesh'] || {};

  const prev = workspace.generators['@domjtalbot/nx-mesh'];

  workspace.generators = {
    ...workspace.generators,
    '@domjtalbot/nx-mesh': {
      ...prev,
      application: {
        meshConfig: options.meshConfig,
        linter: options.linter,
        ...prev['application'],
      },
    },
  };

  if (!workspace.defaultProject) {
    workspace.defaultProject = options.name;
  }

  updateWorkspaceConfiguration(host, workspace);
}

export default setDefaults;
