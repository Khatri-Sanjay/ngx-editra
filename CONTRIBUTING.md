# Contributing

Maintainer guides for [publishing](docs/PUBLISHING.md), [site deployment](docs/DEPLOYMENT.md),
[compatibility testing](docs/COMPATIBILITY_TESTING.md) and [maintenance](docs/MAINTENANCE.md)
stay in this repository. The public documentation and npm package include only library
usage guides selected in `scripts/library-docs.mjs`.

Use Node 20.20.2/npm 10.8.2 for package compilation. Run npm ci, npm run format:check,
npm run build, npm run lint, npm run typecheck, npm run test:ci and npm run build:playground.
Build before typed application lint so the public package declarations exist on a clean checkout.
Browser tests use npm run test:e2e; install Chromium with npx playwright install chromium
or set EDITRA_BROWSER to an installed compatible browser executable.

Core must have no Angular runtime dependency or browser-global evaluation. Keep changes transaction-based,
strictly typed and covered by meaningful tests. Do not use any or ts-ignore. The only permitted Angular
HTML trust boundary is EditraHtmlPipe: it must reconstruct input through staticPreview's schema-based
parser and serializer before calling bypassSecurityTrustHtml. Never trust raw input or bypass this
validation path. Custom schema serializers are trusted application code and require independent review.
The playground email iframe is a separate, sandboxed preview sink: assign only the
schema-rebuilt `exportEmail` result to srcdoc, never raw editor input. Keep its sandbox
and restrictive preview CSP. The exporter must never invoke custom serializers.
New features need security, serialization, undo/redo and accessibility consideration.
Run npm run pack and test the tarball in independent consumers before widening peer ranges.
Compatibility scripts require EDITRA_NPM_CLI, EDITRA_NODE20 and EDITRA_NODE24 as documented
in scripts/run-compatibility.mjs. Consumer lockfiles keep each tooling graph separate.

Update PROGRESS.md, docs and CHANGELOG.md. Never publish automatically or claim unexecuted checks passed.

After editing Markdown, run `npm run docs:generate`. Validation uses `npm run docs:check`
to reject stale generated pages without rewriting them. Test counts and archive identity
belong in the generated validation reports; do not copy changing totals into status docs.
See [maintenance policy](docs/MAINTENANCE.md) for dependency/support boundaries.

Run `npm run validate` for the complete local release checks. Add `-- --compatibility`
for the exact-archive consumer matrix. See [release checks](docs/RELEASING.md) for browser
and runtime setup. The standalone rendering APIs share the pipe's validation boundary;
the directive composes copy behavior and the viewer delegates to the directive.

`npm start` and `npm run build:playground` build the library first. During library development,
run `npm run watch` in a second terminal to refresh the distribution consumed by the apps.
Run `npm run test:architecture` when changing import-boundary rules. Browser unit tests use
CHROME_BIN; Playwright uses EDITRA_BROWSER when a system Chromium browser is selected.

Root documents and `docs/` are canonical. Do not copy them into package source.
`npm run build` compiles the library and assembles documents directly in `dist/ngx-editra`;
bare `ng build ngx-editra` and `npm run watch` compile code and local styles only.
The package source contains implementation and configuration; generated output belongs
in `dist/`, reports and archives in `artifacts/`. See ARCHITECTURE.md for ownership.
