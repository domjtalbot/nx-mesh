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
    '@graphql-typed-document-node/core': '^3.2.0',
  },
  '@graphql-codegen/cli': {
    '@graphql-codegen/cli': '^3.2.2',
  },
  '@graphql-codegen/client-preset': {
    '@graphql-codegen/client-preset': '^2.1.1',
  },
  '@graphql-mesh/cli': {
    '@graphql-mesh/cli': '^0.82.34',
  },
  '@graphql-mesh/graphql': {
    '@graphql-mesh/graphql': '^1.0.0',
  },
  '@graphql-mesh/json-schema': {
    '@graphql-mesh/json-schema': '^1.0.0',
  },
  '@graphql-mesh/mysql': {
    '@graphql-mesh/mysql': '^1.0.0',
  },
  '@graphql-mesh/neo4j': {
    '@graphql-mesh/neo4j': '^1.0.0',
  },
  '@graphql-mesh/new-openapi': { '@graphql-mesh/new-openapi': '^0.8.2' },
  '@graphql-mesh/odata': { '@graphql-mesh/odata': '^1.0.0' },
  '@graphql-mesh/openapi': { '@graphql-mesh/openapi': '^1.0.0' },
  '@graphql-mesh/plugin-mock': {
    '@graphql-mesh/plugin-mock': '^1.0.0',
  },
  '@graphql-mesh/plugin-snapshot': {
    '@graphql-mesh/plugin-snapshot': '^1.0.0',
  },
  '@graphql-mesh/runtime': { '@graphql-mesh/runtime': '^1.0.0' },
  '@graphql-mesh/soap': { '@graphql-mesh/soap': '^1.0.0' },
  // '@graphql-mesh/utils': { '@graphql-mesh/utils': '0.42.6' },
  graphql: { graphql: '^16.6.0' },
};
