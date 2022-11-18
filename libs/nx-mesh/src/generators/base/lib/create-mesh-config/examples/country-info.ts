import type { MeshDependencies, MeshSources } from '../types';

export const handler = 'soap';
export const name = 'country-info';
export const url =
  'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

export const dependencies: MeshDependencies = ['@graphql-mesh/soap'];

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

export default {
  dependencies,
  handler,
  name,
  source,
  url,
};
