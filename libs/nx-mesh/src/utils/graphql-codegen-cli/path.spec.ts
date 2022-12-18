import { resolveCliPath } from './path';

describe('CodegenCli Path', () => {
  describe('resolveCliPath', () => {
    it('should use the global bin path by default', () => {
      const expected =
        '/User/Test/project/node_modules/@graphql-codegen/cli/cjs/bin.js';
      const result = resolveCliPath('/User/Test/project');
      expect(result).toBe(expected);
    });

    it.each([
      [
        '/User/Test/project',
        './node_modules/package/bin.js',
        '/User/Test/project/node_modules/package/bin.js',
      ],
      [
        '/User/Test/project',
        '/node_modules/package/bin.js',
        '/User/Test/project/node_modules/package/bin.js',
      ],
      [
        '/User/Test/project',
        'node_modules/package/bin.js',
        '/User/Test/project/node_modules/package/bin.js',
      ],
      [
        '~/project',
        'node_modules/package/bin.js',
        '~/project/node_modules/package/bin.js',
      ],
    ])(
      'should return a resolved path to the CLI bin',
      (root, binPath, expected) => {
        const result = resolveCliPath(root, binPath);
        expect(result).toBe(expected);
      }
    );
  });
});
