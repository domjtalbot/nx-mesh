export default {
  '*': () => 'nx format:write',
  '{nx,workspace}.json': () => 'nx workspace-lint --fix',
  '**/*.{js,jsx,ts,tsx}': () => 'nx affected --target=lint --fix',
  '{apps,libs}/**/*.*': () => [
    'nx affected --target=build --parallel=1',
    'nx affected --target=validate --parallel=1',
    'nx affected --target=test --parallel=1',
    'nx affected --target=e2e --parallel=1',
    'nx affected --target=e2e --configuration=start --parallel=1',
    'nx affected --target=e2e --configuration=serve --parallel=1',
    'nx affected --target=e2e --configuration=serve-dev --parallel=1',
  ],
};
