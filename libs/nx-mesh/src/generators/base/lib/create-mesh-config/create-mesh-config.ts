import type { MeshConfigExtensions } from '../../schema';
import type { SourceOptions } from './sources';

import { sources } from './sources';

export const createJsConfig = (source: SourceOptions) => `
module.exports = {
  sources: [
    ${sources[source].js.trim()}
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

export const createJsonConfig = (source: SourceOptions) => `
{
  "sources": [
    ${sources[source].json.trim()}
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

export const createYamlConfig = (source: SourceOptions) => `
sources:
  ${sources[source].yml.trim()}

serve:
  browser: false

sdk:
  generateOperations:
    selectionSetDepth: 6
`;

export const createMeshConfig = (config?: MeshConfigExtensions) => {
  switch (config) {
    case 'cjs':
    case 'js':
      return createJsConfig('javascriptWiki');

    case 'json':
      return createJsonConfig('javascriptWiki');

    case 'yml':
    default:
      return createYamlConfig('javascriptWiki');
  }
};

export default createMeshConfig;
