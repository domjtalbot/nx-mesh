import type { DevExecutorSchema } from '../dev/schema';
import type { StartExecutorSchema } from '../start/schema';

export interface ServeExecutorSchema
  extends DevExecutorSchema,
    StartExecutorSchema {
  dev: boolean;
}
