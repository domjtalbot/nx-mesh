import type { Simplify } from 'type-fest';

import type { Arguments, CliArguments } from './arguments';
import type { CliEnv, Env } from './env';

import { getCliArguments } from './arguments';
import { getCliEnv } from './env';

/**
 * Available GraphQL Mesh CLI commands
 */
export type Command = 'build' | 'dev' | 'serve-source' | 'start' | 'validate';

/**
 * Command Options that can be passed to a child_process.
 */
export type CommandOptions<
  TArgs extends Arguments = Arguments,
  TEnv extends Env = Env
> = {
  args: TArgs;
  env: TEnv;
};

/**
 * Arguments used by all CLI commands
 */
export type SharedArgs = Pick<Arguments, 'dir' | 'require'>;

/**
 * Arguments used by the build command
 */
export type BuildArgs = Simplify<SharedArgs & Pick<Arguments, 'fileType'>>;

/**
 * Arguments used by the dev command
 */
export type DevArgs = Simplify<SharedArgs & Pick<Arguments, 'port'>>;

/**
 * Arguments used by the serve-source command
 */
export type ServeSourceArgs = SharedArgs;

/**
 * Arguments used by the start command
 */
export type StartArgs = Simplify<SharedArgs & Pick<Arguments, 'port'>>;

/**
 * Arguments used by the validate command
 */
export type ValidateArgs = SharedArgs;

/**
 * Options used by the GraphQL Mesh CLI commands
 */
export type Options<TCommand extends Command> = TCommand extends 'build'
  ? CommandOptions<BuildArgs>
  : TCommand extends 'dev'
  ? CommandOptions<DevArgs>
  : TCommand extends 'serve-source'
  ? CommandOptions<ServeSourceArgs>
  : TCommand extends 'start'
  ? CommandOptions<StartArgs>
  : TCommand extends 'validate'
  ? CommandOptions<ValidateArgs>
  : CommandOptions;

/**
 * Command Options in a format that can be passed to the GraphQL Mesh CLI.
 */
export type CommandCliOptions<TOptions extends CommandOptions> = {
  args: CliArguments<TOptions['args']>;
  env: CliEnv<TOptions['env']>;
};

export const getCommandOptions = <
  TCommand extends Command,
  TOptions extends Options<TCommand> = Options<TCommand>
>(
  options: TOptions
): CommandCliOptions<TOptions> => {
  const args = getCliArguments(options.args);
  const env = getCliEnv(options.env);

  return {
    args,
    env,
  };
};
