import type { MeshCommand, SharedFlags } from './options';

import { createMeshCommand, meshCli } from './mesh-command';

import { normalizeOptions, normalizeRequireOption } from './options';

const options: SharedFlags = {
  dir: 'libs/jest',
};

const debugEnv = 'DEBUG';
const debugDisabled = `${debugEnv}=0`;
const debugEnabled = `${debugEnv}=1`;

describe('createMeshCommand', () => {
  it('can set the directory', async () => {
    const dir = 'libs/jest';

    const output = await createMeshCommand('build', {
      ...options,
      dir,
    });

    expect(output).toContain(`--dir ${dir}`);
  });

  it('can set the require extensions', async () => {
    const output = await createMeshCommand('build', {
      ...options,
      require: ['env', 'lodash'],
    });

    expect(output).toContain(`--require env lodash`);
  });

  it.each(['build', 'dev', 'start', 'serve-source', 'validate'])(
    'only sets the %s require flag when a value is provided',
    async (command: MeshCommand) => {
      const output = await createMeshCommand(command, {
        ...options,
      });

      expect(output).not.toContain('--require');
    }
  );

  it.each([true, false])(
    'can set the debug mode to %s',
    async (debug: boolean) => {
      const output = await createMeshCommand('build', {
        ...options,
        debug,
      });

      const expected = debug ? debugEnabled : debugDisabled;

      expect(output).toContain(expected);
      expect(output.startsWith(expected)).toBeTruthy();
    }
  );

  it('can create a build command', async () => {
    const output = await createMeshCommand('build', {
      ...options,
      debug: true,
    });

    expect(output.startsWith(debugEnabled)).toBeTruthy();
    expect(output).toContain(`${meshCli} build`);
    expect(output).toContain(`--dir ${options.dir}`);
  });

  it('can create a dev command', async () => {
    const output = await createMeshCommand('dev', {
      ...options,
      debug: true,
    });

    expect(output.startsWith(debugEnabled)).toBeTruthy();
    expect(output).toContain(`${meshCli} dev`);
    expect(output).toContain(`--dir ${options.dir}`);
  });

  it('can create a serve-source command', async () => {
    const output = await createMeshCommand('serve-source', {
      ...options,
      debug: true,
    });

    expect(output.startsWith(debugEnabled)).toBeTruthy();
    expect(output).toContain(`${meshCli} serve-source`);
    expect(output).toContain(`--dir ${options.dir}`);
  });

  it('can create a start command', async () => {
    const output = await createMeshCommand('start', {
      ...options,
      debug: true,
    });

    expect(output.startsWith(debugEnabled)).toBeTruthy();
    expect(output).toContain(`${meshCli} start`);
    expect(output).toContain(`--dir ${options.dir}`);
  });

  it('can create a validate command', async () => {
    const output = await createMeshCommand('validate', {
      ...options,
      debug: true,
    });

    expect(output.startsWith(debugEnabled)).toBeTruthy();
    expect(output).toContain(`${meshCli} validate`);
    expect(output).toContain(`--dir ${options.dir}`);
  });

  describe('normalizeRequireOption', () => {
    it('can accept a string of extensions', async () => {
      const expected = 'ts loadash babel';
      const result = normalizeRequireOption(expected);

      expect(result).toBe(expected);
    });

    it('can accept an array of extensions', async () => {
      const input = ['ts', 'lodash', 'babel'];
      const expected = 'ts lodash babel';
      const result = normalizeRequireOption(input);

      expect(result).toBe(expected);
    });

    it('can accept an empty string', async () => {
      const input = '';
      const expected = undefined;
      const result = normalizeRequireOption(input);

      expect(result).toBe(expected);
    });

    it('can accept an empty array', async () => {
      const input = [];
      const expected = undefined;
      const result = normalizeRequireOption(input);

      expect(result).toBe(expected);
    });

    it('can be undefined', async () => {
      const result = normalizeRequireOption();

      expect(result).toBe(undefined);
    });
  });

  describe('normalizeOptions', () => {
    it('can apply a default values', async () => {
      const result = normalizeOptions<'build'>(options, {
        debug: true,
      });

      expect(result.env.debug).toBe(debugEnabled);
    });

    it('can override default values', async () => {
      const result = normalizeOptions<'build'>(
        {
          ...options,
          debug: false,
        },
        {
          debug: true,
        }
      );

      expect(result.env.debug).toBe(debugDisabled);
    });

    it('can accept build options', async () => {
      const result = normalizeOptions<'build'>({
        debug: false,
        dir: '/path/to/dir',
        fileType: 'ts',
        require: ['env', 'lodash'],
      });

      expect(result.env.debug).toBe(debugDisabled);
      expect(result.flags.dir).toBe('--dir /path/to/dir');
      expect(result.flags.fileType).toBe(`--fileType ts`);
      expect(result.flags.require).toBe('--require env lodash');
    });

    it('can accept dev options', async () => {
      const result = normalizeOptions<'dev'>({
        debug: false,
        dir: '/path/to/dir',
        port: 1234,
        require: ['env', 'lodash'],
      });

      expect(result.env.debug).toBe(debugDisabled);
      expect(result.flags.dir).toBe('--dir /path/to/dir');
      expect(result.flags.port).toBe('--port 1234');
      expect(result.flags.require).toBe('--require env lodash');
    });

    it('can accept serve-source options', async () => {
      const result = normalizeOptions<'serve-source'>({
        debug: false,
        dir: '/path/to/dir',
        require: ['env', 'lodash'],
      });

      expect(result.env.debug).toBe(debugDisabled);
      expect(result.flags.dir).toBe('--dir /path/to/dir');
      expect(result.flags.require).toBe('--require env lodash');
    });

    it('can accept start options', async () => {
      const result = normalizeOptions<'start'>({
        debug: false,
        dir: '/path/to/dir',
        port: 1234,
        require: ['env', 'lodash'],
      });

      expect(result.env.debug).toBe(debugDisabled);
      expect(result.flags.dir).toBe('--dir /path/to/dir');
      expect(result.flags.port).toBe(`--port 1234`);
      expect(result.flags.require).toBe('--require env lodash');
    });

    it('can accept validate options', async () => {
      const result = normalizeOptions<'validate'>({
        debug: false,
        dir: '/path/to/dir',
        require: ['env', 'lodash'],
      });

      expect(result.env.debug).toBe(debugDisabled);
      expect(result.flags.dir).toBe('--dir /path/to/dir');
      expect(result.flags.require).toBe('--require env lodash');
    });
  });
});
