import type { StringKeyOf } from 'type-fest';

/**
 * Arguments that can be passed to the GraphQL Codegen CLI.
 */
export type Arguments = {
  /**
   * Path to GraphQL codegen YAML config file, defaults to
   * "codegen.yml" on the current directory.
   */
  config?: string;

  /**
   * Print debug logs to stdout
   */
  debug?: boolean;

  /**
   * Overwrites existing files.
   */
  overwrite?: boolean;

  /**
   * Only print errors
   */
  // errorsOnly?: boolean;

  /**
   * Use profiler to measure performance
   */
  profile?: boolean;

  /**
   * Name of a project in GraphQL Config
   */
  project?: string;

  /**
   * Loads specific require.extensions before running the
   * codegen and reading the configuration.
   */
  require?: string | string[];

  /**
   * Suppresses printing errors
   */
  silent?: boolean;

  /**
   * Output more detailed information about performed tasks
   */
  verbose?: boolean;

  /**
   * Watch for changes and execute generation automatically.
   * You can also specify a glob expression for custom watch list.
   */
  watch?: boolean;
};

/**
 * Arguments in a format accepted by the GraphQL Codegen CLI.
 */
export type CliArguments<TArgs extends Arguments = Arguments> = {
  [Arg in StringKeyOf<TArgs> as `--${Arg}`]?: string;
};

/**
 * Get a list of arguments that can be passed to the
 * GraphQL Codegen CLI.
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
