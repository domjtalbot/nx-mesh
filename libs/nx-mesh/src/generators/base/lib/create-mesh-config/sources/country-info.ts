import type { MeshSources } from '../types';

export const handler = 'soap';
export const name = 'country-info';
export const url =
  'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

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
