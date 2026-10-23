# Documentation application

[![npm version](https://img.shields.io/npm/v/ngx-editra?label=npm)](https://www.npmjs.com/package/ngx-editra)
[![npm downloads per month](https://img.shields.io/npm/dm/ngx-editra)](https://www.npmjs.com/package/ngx-editra)
[![License](https://img.shields.io/npm/l/ngx-editra)](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE)

[npm](https://www.npmjs.com/package/ngx-editra) | [Documentation](https://ngx-editra-docs.vercel.app) | [Playground](https://ngx-editra-playground.vercel.app) | [Source](https://github.com/Khatri-Sanjay/ngx-editra) | [Issues](https://github.com/Khatri-Sanjay/ngx-editra/issues)

Run `npm run package:sync` after publication to refresh the published version shared
by both apps. The demo may use a newer development build, labelled separately.

Live site: https://ngx-editra-docs.vercel.app.

Use the root Node 20/npm 10 launcher for library compilation and configure Node 24 for the independent Angular 22 documentation app:

```sh
npm ci
npm run start:docs
```

Open http://localhost:4300. The start command builds the library first so the live example
uses its public distribution entry points.

For production:

```sh
npm run build:docs
npm run serve:ssr:docs
```

The production build prerenders the home page, live example, and all generated guide pages.
`dist/documentation/browser` can be deployed to a static host supporting directory indexes
and an index.html fallback for unknown client-side routes. The SSR server defaults to port 4300;
set PORT to override it.

For GitHub-to-Vercel deployment, use `npm run build:site -- documentation` and the
deployment workflow. Successful validation after a merge or push to `main` deploys
both websites automatically; manual runs remain available. The static browser output is hosted in its own project;
the local SSR harness is not deployed. Follow [deployment setup](../../docs/DEPLOYMENT.md)
for the separate library/compiler and modern app/deployment toolchains and project secrets.
The workspace's MIT [LICENSE](../../LICENSE) applies to this application.

Edit consumer guides selected in `scripts/library-docs.mjs`, CHANGELOG.md or SECURITY.md to update public pages. Workspace policies and deployment instructions remain repository-only.
`npm run docs:generate` converts them to typed page data and regenerates the prerender routes.
Do not edit files in `src/app/content/generated/` directly. Markdown-it is a build-time dependency;
raw HTML is disabled, and Angular sanitizes the rendered guide HTML. The generator rewrites
Markdown guide links to app routes.

The live example imports only public `ngx-editra` exports. Editor code is lazy-loaded when
the examples route opens. Search indexes complete guide text and runs locally.
Theme choice is saved locally when storage is available.
The live example can copy the selected HTML, text, JSON or Markdown output, with
manual-copy guidance when clipboard access is unavailable. Escape closes the mobile
navigation and returns keyboard focus to its Menu button.

## Application architecture

```text
src/
  app/
    app.component.ts         Minimal router outlet and bootstrap identity
    app.config*.ts           Browser and SSR providers
    app.routes.ts            Shared shell with lazy feature routes
    core/
      services/
        docs-theme.service.ts  Shared theme state, DOM updates and persistence
    layout/
      docs-shell/
        docs-shell.component.ts
        docs-shell.component.html
    features/
      home/                  Overview and task-based learning paths
      guides/                Article rendering, table of contents and code copying
      examples/              Live editor, format output and reader preview
    shared/
      components/code-example/  Code headers, exact source copying and local feedback
      models/guide.ts        Guide and navigation contracts
    content/
      generated/
        guides.ts            Full articles loaded with the guide route
        navigation.ts        Lightweight navigation and search index
  styles/
    _theme.scss              Light/dark design tokens
    _base.scss               Document defaults and shared accessibility rules
    _shell.scss              Header, sidebar and search layout
    _overview.scss           Overview and shared presentation patterns
    _guides.scss             Articles, generated Markdown and table of contents
    _examples.scss           Live example and output panels
    _responsive.scss         Cross-page responsive and reduced-motion overrides
  styles.scss                Stylesheet entry point; module order preserves the cascade
  main.ts                    Browser bootstrap
  main.server.ts             SSR bootstrap
```

Feature templates stay beside their components. Shared models do not depend on components;
the theme service does not depend on feature pages. The layout reads only the navigation
index, while the guide route loads full article data. Pages consume the public library API.
Root application files contain configuration and bootstrap wiring rather than page behavior.

Styles remain application-global because generated Markdown is rendered through innerHTML
and several presentation patterns are shared between pages. Splitting Sass modules preserves
their original output order without introducing deep selectors or changing encapsulation.

The generator owns both generated content files and the prerender route list. Update source
Markdown in the root documentation directory and run npm run docs:generate after changes.

Browser checks:

```sh
npx playwright install chromium
npm run test:docs
```

Build the app before testing. The test server uses port 4301 (override with EDITRA_DOCS_PORT)
so development on port 4300 can continue. The checks use production SSR output and cover navigation,
search, theme persistence, mobile navigation, editing/forms behavior, and axe accessibility.
Automated checks do not replace manual assistive-technology evaluation.
