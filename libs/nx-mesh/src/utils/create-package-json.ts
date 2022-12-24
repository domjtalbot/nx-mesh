import type { ExecutorContext } from '@nrwl/devkit';

import {
  createPackageJson as generatePackageJson,
  readCachedProjectGraph,
  writeJsonFile,
} from '@nrwl/devkit';
import { join } from 'path';

import { meshPackages } from './mesh-packages';
import { getMeshPackages } from './get-mesh-packages';
import { getPackageVersions } from './get-package-versions';
import { getSourceFile } from './get-source-file';
import { getWildcardPackages } from './get-wildcard-packages';

export async function createPackageJson(
  options: {
    dir: string;
    outputPath: string;
    projectRoot?: string;
  },
  context: ExecutorContext
) {
  if (context.projectName === undefined) {
    throw new Error('project name is undefined');
  }

  const depGraph = readCachedProjectGraph();

  const packageJson = generatePackageJson(context.projectName, depGraph, {
    root: context.root,
    // projectRoot:
    //   options.projectRoot ??
    //   context.workspace.projects[context.projectName].sourceRoot,
  });

  if (!packageJson.name) {
    packageJson.name = context.projectName;
  }

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  packageJson.scripts['start'] = 'graphql-mesh start';

  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }

  const sourceFile = await getSourceFile({
    dir: options.dir,
    root: context.root,
  });

  let packages = [
    '@graphql-mesh/cli',
    'graphql',
    ...getMeshPackages(sourceFile, meshPackages),
  ];

  if (packageJson.dependencies) {
    packages = [...packages, ...getWildcardPackages(packageJson.dependencies)];
  }

  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...getPackageVersions(packages, depGraph.externalNodes),
  };

  const outputFile = join(options.outputPath, 'package.json');

  writeJsonFile(outputFile, packageJson);

  return {
    outputFile,
    packageJson,
  };
}
