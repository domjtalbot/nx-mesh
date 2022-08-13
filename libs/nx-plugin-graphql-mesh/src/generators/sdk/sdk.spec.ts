import type { NxJsonConfiguration, Tree } from '@nrwl/devkit';

import type { MeshConfigExtensions, SdkGeneratorSchema } from './schema';

import { readJson, getProjects } from '@nrwl/devkit';
import * as devkit from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { sdkGenerator } from './sdk';

describe('sdk', () => {
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
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      const workspaceJson = readJson(tree, '/workspace.json');
      const nxJson = readJson<NxJsonConfiguration>(tree, 'nx.json');
      const project = workspaceJson.projects['my-mesh-sdk'];

      expect(project.root).toEqual('libs/my-mesh-sdk');
      expect(project.architect).toEqual(
        expect.objectContaining({
          build: {
            builder: '@domjtalbot/nx-plugin-graphql-mesh:build',
            outputs: ['libs/my-mesh-sdk/.mesh', '{options.outputPath}'],
            options: {
              dir: 'libs/my-mesh-sdk',
              main: 'libs/my-mesh-sdk/src/index.ts',
              outputPath: 'dist/libs/my-mesh-sdk',
              tsConfig: 'libs/my-mesh-sdk/tsconfig.lib.json',
            },
          },
        })
      );

      expect(project.architect).toEqual(
        expect.objectContaining({
          serve: {
            builder: '@domjtalbot/nx-plugin-graphql-mesh:serve',
            options: {
              dev: true,
              dir: 'libs/my-mesh-sdk',
              port: 4200,
            },
          },
        })
      );

      expect(project.architect).toEqual(
        expect.objectContaining({
          validate: {
            builder: '@domjtalbot/nx-plugin-graphql-mesh:validate',
            options: {
              dir: 'libs/my-mesh-sdk',
            },
          },
        })
      );

      expect(workspaceJson.projects['my-mesh-sdk'].architect.lint).toEqual({
        builder: '@nrwl/linter:eslint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: ['libs/my-mesh-sdk/**/*.ts'],
        },
      });

      expect(nxJson.defaultProject).toEqual('my-mesh-sdk');
    });

    it('should update tags', async () => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        tags: 'one,two',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      const projects = Object.fromEntries(getProjects(tree));

      expect(projects).toMatchObject({
        'my-mesh-sdk': {
          tags: ['one', 'two'],
        },
      });
    });

    it('should generate files', async () => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      expect(tree.exists(`libs/my-mesh-sdk/jest.config.ts`)).toBeTruthy();

      const tsconfig = readJson(tree, 'libs/my-mesh-sdk/tsconfig.json');

      expect(tsconfig).toMatchInlineSnapshot(`
        Object {
          "extends": "../../tsconfig.base.json",
          "files": Array [],
          "include": Array [],
          "references": Array [
            Object {
              "path": "./tsconfig.lib.json",
            },
            Object {
              "path": "./tsconfig.spec.json",
            },
          ],
        }
      `);

      const tsconfigApp = readJson(tree, 'libs/my-mesh-sdk/tsconfig.lib.json');

      expect(tsconfigApp.compilerOptions.outDir).toEqual('../../dist/out-tsc');

      expect(tsconfigApp.extends).toEqual('./tsconfig.json');

      expect(tsconfigApp.exclude).toEqual([
        'jest.config.ts',
        '**/*.spec.ts',
        '**/*.test.ts',
      ]);

      const eslintrc = readJson(tree, 'libs/my-mesh-sdk/.eslintrc.json');

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

      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      const tsconfig = readJson(tree, 'libs/my-mesh-sdk/tsconfig.json');

      expect(tsconfig.extends).toBe('../../tsconfig.json');
    });
  });

  describe('nested', () => {
    it('should update workspace.json', async () => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        directory: 'myDir',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      const workspaceJson = readJson(tree, '/workspace.json');

      const nxJson = readJson<NxJsonConfiguration>(tree, 'nx.json');

      expect(workspaceJson.projects['my-dir-my-mesh-sdk'].root).toEqual(
        'libs/my-dir/my-mesh-sdk'
      );

      expect(
        workspaceJson.projects['my-dir-my-mesh-sdk'].architect.lint
      ).toEqual({
        builder: '@nrwl/linter:eslint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: ['libs/my-dir/my-mesh-sdk/**/*.ts'],
        },
      });

      expect(workspaceJson.projects['my-dir-my-mesh-sdk-e2e']).toBeUndefined();

      expect(nxJson.defaultProject).toEqual('my-dir-my-mesh-sdk');
    });

    it('should update tags', async () => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        directory: 'myDir',
        tags: 'one,two',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      const projects = Object.fromEntries(getProjects(tree));
      expect(projects).toMatchObject({
        'my-dir-my-mesh-sdk': {
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

      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        directory: 'myDir',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      // Make sure these exist
      [`libs/my-dir/my-mesh-sdk/jest.config.ts`].forEach((path) => {
        expect(tree.exists(path)).toBeTruthy();
      });

      // Make sure these have properties
      [
        {
          path: 'libs/my-dir/my-mesh-sdk/tsconfig.lib.json',
          lookupFn: (json: any) => json.compilerOptions.outDir,
          expectedValue: '../../../dist/out-tsc',
        },
        {
          path: 'libs/my-dir/my-mesh-sdk/tsconfig.lib.json',
          lookupFn: (json: any) => json.compilerOptions.types,
          expectedValue: ['node'],
        },
        {
          path: 'libs/my-dir/my-mesh-sdk/tsconfig.lib.json',
          lookupFn: (json: any) => json.exclude,
          expectedValue: ['jest.config.ts', '**/*.spec.ts', '**/*.test.ts'],
        },
        {
          path: 'libs/my-dir/my-mesh-sdk/.eslintrc.json',
          lookupFn: (json: any) => json.extends,
          expectedValue: ['../../../.eslintrc.json'],
        },
      ].forEach(hasJsonValue);
    });
  });

  describe('--unit-test-runner none', () => {
    it('should not generate test configuration', async () => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        unitTestRunner: 'none',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      expect(tree.exists('jest.config.ts')).toBeFalsy();

      expect(tree.exists('libs/my-mesh-sdk/src/test-setup.ts')).toBeFalsy();

      expect(tree.exists('libs/my-mesh-sdk/src/test.ts')).toBeFalsy();

      expect(tree.exists('libs/my-mesh-sdk/tsconfig.spec.json')).toBeFalsy();

      expect(tree.exists('libs/my-mesh-sdk/jest.config.ts')).toBeFalsy();

      const workspaceJson = readJson(tree, 'workspace.json');

      expect(
        workspaceJson.projects['my-mesh-sdk'].architect.test
      ).toBeUndefined();

      expect(workspaceJson.projects['my-mesh-sdk'].architect.lint)
        .toMatchInlineSnapshot(`
        Object {
          "builder": "@nrwl/linter:eslint",
          "options": Object {
            "lintFilePatterns": Array [
              "libs/my-mesh-sdk/**/*.ts",
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
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        tags: 'one,two',
        babelJest: true,
      } as SdkGeneratorSchema);

      expect(tree.read(`libs/my-mesh-sdk/jest.config.ts`, 'utf-8'))
        .toMatchInlineSnapshot(`
        "/* eslint-disable */
        export default {
          displayName: 'my-mesh-sdk',
          preset: '../../jest.preset.js',
          testEnvironment: 'node',
          transform: {
            '^.+\\\\\\\\.[tj]sx?$': 'babel-jest'
          },
          moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
          coverageDirectory: '../../coverage/libs/my-mesh-sdk'
        };
        "
      `);
    });
  });

  describe('--compiler=swc', () => {
    it('should use swc for compiling', async () => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        compiler: 'swc',
      } as SdkGeneratorSchema);

      const workspaceJson = readJson(tree, '/workspace.json');
      const project = workspaceJson.projects['my-mesh-sdk'];

      expect(project.root).toEqual('libs/my-mesh-sdk');

      expect(project.architect).toEqual(
        expect.objectContaining({
          build: {
            builder: '@domjtalbot/nx-plugin-graphql-mesh:build-swc',
            outputs: ['libs/my-mesh-sdk/.mesh', '{options.outputPath}'],
            options: {
              dir: 'libs/my-mesh-sdk',
              main: 'libs/my-mesh-sdk/src/index.ts',
              outputPath: 'dist/libs/my-mesh-sdk',
              tsConfig: 'libs/my-mesh-sdk/tsconfig.lib.json',
            },
          },
        })
      );

      expect(tree.read(`libs/my-mesh-sdk/.lib.swcrc`, 'utf-8'))
        .toMatchInlineSnapshot(`
        "{
          \\"jsc\\": {
            \\"target\\": \\"es2017\\",
            \\"parser\\": {
              \\"syntax\\": \\"typescript\\",
              \\"decorators\\": true,
              \\"dynamicImport\\": true
            },
            \\"transform\\": {
              \\"decoratorMetadata\\": true,
              \\"legacyDecorator\\": true
            },
            \\"keepClassNames\\": true,
            \\"externalHelpers\\": true,
            \\"loose\\": true
          },
          \\"module\\": {
            \\"type\\": \\"commonjs\\",
            \\"strict\\": true,
            \\"noInterop\\": true
          },
          \\"sourceMaps\\": true,
          \\"exclude\\": [\\"jest.config.ts\\",\\".*.spec.tsx?$\\",\\".*.test.tsx?$\\",\\"./src/jest-setup.ts$\\",\\"./**/jest-setup.ts$\\",\\".*.js$\\"]
        }"
      `);

      expect;
    });
  });

  describe('--skipFormat', () => {
    it('should format files by default', async () => {
      jest.spyOn(devkit, 'formatFiles');

      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        compiler: 'tsc',
      });

      expect(devkit.formatFiles).toHaveBeenCalled();
    });

    it('should not format files when --skipFormat=true', async () => {
      jest.spyOn(devkit, 'formatFiles');

      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        skipFormat: true,
        compiler: 'tsc',
      });

      expect(devkit.formatFiles).not.toHaveBeenCalled();
    });
  });

  describe('--meshConfig', () => {
    it('should create a YAML config by default', async () => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        unitTestRunner: 'none',
        standaloneConfig: false,
        compiler: 'tsc',
      });

      expect(tree.exists('libs/my-mesh-sdk/.meshrc.yml')).toBeTruthy();

      const meshConfig = tree.read('libs/my-mesh-sdk/.meshrc.yml', 'utf-8');

      expect(meshConfig).toMatchInlineSnapshot(`
        "
        sources:
          - name: JavaScript Wiki
            handler:
              openapi:
                source: https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml

        serve:
          browser: false

        sdk:
          generateOperations:
            selectionSetDepth: 6
        "
      `);
    });

    it.each<[string, MeshConfigExtensions]>([
      ['CJS', 'cjs'],
      ['JS', 'js'],
    ])('should create a %s config when --meshConfig=%s', async (name, ext) => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        unitTestRunner: 'none',
        standaloneConfig: false,
        meshConfig: ext,
        compiler: 'tsc',
      });

      expect(tree.exists(`libs/my-mesh-sdk/.meshrc.${ext}`)).toBeTruthy();

      const meshConfig = tree.read(`libs/my-mesh-sdk/.meshrc.${ext}`, 'utf-8');

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
          sdk: {
            generateOperations: {
              selectionSetDepth: 6
            }
          }
        };

        "
      `);
    });

    it('should create a JSON config when --meshConfig=json', async () => {
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        unitTestRunner: 'none',
        standaloneConfig: false,
        meshConfig: 'json',
        compiler: 'tsc',
      });

      expect(tree.exists('libs/my-mesh-sdk/.meshrc.json')).toBeTruthy();

      const meshConfig = readJson(tree, 'libs/my-mesh-sdk/.meshrc.json');

      expect(meshConfig).toMatchInlineSnapshot(`
        Object {
          "sdk": Object {
            "generateOperations": Object {
              "selectionSetDepth": 6,
            },
          },
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
      await sdkGenerator(tree, {
        name: 'myMeshSdk',
        unitTestRunner: 'none',
        standaloneConfig: false,
        meshConfig: 'yml',
        compiler: 'tsc',
      });

      expect(tree.exists('libs/my-mesh-sdk/.meshrc.yml')).toBeTruthy();

      const meshConfig = tree.read('libs/my-mesh-sdk/.meshrc.yml', 'utf-8');

      expect(meshConfig).toMatchInlineSnapshot(`
        "
        sources:
          - name: JavaScript Wiki
            handler:
              openapi:
                source: https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml

        serve:
          browser: false

        sdk:
          generateOperations:
            selectionSetDepth: 6
        "
      `);
    });
  });
});
