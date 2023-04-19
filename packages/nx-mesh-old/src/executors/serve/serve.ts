import type { ExecutorContext } from '@nrwl/devkit';

import type { ServeExecutorSchema } from './schema';

import { devExecutor } from '../dev/dev';
import { startExecutor } from '../start/start';

export async function* serveExecutor(
  options: ServeExecutorSchema,
  context: ExecutorContext
) {
  if (options.dev) {
    return yield* devExecutor(options, context);
  }

  return yield* startExecutor(options, context);
}

export default serveExecutor;
