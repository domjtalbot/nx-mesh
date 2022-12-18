import type { ExecutorContext } from '@nrwl/devkit';

import { logger } from '@nrwl/devkit';
import { resolve } from 'path';

import { createPackageJson } from '../../utils';
import { runCodegenCli } from '../../utils/graphql-codegen-cli';
import { runMeshCli } from '../../utils/mesh-cli';
import { swcExecutor } from './swc-executor/swc.impl';
import { BuildSWCExecutorSchema } from './schema';

export default async function* buildExecutor(
  options: BuildSWCExecutorSchema,
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

  if (options.codegen?.config) {
    logger.info('');
    logger.info('Running GraphQL Codegen...');

    await runCodegenCli(
      {
        ...options.codegen,
        debug: options.debug,
        verbose: true,
        watch: options.watch,
      },
      context
    );
  }

  logger.info('');
  logger.info('Running SWC compiler...');

  const tsc = swcExecutor(
    {
      assets: [...options.assets],
      main: options.main,
      outputPath: options.outputPath,
      skipTypeCheck: options.skipTypeCheck,
      swcrc: options.swcrc,
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
    logger.info('');
    logger.info('Creating package.json...');

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
