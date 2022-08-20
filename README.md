<br/>

![Nx Mesh. GraphQL Mesh for Nx](./.github/banner.png)

<p align="center">A <a href="http://graphql-mesh.com">GraphQL Mesh</a> plugin for <a href="http://nx.dev">Nx</a>.</p>

<div align="center">
  <p dir="auto">
    <a href="https://github.com/sponsors/domjtalbot">
      <img src="https://img.shields.io/badge/Sponsor @domjtalbot-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#EA4AAA" alt="Sponsor @domjtalbot on GitHub!" />
    </a>
  </p>
</div>

<br/>

## 📚 How to use

### Install

```
TBC
```

### Peer Dependencies

| Name                    | Version    | Required | Auto-installed |
| ----------------------- | ---------- | :------: | :------------: |
| **`nx`**                | `>=14`     |    ✅    |       -        |
| **`@graphql-mesh/cli`** | `>=0.71.0` |    ✅    |       ✅       |

<br/>

## 🤖 Generators

### `application`

Create a GraphQL Mesh API Gateway application for Nx.

```bash
nx generate nx-mesh:application my-api-gateway

# Alias
nx generate nx-mesh:app my-api-gateway
```

#### Example Output

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

#### Options

| Name                          | Alias | Type                       | Required | Default   | Description                                                                                                                       |
| ----------------------------- | ----- | -------------------------- | :------: | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **`name`**                    | -     | `string`                   |    ✅    | -         | What name would you like to use for the application?                                                                              |
| **`directory`**               | `d`   | `string`                   |    -     | -         | The directory of the new application.                                                                                             |
| **`meshConfig`**              | `mc`  | `cjs`, `js`, `json`, `yml` |    -     | `yml`     | Which config format would you like to use?                                                                                        |
| **`babelJest`**               | -     | `boolean`                  |    -     | `false`   | Use `babel` instead of `ts-jest`?                                                                                                 |
| **`e2eTestRunner`**           | -     | `cypress`, `none`          |    -     | `cypress` | Test runner to use for end to end (E2E) tests.                                                                                    |
| **`linter`**                  | -     | `eslint`, `tslint`         |    -     | `eslint`  | The tool to use for running lint checks                                                                                           |
| **`setParserOptionsProject`** | -     | `boolean`                  |    -     | `false`   | Whether or not to configure the ESLint `parserOptions.project` option. We do not do this by default for lint performance reasons. |
| **`skipFormat`**              | -     | `boolean`                  |    -     | `false`   | Skip formatting files.                                                                                                            |
| **`skipWorkspaceJson`**       | -     | `boolean`                  |    -     | `false`   | Skip updating `workspace.json` with default options based on values provided to this app (e.g. `babel`).                          |
| **`standaloneConfig`**        | -     | `boolean`                  |    -     | `false`   | Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`                |
| **`tags`**                    | `t`   | `string`                   |    -     | -         | Add tags to the application (used for linting).                                                                                   |
| **`unitTestRunner`**          | -     | `jest`, `none`             |    -     | `jest`    | Test runner to use for unit tests.                                                                                                |

<br/>

### `sdk`

Create a GraphQL Mesh SDK library for Nx.

```bash
nx generate nx-mesh:sdk my-mesh-sdk

# Alias
nx generate nx-mesh:sdk-library my-mesh-sdk
nx generate nx-mesh:library my-mesh-sdk
```

#### Example Output

##### TSC

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
UPDATE nx.json
```

