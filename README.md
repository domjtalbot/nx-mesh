<!-- omit in toc -->

# ![nx–mesh — GraphQL Mesh support for Nx.](https://github.com/domjtalbot/nx-mesh/raw/main/.github/banner-4.png 'nx–mesh — GraphQL Mesh support for Nx.')

<br/>

<div align="center">
  <p dir="auto">
    <a href="https://github.com/sponsors/domjtalbot">
      <img src="https://img.shields.io/badge/Sponsor @domjtalbot-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#EA4AAA" alt="Sponsor @domjtalbot on GitHub!" />
    </a>
    <a href="https://www.npmjs.org/package/nx-mesh">
      <img src="https://img.shields.io/npm/v/nx-mesh?style=flat" alt="Nx Mesh package on NPM" />
    </a>
    <a href="https://www.npmjs.org/package/nx-mesh">
      <img src="https://img.shields.io/npm/dm/nx-mesh" alt="Nx Mesh package downloads on NPM" aria-hidden="true" />
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=domjtalbot_nx-mesh">
      <img src="https://sonarcloud.io/api/project_badges/measure?project=domjtalbot_nx-mesh&metric=alert_status" alt="SonarCloud Quality Gate Status" aria-hidden="true" />
    </a>
  </p>
</div>

## Contents

