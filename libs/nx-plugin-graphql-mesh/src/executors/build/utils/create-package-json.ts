import type { ExecutorContext } from '@nrwl/devkit';
import type { BuildExecutorSchema } from '../schema';

import { writeJsonFile } from '@nrwl/devkit';
import { readCachedProjectGraph } from '@nrwl/devkit';
import { createPackageJson as generatePackageJson } from '@nrwl/workspace/src/utilities/create-package-json';

import { meshPackages } from '../../../utils/mesh-packages';
import { getMeshPackages } from './get-mesh-packages';
import { getPackageVersions } from './get-package-versions';
import { getSourceFile } from './get-source-file';
import { getWildcardPackages } from './get-wildcard-packages';

export async function createPackageJson(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const depGraph = readCachedProjectGraph();

  const packageJson = generatePackageJson(context.projectName, depGraph, {
    root: context.root,
    projectRoot: context.workspace.projects[context.projectName].sourceRoot,
  });

  if (!packageJson.name) {
    packageJson.name = context.projectName;
  }

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  packageJson.scripts.start = 'graphql-mesh start';

  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }

  const sourceFile = await getSourceFile({
    dir: options.dir,
    root: context.root,
  });

  const packages = [
    '@graphql-mesh/cli',
    'graphql',
    ...getWildcardPackages(packageJson.dependencies),
    ...getMeshPackages(sourceFile, meshPackages),
  ];

  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...getPackageVersions(packages, depGraph.externalNodes),
  };

  writeJsonFile(`${options.outputPath}/package.json`, packageJson);
}
