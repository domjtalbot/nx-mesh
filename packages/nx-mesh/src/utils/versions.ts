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
    '@graphql-typed-document-node/core': '^3.1.1',
  },
  '@graphql-codegen/cli': {
    '@graphql-codegen/cli': '2.16.1',
  },
  '@graphql-codegen/client-preset': {
    '@graphql-codegen/client-preset': '1.2.3',
  },
  '@graphql-mesh/cli': {
    '@graphql-mesh/cli': '0.79.3',
  },
  '@graphql-mesh/graphql': {
    '@graphql-mesh/graphql': '0.31.31',
  },
  '@graphql-mesh/json-schema': {
    '@graphql-mesh/json-schema': '0.35.33',
  },
  '@graphql-mesh/mysql': {
    '@graphql-mesh/mysql': '0.17.30',
  },
  '@graphql-mesh/neo4j': {
    '@graphql-mesh/neo4j': '0.20.34',
  },
  '@graphql-mesh/new-openapi': { '@graphql-mesh/new-openapi': '0.8.2' },
  '@graphql-mesh/odata': { '@graphql-mesh/odata': '0.20.31' },
  '@graphql-mesh/openapi': { '@graphql-mesh/openapi': '0.33.34' },
  '@graphql-mesh/plugin-mock': {
    '@graphql-mesh/plugin-mock': '0.0.37',
  },
  '@graphql-mesh/plugin-snapshot': {
    '@graphql-mesh/plugin-snapshot': '0.0.10',
  },
  '@graphql-mesh/runtime': { '@graphql-mesh/runtime': '0.44.31' },
  '@graphql-mesh/soap': { '@graphql-mesh/soap': '0.16.0' },
  '@graphql-mesh/utils': { '@graphql-mesh/utils': '0.42.6' },
  graphql: { graphql: '16.6.0' },
};
