import type { ProjectGraphExternalNode } from 'nx/src/config/project-graph';

import { meshPackages } from '../../../utils/mesh-packages';

import { getPackageVersions } from './get-package-versions';

const mockExternalNodes: Record<string, ProjectGraphExternalNode> =
  Object.fromEntries(
    [...meshPackages, 'graphql'].map((name) => [
      `npm:${name}`,
      {
        type: 'npm',
        name: `npm:${name}`,
        data: {
          version: '0.0.0',
          packageName: name,
        },
      },
    ])
  );

describe('getPackageVersions', () => {
  it.each([...meshPackages])('should get the version of "%s"', async (name) => {
    const expected = {
      [name]: '0.0.0',
    };

    const deps = getPackageVersions([name], mockExternalNodes);

    expect(deps).toMatchObject(expected);
  });

  it.each([...meshPackages])(
    'should skip %s if not listed in external nodes',
    (name) => {
      const expected = {};

      const deps = getPackageVersions([name], mockExternalNodes);

      expect(deps).toMatchObject(expected);
    }
  );

  it('should return skip lookup if there are no external nodes', () => {
    const expected = {};

    const deps = getPackageVersions(['graphql']);

    expect(deps).toMatchObject(expected);
  });
});
