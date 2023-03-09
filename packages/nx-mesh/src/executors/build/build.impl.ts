import type { ExecutorContext } from '@nrwl/devkit';

import { logger } from '@nrwl/devkit';
import { tscExecutor } from '@nrwl/js/src/executors/tsc/tsc.impl';
import { resolve } from 'path';

import { createPackageJson, watcher } from '../../utils';
import { runCodegenCli } from '../../utils/graphql-codegen-cli';
import { childProcess, runMeshCli } from '../../utils/mesh-cli';

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

  logger.log('Building GraphQL Mesh...');

  await watcher(
    async () => {
      runMeshCli(
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
        context,
        {
          stdio: 'pipe',
        }
      );

      childProcess?.stdout?.on('data', (chunk) => {
        if (options.debug) {
          process.stdout.write(chunk);
        }
      });

      childProcess?.stderr?.on('data', (chunk) => {
        if (
          chunk.toString().indexOf('Transformed schema is not set yet') <= -1 ||
          options.debug
        ) {
          process.stderr.write(chunk);
        }
      });

      await new Promise<void>((resolve, reject) => {
        childProcess?.stdout?.on('data', (chunk) => {
          if (chunk.toString().indexOf('Done!') > -1) {
            resolve();
          }

          if (chunk.toString().indexOf('💥') > -1) {
            reject();
          }
        });
      });

      if (options.codegen?.config) {
        if (options.debug) {
          logger.debug('');
          logger.debug('Running GraphQL Codegen...');
        }

        await runCodegenCli(
          {
            ...options.codegen,
            debug: options.debug,
            verbose: options.debug,
            watch: false,
          },
          context
        );
      }

      if (options.debug) {
        logger.debug('');
        logger.debug('Running Typescript compiler...');
      }

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
        if (options.debug) {
          logger.debug('');
          logger.debug('Creating package.json...');
        }

        await createPackageJson(
          {
            dir,
            outputPath: options.outputPath,
            projectRoot: options.outputPath,
          },
          context
        );

        logger.log('Done.');
      }
    },
    {
      dir,
      watch: options.watch,
    }
  );

  yield {
    success,
  };
}
