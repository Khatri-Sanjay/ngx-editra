# ngx-editra workspace

[![npm version](https://img.shields.io/npm/v/ngx-editra?label=npm)](https://www.npmjs.com/package/ngx-editra)
[![npm downloads per month](https://img.shields.io/badge/downloads-pending-lightgrey)](https://www.npmjs.com/package/ngx-editra)
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

The legacy compilation baseline uses Node 20.20.2 and npm 10.8.2. Use the application's
own Angular requirements for consumers; this baseline is not a production runtime recommendation.

```sh
npm ci
npm run start:all
```

Playground: http://localhost:4200. Documentation: http://localhost:4300.
Set `PLAYGROUND_PORT` or `DOCS_PORT` to override ports. Press Ctrl+C to stop both.
Use `npm start` or `npm run start:docs` to run one app. Each starts from the compiled
public library; run `npm run watch` in another terminal when editing library sources.
Windows PowerShell can use `npm.cmd` if npm.ps1 is blocked.

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

The two apps are independent static sites. Build them in GitHub Actions with the
repository toolchain, then deploy the prepared output using Node 24. This avoids
Vercel's retired Node 20 build runtime and does not deploy the legacy Express SSR server.

```sh
npm run build:site -- documentation
npm run build:site -- playground
```

Use the manual **Deploy static site to Vercel** GitHub workflow for preview or production.
Configure the two Vercel projects and GitHub secrets first. Follow the complete
[deployment guide](docs/DEPLOYMENT.md); no deployment runs automatically on push.
The live documentation and playground links above have been verified on Vercel.

## Project policies

[Architecture](ARCHITECTURE.md) · [Contributing](CONTRIBUTING.md) ·
[Maintenance](docs/MAINTENANCE.md) · [Project status](PROGRESS.md) ·
[Changelog](CHANGELOG.md) · [Security reporting](SECURITY.md)

## Licence

MIT. The root [LICENSE](LICENSE) is canonical and is included in the npm archive.
