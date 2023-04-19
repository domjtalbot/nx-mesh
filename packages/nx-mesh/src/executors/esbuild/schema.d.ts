import type { EsBuildExecutorOptions as NxEsBuildExecutorOptions } from '@nrwl/esbuild';

import type { BuildExecutorSchema } from '../build/schema';

export interface EsbuildExecutorSchema
  extends NxEsBuildExecutorOptions,
    BuildExecutorSchema {} // eslint-disable-line
