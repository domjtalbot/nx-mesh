<br/>

<h1 align="center">Nx | GraphQL Mesh</h1>

<p align="center">A <a href="http://nx.dev">Nx</a> plugin for <a href="http://graphql-mesh.com">GraphQL Mesh</a></p>

<div align="center">
  <p dir="auto">
    <a href="https://github.com/sponsors/domjtalbot">
      <img src="https://img.shields.io/badge/Sponsor @domjtalbot-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#EA4AAA" alt="Sponsor @domjtalbot on GitHub!" />
    </a>
  </p>
</div>

<br/>

## How to use

### Peer Dependencies

| Name                    | Version    | Required |
| ----------------------- | ---------- | -------- |
| **`@graphql-mesh/cli`** | `>=0.71.0` | `true`   |
| **`nx`**                | `>=14`     | `true`   |

<br/>

## Executors

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
| **`assets`**                                  | `string[]`                           | `false`  | -                  | List of static assets.                                                                                                           |
| **`buildableProjectDepsInPackageJsonType`**   | `dependencies` or `peerDependencies` | `false`  | `peerDependencies` | When `updateBuildableProjectDepsInPackageJson` is `true`, this adds dependencies to either `peerDependencies` or `dependencies`. |
| **`debug`**                                   | `boolean`                            | `false`  | `false`            | Display debugging info by applying the `DEBUG` env variable.                                                                     |
| **`dir`**                                     | `string`                             | `true`   | -                  | The path of the directory containing the GraphQL Mesh config.                                                                    |
| **`fileType`**                                | `json`, `ts` or `js`                 | `false`  | `ts`               | The filetype.                                                                                                                    |
| **`main`**                                    | `string`                             | `true`   | -                  | The name of the main entry-point file.                                                                                           |
| **`outputPath`**                              | `string`                             | `true`   | -                  | The output path of the generated files.                                                                                          |
| **`require`**                                 | `string[]`                           | `false`  | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| **`transformers`**                            | `string[]`                           | `false`  | -                  | List of TypeScript Transformer Plugins.                                                                                          |
| **`tsConfig`**                                | `string`                             | `true`   | -                  | The path to the Typescript configuration file.                                                                                   |
| **`updateBuildableProjectDepsInPackageJson`** | `boolean`                            | `false`  | `true`             | Whether to update the buildable project dependencies in `package.json`.                                                          |

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
| **`debug`**    | `boolean`            | `false`  | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**      | `string`             | `true`   | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`fileType`** | `json`, `ts` or `js` | `false`  | `ts`    | The filetype.                                                                               |
| **`require`**  | `string[]`           | `false`  | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

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
| **`assets`**                                  | `string[]`                           | `false`  | -                  | List of static assets.                                                                                                           |
| **`buildableProjectDepsInPackageJsonType`**   | `dependencies` or `peerDependencies` | `false`  | `peerDependencies` | When `updateBuildableProjectDepsInPackageJson` is `true`, this adds dependencies to either `peerDependencies` or `dependencies`. |
| **`debug`**                                   | `boolean`                            | `false`  | `false`            | Display debugging info by applying the `DEBUG` env variable.                                                                     |
| **`dir`**                                     | `string`                             | `true`   | -                  | The path of the directory containing the GraphQL Mesh config.                                                                    |
| **`fileType`**                                | `json`, `ts` or `js`                 | `false`  | `ts`               | The filetype.                                                                                                                    |
| **`main`**                                    | `string`                             | `true`   | -                  | The name of the main entry-point file.                                                                                           |
| **`outputPath`**                              | `string`                             | `true`   | -                  | The output path of the generated files.                                                                                          |
| **`require`**                                 | `string[]`                           | `false`  | `[]`               | Loads specific require.extensions before running the codegen and reading the configuration.                                      |
| **`skipTypeCheck`**                           | `boolean`                            | `false`  | `false`            | Whether to skip TypeScript type checking.                                                                                        |
| **`swcrc`**                                   | `string`                             | `false`  | `.lib.swcrc`       | The path to the SWC configuration file.                                                                                          |
| **`transformers`**                            | `string[]`                           | `false`  | -                  | List of TypeScript Transformer Plugins.                                                                                          |
| **`tsConfig`**                                | `string`                             | `true`   | -                  | The path to the Typescript configuration file.                                                                                   |
| **`updateBuildableProjectDepsInPackageJson`** | `boolean`                            | `false`  | `true`             | Whether to update the buildable project dependencies in `package.json`.                                                          |

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
| **`debug`**   | `boolean`  | `false`  | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**     | `string`   | `true`   | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`port`**    | `number`   | `false`  | `4000`  | The port number to run on.                                                                  |
| **`require`** | `string[]` | `false`  | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

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
| **`debug`**   | `boolean`  | `false`  | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**     | `string`   | `true`   | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`port`**    | `number`   | `false`  | `4000`  | The port number to run on.                                                                  |
| **`require`** | `string[]` | `false`  | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

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
| **`debug`**   | `boolean`  | `false`  | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dev`**     | `string`   | `false`  | `false` | Run the server in dev or production mode.                                                   |
| **`dir`**     | `string`   | `true`   | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`port`**    | `number`   | `false`  | `4000`  | The port number to run on.                                                                  |
| **`require`** | `string[]` | `false`  | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

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
| **`debug`**   | `boolean`  | `false`  | `false` | Display debugging info by applying the `DEBUG` env variable.                                |
| **`dir`**     | `string`   | `true`   | -       | The path of the directory containing the GraphQL Mesh config.                               |
| **`require`** | `string[]` | `false`  | `[]`    | Loads specific require.extensions before running the codegen and reading the configuration. |

<br/>

## Examples

### API Gateway

| Name                                 | Source Handler |
| ------------------------------------ | -------------- |
| **`apps/api-gateway/stackexchange`** | `openapi`      |
| **`apps/api-gateway/trippin`**       | `odata`        |
| **`apps/api-gateway/weatherbit`**    | `new-openapi`  |

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
