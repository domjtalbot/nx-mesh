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
