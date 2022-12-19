import type { ExecutorContext } from '@nrwl/devkit';
import type { ChildProcess, ForkOptions } from 'child_process';

import type { Arguments } from './arguments';

import { fork } from 'child_process';

import { getCliArguments, flatternCliArguments } from './arguments';
import { resolveCliPath } from './path';

export let childProcess: ChildProcess;

export async function runCodegenCli(
  options: Arguments,
  context: ExecutorContext,
  processOptions?: Pick<ForkOptions, 'stdio'>
) {
  const cliPath = resolveCliPath(context.root);
  const args = getCliArguments(options);
  const cliArgs = flatternCliArguments(args);

  return new Promise((resolve, reject) => {
    childProcess = fork(cliPath, cliArgs, {
      stdio: processOptions?.stdio,
      cwd: context.root,
      env: {
        ...process.env,
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
