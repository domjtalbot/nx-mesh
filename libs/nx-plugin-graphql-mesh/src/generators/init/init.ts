import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import type { InitSchema } from './schema';

import { cypressInitGenerator } from '@nrwl/cypress';
import { convertNxGenerator } from '@nrwl/devkit';
import { initGenerator as nodeInitGenerator } from '@nrwl/node';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

import { updateDependencies } from './lib/update-dependencies';

export async function meshInitGenerator(host: Tree, schema: InitSchema) {
  const tasks: GeneratorCallback[] = [];

  await nodeInitGenerator(host, schema);

  if (!schema.e2eTestRunner || schema.e2eTestRunner === 'cypress') {
    const cypressTask = cypressInitGenerator(host, {});
    tasks.push(cypressTask);
  }

  const installTask = updateDependencies(host);
  tasks.push(installTask);

  return runTasksInSerial(...tasks);
}

export const meshInitSchematic = convertNxGenerator(meshInitGenerator);

export default meshInitGenerator;
