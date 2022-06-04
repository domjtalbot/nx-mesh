import type { ExecutorContext } from '@nrwl/devkit';

import runCommandsExecutor from 'nx/src/executors/run-commands/run-commands.impl';

import { resolve } from 'path';

import { DevExecutorSchema } from './schema';
import { createMeshCommand } from '../../utils/mesh-command/mesh-command';

export default async function runExecutor(
  options: DevExecutorSchema,
  context: ExecutorContext
) {
  const command = await createMeshCommand('dev', {
    debug: options.debug,
    dir: resolve(context.root, options.dir),
    port: options.port,
    require: options.require,
  });

  const result = await runCommandsExecutor(
    {
      commands: [
        {
          command,
          forwardAllArgs: false,
        },
      ],
      project: context.projectName,
      name: context.target,
    },
    context
  );

  return result;
}
