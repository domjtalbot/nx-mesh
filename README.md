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
| ----------------------- | ---------- | -------- | -------------- |
| **`nx`**                | `>=14`     | ✅       | -              |
| **`@graphql-mesh/cli`** | `>=0.71.0` | ✅       | ✅             |

<br/>

## 🤖 Generators

### `application`

Create a GraphQL Mesh API Gateway application for Nx.

```bash
nx generate @domjtalbot/nx-plugin-graphql-mesh:application my-api-gateway

# Shorthand
nx generate @domjtalbot/nx-plugin-graphql-mesh:app my-api-gateway
```

#### Example Output

```bash
>  NX  Generating @domjtalbot/nx-plugin-graphql-mesh:application

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
| ----------------------------- | ----- | -------------------------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **`name`**                    | -     | `string`                   | ✅       | -         | What name would you like to use for the application?                                                                              |
| **`directory`**               | `d`   | `string`                   | -        | -         | The directory of the new application.                                                                                             |
| **`meshConfig`**              | `mc`  | `cjs`, `js`, `json`, `yml` | -        | `yml`     | Which config format would you like to use?                                                                                        |
| **`linter`**                  | -     | `eslint`, `tslint`         | -        | `eslint`  | The tool to use for running lint checks                                                                                           |
| **`babelJest`**               | -     | `boolean`                  | -        | `false`   | Use `babel` instead of `ts-jest`?                                                                                                 |
| **`skipFormat`**              | -     | `boolean`                  | -        | `false`   | Skip formatting files.                                                                                                            |
| **`skipWorkspaceJson`**       | -     | `boolean`                  | -        | `false`   | Skip updating `workspace.json` with default options based on values provided to this app (e.g. `babel`).                          |
| **`unitTestRunner`**          | -     | `jest`, `none`             | -        | `jest`    | Test runner to use for unit tests.                                                                                                |
| **`e2eTestRunner`**           | -     | `cypress`, `none`          | -        | `cypress` | Test runner to use for end to end (E2E) tests.                                                                                    |
| **`tags`**                    | `t`   | `string`                   | -        | -         | Add tags to the application (used for linting).                                                                                   |
| **`setParserOptionsProject`** | -     | `boolean`                  | -        | `false`   | Whether or not to configure the ESLint `parserOptions.project` option. We do not do this by default for lint performance reasons. |
| **`standaloneConfig`**        | -     | `boolean`                  | -        | `false`   | Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`                |

<br/>

## 🏗️ Executors

### `build`

Builds artifacts for a GraphQL Mesh library.

This is the equivalent of using `graphql-mesh dev`, but with extra steps for packaging the library.

