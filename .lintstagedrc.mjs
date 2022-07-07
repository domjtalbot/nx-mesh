export default {
  '*': () => 'nx format:write',
  '{nx,workspace}.json': () => 'nx workspace-lint --fix',
  '**/*.{js,jsx,ts,tsx}': () => 'nx affected --target=lint --fix',
  '{apps,libs}/**/*.*': () => [
    'nx format:write',
    'nx affected --target=build',
    'nx affected --target=test',
    'nx affected --target=e2e',
    'nx run example-nextjs-stackexchange:build:production && nx run nx-plugin-graphql-mesh-e2e:e2e:build',
  ],
};
