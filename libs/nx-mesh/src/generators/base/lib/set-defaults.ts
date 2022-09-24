import type { Tree } from '@nrwl/devkit';

import type { NormalizedOptions } from './normalize-options';

import {
  readWorkspaceConfiguration,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';

export function setDefaults(host: Tree, options: NormalizedOptions) {
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

  if (workspace.targetDefaults) {
    workspace.targetDefaults = {
      ...workspace.targetDefaults,
      validate: {
        dependsOn: ['build'],
      },
    };
  }

  workspace.generators = workspace.generators || {};
  workspace.generators['nx-mesh'] = workspace.generators['nx-mesh'] || {};

  const prev = workspace.generators['nx-mesh'];

  workspace.generators = {
    ...workspace.generators,
    'nx-mesh': {
      ...prev,
      [options.isApp ? 'application' : 'sdk']: {
        meshConfig: options.meshConfigExt,
        linter: options.linter,
        ...prev[options.isApp ? 'application' : 'sdk'],
      },
    },
  };

  if (!workspace.defaultProject) {
    workspace.defaultProject = options.name;
  }

  updateWorkspaceConfiguration(host, workspace);
}

export default setDefaults;
