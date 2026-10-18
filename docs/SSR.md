# SSR and hydration

Use the normal SSR setup for your application's Angular version. The editor can render initial content on the server and becomes interactive in the browser after rendering. You do not need to add fake browser globals.

## Server-safe document processing

The internal core does not require window, document, DOMParser or navigator for document conversion. Public imports come from the single ngx-editra Angular package; there is no separate framework-free core package entry point. parse5 converts HTML to the canonical document on both server and browser.
The deterministic serializer uses escaped strings and validated schema attributes.

## What happens during rendering

The Angular component uses `NgxEditraViewerComponent` for its initial static content.
The viewer parses input through the schema and serializes validated attributes before
marking that canonical output as trusted HTML. This preserves styles and approved video
players on both server and browser. Raw input is never passed to Angular's trust API.
Extensions and video providers remain trusted application code.

The component host has a static `ngSkipHydration` boundary. Angular hydrates the consuming
application, recreates that editor boundary and activates its ProseMirror view afterNextRender.
This deliberately avoids hydrating ProseMirror-managed DOM. Initial form content survives;
static content is removed after activation and an empty browser surface owns the view.

## Application setup and custom extensions

Enable your application's normal `provideClientHydration`/server rendering providers.
Angular 18+ SSR bootstrap functions need the platform BootstrapContext, and patched newer
renderApplication APIs need explicit allowedHosts. The compatibility consumers demonstrate
version-specific server setup. Do not set browser globals on the server to hide errors.

The Angular 22 playground and documentation explicitly use
`provideClientHydration(withNoIncrementalHydration())` from `@angular/platform-browser`.
They retain standard hydration and load deferred demos after interaction. This avoids
retaining repeatedly destroyed editor hosts in incremental event-replay bookkeeping;
the workspace checks repeated DOM/listener and heap growth. Angular 22 enables
incremental hydration by default; applications choosing it should test their own
mount/unmount lifecycle. See [Angular's hydration option](https://angular.dev/api/platform-browser/withNoIncrementalHydration).

Editor DOM methods are no-ops before activation. Conversion/state methods work during SSR.
Extension onCreate/onDestroy callbacks run for browser editor activation/destruction only.
