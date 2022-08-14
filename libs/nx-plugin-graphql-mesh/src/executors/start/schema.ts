import type { Options } from '../../utils';

type MeshStartSchema = Options<'start'>;

export type StartExecutorSchema = Omit<MeshStartSchema['args'], 'port'> &
  MeshStartSchema['env'] & {
    /**
     * The port number settings
     */
    port: {
      /**
       * Use the first available port
       */
      auto: boolean;

      /**
       * The range of ports to select from.
       */
      range?: {
        /**
         * The first port of the range.
         * Must be in the range `1024`...`65535`.
         */
        from?: number;

        /**
         * The last port of the range.
         * Must be in the range `1024`...`65535` and must be greater
         * than `from`.
         */
        to?: number;
      };

      /**
       * Fallback action to take if the define port is unavailable.
       */
      fallback: 'auto' | 'none';

      /**
       * The port number to run on.
       */
      number: number;

      /**
       * The host to listern on.
       */
      host: string;
    };
  };
