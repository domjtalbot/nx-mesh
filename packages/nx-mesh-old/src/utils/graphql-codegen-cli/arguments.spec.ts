import type { Arguments, CliArguments } from './arguments';

import { flatternCliArguments, getCliArguments } from './arguments';

describe('CodegenCli Arguments', () => {
  describe('getCliArguments', () => {
    it('should return an empty object by default', () => {
      const result = getCliArguments({});
      expect(result).toStrictEqual({});
    });

    it.each<[keyof Arguments, Arguments, CliArguments]>([
      [
        'config',
        {
          config: '/path/to/test',
        },
        {
          '--config': '/path/to/test',
        },
      ],
      [
        'debug',
        {
          debug: false,
        },
        {
          '--debug': 'false',
        },
      ],
      [
        'overwrite',
        {
          overwrite: false,
        },
        {
          '--overwrite': 'false',
        },
      ],
      [
        'profile',
        {
          profile: false,
        },
        {
          '--profile': 'false',
        },
      ],
      [
        'project',
        {
          project: 'abc',
        },
        {
          '--project': 'abc',
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
      [
        'silent',
        {
          silent: false,
        },
        {
          '--silent': 'false',
        },
      ],
      [
        'verbose',
        {
          verbose: false,
        },
        {
          '--verbose': 'false',
        },
      ],
      [
        'watch',
        {
          watch: false,
        },
        {
          '--watch': 'false',
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
        config: type === 'undefined' ? undefined : value,
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
          '--config': '/path/to/test',
        },
        ['--config', '/path/to/test'],
      ],
      [
        {
          '--debug': 'false',
        },
        ['--debug', 'false'],
      ],
      [
        {
          '--overwrite': 'false',
        },
        ['--overwrite', 'false'],
      ],
      [
        {
          '--profile': 'false',
        },
        ['--profile', 'false'],
      ],
      [
        {
          '--project': 'abc',
        },
        ['--project', 'abc'],
      ],
      [
        {
          '--silent': 'false',
        },
        ['--silent', 'false'],
      ],
      [
        {
          '--verbose': 'false',
        },
        ['--verbose', 'false'],
      ],
      [
        {
          '--watch': 'false',
        },
        ['--watch', 'false'],
      ],
      [
        {
          '--config': '/path/to/test',
          '--debug': 'false',
          '--overwrite': 'false',
          '--profile': 'false',
          '--project': 'abc',
          '--silent': 'false',
          '--verbose': 'false',
          '--watch': 'false',
          '--require': 'dotenv/config fake/init',
        },
        [
          '--config',
          '/path/to/test',
          '--debug',
          'false',
          '--overwrite',
          'false',
          '--profile',
          'false',
          '--project',
          'abc',
          '--silent',
          'false',
          '--verbose',
          'false',
          '--watch',
          'false',
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
