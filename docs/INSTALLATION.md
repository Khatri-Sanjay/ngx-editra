# Installation

[npm package and versions](https://www.npmjs.com/package/ngx-editra) ·
[Release channels and download statistics](PACKAGE.md)

Install `ngx-editra` into an existing Angular application, then import its standalone components. Their styles load automatically.

## 1. Check Angular compatibility

Your consuming application needs Angular common, core, forms, and platform-browser packages that satisfy the library's peer ranges. See [compatibility](COMPATIBILITY.md). Use the Node/TypeScript versions required by that application's Angular version.

Version `1.0.0` uses the Angular peer range `>=17.0.0 <23.0.0`, covering stable Angular 17–22 versions,
including 22.1.2. Keep the application's Angular packages aligned. Angular prereleases
and other majors are excluded; use current patched framework releases when possible.
The historical alpha.0 still uses narrower patch minimums. Check npm for release availability before choosing a version.

## 2. Install from npm

```sh
npm install ngx-editra
```

This installs the release tagged `latest`, currently stable 1.0.0. The documentation
and playground may preview the next development patch; check their build label and
the registry tags when comparing behavior.

For a reproducible installation of the current published stable release:

```sh
npm install ngx-editra@1.0.0
```

Run these commands in your application's root. Consumers do not clone this repository, build the library, configure TypeScript path aliases, or install ProseMirror packages separately.

## 3. Add the component

Both components include their default styles. You do not need to edit `styles.scss`,
register a stylesheet in `angular.json`, or install Sass. The content directive and HTML
pipe also load their styles automatically. Optional Sass exports are available for
manually rendered content; see [theming](THEMING.md). Importing the same styles globally
as well can duplicate CSS.

Continue to [Quick start](QUICK_START.md) for a complete standalone component. Import from ngx-editra; there are no separate core/extensions package imports. No Angular Material/CDK or external icon-font setup is required.

The editor is `NgxEditraComponent` with selector `<ngx-editra>`. The read-only renderer is `NgxEditraViewerComponent` with selector `<ngx-editra-viewer [html]="savedHtml" />`. Both are exported from `ngx-editra`; the viewer input is `html`.

## Dependency notes

Angular is a peer dependency rather than a bundled runtime. ProseMirror modules and parse5 are runtime dependencies. Do not force incompatible
ProseMirror versions through package overrides. No Angular Material/CDK dependency is required.
