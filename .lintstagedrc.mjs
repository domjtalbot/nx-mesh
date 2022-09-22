export default {
  '*': () => ['nx-cloud record -- nx format:write'],
  '{nx,workspace}.json': () => ['nx-cloud record -- nx workspace-lint --fix'],
  '**/*.{js,jsx,ts,tsx}': () => ['nx affected --target=lint --fix'],
  '{apps,libs}/**/*.*': () => [
    'nx affected --target=build --parallel=2',
    'nx affected --target=build --configuration=production --parallel=2',
    'nx affected --target=test --parallel=2',
  ],
};
