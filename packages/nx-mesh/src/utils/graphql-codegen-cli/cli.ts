import type { ExecutorContext } from '@nrwl/devkit';
import type { ChildProcess, ForkOptions } from 'node:child_process';

import type { Arguments } from './arguments';

import { spawn } from 'node:child_process';

import { getCliArguments, flatternCliArguments } from './arguments';

export let childProcess: ChildProcess;

export async function runCodegenCli(
  options: Arguments,
  context: ExecutorContext,
  processOptions?: Pick<ForkOptions, 'stdio'>
) {
  const args = getCliArguments(options);
  const cliArgs = flatternCliArguments(args);

  return new Promise((resolve, reject) => {
    childProcess = spawn('npx', ['graphql-codegen', ...cliArgs], {
      stdio: processOptions?.stdio ?? [0, 1, 2],
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
