import type { Tree } from '@nrwl/devkit';
import type { CreateMeshExampleOptions } from './types';

import { getWorkspaceLayout, joinPathFragments } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { createCodegenFiles } from './create-codegen-files';

describe('createCodegenFiles', () => {
  let tree: Tree;
  let projectDirectory: string;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    const workspace = getWorkspaceLayout(tree);

    projectDirectory = joinPathFragments(workspace.libsDir, 'test');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe.each<CreateMeshExampleOptions['example']>([
    'country-info',
    'fake-api',
    'javascript-wiki',
    'movies',
    'rfam',
    'stackexchange',
    'star-wars',
    'trippin',
  ])(`codegen - %s`, (example) => {
    it('should create a codegen files', () => {
      const expectedConfigPath = `${projectDirectory}/codegen.ts`;

      createCodegenFiles(tree, {
        example,
        projectDirectory,
      });

      expect(tree.exists(`${projectDirectory}/codegen.ts`)).toBeTruthy();
      expect(tree.exists(`${projectDirectory}/src/lib/client.ts`)).toBeTruthy();

      const meshConfig = tree.read(expectedConfigPath, 'utf-8');

      expect(meshConfig).toMatchSnapshot();
    });
  });
});
