# Workspace architecture

The root npm workspace contains one publishable Angular library and its private
Angular 17 compiler/test toolchain (Node 20.20.2/npm 10.8.2). The two public apps are
independent Angular 22 projects using Node 24/npm 11 and their own lockfiles.
Compatibility consumers also own their Angular, TypeScript and runtime versions.
Use the root npm scripts: `scripts/run-app.mjs` selects the modern runtime and copies
the compiled library into each app without sharing the root Angular installation.

## Repository ownership

```text
ngx-editra/
  apps/
    playground/             Interactive editor demo and SSR application
    documentation/          Documentation website and live examples
    compatibility/          Isolated Angular 17-22 tarball consumers
  packages/
    ngx-editra/
      src/
        lib/
          components/       Feature folders with templates, styles and tests
          config/           Angular tokens and configuration providers
          core/             Framework-independent document engine and contracts
          extensions/       Media and Markdown integrations
          directives/       Angular DOM behavior
          pipes/            Angular content rendering
          node-views/       Browser editor node views
          utils/            Shared UI helpers
          testing/          Tests spanning internal layers
          public-api.ts     Explicitly supported package exports
        styles/             Published Sass styles
        public-api.ts       Forwards the package API
      package.json          npm identity, peers and runtime dependencies
      ng-package.json       Angular packaging and local style assets
      tsconfig.lib*.json    Development and partial-Ivy production compilation
      tsconfig.spec.json    Library test compilation
  docs/                     Single source of feature and API documentation
  e2e/                      Browser integration tests and fixtures
  scripts/                  Build and verification automation
  angular.json              Angular project roots and builders
  tsconfig.json             Shared strict compiler settings and package alias
  package.json              Private workspace and development commands
  README.md                 GitHub workspace and deployment overview
  LICENSE                   Canonical license
  CHANGELOG.md              Canonical release notes
  CONTRIBUTING.md            Canonical contributor guidance
  PROGRESS.md                Canonical acceptance status
```

The playground root is a router shell. Its lazy feature in
`apps/playground/src/app/features/playground` owns editor/form state, toolbar presets,
import actions and sample data. The shared document-output component accepts serialized
text and emits format choices; it owns clipboard feedback without accessing editor internals.
See [the playground architecture](apps/playground/README.md) for the file map and features.

Root policies and docs/ are maintained once. packages/ngx-editra/README.md is the
consumer-facing npm overview; the root README serves GitHub contributors. These have
different audiences and are not generated copies. dist/, artifacts/, test-results/ and node_modules/ are generated outputs,
not architecture layers. npm may create package-local node_modules for dependency
versions that cannot share the root installation; these must not be manually moved.

## Public API and dependency direction

All supported TypeScript symbols are imported from ngx-editra. There are no /core
or /extensions npm entry points. Editor and viewer styles load with their components.
The editor uses host-prefixed global rules because ProseMirror creates document nodes
outside Angular's template; those rules remain under `ngx-editra`. Optional Sass exports
remain available for custom content containers and existing integrations.
Core and extensions retain internal barrels to organize relative source imports.
Applications consume the built distribution through the inherited root TypeScript
alias. Library code never imports its own npm entry point or application files.

Dependencies flow from applications to the public package, and internally from
Angular UI to extensions/core and from extensions to core. Core does not import
Angular, extensions or UI. ESLint resolves relative import paths to enforce these
boundaries, including re-exports and dynamic imports. Public exports are explicit;
private implementation paths are unsupported. Boundary rules have regression tests.

Angular packages used directly by the library are peers. ProseMirror, parse5 and
tslib are runtime dependencies. CLI, compiler, lint, formatting and test tools stay
in the private workspace. Compatibility apps are excluded from npm workspaces so
their tooling and dependency resolution remain isolated.

## Build and packaging

npm run build invokes scripts/build-library.mjs. It runs the configured ng-packagr
builder, then copies only the consumer documents selected in scripts/library-docs.mjs
into dist/ngx-editra. The same manifest selects public documentation routes. Deployment,
publishing, contribution and workspace architecture guides stay in the repository.
LICENSE is maintained at the root and copied unchanged into the package. Packaging
rejects unexpected Markdown files and broken relative Markdown links.
No generated documents are written back into package source.
The wrapper is needed because ng-packagr rejects assets outside the library root.
Use npm run build for the complete distribution; bare ng build only compiles the
library and local styles. npm run watch is for code iteration, not release packaging.

npm start and application build commands build the library first. Both apps inherit
the same package alias and have distinct compiler output directories. New Angular
projects default to packages/; application generators should explicitly use apps/.

npm run pack builds and verifies exports, declarations, styles, documents and
runtime dependencies before writing a tarball into artifacts/. Compatibility tests
install that exact archive and record its SHA-256. Reports for older hashes do not
validate a new archive. Publish only from dist/ngx-editra after release validation
and explicit owner authorization; no workflow publishes automatically.

## Automation responsibilities

The documentation app uses separate layout, feature, core service, shared model and
generated-content directories. Its root component is a router outlet. Full articles
load with the guide route; the layout imports only navigation/search data. Its global
stylesheet is composed from ordered responsibility-based Sass modules. See
apps/documentation/README.md for the app-specific directory map and ownership rules.

| Script                     | Responsibility                                                 |
| -------------------------- | -------------------------------------------------------------- |
| build-library.mjs          | Compile the package and assemble canonical release documents   |
| pack.mjs                   | Validate the distribution and create the npm archive           |
| generate-documentation.mjs | Compile root Markdown into website pages and routes            |
| eslint-boundaries.cjs      | Enforce application and internal source-layer boundaries       |
| eslint-boundaries.test.cjs | Verify boundary rules accept and reject representative imports |
| run-compatibility.mjs      | Install and test the tarball in independent Angular consumers  |
| performance.mjs            | Measure large-document engine behavior                         |

Compatibility fixtures are maintained explicitly. The old generator that fetched
latest package versions and overwrote consumer projects has been removed.

## Editor behavior and verification

The ProseMirror document is authoritative; editing uses transactions and history.
Angular integrates through ControlValueAccessor. Browser views initialize after
rendering and are destroyed with the component. SSR uses schema-validated static
content and an explicit hydration boundary. HTML is parsed and reconstructed;
custom extension serializers remain trusted application code. See docs/SECURITY.md.

Validation commands are documented in CONTRIBUTING.md. Build and packaging checks
must verify actual emitted files, not source-directory assumptions. Consumers use
normal npm peer resolution, their own lockfiles and the tested tarball. See
artifacts/compatibility-results.json for hash-bound consumer evidence. Existing
bundle warnings, manual accessibility review and independent security review remain
separate release considerations; compatibility does not establish stable-release readiness.
