# ngx-editra workspace

[![npm version](https://img.shields.io/npm/v/ngx-editra?label=npm)](https://www.npmjs.com/package/ngx-editra)
[![npm downloads per month](https://img.shields.io/npm/dm/ngx-editra)](https://www.npmjs.com/package/ngx-editra)
[![License](https://img.shields.io/npm/l/ngx-editra)](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE)

[npm](https://www.npmjs.com/package/ngx-editra) | [Documentation](https://ngx-editra-docs.vercel.app) | [Playground](https://ngx-editra-playground.vercel.app) | [Source](https://github.com/Khatri-Sanjay/ngx-editra) | [Issues](https://github.com/Khatri-Sanjay/ngx-editra/issues)

Source repository for **ngx-editra**, a standalone Angular rich-text editor, its
playground, and its documentation website. `0.1.0-alpha.0` is published on npm;
the first stable release, `1.0.0`, is in preparation.

Install from the default npm channel with `npm install ngx-editra`. See
[package information](docs/PACKAGE.md) for release channels and download statistics.

## Use the library

See the [npm package README](packages/ngx-editra/README.md) for installation, forms,
editor and saved-content examples. Full guides live in [docs](docs/INSTALLATION.md).
The package README is copied into the compiled npm distribution; this root README
explains repository development and deployment.

## Repository layout

| Path                | Purpose                                      | Distribution                           |
| ------------------- | -------------------------------------------- | -------------------------------------- |
| packages/ngx-editra | Public library and consumer README           | npm compiled tarball                   |
| apps/playground     | Interactive library demo                     | Separate Vercel static site            |
| apps/documentation  | Searchable guides and live example           | Separate Vercel static site            |
| docs                | Canonical feature and project guides         | GitHub, documentation app and npm docs |
| scripts             | Build, validation and deployment preparation | Workspace tooling                      |

## Develop locally

The root library compiler uses Node 20.20.2/npm 10.8.2. The public websites use independent
Angular 22/TypeScript 6 projects with Node 24/npm 11. Configure `node24` once in
`release.local.json` (or `EDITRA_NODE24`); root scripts select the app runtime and
install from each app's lockfile automatically. This keeps the old compiler out of
the deployed applications. Consumers use their own Angular runtime requirements.

```sh
npm ci
npm run start:all
```

Playground: http://localhost:4200. Documentation: http://localhost:4300.
Set `PLAYGROUND_PORT` or `DOCS_PORT` to override ports. Press Ctrl+C to stop both.
Use `npm start` or `npm run start:docs` to run one app. Each starts from the compiled
public library. `npm run watch` compiles library edits continuously; restart the app
commands after a library rebuild to refresh their isolated package copies. App source
edits reload normally without reinstalling dependencies.
Startup reuses installed app dependencies while each app's manifest and lockfile are
unchanged. A library rebuild refreshes only the local `ngx-editra` copy. If a preview
port is already occupied, startup stops before building or changing dependencies;
stop the existing run with Ctrl+C before starting it again. This avoids Windows Sass
file locks from overlapping preview sessions.
Windows PowerShell can use `npm.cmd` if npm.ps1 is blocked.

The workspace dev servers disable dependency prebundling to avoid stale optimized
chunks when both apps run or the local library is rebuilt. Production builds are
unaffected. If an already running browser reports missing `.angular/cache/.../vite/deps`
chunks, stop both dev servers, run `npm run dev:clean`, restart with
`npm run start:all`, and hard-refresh both browser tabs (Ctrl+Shift+R).

## Documentation

Edit canonical Markdown in `docs/` and the root project policies, then run:

```sh
npm run docs:generate
npm run docs:check
```

Do not edit generated guide files. See the [documentation app README](apps/documentation/README.md)
and [playground README](apps/playground/README.md).

The public docs and npm package contain library usage guides selected in
`scripts/library-docs.mjs`. Maintainer guides remain in the repository; see
[Contributing](CONTRIBUTING.md) for publishing, deployment and compatibility testing.

## Validate and publish the npm library

These instructions are for workspace maintainers only. See the
[release process](docs/RELEASING.md) and [publish to npm guide](docs/PUBLISHING.md).
They are excluded from the library package and public documentation.

```sh
npm run release
npm run release:publish
```

`release` prepares and validates the archive, including Angular 17-22 consumers;
it never publishes. `release:publish` verifies that exact archive, shows a dry run,
and asks you to type the package/version before publishing. Configure tool paths
once using the [publishing guide](docs/PUBLISHING.md).
Follow the [step-by-step npm publishing guide](docs/PUBLISHING.md) for Windows setup,
authentication, validation, publication and troubleshooting.

## Deploy the websites from GitHub to Vercel

The two apps are independent static sites. GitHub Actions compiles the library with
Node 20, builds the apps with Node 24, then deploys prepared static output using Node 24.
No local SSR test server or root compiler dependency tree is deployed.

```sh
npm run build:site -- documentation
npm run build:site -- playground
```

After merges or pushes to `main` pass validation, **Deploy static site to Vercel**
automatically deploys both websites to production. Manual preview or production runs remain available.
Configure the two Vercel projects and GitHub secrets first. Follow the complete
[deployment guide](docs/DEPLOYMENT.md).
The live documentation and playground links above have been verified on Vercel.

## Project policies

[Architecture](ARCHITECTURE.md) · [Contributing](CONTRIBUTING.md) ·
[Maintenance](docs/MAINTENANCE.md) · [Project status](PROGRESS.md) ·
[Changelog](CHANGELOG.md) · [Security reporting](SECURITY.md)

## Licence

MIT. The root [LICENSE](LICENSE) is canonical and is included in the npm archive.
