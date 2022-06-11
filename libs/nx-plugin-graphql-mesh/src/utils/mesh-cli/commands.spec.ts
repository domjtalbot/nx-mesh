import { getCommandOptions } from './commands';

describe('MeshCli Command Options', () => {
  describe('getCommandOptions', () => {
    describe('build', () => {
      it('should return empty objects by default', () => {
        const result = getCommandOptions<'build'>({
          args: {},
          env: {},
        });
        expect(result).toStrictEqual({
          args: {},
          env: {},
        });
      });

      it('should return options', () => {
        const result = getCommandOptions<'build'>({
          args: {
            dir: '/path/to/test',
            fileType: 'js',
            require: ['dotenv/config', 'fake/init'],
          },
          env: {
            debug: true,
          },
        });

        expect(result).toStrictEqual({
          args: {
            '--dir': '/path/to/test',
            '--fileType': 'js',
            '--require': 'dotenv/config fake/init',
          },
          env: {
            DEBUG: '1',
          },
        });
      });
    });

    describe('dev', () => {
      it('should return empty objects by default', () => {
        const result = getCommandOptions<'dev'>({
          args: {},
          env: {},
        });
        expect(result).toStrictEqual({
          args: {},
          env: {},
        });
      });

      it('should return options', () => {
        const result = getCommandOptions<'dev'>({
          args: {
            dir: '/path/to/test',
            port: 1234,
            require: ['dotenv/config', 'fake/init'],
          },
          env: {
            debug: true,
          },
        });

        expect(result).toStrictEqual({
          args: {
            '--dir': '/path/to/test',
            '--port': 1234,
            '--require': 'dotenv/config fake/init',
          },
          env: {
            DEBUG: '1',
          },
        });
      });
    });

    describe('serve-source', () => {
      it('should return empty objects by default', () => {
        const result = getCommandOptions<'serve-source'>({
          args: {},
          env: {},
        });
        expect(result).toStrictEqual({
          args: {},
          env: {},
        });
      });

      it('should return options', () => {
        const result = getCommandOptions<'serve-source'>({
          args: {
            dir: '/path/to/test',
            require: ['dotenv/config', 'fake/init'],
          },
          env: {
            debug: true,
          },
        });

        expect(result).toStrictEqual({
          args: {
            '--dir': '/path/to/test',
            '--require': 'dotenv/config fake/init',
          },
          env: {
            DEBUG: '1',
          },
        });
      });
    });

    describe('start', () => {
      it('should return empty objects by default', () => {
        const result = getCommandOptions<'start'>({
          args: {},
          env: {},
        });
        expect(result).toStrictEqual({
          args: {},
          env: {},
        });
      });

      it('should return options', () => {
        const result = getCommandOptions<'start'>({
          args: {
            dir: '/path/to/test',
            port: 1234,
            require: ['dotenv/config', 'fake/init'],
          },
          env: {
            debug: true,
          },
        });

        expect(result).toStrictEqual({
          args: {
            '--dir': '/path/to/test',
            '--port': 1234,
            '--require': 'dotenv/config fake/init',
          },
          env: {
            DEBUG: '1',
          },
        });
      });
    });

    describe('validate', () => {
      it('should return empty objects by default', () => {
        const result = getCommandOptions<'validate'>({
          args: {},
          env: {},
        });
        expect(result).toStrictEqual({
          args: {},
          env: {},
        });
      });

      it('should return options', () => {
        const result = getCommandOptions<'validate'>({
          args: {
            dir: '/path/to/test',
            require: ['dotenv/config', 'fake/init'],
          },
          env: {
            debug: true,
          },
        });

        expect(result).toStrictEqual({
          args: {
            '--dir': '/path/to/test',
            '--require': 'dotenv/config fake/init',
          },
          env: {
            DEBUG: '1',
          },
        });
      });
    });
  });
});
