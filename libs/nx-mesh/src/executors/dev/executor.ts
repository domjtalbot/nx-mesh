import type { ExecutorContext } from '@nrwl/devkit';

import { logger } from '@nrwl/devkit';
import { resolve } from 'path';

import { childProcess, runMeshCli } from '../../utils/mesh-cli';
import getServeLocation from './lib/get-serve-location';
import { DevExecutorSchema } from './schema';

const readyWhenMsg = 'Serving GraphQL Mesh:';

export async function* devExecutor(
  options: DevExecutorSchema,
  context: ExecutorContext
) {
  const { baseUrl, port } = await getServeLocation(options);

  logger.info('Starting GraphQL Mesh dev server...');

  runMeshCli(
    'dev',
    {
      args: {
        dir: resolve(context.root, options.dir),
        port,
        require: options.require,
      },
      env: {
        debug: options.debug,
      },
    },
    context,
    {
      stdio: 'pipe',
    }
  );

  childProcess?.stdout?.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  childProcess?.stderr?.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  await new Promise<void>((resolve) => {
    childProcess?.stdout?.on('data', (chunk) => {
      if (chunk.toString().indexOf(readyWhenMsg) > -1) {
        resolve();
      }
    });
  });

  yield {
    baseUrl,
    success: true,
  };

  await new Promise<{ success: boolean }>(() => {
    // This Promise intentionally never resolves, leaving the process running.
  });
}

export default devExecutor;
