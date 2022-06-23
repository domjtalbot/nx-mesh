import { getWildcardPackages } from './get-wildcard-packages';

describe('getWildcardPackages', () => {
  it('should get the package names listed in dependencies where the version is *', async () => {
    const expected = ['abc', '@test/abc'];

    const deps = getWildcardPackages({
      abc: '*',
      '@test/abc': '*',
      '@test/not-this': '1.0.0',
    });

    expect(deps).toStrictEqual(expected);
  });
});
