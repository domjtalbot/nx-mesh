export default {
  '*': () => 'nx format:write',
  '{nx,workspace}.json': () => 'nx workspace-lint --fix',
  '**/*.{js,jsx,ts,tsx}': () => 'nx affected --target=lint --fix',
  '{apps,libs}/**/*.*': () => [
    'nx affected --target=build',
    'nx affected --target=validate',
    'nx affected --target=test',
    'nx affected --target=e2e',
    'nx affected --target=e2e --configuration=start',
    'nx affected --target=e2e --configuration=serve',
    'nx affected --target=e2e --configuration=serve-dev',
  ],
};
