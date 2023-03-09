import type { Tree } from '@nrwl/devkit';

import type { SdkGeneratorSchema } from './schema';

import { convertNxGenerator } from '@nrwl/devkit';
import { baseGenerator } from '../base';

export async function sdkGenerator(tree: Tree, options: SdkGeneratorSchema) {
  return await baseGenerator(tree, {
    ...options,
    projectType: 'lib',
  });
}

export const sdkSchematic = convertNxGenerator(sdkGenerator);

export default sdkGenerator;
