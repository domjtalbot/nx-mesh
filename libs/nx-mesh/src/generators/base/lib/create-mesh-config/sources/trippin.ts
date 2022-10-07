import type { MeshSources } from '../types';

export const handler = 'odata';
export const name = 'TripPin';
export const url =
  'https://services.odata.org/TripPinRESTierService/(S({env.NX__TRIPPIN__API_KEY}))/';

export const source: MeshSources = {
  js: `
  {
    name: '${name}',
    handler: {
      ${handler}: {
        source: '${url}',
        batch: 'multipart',
        expandNavProps: true,
      },
    },
  }
  `,
  json: `
  {
    "name": "${name}",
    "handler": {
      "${handler}": {
        "source": "${url}",
        "batch": "multipart",
        "expandNavProps": true
      }
    }
  }
  `,
  yml: `
  - name: ${name}
    handler:
      ${handler}:
        source: ${url}
        batch: multipart
        expandNavProps: true
  `,
};

export default source;