##### SWC

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
CREATE libs/my-mesh-sdk/.lib.swcrc
CREATE libs/my-mesh-sdk/.meshrc.json
CREATE libs/my-mesh-sdk/src/lib/sdk.ts
```

#### Options

| Name                          | Alias | Type                       | Required | Default  | Description                                                                                                                                            |
| ----------------------------- | ----- | -------------------------- | :------: | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`name`**                    | -     | `string`                   |    ✅    | -        | What name would you like to use?                                                                                                                       |
| **`directory`**               | `d`   | `string`                   |    -     | -        | The directory of the new sdk.                                                                                                                          |
| **`meshConfig`**              | `mc`  | `cjs`, `js`, `json`, `yml` |    -     | `yml`    | Which config format would you like to use?                                                                                                             |
| **`babelJest`**               | -     | `boolean`                  |    -     | `false`  | Use `babel` instead of `ts-jest`.                                                                                                                      |
| **`compiler`**                | -     | `tsc`, `swc`               |    -     | `tsc`    | The compiler used by the build and test targets.                                                                                                       |
| **`importPath`**              | -     | `string`                   |    -     | -        | The library name used to import it, like `@myorg/my-awesome-lib`. Must be a valid npm name.                                                            |
| **`js`**                      | -     | `boolean`                  |    -     | `false`  | Generate JavaScript files rather than TypeScript files.                                                                                                |
| **`linter`**                  | -     | `eslint`, `tslint`         |    -     | `eslint` | The tool to use for running lint checks.?                                                                                                              |
| **`pascalCaseFiles`**         | `p`   | `boolean`                  |    -     | `false`  | Use pascal case file names.                                                                                                                            |
| **`rootDir`**                 | -     | `string`                   |    -     | -        | Sets the `rootDir` for TypeScript compilation. When not defined, it uses the project's root property, or `srcRootForCompilationRoot` if it is defined. |
| **`setParserOptionsProject`** | -     | `boolean`                  |    -     | `false`  | Whether or not to configure the ESLint `parserOptions.project` option. We do not do this by default for lint performance reasons.                      |
| **`simpleModuleName`**        | -     | `boolean`                  |    -     | `false`  | Keep the module name simple (when using `--directory`).                                                                                                |
| **`skipFormat`**              | -     | `boolean`                  |    -     | `false`  | Skip formatting files.                                                                                                                                 |
| **`skipTsConfig`**            | -     | `boolean`                  |    -     | `false`  | Do not update `tsconfig.base.json` for development experience.                                                                                         |
| **`standaloneConfig`**        | -     | `boolean`                  |    -     | `false`  | Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`                                     |
| **`strict`**                  | -     | `boolean`                  |    -     | `false`  | Whether to enable tsconfig strict mode or not.                                                                                                         |
| **`tags`**                    | `t`   | `string`                   |    -     | -        | Add tags to the application (used for linting).                                                                                                        |
| **`testEnvironment`**         | -     | `jsdom`, `none`            |    -     | `jsdom`  | The test environment to use if `unitTestRunner` is set to `jest`.                                                                                      |
| **`unitTestRunner`**          | -     | `jest`, `none`             |    -     | `jest`   | Test runner to use for unit tests.                                                                                                                     |

<br/>

## 🏗️ Executors

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

#### Options

| Name                                          | Type                                 | Required | Default            | Description                                                                                                                      |
| --------------------------------------------- | ------------------------------------ | :------: | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **`assets`**                                  | `string[]`                           |    -     | -                  | List of static assets.                                                                                                           |
| **`buildableProjectDepsInPackageJsonType`**   | `dependencies` or `peerDependencies` |    -     | `peerDependencies` | When `updateBuildableProjectDepsInPackageJson` is `true`, this adds dependencies to either `peerDependencies` or `dependencies`. |
| **`debug`**                                   | `boolean`                            |    -     | `false`            | Display debugging info by applying the `DEBUG` env variable.                                                                     |
| **`dir`**                                     | `string`                             |    ✅    | -                  | The path of the directory containing the GraphQL Mesh config.                                                                    |
| **`fileType`**                                | `json`, `ts` or `js`                 |    -     | `ts`               | The filetype.                                                                                                                    |
| **`main`**                                    | `string`                             |    ✅    | -                  | The name of the main entry-point file.                                                                                           |
| **`outputPath`**                              | `string`                             |    ✅    | -                  | The output path of the generated files.                                                                                          |
| **`require`**                                 | `string[]`                           |    -     | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| **`transformers`**                            | `string[]`                           |    -     | -                  | List of TypeScript Transformer Plugins.                                                                                          |
| **`tsConfig`**                                | `string`                             |    ✅    | -                  | The path to the Typescript configuration file.                                                                                   |
| **`updateBuildableProjectDepsInPackageJson`** | `boolean`                            |    -     | `true`             | Whether to update the buildable project dependencies in `package.json`.                                                          |

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

#### Options

| Name           | Type                 | Required | Default | Description                                                                                 |
| -------------- | -------------------- | :------: | ------- | ------------------------------------------------------------------------------------------- |
| **`debug`**    | `boolean`            |    -     | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**      | `string`             |    ✅    | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`fileType`** | `json`, `ts` or `js` |    -     | `ts`    | The filetype.                                                                               |
| **`require`**  | `string[]`           |    -     | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

<br/>

### `build-swc`

Builds artifacts for a GraphQL Mesh library.

This is the equivalent of using `graphql-mesh build`, but with extra steps for packaging the library with SWC.

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

#### Options

