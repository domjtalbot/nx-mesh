import type { ExecutorContext } from '@nrwl/devkit';

import { logger } from '@nrwl/devkit';
import { resolve } from 'node:path';

import { childProcess, runMeshCli } from '../../utils/mesh-cli';
import getServeLocation from './lib/get-serve-location';
import { StartExecutorSchema } from './schema';

const readyWhenMsg = 'Serving GraphQL Mesh:';

export async function* startExecutor(
  options: StartExecutorSchema,
  context: ExecutorContext
) {
  if (options.dir === undefined) {
    throw new Error("Please define the 'dir' value");
  }

  const { baseUrl, port } = await getServeLocation(options);

  logger.info('Starting GraphQL Mesh start server...');

  runMeshCli(
    'start',
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

export default startExecutor;
