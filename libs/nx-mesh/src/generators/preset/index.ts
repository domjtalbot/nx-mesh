import { convertNxGenerator } from '@nrwl/devkit';

import { presetGenerator } from './preset';

export const presetSchematic = convertNxGenerator(presetGenerator);

export { presetGenerator } from './preset';

export default presetGenerator;