- [Features](#features)
- [Installing](#installing)
  - [Peer Dependencies](#peer-dependencies)
- [Preset](#preset)
- [Generators](#generators)
  - [`application`](#application)
  - [`sdk`](#sdk)
- [Executors](#executors)
  - [`build`](#build)
  - [`build-gateway`](#build-gateway)
  - [`build-swc`](#build-swc)
  - [`dev`](#dev)
  - [`start`](#start)
  - [`serve`](#serve)
  - [`validate`](#validate)
- [Examples](#examples)
- [Compatibility](#compatibility)
- [Credits](#credits)

<br/>

## Features

- Use GraphQL Mesh to combine multiple APIs into a single GraphQL API.
- Create a new Nx workspace with a GraphQL Mesh preset.
- Generate a GraphQL Mesh API Gateway
  - A standalone application for running GraphQL Mesh.
  - Choose from multiple starter templates.
- Generate a GraphQL Mesh SDK
  - Supports deploying to Vercel as a NextJS route.
  - Choose from multiple starter templates.
- Supports all GraphQL CLI commands (`build`, `dev`, `start`, `validate`)
- Use [SWC](https://swc.rs/) to compile a GraphQL Mesh SDK
- Use [`graphql-codegen`](https://the-guild.dev/graphql/codegen) to build custom SDKs from GraphQL Mesh.
- Automatically use the first available port when running `dev`, `start`, or `serve`.
- Supports NX Cypress plugin

<br/>

## Installing

Using [pnpm](http://pnpm.io):

```bash
pnpm add -D nx-mesh
```

<details>
  <summary>Using npm</summary>

```bash
npm install -D nx-mesh
```

</details>

<details>
  <summary>Using yarn</summary>

```bash
yarn add -D nx-mesh
```

</details>

### Peer Dependencies

| Name                  | Version    | Required | Auto-installed by generators |
| --------------------- | ---------- | :------: | :--------------------------: |
| `nx`                  | `>=15.7.1` |    ✅    |              -               |
| `@graphql-mesh/cli`   | `>=0.71.0` |    ✅    |              ✅              |
| `@graphql-codgen/cli` | `>=2.16.1` |    ✅    |              ✅              |

<br/>

## Preset

Create a new Nx workspace with a GraphQL Mesh SDK!

```bash
npx create-nx-workspace@latest myorg --preset=nx-mesh
```

See the [`sdk` generator](#sdk) for available options.

<br/>

## Generators

### `application`

Create a GraphQL Mesh API Gateway application for Nx.

```bash
nx generate nx-mesh:application my-api-gateway

# Alias
nx generate nx-mesh:app my-api-gateway
```

<details>
  <summary>application generator output</summary>

```bash
>  NX  Generating nx-mesh:application

CREATE apps/my-api-gateway/.meshrc.yml
CREATE apps/my-api-gateway/tsconfig.app.json
CREATE apps/my-api-gateway/tsconfig.json
CREATE apps/my-api-gateway/project.json
UPDATE workspace.json
CREATE apps/my-api-gateway-e2e/cypress.json
CREATE apps/my-api-gateway-e2e/src/fixtures/example.json
CREATE apps/my-api-gateway-e2e/src/integration/app.spec.ts
CREATE apps/my-api-gateway-e2e/src/support/app.po.ts
CREATE apps/my-api-gateway-e2e/src/support/commands.ts
CREATE apps/my-api-gateway-e2e/src/support/index.ts
CREATE apps/my-api-gateway-e2e/tsconfig.json
CREATE apps/my-api-gateway-e2e/project.json
CREATE apps/my-api-gateway-e2e/.eslintrc.json
CREATE apps/my-api-gateway/jest.config.ts
CREATE apps/my-api-gateway/tsconfig.spec.json
CREATE apps/my-api-gateway/.eslintrc.json
```

</details>

<details>
  <summary>application generator options</summary>

| Name                      | Alias | Type                                                                                                     | Required | Default     | Description                                                                                                                       |
| ------------------------- | ----- | -------------------------------------------------------------------------------------------------------- | :------: | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `name`                    | -     | `string`                                                                                                 |    ✅    | -           | What name would you like to use for the application?                                                                              |
| `directory`               | `d`   | `string`                                                                                                 |    -     | -           | The directory of the new application.                                                                                             |
| `meshConfig`              | `mc`  | `cjs`, `js`, `json`, `yml`                                                                               |    -     | `yml`       | Which config format would you like to use?                                                                                        |
| `example`                 | -     | `country-info`, `fake-api`, `javascript-wiki`, `movies`, `rfam`, `stackexchange`, `star-wars`, `trippin` |    -     | `star-wars` | Which example project would you like to use?                                                                                      |
| `babelJest`               | -     | `boolean`                                                                                                |    -     | `false`     | Use `babel` instead of `ts-jest`?                                                                                                 |
| `e2eTestRunner`           | -     | `cypress`, `none`                                                                                        |    -     | `cypress`   | Test runner to use for end to end (E2E) tests.                                                                                    |
| `linter`                  | -     | `eslint`, `tslint`                                                                                       |    -     | `eslint`    | The tool to use for running lint checks                                                                                           |
| `setParserOptionsProject` | -     | `boolean`                                                                                                |    -     | `false`     | Whether or not to configure the ESLint `parserOptions.project` option. We do not do this by default for lint performance reasons. |
| `skipFormat`              | -     | `boolean`                                                                                                |    -     | `false`     | Skip formatting files.                                                                                                            |
| `standaloneConfig`        | -     | `boolean`                                                                                                |    -     | `false`     | Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`                |
| `tags`                    | `t`   | `string`                                                                                                 |    -     | -           | Add tags to the application (used for linting).                                                                                   |
| `unitTestRunner`          | -     | `jest`, `none`                                                                                           |    -     | `jest`      | Test runner to use for unit tests.                                                                                                |

</details>

<br/>

### `sdk`

Create a GraphQL Mesh SDK library for Nx.

```bash
nx generate nx-mesh:sdk my-mesh-sdk

# Alias
nx generate nx-mesh:sdk-library my-mesh-sdk
nx generate nx-mesh:library my-mesh-sdk
```

<details>
  <summary>Example sdk tsc generator output</summary>

```bash
>  NX  Generating nx-mesh:sdk

CREATE libs/my-mesh-sdk/README.md
CREATE libs/my-mesh-sdk/.babelrc
CREATE libs/my-mesh-sdk/package.json
CREATE libs/my-mesh-sdk/src/index.ts
CREATE libs/my-mesh-sdk/tsconfig.json
CREATE libs/my-mesh-sdk/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/my-mesh-sdk/project.json
UPDATE workspace.json
CREATE libs/my-mesh-sdk/.eslintrc.json
CREATE libs/my-mesh-sdk/jest.config.ts
CREATE libs/my-mesh-sdk/tsconfig.spec.json
CREATE libs/my-mesh-sdk/.meshrc.yml
CREATE libs/my-mesh-sdk/src/lib/sdk.ts
CREATE libs/my-mesh-sdk/codegen.ts
CREATE libs/my-mesh-sdk/src/lib/client.ts
UPDATE nx.json
```

</details>

<details>
  <summary>Example sdk swc generator output</summary>

```bash
>  NX  Generating nx-mesh:sdk

CREATE libs/my-mesh-sdk/README.md
CREATE libs/my-mesh-sdk/package.json
CREATE libs/my-mesh-sdk/src/index.ts
CREATE libs/my-mesh-sdk/tsconfig.json
CREATE libs/my-mesh-sdk/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/my-mesh-sdk/project.json
UPDATE workspace.json
CREATE libs/my-mesh-sdk/.eslintrc.json
CREATE libs/my-mesh-sdk/jest.config.ts
CREATE libs/my-mesh-sdk/tsconfig.spec.json
CREATE libs/my-mesh-sdk/.swcrc
CREATE libs/my-mesh-sdk/.meshrc.json
CREATE libs/my-mesh-sdk/src/lib/sdk.ts
CREATE libs/my-mesh-sdk/codegen.ts
CREATE libs/my-mesh-sdk/src/lib/client.ts
```

</details>

<details>
  <summary>sdk generator options</summary>

| Name                      | Alias | Type                                                        | Required | Default           | Description                                                                                                                                            |
| ------------------------- | ----- | ----------------------------------------------------------- | :------: | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                    | -     | `string`                                                    |    ✅    | -                 | What name would you like to use?                                                                                                                       |
| `directory`               | `d`   | `string`                                                    |    -     | -                 | The directory of the new sdk.                                                                                                                          |
| `meshConfig`              | `mc`  | `cjs`, `js`, `json`, `yml`                                  |    -     | `yml`             | Which config format would you like to use?                                                                                                             |
| `example`                 | -     | `javascriptWiki`, `stackexchange`, `trippin`, `countryInfo` |    -     | `javascript-wiki` | Which example project would you like to use?                                                                                                           |
| `codegen`                 | -     | `boolean`                                                   |    -     | `true`            | Use `graphql-codegen` to generate custom files from the GraphQL Mesh schema.                                                                           |
| `babelJest`               | -     | `boolean`                                                   |    -     | `false`           | Use `babel` instead of `ts-jest`.                                                                                                                      |
| `compiler`                | -     | `tsc`, `swc`                                                |    -     | `tsc`             | The compiler used by the build and test targets.                                                                                                       |
| `importPath`              | -     | `string`                                                    |    -     | -                 | The library name used to import it, like `@myorg/my-awesome-lib`. Must be a valid npm name.                                                            |
| `js`                      | -     | `boolean`                                                   |    -     | `false`           | Generate JavaScript files rather than TypeScript files.                                                                                                |
| `linter`                  | -     | `eslint`, `tslint`                                          |    -     | `eslint`          | The tool to use for running lint checks.?                                                                                                              |
| `pascalCaseFiles`         | `p`   | `boolean`                                                   |    -     | `false`           | Use pascal case file names.                                                                                                                            |
| `rootDir`                 | -     | `string`                                                    |    -     | -                 | Sets the `rootDir` for TypeScript compilation. When not defined, it uses the project's root property, or `srcRootForCompilationRoot` if it is defined. |
| `setParserOptionsProject` | -     | `boolean`                                                   |    -     | `false`           | Whether or not to configure the ESLint `parserOptions.project` option. We do not do this by default for lint performance reasons.                      |
| `simpleModuleName`        | -     | `boolean`                                                   |    -     | `false`           | Keep the module name simple (when using `--directory`).                                                                                                |
| `skipFormat`              | -     | `boolean`                                                   |    -     | `false`           | Skip formatting files.                                                                                                                                 |
| `skipTsConfig`            | -     | `boolean`                                                   |    -     | `false`           | Do not update `tsconfig.base.json` for development experience.                                                                                         |
| `standaloneConfig`        | -     | `boolean`                                                   |    -     | `false`           | Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`                                     |
| `strict`                  | -     | `boolean`                                                   |    -     | `false`           | Whether to enable tsconfig strict mode or not.                                                                                                         |
| `tags`                    | `t`   | `string`                                                    |    -     | -                 | Add tags to the application (used for linting).                                                                                                        |
| `testEnvironment`         | -     | `jsdom`, `none`                                             |    -     | `jsdom`           | The test environment to use if `unitTestRunner` is set to `jest`.                                                                                      |
| `unitTestRunner`          | -     | `jest`, `none`                                              |    -     | `jest`            | Test runner to use for unit tests.                                                                                                                     |

</details>

<br/>

## Executors

### `build`

Builds artifacts for a GraphQL Mesh library.

This is the equivalent of using `graphql-mesh dev`, but with extra steps for packaging the library.

```json
"targets": {
  "build": {
    "executor": "nx-mesh:build",
    "options": {
      "dir": "libs/example-lib",
      "outputPath": "dist/libs/example-lib",
      "tsConfig": "libs/example-lib/tsconfig.lib.json",
      "main": "libs/example-lib/src/index.ts"
    },
  },
}
```

<details>
  <summary>build executor options</summary>

| Name                                      | Type                                 | Required | Default            | Description                                                                                                                      |
| ----------------------------------------- | ------------------------------------ | :------: | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `assets`                                  | `string[]`                           |    -     | -                  | List of static assets.                                                                                                           |
| `buildableProjectDepsInPackageJsonType`   | `dependencies` or `peerDependencies` |    -     | `peerDependencies` | When `updateBuildableProjectDepsInPackageJson` is `true`, this adds dependencies to either `peerDependencies` or `dependencies`. |
| `codegen`                                 | `object`                             |    -     | -                  | GraphQL Codegen settings                                                                                                         |
| `codegen.config`                          | `string`                             |    ✅    | -                  | Path to GraphQL codegen YAML config file, defaults to `codegen.yml` on the current directory.                                    |
| `codegen.overwrite`                       | `boolean`                            |    -     | `true`             | Overwrites existing files.                                                                                                       |
| `codegen.profile`                         | `boolean`                            |    -     | `false`            | Use profiler to measure performance.                                                                                             |
| `codegen.project`                         | `string`                             |    -     | ``                 | Name of a project in GraphQL Config.                                                                                             |
| `codegen.require`                         | `string[]`                           |    -     | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| `codegen.silent`                          | `boolean`                            |    -     | `false`            | Suppresses printing errors.                                                                                                      |
| `codegen.watch`                           | `boolean`                            |    -     | `false`            | Watch for changes and execute generation automatically.                                                                          |
| `debug`                                   | `boolean`                            |    -     | `false`            | Display debugging info by applying the `DEBUG` env variable.                                                                     |
| `dir`                                     | `string`                             |    ✅    | -                  | The path of the directory containing the GraphQL Mesh config.                                                                    |
| `fileType`                                | `json`, `ts` or `js`                 |    -     | `ts`               | The filetype.                                                                                                                    |
| `main`                                    | `string`                             |    ✅    | -                  | The name of the main entry-point file.                                                                                           |
| `outputPath`                              | `string`                             |    ✅    | -                  | The output path of the generated files.                                                                                          |
| `require`                                 | `string[]`                           |    -     | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| `transformers`                            | `string[]`                           |    -     | -                  | List of TypeScript Transformer Plugins.                                                                                          |
| `tsConfig`                                | `string`                             |    ✅    | -                  | The path to the Typescript configuration file.                                                                                   |
| `updateBuildableProjectDepsInPackageJson` | `boolean`                            |    -     | `true`             | Whether to update the buildable project dependencies in `package.json`.                                                          |
| `watch`                                   | `boolean`                            |    -     | `false`            | Rebuild upon file changes.                                                                                                       |

</details>

<br/>

### `build-gateway`

Builds artifacts for a GraphQL Mesh API Gateway app.

This is the equivalent of using `graphql-mesh build`, but with extra steps for compiling an app.

```json
"targets": {
  "build": {
    "executor": "nx-mesh:build-gateway",
    "options": {
      "dir": "apps/example-app",
      "outputPath": "dist/apps/example-app"
    },
  },
}
```

<details>
  <summary>build-gateway executor options</summary>

| Name       | Type                 | Required | Default | Description                                                                                 |
| ---------- | -------------------- | :------: | ------- | ------------------------------------------------------------------------------------------- |
| `debug`    | `boolean`            |    -     | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| `dir`      | `string`             |    ✅    | -       | The path of the directory containing the GraphQL Mesh config.                               |
| `fileType` | `json`, `ts` or `js` |    -     | `ts`    | The filetype.                                                                               |
| `require`  | `string[]`           |    -     | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

</details>

<br/>

### `build-swc`

Builds artifacts for a GraphQL Mesh library.

This is the equivalent of using `graphql-mesh build`, but with extra steps for packaging the library with [SWC](https://swc.rs/).

```json
"targets": {
  "build": {
    "executor": "nx-mesh:build-swc",
    "options": {
      "dir": "libs/example-lib",
      "outputPath": "dist/libs/example-lib",
      "tsConfig": "libs/example-lib/tsconfig.lib.json",
      "main": "libs/example-lib/src/index.ts"
    },
  },
}
```

<details>
  <summary>build-swc executor options</summary>

| Name                                      | Type                                 | Required | Default            | Description                                                                                                                      |
| ----------------------------------------- | ------------------------------------ | :------: | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `assets`                                  | `string[]`                           |    -     | -                  | List of static assets.                                                                                                           |
| `buildableProjectDepsInPackageJsonType`   | `dependencies` or `peerDependencies` |    -     | `peerDependencies` | When `updateBuildableProjectDepsInPackageJson` is `true`, this adds dependencies to either `peerDependencies` or `dependencies`. |
| `codegen`                                 | `object`                             |    -     | -                  | GraphQL Codegen settings                                                                                                         |
| `codegen.config`                          | `string`                             |    ✅    | -                  | Path to GraphQL codegen YAML config file, defaults to `codegen.yml` on the current directory.                                    |
| `codegen.overwrite`                       | `boolean`                            |    -     | `true`             | Overwrites existing files.                                                                                                       |
| `codegen.profile`                         | `boolean`                            |    -     | `false`            | Use profiler to measure performance.                                                                                             |
| `codegen.project`                         | `string`                             |    -     | ``                 | Name of a project in GraphQL Config.                                                                                             |
| `codegen.require`                         | `string[]`                           |    -     | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| `codegen.silent`                          | `boolean`                            |    -     | `false`            | Suppresses printing errors.                                                                                                      |
| `codegen.watch`                           | `boolean`                            |    -     | `false`            | Watch for changes and execute generation automatically.                                                                          |
| `debug`                                   | `boolean`                            |    -     | `false`            | Display debugging info by applying the `DEBUG` env variable.                                                                     |
| `dir`                                     | `string`                             |    ✅    | -                  | The path of the directory containing the GraphQL Mesh config.                                                                    |
| `fileType`                                | `json`, `ts` or `js`                 |    -     | `ts`               | The filetype.                                                                                                                    |
| `main`                                    | `string`                             |    ✅    | -                  | The name of the main entry-point file.                                                                                           |
| `outputPath`                              | `string`                             |    ✅    | -                  | The output path of the generated files.                                                                                          |
| `require`                                 | `string[]`                           |    -     | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| `skipTypeCheck`                           | `boolean`                            |    -     | `false`            | Whether to skip TypeScript type checking.                                                                                        |
| `swcrc`                                   | `string`                             |    -     | `.swcrc`           | The path to the SWC configuration file.                                                                                          |
| `transformers`                            | `string[]`                           |    -     | -                  | List of TypeScript Transformer Plugins.                                                                                          |
| `tsConfig`                                | `string`                             |    ✅    | -                  | The path to the Typescript configuration file.                                                                                   |
| `updateBuildableProjectDepsInPackageJson` | `boolean`                            |    -     | `true`             | Whether to update the buildable project dependencies in `package.json`.                                                          |
| `watch`                                   | `boolean`                            |    -     | `false`            | Rebuild upon file changes.                                                                                                       |

</details>

<br/>

### `dev`

Serves a GraphQL server with a GraphQL interface by building artifacts on the fly.

This is the equivalent of using `graphql-mesh dev`.

```json
"targets": {
  "dev": {
    "executor": "nx-mesh:dev",
    "options": {
      "dir": "path/to/app/or/lib",
    },
  },
}
```

<details>
  <summary>dev executor options</summary>

| Name              | Type           | Required | Default     | Description                                                                                        |
| ----------------- | -------------- | :------: | ----------- | -------------------------------------------------------------------------------------------------- |
| `debug`           | `boolean`      |    -     | `false`     | Display debugging info by applying the `DEBUG` env variable.                                       |
| `dir`             | `string`       |    ✅    | -           | The path of the directory containing the GraphQL Mesh config.                                      |
| `port`            | `object`       |    -     | -           | Port selection settings                                                                            |
| `port.auto`       | `boolean`      |    -     | `true`      | Use the first available port                                                                       |
| `port.number`     | `number`       |    -     | `4200`      | Define the preferred port to use when `auto` is set to `false`                                     |
| `port.range`      | `object`       |    -     | -           | The range of ports to select from.                                                                 |
| `port.range.from` | `number`       |    -     | -           | The first port of the range. Must be in the range `1024`...`65535`                                 |
| `port.range.to`   | `number`       |    -     | -           | The last port of the range. Must be in the range `1024`...`65535` and must be greater than `from`. |
| `port.fallback`   | `auto`, `none` |    -     | `auto`      | The fallback strategy to use when the preferred port is unavailable.                               |
| `port.host`       | `string`       |    -     | `localhost` | The host to listen on (only used for port number lookup).                                          |
| `require`         | `string[]`     |    -     | `[]`        | Loads specific require.extensions before running the codegen and reading the configuration.        |

</details>

<br/>

### `start`

Serves a GraphQL server with a GraphQL interface based on your generated artifacts.

This is the equivalent of using `graphql-mesh start`.

```json
"targets": {
  "start": {
    "executor": "nx-mesh:start",
    "options": {
      "dir": "path/to/app/or/lib",
    },
  },
}
```

<details>
  <summary>start executor options</summary>

| Name              | Type           | Required | Default     | Description                                                                                        |
| ----------------- | -------------- | :------: | ----------- | -------------------------------------------------------------------------------------------------- |
| `debug`           | `boolean`      |    -     | `false`     | Display debugging info by applying the `DEBUG` env variable.                                       |
| `dir`             | `string`       |    ✅    | -           | The path of the directory containing the GraphQL Mesh config.                                      |
| `port`            | `object`       |    -     | -           | Port selection settings                                                                            |
| `port.auto`       | `boolean`      |    -     | `true`      | Use the first available port                                                                       |
| `port.number`     | `number`       |    -     | `4200`      | Define the preferred port to use when `auto` is set to `false`                                     |
| `port.range`      | `object`       |    -     | -           | The range of ports to select from.                                                                 |
| `port.range.from` | `number`       |    -     | -           | The first port of the range. Must be in the range `1024`...`65535`                                 |
| `port.range.to`   | `number`       |    -     | -           | The last port of the range. Must be in the range `1024`...`65535` and must be greater than `from`. |
| `port.fallback`   | `auto`, `none` |    -     | `auto`      | The fallback strategy to use when the preferred port is unavailable.                               |
| `port.host`       | `string`       |    -     | `localhost` | The host to listen on (only used for port number lookup).                                          |
| `require`         | `string[]`     |    -     | `[]`        | Loads specific require.extensions before running the codegen and reading the configuration.        |

</details>

<br/>

### `serve`

Serves a GraphQL server.

This combines `dev` & `start` via a `dev` option toggle.

```json
"targets": {
  "serve": {
    "executor": "nx-mesh:serve",
    "options": {
      "dir": "path/to/app/or/lib",
      "dev": true,
    },
    "configuration": {
      "production": {
        "dev": false,
      }
    }
  },
}
```

<details>
  <summary>serve executor options</summary>

| Name              | Type           | Required | Default     | Description                                                                                        |
| ----------------- | -------------- | :------: | ----------- | -------------------------------------------------------------------------------------------------- |
| `debug`           | `boolean`      |    -     | `false`     | Display debugging info by applying the `DEBUG` env variable.                                       |
| `dev`             | `string`       |    -     | `false`     | Run the server in dev or production mode.                                                          |
| `dir`             | `string`       |    ✅    | -           | The path of the directory containing the GraphQL Mesh config.                                      |
| `port`            | `object`       |    -     | -           | Port selection settings                                                                            |
| `port.auto`       | `boolean`      |    -     | `true`      | Use the first available port                                                                       |
| `port.number`     | `number`       |    -     | `4200`      | Define the preferred port to use when `auto` is set to `false`                                     |
| `port.range`      | `object`       |    -     | -           | The range of ports to select from.                                                                 |
| `port.range.from` | `number`       |    -     | -           | The first port of the range. Must be in the range `1024`...`65535`                                 |
| `port.range.to`   | `number`       |    -     | -           | The last port of the range. Must be in the range `1024`...`65535` and must be greater than `from`. |
| `port.fallback`   | `auto`, `none` |    -     | `auto`      | The fallback strategy to use when the preferred port is unavailable.                               |
| `port.host`       | `string`       |    -     | `localhost` | The host to listen on (only used for port number lookup).                                          |
| `require`         | `string[]`     |    -     | `[]`        | Loads specific require.extensions before running the codegen and reading the configuration.        |

</details>

<br/>

### `validate`

Validates artifacts.

This is the equivalent of using `graphql-mesh validate`.

```json
"targets": {
  "validate": {
    "executor": "nx-mesh:validate",
    "options": {
      "dir": "path/to/app/or/lib",
    },
  },
}
```

<details>
  <summary>validate executor options</summary>

| Name      | Type       | Required | Default | Description                                                                                 |
| --------- | ---------- | :------: | ------- | ------------------------------------------------------------------------------------------- |
| `debug`   | `boolean`  |    -     | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| `dir`     | `string`   |    ✅    | -       | The path of the directory containing the GraphQL Mesh config.                               |
| `require` | `string[]` |    -     | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

</details>

<br/>

## Examples

| Name                                                                                                             | Type    | Source Handler | Config | Notes                                                                                              |
| ---------------------------------------------------------------------------------------------------------------- | ------- | -------------- | ------ | -------------------------------------------------------------------------------------------------- |
| [country-info](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-soap--country-info)                  | sdk     | `soap`         | `cjs`  | -                                                                                                  |
| [fake-api](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-json-schema--fake-api)                   | sdk     | `json-schema`  | `yml`  | -                                                                                                  |
| [javascript-wiki](https://github.com/domjtalbot/nx-mesh/tree/main/examples/api-gateway-openapi--javascript-wiki) | gateway | `openapi`      | `json` | -                                                                                                  |
| [javascript-wiki](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-openapi--javascript-wiki)         | sdk     | `openapi`      | `yml`  | -                                                                                                  |
| [movies](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-neo4j--movies)                             | sdk     | `neo4j`        | `yml`  | -                                                                                                  |
| [nextjs with sdks](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-nextjs)                          | -       | -              | -      | Deployed to [Vercel](https://nx-mesh-domjtalbot.vercel.app/)                                       |
| [rfam](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-mysql--rfam)                                 | sdk     | `mysql`        | `yml`  | -                                                                                                  |
| [stackexchange](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-openapi--stackexchange)             | sdk     | `openapi`      | `json` | -                                                                                                  |
| [star-wars](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-graphql--star-wars)                     | sdk     | `graphql`      | `yml`  | -                                                                                                  |
| [trippin](https://github.com/domjtalbot/nx-mesh/tree/main/examples/sdk-odata--trippin)                           | sdk     | `odata`        | `js`   | [API Key documentation](https://www.odata.org/odata-services/service-usages/request-key-tutorial/) |

<br/>

## Compatibility

| `nx-mesh` | Nx        |
| --------- | --------- |
| `^4.0.0`  | `^15.7.1` |
| `^3.0.0`  | `^15.4.0` |

<br/>

## Credits

This plugin wouldn't be possible without the projects from these great teams:

- [The Guild](https://www.the-guild.dev) - The team behind [GraphQL Mesh](https://github.com/Urigo/graphql-mesh).
- [Nrwl](https://github.com/nrwl) - The team behind [Nx](https://github.com/nrwl/nx).

Please show them your support! ❤️

<br/>
<br/>

<p align="center">🌳 🦌 🌳</p>

<br/>
