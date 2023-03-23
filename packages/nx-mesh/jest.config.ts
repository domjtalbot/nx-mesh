/* eslint-disable */
import { readFileSync } from 'fs';

const swcrc = JSON.parse(readFileSync(`${__dirname}/.lib.swcrc`, 'utf-8'));

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const swcJestConfig = {
  ...swcrc,
  exclude: undefined,
  jsc: {
    ...swcrc.jsc,
    experimental: {
      plugins: [['jest_workaround', {}]],
    },
  },
};

export default {
  displayName: 'nx-mesh',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/nx-mesh',
};
