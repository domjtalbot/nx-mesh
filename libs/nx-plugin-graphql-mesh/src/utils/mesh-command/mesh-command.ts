import type { CreateMeshCommandOptions, MeshCommand } from './options';

import { normalizeOptions } from './options';

export const meshCli = 'graphql-mesh';

/**
 * Create a command string for running the GraphQL Mesh CLI.
 */
export const createMeshCommand = async <T extends MeshCommand>(
  command: T,
  _options: CreateMeshCommandOptions<T>
): Promise<string> => {
  const options = normalizeOptions(_options);

  const env = Object.values(options.env).join(' ');

  const flags = Object.values(options.flags).join(' ');
  return `${env} ${meshCli} ${command} ${flags}`;
};
