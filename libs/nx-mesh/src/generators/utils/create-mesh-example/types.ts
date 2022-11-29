import type { MeshPackages } from '../../../utils';

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
};

export type ExampleConfig = Record<ExampleName, ExampleDependencies>;

export type CreateMeshExampleOptions = {
  configExtension: 'cjs' | 'js' | 'json' | 'yml';
  example: ExampleName;
  isSdk: boolean;
  projectDirectory: string;
};
