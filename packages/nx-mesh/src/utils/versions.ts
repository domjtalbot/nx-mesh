import { MeshPackages } from './mesh-packages';

export type MeshPackageVersions = {
  [P in MeshPackages]?: Record<P, string>;
} & {
  '@graphql-typed-document-node/core': {
    '@graphql-typed-document-node/core': string;
  };
  graphql: {
    graphql: string;
  };
};

export const versions: MeshPackageVersions = {
  '@graphql-typed-document-node/core': {
    '@graphql-typed-document-node/core': '^3.1.2',
  },
  '@graphql-codegen/cli': {
    '@graphql-codegen/cli': '^2.16.1',
  },
  '@graphql-codegen/client-preset': {
    '@graphql-codegen/client-preset': '^2.1.1',
  },
  '@graphql-mesh/cli': {
    '@graphql-mesh/cli': '^3.2.2',
  },
  '@graphql-mesh/graphql': {
    '@graphql-mesh/graphql': '^0.34.10',
  },
  '@graphql-mesh/json-schema': {
    '@graphql-mesh/json-schema': '^0.37.21',
  },
  '@graphql-mesh/mysql': {
    '@graphql-mesh/mysql': '^0.19.17',
  },
  '@graphql-mesh/neo4j': {
    '@graphql-mesh/neo4j': '0.22.19',
  },
  '@graphql-mesh/new-openapi': { '@graphql-mesh/new-openapi': '0.8.2' },
  '@graphql-mesh/odata': { '@graphql-mesh/odata': '0.22.18' },
  '@graphql-mesh/openapi': { '@graphql-mesh/openapi': '0.35.23' },
  '@graphql-mesh/plugin-mock': {
    '@graphql-mesh/plugin-mock': '0.1.18',
  },
  '@graphql-mesh/plugin-snapshot': {
    '@graphql-mesh/plugin-snapshot': '0.1.20',
  },
  '@graphql-mesh/runtime': { '@graphql-mesh/runtime': '0.46.18' },
  '@graphql-mesh/soap': { '@graphql-mesh/soap': '0.17.20' },
  // '@graphql-mesh/utils': { '@graphql-mesh/utils': '0.42.6' },
  graphql: { graphql: '16.6.0' },
};
