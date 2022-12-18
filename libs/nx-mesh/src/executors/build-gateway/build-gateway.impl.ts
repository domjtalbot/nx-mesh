import type { ExecutorContext } from '@nrwl/devkit';

import { logger } from '@nrwl/devkit';
import { directoryExists } from '@nrwl/workspace/src/utilities/fileutils';
import { copySync, mkdir } from 'fs-extra';
import { join, resolve } from 'path';

import { createPackageJson } from '../../utils';
import { runMeshCli } from '../../utils/mesh-cli';
import { BuildGatewayExecutorSchema } from './schema';

export default async function* buildExecutor(
  options: BuildGatewayExecutorSchema,
  context: ExecutorContext
) {
  if (options.dir === undefined) {
    throw new Error("Please define the 'dir' value");
  }

  const dir = resolve(context.root, options.dir);

  if (!directoryExists(options.outputPath)) {
    mkdir(options.outputPath, {
      recursive: true,
    });
  }

  await runMeshCli(
    'build',
    {
      args: {
        dir,
        require: options.require,
      },
      env: {
        debug: options.debug,
      },
    },
    context
  );

  copySync(join(dir, '.mesh'), join(options.outputPath, '.mesh'));

  logger.info('');
  logger.info('Creating package.json...');

  await createPackageJson(
    {
      dir: options.dir,
      outputPath: options.outputPath,
    },
    context
  );

  yield {
    success: true,
  };
}
