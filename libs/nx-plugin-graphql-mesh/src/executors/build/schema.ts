import type { Options } from '../../utils';

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
     * The output path of the generated files.
     */
    outputPath: string;
  };
