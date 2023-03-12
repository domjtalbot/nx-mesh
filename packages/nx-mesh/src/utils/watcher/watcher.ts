import type { WatcherOptions } from 'watchpack';

import { logger } from '@nrwl/devkit';
import Watchpack = require('watchpack');

export type WatchFunc<T = unknown> = () => Promise<T>;

export type Options = Omit<WatcherOptions, 'ignored'> & {
  dir: string;
  watch?: boolean;
};

export async function watcher(func: WatchFunc, options: Options) {
  const { dir, watch, ...watcherOptions } = options;

  if (watch === true) {
    const wp = new Watchpack({
      ...watcherOptions,
      ignored: [
        '.eslintrc.json',
        '.swcrc',
        '**/.codegen',
        '**/.git',
        '**/.mesh',
        '**/node_modules',
        'jest.config.ts',
        'project.json',
      ],
    });

    wp.watch({ directories: [dir], startTime: 0 });

    wp.on('aggregated', async () => {
      await func();

      logger.info('');
      logger.info('');
      logger.info('Watching for changes...');
    });

    await new Promise<{ success: boolean }>(() => {
      // This Promise intentionally never resolves, leaving the process running.
    });
  } else {
    await func();
  }
}
