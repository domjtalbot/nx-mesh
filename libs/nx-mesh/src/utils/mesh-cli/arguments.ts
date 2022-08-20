import type { StringKeyOf } from 'type-fest';

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
  [Arg in StringKeyOf<TArgs> as `--${Arg}`]?: string;
};

/**
 * Get a list of arguments that can be passed to the
 * GraphQL Mesh CLI.
 */
export const getCliArguments = (options: Arguments): CliArguments => {
  const cliArguments: CliArguments = {};

  Object.entries(options).forEach(([key, value]) => {
    const cliKey = `--${key}` as keyof CliArguments;
    let cliValue;

    if (Array.isArray(value)) {
      cliValue = value.join(' ');
    } else {
      cliValue = value;
    }

    if (cliValue !== undefined && cliValue !== '') {
      cliArguments[cliKey] = `${cliValue}`;
    }
  });

  return cliArguments;
};

export const flatternCliArguments = (args: CliArguments) =>
  Object.entries(args).flat();
