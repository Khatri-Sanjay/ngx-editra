# Playground application

[![npm version](https://img.shields.io/npm/v/ngx-editra?label=npm)](https://www.npmjs.com/package/ngx-editra)
[![npm downloads per month](https://img.shields.io/npm/dm/ngx-editra)](https://www.npmjs.com/package/ngx-editra)
[![License](https://img.shields.io/npm/l/ngx-editra)](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE)

[npm](https://www.npmjs.com/package/ngx-editra) | [Documentation](https://ngx-editra-docs.vercel.app) | [Playground](https://ngx-editra-playground.vercel.app) | [Source](https://github.com/Khatri-Sanjay/ngx-editra) | [Issues](https://github.com/Khatri-Sanjay/ngx-editra/issues)

Published-version labels read npm's `latest` tag after page load, when the window
regains focus, and every five minutes. Registry failures retain the last known
version. Deployment refreshes the server-rendered fallback; `npm run package:sync`
can refresh it locally. The demo build version remains labelled separately.

Live site: https://ngx-editra-playground.vercel.app.

The interactive demo imports the compiled public `ngx-editra` package. It is deployed
as a website, separately from npm. Run commands from the repository root using the
Node 20/npm 10 library launcher plus the independent Node 24/npm 11 app toolchain. Configure node24 in release.local.json once.

```sh
npm ci
npm start
```

Open http://localhost:4200. Use `npm run start:all` for both apps and `npm run watch`
in another terminal when editing library sources. Restart the app command after a library rebuild to refresh its isolated package copy.

## Features

The desktop workspace places settings beside the editor and reader preview beside
source output. Tablet and mobile layouts stack these panels without page overflow.
Import tools and integration examples use expandable sections. Unmounting shows a
recovery action and preserves the draft in memory; refreshing the page discards edits.

Choose a complete tour, blank document, article, or table/code sample. Reset restores
the selected sample. Try toolbar presets, themes, read-only/disabled controls, mount
and unmount, and Reactive Forms state. Inspect or copy HTML, JSON, text and Markdown;
clipboard denial displays a manual-copy fallback. Output format selection remains
available while the editor is unmounted, including after changing or resetting the
selected sample. Column layouts export as validated HTML inside Markdown because
CommonMark has no native column syntax. Import HTML/Markdown and compare directive,
pipe and viewer rendering. A separate template-driven editor demonstrates
ngModel. Open Signal Forms integration for a deferred Angular 22 example covering model updates, validation, dirty/touched state, disabled state and reset.

Open Email export for an inline-styled email body, plain text, conversion notes and a
sandboxed browser preview. This panel is created only when opened. It does not send
messages or emulate Gmail/Outlook/Apple Mail; see the [email guide](../../docs/EMAIL.md).

## Architecture

```text
src/app/
  app.component.ts                 Minimal router outlet
  app.routes.ts                    Lazy playground feature route
  app.config*.ts                   Browser/SSR configuration
  features/playground/
    playground.component.*         Editor/form state and feature composition
    toolbar-presets.ts             Public toolbar configuration factory
    data/demo-content.ts           Complete feature-tour document
    data/samples.ts                Named sample documents
  shared/components/document-output/
    document-output.component.*    Typed format selection and clipboard feedback
```

The feature owns the editor reference, reactive control, configuration and import
actions. The output panel receives serialized text and emits a format choice; it
does not access private editor state. Styles stay beside their components. All
library imports use `ngx-editra`. Browser APIs run only on user actions, preserving SSR.

For the static deployment artifact:

```sh
npm run build:site -- playground
```

Successful validation after a merge or push to `main` automatically deploys this app
and the documentation to their separate Vercel projects. Manual GitHub deployments
remain available. See
[deployment setup](../../docs/DEPLOYMENT.md) for secrets, Node runtime separation
and preview/production steps. No local SSR harness is deployed. The editor feature is
lazy-loaded; its route still carries the full demo's editor and rendering dependencies.

Local SSR checks use `npm run build:playground` and `npm run serve:ssr:playground`.
The local SSR harness binds to 127.0.0.1 and uses the modern app toolchain. Public hosting uses static output.
The workspace's MIT [LICENSE](../../LICENSE) applies to this application.
