import type { ExecutorContext } from '@nrwl/devkit';

import { resolve } from 'path';

import { runMeshCli } from '../../utils/mesh-cli';

import { BuildExecutorSchema } from './schema';

export default async function* buildExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  await runMeshCli(
    'build',
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
