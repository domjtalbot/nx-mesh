import type { ExecutorContext } from '@nrwl/devkit';
import type { BuildExecutorSchema } from '../schema';

import { writeJsonFile } from '@nrwl/devkit';
import { readCachedProjectGraph } from '@nrwl/devkit';
import { createPackageJson as generatePackageJson } from '@nrwl/workspace/src/utilities/create-package-json';
import { readFile } from 'fs/promises';
import { resolve, join } from 'path';

import { meshPackages } from '../../../utils/mesh-packages';

export async function createPackageJson(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const depGraph = readCachedProjectGraph();

  const dir = resolve(context.root, options.dir);
  const meshBuildIndexPath = join(dir, '.mesh/index.ts');

  const meshBuiltFile = await readFile(meshBuildIndexPath, 'utf8');

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

  const meshCliNode = depGraph.externalNodes['npm:@graphql-mesh/cli'];

  if (meshCliNode) {
    packageJson.dependencies['@graphql-mesh/cli'] = meshCliNode.data.version;
  }

  const graphqlNode = depGraph.externalNodes['npm:graphql'];

  if (graphqlNode) {
    packageJson.dependencies['graphql'] = graphqlNode.data.version;
  }

  meshPackages.forEach((packageName) => {
    if (meshBuiltFile.indexOf(packageName) > -1) {
      const packageNode = depGraph.externalNodes[`npm:${packageName}`];

      if (packageNode) {
        packageJson.dependencies[packageName] = packageNode.data.version;
      }
    }
  });

  Object.keys(packageJson.dependencies).forEach((name) => {
    if (packageJson.dependencies[name] === '*') {
      const dependencyNode = depGraph.externalNodes[`npm:${name}`];

      if (dependencyNode) {
        packageJson.dependencies[name] = dependencyNode.data.version;
      }
    }
  });

  writeJsonFile(`${options.outputPath}/package.json`, packageJson);
}
