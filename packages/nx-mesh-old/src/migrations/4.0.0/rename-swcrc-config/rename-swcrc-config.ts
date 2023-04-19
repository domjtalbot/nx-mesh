import type { Tree } from '@nrwl/devkit';

import type { BuildSWCExecutorSchema } from '../../../executors/build-swc/schema';

import {
  formatFiles,
  getProjects,
  joinPathFragments,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { forEachExecutorOptions } from '@nrwl/workspace/src/utilities/executor-options-utils';

export default async function (tree: Tree) {
  let changesMade = false;
  const projects = getProjects(tree);

  forEachExecutorOptions(
    tree,
    'nx-mesh:build-swc',
    (_, projectName, target, configurationName) => {
      const projectConfiguration = projects.get(projectName);

      if (projectConfiguration) {
        const executorOptions: BuildSWCExecutorSchema = configurationName
          ? projectConfiguration?.targets?.[target]?.configurations?.[
              configurationName
            ]
          : projectConfiguration?.targets?.[target]?.options;

        // if the project uses a custom path to swcrc file
        // and only if it's the default name
        if (
          executorOptions.swcrc &&
          executorOptions.swcrc.includes('.lib.swcrc')
        ) {
          const newSwcrc = executorOptions.swcrc.replace(
            '.lib.swcrc',
            '.swcrc'
          );

          // rename the swcrc file first
          tree.rename(executorOptions.swcrc, newSwcrc);

          // then update the executor options
          executorOptions.swcrc = newSwcrc;
          changesMade = true;
        }

        const projectRoot =
          projectConfiguration.root ?? projectConfiguration.sourceRoot;
        const libSwcrcPath = joinPathFragments(projectRoot, '.lib.swcrc');

        const isLibSwcrcExist = tree.exists(libSwcrcPath);

        if (isLibSwcrcExist) {
          tree.rename(
            libSwcrcPath,
            libSwcrcPath.replace('.lib.swcrc', '.swcrc')
          );
          changesMade = true;
        }

        updateProjectConfiguration(tree, projectName, projectConfiguration);
      }
    }
  );

  if (changesMade) {
    await formatFiles(tree);
  }
}
