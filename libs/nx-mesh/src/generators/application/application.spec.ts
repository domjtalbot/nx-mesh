import type { NxJsonConfiguration, Tree } from '@nrwl/devkit';

import type { AppGeneratorSchema } from './schema';

import { readJson, getProjects } from '@nrwl/devkit';
import * as devkit from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { applicationGenerator } from './application';

describe('app', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    jest.clearAllMocks();
  });

  // afterEach(() => {
  //   overrideCollectionResolutionForTesting(null);
  // });

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        standaloneConfig: false,
        e2eTestRunner: 'none',
      });

      const workspaceJson = readJson(tree, '/workspace.json');
      const nxJson = readJson<NxJsonConfiguration>(tree, 'nx.json');
      const project = workspaceJson.projects['my-mesh-app'];

      expect(project.root).toEqual('apps/my-mesh-app');
      expect(project.architect).toEqual(
        expect.objectContaining({
          build: {
            builder: '@domjtalbot/nx-mesh:build-gateway',
            outputs: ['apps/my-mesh-app/.mesh', '{options.outputPath}'],
            options: {
              dir: 'apps/my-mesh-app',
              outputPath: 'dist/apps/my-mesh-app',
            },
          },
        })
      );

      expect(project.architect).toEqual(
        expect.objectContaining({
          serve: {
            builder: '@domjtalbot/nx-mesh:serve',
            options: {
              dev: true,
              dir: 'apps/my-mesh-app',
            },
            configurations: {
              production: {
                dev: false,
                dir: 'dist/apps/my-mesh-app',
              },
            },
          },
        })
      );

      expect(project.architect).toEqual(
        expect.objectContaining({
          validate: {
            builder: '@domjtalbot/nx-mesh:validate',
            options: {
              dir: 'apps/my-mesh-app',
            },
          },
        })
      );

      expect(workspaceJson.projects['my-mesh-app'].architect.lint).toEqual({
        builder: '@nrwl/linter:eslint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: ['apps/my-mesh-app/**/*.ts'],
        },
      });

      expect(workspaceJson.projects['my-mesh-app-e2e']).toBeUndefined();

      expect(nxJson.defaultProject).toEqual('my-mesh-app');
    });

    it('should update tags', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        tags: 'one,two',
        standaloneConfig: false,
      });

      const projects = Object.fromEntries(getProjects(tree));

      expect(projects).toMatchObject({
        'my-mesh-app': {
          tags: ['one', 'two'],
        },
      });
    });

    it('should generate files', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        standaloneConfig: false,
      });

      expect(tree.exists(`apps/my-mesh-app/jest.config.ts`)).toBeTruthy();

      const tsconfig = readJson(tree, 'apps/my-mesh-app/tsconfig.json');

      expect(tsconfig).toMatchInlineSnapshot(`
        Object {
          "compilerOptions": Object {
            "types": Array [
              "jest",
              "node",
            ],
          },
          "extends": "../../tsconfig.base.json",
          "files": Array [],
          "include": Array [],
          "references": Array [
            Object {
              "path": "./tsconfig.app.json",
            },
            Object {
              "path": "./tsconfig.spec.json",
            },
          ],
        }
      `);

      const tsconfigApp = readJson(tree, 'apps/my-mesh-app/tsconfig.app.json');

      expect(tsconfigApp.compilerOptions.outDir).toEqual('../../dist/out-tsc');

      expect(tsconfigApp.extends).toEqual('./tsconfig.json');

      expect(tsconfigApp.exclude).toEqual([
        'jest.config.ts',
        '**/*.spec.ts',
        '**/*.test.ts',
      ]);

      const eslintrc = readJson(tree, 'apps/my-mesh-app/.eslintrc.json');

      expect(eslintrc).toMatchInlineSnapshot(`
        Object {
          "extends": Array [
            "../../.eslintrc.json",
          ],
          "ignorePatterns": Array [
            "!**/*",
            ".mesh",
          ],
          "overrides": Array [
            Object {
              "files": Array [
                "*.ts",
                "*.tsx",
                "*.js",
                "*.jsx",
              ],
              "rules": Object {},
            },
            Object {
              "files": Array [
                "*.ts",
                "*.tsx",
              ],
              "rules": Object {},
            },
            Object {
              "files": Array [
                "*.js",
                "*.jsx",
              ],
              "rules": Object {},
            },
          ],
        }
      `);
    });

    it('should extend from root tsconfig.json when no tsconfig.base.json', async () => {
      tree.rename('tsconfig.base.json', 'tsconfig.json');

      await applicationGenerator(tree, {
        name: 'myMeshApp',
        standaloneConfig: false,
      });

      const tsconfig = readJson(tree, 'apps/my-mesh-app/tsconfig.json');

      expect(tsconfig.extends).toBe('../../tsconfig.json');
    });
  });

  describe('nested', () => {
    it('should update workspace.json', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        directory: 'myDir',
        standaloneConfig: false,
        e2eTestRunner: 'none',
      });

      const workspaceJson = readJson(tree, '/workspace.json');

      const nxJson = readJson<NxJsonConfiguration>(tree, 'nx.json');

      expect(workspaceJson.projects['my-dir-my-mesh-app'].root).toEqual(
        'apps/my-dir/my-mesh-app'
      );

      expect(
        workspaceJson.projects['my-dir-my-mesh-app'].architect.lint
      ).toEqual({
        builder: '@nrwl/linter:eslint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: ['apps/my-dir/my-mesh-app/**/*.ts'],
        },
      });

      expect(workspaceJson.projects['my-dir-my-mesh-app-e2e']).toBeUndefined();

      expect(nxJson.defaultProject).toEqual('my-dir-my-mesh-app');
    });

    it('should update tags', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        directory: 'myDir',
        tags: 'one,two',
        standaloneConfig: false,
      });

      const projects = Object.fromEntries(getProjects(tree));
      expect(projects).toMatchObject({
        'my-dir-my-mesh-app': {
          tags: ['one', 'two'],
        },
      });
    });

    it('should generate files', async () => {
      const hasJsonValue = ({
        path,
        expectedValue,
        lookupFn,
      }: {
        expectedValue: string | string[];
        lookupFn: (json: unknown) => unknown;
        path: string;
      }) => {
        const config = readJson(tree, path);

        expect(lookupFn(config)).toEqual(expectedValue);
      };

      await applicationGenerator(tree, {
        name: 'myMeshApp',
        directory: 'myDir',
        standaloneConfig: false,
      });

      // Make sure these exist
      [`apps/my-dir/my-mesh-app/jest.config.ts`].forEach((path) => {
        expect(tree.exists(path)).toBeTruthy();
      });

      // Make sure these have properties
      [
        {
          path: 'apps/my-dir/my-mesh-app/tsconfig.app.json',
          lookupFn: (json: any) => json.compilerOptions.outDir,
          expectedValue: '../../../dist/out-tsc',
        },
        {
          path: 'apps/my-dir/my-mesh-app/tsconfig.app.json',
          lookupFn: (json: any) => json.compilerOptions.types,
          expectedValue: ['node'],
        },
        {
          path: 'apps/my-dir/my-mesh-app/tsconfig.app.json',
          lookupFn: (json: any) => json.exclude,
          expectedValue: ['jest.config.ts', '**/*.spec.ts', '**/*.test.ts'],
        },
        {
          path: 'apps/my-dir/my-mesh-app/.eslintrc.json',
          lookupFn: (json: any) => json.extends,
          expectedValue: ['../../../.eslintrc.json'],
        },
      ].forEach(hasJsonValue);
    });
  });

  describe('--unit-test-runner none', () => {
    it('should not generate test configuration', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        unitTestRunner: 'none',
        standaloneConfig: false,
      });

      expect(tree.exists('jest.config.ts')).toBeFalsy();

      expect(tree.exists('apps/my-mesh-app/src/test-setup.ts')).toBeFalsy();

      expect(tree.exists('apps/my-mesh-app/src/test.ts')).toBeFalsy();

      expect(tree.exists('apps/my-mesh-app/tsconfig.spec.json')).toBeFalsy();

      expect(tree.exists('apps/my-mesh-app/jest.config.ts')).toBeFalsy();

      const workspaceJson = readJson(tree, 'workspace.json');

      expect(
        workspaceJson.projects['my-mesh-app'].architect.test
      ).toBeUndefined();

      expect(workspaceJson.projects['my-mesh-app'].architect.lint)
        .toMatchInlineSnapshot(`
        Object {
          "builder": "@nrwl/linter:eslint",
          "options": Object {
            "lintFilePatterns": Array [
              "apps/my-mesh-app/**/*.ts",
            ],
          },
          "outputs": Array [
            "{options.outputFile}",
          ],
        }
      `);
    });
  });

  describe('--babelJest', () => {
    it('should use babel for jest', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        tags: 'one,two',
        babelJest: true,
      } as AppGeneratorSchema);

      expect(tree.read(`apps/my-mesh-app/jest.config.ts`, 'utf-8'))
        .toMatchInlineSnapshot(`
        "/* eslint-disable */
        export default {
          displayName: 'my-mesh-app',
          preset: '../../jest.preset.js',
          testEnvironment: 'node',
          transform: {
            '^.+\\\\\\\\.[tj]s$': 'babel-jest'
          },
          moduleFileExtensions: ['ts', 'js', 'html'],
          coverageDirectory: '../../coverage/apps/my-mesh-app'
        };
        "
      `);
    });
  });

  describe('--skipFormat', () => {
    it('should format files by default', async () => {
      jest.spyOn(devkit, 'formatFiles');

      await applicationGenerator(tree, { name: 'myMeshApp' });

      expect(devkit.formatFiles).toHaveBeenCalled();
    });

    it('should not format files when --skipFormat=true', async () => {
      jest.spyOn(devkit, 'formatFiles');

      await applicationGenerator(tree, { name: 'myMeshApp', skipFormat: true });

      expect(devkit.formatFiles).not.toHaveBeenCalled();
    });
  });

  describe('--meshConfig', () => {
    it('should create a YAML config by default', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        unitTestRunner: 'none',
        standaloneConfig: false,
      });

      expect(tree.exists('apps/my-mesh-app/.meshrc.yml')).toBeTruthy();

      const meshConfig = tree.read('apps/my-mesh-app/.meshrc.yml', 'utf-8');

      expect(meshConfig).toMatchInlineSnapshot(`
        "
        sources:
          - name: JavaScript Wiki
            handler:
              openapi:
                source: https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml

        serve:
          browser: false

        "
      `);
    });

    it.each([
      ['CJS', 'cjs'],
      ['JS', 'js'],
    ])('should create a %s config when --meshConfig=%s', async (name, ext) => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        unitTestRunner: 'none',
        standaloneConfig: false,
        meshConfig: ext,
      });

      expect(tree.exists(`apps/my-mesh-app/.meshrc.${ext}`)).toBeTruthy();

      const meshConfig = tree.read(`apps/my-mesh-app/.meshrc.${ext}`, 'utf-8');

      expect(meshConfig).toMatchInlineSnapshot(`
        "
        module.exports = {
          sources: [
            {
              name: 'JavaScript Wiki',
              handler: {
                openapi: {
                  source:
                    'https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml',
                },
              },
            },
          ],
          serve: {
            browser: false,
          },
        };

        "
      `);
    });

    it('should create a JSON config when --meshConfig=json', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        unitTestRunner: 'none',
        standaloneConfig: false,
        meshConfig: 'json',
      });

      expect(tree.exists('apps/my-mesh-app/.meshrc.json')).toBeTruthy();

      const meshConfig = readJson(tree, 'apps/my-mesh-app/.meshrc.json');

      expect(meshConfig).toMatchInlineSnapshot(`
        Object {
          "serve": Object {
            "browser": false,
          },
          "sources": Array [
            Object {
              "handler": Object {
                "openapi": Object {
                  "source": "https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml",
                },
              },
              "name": "JavaScript Wiki",
            },
          ],
        }
      `);
    });

    it('should create a YAML config when --meshConfig=yml', async () => {
      await applicationGenerator(tree, {
        name: 'myMeshApp',
        unitTestRunner: 'none',
        standaloneConfig: false,
        meshConfig: 'yml',
      });

      expect(tree.exists('apps/my-mesh-app/.meshrc.yml')).toBeTruthy();

      const meshConfig = tree.read('apps/my-mesh-app/.meshrc.yml', 'utf-8');

      expect(meshConfig).toMatchInlineSnapshot(`
        "
        sources:
          - name: JavaScript Wiki
            handler:
              openapi:
                source: https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml

        serve:
          browser: false

        "
      `);
    });
  });
});
