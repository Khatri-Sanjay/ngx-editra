# Publish ngx-editra to npm

The release commands use the version in `packages/ngx-editra/package.json` and the
configured publication tag. You do not need to type a tarball filename or forward
compatibility flags through PowerShell.

## Publish a stable version

For a first stable release, set these fields in `packages/ngx-editra/package.json`:

```json
{
	"version": "1.0.0",
	"publishConfig": {
		"access": "public",
		"registry": "https://registry.npmjs.org/",
		"tag": "latest"
	}
}
```

Retain the other package fields. A stable version has no `-alpha`, `-beta` or
`-rc` suffix. Use `latest` for stable releases and `next` for prereleases.
Update the changelog for the chosen version, then run the preparation and
publication steps below. The existing release command reads `publishConfig.tag`.

After successful stable publication, change `channel` to `latest` in
`npm-package.json`, run `npm.cmd run package:sync`, and update consumer install
examples to `npm install ngx-editra`. Regenerate and redeploy the websites.
Do not mark the stable version as published before npm confirms publication.

Verify the result:

```powershell
npm.cmd view ngx-editra@latest version
npm.cmd view ngx-editra dist-tags
```

Consumers can then install with:

```sh
npm install ngx-editra
```

This resolves npm's `latest` tag. Changing the tag on an existing alpha alone
does not make its version stable; publish the new version and tested archive.

## 1. Configure tool paths once

This checkout already has a local configuration. On another machine, copy
`release.config.example.json` to `release.local.json` and edit its three paths:
Node 20, Node 24 and Chrome/Edge. The local configuration is ignored by Git.
The compilation baseline uses npm 10 beside Node 20; preparation installs pinned
npm 11.6.2 under ignored artifacts for Angular 21/22 consumers when necessary.

Open a terminal in the workspace root and check the configuration:

```powershell
npm.cmd run release:check
```

On macOS/Linux, use `npm` in place of `npm.cmd`. Existing EDITRA_NODE20,
EDITRA_NODE24, EDITRA_NPM_CLI and browser environment settings are also supported.

## 2. Sign in to npm

Create an npm account, verify your email and enable two-factor authentication.
Then sign in from your terminal:

```powershell
npm.cmd login --registry=https://registry.npmjs.org/
```

Follow [npm's publishing authentication requirements](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/).
Never commit tokens or authentication codes.

## 3. Prepare the release

Update the library version and release notes first. Each published version is
immutable. Stop dev servers/watchers before running `npm.cmd ci` if dependencies
need installation; Windows can otherwise lock esbuild or Rollup files.

```powershell
npm.cmd run release
```

This command generates documentation, runs full release validation and Angular
17-22 compatibility checks, verifies evidence, and previews npm publication.
Matching evidence is reused when the source and archive have not changed.
It selects the configured Node/npm/browser tools automatically. It never publishes.
If a check fails, resolve the first failure and run it again. Complete applicable
manual checks and confirm remote CI for the release revision; see the
[release policy](RELEASING.md).

## 4. Publish the prepared archive

```powershell
npm.cmd run release:publish
```

The command checks evidence, npm login and version availability, then displays
an npm dry run, account, package version, tag, archive and SHA-256. To publish,
type the exact confirmation shown, for example `publish ngx-editra@1.0.0`.
Any other response cancels. Complete npm's authentication prompt when requested.
The command verifies evidence again before sending the tested archive to npm.
It refuses noninteractive publication and has no automatic confirmation flag.

If source or archive changed, rerun `npm.cmd run release` first. Do not publish
the private workspace or library source directory directly.

## 5. Verify and refresh the websites

```powershell
npm.cmd view ngx-editra@latest version dist-tags peerDependencies
npm.cmd run package:sync
```

In a separate supported Angular app, install `ngx-editra` and follow
[quick start](QUICK_START.md). Commit refreshed metadata and deploy the sites using
[the deployment guide](DEPLOYMENT.md). Updating repository Markdown does not replace
the README attached to an already published version; it ships with the next release.
See [package information](PACKAGE.md) for badges, download statistics and channels.
