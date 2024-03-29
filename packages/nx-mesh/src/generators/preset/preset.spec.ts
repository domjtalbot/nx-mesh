import type { Tree } from '@nrwl/devkit';

import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { readProjectConfiguration } from '@nrwl/devkit';

import { presetGenerator } from './preset';

describe('generators/preset', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should create a workspace with the graphql-mesh sdk preset', async () => {
    await presetGenerator(tree, {
      name: 'hello-world',
      compiler: 'tsc',
    });

    const config = readProjectConfiguration(tree, 'hello-world');

    expect(config).toBeDefined();
    expect(tree.exists('hello-world/.meshrc.yml')).toBe(true);
  });
});
