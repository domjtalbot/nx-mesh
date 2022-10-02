import type { MeshSources } from '../types';

export const handler = 'openapi';
export const name = 'JavaScript Wiki';
export const url =
  'https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml';

export const source: MeshSources = {
  js: `
  {
    name: '${name}',
    handler: {
      ${handler}: {
        source:
          '${url}',
      },
    },
  }
  `,
  json: `
  {
    "name": "${name}",
    "handler": {
      "${handler}": {
        "source": "${url}"
      }
    }
  }
  `,
  yml: `
  - name: ${name}
    handler:
      ${handler}:
        source: ${url}
  `,
};

export default source;
