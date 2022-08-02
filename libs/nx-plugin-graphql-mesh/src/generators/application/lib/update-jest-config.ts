import type { Tree } from '@nrwl/devkit';

import type { NormalizedSchema } from './normalize-options';

export function updateJestConfig(host: Tree, options: NormalizedSchema) {
  if (options.unitTestRunner !== 'jest') {
    return;
  }

  const configPath = `${options.appProjectRoot}/jest.config.${
    options.js ? 'js' : 'ts'
  }`;

  const originalContent = host.read(configPath, 'utf-8') ?? undefined;

  const content = originalContent
    ?.replace(
      'transform: {',
      "transform: {\n    '^(?!.*\\\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',"
    )
    .replace(
      `'babel-jest'`,
      `['babel-jest', { presets: ['@nrwl/next/babel'] }]`
    );

  if (content) {
    host.write(configPath, content);
  }
}

export default updateJestConfig;
