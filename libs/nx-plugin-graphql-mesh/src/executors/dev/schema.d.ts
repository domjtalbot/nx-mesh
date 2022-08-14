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
   * The port number settings
   */
  port: {
    /**
     * Use the first available port
     */
    auto: boolean;

    /**
     * Fallback action to take if the define port is unavailable.
     */
    fallback: 'auto' | 'none';

    /**
     * The port number to run on.
     */
    number: number;
  };

  /**
   * Loads specific require.extensions before running the codegen
   * and reading the configuration.
   */
  require: string[];
}
