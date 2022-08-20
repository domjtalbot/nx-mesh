import type { GeneratorCallback, Tree } from '@nrwl/devkit';

import type { NormalizedSchema } from './normalize-options';

import { joinPathFragments, updateJson } from '@nrwl/devkit';
import { lintProjectGenerator } from '@nrwl/linter';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

export async function addLinting(
  host: Tree,
  options: NormalizedSchema
): Promise<GeneratorCallback> {
  const lintTask = await lintProjectGenerator(host, {
    linter: options.linter,
    project: options.projectName,
    tsConfigPaths: [
      joinPathFragments(options.appProjectRoot, 'tsconfig.app.json'),
    ],
    eslintFilePatterns: [
      `${options.appProjectRoot}/**/*.${options.js ? 'js' : 'ts'}`,
    ],
    skipFormat: true,
    setParserOptionsProject: options.setParserOptionsProject,
  });

  updateJson(
    host,
    joinPathFragments(options.appProjectRoot, '.eslintrc.json'),
    (value) => {
      const config = {
        ...value,
      };

      config['ignorePatterns'] = [...config['ignorePatterns'], '.mesh'];

      return config;
    }
  );

  return runTasksInSerial(lintTask);
}

export default addLinting;
