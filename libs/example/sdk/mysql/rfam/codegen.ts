import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'libs/example/sdk/mysql/rfam/.mesh/schema.graphql',
  documents: 'libs/example/sdk/mysql/rfam/src/graphql/**/*.*.graphql',
  generates: {
    'libs/example/sdk/mysql/rfam/.codegen/': {
      preset: 'client',
      plugins: [],
      config: {
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
