import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'libs/example/sdk/graphql/star-wars-api/.mesh/schema.graphql',
  documents:
    'libs/example/sdk/graphql/star-wars-api/src/graphql/**/*.*.graphql',
  generates: {
    'libs/example/sdk/graphql/star-wars-api/.codegen/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
