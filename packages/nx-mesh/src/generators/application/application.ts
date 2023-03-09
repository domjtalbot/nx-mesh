import type { Tree } from '@nrwl/devkit';

import type { AppGeneratorSchema } from './schema';

import { convertNxGenerator } from '@nrwl/devkit';
import { baseGenerator } from '../base';

export async function applicationGenerator(
  tree: Tree,
  options: AppGeneratorSchema
) {
  return await baseGenerator(tree, {
    ...options,
    projectType: 'app',
  });
}

export const applicationSchematic = convertNxGenerator(applicationGenerator);

export default applicationGenerator;
