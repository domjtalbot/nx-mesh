/**
 * Env variables that can be passed to the GraphQL Mesh CLI.
 */
export type Env = {
  /**
   * Enable debug logging.
   */
  debug?: boolean;
};

/**
 * Flags variables that can be passed to the GraphQL Mesh CLI.
 */
export type Flags = {
  /**
   * The directory where the mesh config is located.
   */
  dir?: string;

  fileType?: 'json' | 'ts' | 'js';

  /**
   * The port number to run on.
   */
  port?: number;

  /**
   * Loads specific require.extensions before running the codegen
   * and reading the configuration.
   */
  require?: string | string[];
};

export type NormalizedEnv = {
  [K in keyof Env]?: string;
};

export type SharedFlags = Pick<Flags, 'dir' | 'require'>;

export type BuildCommandFlags = SharedFlags & Pick<Flags, 'fileType'>;

export type DevCommandFlags = SharedFlags & Pick<Flags, 'port'>;

export type ServeSourceCommandFlags = SharedFlags;

export type StartCommandFlags = SharedFlags & Pick<Flags, 'port'>;

export type ValidateCommandFlags = SharedFlags;

export type MeshCommand =
  | 'build'
  | 'dev'
  | 'serve-source'
  | 'start'
  | 'validate';

export type CommandFlags<T extends MeshCommand> = T extends 'build'
  ? BuildCommandFlags
  : T extends 'dev'
  ? DevCommandFlags
  : T extends 'serve-source'
  ? ServeSourceCommandFlags
  : T extends 'start'
  ? StartCommandFlags
  : T extends 'validate'
  ? ValidateCommandFlags
  : SharedFlags;

export type NormalizedFlags<T extends MeshCommand> = {
  [K in keyof CommandFlags<T>]?: string;
};

export type NormalizedOptions<T extends MeshCommand> = {
  env: NormalizedEnv;
  flags: NormalizedFlags<T>;
};

export type CreateMeshCommandOptions<T extends MeshCommand> = Env &
  CommandFlags<T>;

export const normalizeRequireOption = (
  option?: string | string[]
): string | undefined => {
  let extensions = typeof option === 'string' ? option : undefined;

  if (Array.isArray(option)) {
    extensions = option.join(' ');
  }

  if (extensions === '') {
    return undefined;
  }

  return extensions;
};

export const normalizeOptions = <T extends MeshCommand>(
  _options: CreateMeshCommandOptions<T>,
  defaultOptions?: Env & CommandFlags<T>
): NormalizedOptions<T> => {
  const options = Object.assign(defaultOptions ?? {}, _options);

  const env: NormalizedOptions<T>['env'] = {};
  const flags: NormalizedOptions<T>['flags'] = {};

  Object.keys(options).forEach((key) => {
    const requireValues =
      key === 'require' ? normalizeRequireOption(options[key]) : undefined;

    switch (key) {
      case 'debug':
        env[key] = `DEBUG=${+options[key]}`;
        break;

      case 'dir':
        flags[key] = `--dir ${options[key]}`;
        break;

      case 'fileType':
        flags[key] = `--fileType ${options[key]}`;
        break;

      case 'port':
        flags[key] = `--port ${options[key]}`;
        break;

      case 'require':
        if (requireValues) {
          flags[key] = `--require ${requireValues}`;
        }
        break;

      default:
    }
  });

  return {
    env,
    flags,
  };
};
