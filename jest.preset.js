const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  coverageReporters: [
    'clover',
    'cobertura',
    'html',
    'json',
    'lcov',
    'text',
    'text-summary',
  ],
};
