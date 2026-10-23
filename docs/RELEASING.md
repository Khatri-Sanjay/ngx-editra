# Release preparation

For executable Windows instructions, follow the [step-by-step npm publishing guide](PUBLISHING.md).

The normal release flow is:

```sh
npm run release
npm run release:publish
```

Configure local tool paths once using `release.config.example.json` as a template
for the ignored `release.local.json`. `npm run release:check` checks the paths and
toolchain versions without building or publishing. Preparation runs the full matrix
when evidence is stale and reuses matching evidence when source/archive are unchanged.
Publishing requires an interactive terminal and an explicit package/version confirmation.
For stable versions, publication also requires passing manual acceptance evidence and
verified repository settings/remote CI for the clean release revision. These checks run
before npm account checks or publication; preparation and pull-request CI remain available
while manual acceptance is pending. Prereleases still require complete automated evidence.
The lower-level commands below remain available for troubleshooting.

Keep changelog entries focused on library features, fixes, compatibility and breaking
changes that affect consumers. Document publishing scripts, CI, local setup and
workspace maintenance in the maintainer guides instead of release notes.

Public app dependencies are independently locked on Angular 22; the Angular 17 compiler
remains private. Release validation includes the dependency audit baseline and both
website audits. Before making a complete manual acceptance claim, run
`npm run acceptance:check -- --strict` and review [the evidence record](acceptance/README.md).
Run `npm run repo:check -- --strict` after committing/pushing the release revision to
verify remote settings and CI. Missing credentials or pending real-device tests are
unverified, not passing evidence.

1. Run the validation commands in CONTRIBUTING.md and complete the outstanding acceptance
   criteria in PROGRESS.md before claiming the stable release is fully verified.
2. Update package version, changelog, consumer tarball paths and any demonstrated peer ranges.
3. Run npm run pack (production build, dry-run package validation and actual tarball).
4. Install that exact tarball into independent consumers; run the full compatibility matrix.
5. Confirm README, LICENSE, public declarations, the single root API export and SCSS are in the archive.
6. Verify package-name ownership and npm account permissions immediately before publication.
7. After explicit owner authorization, publish the exact tested archive from the workspace root with the stable tag:

```sh
npm publish ./artifacts/ngx-editra-1.0.1.tgz --access public --tag latest
```

No workflow publishes automatically. GitHub Actions prepares validation evidence and archives.
The package is named `ngx-editra`; source metadata for the `1.0.1` candidate defaults publishing to public access and the
`latest` tag. The workspace root is private. Do not publish `packages/ngx-editra` directly:
ng-packagr's compiled distribution is the package consumers need. Update the archive filename
when the version changes. After a stable release is approved, explicitly publish that stable
archive with `--tag latest` and update the source publishing default accordingly.

After publication, verify the published version and its consumer instructions:

```sh
npm view ngx-editra@latest version dist-tags peerDependencies
npm install ngx-editra
```

Run installation in a separate Angular application and follow [installation](INSTALLATION.md)
and [quick start](QUICK_START.md). Verify both components work without any application Sass import.
Package-name ownership and availability must be checked at release time; no name is reserved.
See the [official npm publish reference](https://docs.npmjs.com/cli/v10/commands/npm-publish/)
for archive publishing and tags.

## Automated validation and maintenance

The published release is `1.0.0`; the next patch release is `1.0.1`. Validation and packing never publish a package.

## Local validation

Use the repository's Node 20.20.2/npm 10.8.2 compilation baseline, install dependencies
with `npm ci`, and provide Chrome/Chromium for browser tests. On Windows, use `npm.cmd`
if PowerShell blocks npm.ps1. Set `CHROME_BIN` for Karma and `EDITRA_BROWSER` for
Playwright when using an installed Chromium browser, including Microsoft Edge.

```sh
npm run validate
```

The npm validation launcher reads `release.local.json` and selects the configured
Node 20/npm 10 compiler and browser, even when the terminal uses Node 24. Explicit
`EDITRA_NODE20`, `EDITRA_NPM_CLI`, and browser environment settings override the local
paths. CI can use its existing Node 20/npm 10 and `CHROME_BIN` without a local file.
Configure an installed Chrome/Edge executable as `browser`; the selected path is
passed to both Karma and Playwright. Missing or incorrect toolchain versions fail
before validation starts. Run the npm command instead of `node scripts/validate.mjs`
when automatic local toolchain selection is needed.

The command stops on the first failure. It checks generated documentation, formatting,
lint, architectural boundaries, builds, types, all unit tests, packaged server rendering,
archive contents, production playground/docs browser tests and performance observations.
Server rendering checks exercise the pipe, directive and viewer, including shared styles,
validated media, CSP nonces and isolated requests. Browser rendering checks exercise
hydration and code copying through the public package entry point.

## Consumer compatibility

Set `EDITRA_NODE20` and `EDITRA_NODE24` to the respective Node executables and, if not
running through npm, `EDITRA_NPM_CLI` to npm's JavaScript entry point. Then run:

Also set `EDITRA_NPM24_CLI` to npm 11's JavaScript entry point for Angular 21/22
consumers. The older compilation toolchain continues to use npm 10.

```sh
npm run validate -- --compatibility
npm run verify:evidence
```

The compatibility runner installs the newly packed archive in independent Angular
17–22 consumers at each major's minimum and current fixture, plus Angular 22.1.2,
using normal peer resolution. Each consumer must pass production build,
forms, SSR/hydration, security, media, table and saved-content rendering tests. Evidence
is stored in `artifacts/compatibility-results.json` with the archive SHA-256. Historical
results do not validate a changed archive. Do not widen peer ranges without passing the
corresponding consumer checks.

The oldest supported Angular runtime determines the current compilation baseline.
Upgrading the compilation Angular major requires reviewing the lower peer ranges and
retesting consumers; it is not a dependency-only change. Legacy compatibility does not
establish ongoing security support for an application's Angular or Node version.

## Ongoing maintenance

GitHub Actions runs the same complete validation and evidence verification command for
pushes, pull requests, manual requests and weekly, with separate Node runtimes for consumers.
Dependabot checks workspace, consumer and action dependencies weekly; review updates
through the same checks. CI configuration is not evidence of a successful remote run.
Consumer Angular majors remain distinct, and TypeScript minor changes need manual review.
See [maintenance policy](MAINTENANCE.md) for migration and repository-setting requirements.

Validation generates `artifacts/release-validation.json` directly from executed checks.
It records failures as well as successes, the source fingerprint, archive hash and fresh
consumer reports. `verify:evidence` rejects missing checks, source/archive changes, missing
consumer majors or a failed maintained-consumer production audit. After changing source,
revalidate before publishing. The source fingerprint normalizes consumer tarball paths;
their installed lockfile hashes are recorded per consumer.

For each release, update `CHANGELOG.md`, usage/API documentation, `PROGRESS.md` and
the compatibility evidence. Review the consuming application's production dependency
audit separately from legacy build-tool dependencies. Address or explicitly document
findings before release. Never infer a current audit result from an earlier report.

## Stable-release acceptance

-   All automated checks pass for the exact archive intended for release.
-   Remote CI completes successfully on the release revision.
-   Keyboard, screen-reader, high-contrast and mobile behavior is reviewed manually.
-   HTML policies, extension trust boundaries and dependency findings receive review.
-   Clipboard failures, repeated mounting and memory behavior are tested in supported browsers.
-   Bundle-size and performance costs are documented for the supported use cases.
-   Package ownership, metadata and release notes are checked before an explicit publish action.

Remaining manual and external checks are tracked in `PROGRESS.md`; they must not be
marked complete based only on automated tests.
