import type { MeshSources } from '../types';

export const handler = 'openapi';
export const name = 'StackExchange';
export const url =
  'https://raw.githubusercontent.com/grokify/api-specs/master/stackexchange/stackexchange-api-v2.2_openapi-v3.0.yaml';

export const source: MeshSources = {
  js: `
  {
    name: '${name}',
    handler: {
      ${handler}: {
        source: '${url}',
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
