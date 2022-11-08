import type { ExecutorContext } from '@nrwl/devkit';

import { resolve } from 'path';

import { createPackageJson, runMeshCli } from '../../utils';
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
