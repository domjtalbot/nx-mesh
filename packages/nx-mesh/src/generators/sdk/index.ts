import { convertNxGenerator } from '@nrwl/devkit';

import { sdkGenerator } from './sdk';

export const sdkSchematic = convertNxGenerator(sdkGenerator);

export { sdkGenerator } from './sdk';

export default sdkGenerator;
