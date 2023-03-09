import type { Linter } from '@nrwl/linter';

export type MeshConfigExtensions = 'cjs' | 'js' | 'json' | 'yml';

export interface AppGeneratorSchema {
  babelJest?: boolean;
  directory?: string;
  e2eTestRunner?: 'cypress' | 'none';
  linter?: Linter;
  meshConfig?: SupportedStyles;
  name: string;
  setParserOptionsProject?: boolean;
  skipFormat?: boolean;
  skipWorkspaceJson?: boolean;
  standaloneConfig?: boolean;
  tags?: string;
  unitTestRunner?: 'jest' | 'none';
}
