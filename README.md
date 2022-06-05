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

## Executors

### Dev

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
<br/>

<p align="center">🕸️ ♥ 🐋</p>

<br/>
