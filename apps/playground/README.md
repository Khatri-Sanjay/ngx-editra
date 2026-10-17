# Playground application

[![npm version](https://img.shields.io/npm/v/ngx-editra?label=npm)](https://www.npmjs.com/package/ngx-editra)
[![npm downloads per month](https://img.shields.io/badge/downloads-pending-lightgrey)](https://www.npmjs.com/package/ngx-editra)
[![License](https://img.shields.io/npm/l/ngx-editra)](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE)

[npm](https://www.npmjs.com/package/ngx-editra) | [Documentation](https://ngx-editra-docs.vercel.app) | [Playground](https://ngx-editra-playground.vercel.app) | [Source](https://github.com/Khatri-Sanjay/ngx-editra) | [Issues](https://github.com/Khatri-Sanjay/ngx-editra/issues)

Run `npm run package:sync` after publication to refresh the published version shared
by both apps. The demo may use a newer development build, labelled separately.

Live site: https://ngx-editra-playground.vercel.app.

The interactive demo imports the compiled public `ngx-editra` package. It is deployed
as a website, separately from npm. Run commands from the repository root using the
documented Node 20.20.2/npm 10 compilation baseline.

```sh
npm ci
npm start
```

Open http://localhost:4200. Use `npm run start:all` for both apps and `npm run watch`
in another terminal when editing library sources.

## Features

Choose a complete tour, blank document, article, or table/code sample. Reset restores
the selected sample. Try toolbar presets, themes, read-only/disabled controls, mount
and unmount, and Reactive Forms state. Inspect or copy HTML, JSON, text and Markdown;
clipboard denial displays a manual-copy fallback. Import HTML/Markdown and compare
directive, pipe and viewer rendering. A separate template-driven editor demonstrates
ngModel. Signal Forms is documented as compatibility guidance, not a verified demo.

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

Use the manual GitHub deployment workflow and a separate Vercel project. See
[deployment setup](../../docs/DEPLOYMENT.md) for secrets, Node runtime separation
and preview/production steps. No Express server is deployed. The editor feature is
lazy-loaded; its route still carries the full demo's editor and rendering dependencies.

Local SSR checks use `npm run build:playground` and `npm run serve:ssr:playground`.
Public SSR hosting requires resolving the legacy dependency audit findings.
The workspace's MIT [LICENSE](../../LICENSE) applies to this application.
