import type { Tree } from '@nrwl/devkit';

import type { NormalizedSchema } from './normalize-options';

import { joinPathFragments, updateJson } from '@nrwl/devkit';

export async function addLinting(host: Tree, options: NormalizedSchema) {
  updateJson(
    host,
    joinPathFragments(options.libProjectRoot, '.eslintrc.json'),
    (value) => {
      const config = {
        ...value,
      };

      config['ignorePatterns'] = [...config['ignorePatterns'], '.mesh'];

      return config;
    }
  );
}

export default addLinting;
