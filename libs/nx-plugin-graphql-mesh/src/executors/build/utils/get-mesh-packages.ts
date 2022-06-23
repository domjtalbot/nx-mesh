export const getMeshPackages = (source: string, packages: string[]) => {
  const deps: string[] = [];

  packages.forEach((packageName) => {
    if (source.indexOf(packageName) > -1) {
      deps.push(packageName);
    }
  });

  return deps;
};
