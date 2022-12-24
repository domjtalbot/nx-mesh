import type { ProjectGraphExternalNode } from '@nrwl/devkit';

export const getPackageVersions = (
  packages: string[],
  externalNodes?: Record<string, ProjectGraphExternalNode>
) => {
  if (externalNodes === undefined) {
    return {};
  }

  const deps: Record<string, string> = {};

  packages.forEach((name) => {
    const depNode = externalNodes[`npm:${name}`];

    if (depNode) {
      deps[name] = depNode.data.version;
    }
  });

  return deps;
};
