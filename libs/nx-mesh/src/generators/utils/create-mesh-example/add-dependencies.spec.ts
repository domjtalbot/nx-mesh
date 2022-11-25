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

  it.each<CreateMeshExampleOptions['example']>([
    'country-info',
    'fake-api',
    'javascript-wiki',
    'movies',
    'rfam',
    'stackexchange',
    'star-wars-api',
    'trippin',
  ])(`should add %s dependencies to the package.json`, (example) => {
    addDependencies(tree, {
      example,
    });

    expect(tree.exists('package.json')).toBeTruthy();

    let dependenciesCount = 0;

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
        dependenciesCount = Object.keys(
          parsedPackageJson['dependencies']
        ).length;
      }
    }

    expect(dependenciesCount).toBeGreaterThan(0);
    expect(packageJson).toMatchSnapshot();
  });
});
