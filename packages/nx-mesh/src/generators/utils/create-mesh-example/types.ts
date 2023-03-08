import type { CodegenPackages, MeshPackages } from '../../../utils';

export type CodegenDependencies = CodegenPackages[];

export type MeshDependencies = MeshPackages[];

export type ExampleName =
  | 'country-info'
  | 'fake-api'
  | 'javascript-wiki'
  | 'movies'
  | 'rfam'
  | 'stackexchange'
  | 'star-wars-api'
  | 'trippin';

export type ExampleDependencies = {
  dependencies: MeshDependencies;
  codegenDependencies: CodegenDependencies;
};

export type ExampleConfig = Record<ExampleName, ExampleDependencies>;

export type CreateMeshExampleOptions = {
  codegen?: boolean;
  configExtension: 'cjs' | 'js' | 'json' | 'yml';
  example: ExampleName;
  isSdk: boolean;
  projectDirectory: string;
};
