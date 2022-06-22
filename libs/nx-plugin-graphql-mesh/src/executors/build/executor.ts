import type { ExecutorContext } from '@nrwl/devkit';

import { directoryExists } from '@nrwl/workspace/src/utilities/fileutils';
import { copySync, mkdir } from 'fs-extra';
import { join, resolve } from 'path';

import { runMeshCli } from '../../utils/mesh-cli';
import { createPackageJson } from './utils/create-package-json';
import { BuildExecutorSchema } from './schema';

export default async function* buildExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const dir = resolve(context.root, options.dir);

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

  if (!directoryExists(options.outputPath)) {
    mkdir(options.outputPath);
  }

  await createPackageJson(options, context);

  copySync(join(dir, '.mesh'), join(options.outputPath, '.mesh'));

  yield {
    success: true,
  };
}
