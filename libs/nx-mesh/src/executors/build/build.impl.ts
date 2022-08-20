import type { ExecutorContext } from '@nrwl/devkit';

import { logger } from '@nrwl/devkit';
import { tscExecutor } from '@nrwl/js/src/executors/tsc/tsc.impl';
import { resolve } from 'path';

import { createPackageJson, runMeshCli } from '../../utils';
import { BuildExecutorSchema } from './schema';

export default async function* buildExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  if (options.dir === undefined) {
    throw new Error("Please define the 'dir' value");
  }

  const dir = resolve(context.root, options.dir);
  let success = false;

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

  logger.info('');

  const tsc = tscExecutor(
    {
      assets: [...options.assets],
      main: options.main,
      outputPath: options.outputPath,
      transformers: [],
      tsConfig: options.tsConfig,
      watch: false,
    },
    context
  );

  for await (const result of tsc) {
    success = result.success;
  }

  if (success) {
    await createPackageJson(
      {
        dir: options.dir,
        outputPath: options.outputPath,
        projectRoot: options.outputPath,
      },
      context
    );
  }

  yield {
    success,
  };
}
