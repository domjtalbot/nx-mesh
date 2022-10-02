import type { GeneratorCallback, Tree } from '@nrwl/devkit';

import type { NormalizedOptions } from './normalize-options';

import { joinPathFragments, updateJson } from '@nrwl/devkit';
import { lintProjectGenerator } from '@nrwl/linter';

export async function addLinting(
  host: Tree,
  options: NormalizedOptions
): Promise<GeneratorCallback> {
  const linting = await lintProjectGenerator(host, {
    linter: options.linter,
    project: options.projectName,
    tsConfigPaths: [
      joinPathFragments(
        options.projectDirectory,
        `tsconfig.${options.isApp ? 'app' : 'lib'}.json`
      ),
    ],
    eslintFilePatterns: [
      `${options.projectDirectory}/**/*.${options.js ? 'js' : 'ts'}`,
    ],
    skipFormat: options.skipFormat ?? false,
    setParserOptionsProject: options.setParserOptionsProject,
  });

  if (options.linter === 'eslint') {
    updateJson(
      host,
      joinPathFragments(options.projectDirectory, '.eslintrc.json'),
      (value) => {
        const config = {
          ...value,
        };

        config['ignorePatterns'] = [...config['ignorePatterns'], '.mesh'];

        return config;
      }
    );
  }

  return linting;
}

export default addLinting;
