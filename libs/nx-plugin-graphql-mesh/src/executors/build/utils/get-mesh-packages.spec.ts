import { meshPackages } from '../../../utils/mesh-packages';

import { getMeshPackages } from './get-mesh-packages';

const createMockFile = (packages: string[]) => {
  let contents = '';

  packages.forEach((packageName) => {
    contents = `${contents} import abc from '${packageName}';`;
  });

  return contents;
};

const mockFile = createMockFile(meshPackages);

describe('getMeshPackages', () => {
  it.each([...meshPackages])(
    'should detect "%s" as a dependency',
    async (packageName) => {
      const deps = getMeshPackages(mockFile, meshPackages);

      expect(deps).toContain(packageName);
    }
  );
});
