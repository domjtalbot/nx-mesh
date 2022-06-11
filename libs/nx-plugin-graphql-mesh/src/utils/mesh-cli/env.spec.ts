import type { Env, CliEnv } from './env';

import { getCliEnv } from './env';

describe('MeshCli Env variables', () => {
  describe('getCliEnv', () => {
    it('should return an empty object by default', () => {
      const result = getCliEnv({});
      expect(result).toStrictEqual({});
    });

    it.each<[keyof Env, Env, CliEnv]>([
      [
        'debug',
        {
          debug: true,
        },
        {
          DEBUG: '1',
        },
      ],
    ])('should support the %s Env variable', (argument, input, expected) => {
      const result = getCliEnv(input);
      expect(result).toStrictEqual(expected);
    });

    it('should remove Env variables with undefined values', () => {
      const result = getCliEnv({
        debug: undefined,
      });

      expect(result).toStrictEqual({});
    });

    it.each([
      [true, '1'],
      [false, '0'],
    ])('should output DEBUG=$s as %s', (input, expected) => {
      const result = getCliEnv({
        debug: input,
      });

      expect(result.DEBUG).toBe(expected);
    });
  });
});
