import type { MeshSources } from '../types';

export const handler = 'newOpenapi';
export const name = 'Weatherbit';
export const url = 'http://api.weatherbit.io/v2.0/';

export const source: MeshSources = {
  js: `
  {
    name: '${name}',
    handler: {
      ${handler}: {
        baseUrl: '${url}',
        oasFilePath: 'https://www.weatherbit.io/static/swagger.json',
      },
    },
  }
  `,
  json: `
  {
    "name": "${name}",
    "handler": {
      "${handler}": {
        "baseUrl": "${url}",
        "oasFilePath": "https://www.weatherbit.io/static/swagger.json"
      }
    }
  }
  `,
  yml: `
  - name: ${name}
    handler:
      ${handler}:
        baseUrl: ${url}
        oasFilePath: https://www.weatherbit.io/static/swagger.json
  `,
};

export default source;
