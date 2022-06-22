export interface BuildExecutorSchema {
  /**
   * Display debugging info.
   */
  debug: boolean;

  /**
   * The path of the directory containing the GraphQL Mesh config.
   */
  dir: string;

  /**
   * Loads specific require.extensions before running the codegen
   * and reading the configuration.
   */
  require: string[];

  /**
   * The output path of the generated files.
   */
  outputPath: string;
}
