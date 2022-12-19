import type { CodegenDependencies, MeshDependencies } from '../../types';

export const dependencies: MeshDependencies = [
  '@graphql-mesh/json-schema',
  '@graphql-mesh/plugin-mock',
];

export const codegenDependencies: CodegenDependencies = [
  '@graphql-codegen/client-preset',
];

export default dependencies;
