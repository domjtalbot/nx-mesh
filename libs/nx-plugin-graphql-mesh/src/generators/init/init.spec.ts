import type { Tree } from '@nrwl/devkit';

import { readJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { meshInitGenerator } from './init';

describe('init', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should add mesh dependencies', async () => {
    await meshInitGenerator(tree, {});
    const packageJson = readJson(tree, 'package.json');
    expect(packageJson.dependencies['@graphql-mesh/cli']).toBeDefined();
    expect(packageJson.dependencies['@graphql-mesh/runtime']).toBeDefined();
    expect(packageJson.dependencies['@graphql-mesh/utils']).toBeDefined();
  });

  it('should not add jest config if unitTestRunner is none', async () => {
    await meshInitGenerator(tree, { unitTestRunner: 'none' });
    expect(tree.exists('jest.config.js')).toEqual(false);
  });
});
