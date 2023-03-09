import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'examples/sdk-mysql--rfam/.mesh/schema.graphql',
  documents: 'examples/sdk-mysql--rfam/src/graphql/**/*.*.graphql',
  generates: {
    'examples/sdk-mysql--rfam/.codegen/': {
      preset: 'client',
      plugins: [],
      config: {
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
