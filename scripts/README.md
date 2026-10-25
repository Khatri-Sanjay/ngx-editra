# Workspace tooling

Use the commands in the [root README](../README.md#everyday-commands) for daily work.
Run them from the repository root; you do not need to invoke individual script files.

## What to edit

| Location                   | Contents                            |
| -------------------------- | ----------------------------------- |
| `packages/ngx-editra/src/` | Library implementation              |
| `apps/playground/src/`     | Playground application              |
| `apps/documentation/src/`  | Documentation application           |
| `docs/`                    | Canonical Markdown guides           |
| `e2e/`                     | Browser tests                       |
| `scripts/`                 | Maintainer automation and its tests |

Edit Markdown in `docs/`, then run `npm run docs:generate`. Do not edit files in
`apps/documentation/src/app/content/generated/` directly. The package metadata
snapshots are updated with `npm run package:sync`.

`dist/`, `artifacts/`, `test-results/`, `.angular/`, and `node_modules/` contain
generated builds, reports, caches, or dependencies. They are not source files.
`release.local.json` holds local tool paths and is ignored by Git; use
`release.config.example.json` as the setup reference.

## Individual commands

| Task                               | Command                      |
| ---------------------------------- | ---------------------------- |
| Run only the playground            | `npm start`                  |
| Run only documentation             | `npm run start:docs`         |
| Rebuild library edits continuously | `npm run watch`              |
| Build playground                   | `npm run build:playground`   |
| Build documentation                | `npm run build:docs`         |
| Check types                        | `npm run typecheck`          |
| Lint                               | `npm run lint`               |
| Run library browser tests          | `npm run test:ci`            |
| Run playground browser tests       | `npm run test:e2e`           |
| Run documentation browser tests    | `npm run test:docs`          |
| Test tooling                       | `npm run test:maintenance`   |
| Check dependency audit             | `npm run audit:dependencies` |
| Clear development caches           | `npm run dev:clean`          |

`watch` rebuilds the library; restart app commands afterward to refresh their
isolated library copies. Application source changes reload normally.

## How the scripts fit together

| Area                 | Entry points                                         | Supporting modules                                                                             |
| -------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Local apps           | `start-apps.mjs`, `run-app.mjs`                      | `app-workspace.mjs`, `prepare-apps.mjs`                                                        |
| Builds and packaging | `build-library.mjs`, `build-site.mjs`, `pack.mjs`    | `library-docs.mjs`                                                                             |
| Documentation        | `generate-documentation.mjs`, `sync-npm-package.mjs` | `library-docs.mjs`                                                                             |
| Validation           | `run-validation.mjs` → `validate.mjs`                | `validation-runtime.mjs`, audit, architecture, rendering, performance and compatibility checks |
| Releases             | `release.mjs`, `verify-release.mjs`                  | `release-policy.mjs`, `release-evidence.mjs`, acceptance and repository checks                 |

Files ending in `.test.mjs` or `.test.cjs` verify the tooling. Supporting modules
stay separate so tests can import their logic without starting builds or publishing.

The library uses Node 20/npm 10, while the isolated website apps use Node 24/npm 11.
The root commands coordinate these toolchains. Keeping separate app lockfiles
allows the apps to use newer Angular tooling while the library supports older
Angular consumers. See [publishing setup](../docs/PUBLISHING.md) for tool paths.
