import type { Tree } from '@nrwl/devkit';

import type { SdkGeneratorSchema } from './schema';

import { convertNxGenerator, formatFiles } from '@nrwl/devkit';
import { libraryGenerator as nodeLibraryGenerator } from '@nrwl/node';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

import { createSdkFiles } from './lib/create-sdk-files';
import { addLinting } from './lib/add-linting';
import { addProject } from './lib/add-project';
import { setDefaults } from './lib/set-defaults';
import { normalizeOptions } from './lib/normalize-options';

export async function sdkGenerator(tree: Tree, options: SdkGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  const libraryTask = await nodeLibraryGenerator(tree, normalizedOptions);

  addProject(tree, normalizedOptions);
  createSdkFiles(tree, normalizedOptions);
  addLinting(tree, normalizedOptions);
  setDefaults(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(libraryTask);
}

export const sdkSchematic = convertNxGenerator(sdkGenerator);

export default sdkGenerator;
