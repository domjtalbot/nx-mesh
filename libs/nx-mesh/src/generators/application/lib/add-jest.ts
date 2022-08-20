import type { Tree } from '@nrwl/devkit';

import type { NormalizedSchema } from './normalize-options';

import { joinPathFragments, readJson, updateJson } from '@nrwl/devkit';
import { jestProjectGenerator } from '@nrwl/jest';

export async function addJest(host: Tree, options: NormalizedSchema) {
  if (options.unitTestRunner !== 'jest') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  const jestTask = await jestProjectGenerator(host, {
    ...options,
    babelJest: options.babelJest,
    project: options.projectName,
    setupFile: 'none',
    skipFormat: true,
    skipSerializers: true,
    supportTsx: options.js,
    testEnvironment: 'node',
  });

  const tsConfigSpecJson = readJson(
    host,
    joinPathFragments(options.appProjectRoot, 'tsconfig.spec.json')
  );

  updateJson(
    host,
    joinPathFragments(options.appProjectRoot, 'tsconfig.json'),
    (json) => {
      json.compilerOptions ??= {};
      json.compilerOptions.types ??= [];
      json.compilerOptions.types.push(
        ...(tsConfigSpecJson?.compilerOptions?.types ?? [])
      );

      return json;
    }
  );

  updateJson(
    host,
    joinPathFragments(options.appProjectRoot, 'tsconfig.spec.json'),
    (json) => {
      // have to override exclude otherwise lint will fail with setParserOptionsProject and jest.config.ts
      if (options.setParserOptionsProject) {
        const tsConfig = readJson(
          host,
          joinPathFragments(options.appProjectRoot, 'tsconfig.json')
        );
        json.exclude = tsConfig.exclude.filter(
          (excluded: string) => excluded !== 'jest.config.ts'
        );
      }
      return json;
    }
  );

  return jestTask;
}

export default addJest;
