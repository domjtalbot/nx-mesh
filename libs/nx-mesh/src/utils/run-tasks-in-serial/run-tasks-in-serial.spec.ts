import type { GeneratorCallback } from './run-tasks-in-serial';

import { runTasksInSerial } from './run-tasks-in-serial';

describe('runTasksInSerial', () => {
  it('should run async tasks in the order they are defined', async () => {
    const log = jest.fn((input) => Promise.resolve(input));

    const input: GeneratorCallback[] = [
      () => log(1),
      () => log('hello'),
      () => log(3),
      () => log('world'),
    ];

    await runTasksInSerial(...input)();

    expect(log).toHaveBeenCalledTimes(4);
    expect((log as jest.Mock)?.mock.calls[0][0]).toBe(1);
    expect((log as jest.Mock)?.mock.calls[1][0]).toBe('hello');
    expect((log as jest.Mock)?.mock.calls[2][0]).toBe(3);
    expect((log as jest.Mock)?.mock.calls[3][0]).toBe('world');
  });

  it('should support sync functions', async () => {
    const log = jest.fn((input) => input);

    const input: GeneratorCallback[] = [
      () => log(1),
      () => log('hello'),
      () => log(3),
      () => log('world'),
    ];

    await runTasksInSerial(...input)();

    expect(log).toHaveBeenCalledTimes(4);
    expect((log as jest.Mock)?.mock.calls[0][0]).toBe(1);
    expect((log as jest.Mock)?.mock.calls[1][0]).toBe('hello');
    expect((log as jest.Mock)?.mock.calls[2][0]).toBe(3);
    expect((log as jest.Mock)?.mock.calls[3][0]).toBe('world');
  });

  it('should support a mix of sync & async functions', async () => {
    const log = jest.fn((input) => input);
    const asyncLog = jest.fn((input) => Promise.resolve(input));

    const input: GeneratorCallback[] = [
      () => log(1),
      () => asyncLog('hello'),
      () => asyncLog(3),
      () => log('world'),
    ];

    await runTasksInSerial(...input)();

    expect(log).toHaveBeenCalledTimes(2);
    expect(asyncLog).toHaveBeenCalledTimes(2);

    expect((log as jest.Mock)?.mock.calls[0][0]).toBe(1);
    expect((asyncLog as jest.Mock)?.mock.calls[0][0]).toBe('hello');
    expect((asyncLog as jest.Mock)?.mock.calls[1][0]).toBe(3);
    expect((log as jest.Mock)?.mock.calls[1][0]).toBe('world');
  });
});
