import type { GeneratorCallback, Tree } from '@nrwl/devkit';

import type { BaseOptions } from './schema';

import { formatFiles } from '@nrwl/devkit';

import { runTasksInSerial } from '../../utils/run-tasks-in-serial';
import { createMeshExample } from '../utils/create-mesh-example';
import {
  addCypress,
  addJest,
  addLinting,
  addProjectConfig,
  createFiles,
  nodeGenerator,
  normalizeOptions,
  setDefaults,
} from './lib';

/**
 * Generate the foundation for a GraphQL Mesh project
 */
export async function baseGenerator(tree: Tree, baseOptions: BaseOptions) {
  const options = normalizeOptions(tree, baseOptions);
  const { isCypress, isApp, isLibrary, skipFormat } = options;

  const tasks: GeneratorCallback[] = [await nodeGenerator(tree, options)];

  createFiles(tree, options);
  addProjectConfig(tree, options);
  setDefaults(tree, options);
  createMeshExample(tree, {
    codegen: options.codegen,
    configExtension: options.meshConfigExt,
    example: options.example,
    isSdk: isLibrary,
    projectDirectory: options.projectDirectory,
  });

  if (isApp) {
    tasks.push(await addJest(tree, options));
  }

  if (isCypress) {
    tasks.push(await addCypress(tree, options));
  }

  if (options.linter) {
    tasks.push(await addLinting(tree, options));
  }

  if (!skipFormat) {
    formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default baseGenerator;
