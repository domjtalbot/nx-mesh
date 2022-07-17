import type { ExecutorContext } from '@nrwl/devkit';

import { logger } from '@nrwl/devkit';
import { resolve } from 'path';

import { runMeshCli } from '../../utils/mesh-cli';

import { ValidateExecutorSchema } from './schema';

export default async function* startExecutor(
  options: ValidateExecutorSchema,
  context: ExecutorContext
) {
  if (options.dir === undefined) {
    throw new Error("Please define the 'dir' value");
  }

  logger.info('Validating GraphQL Mesh artifacts...');

  await runMeshCli(
    'validate',
    {
      args: {
        dir: resolve(context.root, options.dir),
        require: options.require,
      },
      env: {
        debug: options.debug,
      },
    },
    context
  );

  yield {
    success: true,
  };
}