| Name                                          | Type                                 | Required | Default            | Description                                                                                                                      |
| --------------------------------------------- | ------------------------------------ | :------: | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **`assets`**                                  | `string[]`                           |    -     | -                  | List of static assets.                                                                                                           |
| **`buildableProjectDepsInPackageJsonType`**   | `dependencies` or `peerDependencies` |    -     | `peerDependencies` | When `updateBuildableProjectDepsInPackageJson` is `true`, this adds dependencies to either `peerDependencies` or `dependencies`. |
| **`debug`**                                   | `boolean`                            |    -     | `false`            | Display debugging info by applying the `DEBUG` env variable.                                                                     |
| **`dir`**                                     | `string`                             |    ✅    | -                  | The path of the directory containing the GraphQL Mesh config.                                                                    |
| **`fileType`**                                | `json`, `ts` or `js`                 |    -     | `ts`               | The filetype.                                                                                                                    |
| **`main`**                                    | `string`                             |    ✅    | -                  | The name of the main entry-point file.                                                                                           |
| **`outputPath`**                              | `string`                             |    ✅    | -                  | The output path of the generated files.                                                                                          |
| **`require`**                                 | `string[]`                           |    -     | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| **`skipTypeCheck`**                           | `boolean`                            |    -     | `false`            | Whether to skip TypeScript type checking.                                                                                        |
| **`swcrc`**                                   | `string`                             |    -     | `.lib.swcrc`       | The path to the SWC configuration file.                                                                                          |
| **`transformers`**                            | `string[]`                           |    -     | -                  | List of TypeScript Transformer Plugins.                                                                                          |
| **`tsConfig`**                                | `string`                             |    ✅    | -                  | The path to the Typescript configuration file.                                                                                   |
| **`updateBuildableProjectDepsInPackageJson`** | `boolean`                            |    -     | `true`             | Whether to update the buildable project dependencies in `package.json`.                                                          |

<br/>

### `dev`

Serves a GraphQL server with GraphQL interface by building artifacts on the fly.

This is the equifilent of using `graphql-mesh dev`.

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

#### Options

| Name                  | Type           | Required | Default   | Description                                                                                        |
| --------------------- | -------------- | :------: | --------- | -------------------------------------------------------------------------------------------------- |
| **`debug`**           | `boolean`      |    -     | `false`   | Display debugging info by applying the `DEBUG` env variable.                                       |
| **`dir`**             | `string`       |    ✅    | -         | The path of the directory containing the GraphQL Mesh config.                                      |
| **`port`**            | `object`       |    -     | -         | Port selection settings                                                                            |
| **`port.auto`**       | `boolean`      |    -     | `true`    | Use the first available port                                                                       |
| **`port.number`**     | `number`       |    -     | `4200`    | Define the preferred port to use when `auto` is set to `false`                                     |
| **`port.range`**      | `object`       |    -     | -         | The range of ports to select from.                                                                 |
| **`port.range.from`** | `number`       |    -     | -         | The first port of the range. Must be in the range `1024`...`65535`                                 |
| **`port.range.to`**   | `number`       |    -     | -         | The last port of the range. Must be in the range `1024`...`65535` and must be greater than `from`. |
| **`port.fallback`**   | `auto`, `none` |    -     | `auto`    | The fallback strategy to use when the preferred port is unavailable.                               |
| **`port.host`**       | `string`       |    -     | `0.0.0.0` | The host to listern on (only used for port number lookup).                                         |
| **`require`**         | `string[]`     |    -     | `[]`      | Loads specific require.extensions before running the codegen and reading the configuration.        |

<br/>

### `start`

Serves a GraphQL server with GraphQL interface based on your generated artifacts.

This is the equifilent of using `graphql-mesh start`.

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

#### Options

| Name                  | Type           | Required | Default   | Description                                                                                        |
| --------------------- | -------------- | :------: | --------- | -------------------------------------------------------------------------------------------------- |
| **`debug`**           | `boolean`      |    -     | `false`   | Display debugging info by applying the `DEBUG` env variable.                                       |
| **`dir`**             | `string`       |    ✅    | -         | The path of the directory containing the GraphQL Mesh config.                                      |
| **`port`**            | `object`       |    -     | -         | Port selection settings                                                                            |
| **`port.auto`**       | `boolean`      |    -     | `true`    | Use the first available port                                                                       |
| **`port.number`**     | `number`       |    -     | `4200`    | Define the preferred port to use when `auto` is set to `false`                                     |
| **`port.range`**      | `object`       |    -     | -         | The range of ports to select from.                                                                 |
| **`port.range.from`** | `number`       |    -     | -         | The first port of the range. Must be in the range `1024`...`65535`                                 |
| **`port.range.to`**   | `number`       |    -     | -         | The last port of the range. Must be in the range `1024`...`65535` and must be greater than `from`. |
| **`port.fallback`**   | `auto`, `none` |    -     | `auto`    | The fallback strategy to use when the preferred port is unavailable.                               |
| **`port.host`**       | `string`       |    -     | `0.0.0.0` | The host to listern on (only used for port number lookup).                                         |
| **`require`**         | `string[]`     |    -     | `[]`      | Loads specific require.extensions before running the codegen and reading the configuration.        |

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

