import type { Tree } from '@nrwl/devkit';

import type { SdkGeneratorSchema } from './schema';

import { readProjectConfiguration } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { sdkGenerator } from './sdk';

describe('sdk generator', () => {
  let libTree: Tree;
  const options: SdkGeneratorSchema = { name: 'test', compiler: 'tsc' };

  beforeEach(() => {
    libTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await sdkGenerator(libTree, options);
    const config = readProjectConfiguration(libTree, 'test');
    expect(config).toBeDefined();
  });
});
