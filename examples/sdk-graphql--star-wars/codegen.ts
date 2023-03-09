import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'examples/sdk-graphql--star-wars/.mesh/schema.graphql',
  documents: 'examples/sdk-graphql--star-wars/src/graphql/**/*.*.graphql',
  generates: {
    'examples/sdk-graphql--star-wars/.codegen/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
