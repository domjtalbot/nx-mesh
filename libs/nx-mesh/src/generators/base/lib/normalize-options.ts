import type { Tree } from '@nrwl/devkit';
import type { SetRequired } from 'type-fest';

import type { BaseOptions, MeshConfigExtensions } from '../schema';

import {
  getWorkspaceLayout,
  joinPathFragments,
  names,
  offsetFromRoot,
} from '@nrwl/devkit';
import { getRelativePathToRootTsConfig } from '../../../utils/typescript';
import { createMeshConfig } from './create-mesh-config';

export interface NormalizedOptions
  extends SetRequired<
    Omit<BaseOptions, 'meshConfig' | 'tags'>,
    | 'compiler'
    | 'directory'
    | 'e2eTestRunner'
    | 'projectType'
    | 'unitTestRunner'
  > {
  /**
   * The path to the project directory
   */
  projectDirectory: string;

  /**
   * The path to the project dist directory
   */
  projectDistDirectory: string;

  projectE2eDirectory?: string;

  projectMeshDirectory: string;

  /**
   * Is the project an app?
   */
  isApp: boolean;

  /**
   * Is the project a library?
   */
  isLibrary: boolean;

  /**
   * Is Cypress the selected E2E runner?
   */
  isCypress: boolean;

  /**
   * Is Jest the selected Unit test runner?
   */
  isJest: boolean;

  /**
   * The contents of the Mesh config
   */
  meshConfigContent: string;

  /**
   * The Mesh config file extension
   */
  meshConfigExt: MeshConfigExtensions;

  workspace: ReturnType<typeof getWorkspaceLayout>;

  projectParentDirectory?: string;

  projectName: string;

  e2eProjectName: string;

  tags: string[];

  isSwc: boolean;

  offsetFromRoot: string;

  rootTsConfigPath: string;

  _raw: BaseOptions;
}

export function normalizeOptions(
  tree: Tree,
  options: BaseOptions
): NormalizedOptions {
  const workspace = getWorkspaceLayout(tree);

  const directory = options.directory
    ? `${names(options.directory).fileName}/${names(options.name).fileName}`
    : names(options.name).fileName;
  const projectName = directory.replace(new RegExp('/', 'g'), '-');

  const e2eTestRunner = options.e2eTestRunner ?? 'cypress';
  const e2eProjectName = `${projectName}-e2e`;

  const projectType = options.projectType ?? 'app';
  const unitTestRunner = options.unitTestRunner ?? 'jest';

  const isApp = projectType === 'app';
  const isLibrary = projectType === 'lib';

  const meshConfigExt =
    (/^(cjs|js|json|yml)$/.test(options.meshConfig ?? 'yml')
      ? options.meshConfig
      : 'yml') ?? 'yml';

  const compiler =
    (/^(tsc|swc)$/.test(options.compiler ?? 'tsc')
      ? options.compiler
      : 'tsc') ?? 'tsc';

  const meshExampleProject = options.meshExampleProject ?? 'javascriptWiki';

  const meshConfigContent = createMeshConfig(meshConfigExt, meshExampleProject);

  const projectDirectory = joinPathFragments(
    isApp ? workspace.appsDir : workspace.libsDir,
    directory
  );

  const projectParentDirectory = options.directory
    ? names(options.directory).fileName
    : undefined;

  const projectDistDirectory = joinPathFragments('dist', projectDirectory);

  const projectMeshDirectory = joinPathFragments(projectDirectory, '.mesh');
  const projectE2eDirectory = joinPathFragments(
    isApp ? workspace.appsDir : workspace.libsDir,
    `${directory}-e2e`
  );

  const tags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];

  const rootTsConfigPath = getRelativePathToRootTsConfig(
    tree,
    projectDirectory
  );

  return {
    ...options,
    _raw: options,
    compiler,
    directory,
    e2eProjectName,
    e2eTestRunner,
    isApp,
    isCypress: e2eTestRunner === 'cypress',
    isJest: unitTestRunner === 'jest',
    isLibrary,
    isSwc: options.compiler === 'swc',
    meshConfigContent,
    meshConfigExt,
    meshExampleProject,
    offsetFromRoot: offsetFromRoot(projectDirectory),
    projectDirectory,
    projectDistDirectory,
    projectE2eDirectory,
    projectMeshDirectory,
    projectName,
    projectParentDirectory,
    projectType,
    rootTsConfigPath,
    tags,
    unitTestRunner,
    workspace,
  };
}