```json
"targets": {
  "build": {
    "executor": "@domjtalbot/nx-plugin-graphql-mesh:build",
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
| --------------------------------------------- | ------------------------------------ | -------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **`assets`**                                  | `string[]`                           | -        | -                  | List of static assets.                                                                                                           |
| **`buildableProjectDepsInPackageJsonType`**   | `dependencies` or `peerDependencies` | -        | `peerDependencies` | When `updateBuildableProjectDepsInPackageJson` is `true`, this adds dependencies to either `peerDependencies` or `dependencies`. |
| **`debug`**                                   | `boolean`                            | -        | `false`            | Display debugging info by applying the `DEBUG` env variable.                                                                     |
| **`dir`**                                     | `string`                             | ✅       | -                  | The path of the directory containing the GraphQL Mesh config.                                                                    |
| **`fileType`**                                | `json`, `ts` or `js`                 | -        | `ts`               | The filetype.                                                                                                                    |
| **`main`**                                    | `string`                             | ✅       | -                  | The name of the main entry-point file.                                                                                           |
| **`outputPath`**                              | `string`                             | ✅       | -                  | The output path of the generated files.                                                                                          |
| **`require`**                                 | `string[]`                           | -        | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| **`transformers`**                            | `string[]`                           | -        | -                  | List of TypeScript Transformer Plugins.                                                                                          |
| **`tsConfig`**                                | `string`                             | ✅       | -                  | The path to the Typescript configuration file.                                                                                   |
| **`updateBuildableProjectDepsInPackageJson`** | `boolean`                            | -        | `true`             | Whether to update the buildable project dependencies in `package.json`.                                                          |

<br/>

### `build-gateway`

Builds artifacts for a GraphQL Mesh API Gateway app.

This is the equivalent of using `graphql-mesh build`, but with extra steps for compiling an app.

```json
"targets": {
  "build": {
    "executor": "@domjtalbot/nx-plugin-graphql-mesh:build-gateway",
    "options": {
      "dir": "apps/example-app",
      "outputPath": "dist/apps/example-app"
    },
  },
}
```

#### Options

| Name           | Type                 | Required | Default | Description                                                                                 |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------------------------------------- |
| **`debug`**    | `boolean`            | -        | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**      | `string`             | ✅       | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`fileType`** | `json`, `ts` or `js` | -        | `ts`    | The filetype.                                                                               |
| **`require`**  | `string[]`           | -        | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

<br/>

### `build-swc`

Builds artifacts for a GraphQL Mesh library.

This is the equivalent of using `graphql-mesh build`, but with extra steps for packaging the library with SWC.

```json
"targets": {
  "build": {
    "executor": "@domjtalbot/nx-plugin-graphql-mesh:build-swc",
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
| --------------------------------------------- | ------------------------------------ | -------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **`assets`**                                  | `string[]`                           | -        | -                  | List of static assets.                                                                                                           |
| **`buildableProjectDepsInPackageJsonType`**   | `dependencies` or `peerDependencies` | -        | `peerDependencies` | When `updateBuildableProjectDepsInPackageJson` is `true`, this adds dependencies to either `peerDependencies` or `dependencies`. |
| **`debug`**                                   | `boolean`                            | -        | `false`            | Display debugging info by applying the `DEBUG` env variable.                                                                     |
| **`dir`**                                     | `string`                             | ✅       | -                  | The path of the directory containing the GraphQL Mesh config.                                                                    |
| **`fileType`**                                | `json`, `ts` or `js`                 | -        | `ts`               | The filetype.                                                                                                                    |
| **`main`**                                    | `string`                             | ✅       | -                  | The name of the main entry-point file.                                                                                           |
| **`outputPath`**                              | `string`                             | ✅       | -                  | The output path of the generated files.                                                                                          |
| **`require`**                                 | `string[]`                           | -        | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| **`skipTypeCheck`**                           | `boolean`                            | -        | `false`            | Whether to skip TypeScript type checking.                                                                                        |
| **`swcrc`**                                   | `string`                             | -        | `.lib.swcrc`       | The path to the SWC configuration file.                                                                                          |
| **`transformers`**                            | `string[]`                           | -        | -                  | List of TypeScript Transformer Plugins.                                                                                          |
| **`tsConfig`**                                | `string`                             | ✅       | -                  | The path to the Typescript configuration file.                                                                                   |
| **`updateBuildableProjectDepsInPackageJson`** | `boolean`                            | -        | `true`             | Whether to update the buildable project dependencies in `package.json`.                                                          |

<br/>

### `dev`

Serves a GraphQL server with GraphQL interface by building artifacts on the fly.

This is the equifilent of using `graphql-mesh dev`.

```json
"targets": {
  "dev": {
    "executor": "@domjtalbot/nx-plugin-graphql-mesh:dev",
    "options": {
      "dir": "path/to/app/or/lib",
    },
  },
}
```

#### Options

| Name          | Type       | Required | Default | Description                                                                                 |
| ------------- | ---------- | -------- | ------- | ------------------------------------------------------------------------------------------- |
| **`debug`**   | `boolean`  | -        | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**     | `string`   | ✅       | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`port`**    | `number`   | -        | `4000`  | The port number to run on.                                                                  |
| **`require`** | `string[]` | -        | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

<br/>

### `start`

Serves a GraphQL server with GraphQL interface based on your generated artifacts.

This is the equifilent of using `graphql-mesh start`.

```json
"targets": {
  "start": {
    "executor": "@domjtalbot/nx-plugin-graphql-mesh:start",
    "options": {
      "dir": "path/to/app/or/lib",
    },
  },
}
```

#### Options

| Name          | Type       | Required | Default | Description                                                                                 |
| ------------- | ---------- | -------- | ------- | ------------------------------------------------------------------------------------------- |
| **`debug`**   | `boolean`  | -        | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**     | `string`   | ✅       | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`port`**    | `number`   | -        | `4000`  | The port number to run on.                                                                  |
| **`require`** | `string[]` | -        | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

<br/>

### `serve`

Serves a GraphQL server.

This combines `dev` & `start` via a `dev` option toggle.

```json
"targets": {
  "serve": {
    "executor": "@domjtalbot/nx-plugin-graphql-mesh:serve",
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

| Name          | Type       | Required | Default | Description                                                                                 |
| ------------- | ---------- | -------- | ------- | ------------------------------------------------------------------------------------------- |
| **`debug`**   | `boolean`  | -        | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dev`**     | `string`   | -        | `false` | Run the server in dev or production mode.                                                   |
| **`dir`**     | `string`   | ✅       | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`port`**    | `number`   | -        | `4000`  | The port number to run on.                                                                  |
| **`require`** | `string[]` | -        | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

<br/>

### `validate`

Validates artifacts.

This is the equifilent of using `graphql-mesh validate`.

```json
"targets": {
  "validate": {
    "executor": "@domjtalbot/nx-plugin-graphql-mesh:validate",
    "options": {
      "dir": "path/to/app/or/lib",
    },
  },
}
```

#### Options

| Name          | Type       | Required | Default | Description                                                                                 |
| ------------- | ---------- | -------- | ------- | ------------------------------------------------------------------------------------------- |
| **`debug`**   | `boolean`  | -        | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**     | `string`   | ✅       | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`require`** | `string[]` | -        | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

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

| Name                            | Source Handler | Framework | Compiler | Deployed                                                                   |
| ------------------------------- | -------------- | --------- | -------- | -------------------------------------------------------------------------- |
| **`apps/nextjs/stackexchange`** | `openapi`      | `nextjs`  | `tsc`    | -                                                                          |
| **`apps/nextjs/trippin`**       | `odata`        | `nextjs`  | `tsc`    | [Vercel](https://nx-plugin-graphql-mesh-trippin-domjtalbot.vercel.app)     |
| **`apps/nextjs/trippin-swc`**   | `odata`        | `nextjs`  | `swc`    | [Vercel](https://nx-plugin-graphql-mesh-trippin-swc-domjtalbot.vercel.app) |
| **`apps/nextjs/weatherbit`**    | `new-openapi`  | `nextjs`  | `tsc`    | -                                                                          |

<br/>
<br/>

<p align="center">🕸️ ♥ 🐋</p>

<br/>
