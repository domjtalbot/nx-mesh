import type { Tree } from '@nrwl/devkit';

import type { AppGeneratorSchema } from './schema';

import { convertNxGenerator, formatFiles } from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

import { addCypress } from './lib/add-cypress';
import { addJest } from './lib/add-jest';
import { addLinting } from './lib/add-linting';
import { addProject } from './lib/add-project';
import { createApplicationFiles } from './lib/create-application-files';
import { generateCypressTests } from './lib/generate-cypress-tests';
import { meshInitGenerator } from '../init/init';
import { normalizeOptions } from './lib/normalize-options';
import { setDefaults } from './lib/set-defaults';

export async function applicationGenerator(
  host: Tree,
  schema: AppGeneratorSchema
) {
  const options = normalizeOptions(host, schema);

  const meshTask = await meshInitGenerator(host, {
    ...options,
    skipFormat: true,
  });

  createApplicationFiles(host, options);
  addProject(host, options);

  const cypressTask = await addCypress(host, options);
  const jestTask = await addJest(host, options);
  const lintTask = await addLinting(host, options);

  generateCypressTests(host, options);

  setDefaults(host, options);

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(meshTask, cypressTask, jestTask, lintTask);
}

export const applicationSchematic = convertNxGenerator(applicationGenerator);

export default applicationGenerator;
