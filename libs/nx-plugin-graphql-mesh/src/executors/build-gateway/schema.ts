import type { Options } from '../../utils';

type MeshBuildSchema = Options<'build'>;

export type BuildGatewayExecutorSchema = MeshBuildSchema['args'] &
  MeshBuildSchema['env'] & {
    /**
     * The output path of the generated files.
     */
    outputPath: string;
  };
