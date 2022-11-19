import type { StringKeyOf } from 'type-fest';

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
 * Env variables in a format accepted by the GraphQL Mesh CLI.
 */
export type CliEnv<TEnv extends Env = Env> = {
  [E in StringKeyOf<TEnv> as Uppercase<E>]?: E extends 'debug'
    ? '0' | '1'
    : string;
};

/**
 * Get a list of Env variables that can be passed to the
 * GraphQL Mesh CLI.
 */
export const getCliEnv = (options: Env): CliEnv => {
  const CliEnv: CliEnv = {};

  (Object.keys(options) as (keyof Env)[]).forEach((key) => {
    const value = options[key];
    const cliKey = key.toUpperCase() as keyof CliEnv;

    if (key === 'debug' && value !== undefined) {
      CliEnv[cliKey] = (+value).toString() as typeof CliEnv['DEBUG'];
    }
  });

  return CliEnv;
};
