import type { GeneratorCallback } from '@nrwl/devkit';

/**
 * Run Generator async tasks in priority order.
 *
 * @param tasks - An array of generator tasks, listed in priority order.
 * @returns
 */
export const runTasksInSerial =
  (...tasks: GeneratorCallback[]): GeneratorCallback =>
  async () => {
    for (const task of tasks) {
      if (task instanceof Promise) {
        await task();
      } else {
        task();
      }
    }
  };

export type { GeneratorCallback } from '@nrwl/devkit';
