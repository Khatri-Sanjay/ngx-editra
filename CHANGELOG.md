# Changelog

## 1.0.1 - in preparation

-   Export column layouts as validated HTML in Markdown instead of throwing an unsupported-node error.

## 1.0.0 - published

-   Keep table and colour panels open when a queued toolbar scroll event arrives after opening.

-   Add table border colours when inserting or editing tables, preserved in HTML, JSON and email export.

-   Expand Angular peers to `>=17.0.0 <23.0.0`, including Angular 22.1.2.
-   Verify Angular 22 Signal Forms compatibility for HTML values, validation, disabled
    state, dirty/touched state and resets.
-   Refresh semantic required validation after programmatic writes and resets.
-   Keep toolbars compact with two scrollable rows, bounded selector widths and grouped
    insert tools, larger touch targets, clearer active states and shortcut hints.
-   Prepare the first stable release, installed with `npm install ngx-editra`.
-   Group table actions into compact, responsive panels with separate Structure, Appearance,
    and Dimensions views and labelled appearance controls.
-   Keep table resize cursors aligned with the actual handles and clear them in read-only mode.
-   Refine colour, media, and line settings panels; allow alternative text during image insertion.

## 0.1.0-alpha.0 - initial published release

### Editor and forms

-   Standalone `NgxEditraComponent` (`<ngx-editra>`) with HTML-valued Reactive Forms and
    template-driven forms, semantic required validation, disabled/read-only states, typed
    events and an explicit hydration boundary.
-   ProseMirror engine with schema-based HTML/JSON validation, bounded parsing,
    deterministic serialization and configurable URL/media policies.
-   Formatting, headings, lists, alignment, history, find/replace, counts, font/highlight
    palettes, code blocks, tables, media, columns and horizontal lines.
-   Model-backed media/table/column resizing with keyboard controls, cancellation and undo.
-   Responsive toolbar controls, optional pinned/floating toolbars, viewport-contained
    dialogs and palettes, compact colour swatches and fullscreen editing.
-   Programmatic writes reset history; rejected configuration preserves the active editor.
    Import validation includes nested code/captions and divider formatting.

### Saved content and customization

-   `exportEmail` generates separate inline-styled email HTML, plain text and conversion
    warnings, with an Outlook width fallback and stacked column/video-link fallbacks.
    A sandboxed playground preview and client-testing guide accompany the API; real
    Gmail/Outlook/Apple Mail verification remains outstanding.
-   `NgxEditraViewerComponent` (`<ngx-editra-viewer [html]="savedHtml">`) and `[editraContent]`
    for validated, styled saved HTML with code-copy controls.
-   `editraHtml` pipe for validated `[innerHTML]` rendering with automatic styles;
    optional `editraCodeCopy` supplies interactive copy controls for this binding.
-   Included editor/content styles, light/dark/automatic themes, CSS custom properties and
    optional Sass exports. Public renderers do not require manual style imports.
-   Public APIs exported from `ngx-editra`, including the document engine, typed
    configuration, deterministic extensions and CommonMark conversion utilities.

### Documentation and examples

-   Playground and searchable documentation apps with examples, code copying and guides
    generated from the canonical repository Markdown.

Signal Forms can use Angular's ControlValueAccessor compatibility integration, but dedicated
Signal Forms integration tests are outstanding. This alpha does not establish stable-release
acceptance or upstream security support for legacy runtimes.
