# Troubleshooting

Start with the symptom below. The live example can help separate application integration issues from editor behavior.

## Installation cannot find ngx-editra

Install the default release with `npm install ngx-editra`. Check registry tags before
assuming `npm install ngx-editra` selects a stable release: `latest` can also point
to an alpha. Check the package name, version and tag before changing your
registry configuration. See [installation](INSTALLATION.md).

## The editor is not recognized

Import NgxEditraComponent into the standalone component or NgModule that owns the template. Import ReactiveFormsModule for formControl/formControlName, or FormsModule for ngModel. Import all public symbols from ngx-editra, without /core or /extensions suffixes.

## The editor looks unstyled

Editor and viewer components include their default styles automatically. Confirm you are using the updated package and restart the application build after upgrading. Check for application CSS overriding `ngx-editra`, `.ProseMirror`, or generic buttons. If Content Security Policy blocks Angular's style elements, configure Angular's style nonce for your application's CSP. The viewer, content directive and HTML pipe load their styles automatically; see [theming](THEMING.md).

## Required validation accepts an empty editor

The HTML string `<p></p>` is not an empty string. Set `[required]="true"` on the editor to enable semantic empty-document validation. Show the form error after touch or submit. See [Forms](ANGULAR_FORMS.md).

## An image or video will not load

Use an absolute public HTTPS URL. Files, base64 data, authenticated local paths, and arbitrary iframe markup are unsupported. Check the browser network panel, application CSP, and the media host's embedding policy. Syntax validation cannot guarantee that a provider allows playback. There is no file upload adapter in the library.

## Media stops resizing after adding an extension

An explicit config.extensions list replaces the default extension list. Include imageExtension() and videoExtension() alongside custom extensions when you want their interactive media node views. See [extensions](PLUGINS.md).

## Saved content loses styles or embeds

Use NgxEditraViewerComponent or the validated HTML pipe with the same configuration as the editor. Plain Angular innerHTML may strip presentation or players. A change to enabled schema features or URL policy can also remove content on normalization. Do not bypass security validation on raw HTML.

## Changing configuration has no effect

Replace the configuration object rather than mutating nested properties. For example, assign `{ ...config, theme: 'dark' }`. The config input replaces application defaults; it is not a deep merge of your previous config. Schema-related changes revalidate content and reset history.

## A code copy button fails

Use HTTPS or localhost and allow clipboard access. Browsers can deny permission; select and copy the text manually when unavailable. Copy controls are not stored inside the saved HTML.

## Server rendering reports document/window errors

Check custom plugins, serializers, and application code for browser-global access during import or server execution. Initialize browser-only behavior after rendering and clean it up on teardown. See [SSR](SSR.md).
