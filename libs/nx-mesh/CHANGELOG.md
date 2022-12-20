# nx-mesh

## 2.2.0

### Minor Changes

- [#105](https://github.com/domjtalbot/nx-mesh/pull/105) [`3c7d953`](https://github.com/domjtalbot/nx-mesh/commit/3c7d953d980a33229cc68ffbc3dee2ccefd610c1) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add preset generator

  Create a new Nx workspace with GraphQL Mesh as the preset!

## 2.1.0

### Minor Changes

- [#98](https://github.com/domjtalbot/nx-mesh/pull/98) [`b7e76c3`](https://github.com/domjtalbot/nx-mesh/commit/b7e76c377bdc7f9ec13f2227e662822a2f594c86) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add `graphql-codegen` support. This allows for additional custom client SDKs to be built from the GraphQL Mesh schema.

  - `build` & `build-swc` now support `grphql-codegen` as an additional build step.
  - `sdk` generator can optionally generate a `graphql-codegen` codegen.

## 2.0.1

### Patch Changes

- [#97](https://github.com/domjtalbot/nx-mesh/pull/97) [`fd8de91`](https://github.com/domjtalbot/nx-mesh/commit/fd8de91ef964635b5819eab436a8042346e4e54d) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Fix the output of generated examples.

- [#93](https://github.com/domjtalbot/nx-mesh/pull/93) [`65ce611`](https://github.com/domjtalbot/nx-mesh/commit/65ce6114c3a3f00b9f980df64ea1cdc73a5c8a0b) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Mesh examples share base dependencies

- [#96](https://github.com/domjtalbot/nx-mesh/pull/96) [`ee49b12`](https://github.com/domjtalbot/nx-mesh/commit/ee49b127cb269d3eaa84156f7e3e637fccfe597d) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Fix `application` & `sdk` generators showing outdated examples

## 2.0.0

### Major Changes

- [#71](https://github.com/domjtalbot/nx-mesh/pull/71) [`68d8a7c`](https://github.com/domjtalbot/nx-mesh/commit/68d8a7cf77e52e3c25caedf8f710d743481ee4f3) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Update Nx to 15 & GraphQL Mesh to 0.79

### Minor Changes

- [#68](https://github.com/domjtalbot/nx-mesh/pull/68) [`d23008b`](https://github.com/domjtalbot/nx-mesh/commit/d23008be01a36a1e4349410df1378f389af1c7e3) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Rebuild `base` generator used by `application` & `sdk` generators.

  All shared files have been moved from `application` & `sdk` generators to the base. This creates a consistent foundation for other generators.

- [#68](https://github.com/domjtalbot/nx-mesh/pull/68) [`d23008b`](https://github.com/domjtalbot/nx-mesh/commit/d23008be01a36a1e4349410df1378f389af1c7e3) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Update Nx to `v14.5.10`

- [#71](https://github.com/domjtalbot/nx-mesh/pull/71) [`68d8a7c`](https://github.com/domjtalbot/nx-mesh/commit/68d8a7cf77e52e3c25caedf8f710d743481ee4f3) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add an option for choosing the GraphQL Mesh example project. Users can select from `javascript-wiki` (default), `stackexchange`, `trippin` & `weatherbit`.

## 1.0.1

### Patch Changes

- [#61](https://github.com/domjtalbot/nx-mesh/pull/61) [`73786d1`](https://github.com/domjtalbot/nx-mesh/commit/73786d15d386dcda526c86f1c0feb27a483fa6d7) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add NPM package meta data

## 1.0.0

### Major Changes

- [#34](https://github.com/domjtalbot/nx-mesh/pull/34) [`c7c4a60`](https://github.com/domjtalbot/nx-mesh/commit/c7c4a60c98e7ab0654ee60b77f1b1950d2804c1c) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add `start` executor

* [#32](https://github.com/domjtalbot/nx-mesh/pull/32) [`78e4d9c`](https://github.com/domjtalbot/nx-mesh/commit/78e4d9cee393c752277b253dd1599ef06fcb0e2a) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add `build`, `build-gateway` & `build-swc` executors

- [#49](https://github.com/domjtalbot/nx-mesh/pull/49) [`68e8380`](https://github.com/domjtalbot/nx-mesh/commit/68e8380237440b67156f7251b34891a95da2fbcd) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add `app` generator

* [#44](https://github.com/domjtalbot/nx-mesh/pull/44) [`6b85c28`](https://github.com/domjtalbot/nx-mesh/commit/6b85c282cfb777e2abe740e928f6b4f560b97aca) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add `serve` executor

- [#35](https://github.com/domjtalbot/nx-mesh/pull/35) [`4cdb0bd`](https://github.com/domjtalbot/nx-mesh/commit/4cdb0bddc34e1d5ece5eda908bd1e4764bf0037a) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add mesh `validate` executor

* [#50](https://github.com/domjtalbot/nx-mesh/pull/50) [`329c391`](https://github.com/domjtalbot/nx-mesh/commit/329c391053988f3d18834301b28c7bcd08fc7e1b) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add SDK generator

### Minor Changes

- [#52](https://github.com/domjtalbot/nx-mesh/pull/52) [`5e436b8`](https://github.com/domjtalbot/nx-mesh/commit/5e436b8c1acdf4a2ba3c6e438a05bbb11a33a63a) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Add automatic port selection for `dev`, `start` & `serve` executors

* [#38](https://github.com/domjtalbot/nx-mesh/pull/38) [`f34495c`](https://github.com/domjtalbot/nx-mesh/commit/f34495c735fc609b787e4f728a5d857fe4335ef2) Thanks [@domjtalbot](https://github.com/domjtalbot)! - Update nx to 14.4.3
