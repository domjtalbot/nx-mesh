import type { SetOptional } from 'type-fest';
import type { Schema as NodeLibrarySchema } from '@nrwl/node/src/generators/library/schema';

import type { SourceOptions } from './lib/create-mesh-config/examples';

export type MeshConfigExtensions = 'cjs' | 'js' | 'json' | 'yml';

export interface BaseOptions
  extends SetOptional<NodeLibrarySchema, 'compiler'> {
  e2eTestRunner?: 'cypress' | 'none';
  meshConfig?: MeshConfigExtensions;
  projectType?: 'app' | 'lib';
  skipWorkspaceJson?: boolean;
  meshExampleProject?: SourceOptions;
}
