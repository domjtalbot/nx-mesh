import type { Options } from '../../utils';

interface SwcExecutorSchema {
  assets: string[];
  buildableProjectDepsInPackageJsonType: boolean;
  main: string;
  skipTypeCheck: boolean;
  swcrc: string;
  transformers: unknown[];
  tsConfig: string;
  updateBuildableProjectDepsInPackageJson: boolean;
  watch: boolean;
}

type MeshBuildSchema = Options<'build'>;

export type BuildSWCExecutorSchema = SwcExecutorSchema &
  MeshBuildSchema['args'] &
  MeshBuildSchema['env'] & {
    /**
     * The output path of the generated files.
     */
    outputPath: string;
  };
