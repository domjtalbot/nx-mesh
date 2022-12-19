import type { CodegenDependencies, MeshDependencies } from '../../types';

export const dependencies: MeshDependencies = ['@graphql-mesh/mysql'];

export const codegenDependencies: CodegenDependencies = [
  '@graphql-codegen/client-preset',
];

export default dependencies;
