import type { Get, StringKeyOf } from 'type-fest';

/**
 * Arguments that can be passed to the GraphQL Mesh CLI.
 */
export type Arguments = {
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

/**
 * Arguments in a format accepted by the GraphQL Mesh CLI.
 */
export type CliArguments<TArgs extends Arguments = Arguments> = {
  [Arg in StringKeyOf<TArgs> as `--${Arg}`]?: Arg extends 'require'
    ? string
    : Arg extends number
    ? string
    : Get<TArgs, Arg>;
};

/**
 * Get a list of arguments that can be passed to the
 * GraphQL Mesh CLI.
 */
export const getCliArguments = (options: Arguments): CliArguments => {
  const cliArguments: CliArguments = {};

  Object.keys(options).forEach((key) => {
    let value = options[key];

    if (key === 'require' && Array.isArray(value)) {
      value = value.join(' ');
    }

    if (value !== undefined && value !== '') {
      cliArguments[`--${key}`] = value;
    }
  });

  return cliArguments;
};

export const flatternCliArguments = (args: CliArguments) =>
  Object.entries(args)
    .flat()
    .map((arg) => {
      if (typeof arg === 'number') {
        return arg.toString();
      }

      return arg;
    });
