import type { ExecutorContext } from '@nrwl/devkit';
import type { ChildProcess, ForkOptions } from 'child_process';

import type { Command, Options } from './commands';

import { spawn } from 'child_process';

import { flatternCliArguments } from './arguments';
import { getCommandOptions } from './commands';

export let childProcess: ChildProcess;

export async function runMeshCli<
  TCommand extends Command,
  TOptions extends Options<TCommand> = Options<TCommand>
>(
  command: TCommand,
  options: TOptions,
  context: ExecutorContext,
  processOptions?: Pick<ForkOptions, 'stdio'>
) {
  const { args, env } = getCommandOptions<TCommand>(options);
  const cliArgs = flatternCliArguments(args);

  return new Promise((resolve, reject) => {
    childProcess = spawn(`npx`, ['graphql-mesh', command, ...cliArgs], {
      stdio: processOptions?.stdio ?? [0, 1, 2],
      cwd: context.root,
      env: {
        ...process.env,
        ...env,
        FORCE_COLOR: 'true',
      },
    });

    // Ensure the child process is killed when the parent exits
    process.on('exit', () => childProcess.kill());
    process.on('SIGTERM', () => childProcess.kill());

    childProcess.on('error', (err) => {
      reject(err);
    });

    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
