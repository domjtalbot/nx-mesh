import type { Tree } from '@nrwl/devkit';

import {
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { sdkGenerator } from '../../../generators/sdk';
import renameSwcrcConfig from './rename-swcrc-config';

async function setup(tree: Tree) {
  await sdkGenerator(tree, {
    compiler: 'swc',
    name: 'mesh-sdk',
    unitTestRunner: 'jest',
  });

  tree.rename('libs/mesh-sdk/.swcrc', 'libs/mesh-sdk/.lib.swcrc');
}

function customSwcrcPath(tree: Tree, custom = false) {
  tree.rename(
    'libs/mesh-sdk/.lib.swcrc',
    custom ? 'libs/mesh-sdk/.custom.swcrc' : 'libs/mesh-sdk/.lib.swcrc'
  );

  const projectConfig = readProjectConfiguration(tree, 'mesh-sdk');

  if (projectConfig?.targets?.['build']) {
    projectConfig.targets['build'].options.swcrc = custom
      ? 'libs/mesh-sdk/.custom.swcrc'
      : 'libs/mesh-sdk/.lib.swcrc';

    updateProjectConfiguration(tree, 'mesh-sdk', projectConfig);
  }
}

describe('migration - Rename swcrc config', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('should migrate .lib.swcrc to .swcrc', async () => {
    await setup(tree);
    await renameSwcrcConfig(tree);

    expect(tree.exists('libs/mesh-sdk/.lib.swcrc')).toBeFalsy();
    expect(tree.exists('libs/mesh-sdk/.swcrc')).toBeTruthy();
  });

  it('should migrate custom path .lib.swcrc', async () => {
    await setup(tree);
    customSwcrcPath(tree);

    await renameSwcrcConfig(tree);

    expect(tree.exists('libs/mesh-sdk/.lib.swcrc')).toBeFalsy();
    expect(tree.exists('libs/mesh-sdk/.swcrc')).toBeTruthy();

    const projectConfig = readProjectConfiguration(tree, 'mesh-sdk');
    expect(projectConfig?.targets?.['build']?.options?.swcrc).toEqual(
      'libs/mesh-sdk/.swcrc'
    );
  });

  it('should do nothing if custom path swcrc is not named .lib.swcrc', async () => {
    await setup(tree);
    customSwcrcPath(tree, true);

    await renameSwcrcConfig(tree);

    expect(tree.exists('libs/mesh-sdk/.custom.swcrc')).toBeTruthy();
    expect(tree.exists('libs/mesh-sdk/.swcrc')).toBeFalsy();

    const projectConfig = readProjectConfiguration(tree, 'mesh-sdk');
    expect(projectConfig?.targets?.['build']?.options?.swcrc).toEqual(
      'libs/mesh-sdk/.custom.swcrc'
    );
  });
});
