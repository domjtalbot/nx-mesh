import type { ExecutorContext } from '@nrwl/devkit';

import { logger } from '@nrwl/devkit';
import { esbuildExecutor as nxEsbuildExecutor } from '@nrwl/esbuild';
import { resolve } from 'node:path';

import { createPackageJson, watcher } from '../../utils';
import { runCodegenCli } from '../../utils/graphql-codegen-cli';
import { childProcess, runMeshCli } from '../../utils/mesh-cli';

import { EsbuildExecutorSchema } from './schema';

export default async function* runExecutor(
  options: EsbuildExecutorSchema,
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

      const build = nxEsbuildExecutor(
        {
          additionalEntryPoints: options.additionalEntryPoints,
          assets: options.assets,
          buildableProjectDepsInPackageJsonType:
            options.buildableProjectDepsInPackageJsonType,
          bundle: options.bundle,
          deleteOutputPath: options.deleteOutputPath,
          dependenciesFieldType: options.dependenciesFieldType,
          esbuildOptions: options.esbuildOptions,
          external: options.external,
          format: options.format,
          main: options.main,
          metafile: options.metafile,
          minify: options.minify,
          outputFileName: options.outputFileName,
          outputHashing: options.outputHashing,
          outputPath: options.outputPath,
          platform: 'node',
          project: options.project,
          skipTypeCheck: options.skipTypeCheck,
          target: options.target,
          thirdParty: options.thirdParty,
          tsConfig: options.tsConfig,
          watch: options.watch,
        },
        context
      );

      for await (const result of build) {
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
