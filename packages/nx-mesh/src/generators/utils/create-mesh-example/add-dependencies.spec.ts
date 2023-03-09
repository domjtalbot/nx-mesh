import type { Tree } from '@nrwl/devkit';
import type { CreateMeshExampleOptions, MeshDependencies } from './types';

import { getWorkspaceLayout, joinPathFragments } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { addDependencies } from './add-dependencies';

describe('addDependencies', () => {
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
  ])('%s', (example) => {
    it(`should add dependencies to the package.json`, () => {
      addDependencies(tree, {
        example,
      });

      expect(tree.exists('package.json')).toBeTruthy();

      let hasMeshPackages = false;

      const packageJson = tree.read('package.json', 'utf-8');

      if (packageJson) {
        const parsedPackageJson = JSON.parse(packageJson);

        if (
          Object.prototype.hasOwnProperty.call(
            parsedPackageJson,
            'dependencies'
          ) &&
          typeof parsedPackageJson['dependencies'] === 'object'
        ) {
          hasMeshPackages = Object.keys(parsedPackageJson['dependencies']).some(
            (name) => name.startsWith('@graphql-mesh')
          );
        }
      }

      expect(hasMeshPackages).toBeTruthy();
    });

    it(`should add codegen dependencies to the package.json`, () => {
      addDependencies(tree, {
        codegen: true,
        example,
      });

      expect(tree.exists('package.json')).toBeTruthy();

      let hasCodegenPackages = false;

      const packageJson = tree.read('package.json', 'utf-8');

      if (packageJson) {
        const parsedPackageJson = JSON.parse(packageJson);

        if (
          Object.prototype.hasOwnProperty.call(
            parsedPackageJson,
            'dependencies'
          ) &&
          typeof parsedPackageJson['dependencies'] === 'object'
        ) {
          hasCodegenPackages = Object.keys(
            parsedPackageJson['dependencies']
          ).some((name) => name.startsWith('@graphql-codegen'));
        }
      }

      expect(hasCodegenPackages).toBeTruthy();
    });

    it(`should not add codegen dependencies to the package.json`, () => {
      addDependencies(tree, {
        codegen: false,
        example,
      });

      expect(tree.exists('package.json')).toBeTruthy();

      let hasCodegenPackages = false;

      const packageJson = tree.read('package.json', 'utf-8');

      if (packageJson) {
        const parsedPackageJson = JSON.parse(packageJson);

        if (
          Object.prototype.hasOwnProperty.call(
            parsedPackageJson,
            'dependencies'
          ) &&
          typeof parsedPackageJson['dependencies'] === 'object'
        ) {
          hasCodegenPackages = Object.keys(
            parsedPackageJson['dependencies']
          ).some((name) => name.startsWith('@graphql-codegen'));
        }
      }

      expect(hasCodegenPackages).toBeFalsy();
    });
  });
});
