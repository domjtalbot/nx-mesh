import type { Schema as NodeLibrarySchema } from '@nrwl/node/src/generators/library/schema';

export type MeshConfigExtensions = 'cjs' | 'js' | 'json' | 'yml';

export interface SdkGeneratorSchema extends NodeLibrarySchema {
  codegen?: boolean;
  meshConfig?: MeshConfigExtensions;
}
