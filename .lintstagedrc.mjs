export default {
  '*': () => ['nx-cloud record -- nx format:write'],
  '**/*.{js,jsx,ts,tsx}': () => ['nx affected --target=lint --fix'],
  // '{examples,packages}/**/*.*': () => [
  //   'nx affected --target=build --parallel=1',
  //   'nx affected --target=build --configuration=production --parallel=1',
  //   'nx affected --target=test --parallel=1',
  // ],
};
