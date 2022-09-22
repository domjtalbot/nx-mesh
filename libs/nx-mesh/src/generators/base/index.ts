import { convertNxGenerator } from '@nrwl/devkit';

import { baseGenerator } from './base';

export const baseSchematic = convertNxGenerator(baseGenerator);

export { baseGenerator } from './base';

export default baseGenerator;
