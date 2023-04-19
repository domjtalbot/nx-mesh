const utils = [
  '@graphql-mesh/cli',
  '@graphql-mesh/cross-helpers',
  '@graphql-mesh/merger-bare',
  '@graphql-mesh/runtime',
  '@graphql-mesh/store',
  '@graphql-mesh/types',
  '@graphql-mesh/utils',
] as const;

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
] as const;

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
] as const;

const cache = [
  '@graphql-mesh/cache-file',
  '@graphql-mesh/cache-localforage',
  '@graphql-mesh/cache-redis',
] as const;

const plugins = [
  '@graphql-mesh/plugin-mock',
  '@graphql-mesh/plugin-snapshot',
] as const;

const codegen = [
  '@graphql-codegen/cli',
  '@graphql-codegen/client-preset',
] as const;

/**
 * A list of known GraphQL Mesh packages.
 * These packages can be automatically added to package.json files.
 */
export const meshPackages = [
  ...cache,
  ...codegen,
  ...plugins,
  ...sources,
  ...transforms,
  ...utils,
];

export type CodegenPackages = (typeof codegen)[number];
export type MeshPackages = (typeof meshPackages)[number];

export default meshPackages;
