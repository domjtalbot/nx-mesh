import { join } from 'path';

export const meshCliBinPath = './node_modules/@graphql-mesh/cli/bin.js';

/**
 * The path to the GraphQL Mesh CLI bin file
 * @param workspaceRoot - The workspace root containing the `node_modules` directory.
 * @returns path to the GraphQL Mesh CLI bin file
 */
export const resolveCliPath = (
  workspaceRoot: string,
  binPath: string = meshCliBinPath
) => join(workspaceRoot, binPath);
