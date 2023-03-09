export const getWildcardPackages = (dependencies: Record<string, string>) =>
  Object.keys(dependencies).filter((name) => dependencies[name] === '*');
