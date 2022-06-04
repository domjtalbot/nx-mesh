export interface DevExecutorSchema {
  /**
   * Display debugging info.
   */
  debug: boolean;

  /**
   * The path of the directory containing the GraphQL Mesh config.
   */
  dir: string;

  /**
   * The port number to run on.
   */
  port: number;

  /**
   * Loads specific require.extensions before running the codegen
   * and reading the configuration.
   */
  require: string[];
}
