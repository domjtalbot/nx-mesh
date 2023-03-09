import type { Tree } from '@nrwl/devkit';
import type { CreateMeshExampleOptions } from './types';

import { getWorkspaceLayout, joinPathFragments } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import * as addDependencies from './add-dependencies';
import * as createCodegenFiles from './create-codegen-files';
import { createMeshExample } from './create-mesh-example';
import * as createSharedFiles from './create-shared-files';

describe('createMeshExample', () => {
  let tree: Tree;
  let projectDirectory: string;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    tree.write(
      'workspace.json',
      JSON.stringify({
        version: 2,
        projects: {},
      })
    );

    const workspace = getWorkspaceLayout(tree);

    projectDirectory = joinPathFragments(workspace.libsDir, 'test');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create shared files', () => {
    const spyCreateSharedFiles = jest.spyOn(
      createSharedFiles,
      'createSharedFiles'
    );

    const options: CreateMeshExampleOptions = {
      configExtension: 'js',
      example: 'country-info',
      isSdk: false,
      projectDirectory,
    };

    createMeshExample(tree, options);

    expect(spyCreateSharedFiles).toBeCalledWith(
      expect.objectContaining(tree),
      expect.objectContaining(options)
    );
  });

  it('should create codegen files', () => {
    const spyCreateCodegenFiles = jest.spyOn(
      createCodegenFiles,
      'createCodegenFiles'
    );

    const options: CreateMeshExampleOptions = {
      codegen: true,
      configExtension: 'js',
      example: 'star-wars',
      isSdk: true,
      projectDirectory,
    };

    createMeshExample(tree, options);

    expect(spyCreateCodegenFiles).toBeCalledWith(
      expect.objectContaining(tree),
      expect.objectContaining(options)
    );
  });

  it('should add dependencies', () => {
    const spyAddDependencies = jest.spyOn(addDependencies, 'addDependencies');

    const options: CreateMeshExampleOptions = {
      configExtension: 'js',
      example: 'country-info',
      isSdk: false,
      projectDirectory,
    };

    createMeshExample(tree, options);

    expect(spyAddDependencies).toBeCalledWith(
      expect.objectContaining(tree),
      expect.objectContaining({
        example: options.example,
      })
    );
  });
});
