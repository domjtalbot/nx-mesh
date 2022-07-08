const utils = [
  '@graphql-mesh/cli',
  '@graphql-mesh/cross-helpers',
  '@graphql-mesh/merger-bare',
  '@graphql-mesh/runtime',
  '@graphql-mesh/store',
  '@graphql-mesh/types',
  '@graphql-mesh/utils',
];

const sources = [
  '@graphql-mesh/graphql',
  '@graphql-mesh/grpc',
  '@graphql-mesh/json-schema',
  '@graphql-mesh/mongoose',
  '@graphql-mesh/mysql',
  '@graphql-mesh/neo4j',
  '@graphql-mesh/new-openapi',
  '@graphql-mesh/odata',
  '@graphql-mesh/openapi',
  '@graphql-mesh/postgraphile',
  '@graphql-mesh/soap',
  '@graphql-mesh/thrift',
  '@graphql-mesh/tuql',
];

const transforms = [
  '@graphql-mesh/transform-cache',
  '@graphql-mesh/transform-encapsulate',
  '@graphql-mesh/transform-federation',
  '@graphql-mesh/transform-filter-schema',
  '@graphql-mesh/transform-hoist-field',
  '@graphql-mesh/transform-mock',
  '@graphql-mesh/transform-naming-convention',
  '@graphql-mesh/transform-prefix',
  '@graphql-mesh/transform-prune',
  '@graphql-mesh/transform-rename',
  '@graphql-mesh/transform-replace-field',
  '@graphql-mesh/transform-resolvers-composition',
  '@graphql-mesh/transform-snapshot',
];

const cache = [
  '@graphql-mesh/cache-file',
  '@graphql-mesh/cache-localforage',
  '@graphql-mesh/cache-redis',
];

/**
 * A list of known GraphQL Mesh packages.
 * These packages can be automatically added to package.json files.
 */
export const meshPackages = [...cache, ...sources, ...transforms, ...utils];

export default meshPackages;
