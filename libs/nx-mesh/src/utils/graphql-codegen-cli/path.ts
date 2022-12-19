import { join } from 'path';

export const codegenCliBinPath =
  './node_modules/@graphql-codegen/cli/cjs/bin.js';

/**
 * The path to the GraphQL Codegen CLI bin file
 * @param workspaceRoot - The workspace root containing the `node_modules` configectory.
 * @returns path to the GraphQL Codegen CLI bin file
 */
export const resolveCliPath = (
  workspaceRoot: string,
  binPath: string = codegenCliBinPath
) => join(workspaceRoot, binPath);
