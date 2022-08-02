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

  workspace.generators = workspace.generators || {};
  workspace.generators['@domjtalbot/nx-plugin-graphql-mesh'] =
    workspace.generators['@domjtalbot/nx-plugin-graphql-mesh'] || {};

  const prev = workspace.generators['@domjtalbot/nx-plugin-graphql-mesh'];

  workspace.generators = {
    ...workspace.generators,
    '@domjtalbot/nx-plugin-graphql-mesh': {
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
