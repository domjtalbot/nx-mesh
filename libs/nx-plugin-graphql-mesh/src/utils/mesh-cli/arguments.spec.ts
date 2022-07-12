import type { Arguments, CliArguments } from './arguments';

import { flatternCliArguments, getCliArguments } from './arguments';

describe('MeshCli Arguments', () => {
  describe('getCliArguments', () => {
    it('should return an empty object by default', () => {
      const result = getCliArguments({});
      expect(result).toStrictEqual({});
    });

    it.each<[keyof Arguments, Arguments, CliArguments]>([
      [
        'dir',
        {
          dir: '/path/to/test',
        },
        {
          '--dir': '/path/to/test',
        },
      ],
      [
        'fileType',
        {
          fileType: 'json',
        },
        {
          '--fileType': 'json',
        },
      ],
      [
        'port',
        {
          port: 1234,
        },
        {
          '--port': '1234',
        },
      ],
      [
        'require',
        {
          require: 'dotenv/config fake/init',
        },
        {
          '--require': 'dotenv/config fake/init',
        },
      ],
      [
        'require',
        {
          require: ['dotenv/config', 'fake/init'],
        },
        {
          '--require': 'dotenv/config fake/init',
        },
      ],
    ])('should support the %s argument', (argument, input, expected) => {
      const result = getCliArguments(input);
      expect(result).toStrictEqual(expected);
    });

    it.each([
      ['undefined', undefined],
      ['empty string', ''],
    ])('should remove arguments with undefined values', (type, value) => {
      const result = getCliArguments({
        dir: type === 'undefined' ? undefined : value,
      });
      expect(result).toStrictEqual({});
    });

    it('should remove require when provided with an empty array', () => {
      const result = getCliArguments({
        require: [],
      });
      expect(result).toStrictEqual({});
    });
  });

  describe('flatternCliArguments', () => {
    it.each<[CliArguments, string[]]>([
      [
        {
          '--dir': '/path/to/test',
        },
        ['--dir', '/path/to/test'],
      ],
      [
        {
          '--port': '1234',
        },
        ['--port', '1234'],
      ],
      [
        {
          '--dir': '/path/to/test',
          '--port': '1234',
          '--fileType': 'json',
          '--require': 'dotenv/config fake/init',
        },
        [
          '--dir',
          '/path/to/test',
          '--port',
          '1234',
          '--fileType',
          'json',
          '--require',
          'dotenv/config fake/init',
        ],
      ],
    ])(
      'should transform a CLI Arguments object into a flat array',
      (input, expected) => {
        const result = flatternCliArguments(input);
        expect(result).toStrictEqual(expected);
      }
    );
  });
});
