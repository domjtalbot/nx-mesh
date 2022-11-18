import { MeshPackages } from './mesh-packages';

export type MeshPackageVersions = {
  [P in MeshPackages]?: Record<P, string>;
} & {
  graphql: {
    graphql: string;
  };
};

export const versions: MeshPackageVersions = {
  '@graphql-mesh/cli': {
    '@graphql-mesh/cli': '0.79.3',
  },
  '@graphql-mesh/new-openapi': { '@graphql-mesh/new-openapi': '0.8.2' },
  '@graphql-mesh/odata': { '@graphql-mesh/odata': '0.20.31' },
  '@graphql-mesh/openapi': { '@graphql-mesh/openapi': '0.33.34' },
  '@graphql-mesh/plugin-snapshot': {
    '@graphql-mesh/plugin-snapshot': '0.0.10',
  },
  '@graphql-mesh/runtime': { '@graphql-mesh/runtime': '0.44.31' },
  '@graphql-mesh/soap': { '@graphql-mesh/soap': '0.16.0' },
  '@graphql-mesh/utils': { '@graphql-mesh/utils': '0.42.6' },
  graphql: { graphql: '16.6.0' },
};
