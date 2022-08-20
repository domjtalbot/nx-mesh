import type { Tree } from '@nrwl/devkit';

import { getWorkspaceLayout, joinPathFragments, names } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';

import { AppGeneratorSchema } from '../schema';

export interface NormalizedSchema extends AppGeneratorSchema {
  appProjectDist: string;
  appProjectMesh: string;
  appProjectRoot: string;
  e2eProjectName: string;
  e2eProjectRoot: string;
  fileName: string;
  js?: boolean;
  parsedTags: string[];
  projectName: string;
}

export function normalizeOptions(
  host: Tree,
  options: AppGeneratorSchema
): NormalizedSchema {
  const appDirectory = options.directory
    ? `${names(options.directory).fileName}/${names(options.name).fileName}`
    : names(options.name).fileName;

  const { appsDir } = getWorkspaceLayout(host);

  const appProjectName = appDirectory.replace(new RegExp('/', 'g'), '-');
  const e2eProjectName = `${appProjectName}-e2e`;

  const appProjectRoot = joinPathFragments(appsDir, appDirectory);
  const appProjectDist = joinPathFragments('dist', appProjectRoot);
  const appProjectMesh = joinPathFragments(appProjectRoot, '.mesh');
  const e2eProjectRoot = joinPathFragments(appsDir, `${appDirectory}-e2e`);

  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  const fileName = 'index';

  const meshConfig = /^(cjs|js|json|yml)$/.test(options.meshConfig ?? 'yml')
    ? options.meshConfig
    : undefined;

  return {
    ...options,
    appProjectDist,
    appProjectMesh,
    appProjectRoot,
    e2eProjectName,
    e2eProjectRoot,
    e2eTestRunner: options.e2eTestRunner || 'cypress',
    fileName,
    js: false,
    linter: options.linter || Linter.EsLint,
    meshConfig,
    name: names(options.name).fileName,
    parsedTags,
    projectName: appProjectName,
    unitTestRunner: options.unitTestRunner || 'jest',
  };
}

export default normalizeOptions;
