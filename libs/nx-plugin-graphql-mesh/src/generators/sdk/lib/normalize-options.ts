import type { Tree } from '@nrwl/devkit';

import type { SdkGeneratorSchema } from '../schema';

import { getWorkspaceLayout, joinPathFragments, names } from '@nrwl/devkit';
import type { NormalizedSchema as NodeLibraryNormalizedSchema } from '@nrwl/node/src/generators/library/library';

export interface NormalizedSchema
  extends SdkGeneratorSchema,
    NodeLibraryNormalizedSchema {
  e2eProjectName: string;
  e2eProjectRoot: string;
  // fileName: string;
  libProjectDist: string;
  libProjectMesh: string;
  libProjectRoot: string;
  // parsedTags: string[];
  projectName: string;
}

export function normalizeOptions(
  host: Tree,
  options: SdkGeneratorSchema
): NormalizedSchema {
  const appDirectory = options.directory
    ? `${names(options.directory).fileName}/${names(options.name).fileName}`
    : names(options.name).fileName;

  const { libsDir, npmScope } = getWorkspaceLayout(host);

  const libProjectName = appDirectory.replace(new RegExp('/', 'g'), '-');
  const e2eProjectName = `${libProjectName}-e2e`;

  const libProjectRoot = joinPathFragments(libsDir, appDirectory);
  const libProjectDist = joinPathFragments('dist', libProjectRoot);
  const libProjectMesh = joinPathFragments(libProjectRoot, '.mesh');
  const e2eProjectRoot = joinPathFragments(libsDir, `${appDirectory}-e2e`);

  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  const fileName = 'index';

  const meshConfig = /^(cjs|js|json|yml)$/.test(options.meshConfig ?? 'yml')
    ? options.meshConfig
    : undefined;

  const compiler = /^(swc|tsc)$/.test(options.compiler ?? 'tsc')
    ? options.compiler
    : 'tsc';

  const importPath = options.importPath ?? `${npmScope}/${options.name}`;

  return {
    ...options,
    // e2eTestRunner: options.e2eTestRunner || 'cypress',
    buildable: true,
    compiler,
    e2eProjectName,
    e2eProjectRoot,
    fileName,
    importPath,
    libProjectDist,
    libProjectMesh,
    libProjectRoot,
    meshConfig,
    name: names(options.name).fileName,
    parsedTags,
    prefix: '',
    projectDirectory: libProjectDist,
    projectName: libProjectName,
    projectRoot: libProjectRoot,
    publishable: true,
  };
}

export default normalizeOptions;
