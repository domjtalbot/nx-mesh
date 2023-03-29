/// <reference types="vitest" />

import { join } from 'node:path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/test',

  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),

    viteTsConfigPaths({
      root: '../../',
    }),

    viteStaticCopy({
      targets: [
        {
          src: '../../README.md',
          dest: '.',
        },
        {
          src: '../../LICENSE',
          dest: '.',
        },
        {
          src: '*.md',
          dest: '.',
        },
        {
          src: 'executors.json',
          dest: '.',
        },
        {
          src: 'generators.json',
          dest: '.',
        },
        {
          src: 'migrations.json',
          dest: '.',
        },
      ],
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: ['src/index.ts', 'src/'],
      name: 'nx-mesh',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        '@graphql-mesh/cli',
        '@nrwl/cypress',
        '@nrwl/devkit',
        '@nrwl/devkit/src/utils/async-iterable',
        '@nrwl/js',
        '@nrwl/js/src/executors/tsc/tsc.impl',
        '@nrwl/js/src/utils/assets',
        '@nrwl/js/src/utils/check-dependencies',
        '@nrwl/js/src/utils/compiler-helper-dependency',
        '@nrwl/js/src/utils/inline',
        '@nrwl/js/src/utils/package-json',
        '@nrwl/js/src/utils/schema',
        '@nrwl/js/src/utils/schema',
        '@nrwl/js/src/utils/swc/get-swcrc-path',
        '@nrwl/js/src/utils/swc/inline',
        '@nrwl/js/src/utils/typescript/print-diagnostics',
        '@nrwl/js/src/utils/typescript/run-type-check',
        '@nrwl/linter',
        '@nrwl/node',
        '@nrwl/workspace',
        '@nrwl/workspace/src/utilities/assets',
        '@nrwl/workspace/src/utilities/fileutils',
        '@swc-node/register',
        '@swc/core',
        '@swc/helpers',
        'graphql',
        'node:child_process',
        'node:fs/promises',
        'node:path',
        'nx',
      ],
    },
  },
});
