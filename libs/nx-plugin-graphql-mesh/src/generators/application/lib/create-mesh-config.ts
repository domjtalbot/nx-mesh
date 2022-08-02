import type { MeshConfigExtensions } from '../schema';

export const defaultSourceName = 'JavaScript Wiki';
export const defaultSourceUrl =
  'https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml';

export const createJsConfig = () => `
module.exports = {
  sources: [
    {
      name: '${defaultSourceName}',
      handler: {
        openapi: {
          source:
            '${defaultSourceUrl}',
        },
      },
    },
  ],
  serve: {
    browser: false,
  },
};

`;

export const createJsonConfig = () => `
{
  "sources": [
    {
      "name": "${defaultSourceName}",
      "handler": {
        "openapi": {
          "source": "${defaultSourceUrl}"
        }
      }
    }
  ],
  "serve": {
    "browser": false
  }
}

`;

export const createYamlConfig = () => `
sources:
  - name: ${defaultSourceName}
    handler:
      openapi:
        source: ${defaultSourceUrl}

serve:
  browser: false

`;

export const createMeshConfig = (config: MeshConfigExtensions) => {
  switch (config) {
    case 'cjs':
    case 'js':
      return createJsConfig();

    case 'json':
      return createJsonConfig();

    case 'yml':
    default:
      return createYamlConfig();
  }
};

export default createMeshConfig;
