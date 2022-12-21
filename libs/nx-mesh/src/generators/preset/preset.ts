import type { Tree } from '@nrwl/devkit';

import type { PresetGeneratorSchema } from './schema';

import { convertNxGenerator } from '@nrwl/devkit';

import { sdkGenerator } from '../sdk';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  return await sdkGenerator(tree, options);
}

export const presetSchematic = convertNxGenerator(presetGenerator);

export default presetGenerator;
