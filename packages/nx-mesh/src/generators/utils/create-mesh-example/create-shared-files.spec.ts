import type { Tree } from '@nrwl/devkit';
import type { CreateMeshExampleOptions } from './types';

import { getWorkspaceLayout, joinPathFragments } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { createSharedFiles } from './create-shared-files';

describe('createSharedFiles', () => {
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

  describe.each<CreateMeshExampleOptions['example']>([
    'country-info',
    'fake-api',
    'javascript-wiki',
    'movies',
    'rfam',
    'stackexchange',
    'star-wars',
    'trippin',
  ])(`meshConfig - %s`, (example) => {
    it.each<CreateMeshExampleOptions['configExtension']>([
      'cjs',
      'js',
      'json',
      'yml',
    ])('should create a %s mesh config', (configExtension) => {
      const expectedConfigPath = `${projectDirectory}/.meshrc.${configExtension}`;

      createSharedFiles(tree, {
        configExtension,
        example,
        isSdk: false,
        projectDirectory,
      });

      expect(tree.exists(expectedConfigPath)).toBeTruthy();

      const meshConfig = tree.read(expectedConfigPath, 'utf-8');

      expect(meshConfig).toMatchSnapshot();
    });
  });

  describe('country-info', () => {
    it('should create a src folder supplementary files', () => {
      const expectedPaths = ['src/graphql/GetLanguages.query.graphql'];

      createSharedFiles(tree, {
        configExtension: 'yml',
        example: 'country-info',
        isSdk: false,
        projectDirectory,
      });

      expectedPaths.forEach((expectedPath) => {
        const filePath = `${projectDirectory}/${expectedPath}`;
        expect(tree.exists(filePath)).toBeTruthy();

        const contents = tree.read(filePath, 'utf-8');

        expect(contents).toMatchSnapshot();
      });
    });
  });

  describe('fake-api', () => {
    it('should create a src folder supplementary files', () => {
      const expectedPaths = [
        'src/graphql/getMe.query.graphql',
        'src/json-samples/user-input.json',
        'src/json-schemas/company.json',
        'src/json-schemas/user.json',
      ];

      createSharedFiles(tree, {
        configExtension: 'yml',
        example: 'fake-api',
        isSdk: false,
        projectDirectory,
      });

      expectedPaths.forEach((expectedPath) => {
        const filePath = `${projectDirectory}/${expectedPath}`;
        expect(tree.exists(filePath)).toBeTruthy();

        const contents = tree.read(filePath, 'utf-8');

        expect(contents).toMatchSnapshot();
      });
    });
  });

  describe('movies', () => {
    it('should create a src folder supplementary files', () => {
      const expectedPaths = ['src/graphql/example.query.graphql'];

      createSharedFiles(tree, {
        configExtension: 'yml',
        example: 'movies',
        isSdk: false,
        projectDirectory,
      });

      expectedPaths.forEach((expectedPath) => {
        const filePath = `${projectDirectory}/${expectedPath}`;
        expect(tree.exists(filePath)).toBeTruthy();

        const contents = tree.read(filePath, 'utf-8');

        expect(contents).toMatchSnapshot();
      });
    });
  });

  describe('rfam', () => {
    it('should create a src folder supplementary files', () => {
      const expectedPaths = ['src/graphql/getAlignmentTree.query.graphql'];

      createSharedFiles(tree, {
        configExtension: 'yml',
        example: 'rfam',
        isSdk: false,
        projectDirectory,
      });

      expectedPaths.forEach((expectedPath) => {
        const filePath = `${projectDirectory}/${expectedPath}`;
        expect(tree.exists(filePath)).toBeTruthy();

        const contents = tree.read(filePath, 'utf-8');

        expect(contents).toMatchSnapshot();
      });
    });
  });

  describe('star-wars', () => {
    it('should create a src folder supplementary files', () => {
      const expectedPaths = ['src/graphql/getMovies.query.graphql'];

      createSharedFiles(tree, {
        configExtension: 'yml',
        example: 'star-wars',
        isSdk: false,
        projectDirectory,
      });

      expectedPaths.forEach((expectedPath) => {
        const filePath = `${projectDirectory}/${expectedPath}`;
        expect(tree.exists(filePath)).toBeTruthy();

        const contents = tree.read(filePath, 'utf-8');

        expect(contents).toMatchSnapshot();
      });
    });
  });

  describe('trippin', () => {
    it('should create a src folder supplementary files', () => {
      const expectedPaths = ['src/graphql/airports/getAirports.query.graphql'];

      createSharedFiles(tree, {
        configExtension: 'yml',
        example: 'trippin',
        isSdk: false,
        projectDirectory,
      });

      expectedPaths.forEach((expectedPath) => {
        const filePath = `${projectDirectory}/${expectedPath}`;
        expect(tree.exists(filePath)).toBeTruthy();

        const contents = tree.read(filePath, 'utf-8');

        expect(contents).toMatchSnapshot();
      });
    });
  });
});
