import type { Arguments } from '../../utils/graphql-codegen-cli';
import type { Options } from '../../utils/mesh-cli';

interface TscExecutorSchema {
  assets: string[];
  buildableProjectDepsInPackageJsonType: boolean;
  main: string;
  transformers: unknown[];
  tsConfig: string;
  updateBuildableProjectDepsInPackageJson: boolean;
  watch: boolean;
}

type MeshBuildSchema = Options<'build'>;

export type BuildExecutorSchema = TscExecutorSchema &
  MeshBuildSchema['args'] &
  MeshBuildSchema['env'] & {
    /**
     * GraphQL Codegen config
     */
    codegen?: Arguments;

    /**
     * The output path of the generated files.
     */
    outputPath: string;
  };