#### Options

| Name                  | Type           | Required | Default   | Description                                                                                        |
| --------------------- | -------------- | :------: | --------- | -------------------------------------------------------------------------------------------------- |
| **`debug`**           | `boolean`      |    -     | `false`   | Display debugging info by applying the `DEBUG` env variable.                                       |
| **`dev`**             | `string`       |    -     | `false`   | Run the server in dev or production mode.                                                          |
| **`dir`**             | `string`       |    ✅    | -         | The path of the directory containing the GraphQL Mesh config.                                      |
| **`port`**            | `object`       |    -     | -         | Port selection settings                                                                            |
| **`port.auto`**       | `boolean`      |    -     | `true`    | Use the first available port                                                                       |
| **`port.number`**     | `number`       |    -     | `4200`    | Define the preferred port to use when `auto` is set to `false`                                     |
| **`port.range`**      | `object`       |    -     | -         | The range of ports to select from.                                                                 |
| **`port.range.from`** | `number`       |    -     | -         | The first port of the range. Must be in the range `1024`...`65535`                                 |
| **`port.range.to`**   | `number`       |    -     | -         | The last port of the range. Must be in the range `1024`...`65535` and must be greater than `from`. |
| **`port.fallback`**   | `auto`, `none` |    -     | `auto`    | The fallback strategy to use when the preferred port is unavailable.                               |
| **`port.host`**       | `string`       |    -     | `0.0.0.0` | The host to listern on (only used for port number lookup).                                         |
| **`require`**         | `string[]`     |    -     | `[]`      | Loads specific require.extensions before running the codegen and reading the configuration.        |

<br/>

### `validate`

Validates artifacts.

This is the equifilent of using `graphql-mesh validate`.

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

#### Options

| Name          | Type       | Required | Default | Description                                                                                 |
| ------------- | ---------- | :------: | ------- | ------------------------------------------------------------------------------------------- |
| **`debug`**   | `boolean`  |    -     | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**     | `string`   |    ✅    | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`require`** | `string[]` |    -     | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

<br/>

## 🎁 Examples

### API Gateway

| Name                                               | Source Handler | Config |
| -------------------------------------------------- | -------------- | ------ |
| **`apps/api-gateway/javascript-wiki/cjs-config`**  | `openapi`      | `cjs`  |
| **`apps/api-gateway/javascript-wiki/js-config`**   | `openapi`      | `js`   |
| **`apps/api-gateway/javascript-wiki/json-config`** | `openapi`      | `json` |
| **`apps/api-gateway/javascript-wiki/yml-config`**  | `openapi`      | `yml`  |
| **`apps/api-gateway/stackexchange`**               | `openapi`      | `yml`  |
| **`apps/api-gateway/trippin`**                     | `odata`        | `yml`  |
| **`apps/api-gateway/weatherbit`**                  | `new-openapi`  | `yml`  |

### SDK

| Name                            | Source Handler | Framework | Compiler | Deployed                                                    |
| ------------------------------- | -------------- | --------- | -------- | ----------------------------------------------------------- |
| **`apps/nextjs/stackexchange`** | `openapi`      | `nextjs`  | `tsc`    | -                                                           |
| **`apps/nextjs/trippin`**       | `odata`        | `nextjs`  | `tsc`    | [Vercel](https://nx-mesh-trippin-domjtalbot.vercel.app)     |
| **`apps/nextjs/trippin-swc`**   | `odata`        | `nextjs`  | `swc`    | [Vercel](https://nx-mesh-trippin-swc-domjtalbot.vercel.app) |
| **`apps/nextjs/weatherbit`**    | `new-openapi`  | `nextjs`  | `tsc`    | -                                                           |

<br/>
<br/>

<p align="center">🕸️ ♥ 🐋</p>

<br/>
