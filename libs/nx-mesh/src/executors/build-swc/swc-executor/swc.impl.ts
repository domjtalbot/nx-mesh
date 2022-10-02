/* eslint-disable @typescript-eslint/ban-ts-comment */

// Modifed version of Nx SWC executor
// https://github.com/nrwl/nx/blob/master/packages/js/src/executors/swc/swc.impl.ts
// @ts-nocheck

import { ExecutorContext, ProjectGraphProjectNode } from '@nrwl/devkit';
import {
  assetGlobsToFiles,
  FileInputOutput,
} from '@nrwl/workspace/src/utilities/assets';
import { DependentBuildableProjectNode } from '@nrwl/workspace/src/utilities/buildable-libs-utils';
import { join, relative, resolve } from 'path';

import { checkDependencies } from '@nrwl/js/src/utils/check-dependencies';
import {
  getHelperDependency,
  HelperDependency,
} from '@nrwl/js/src/utils/compiler-helper-dependency';
import { CopyAssetsHandler } from '@nrwl/js/src/utils/copy-assets-handler';
import {
  NormalizedSwcExecutorOptions,
  SwcExecutorOptions,
} from '@nrwl/js/src/utils/schema';
import { compileSwc, compileSwcWatch } from './compile-swc';
import { getSwcrcPath } from '@nrwl/js/src/utils/swc/get-swcrc-path';
import { updatePackageJson } from '@nrwl/js/src/utils/update-package-json';
import { watchForSingleFileChanges } from '@nrwl/js/src/utils/watch-for-single-file-changes';

export function normalizeOptions(
  options: SwcExecutorOptions,
  contextRoot: string,
  sourceRoot?: string,
  projectRoot?: string
): NormalizedSwcExecutorOptions {
  const outputPath = join(contextRoot, options.outputPath);

  if (options.skipTypeCheck == null) {
    options.skipTypeCheck = false;
  }

  if (options.watch == null) {
    options.watch = false;
  }

  const files: FileInputOutput[] = assetGlobsToFiles(
    options.assets,
    contextRoot,
    outputPath
  );

  const projectRootParts = projectRoot.split('/');
  // We pop the last part of the `projectRoot` to pass
  // the last part (projectDir) and the remainder (projectRootParts) to swc
  const projectDir = projectRootParts.pop();
  // default to current directory if projectRootParts is [].
  // Eg: when a project is at the root level, outside of layout dir
  const swcCwd = projectRootParts.join('/') || '.';
  const swcrcPath = getSwcrcPath(options, contextRoot, projectRoot);

  const swcCliOptions = {
    srcPath: projectDir,
    destPath: relative(join(contextRoot, swcCwd), outputPath),
    swcCwd,
    swcrcPath,
  };

  return {
    ...options,
    mainOutputPath: resolve(
      outputPath,
      options.main.replace(`${projectRoot}/`, '').replace('.ts', '.js')
    ),
    files,
    root: contextRoot,
    sourceRoot,
    projectRoot,
    outputPath,
    tsConfig: join(contextRoot, options.tsConfig),
    swcCliOptions,
  } as NormalizedSwcExecutorOptions;
}

function processAssetsAndPackageJsonOnce(
  assetHandler: CopyAssetsHandler,
  options: NormalizedSwcExecutorOptions,
  context: ExecutorContext,
  target: ProjectGraphProjectNode<any>,
  dependencies: DependentBuildableProjectNode[]
) {
  return async () => {
    await assetHandler.processAllAssetsOnce();
    updatePackageJson(
      options,
      context,
      target,
      dependencies,
      !options.skipTypeCheck
    );
  };
}

export async function* swcExecutor(
  _options: SwcExecutorOptions,
  context: ExecutorContext
) {
  const { sourceRoot, root } = context.workspace.projects[context.projectName];
  const options = normalizeOptions(_options, context.root, sourceRoot, root);
  const { tmpTsConfig, projectRoot, target, dependencies } = checkDependencies(
    context,
    options.tsConfig
  );

  if (tmpTsConfig) {
    options.tsConfig = tmpTsConfig;
  }

  const swcHelperDependency = getHelperDependency(
    HelperDependency.swc,
    options.swcCliOptions.swcrcPath,
    dependencies,
    context.projectGraph
  );

  if (swcHelperDependency) {
    dependencies.push(swcHelperDependency);
  }

  const assetHandler = new CopyAssetsHandler({
    projectDir: projectRoot,
    rootDir: context.root,
    outputDir: options.outputPath,
    assets: options.assets,
  });

  if (options.watch) {
    const disposeWatchAssetChanges =
      await assetHandler.watchAndProcessOnAssetChange();
    const disposePackageJsonChanges = await watchForSingleFileChanges(
      join(context.root, projectRoot),
      'package.json',
      () =>
        updatePackageJson(
          options,
          context,
          target,
          dependencies,
          !options.skipTypeCheck
        )
    );
    const handleTermination = async () => {
      await disposeWatchAssetChanges();
      await disposePackageJsonChanges();
    };
    process.on('SIGINT', () => handleTermination());
    process.on('SIGTERM', () => handleTermination());

    return yield* compileSwcWatch(
      context,
      options,
      processAssetsAndPackageJsonOnce(
        assetHandler,
        options,
        context,
        target,
        dependencies
      )
    );
  } else {
    return yield compileSwc(
      context,
      options,
      processAssetsAndPackageJsonOnce(
        assetHandler,
        options,
        context,
        target,
        dependencies
      )
    );
  }
}

export default swcExecutor;
