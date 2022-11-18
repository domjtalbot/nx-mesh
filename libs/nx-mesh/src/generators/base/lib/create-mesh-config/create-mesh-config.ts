import type { MeshConfigExtensions } from '../../schema';
import type { ExampleOptions } from './examples';

import { examples } from './examples';

export const createJsConfig = (source: ExampleOptions) => `
module.exports = {
  sources: [
    ${examples[source].source.js.trim()}
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

`;

export const createJsonConfig = (source: ExampleOptions) => `
{
  "sources": [
    ${examples[source].source.json.trim()}
  ],
  "serve": {
    "browser": false
  },
  "sdk":{
    "generateOperations": {
      "selectionSetDepth": 6
    }
  }
}
`;

export const createYamlConfig = (source: ExampleOptions) => `
sources:
  ${examples[source].source.yml.trim()}

serve:
  browser: false

sdk:
  generateOperations:
    selectionSetDepth: 6
`;

export const createMeshConfig = (
  config?: MeshConfigExtensions,
  project?: ExampleOptions
) => {
  switch (config) {
    case 'cjs':
    case 'js':
      return createJsConfig(project ?? 'javascriptWiki');

    case 'json':
      return createJsonConfig(project ?? 'javascriptWiki');

    case 'yml':
    default:
      return createYamlConfig(project ?? 'javascriptWiki');
  }
};

export default createMeshConfig;
