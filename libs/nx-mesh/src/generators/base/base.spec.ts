import type { Tree } from '@nrwl/devkit';
import type { BaseOptions } from './schema';

import * as devkit from '@nrwl/devkit';
import { getProjects, readJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Linter } from '@nrwl/linter';

import { baseGenerator } from './base';

describe.each<
  BaseOptions & {
    describeName: string;
    expectedName: string;
    expectedPath: string;
    relativeToRoot: string;
  }
>([
  {
    describeName: 'nested within app directory',
    directory: 'test',
    expectedName: 'test-my-mesh-app',
    expectedPath: 'apps/test/my-mesh-app',
    name: 'my-mesh-app',
    projectType: 'app',
    relativeToRoot: '../../../',
  },
  {
    describeName: 'app directory',
    expectedName: 'my-mesh-app',
    expectedPath: 'apps/my-mesh-app',
    name: 'my-mesh-app',
    projectType: 'app',
    relativeToRoot: '../../',
  },
  {
    describeName: 'app with standalone config',
    expectedName: 'my-mesh-app',
    expectedPath: 'apps/my-mesh-app',
    name: 'my-mesh-app',
    projectType: 'app',
    standaloneConfig: true,
    relativeToRoot: '../../',
  },
  {
    describeName: 'nested within lib directory',
    directory: 'test',
    expectedName: 'test-my-mesh-lib',
    expectedPath: 'libs/test/my-mesh-lib',
    name: 'my-mesh-lib',
    projectType: 'lib',
    relativeToRoot: '../../../',
  },
  {
    describeName: 'lib directory',
    expectedName: 'my-mesh-lib',
    expectedPath: 'libs/my-mesh-lib',
    name: 'my-mesh-lib',
    projectType: 'lib',
    relativeToRoot: '../../',
  },
  {
    describeName: 'lib with standalone config',
    expectedName: 'my-mesh-lib',
    expectedPath: 'libs/my-mesh-lib',
    name: 'my-mesh-lib',
    projectType: 'lib',
    standaloneConfig: true,
    relativeToRoot: '../../',
  },
])(
  'generators/base',
  ({ describeName, expectedName, expectedPath, relativeToRoot, ...config }) => {
    let tree: Tree;

    beforeEach(() => {
      tree = createTreeWithEmptyWorkspace();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe(describeName, () => {
      describe('--babelJest', () => {
        it('should use babel for jest', async () => {
          await baseGenerator(tree, {
            ...config,
            babelJest: true,
          });

          expect(
            tree.read(`${expectedPath}/jest.config.ts`, 'utf-8')
          ).toMatchSnapshot();
        });
      });

      describe('--e2eTestRunner', () => {
        if (config.projectType === 'app') {
          it('should use cypress for E2E', async () => {
            await baseGenerator(tree, {
              ...config,
              e2eTestRunner: 'cypress',
            });

            const workspaceJson = readJson(tree, 'workspace.json');
            const e2eConfig = tree.read(
              `${expectedPath}-e2e/src/integration/app.spec.ts`,
              'utf-8'
            );

            expect(workspaceJson.projects[`${expectedName}-e2e`]).toEqual(
              `${expectedPath}-e2e`
            );
            expect(e2eConfig).toMatchSnapshot();
          });
        }

        if (config.projectType === 'lib') {
          it('should not create a E2E project', async () => {
            await baseGenerator(tree, {
              ...config,
            });

            const workspaceJson = readJson(tree, 'workspace.json');

            expect(workspaceJson.projects[`${expectedName}-e2e`]).toBeFalsy();
          });
        }
      });

      describe('--linter', () => {
        it('should use eslint for linting', async () => {
          await baseGenerator(tree, {
            ...config,
            linter: Linter.EsLint,
          });

          expect(
            tree.read(`${expectedPath}/.eslintrc.json`, 'utf-8')
          ).toMatchSnapshot();
        });
      });

      describe('--meshConfig', () => {
        it('should create a yml config by default', async () => {
          await baseGenerator(tree, config);

          expect(tree.exists(`${expectedPath}/.meshrc.yml`)).toBeTruthy();

          const meshConfig = tree.read(`${expectedPath}/.meshrc.yml`, 'utf-8');

          expect(meshConfig).toMatchSnapshot();
        });

        it.each<BaseOptions['meshConfig']>(['cjs', 'js', 'json', 'yml'])(
          'should create a %s config when --meshConfig=%s',
          async (meshConfigType) => {
            await baseGenerator(tree, {
              ...config,
              meshConfig: meshConfigType,
            });

            expect(
              tree.exists(`${expectedPath}/.meshrc.${meshConfigType}`)
            ).toBeTruthy();

            const meshConfig = tree.read(
              `${expectedPath}/.meshrc.${meshConfigType}`,
              'utf-8'
            );

            expect(meshConfig).toMatchSnapshot();
          }
        );
      });

      describe('--meshExampleProject', () => {
        it('should create a javascriptWiki config by default', async () => {
          await baseGenerator(tree, config);

          const meshConfig = tree.read(`${expectedPath}/.meshrc.yml`, 'utf-8');

          expect(meshConfig).toMatchSnapshot();
        });

        it.each<[BaseOptions['meshExampleProject'], BaseOptions['meshConfig']]>(
          [
            ['javascriptWiki', 'cjs'],
            ['javascriptWiki', 'js'],
            ['javascriptWiki', 'json'],
            ['javascriptWiki', 'yml'],
            ['stackexchange', 'cjs'],
            ['stackexchange', 'js'],
            ['stackexchange', 'json'],
            ['stackexchange', 'yml'],
            ['trippin', 'cjs'],
            ['trippin', 'js'],
            ['trippin', 'json'],
            ['trippin', 'yml'],
            ['weatherbit', 'cjs'],
            ['weatherbit', 'js'],
            ['weatherbit', 'json'],
            ['weatherbit', 'yml'],
          ]
        )(
          'should create a %s %s config',
          async (meshExampleProject, meshConfigType) => {
            await baseGenerator(tree, {
              ...config,
              meshConfig: meshConfigType,
              meshExampleProject,
            });

            expect(
              tree.exists(`${expectedPath}/.meshrc.${meshConfigType}`)
            ).toBeTruthy();

            const meshConfig = tree.read(
              `${expectedPath}/.meshrc.${meshConfigType}`,
              'utf-8'
            );

            expect(meshConfig).toMatchSnapshot();
          }
        );
      });

      describe('--skipFormat', () => {
        it('should format files by default', async () => {
          jest.spyOn(devkit, 'formatFiles');

          await baseGenerator(tree, config);

          expect(devkit.formatFiles).toHaveBeenCalled();
        });

        it('should not format files when --skipFormat=true', async () => {
          jest.spyOn(devkit, 'formatFiles');

          await baseGenerator(tree, {
            ...config,
            skipFormat: true,
          });

          expect(devkit.formatFiles).not.toHaveBeenCalled();
        });
      });

      describe('--tags', () => {
        it('should update tags', async () => {
          await baseGenerator(tree, {
            ...config,
            tags: 'one,two',
          });

          const projects = Object.fromEntries(getProjects(tree));

          expect(projects[expectedName]?.tags).toStrictEqual(['one', 'two']);
        });
      });

      describe('--unitTestRunner', () => {
        it('should not add a jest config if the unitTestRunner is none', async () => {
          await baseGenerator(tree, {
            ...config,
            unitTestRunner: 'none',
          });

          expect(tree.exists(`${expectedPath}/jest.config.ts`)).toBeFalsy();
        });

        it('should add a jest config if the unitTestRunner is jest', async () => {
          await baseGenerator(tree, {
            ...config,
            unitTestRunner: 'jest',
          });

          expect(tree.exists(`${expectedPath}/jest.config.ts`)).toBeTruthy();

          const jestConfig = tree.read(
            `${expectedPath}/jest.config.ts`,
            'utf-8'
          );

          expect(jestConfig).toMatchSnapshot();
        });
      });

      it('should add mesh dependencies to the workspace package.json', async () => {
        await baseGenerator(tree, config);

        const packageJson = readJson(tree, 'package.json');

        expect(packageJson.dependencies['@graphql-mesh/cli']).toBeDefined();
        expect(packageJson.dependencies['@graphql-mesh/runtime']).toBeDefined();
        expect(packageJson.dependencies['@graphql-mesh/utils']).toBeDefined();
      });

      it('should extend from root tsconfig.json when no tsconfig.base.json', async () => {
        await baseGenerator(tree, config);

        const tsconfig = readJson(tree, `${expectedPath}/tsconfig.json`);

        expect(tsconfig.extends).toBe(`${relativeToRoot}tsconfig.base.json`);
      });

      it('should update the workspace.json', async () => {
        await baseGenerator(tree, config);

        const workspaceJson = readJson(tree, 'workspace.json');

        expect(workspaceJson.projects[expectedName]).toEqual(expectedPath);
      });
    });
  }
);
