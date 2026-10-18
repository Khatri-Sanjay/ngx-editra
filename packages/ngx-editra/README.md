# ngx-editra

[![npm version](https://img.shields.io/npm/v/ngx-editra?label=npm)](https://www.npmjs.com/package/ngx-editra)
[![npm downloads per month](https://img.shields.io/npm/dm/ngx-editra)](https://www.npmjs.com/package/ngx-editra)
[![License](https://img.shields.io/npm/l/ngx-editra)](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE)

[npm](https://www.npmjs.com/package/ngx-editra) | [Documentation](https://ngx-editra-docs.vercel.app) | [Playground](https://ngx-editra-playground.vercel.app) | [Source](https://github.com/Khatri-Sanjay/ngx-editra) | [Issues](https://github.com/Khatri-Sanjay/ngx-editra/issues)

A standalone Angular rich-text editor built on ProseMirror. Edit rich content,
connect Angular forms, and display saved HTML with included styles.

## Installation

```sh
npm install ngx-editra
```

The 1.0.0 Angular peer range is `>=17.0.0 <23.0.0`, including Angular 22.1.2.
Check the installed version's [Angular requirements](https://ngx-editra-docs.vercel.app/guides/compatibility);
earlier alpha releases use narrower patch minimums.

## Quick start

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxEditraComponent, NgxEditraViewerComponent } from 'ngx-editra';

@Component({
	selector: 'app-article',
	standalone: true,
	imports: [ReactiveFormsModule, NgxEditraComponent, NgxEditraViewerComponent],
	template: `
		<ngx-editra [formControl]="body" />
		<ngx-editra-viewer [html]="body.value" />
	`,
})
export class ArticleComponent {
	readonly body = new FormControl('<p>Hello world</p>', { nonNullable: true });
}
```

The form value is an HTML string. Save it through your application backend. Editor,
viewer, directive and pipe styles load automatically; no Sass import, icon font,
Angular Material or CDK setup is required.

## Forms

Reactive Forms (`formControl`, `formControlName`) and template-driven forms
(`ngModel`, with `FormsModule`) are integration-tested. Set the editor's `required`
input for semantic empty-document validation. Angular 22 Signal Forms can use the
ControlValueAccessor compatibility path; dedicated Signal Forms tests are outstanding.

## Display saved content

-   `<ngx-editra-viewer [html]="savedHtml" />`: import `NgxEditraViewerComponent`.
-   `<div [editraContent]="savedHtml"></div>`: import `EditraContentDirective` for
    validated content, automatic styles and code-copy controls in your own container.
-   `<div [innerHTML]="savedHtml | editraHtml"></div>`: import `EditraHtmlPipe` for
    validated, styled HTML. Add `EditraCodeCopyDirective` and `editraCodeCopy` on the
    container when you need interactive code-copy controls with this pipe.

Configuration is optional. Import all public symbols from `ngx-editra`.

## Features and limits

For email bodies, use `exportEmail(savedHtml)` to produce inline-styled email HTML,
plain text and conversion warnings. See [email export](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/docs/EMAIL.md).
The output targets a conservative Gmail/Outlook/Apple Mail baseline; actual inbox
rendering needs client testing. Normal viewer HTML is not an email template.

Formatting, headings, lists, history, find/replace, font/highlight palettes, tables,
URL images/videos, captions, resizing, columns, code blocks, themes, configurable
toolbars, fullscreen editing, extensions and CommonMark conversion are included.

The library does not provide a backend, uploads, real-time collaboration, PDF/Word
export or syntax highlighting. Markdown cannot retain every HTML formatting detail.
Custom extensions/serializers are trusted application code. Review the
[security policy](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/docs/SECURITY.md)
before accepting untrusted content or configuring external media.

## Documentation and support

-   [Documentation website](https://ngx-editra-docs.vercel.app)
-   [Interactive playground](https://ngx-editra-playground.vercel.app)
-   [Installation and guides](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/docs/INSTALLATION.md)
-   [Forms](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/docs/ANGULAR_FORMS.md)
-   [Public API](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/docs/API.md)
-   [Compatibility](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/docs/COMPATIBILITY.md)
-   [Issues](https://github.com/Khatri-Sanjay/ngx-editra/issues)
-   [Report a vulnerability](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/SECURITY.md)
-   [Changelog](https://github.com/Khatri-Sanjay/ngx-editra/blob/main/CHANGELOG.md)

Stable releases use semantic versioning. Check the changelog before upgrading.

## Licence

MIT. See the included [LICENSE](LICENSE) file. Copyright 2026 ngx-editra contributors.
