import type { Tree } from '@nrwl/devkit';

import type { NormalizedOptions } from './normalize-options';

import { initGenerator, libraryGenerator } from '@nrwl/node';

export const nodeGenerator = async (tree: Tree, options: NormalizedOptions) => {
  if (options.isApp) {
    return initGenerator(tree, {
      js: options.js,
      skipFormat: options.skipFormat,
      unitTestRunner: options.unitTestRunner,
    });
  }

  return libraryGenerator(tree, {
    babelJest: options.babelJest,
    buildable: options.buildable,
    compiler: options.compiler,
    directory: options._raw.directory,
    importPath: options.importPath,
    js: options.js,
    linter: options.linter,
    name: options.name,
    pascalCaseFiles: options.pascalCaseFiles,
    publishable: options.publishable,
    rootDir: options.rootDir,
    setParserOptionsProject: options.setParserOptionsProject,
    simpleModuleName: options.simpleModuleName,
    skipFormat: options.skipFormat,
    skipTsConfig: options.skipTsConfig,
    strict: options.strict,
    tags: options._raw.tags,
    testEnvironment: options.testEnvironment,
    unitTestRunner: options.unitTestRunner,
  });
};

export default nodeGenerator;
