// Generated from repository Markdown by scripts/generate-documentation.mjs.
import type { Guide } from '../../shared/models/guide';
export const guides: readonly Guide[] = [
	{
		slug: 'features',
		title: 'Feature overview',
		group: 'Start here',
		source: 'docs/FEATURES.md',
		summary:
			'ngx-editra is a rich-text editor for Angular applications. Writers use a toolbar; your application receives an HTML string through Angular Forms. You can also read the document as JSON, plain text, or Markdown.',
		readingMinutes: 4,
		html: '<h1>Feature overview</h1>\n<p>ngx-editra is a rich-text editor for Angular applications. Writers use a toolbar; your application receives an HTML string through Angular Forms. You can also read the document as JSON, plain text, or Markdown.</p>\n<h2>Start with these three steps</h2>\n<ol>\n<li><a href="/guides/installation">Install the library</a>; component styles load automatically.</li>\n<li><a href="/guides/quick-start">Create your first editor</a>.</li>\n<li><a href="/guides/angular-forms">Connect a form and save its value</a>.</li>\n</ol>\n<p>Open the live example in this documentation to try the real component. The library is an alpha; review <a href="/guides/compatibility">compatibility</a> and <a href="/guides/security">content security</a> before adopting it.</p>\n<h2>What writers can do</h2>\n<table>\n<thead>\n<tr>\n<th>Feature</th>\n<th>What it does</th>\n<th>Learn more</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Text formatting</td>\n<td>Bold, italic, underline, strike, subscript, superscript, and clear formatting</td>\n<td><a href="/guides/formatting">Formatting</a></td>\n</tr>\n<tr>\n<td>Typography</td>\n<td>Headings, fonts, sizes, text colour, highlights, and text-case conversion</td>\n<td><a href="/guides/formatting">Formatting</a></td>\n</tr>\n<tr>\n<td>Paragraph layout</td>\n<td>Alignment, indentation, line spacing, lists, and blockquotes</td>\n<td><a href="/guides/formatting">Formatting</a></td>\n</tr>\n<tr>\n<td>Links</td>\n<td>Insert and edit validated web and email links</td>\n<td><a href="/guides/links">Links</a></td>\n</tr>\n<tr>\n<td>Images</td>\n<td>Insert by URL, add captions, align, resize, and place content beside an image</td>\n<td><a href="/guides/images">Images</a></td>\n</tr>\n<tr>\n<td>Videos</td>\n<td>Embed supported YouTube/Vimeo URLs or play a direct MP4</td>\n<td><a href="/guides/videos">Videos</a></td>\n</tr>\n<tr>\n<td>Tables</td>\n<td>Insert, merge/split cells, add rows/columns, resize, shade, and adjust borders</td>\n<td><a href="/guides/tables">Tables</a></td>\n</tr>\n<tr>\n<td>Columns</td>\n<td>Arrange independent content side by side and resize the divider</td>\n<td><a href="/guides/layout">Columns and lines</a></td>\n</tr>\n<tr>\n<td>Horizontal lines</td>\n<td>Add a divider with a chosen style and weight</td>\n<td><a href="/guides/layout">Columns and lines</a></td>\n</tr>\n<tr>\n<td>Code</td>\n<td>Insert inline code or a code block with a language label and copy control</td>\n<td><a href="/guides/code-blocks">Code blocks</a></td>\n</tr>\n<tr>\n<td>Find and replace</td>\n<td>Find text, move between matches, replace one or all</td>\n<td><a href="/guides/editing-tools">Editing tools</a></td>\n</tr>\n<tr>\n<td>Undo and redo</td>\n<td>Reverse document edits, formatting, and committed resizing operations</td>\n<td><a href="/guides/editing-tools">Editing tools</a></td>\n</tr>\n<tr>\n<td>Workspace tools</td>\n<td>Fullscreen, pinned toolbar, floating selection toolbar, and word/character counts</td>\n<td><a href="/guides/editing-tools">Editing tools</a></td>\n</tr>\n</tbody>\n</table>\n<h2>What application developers can do</h2>\n<table>\n<thead>\n<tr>\n<th>Requirement</th>\n<th>Integration</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Bind an editor to a form</td>\n<td>Reactive Forms, form groups, or ngModel; values stay HTML</td>\n</tr>\n<tr>\n<td>Validate required content</td>\n<td>Set the editor\'s required input for semantic empty-document validation</td>\n</tr>\n<tr>\n<td>Disable editing</td>\n<td>Use the form\'s disable/enable methods, or the readonly input for viewing</td>\n</tr>\n<tr>\n<td>Set application defaults</td>\n<td>provideEditra(config), with per-editor config input overrides</td>\n</tr>\n<tr>\n<td>Match a design system</td>\n<td>Light, dark, or auto themes and CSS custom properties</td>\n</tr>\n<tr>\n<td>Save and restore content</td>\n<td>Read form HTML or explicit JSON conversion methods; use your own backend</td>\n</tr>\n<tr>\n<td>Render saved documents</td>\n<td>NgxEditraViewerComponent, editraContent directive, or editraHtml pipe with automatic styles</td>\n</tr>\n<tr>\n<td>React to editor activity</td>\n<td>Content, selection, ready, destroy, focus, blur, dirty, error, and transaction events</td>\n</tr>\n<tr>\n<td>Add behavior</td>\n<td>Typed extensions with commands, toolbar items, schema contributions, plugins, and node views</td>\n</tr>\n<tr>\n<td>Server-render an application</td>\n<td>Static validated content on the server; browser editing starts after rendering</td>\n</tr>\n</tbody>\n</table>\n<h2>What is not included</h2>\n<p>Use <a href="/guides/email">email export</a> for a separate conservative email HTML/text body with\nconversion warnings. Real Gmail, Outlook and Apple Mail rendering still requires inbox tests.</p>\n<p>The library does not provide a backend, file uploads, cloud storage, collaboration, track changes, PDF/Word export, or syntax highlighting. An image/video URL must already be accessible to the viewer. A valid URL does not guarantee that its host allows embedding.</p>\n<p>HTML and JSON preserve supported document features. Markdown is a conversion format and cannot preserve every colour, font, table, or media detail. See <a href="/guides/content">content and saving</a>.</p>\n',
		headings: [
			{
				id: 'start-with-these-three-steps',
				label: 'Start with these three steps',
			},
			{
				id: 'what-writers-can-do',
				label: 'What writers can do',
			},
			{
				id: 'what-application-developers-can-do',
				label: 'What application developers can do',
			},
			{
				id: 'what-is-not-included',
				label: 'What is not included',
			},
		],
		blocks: [
			{
				html: '<h1>Feature overview</h1>\n',
				id: 'feature-overview',
				kind: 'content',
			},
			{
				html: '<p>ngx-editra is a rich-text editor for Angular applications. Writers use a toolbar; your application receives an HTML string through Angular Forms. You can also read the document as JSON, plain text, or Markdown.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Start with these three steps</h2>\n',
				id: 'start-with-these-three-steps',
				kind: 'content',
			},
			{
				html: '<ol>\n<li><a href="/guides/installation">Install the library</a>; component styles load automatically.</li>\n<li><a href="/guides/quick-start">Create your first editor</a>.</li>\n<li><a href="/guides/angular-forms">Connect a form and save its value</a>.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Open the live example in this documentation to try the real component. The library is an alpha; review <a href="/guides/compatibility">compatibility</a> and <a href="/guides/security">content security</a> before adopting it.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>What writers can do</h2>\n',
				id: 'what-writers-can-do',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Feature</th>\n<th>What it does</th>\n<th>Learn more</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Text formatting</td>\n<td>Bold, italic, underline, strike, subscript, superscript, and clear formatting</td>\n<td><a href="/guides/formatting">Formatting</a></td>\n</tr>\n<tr>\n<td>Typography</td>\n<td>Headings, fonts, sizes, text colour, highlights, and text-case conversion</td>\n<td><a href="/guides/formatting">Formatting</a></td>\n</tr>\n<tr>\n<td>Paragraph layout</td>\n<td>Alignment, indentation, line spacing, lists, and blockquotes</td>\n<td><a href="/guides/formatting">Formatting</a></td>\n</tr>\n<tr>\n<td>Links</td>\n<td>Insert and edit validated web and email links</td>\n<td><a href="/guides/links">Links</a></td>\n</tr>\n<tr>\n<td>Images</td>\n<td>Insert by URL, add captions, align, resize, and place content beside an image</td>\n<td><a href="/guides/images">Images</a></td>\n</tr>\n<tr>\n<td>Videos</td>\n<td>Embed supported YouTube/Vimeo URLs or play a direct MP4</td>\n<td><a href="/guides/videos">Videos</a></td>\n</tr>\n<tr>\n<td>Tables</td>\n<td>Insert, merge/split cells, add rows/columns, resize, shade, and adjust borders</td>\n<td><a href="/guides/tables">Tables</a></td>\n</tr>\n<tr>\n<td>Columns</td>\n<td>Arrange independent content side by side and resize the divider</td>\n<td><a href="/guides/layout">Columns and lines</a></td>\n</tr>\n<tr>\n<td>Horizontal lines</td>\n<td>Add a divider with a chosen style and weight</td>\n<td><a href="/guides/layout">Columns and lines</a></td>\n</tr>\n<tr>\n<td>Code</td>\n<td>Insert inline code or a code block with a language label and copy control</td>\n<td><a href="/guides/code-blocks">Code blocks</a></td>\n</tr>\n<tr>\n<td>Find and replace</td>\n<td>Find text, move between matches, replace one or all</td>\n<td><a href="/guides/editing-tools">Editing tools</a></td>\n</tr>\n<tr>\n<td>Undo and redo</td>\n<td>Reverse document edits, formatting, and committed resizing operations</td>\n<td><a href="/guides/editing-tools">Editing tools</a></td>\n</tr>\n<tr>\n<td>Workspace tools</td>\n<td>Fullscreen, pinned toolbar, floating selection toolbar, and word/character counts</td>\n<td><a href="/guides/editing-tools">Editing tools</a></td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<h2>What application developers can do</h2>\n',
				id: 'what-application-developers-can-do',
				kind: 'content',
			},
			{
				html: "<table>\n<thead>\n<tr>\n<th>Requirement</th>\n<th>Integration</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Bind an editor to a form</td>\n<td>Reactive Forms, form groups, or ngModel; values stay HTML</td>\n</tr>\n<tr>\n<td>Validate required content</td>\n<td>Set the editor's required input for semantic empty-document validation</td>\n</tr>\n<tr>\n<td>Disable editing</td>\n<td>Use the form's disable/enable methods, or the readonly input for viewing</td>\n</tr>\n<tr>\n<td>Set application defaults</td>\n<td>provideEditra(config), with per-editor config input overrides</td>\n</tr>\n<tr>\n<td>Match a design system</td>\n<td>Light, dark, or auto themes and CSS custom properties</td>\n</tr>\n<tr>\n<td>Save and restore content</td>\n<td>Read form HTML or explicit JSON conversion methods; use your own backend</td>\n</tr>\n<tr>\n<td>Render saved documents</td>\n<td>NgxEditraViewerComponent, editraContent directive, or editraHtml pipe with automatic styles</td>\n</tr>\n<tr>\n<td>React to editor activity</td>\n<td>Content, selection, ready, destroy, focus, blur, dirty, error, and transaction events</td>\n</tr>\n<tr>\n<td>Add behavior</td>\n<td>Typed extensions with commands, toolbar items, schema contributions, plugins, and node views</td>\n</tr>\n<tr>\n<td>Server-render an application</td>\n<td>Static validated content on the server; browser editing starts after rendering</td>\n</tr>\n</tbody>\n</table>\n",
				id: '',
				kind: 'table',
			},
			{
				html: '<h2>What is not included</h2>\n',
				id: 'what-is-not-included',
				kind: 'content',
			},
			{
				html: '<p>Use <a href="/guides/email">email export</a> for a separate conservative email HTML/text body with\nconversion warnings. Real Gmail, Outlook and Apple Mail rendering still requires inbox tests.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The library does not provide a backend, file uploads, cloud storage, collaboration, track changes, PDF/Word export, or syntax highlighting. An image/video URL must already be accessible to the viewer. A valid URL does not guarantee that its host allows embedding.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>HTML and JSON preserve supported document features. Markdown is a conversion format and cannot preserve every colour, font, table, or media detail. See <a href="/guides/content">content and saving</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " feature overview\n\nngx-editra is a rich-text editor for angular applications. writers use a toolbar; your application receives an html string through angular forms. you can also read the document as json, plain text, or markdown.\n\n start with these three steps\n\n1. [install the library](installation.md); component styles load automatically.\n2. [create your first editor](quick_start.md).\n3. [connect a form and save its value](angular_forms.md).\n\nopen the live example in this documentation to try the real component. the library is an alpha; review [compatibility](compatibility.md) and [content security](security.md) before adopting it.\n\n what writers can do\n\n| feature          | what it does                                                                      | learn more                        |\n| ---------------- | --------------------------------------------------------------------------------- | --------------------------------- |\n| text formatting  | bold, italic, underline, strike, subscript, superscript, and clear formatting     | [formatting](formatting.md)       |\n| typography       | headings, fonts, sizes, text colour, highlights, and text-case conversion         | [formatting](formatting.md)       |\n| paragraph layout | alignment, indentation, line spacing, lists, and blockquotes                      | [formatting](formatting.md)       |\n| links            | insert and edit validated web and email links                                     | [links](links.md)                 |\n| images           | insert by url, add captions, align, resize, and place content beside an image     | [images](images.md)               |\n| videos           | embed supported youtube/vimeo urls or play a direct mp4                           | [videos](videos.md)               |\n| tables           | insert, merge/split cells, add rows/columns, resize, shade, and adjust borders    | [tables](tables.md)               |\n| columns          | arrange independent content side by side and resize the divider                   | [columns and lines](layout.md)    |\n| horizontal lines | add a divider with a chosen style and weight                                      | [columns and lines](layout.md)    |\n| code             | insert inline code or a code block with a language label and copy control         | [code blocks](code_blocks.md)     |\n| find and replace | find text, move between matches, replace one or all                               | [editing tools](editing_tools.md) |\n| undo and redo    | reverse document edits, formatting, and committed resizing operations             | [editing tools](editing_tools.md) |\n| workspace tools  | fullscreen, pinned toolbar, floating selection toolbar, and word/character counts | [editing tools](editing_tools.md) |\n\n what application developers can do\n\n| requirement                  | integration                                                                                  |\n| ---------------------------- | -------------------------------------------------------------------------------------------- |\n| bind an editor to a form     | reactive forms, form groups, or ngmodel; values stay html                                    |\n| validate required content    | set the editor's required input for semantic empty-document validation                       |\n| disable editing              | use the form's disable/enable methods, or the readonly input for viewing                     |\n| set application defaults     | provideeditra(config), with per-editor config input overrides                                |\n| match a design system        | light, dark, or auto themes and css custom properties                                        |\n| save and restore content     | read form html or explicit json conversion methods; use your own backend                     |\n| render saved documents       | ngxeditraviewercomponent, editracontent directive, or editrahtml pipe with automatic styles  |\n| react to editor activity     | content, selection, ready, destroy, focus, blur, dirty, error, and transaction events        |\n| add behavior                 | typed extensions with commands, toolbar items, schema contributions, plugins, and node views |\n| server-render an application | static validated content on the server; browser editing starts after rendering               |\n\n what is not included\n\nuse [email export](email.md) for a separate conservative email html/text body with\nconversion warnings. real gmail, outlook and apple mail rendering still requires inbox tests.\n\nthe library does not provide a backend, file uploads, cloud storage, collaboration, track changes, pdf/word export, or syntax highlighting. an image/video url must already be accessible to the viewer. a valid url does not guarantee that its host allows embedding.\n\nhtml and json preserve supported document features. markdown is a conversion format and cannot preserve every colour, font, table, or media detail. see [content and saving](content.md).\n",
	},
	{
		slug: 'installation',
		title: 'Installation',
		group: 'Start here',
		source: 'docs/INSTALLATION.md',
		summary: 'npm package and versions ·Release channels and download statistics',
		readingMinutes: 2,
		html: '<h1>Installation</h1>\n<p><a href="https://www.npmjs.com/package/ngx-editra">npm package and versions</a> ·\n<a href="/guides/package">Release channels and download statistics</a></p>\n<p>Install <code>ngx-editra</code> into an existing Angular application, then import its standalone components. Their styles load automatically.</p>\n<h2>1. Check Angular compatibility</h2>\n<p>Your consuming application needs Angular common, core, forms, and platform-browser packages that satisfy the library\'s peer ranges. See <a href="/guides/compatibility">compatibility</a>. Use the Node/TypeScript versions required by that application\'s Angular version.</p>\n<p>Version <code>1.0.0</code> uses the Angular peer range <code>&gt;=17.0.0 &lt;23.0.0</code>, covering stable Angular 17–22 versions,\nincluding 22.1.2. Keep the application\'s Angular packages aligned. Angular prereleases\nand other majors are excluded; use current patched framework releases when possible.\nThe historical alpha.0 still uses narrower patch minimums. Check npm for release availability before choosing a version.</p>\n<h2>2. Install from npm</h2>\n<pre><code class="language-sh">npm install ngx-editra\n</code></pre>\n<p>This installs the release tagged <code>latest</code>, currently stable 1.0.0. The documentation\nand playground may preview the next development patch; check their build label and\nthe registry tags when comparing behavior.</p>\n<p>For a reproducible installation of the current published stable release:</p>\n<pre><code class="language-sh">npm install ngx-editra@1.0.0\n</code></pre>\n<p>Run these commands in your application\'s root. Consumers do not clone this repository, build the library, configure TypeScript path aliases, or install ProseMirror packages separately.</p>\n<h2>3. Add the component</h2>\n<p>Both components include their default styles. You do not need to edit <code>styles.scss</code>,\nregister a stylesheet in <code>angular.json</code>, or install Sass. The content directive and HTML\npipe also load their styles automatically. Optional Sass exports are available for\nmanually rendered content; see <a href="/guides/theming">theming</a>. Importing the same styles globally\nas well can duplicate CSS.</p>\n<p>Continue to <a href="/guides/quick-start">Quick start</a> for a complete standalone component. Import from ngx-editra; there are no separate core/extensions package imports. No Angular Material/CDK or external icon-font setup is required.</p>\n<p>The editor is <code>NgxEditraComponent</code> with selector <code>&lt;ngx-editra&gt;</code>. The read-only renderer is <code>NgxEditraViewerComponent</code> with selector <code>&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot; /&gt;</code>. Both are exported from <code>ngx-editra</code>; the viewer input is <code>html</code>.</p>\n<h2>Dependency notes</h2>\n<p>Angular is a peer dependency rather than a bundled runtime. ProseMirror modules and parse5 are runtime dependencies. Do not force incompatible\nProseMirror versions through package overrides. No Angular Material/CDK dependency is required.</p>\n',
		headings: [
			{
				id: '1-check-angular-compatibility',
				label: '1. Check Angular compatibility',
			},
			{
				id: '2-install-from-npm',
				label: '2. Install from npm',
			},
			{
				id: '3-add-the-component',
				label: '3. Add the component',
			},
			{
				id: 'dependency-notes',
				label: 'Dependency notes',
			},
		],
		blocks: [
			{
				html: '<h1>Installation</h1>\n',
				id: 'installation',
				kind: 'content',
			},
			{
				html: '<p><a href="https://www.npmjs.com/package/ngx-editra">npm package and versions</a> ·\n<a href="/guides/package">Release channels and download statistics</a></p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Install <code>ngx-editra</code> into an existing Angular application, then import its standalone components. Their styles load automatically.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>1. Check Angular compatibility</h2>\n',
				id: '1-check-angular-compatibility',
				kind: 'content',
			},
			{
				html: '<p>Your consuming application needs Angular common, core, forms, and platform-browser packages that satisfy the library\'s peer ranges. See <a href="/guides/compatibility">compatibility</a>. Use the Node/TypeScript versions required by that application\'s Angular version.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Version <code>1.0.0</code> uses the Angular peer range <code>&gt;=17.0.0 &lt;23.0.0</code>, covering stable Angular 17–22 versions,\nincluding 22.1.2. Keep the application's Angular packages aligned. Angular prereleases\nand other majors are excluded; use current patched framework releases when possible.\nThe historical alpha.0 still uses narrower patch minimums. Check npm for release availability before choosing a version.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>2. Install from npm</h2>\n',
				id: '2-install-from-npm',
				kind: 'content',
			},
			{
				code: 'npm install ngx-editra\n',
				language: 'sh',
				html: '<pre><code class="language-sh">npm install ngx-editra\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>This installs the release tagged <code>latest</code>, currently stable 1.0.0. The documentation\nand playground may preview the next development patch; check their build label and\nthe registry tags when comparing behavior.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>For a reproducible installation of the current published stable release:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: 'npm install ngx-editra@1.0.0\n',
				language: 'sh',
				html: '<pre><code class="language-sh">npm install ngx-editra@1.0.0\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: "<p>Run these commands in your application's root. Consumers do not clone this repository, build the library, configure TypeScript path aliases, or install ProseMirror packages separately.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>3. Add the component</h2>\n',
				id: '3-add-the-component',
				kind: 'content',
			},
			{
				html: '<p>Both components include their default styles. You do not need to edit <code>styles.scss</code>,\nregister a stylesheet in <code>angular.json</code>, or install Sass. The content directive and HTML\npipe also load their styles automatically. Optional Sass exports are available for\nmanually rendered content; see <a href="/guides/theming">theming</a>. Importing the same styles globally\nas well can duplicate CSS.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Continue to <a href="/guides/quick-start">Quick start</a> for a complete standalone component. Import from ngx-editra; there are no separate core/extensions package imports. No Angular Material/CDK or external icon-font setup is required.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The editor is <code>NgxEditraComponent</code> with selector <code>&lt;ngx-editra&gt;</code>. The read-only renderer is <code>NgxEditraViewerComponent</code> with selector <code>&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot; /&gt;</code>. Both are exported from <code>ngx-editra</code>; the viewer input is <code>html</code>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Dependency notes</h2>\n',
				id: 'dependency-notes',
				kind: 'content',
			},
			{
				html: '<p>Angular is a peer dependency rather than a bundled runtime. ProseMirror modules and parse5 are runtime dependencies. Do not force incompatible\nProseMirror versions through package overrides. No Angular Material/CDK dependency is required.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " installation\n\n[npm package and versions](https://www.npmjs.com/package/ngx-editra) ·\n[release channels and download statistics](package.md)\n\ninstall ngx-editra into an existing angular application, then import its standalone components. their styles load automatically.\n\n 1. check angular compatibility\n\nyour consuming application needs angular common, core, forms, and platform-browser packages that satisfy the library's peer ranges. see [compatibility](compatibility.md). use the node/typescript versions required by that application's angular version.\n\nversion 1.0.0 uses the angular peer range >=17.0.0 <23.0.0, covering stable angular 17–22 versions,\nincluding 22.1.2. keep the application's angular packages aligned. angular prereleases\nand other majors are excluded; use current patched framework releases when possible.\nthe historical alpha.0 still uses narrower patch minimums. check npm for release availability before choosing a version.\n\n 2. install from npm\n\nsh\nnpm install ngx-editra\n\n\nthis installs the release tagged latest, currently stable 1.0.0. the documentation\nand playground may preview the next development patch; check their build label and\nthe registry tags when comparing behavior.\n\nfor a reproducible installation of the current published stable release:\n\nsh\nnpm install ngx-editra@1.0.0\n\n\nrun these commands in your application's root. consumers do not clone this repository, build the library, configure typescript path aliases, or install prosemirror packages separately.\n\n 3. add the component\n\nboth components include their default styles. you do not need to edit styles.scss,\nregister a stylesheet in angular.json, or install sass. the content directive and html\npipe also load their styles automatically. optional sass exports are available for\nmanually rendered content; see [theming](theming.md). importing the same styles globally\nas well can duplicate css.\n\ncontinue to [quick start](quick_start.md) for a complete standalone component. import from ngx-editra; there are no separate core/extensions package imports. no angular material/cdk or external icon-font setup is required.\n\nthe editor is ngxeditracomponent with selector <ngx-editra>. the read-only renderer is ngxeditraviewercomponent with selector <ngx-editra-viewer [html]=\"savedhtml\" />. both are exported from ngx-editra; the viewer input is html.\n\n dependency notes\n\nangular is a peer dependency rather than a bundled runtime. prosemirror modules and parse5 are runtime dependencies. do not force incompatible\nprosemirror versions through package overrides. no angular material/cdk dependency is required.\n",
	},
	{
		slug: 'package',
		title: 'npm package',
		group: 'Start here',
		source: 'docs/PACKAGE.md',
		summary: 'npm versionnpm downloads per monthLicense',
		readingMinutes: 1,
		html: '<h1>npm package</h1>\n<p><a href="https://www.npmjs.com/package/ngx-editra"><img src="https://img.shields.io/npm/v/ngx-editra?label=npm" alt="npm version"></a>\n<a href="https://www.npmjs.com/package/ngx-editra"><img src="https://img.shields.io/npm/dm/ngx-editra" alt="npm downloads per month"></a>\n<a href="https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/ngx-editra" alt="License"></a></p>\n<p>Install the published package from <a href="https://www.npmjs.com/package/ngx-editra">npm</a>:</p>\n<pre><code class="language-sh">npm install ngx-editra\n</code></pre>\n<p>The version badge follows npm\'s <code>latest</code> tag, not the development manifest. Monthly\ndownloads come from Shields.io using npm statistics. A new package can show\npending data while npm reports catch up. The download badge shows pending until npm statistics are available.\nCounts cover the whole package,\nnot unique users or downloads of a specific version.</p>\n<h2>Versions and channels</h2>\n<p>Version <code>1.0.0</code> is published on <code>latest</code>; <code>1.0.1</code> is the development candidate.\n<code>next</code> is the prerelease channel. <code>latest</code> is a registry tag; it does not guarantee\na stable release. Check the registry before choosing a version:</p>\n<pre><code class="language-sh">npm view ngx-editra dist-tags\nnpm view ngx-editra@latest version peerDependencies\nnpm view ngx-editra versions --json\n</code></pre>\n<p>Use an exact published version for reproducible installs. Check that version\'s\nAngular peer dependencies: the development branch may support a wider range than\nan older npm release. See <a href="/guides/compatibility">compatibility</a>,\n<a href="/guides/installation">installation</a>, and the <a href="/guides/changelog">changelog</a>.</p>\n<h2>Project links</h2>\n<ul>\n<li><a href="https://www.npmjs.com/package/ngx-editra">npm package, versions and download chart</a></li>\n<li><a href="https://ngx-editra-docs.vercel.app">Documentation</a></li>\n<li><a href="https://ngx-editra-playground.vercel.app">Playground</a></li>\n<li><a href="https://github.com/Khatri-Sanjay/ngx-editra">Source</a></li>\n<li><a href="https://github.com/Khatri-Sanjay/ngx-editra/issues">Issues</a></li>\n<li><a href="https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE">MIT license</a></li>\n</ul>\n',
		headings: [
			{
				id: 'versions-and-channels',
				label: 'Versions and channels',
			},
			{
				id: 'project-links',
				label: 'Project links',
			},
		],
		blocks: [
			{
				html: '<h1>npm package</h1>\n',
				id: 'npm-package',
				kind: 'content',
			},
			{
				html: '<p><a href="https://www.npmjs.com/package/ngx-editra"><img src="https://img.shields.io/npm/v/ngx-editra?label=npm" alt="npm version"></a>\n<a href="https://www.npmjs.com/package/ngx-editra"><img src="https://img.shields.io/npm/dm/ngx-editra" alt="npm downloads per month"></a>\n<a href="https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/ngx-editra" alt="License"></a></p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Install the published package from <a href="https://www.npmjs.com/package/ngx-editra">npm</a>:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: 'npm install ngx-editra\n',
				language: 'sh',
				html: '<pre><code class="language-sh">npm install ngx-editra\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: "<p>The version badge follows npm's <code>latest</code> tag, not the development manifest. Monthly\ndownloads come from Shields.io using npm statistics. A new package can show\npending data while npm reports catch up. The download badge shows pending until npm statistics are available.\nCounts cover the whole package,\nnot unique users or downloads of a specific version.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Versions and channels</h2>\n',
				id: 'versions-and-channels',
				kind: 'content',
			},
			{
				html: '<p>Version <code>1.0.0</code> is published on <code>latest</code>; <code>1.0.1</code> is the development candidate.\n<code>next</code> is the prerelease channel. <code>latest</code> is a registry tag; it does not guarantee\na stable release. Check the registry before choosing a version:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: 'npm view ngx-editra dist-tags\nnpm view ngx-editra@latest version peerDependencies\nnpm view ngx-editra versions --json\n',
				language: 'sh',
				html: '<pre><code class="language-sh">npm view ngx-editra dist-tags\nnpm view ngx-editra@latest version peerDependencies\nnpm view ngx-editra versions --json\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Use an exact published version for reproducible installs. Check that version\'s\nAngular peer dependencies: the development branch may support a wider range than\nan older npm release. See <a href="/guides/compatibility">compatibility</a>,\n<a href="/guides/installation">installation</a>, and the <a href="/guides/changelog">changelog</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Project links</h2>\n',
				id: 'project-links',
				kind: 'content',
			},
			{
				html: '<ul>\n<li><a href="https://www.npmjs.com/package/ngx-editra">npm package, versions and download chart</a></li>\n<li><a href="https://ngx-editra-docs.vercel.app">Documentation</a></li>\n<li><a href="https://ngx-editra-playground.vercel.app">Playground</a></li>\n<li><a href="https://github.com/Khatri-Sanjay/ngx-editra">Source</a></li>\n<li><a href="https://github.com/Khatri-Sanjay/ngx-editra/issues">Issues</a></li>\n<li><a href="https://github.com/Khatri-Sanjay/ngx-editra/blob/main/LICENSE">MIT license</a></li>\n</ul>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " npm package\n\n[![npm version](https://img.shields.io/npm/v/ngx-editra?label=npm)](https://www.npmjs.com/package/ngx-editra)\n[![npm downloads per month](https://img.shields.io/npm/dm/ngx-editra)](https://www.npmjs.com/package/ngx-editra)\n[![license](https://img.shields.io/npm/l/ngx-editra)](https://github.com/khatri-sanjay/ngx-editra/blob/main/license)\n\ninstall the published package from [npm](https://www.npmjs.com/package/ngx-editra):\n\nsh\nnpm install ngx-editra\n\n\nthe version badge follows npm's latest tag, not the development manifest. monthly\ndownloads come from shields.io using npm statistics. a new package can show\npending data while npm reports catch up. the download badge shows pending until npm statistics are available.\ncounts cover the whole package,\nnot unique users or downloads of a specific version.\n\n versions and channels\n\nversion 1.0.0 is published on latest; 1.0.1 is the development candidate.\nnext is the prerelease channel. latest is a registry tag; it does not guarantee\na stable release. check the registry before choosing a version:\n\nsh\nnpm view ngx-editra dist-tags\nnpm view ngx-editra@latest version peerdependencies\nnpm view ngx-editra versions --json\n\n\nuse an exact published version for reproducible installs. check that version's\nangular peer dependencies: the development branch may support a wider range than\nan older npm release. see [compatibility](compatibility.md),\n[installation](installation.md), and the [changelog](../changelog.md).\n\n project links\n\n-   [npm package, versions and download chart](https://www.npmjs.com/package/ngx-editra)\n-   [documentation](https://ngx-editra-docs.vercel.app)\n-   [playground](https://ngx-editra-playground.vercel.app)\n-   [source](https://github.com/khatri-sanjay/ngx-editra)\n-   [issues](https://github.com/khatri-sanjay/ngx-editra/issues)\n-   [mit license](https://github.com/khatri-sanjay/ngx-editra/blob/main/license)\n",
	},
	{
		slug: 'quick-start',
		title: 'Quick start',
		group: 'Start here',
		source: 'docs/QUICK_START.md',
		summary:
			'Create a standalone component with a non-nullable HTML form control. After this guide, you will have a working editor that updates that control as you type.',
		readingMinutes: 2,
		html: '<h1>Quick start</h1>\n<p>Create a standalone component with a non-nullable HTML form control. After this guide, you will have a working editor that updates that control as you type.</p>\n<h2>1. Complete installation</h2>\n<p><a href="/guides/installation">Install ngx-editra</a> first. Styles are included automatically. The editor needs ReactiveFormsModule for the formControl binding and NgxEditraComponent for its selector.</p>\n<h2>2. Add this component</h2>\n<pre><code class="language-typescript">import { Component } from \'@angular/core\';\nimport { FormControl, ReactiveFormsModule } from \'@angular/forms\';\nimport { NgxEditraComponent } from \'ngx-editra\';\n\n@Component({\n\tselector: \'app-example\',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `&lt;ngx-editra [formControl]=&quot;body&quot; /&gt;`,\n})\nexport class ExampleComponent {\n\treadonly body = new FormControl(\'&lt;p&gt;Hello &lt;strong&gt;world&lt;/strong&gt;&lt;/p&gt;\', { nonNullable: true });\n}\n</code></pre>\n<p>Render app-example from a parent component that imports ExampleComponent, or use this pattern in your application\'s existing root component. Do not replace your application\'s bootstrap setup simply to add an editor.</p>\n<h2>3. Try an edit</h2>\n<p>Select world and click Bold, type another paragraph, or insert a list. The body control contains the updated HTML. Read body.value when saving. Use body.setValue(...) to load another HTML document and body.reset(...) to restore a draft.</p>\n<p>For a temporary local preview in this same component, add <code>&lt;pre&gt;{{ body.value }}&lt;/pre&gt;</code> after the editor. Render saved content for readers with the <a href="/guides/viewer">viewer</a>.</p>\n<h2>4. Configure and validate</h2>\n<p>Add <code>[config]=&quot;config&quot;</code> when you need a typed <a href="/guides/configuration">configuration</a>. Add <code>[required]=&quot;true&quot;</code> for meaningful empty-document validation. See <a href="/guides/angular-forms">Forms</a> for a complete form-group example and <a href="/guides/content">content and saving</a> for persistence.</p>\n<h2>What you should see</h2>\n<p>A toolbar, an editable document, and a stable HTML form value. If the component is missing or unstyled, follow <a href="/guides/troubleshooting">troubleshooting</a>. Open the documentation\'s live example to compare a working integration.</p>\n',
		headings: [
			{
				id: '1-complete-installation',
				label: '1. Complete installation',
			},
			{
				id: '2-add-this-component',
				label: '2. Add this component',
			},
			{
				id: '3-try-an-edit',
				label: '3. Try an edit',
			},
			{
				id: '4-configure-and-validate',
				label: '4. Configure and validate',
			},
			{
				id: 'what-you-should-see',
				label: 'What you should see',
			},
		],
		blocks: [
			{
				html: '<h1>Quick start</h1>\n',
				id: 'quick-start',
				kind: 'content',
			},
			{
				html: '<p>Create a standalone component with a non-nullable HTML form control. After this guide, you will have a working editor that updates that control as you type.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>1. Complete installation</h2>\n',
				id: '1-complete-installation',
				kind: 'content',
			},
			{
				html: '<p><a href="/guides/installation">Install ngx-editra</a> first. Styles are included automatically. The editor needs ReactiveFormsModule for the formControl binding and NgxEditraComponent for its selector.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>2. Add this component</h2>\n',
				id: '2-add-this-component',
				kind: 'content',
			},
			{
				code: "import { Component } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { NgxEditraComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-example',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `<ngx-editra [formControl]=\"body\" />`,\n})\nexport class ExampleComponent {\n\treadonly body = new FormControl('<p>Hello <strong>world</strong></p>', { nonNullable: true });\n}\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { NgxEditraComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-example',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `&lt;ngx-editra [formControl]=&quot;body&quot; /&gt;`,\n})\nexport class ExampleComponent {\n\treadonly body = new FormControl('&lt;p&gt;Hello &lt;strong&gt;world&lt;/strong&gt;&lt;/p&gt;', { nonNullable: true });\n}\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: "<p>Render app-example from a parent component that imports ExampleComponent, or use this pattern in your application's existing root component. Do not replace your application's bootstrap setup simply to add an editor.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>3. Try an edit</h2>\n',
				id: '3-try-an-edit',
				kind: 'content',
			},
			{
				html: '<p>Select world and click Bold, type another paragraph, or insert a list. The body control contains the updated HTML. Read body.value when saving. Use body.setValue(...) to load another HTML document and body.reset(...) to restore a draft.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>For a temporary local preview in this same component, add <code>&lt;pre&gt;{{ body.value }}&lt;/pre&gt;</code> after the editor. Render saved content for readers with the <a href="/guides/viewer">viewer</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>4. Configure and validate</h2>\n',
				id: '4-configure-and-validate',
				kind: 'content',
			},
			{
				html: '<p>Add <code>[config]=&quot;config&quot;</code> when you need a typed <a href="/guides/configuration">configuration</a>. Add <code>[required]=&quot;true&quot;</code> for meaningful empty-document validation. See <a href="/guides/angular-forms">Forms</a> for a complete form-group example and <a href="/guides/content">content and saving</a> for persistence.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>What you should see</h2>\n',
				id: 'what-you-should-see',
				kind: 'content',
			},
			{
				html: '<p>A toolbar, an editable document, and a stable HTML form value. If the component is missing or unstyled, follow <a href="/guides/troubleshooting">troubleshooting</a>. Open the documentation\'s live example to compare a working integration.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " quick start\n\ncreate a standalone component with a non-nullable html form control. after this guide, you will have a working editor that updates that control as you type.\n\n 1. complete installation\n\n[install ngx-editra](installation.md) first. styles are included automatically. the editor needs reactiveformsmodule for the formcontrol binding and ngxeditracomponent for its selector.\n\n 2. add this component\n\ntypescript\nimport { component } from '@angular/core';\nimport { formcontrol, reactiveformsmodule } from '@angular/forms';\nimport { ngxeditracomponent } from 'ngx-editra';\n\n@component({\n\tselector: 'app-example',\n\tstandalone: true,\n\timports: [reactiveformsmodule, ngxeditracomponent],\n\ttemplate: <ngx-editra [formcontrol]=\"body\" />,\n})\nexport class examplecomponent {\n\treadonly body = new formcontrol('<p>hello <strong>world</strong></p>', { nonnullable: true });\n}\n\n\nrender app-example from a parent component that imports examplecomponent, or use this pattern in your application's existing root component. do not replace your application's bootstrap setup simply to add an editor.\n\n 3. try an edit\n\nselect world and click bold, type another paragraph, or insert a list. the body control contains the updated html. read body.value when saving. use body.setvalue(...) to load another html document and body.reset(...) to restore a draft.\n\nfor a temporary local preview in this same component, add <pre>{{ body.value }}</pre> after the editor. render saved content for readers with the [viewer](viewer.md).\n\n 4. configure and validate\n\nadd [config]=\"config\" when you need a typed [configuration](configuration.md). add [required]=\"true\" for meaningful empty-document validation. see [forms](angular_forms.md) for a complete form-group example and [content and saving](content.md) for persistence.\n\n what you should see\n\na toolbar, an editable document, and a stable html form value. if the component is missing or unstyled, follow [troubleshooting](troubleshooting.md). open the documentation's live example to compare a working integration.\n",
	},
	{
		slug: 'configuration',
		title: 'Configuration',
		group: 'Build with Editra',
		source: 'docs/CONFIGURATION.md',
		summary:
			'Use configuration to control presentation, document features, and input policy. Keep the configuration object stable during ordinary change detection; replace it deliberately when an option changes.',
		readingMinutes: 3,
		html: "<h1>Configuration</h1>\n<p>Use configuration to control presentation, document features, and input policy. Keep the configuration object stable during ordinary change detection; replace it deliberately when an option changes.</p>\n<h2>Bind configuration to the editor</h2>\n<pre><code class=\"language-html\">&lt;ngx-editra [formControl]=&quot;body&quot; [config]=&quot;editorConfig&quot; /&gt;\n</code></pre>\n<p>Declare editorConfig on the owning component, using the typed example below.</p>\n<p><code>EditraConfig</code> is exported from <code>ngx-editra</code>; all detailed types are also exported from\n<code>ngx-editra</code>. Use an immutable config object. Example:</p>\n<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const editorConfig: EditraConfig = {\n\ttheme: 'auto',\n\tplaceholder: 'Write a description…',\n\tminHeight: 240,\n\timage: { enabled: true, pasteUrls: false },\n\tvideo: { enabled: true },\n\ttable: { enabled: true, maxRows: 50, maxColumns: 20 },\n\tsecurity: { allowHttp: false, maxInputLength: 1_000_000 },\n};\n</code></pre>\n<p>Defaults: light theme, 180px minimum height, spellcheck on, media/tables enabled,\nHTTPS policy, one million HTML/JSON input characters. <code>readonly</code>, <code>autofocus</code> and\n<code>maxHeight</code> are optional. Finite non-negative bounds are checked by <code>normalizeConfig</code>.</p>\n<p>Application defaults can be provided with <code>provideEditra(config)</code> from <code>ngx-editra</code>.\nAn editor's input replaces those defaults. Core <code>normalizeConfig</code> fills built-in defaults.\nChanging theme/layout/read-only does not recreate the editor view. Schema, security, provider\nor extension changes reconfigure document state, reset history and revalidate existing HTML.\nDisabling a schema feature can remove that feature's existing content.</p>\n<p>Output formats are explicit conversions; config changes never silently change form value types.</p>\n<h2>Configuration reference</h2>\n<table>\n<thead>\n<tr>\n<th>Option</th>\n<th>Default / meaning</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>placeholder</td>\n<td>Start writing… when the document is empty</td>\n</tr>\n<tr>\n<td>minHeight</td>\n<td>180 pixels</td>\n</tr>\n<tr>\n<td>maxHeight</td>\n<td>Optional; must be at least minHeight</td>\n</tr>\n<tr>\n<td>theme</td>\n<td>light; also dark or auto</td>\n</tr>\n<tr>\n<td>readonly</td>\n<td>Prevent editing without changing the document format</td>\n</tr>\n<tr>\n<td>autofocus</td>\n<td>Optional browser focus after activation</td>\n</tr>\n<tr>\n<td>spellcheck</td>\n<td>true</td>\n</tr>\n<tr>\n<td>toolbar.hidden</td>\n<td>Hide the toolbar; this does not remove schema features</td>\n</tr>\n<tr>\n<td>toolbar.items / groups</td>\n<td>Replace command buttons or organize them into labelled groups</td>\n</tr>\n<tr>\n<td>toolbar.hiddenItems</td>\n<td>Hide command IDs or formatting-control labels</td>\n</tr>\n<tr>\n<td>toolbar.overflow</td>\n<td>wrap or scroll</td>\n</tr>\n<tr>\n<td>toolbar.floating</td>\n<td>Enable a selection toolbar</td>\n</tr>\n<tr>\n<td>toolbar.sticky / stickyOffset</td>\n<td>Pin the toolbar; optional application-header offset in pixels</td>\n</tr>\n<tr>\n<td>image.enabled / pasteUrls</td>\n<td>Allow image nodes / optionally turn plain supported image URLs into media</td>\n</tr>\n<tr>\n<td>video.enabled / providers</td>\n<td>Allow video nodes / register trusted provider functions</td>\n</tr>\n<tr>\n<td>table.enabled / maxRows / maxColumns</td>\n<td>Allow tables; insertion bounds default to 50 rows and 20 columns</td>\n</tr>\n<tr>\n<td>security.allowHttp</td>\n<td>false; HTTPS is the default URL policy</td>\n</tr>\n<tr>\n<td>security.maxInputLength</td>\n<td>1,000,000 input characters</td>\n</tr>\n<tr>\n<td>extensions</td>\n<td>Trusted extension list; an explicit list replaces default media extensions</td>\n</tr>\n</tbody>\n</table>\n<h2>Application-wide defaults</h2>\n<pre><code class=\"language-typescript\">import { provideEditra } from 'ngx-editra';\n\n// Add to your application's providers:\nexport const editorDefaults = provideEditra({ theme: 'auto', minHeight: 240 });\n</code></pre>\n<p>An editor's config input replaces these application defaults rather than deeply merging with them. Built-in normalization still supplies missing built-in defaults. Do not create a fresh config object inline in the template on every check.</p>\n<p>To change only presentation, assign a new object, for example <code>this.editorConfig = { ...this.editorConfig, theme: 'dark' };</code>. Keep the field mutable if your application updates it. Schema or security changes can alter existing content; make them intentional user/application actions.</p>\n",
		headings: [
			{
				id: 'bind-configuration-to-the-editor',
				label: 'Bind configuration to the editor',
			},
			{
				id: 'configuration-reference',
				label: 'Configuration reference',
			},
			{
				id: 'application-wide-defaults',
				label: 'Application-wide defaults',
			},
		],
		blocks: [
			{
				html: '<h1>Configuration</h1>\n',
				id: 'configuration',
				kind: 'content',
			},
			{
				html: '<p>Use configuration to control presentation, document features, and input policy. Keep the configuration object stable during ordinary change detection; replace it deliberately when an option changes.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Bind configuration to the editor</h2>\n',
				id: 'bind-configuration-to-the-editor',
				kind: 'content',
			},
			{
				code: '<ngx-editra [formControl]="body" [config]="editorConfig" />\n',
				language: 'html',
				html: '<pre><code class="language-html">&lt;ngx-editra [formControl]=&quot;body&quot; [config]=&quot;editorConfig&quot; /&gt;\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Declare editorConfig on the owning component, using the typed example below.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p><code>EditraConfig</code> is exported from <code>ngx-editra</code>; all detailed types are also exported from\n<code>ngx-editra</code>. Use an immutable config object. Example:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "import type { EditraConfig } from 'ngx-editra';\nexport const editorConfig: EditraConfig = {\n\ttheme: 'auto',\n\tplaceholder: 'Write a description…',\n\tminHeight: 240,\n\timage: { enabled: true, pasteUrls: false },\n\tvideo: { enabled: true },\n\ttable: { enabled: true, maxRows: 50, maxColumns: 20 },\n\tsecurity: { allowHttp: false, maxInputLength: 1_000_000 },\n};\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const editorConfig: EditraConfig = {\n\ttheme: 'auto',\n\tplaceholder: 'Write a description…',\n\tminHeight: 240,\n\timage: { enabled: true, pasteUrls: false },\n\tvideo: { enabled: true },\n\ttable: { enabled: true, maxRows: 50, maxColumns: 20 },\n\tsecurity: { allowHttp: false, maxInputLength: 1_000_000 },\n};\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Defaults: light theme, 180px minimum height, spellcheck on, media/tables enabled,\nHTTPS policy, one million HTML/JSON input characters. <code>readonly</code>, <code>autofocus</code> and\n<code>maxHeight</code> are optional. Finite non-negative bounds are checked by <code>normalizeConfig</code>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Application defaults can be provided with <code>provideEditra(config)</code> from <code>ngx-editra</code>.\nAn editor's input replaces those defaults. Core <code>normalizeConfig</code> fills built-in defaults.\nChanging theme/layout/read-only does not recreate the editor view. Schema, security, provider\nor extension changes reconfigure document state, reset history and revalidate existing HTML.\nDisabling a schema feature can remove that feature's existing content.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Output formats are explicit conversions; config changes never silently change form value types.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Configuration reference</h2>\n',
				id: 'configuration-reference',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Option</th>\n<th>Default / meaning</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>placeholder</td>\n<td>Start writing… when the document is empty</td>\n</tr>\n<tr>\n<td>minHeight</td>\n<td>180 pixels</td>\n</tr>\n<tr>\n<td>maxHeight</td>\n<td>Optional; must be at least minHeight</td>\n</tr>\n<tr>\n<td>theme</td>\n<td>light; also dark or auto</td>\n</tr>\n<tr>\n<td>readonly</td>\n<td>Prevent editing without changing the document format</td>\n</tr>\n<tr>\n<td>autofocus</td>\n<td>Optional browser focus after activation</td>\n</tr>\n<tr>\n<td>spellcheck</td>\n<td>true</td>\n</tr>\n<tr>\n<td>toolbar.hidden</td>\n<td>Hide the toolbar; this does not remove schema features</td>\n</tr>\n<tr>\n<td>toolbar.items / groups</td>\n<td>Replace command buttons or organize them into labelled groups</td>\n</tr>\n<tr>\n<td>toolbar.hiddenItems</td>\n<td>Hide command IDs or formatting-control labels</td>\n</tr>\n<tr>\n<td>toolbar.overflow</td>\n<td>wrap or scroll</td>\n</tr>\n<tr>\n<td>toolbar.floating</td>\n<td>Enable a selection toolbar</td>\n</tr>\n<tr>\n<td>toolbar.sticky / stickyOffset</td>\n<td>Pin the toolbar; optional application-header offset in pixels</td>\n</tr>\n<tr>\n<td>image.enabled / pasteUrls</td>\n<td>Allow image nodes / optionally turn plain supported image URLs into media</td>\n</tr>\n<tr>\n<td>video.enabled / providers</td>\n<td>Allow video nodes / register trusted provider functions</td>\n</tr>\n<tr>\n<td>table.enabled / maxRows / maxColumns</td>\n<td>Allow tables; insertion bounds default to 50 rows and 20 columns</td>\n</tr>\n<tr>\n<td>security.allowHttp</td>\n<td>false; HTTPS is the default URL policy</td>\n</tr>\n<tr>\n<td>security.maxInputLength</td>\n<td>1,000,000 input characters</td>\n</tr>\n<tr>\n<td>extensions</td>\n<td>Trusted extension list; an explicit list replaces default media extensions</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<h2>Application-wide defaults</h2>\n',
				id: 'application-wide-defaults',
				kind: 'content',
			},
			{
				code: "import { provideEditra } from 'ngx-editra';\n\n// Add to your application's providers:\nexport const editorDefaults = provideEditra({ theme: 'auto', minHeight: 240 });\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { provideEditra } from 'ngx-editra';\n\n// Add to your application's providers:\nexport const editorDefaults = provideEditra({ theme: 'auto', minHeight: 240 });\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: "<p>An editor's config input replaces these application defaults rather than deeply merging with them. Built-in normalization still supplies missing built-in defaults. Do not create a fresh config object inline in the template on every check.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: "<p>To change only presentation, assign a new object, for example <code>this.editorConfig = { ...this.editorConfig, theme: 'dark' };</code>. Keep the field mutable if your application updates it. Schema or security changes can alter existing content; make them intentional user/application actions.</p>\n",
				id: '',
				kind: 'content',
			},
		],
		search: " configuration\n\nuse configuration to control presentation, document features, and input policy. keep the configuration object stable during ordinary change detection; replace it deliberately when an option changes.\n\n bind configuration to the editor\n\nhtml\n<ngx-editra [formcontrol]=\"body\" [config]=\"editorconfig\" />\n\n\ndeclare editorconfig on the owning component, using the typed example below.\n\neditraconfig is exported from ngx-editra; all detailed types are also exported from\nngx-editra. use an immutable config object. example:\n\ntypescript\nimport type { editraconfig } from 'ngx-editra';\nexport const editorconfig: editraconfig = {\n\ttheme: 'auto',\n\tplaceholder: 'write a description…',\n\tminheight: 240,\n\timage: { enabled: true, pasteurls: false },\n\tvideo: { enabled: true },\n\ttable: { enabled: true, maxrows: 50, maxcolumns: 20 },\n\tsecurity: { allowhttp: false, maxinputlength: 1_000_000 },\n};\n\n\ndefaults: light theme, 180px minimum height, spellcheck on, media/tables enabled,\nhttps policy, one million html/json input characters. readonly, autofocus and\nmaxheight are optional. finite non-negative bounds are checked by normalizeconfig.\n\napplication defaults can be provided with provideeditra(config) from ngx-editra.\nan editor's input replaces those defaults. core normalizeconfig fills built-in defaults.\nchanging theme/layout/read-only does not recreate the editor view. schema, security, provider\nor extension changes reconfigure document state, reset history and revalidate existing html.\ndisabling a schema feature can remove that feature's existing content.\n\noutput formats are explicit conversions; config changes never silently change form value types.\n\n configuration reference\n\n| option                               | default / meaning                                                          |\n| ------------------------------------ | -------------------------------------------------------------------------- |\n| placeholder                          | start writing… when the document is empty                                  |\n| minheight                            | 180 pixels                                                                 |\n| maxheight                            | optional; must be at least minheight                                       |\n| theme                                | light; also dark or auto                                                   |\n| readonly                             | prevent editing without changing the document format                       |\n| autofocus                            | optional browser focus after activation                                    |\n| spellcheck                           | true                                                                       |\n| toolbar.hidden                       | hide the toolbar; this does not remove schema features                     |\n| toolbar.items / groups               | replace command buttons or organize them into labelled groups              |\n| toolbar.hiddenitems                  | hide command ids or formatting-control labels                              |\n| toolbar.overflow                     | wrap or scroll                                                             |\n| toolbar.floating                     | enable a selection toolbar                                                 |\n| toolbar.sticky / stickyoffset        | pin the toolbar; optional application-header offset in pixels              |\n| image.enabled / pasteurls            | allow image nodes / optionally turn plain supported image urls into media  |\n| video.enabled / providers            | allow video nodes / register trusted provider functions                    |\n| table.enabled / maxrows / maxcolumns | allow tables; insertion bounds default to 50 rows and 20 columns           |\n| security.allowhttp                   | false; https is the default url policy                                     |\n| security.maxinputlength              | 1,000,000 input characters                                                 |\n| extensions                           | trusted extension list; an explicit list replaces default media extensions |\n\n application-wide defaults\n\ntypescript\nimport { provideeditra } from 'ngx-editra';\n\n// add to your application's providers:\nexport const editordefaults = provideeditra({ theme: 'auto', minheight: 240 });\n\n\nan editor's config input replaces these application defaults rather than deeply merging with them. built-in normalization still supplies missing built-in defaults. do not create a fresh config object inline in the template on every check.\n\nto change only presentation, assign a new object, for example this.editorconfig = { ...this.editorconfig, theme: 'dark' };. keep the field mutable if your application updates it. schema or security changes can alter existing content; make them intentional user/application actions.\n",
	},
	{
		slug: 'angular-forms',
		title: 'Angular Forms',
		group: 'Build with Editra',
		source: 'docs/ANGULAR_FORMS.md',
		summary:
			'Connect the editor to your Angular form just like another value accessor. Its value is an HTML string, so you can load, validate, reset, disable, and save it through the form API.',
		readingMinutes: 4,
		html: "<h1>Angular Forms</h1>\n<p>Connect the editor to your Angular form just like another value accessor. Its value is an HTML string, so you can load, validate, reset, disable, and save it through the form API.</p>\n<table>\n<thead>\n<tr>\n<th>Form API</th>\n<th>Current support</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Reactive Forms: <code>formControl</code> and <code>formControlName</code></td>\n<td>Implemented and integration-tested</td>\n</tr>\n<tr>\n<td>Template-driven forms: <code>ngModel</code></td>\n<td>Implemented and integration-tested</td>\n</tr>\n<tr>\n<td>Signal Forms: <code>formField</code></td>\n<td>Angular 22 integration-tested through ControlValueAccessor compatibility</td>\n</tr>\n</tbody>\n</table>\n<h2>Complete reactive form example</h2>\n<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';\nimport { NgxEditraComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-description-form',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `\n\t\t&lt;form [formGroup]=&quot;form&quot; (ngSubmit)=&quot;save()&quot;&gt;\n\t\t\t&lt;h2&gt;Article description&lt;/h2&gt;\n\t\t\t&lt;ngx-editra formControlName=&quot;description&quot; [required]=&quot;true&quot; /&gt;\n\t\t\t@if (\n\t\t\t\tform.controls.description.touched &amp;&amp; form.controls.description.hasError('required')\n\t\t\t) {\n\t\t\t\t&lt;p role=&quot;alert&quot;&gt;Enter a description before saving.&lt;/p&gt;\n\t\t\t}\n\t\t\t&lt;button type=&quot;submit&quot;&gt;Save draft&lt;/button&gt;\n\t\t&lt;/form&gt;\n\t`,\n})\nexport class DescriptionFormComponent {\n\treadonly form = new FormGroup({\n\t\tdescription: new FormControl('', { nonNullable: true }),\n\t});\n\tsave(): void {\n\t\tthis.form.markAllAsTouched();\n\t\tif (this.form.invalid) return;\n\t\tconst html = this.form.controls.description.value;\n\t\t// Send html through your own application service.\n\t\tconsole.log(html);\n\t}\n}\n</code></pre>\n<p>Use an actual application service instead of the example console output when persisting data. The editor does not include a backend or submission handler.</p>\n<h2>Binding and validation behavior</h2>\n<p>Import <code>NgxEditraComponent</code> with <code>ReactiveFormsModule</code> or <code>FormsModule</code>.\n<code>[formControl]</code>, <code>formControlName</code>, and <code>[(ngModel)]</code> use stable HTML strings.\nNull resets to an empty paragraph. <code>setValue</code>, <code>patchValue</code>, reset, disable and enable\nare supported through ControlValueAccessor.</p>\n<pre><code class=\"language-html\">&lt;ngx-editra\n\tformControlName=&quot;description&quot;\n\t[required]=&quot;true&quot;\n\t[readonly]=&quot;readOnly&quot;\n\t(contentChange)=&quot;onContentChange($event)&quot;\n/&gt;\n</code></pre>\n<p><code>required</code> on the editor validates semantic emptiness, since <code>&lt;p&gt;&lt;/p&gt;</code> is a nonempty string\nto Angular's ordinary string validator. Set <code>[required]=&quot;true&quot;</code> when you need this behavior.\nEditor-to-form transactions emit changes; programmatic writes do not emit <code>contentChange</code>\nor mark the form dirty. Touched is reported when focus leaves the entire editor, including\nits toolbar/dialog. Moving focus within the editor does not touch the form.</p>\n<p>For autosave, subscribe to form <code>valueChanges</code> or <code>contentChange</code>, and debounce storage\nrequests in your application. Required form consistency itself is synchronous.</p>\n<h2>Template-driven forms</h2>\n<p>Import FormsModule and NgxEditraComponent in the component that owns this template. Declare <code>body = '&lt;p&gt;Initial content.&lt;/p&gt;';</code> on that component.</p>\n<pre><code class=\"language-html\">&lt;ngx-editra [(ngModel)]=&quot;body&quot; name=&quot;body&quot; [required]=&quot;true&quot; /&gt;\n</code></pre>\n<p>The name is needed when this control is inside a template-driven form. Do not bind ngModel and formControl to the same editor.</p>\n<h2>Signal Forms compatibility (Angular 22)</h2>\n<p>Angular's <code>FormField</code> supports components that provide a <code>ControlValueAccessor</code>, which\nis the editor's existing integration. The editor does not implement the native\n<code>FormValueControl</code> interface. Signal Forms is stable in Angular 22. See Angular's\n<a href=\"https://angular.dev/api/forms/signals/FormField\">FormField reference</a>.</p>\n<p>Dedicated Angular 22 consumer tests cover HTML value updates in both directions,\ndirty/touched state, disabled state, semantic required validation and resets. Open\n<strong>Signal Forms integration</strong> in the playground for a working example. This is CVA\ncompatibility; the library does not import Angular's Signal Forms API, preserving\ncompatibility with older Angular applications.</p>\n<pre><code class=\"language-typescript\">import { Component, signal } from '@angular/core';\nimport { form, FormField, required } from '@angular/forms/signals';\nimport { NgxEditraComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-signal-description',\n\tstandalone: true,\n\timports: [FormField, NgxEditraComponent],\n\ttemplate: `&lt;ngx-editra [formField]=&quot;articleForm.body&quot; /&gt;`,\n})\nexport class SignalDescriptionComponent {\n\treadonly model = signal({ body: '&lt;p&gt;Initial content.&lt;/p&gt;' });\n\treadonly articleForm = form(this.model, (path) =&gt; required(path.body));\n}\n</code></pre>\n<p>Read the HTML from <code>model().body</code>. Do not combine <code>formField</code>, <code>ngModel</code> and <code>formControl</code>\non the same editor. This example requires Angular 22; Angular 17–20 applications should\nuse Reactive Forms or template-driven forms.</p>\n<p>Reset values and interaction state together with\n<code>articleForm().reset({ body: '&lt;p&gt;Initial content.&lt;/p&gt;' })</code>. Apply disabled/readonly\nrules through Signal Forms rather than competing template bindings. Semantic\nvalidation also updates after programmatic writes and resets.</p>\n<h2>Disabled and readonly are different</h2>\n<p>Call <code>control.disable()</code> to disable a reactive control and <code>control.enable()</code> to restore it. Disabled controls are excluded from a FormGroup's ordinary value; use Angular's getRawValue when your save policy includes them.</p>\n<p>Use the editor's readonly input when users may read the content while the form control remains enabled. Neither state changes the stored HTML. For display without an editor/form control, use the <a href=\"/guides/viewer\">viewer</a>.</p>\n",
		headings: [
			{
				id: 'complete-reactive-form-example',
				label: 'Complete reactive form example',
			},
			{
				id: 'binding-and-validation-behavior',
				label: 'Binding and validation behavior',
			},
			{
				id: 'template-driven-forms',
				label: 'Template-driven forms',
			},
			{
				id: 'signal-forms-compatibility-angular-22',
				label: 'Signal Forms compatibility (Angular 22)',
			},
			{
				id: 'disabled-and-readonly-are-different',
				label: 'Disabled and readonly are different',
			},
		],
		blocks: [
			{
				html: '<h1>Angular Forms</h1>\n',
				id: 'angular-forms',
				kind: 'content',
			},
			{
				html: '<p>Connect the editor to your Angular form just like another value accessor. Its value is an HTML string, so you can load, validate, reset, disable, and save it through the form API.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Form API</th>\n<th>Current support</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Reactive Forms: <code>formControl</code> and <code>formControlName</code></td>\n<td>Implemented and integration-tested</td>\n</tr>\n<tr>\n<td>Template-driven forms: <code>ngModel</code></td>\n<td>Implemented and integration-tested</td>\n</tr>\n<tr>\n<td>Signal Forms: <code>formField</code></td>\n<td>Angular 22 integration-tested through ControlValueAccessor compatibility</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<h2>Complete reactive form example</h2>\n',
				id: 'complete-reactive-form-example',
				kind: 'content',
			},
			{
				code: 'import { Component } from \'@angular/core\';\nimport { FormControl, FormGroup, ReactiveFormsModule } from \'@angular/forms\';\nimport { NgxEditraComponent } from \'ngx-editra\';\n\n@Component({\n\tselector: \'app-description-form\',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `\n\t\t<form [formGroup]="form" (ngSubmit)="save()">\n\t\t\t<h2>Article description</h2>\n\t\t\t<ngx-editra formControlName="description" [required]="true" />\n\t\t\t@if (\n\t\t\t\tform.controls.description.touched && form.controls.description.hasError(\'required\')\n\t\t\t) {\n\t\t\t\t<p role="alert">Enter a description before saving.</p>\n\t\t\t}\n\t\t\t<button type="submit">Save draft</button>\n\t\t</form>\n\t`,\n})\nexport class DescriptionFormComponent {\n\treadonly form = new FormGroup({\n\t\tdescription: new FormControl(\'\', { nonNullable: true }),\n\t});\n\tsave(): void {\n\t\tthis.form.markAllAsTouched();\n\t\tif (this.form.invalid) return;\n\t\tconst html = this.form.controls.description.value;\n\t\t// Send html through your own application service.\n\t\tconsole.log(html);\n\t}\n}\n',
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';\nimport { NgxEditraComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-description-form',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `\n\t\t&lt;form [formGroup]=&quot;form&quot; (ngSubmit)=&quot;save()&quot;&gt;\n\t\t\t&lt;h2&gt;Article description&lt;/h2&gt;\n\t\t\t&lt;ngx-editra formControlName=&quot;description&quot; [required]=&quot;true&quot; /&gt;\n\t\t\t@if (\n\t\t\t\tform.controls.description.touched &amp;&amp; form.controls.description.hasError('required')\n\t\t\t) {\n\t\t\t\t&lt;p role=&quot;alert&quot;&gt;Enter a description before saving.&lt;/p&gt;\n\t\t\t}\n\t\t\t&lt;button type=&quot;submit&quot;&gt;Save draft&lt;/button&gt;\n\t\t&lt;/form&gt;\n\t`,\n})\nexport class DescriptionFormComponent {\n\treadonly form = new FormGroup({\n\t\tdescription: new FormControl('', { nonNullable: true }),\n\t});\n\tsave(): void {\n\t\tthis.form.markAllAsTouched();\n\t\tif (this.form.invalid) return;\n\t\tconst html = this.form.controls.description.value;\n\t\t// Send html through your own application service.\n\t\tconsole.log(html);\n\t}\n}\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Use an actual application service instead of the example console output when persisting data. The editor does not include a backend or submission handler.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Binding and validation behavior</h2>\n',
				id: 'binding-and-validation-behavior',
				kind: 'content',
			},
			{
				html: '<p>Import <code>NgxEditraComponent</code> with <code>ReactiveFormsModule</code> or <code>FormsModule</code>.\n<code>[formControl]</code>, <code>formControlName</code>, and <code>[(ngModel)]</code> use stable HTML strings.\nNull resets to an empty paragraph. <code>setValue</code>, <code>patchValue</code>, reset, disable and enable\nare supported through ControlValueAccessor.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: '<ngx-editra\n\tformControlName="description"\n\t[required]="true"\n\t[readonly]="readOnly"\n\t(contentChange)="onContentChange($event)"\n/>\n',
				language: 'html',
				html: '<pre><code class="language-html">&lt;ngx-editra\n\tformControlName=&quot;description&quot;\n\t[required]=&quot;true&quot;\n\t[readonly]=&quot;readOnly&quot;\n\t(contentChange)=&quot;onContentChange($event)&quot;\n/&gt;\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: "<p><code>required</code> on the editor validates semantic emptiness, since <code>&lt;p&gt;&lt;/p&gt;</code> is a nonempty string\nto Angular's ordinary string validator. Set <code>[required]=&quot;true&quot;</code> when you need this behavior.\nEditor-to-form transactions emit changes; programmatic writes do not emit <code>contentChange</code>\nor mark the form dirty. Touched is reported when focus leaves the entire editor, including\nits toolbar/dialog. Moving focus within the editor does not touch the form.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>For autosave, subscribe to form <code>valueChanges</code> or <code>contentChange</code>, and debounce storage\nrequests in your application. Required form consistency itself is synchronous.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Template-driven forms</h2>\n',
				id: 'template-driven-forms',
				kind: 'content',
			},
			{
				html: "<p>Import FormsModule and NgxEditraComponent in the component that owns this template. Declare <code>body = '&lt;p&gt;Initial content.&lt;/p&gt;';</code> on that component.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				code: '<ngx-editra [(ngModel)]="body" name="body" [required]="true" />\n',
				language: 'html',
				html: '<pre><code class="language-html">&lt;ngx-editra [(ngModel)]=&quot;body&quot; name=&quot;body&quot; [required]=&quot;true&quot; /&gt;\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>The name is needed when this control is inside a template-driven form. Do not bind ngModel and formControl to the same editor.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Signal Forms compatibility (Angular 22)</h2>\n',
				id: 'signal-forms-compatibility-angular-22',
				kind: 'content',
			},
			{
				html: "<p>Angular's <code>FormField</code> supports components that provide a <code>ControlValueAccessor</code>, which\nis the editor's existing integration. The editor does not implement the native\n<code>FormValueControl</code> interface. Signal Forms is stable in Angular 22. See Angular's\n<a href=\"https://angular.dev/api/forms/signals/FormField\">FormField reference</a>.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Dedicated Angular 22 consumer tests cover HTML value updates in both directions,\ndirty/touched state, disabled state, semantic required validation and resets. Open\n<strong>Signal Forms integration</strong> in the playground for a working example. This is CVA\ncompatibility; the library does not import Angular's Signal Forms API, preserving\ncompatibility with older Angular applications.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				code: "import { Component, signal } from '@angular/core';\nimport { form, FormField, required } from '@angular/forms/signals';\nimport { NgxEditraComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-signal-description',\n\tstandalone: true,\n\timports: [FormField, NgxEditraComponent],\n\ttemplate: `<ngx-editra [formField]=\"articleForm.body\" />`,\n})\nexport class SignalDescriptionComponent {\n\treadonly model = signal({ body: '<p>Initial content.</p>' });\n\treadonly articleForm = form(this.model, (path) => required(path.body));\n}\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { Component, signal } from '@angular/core';\nimport { form, FormField, required } from '@angular/forms/signals';\nimport { NgxEditraComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-signal-description',\n\tstandalone: true,\n\timports: [FormField, NgxEditraComponent],\n\ttemplate: `&lt;ngx-editra [formField]=&quot;articleForm.body&quot; /&gt;`,\n})\nexport class SignalDescriptionComponent {\n\treadonly model = signal({ body: '&lt;p&gt;Initial content.&lt;/p&gt;' });\n\treadonly articleForm = form(this.model, (path) =&gt; required(path.body));\n}\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Read the HTML from <code>model().body</code>. Do not combine <code>formField</code>, <code>ngModel</code> and <code>formControl</code>\non the same editor. This example requires Angular 22; Angular 17–20 applications should\nuse Reactive Forms or template-driven forms.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Reset values and interaction state together with\n<code>articleForm().reset({ body: '&lt;p&gt;Initial content.&lt;/p&gt;' })</code>. Apply disabled/readonly\nrules through Signal Forms rather than competing template bindings. Semantic\nvalidation also updates after programmatic writes and resets.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Disabled and readonly are different</h2>\n',
				id: 'disabled-and-readonly-are-different',
				kind: 'content',
			},
			{
				html: "<p>Call <code>control.disable()</code> to disable a reactive control and <code>control.enable()</code> to restore it. Disabled controls are excluded from a FormGroup's ordinary value; use Angular's getRawValue when your save policy includes them.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Use the editor\'s readonly input when users may read the content while the form control remains enabled. Neither state changes the stored HTML. For display without an editor/form control, use the <a href="/guides/viewer">viewer</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " angular forms\n\nconnect the editor to your angular form just like another value accessor. its value is an html string, so you can load, validate, reset, disable, and save it through the form api.\n\n| form api                                            | current support                                                          |\n| --------------------------------------------------- | ------------------------------------------------------------------------ |\n| reactive forms: formcontrol and formcontrolname | implemented and integration-tested                                       |\n| template-driven forms: ngmodel                    | implemented and integration-tested                                       |\n| signal forms: formfield                           | angular 22 integration-tested through controlvalueaccessor compatibility |\n\n complete reactive form example\n\ntypescript\nimport { component } from '@angular/core';\nimport { formcontrol, formgroup, reactiveformsmodule } from '@angular/forms';\nimport { ngxeditracomponent } from 'ngx-editra';\n\n@component({\n\tselector: 'app-description-form',\n\tstandalone: true,\n\timports: [reactiveformsmodule, ngxeditracomponent],\n\ttemplate: \n\t\t<form [formgroup]=\"form\" (ngsubmit)=\"save()\">\n\t\t\t<h2>article description</h2>\n\t\t\t<ngx-editra formcontrolname=\"description\" [required]=\"true\" />\n\t\t\t@if (\n\t\t\t\tform.controls.description.touched && form.controls.description.haserror('required')\n\t\t\t) {\n\t\t\t\t<p role=\"alert\">enter a description before saving.</p>\n\t\t\t}\n\t\t\t<button type=\"submit\">save draft</button>\n\t\t</form>\n\t,\n})\nexport class descriptionformcomponent {\n\treadonly form = new formgroup({\n\t\tdescription: new formcontrol('', { nonnullable: true }),\n\t});\n\tsave(): void {\n\t\tthis.form.markallastouched();\n\t\tif (this.form.invalid) return;\n\t\tconst html = this.form.controls.description.value;\n\t\t// send html through your own application service.\n\t\tconsole.log(html);\n\t}\n}\n\n\nuse an actual application service instead of the example console output when persisting data. the editor does not include a backend or submission handler.\n\n binding and validation behavior\n\nimport ngxeditracomponent with reactiveformsmodule or formsmodule.\n[formcontrol], formcontrolname, and [(ngmodel)] use stable html strings.\nnull resets to an empty paragraph. setvalue, patchvalue, reset, disable and enable\nare supported through controlvalueaccessor.\n\nhtml\n<ngx-editra\n\tformcontrolname=\"description\"\n\t[required]=\"true\"\n\t[readonly]=\"readonly\"\n\t(contentchange)=\"oncontentchange($event)\"\n/>\n\n\nrequired on the editor validates semantic emptiness, since <p></p> is a nonempty string\nto angular's ordinary string validator. set [required]=\"true\" when you need this behavior.\neditor-to-form transactions emit changes; programmatic writes do not emit contentchange\nor mark the form dirty. touched is reported when focus leaves the entire editor, including\nits toolbar/dialog. moving focus within the editor does not touch the form.\n\nfor autosave, subscribe to form valuechanges or contentchange, and debounce storage\nrequests in your application. required form consistency itself is synchronous.\n\n template-driven forms\n\nimport formsmodule and ngxeditracomponent in the component that owns this template. declare body = '<p>initial content.</p>'; on that component.\n\nhtml\n<ngx-editra [(ngmodel)]=\"body\" name=\"body\" [required]=\"true\" />\n\n\nthe name is needed when this control is inside a template-driven form. do not bind ngmodel and formcontrol to the same editor.\n\n signal forms compatibility (angular 22)\n\nangular's formfield supports components that provide a controlvalueaccessor, which\nis the editor's existing integration. the editor does not implement the native\nformvaluecontrol interface. signal forms is stable in angular 22. see angular's\n[formfield reference](https://angular.dev/api/forms/signals/formfield).\n\ndedicated angular 22 consumer tests cover html value updates in both directions,\ndirty/touched state, disabled state, semantic required validation and resets. open\nsignal forms integration in the playground for a working example. this is cva\ncompatibility; the library does not import angular's signal forms api, preserving\ncompatibility with older angular applications.\n\ntypescript\nimport { component, signal } from '@angular/core';\nimport { form, formfield, required } from '@angular/forms/signals';\nimport { ngxeditracomponent } from 'ngx-editra';\n\n@component({\n\tselector: 'app-signal-description',\n\tstandalone: true,\n\timports: [formfield, ngxeditracomponent],\n\ttemplate: <ngx-editra [formfield]=\"articleform.body\" />,\n})\nexport class signaldescriptioncomponent {\n\treadonly model = signal({ body: '<p>initial content.</p>' });\n\treadonly articleform = form(this.model, (path) => required(path.body));\n}\n\n\nread the html from model().body. do not combine formfield, ngmodel and formcontrol\non the same editor. this example requires angular 22; angular 17–20 applications should\nuse reactive forms or template-driven forms.\n\nreset values and interaction state together with\narticleform().reset({ body: '<p>initial content.</p>' }). apply disabled/readonly\nrules through signal forms rather than competing template bindings. semantic\nvalidation also updates after programmatic writes and resets.\n\n disabled and readonly are different\n\ncall control.disable() to disable a reactive control and control.enable() to restore it. disabled controls are excluded from a formgroup's ordinary value; use angular's getrawvalue when your save policy includes them.\n\nuse the editor's readonly input when users may read the content while the form control remains enabled. neither state changes the stored html. for display without an editor/form control, use the [viewer](viewer.md).\n",
	},
	{
		slug: 'content',
		title: 'Load and save content',
		group: 'Build with Editra',
		source: 'docs/CONTENT.md',
		summary:
			'The editor does not save to a server automatically. Your application owns storage, authentication, loading indicators, and error handling. Angular Forms supplies the current HTML value.',
		readingMinutes: 3,
		html: '<h1>Load, save, and convert content</h1>\n<p>The editor does not save to a server automatically. Your application owns storage, authentication, loading indicators, and error handling. Angular Forms supplies the current HTML value.</p>\n<p>To send content through an email provider, use the separate <a href="/guides/email">email exporter</a>.\nNormal editor/viewer HTML targets browsers and should not be treated as an email template.</p>\n<h2>Save HTML from a form</h2>\n<p>Read the form control when the user submits. Send that string to your own backend, where it must be validated and authorized before storage. This example deliberately shows the integration boundary rather than an invented server endpoint.</p>\n<pre><code class="language-typescript">// Inside the component that owns your FormControl:\nsave(): void {\n  this.body.markAsTouched();\n  if (this.body.invalid || this.body.disabled) return;\n  const html = this.body.value;\n  // Pass html to your application\'s persistence service.\n}\n</code></pre>\n<p>For automatic saving, subscribe to the form control\'s valueChanges in your application, debounce changes, and clean up the subscription. Decide how to handle failed requests and concurrent writes. The library does not provide autosave or conflict resolution.</p>\n<h2>Restore HTML</h2>\n<pre><code class="language-typescript">this.body.setValue(\'&lt;p&gt;A previously saved document.&lt;/p&gt;\');\nthis.body.reset(\'&lt;p&gt;A fresh draft.&lt;/p&gt;\');\nthis.body.disable();\nthis.body.enable();\n</code></pre>\n<p>Programmatic form writes update the editor through ControlValueAccessor. Angular\'s own setValue emits valueChanges unless you use its emitEvent option; this is separate from the editor\'s contentChange event. Programmatic writes do not mark the form dirty or emit the editor\'s contentChange.</p>\n<h2>Choose an output format</h2>\n<table>\n<thead>\n<tr>\n<th>Format</th>\n<th>How to get it</th>\n<th>When to use it</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>HTML</td>\n<td>Form control value or editor.getHTML()</td>\n<td>Supported rich content for storage and rendering</td>\n</tr>\n<tr>\n<td>JSON</td>\n<td>editor.getJSON()</td>\n<td>A structured document using EditraDocument</td>\n</tr>\n<tr>\n<td>Plain text</td>\n<td>editor.getText()</td>\n<td>Search indexing, previews, or text-only output</td>\n</tr>\n<tr>\n<td>Markdown</td>\n<td>editor.getMarkdown()</td>\n<td>CommonMark-oriented export with documented fidelity limits</td>\n</tr>\n</tbody>\n</table>\n<p>The editor reference comes from a template variable such as <code>&lt;ngx-editra #editor [formControl]=&quot;body&quot; /&gt;</code>, or an Angular ViewChild. Calling a getter does not change the form value type.</p>\n<h2>Restore JSON or Markdown</h2>\n<pre><code class="language-typescript">// editor is an NgxEditraComponent reference.\neditor.setJSON(savedDocument);\neditor.setMarkdown(\'# A heading\\n\\nA **bold** sentence.\');\n</code></pre>\n<p>setJSON and setMarkdown can throw on invalid input; use try/catch in your import UI. setHTML and writeValue report parsing failures through editorError while retaining the current document. Respect the configured input-size limit.</p>\n<p>Component setters silently synchronize an attached form control without emitting contentChange or valueChanges. Use an explicit application action if importing a document should trigger a save. clear() behaves as an editing action with history.</p>\n<h2>Preserve the same configuration</h2>\n<p>Render or restore content with the same trusted extensions, URL rules, and video providers used to create it. Disabling a schema feature can remove its content when the document is normalized. Keep server-side validation aligned with the client. See <a href="/guides/security">security</a>, <a href="/guides/markdown">Markdown</a>, and <a href="/guides/viewer">the viewer</a>.</p>\n',
		headings: [
			{
				id: 'save-html-from-a-form',
				label: 'Save HTML from a form',
			},
			{
				id: 'restore-html',
				label: 'Restore HTML',
			},
			{
				id: 'choose-an-output-format',
				label: 'Choose an output format',
			},
			{
				id: 'restore-json-or-markdown',
				label: 'Restore JSON or Markdown',
			},
			{
				id: 'preserve-the-same-configuration',
				label: 'Preserve the same configuration',
			},
		],
		blocks: [
			{
				html: '<h1>Load, save, and convert content</h1>\n',
				id: 'load-save-and-convert-content',
				kind: 'content',
			},
			{
				html: '<p>The editor does not save to a server automatically. Your application owns storage, authentication, loading indicators, and error handling. Angular Forms supplies the current HTML value.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>To send content through an email provider, use the separate <a href="/guides/email">email exporter</a>.\nNormal editor/viewer HTML targets browsers and should not be treated as an email template.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Save HTML from a form</h2>\n',
				id: 'save-html-from-a-form',
				kind: 'content',
			},
			{
				html: '<p>Read the form control when the user submits. Send that string to your own backend, where it must be validated and authorized before storage. This example deliberately shows the integration boundary rather than an invented server endpoint.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "// Inside the component that owns your FormControl:\nsave(): void {\n  this.body.markAsTouched();\n  if (this.body.invalid || this.body.disabled) return;\n  const html = this.body.value;\n  // Pass html to your application's persistence service.\n}\n",
				language: 'typescript',
				html: '<pre><code class="language-typescript">// Inside the component that owns your FormControl:\nsave(): void {\n  this.body.markAsTouched();\n  if (this.body.invalid || this.body.disabled) return;\n  const html = this.body.value;\n  // Pass html to your application\'s persistence service.\n}\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: "<p>For automatic saving, subscribe to the form control's valueChanges in your application, debounce changes, and clean up the subscription. Decide how to handle failed requests and concurrent writes. The library does not provide autosave or conflict resolution.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Restore HTML</h2>\n',
				id: 'restore-html',
				kind: 'content',
			},
			{
				code: "this.body.setValue('<p>A previously saved document.</p>');\nthis.body.reset('<p>A fresh draft.</p>');\nthis.body.disable();\nthis.body.enable();\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">this.body.setValue('&lt;p&gt;A previously saved document.&lt;/p&gt;');\nthis.body.reset('&lt;p&gt;A fresh draft.&lt;/p&gt;');\nthis.body.disable();\nthis.body.enable();\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: "<p>Programmatic form writes update the editor through ControlValueAccessor. Angular's own setValue emits valueChanges unless you use its emitEvent option; this is separate from the editor's contentChange event. Programmatic writes do not mark the form dirty or emit the editor's contentChange.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Choose an output format</h2>\n',
				id: 'choose-an-output-format',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Format</th>\n<th>How to get it</th>\n<th>When to use it</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>HTML</td>\n<td>Form control value or editor.getHTML()</td>\n<td>Supported rich content for storage and rendering</td>\n</tr>\n<tr>\n<td>JSON</td>\n<td>editor.getJSON()</td>\n<td>A structured document using EditraDocument</td>\n</tr>\n<tr>\n<td>Plain text</td>\n<td>editor.getText()</td>\n<td>Search indexing, previews, or text-only output</td>\n</tr>\n<tr>\n<td>Markdown</td>\n<td>editor.getMarkdown()</td>\n<td>CommonMark-oriented export with documented fidelity limits</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>The editor reference comes from a template variable such as <code>&lt;ngx-editra #editor [formControl]=&quot;body&quot; /&gt;</code>, or an Angular ViewChild. Calling a getter does not change the form value type.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Restore JSON or Markdown</h2>\n',
				id: 'restore-json-or-markdown',
				kind: 'content',
			},
			{
				code: "// editor is an NgxEditraComponent reference.\neditor.setJSON(savedDocument);\neditor.setMarkdown('# A heading\\n\\nA **bold** sentence.');\n",
				language: 'typescript',
				html: '<pre><code class="language-typescript">// editor is an NgxEditraComponent reference.\neditor.setJSON(savedDocument);\neditor.setMarkdown(\'# A heading\\n\\nA **bold** sentence.\');\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>setJSON and setMarkdown can throw on invalid input; use try/catch in your import UI. setHTML and writeValue report parsing failures through editorError while retaining the current document. Respect the configured input-size limit.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Component setters silently synchronize an attached form control without emitting contentChange or valueChanges. Use an explicit application action if importing a document should trigger a save. clear() behaves as an editing action with history.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Preserve the same configuration</h2>\n',
				id: 'preserve-the-same-configuration',
				kind: 'content',
			},
			{
				html: '<p>Render or restore content with the same trusted extensions, URL rules, and video providers used to create it. Disabling a schema feature can remove its content when the document is normalized. Keep server-side validation aligned with the client. See <a href="/guides/security">security</a>, <a href="/guides/markdown">Markdown</a>, and <a href="/guides/viewer">the viewer</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " load, save, and convert content\n\nthe editor does not save to a server automatically. your application owns storage, authentication, loading indicators, and error handling. angular forms supplies the current html value.\n\nto send content through an email provider, use the separate [email exporter](email.md).\nnormal editor/viewer html targets browsers and should not be treated as an email template.\n\n save html from a form\n\nread the form control when the user submits. send that string to your own backend, where it must be validated and authorized before storage. this example deliberately shows the integration boundary rather than an invented server endpoint.\n\ntypescript\n// inside the component that owns your formcontrol:\nsave(): void {\n  this.body.markastouched();\n  if (this.body.invalid || this.body.disabled) return;\n  const html = this.body.value;\n  // pass html to your application's persistence service.\n}\n\n\nfor automatic saving, subscribe to the form control's valuechanges in your application, debounce changes, and clean up the subscription. decide how to handle failed requests and concurrent writes. the library does not provide autosave or conflict resolution.\n\n restore html\n\ntypescript\nthis.body.setvalue('<p>a previously saved document.</p>');\nthis.body.reset('<p>a fresh draft.</p>');\nthis.body.disable();\nthis.body.enable();\n\n\nprogrammatic form writes update the editor through controlvalueaccessor. angular's own setvalue emits valuechanges unless you use its emitevent option; this is separate from the editor's contentchange event. programmatic writes do not mark the form dirty or emit the editor's contentchange.\n\n choose an output format\n\n| format     | how to get it                          | when to use it                                             |\n| ---------- | -------------------------------------- | ---------------------------------------------------------- |\n| html       | form control value or editor.gethtml() | supported rich content for storage and rendering           |\n| json       | editor.getjson()                       | a structured document using editradocument                 |\n| plain text | editor.gettext()                       | search indexing, previews, or text-only output             |\n| markdown   | editor.getmarkdown()                   | commonmark-oriented export with documented fidelity limits |\n\nthe editor reference comes from a template variable such as <ngx-editra editor [formcontrol]=\"body\" />, or an angular viewchild. calling a getter does not change the form value type.\n\n restore json or markdown\n\ntypescript\n// editor is an ngxeditracomponent reference.\neditor.setjson(saveddocument);\neditor.setmarkdown(' a heading\\n\\na bold sentence.');\n\n\nsetjson and setmarkdown can throw on invalid input; use try/catch in your import ui. sethtml and writevalue report parsing failures through editorerror while retaining the current document. respect the configured input-size limit.\n\ncomponent setters silently synchronize an attached form control without emitting contentchange or valuechanges. use an explicit application action if importing a document should trigger a save. clear() behaves as an editing action with history.\n\n preserve the same configuration\n\nrender or restore content with the same trusted extensions, url rules, and video providers used to create it. disabling a schema feature can remove its content when the document is normalized. keep server-side validation aligned with the client. see [security](security.md), [markdown](markdown.md), and [the viewer](viewer.md).\n",
	},
	{
		slug: 'viewer',
		title: 'Display saved content',
		group: 'Build with Editra',
		source: 'docs/VIEWER.md',
		summary:
			'Use the read-only viewer when a reader should see the saved document without editing tools. It validates input and applies the shared content presentation, including code blocks, tables, media, dividers, and columns.',
		readingMinutes: 3,
		html: "<h1>Display saved content</h1>\n<p>Use the read-only viewer when a reader should see the saved document without editing tools. It validates input and applies the shared content presentation, including code blocks, tables, media, dividers, and columns.</p>\n<h2>Use the standalone viewer</h2>\n<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { NgxEditraViewerComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-article',\n\tstandalone: true,\n\timports: [NgxEditraViewerComponent],\n\ttemplate: '&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot; /&gt;',\n})\nexport class ArticleComponent {\n\tsavedHtml = '&lt;h2&gt;Published article&lt;/h2&gt;&lt;p&gt;Ready to read.&lt;/p&gt;';\n}\n</code></pre>\n<p>The viewer includes its content styles automatically. Pass <code>[config]=&quot;config&quot;</code> when the document uses custom extensions, providers, URL policy, or a specific theme. Code-copy controls are included in the viewer; editing and resizing controls are not.</p>\n<h2>Use an existing HTML container</h2>\n<p>For automatic styling and code-copy buttons with one import, use <code>EditraContentDirective</code>:</p>\n<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { EditraContentDirective } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-article',\n\tstandalone: true,\n\timports: [EditraContentDirective],\n\ttemplate: '&lt;div [editraContent]=&quot;savedHtml&quot;&gt;&lt;/div&gt;',\n})\nexport class ArticleComponent {\n\tsavedHtml = '&lt;h2&gt;Published article&lt;/h2&gt;&lt;pre&gt;&lt;code&gt;const value = 1;&lt;/code&gt;&lt;/pre&gt;';\n}\n</code></pre>\n<p>The directive validates saved HTML and loads content styles and code-copy controls automatically. No pipe, viewer, Sass import or separate copy directive is required. Use a <code>div</code> or <code>article</code> container; the directive owns its contents, so do not combine it with <code>[innerHTML]</code> or child templates on the same element. Code-copy buttons run in the browser and require HTTPS or localhost.</p>\n<p>Configuration is optional. For custom extensions, URL policy or a theme, pass a new config object through <code>[editraContentConfig]=&quot;config&quot;</code> alongside <code>[editraContent]</code>.</p>\n<h2>Use an innerHTML binding</h2>\n<p>Import <code>EditraHtmlPipe</code> in your component's imports, then use:</p>\n<pre><code class=\"language-html\">&lt;div [innerHTML]=&quot;savedHtml | editraHtml&quot;&gt;&lt;/div&gt;\n</code></pre>\n<p>The pipe validates the HTML, adds a styled content wrapper, and loads shared styles automatically. No global Sass import, CSS class, viewer, or configuration is required. The wrapper is part of the rendered HTML, so use a container that accepts block content, such as a <code>div</code> or <code>article</code>.</p>\n<p>Optionally pass <code>editraHtml: config</code> for custom extensions, URL policy or a theme. Replace the config object when changing it. For interactive code-copy buttons, also import <code>EditraCodeCopyDirective</code> and add <code>editraCodeCopy</code> to the container.</p>\n<h2>Content styles</h2>\n<p>The editor, viewer, content directive and HTML pipe include their styles automatically. The optional <code>ngx-editra/styles/content.scss</code> export is only needed for HTML rendered without these Angular APIs.</p>\n<p>Plain Angular innerHTML may remove inline styles and embedded players. Do not solve this by trusting raw user HTML yourself. Prefer the viewer or the validated pipe, and validate content on the server as well. Custom extension serializers are trusted code and must be reviewed.</p>\n<h2>Readonly versus viewer</h2>\n<p>Use <code>[readonly]=&quot;true&quot;</code> on an editor when you want to keep the editor component and its form integration while preventing changes. Use NgxEditraViewerComponent for a separate reading surface. See <a href=\"/guides/angular-forms\">Forms</a> for how disabled state affects form values.</p>\n",
		headings: [
			{
				id: 'use-the-standalone-viewer',
				label: 'Use the standalone viewer',
			},
			{
				id: 'use-an-existing-html-container',
				label: 'Use an existing HTML container',
			},
			{
				id: 'use-an-innerhtml-binding',
				label: 'Use an innerHTML binding',
			},
			{
				id: 'content-styles',
				label: 'Content styles',
			},
			{
				id: 'readonly-versus-viewer',
				label: 'Readonly versus viewer',
			},
		],
		blocks: [
			{
				html: '<h1>Display saved content</h1>\n',
				id: 'display-saved-content',
				kind: 'content',
			},
			{
				html: '<p>Use the read-only viewer when a reader should see the saved document without editing tools. It validates input and applies the shared content presentation, including code blocks, tables, media, dividers, and columns.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Use the standalone viewer</h2>\n',
				id: 'use-the-standalone-viewer',
				kind: 'content',
			},
			{
				code: "import { Component } from '@angular/core';\nimport { NgxEditraViewerComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-article',\n\tstandalone: true,\n\timports: [NgxEditraViewerComponent],\n\ttemplate: '<ngx-editra-viewer [html]=\"savedHtml\" />',\n})\nexport class ArticleComponent {\n\tsavedHtml = '<h2>Published article</h2><p>Ready to read.</p>';\n}\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { NgxEditraViewerComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-article',\n\tstandalone: true,\n\timports: [NgxEditraViewerComponent],\n\ttemplate: '&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot; /&gt;',\n})\nexport class ArticleComponent {\n\tsavedHtml = '&lt;h2&gt;Published article&lt;/h2&gt;&lt;p&gt;Ready to read.&lt;/p&gt;';\n}\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>The viewer includes its content styles automatically. Pass <code>[config]=&quot;config&quot;</code> when the document uses custom extensions, providers, URL policy, or a specific theme. Code-copy controls are included in the viewer; editing and resizing controls are not.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Use an existing HTML container</h2>\n',
				id: 'use-an-existing-html-container',
				kind: 'content',
			},
			{
				html: '<p>For automatic styling and code-copy buttons with one import, use <code>EditraContentDirective</code>:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "import { Component } from '@angular/core';\nimport { EditraContentDirective } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-article',\n\tstandalone: true,\n\timports: [EditraContentDirective],\n\ttemplate: '<div [editraContent]=\"savedHtml\"></div>',\n})\nexport class ArticleComponent {\n\tsavedHtml = '<h2>Published article</h2><pre><code>const value = 1;</code></pre>';\n}\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { EditraContentDirective } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-article',\n\tstandalone: true,\n\timports: [EditraContentDirective],\n\ttemplate: '&lt;div [editraContent]=&quot;savedHtml&quot;&gt;&lt;/div&gt;',\n})\nexport class ArticleComponent {\n\tsavedHtml = '&lt;h2&gt;Published article&lt;/h2&gt;&lt;pre&gt;&lt;code&gt;const value = 1;&lt;/code&gt;&lt;/pre&gt;';\n}\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>The directive validates saved HTML and loads content styles and code-copy controls automatically. No pipe, viewer, Sass import or separate copy directive is required. Use a <code>div</code> or <code>article</code> container; the directive owns its contents, so do not combine it with <code>[innerHTML]</code> or child templates on the same element. Code-copy buttons run in the browser and require HTTPS or localhost.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Configuration is optional. For custom extensions, URL policy or a theme, pass a new config object through <code>[editraContentConfig]=&quot;config&quot;</code> alongside <code>[editraContent]</code>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Use an innerHTML binding</h2>\n',
				id: 'use-an-innerhtml-binding',
				kind: 'content',
			},
			{
				html: "<p>Import <code>EditraHtmlPipe</code> in your component's imports, then use:</p>\n",
				id: '',
				kind: 'content',
			},
			{
				code: '<div [innerHTML]="savedHtml | editraHtml"></div>\n',
				language: 'html',
				html: '<pre><code class="language-html">&lt;div [innerHTML]=&quot;savedHtml | editraHtml&quot;&gt;&lt;/div&gt;\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>The pipe validates the HTML, adds a styled content wrapper, and loads shared styles automatically. No global Sass import, CSS class, viewer, or configuration is required. The wrapper is part of the rendered HTML, so use a container that accepts block content, such as a <code>div</code> or <code>article</code>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Optionally pass <code>editraHtml: config</code> for custom extensions, URL policy or a theme. Replace the config object when changing it. For interactive code-copy buttons, also import <code>EditraCodeCopyDirective</code> and add <code>editraCodeCopy</code> to the container.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Content styles</h2>\n',
				id: 'content-styles',
				kind: 'content',
			},
			{
				html: '<p>The editor, viewer, content directive and HTML pipe include their styles automatically. The optional <code>ngx-editra/styles/content.scss</code> export is only needed for HTML rendered without these Angular APIs.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Plain Angular innerHTML may remove inline styles and embedded players. Do not solve this by trusting raw user HTML yourself. Prefer the viewer or the validated pipe, and validate content on the server as well. Custom extension serializers are trusted code and must be reviewed.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Readonly versus viewer</h2>\n',
				id: 'readonly-versus-viewer',
				kind: 'content',
			},
			{
				html: '<p>Use <code>[readonly]=&quot;true&quot;</code> on an editor when you want to keep the editor component and its form integration while preventing changes. Use NgxEditraViewerComponent for a separate reading surface. See <a href="/guides/angular-forms">Forms</a> for how disabled state affects form values.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " display saved content\n\nuse the read-only viewer when a reader should see the saved document without editing tools. it validates input and applies the shared content presentation, including code blocks, tables, media, dividers, and columns.\n\n use the standalone viewer\n\ntypescript\nimport { component } from '@angular/core';\nimport { ngxeditraviewercomponent } from 'ngx-editra';\n\n@component({\n\tselector: 'app-article',\n\tstandalone: true,\n\timports: [ngxeditraviewercomponent],\n\ttemplate: '<ngx-editra-viewer [html]=\"savedhtml\" />',\n})\nexport class articlecomponent {\n\tsavedhtml = '<h2>published article</h2><p>ready to read.</p>';\n}\n\n\nthe viewer includes its content styles automatically. pass [config]=\"config\" when the document uses custom extensions, providers, url policy, or a specific theme. code-copy controls are included in the viewer; editing and resizing controls are not.\n\n use an existing html container\n\nfor automatic styling and code-copy buttons with one import, use editracontentdirective:\n\ntypescript\nimport { component } from '@angular/core';\nimport { editracontentdirective } from 'ngx-editra';\n\n@component({\n\tselector: 'app-article',\n\tstandalone: true,\n\timports: [editracontentdirective],\n\ttemplate: '<div [editracontent]=\"savedhtml\"></div>',\n})\nexport class articlecomponent {\n\tsavedhtml = '<h2>published article</h2><pre><code>const value = 1;</code></pre>';\n}\n\n\nthe directive validates saved html and loads content styles and code-copy controls automatically. no pipe, viewer, sass import or separate copy directive is required. use a div or article container; the directive owns its contents, so do not combine it with [innerhtml] or child templates on the same element. code-copy buttons run in the browser and require https or localhost.\n\nconfiguration is optional. for custom extensions, url policy or a theme, pass a new config object through [editracontentconfig]=\"config\" alongside [editracontent].\n\n use an innerhtml binding\n\nimport editrahtmlpipe in your component's imports, then use:\n\nhtml\n<div [innerhtml]=\"savedhtml | editrahtml\"></div>\n\n\nthe pipe validates the html, adds a styled content wrapper, and loads shared styles automatically. no global sass import, css class, viewer, or configuration is required. the wrapper is part of the rendered html, so use a container that accepts block content, such as a div or article.\n\noptionally pass editrahtml: config for custom extensions, url policy or a theme. replace the config object when changing it. for interactive code-copy buttons, also import editracodecopydirective and add editracodecopy to the container.\n\n content styles\n\nthe editor, viewer, content directive and html pipe include their styles automatically. the optional ngx-editra/styles/content.scss export is only needed for html rendered without these angular apis.\n\nplain angular innerhtml may remove inline styles and embedded players. do not solve this by trusting raw user html yourself. prefer the viewer or the validated pipe, and validate content on the server as well. custom extension serializers are trusted code and must be reviewed.\n\n readonly versus viewer\n\nuse [readonly]=\"true\" on an editor when you want to keep the editor component and its form integration while preventing changes. use ngxeditraviewercomponent for a separate reading surface. see [forms](angular_forms.md) for how disabled state affects form values.\n",
	},
	{
		slug: 'email',
		title: 'Export for email',
		group: 'Build with Editra',
		source: 'docs/EMAIL.md',
		summary:
			'Use exportEmail to turn saved editor HTML into a separate email document and plain-textalternative. The normal form value, viewer and HTML pipe target websites. Email exportdoes not change saved editor content.',
		readingMinutes: 4,
		html: '<h1>Email export</h1>\n<p>Use <code>exportEmail</code> to turn saved editor HTML into a separate email document and plain-text\nalternative. The normal form value, viewer and HTML pipe target websites. Email export\ndoes not change saved editor content.</p>\n<h2>Export an email</h2>\n<pre><code class="language-typescript">import { exportEmail } from \'ngx-editra\';\n\nconst email = exportEmail(savedHtml, {\n\ttitle: \'Your project update\',\n\tpreheader: \'The latest news from our team\',\n\twidth: 600,\n\tlanguage: \'en\',\n});\n\n// Pass these bodies to your own backend or email provider.\nconst message = { html: email.html, text: email.text };\nconsole.log(email.warnings);\n</code></pre>\n<p><code>html</code> is a complete document with inline styles, presentation tables, a fluid container\nand an Outlook conditional width fallback. <code>text</code> includes link/image URLs. Supply both\nusing your provider\'s multipart message API. The library does not send email or supply\nSMTP credentials, recipients, subjects, unsubscribe links, tracking or deliverability.\n<code>title</code> is HTML metadata, not the Subject header.</p>\n<p>On the sending backend, validate/authorize the saved document and export with the\nsame policies again. Do not trust arbitrary HTML submitted by a browser as a ready-to-send body.</p>\n<p>Pass an optional third <code>EditraConfig</code> argument for input policies and extension parsing:</p>\n<pre><code class="language-typescript">const email = exportEmail(savedHtml, { width: 640 }, editorConfig);\n</code></pre>\n<p>Width defaults to 600; integer widths 360–800 are accepted. Language defaults to <code>en</code>.\nTitle and preheader are escaped. The function works without browser DOM globals and\nmakes no network requests. It does not run extension lifecycle hooks or custom serializers.</p>\n<h2>Content behavior</h2>\n<table>\n<thead>\n<tr>\n<th>Content</th>\n<th>Email behavior</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Headings, paragraphs and text marks</td>\n<td>Static HTML with inline typography</td>\n</tr>\n<tr>\n<td>Links, colours, highlights and sizes</td>\n<td>Validated URLs/values with inline styles</td>\n</tr>\n<tr>\n<td>Fonts</td>\n<td>Common email fonts preserved; others fall back to Arial</td>\n</tr>\n<tr>\n<td>Lists</td>\n<td>Semantic lists with ordered starting numbers</td>\n</tr>\n<tr>\n<td>Tables</td>\n<td>Static tables with merged cells, borders and cell backgrounds</td>\n</tr>\n<tr>\n<td>Table sizing</td>\n<td>Container-constrained width; custom cell widths normalized and row heights omitted</td>\n</tr>\n<tr>\n<td>Images</td>\n<td>Allowed external URLs, alt text, captions and bounded dimensions; wrapping removed</td>\n</tr>\n<tr>\n<td>Columns</td>\n<td>Stacked in reading order using presentation-table rows</td>\n</tr>\n<tr>\n<td>Video/iframe embeds</td>\n<td>Safe text links instead of embedded playback</td>\n</tr>\n<tr>\n<td>Code</td>\n<td>Escaped static text without copy buttons or highlighting</td>\n</tr>\n<tr>\n<td>Quotes and lines</td>\n<td>Simplified static email presentation</td>\n</tr>\n<tr>\n<td>Custom nodes/marks</td>\n<td>Supported children/text retained where possible; unsupported presentation omitted</td>\n</tr>\n</tbody>\n</table>\n<p>Use publicly accessible HTTPS PNG/JPEG/GIF images. Recipients can block remote images;\nSVG support varies. The current URL policy does not support relative URLs, data URLs\nor <code>cid:</code> attachments. Invalid sources can be removed during input validation. Do not\nconvey essential information only through images.</p>\n<h2>Warnings and validation</h2>\n<p>Warnings are deduplicated <code>{ code, message }</code> entries: <code>columns-stacked</code>, <code>video-link</code>,\n<code>remote-images</code>, <code>svg-image</code>, <code>image-wrap</code>, <code>font-fallback</code>, <code>table-widths</code>, <code>row-heights</code>,\n<code>code-wrapping</code>, <code>large-html</code>, and unsupported node/mark codes. HTML over 100 KB gets\nan early clipping warning; smaller messages are not guaranteed to avoid clipping.</p>\n<p>Input is rebuilt through schema and URL policies. Warnings describe email conversions,\nnot every element discarded during parsing. Custom importers remain trusted code. The\nexporter does not copy arbitrary CSS or custom serializers. An empty warning list is\nnot a security audit or an email-client compatibility certificate.</p>\n<h2>Preview and client testing</h2>\n<p>Open <strong>Email export</strong> in the playground to copy HTML/text, inspect warnings and use the\nsandboxed browser preview. The preview accepts only freshly exported HTML and blocks\nscripts, forms, same-origin access and top navigation. Opening it can load referenced\nexternal images. It does not emulate an email client.</p>\n<p>The exporter targets a conservative baseline for Gmail, Outlook and Apple Mail. Automated\nchecks cover structure, escaping, URL policies, conversions, limits, browser preview and\nSSR execution. Real inbox rendering still needs these checks before production:</p>\n<ol>\n<li>Send generated HTML and text through the actual delivery provider.</li>\n<li>Check Gmail web/mobile, classic Outlook for Windows, new Outlook/web, and Apple Mail\non macOS/iOS. Outlook variants use different rendering engines.</li>\n<li>Test narrow screens, light/dark modes, blocked images, long links/code and merged tables.</li>\n<li>Review reading order, alt text, link destinations, plain-text readability and message size.</li>\n<li>Record client/version, date and screenshots; repeat after template/provider changes.</li>\n</ol>\n<p>Clients can rewrite colours, fonts, spacing and links. Pixel-identical output and verified\ninbox compatibility are not claimed. Actual account/device tests remain outstanding.</p>\n<p>References: <a href="https://developers.google.com/workspace/gmail/design/css">Gmail CSS support</a>,\n<a href="https://mailchimp.com/help/limitations-of-html-email/">HTML email limitations</a>, and\n<a href="https://templates.mailchimp.com/getting-started/html-email-basics/">email development practices</a>.</p>\n',
		headings: [
			{
				id: 'export-an-email',
				label: 'Export an email',
			},
			{
				id: 'content-behavior',
				label: 'Content behavior',
			},
			{
				id: 'warnings-and-validation',
				label: 'Warnings and validation',
			},
			{
				id: 'preview-and-client-testing',
				label: 'Preview and client testing',
			},
		],
		blocks: [
			{
				html: '<h1>Email export</h1>\n',
				id: 'email-export',
				kind: 'content',
			},
			{
				html: '<p>Use <code>exportEmail</code> to turn saved editor HTML into a separate email document and plain-text\nalternative. The normal form value, viewer and HTML pipe target websites. Email export\ndoes not change saved editor content.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Export an email</h2>\n',
				id: 'export-an-email',
				kind: 'content',
			},
			{
				code: "import { exportEmail } from 'ngx-editra';\n\nconst email = exportEmail(savedHtml, {\n\ttitle: 'Your project update',\n\tpreheader: 'The latest news from our team',\n\twidth: 600,\n\tlanguage: 'en',\n});\n\n// Pass these bodies to your own backend or email provider.\nconst message = { html: email.html, text: email.text };\nconsole.log(email.warnings);\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { exportEmail } from 'ngx-editra';\n\nconst email = exportEmail(savedHtml, {\n\ttitle: 'Your project update',\n\tpreheader: 'The latest news from our team',\n\twidth: 600,\n\tlanguage: 'en',\n});\n\n// Pass these bodies to your own backend or email provider.\nconst message = { html: email.html, text: email.text };\nconsole.log(email.warnings);\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: "<p><code>html</code> is a complete document with inline styles, presentation tables, a fluid container\nand an Outlook conditional width fallback. <code>text</code> includes link/image URLs. Supply both\nusing your provider's multipart message API. The library does not send email or supply\nSMTP credentials, recipients, subjects, unsubscribe links, tracking or deliverability.\n<code>title</code> is HTML metadata, not the Subject header.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>On the sending backend, validate/authorize the saved document and export with the\nsame policies again. Do not trust arbitrary HTML submitted by a browser as a ready-to-send body.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Pass an optional third <code>EditraConfig</code> argument for input policies and extension parsing:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: 'const email = exportEmail(savedHtml, { width: 640 }, editorConfig);\n',
				language: 'typescript',
				html: '<pre><code class="language-typescript">const email = exportEmail(savedHtml, { width: 640 }, editorConfig);\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Width defaults to 600; integer widths 360–800 are accepted. Language defaults to <code>en</code>.\nTitle and preheader are escaped. The function works without browser DOM globals and\nmakes no network requests. It does not run extension lifecycle hooks or custom serializers.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Content behavior</h2>\n',
				id: 'content-behavior',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Content</th>\n<th>Email behavior</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Headings, paragraphs and text marks</td>\n<td>Static HTML with inline typography</td>\n</tr>\n<tr>\n<td>Links, colours, highlights and sizes</td>\n<td>Validated URLs/values with inline styles</td>\n</tr>\n<tr>\n<td>Fonts</td>\n<td>Common email fonts preserved; others fall back to Arial</td>\n</tr>\n<tr>\n<td>Lists</td>\n<td>Semantic lists with ordered starting numbers</td>\n</tr>\n<tr>\n<td>Tables</td>\n<td>Static tables with merged cells, borders and cell backgrounds</td>\n</tr>\n<tr>\n<td>Table sizing</td>\n<td>Container-constrained width; custom cell widths normalized and row heights omitted</td>\n</tr>\n<tr>\n<td>Images</td>\n<td>Allowed external URLs, alt text, captions and bounded dimensions; wrapping removed</td>\n</tr>\n<tr>\n<td>Columns</td>\n<td>Stacked in reading order using presentation-table rows</td>\n</tr>\n<tr>\n<td>Video/iframe embeds</td>\n<td>Safe text links instead of embedded playback</td>\n</tr>\n<tr>\n<td>Code</td>\n<td>Escaped static text without copy buttons or highlighting</td>\n</tr>\n<tr>\n<td>Quotes and lines</td>\n<td>Simplified static email presentation</td>\n</tr>\n<tr>\n<td>Custom nodes/marks</td>\n<td>Supported children/text retained where possible; unsupported presentation omitted</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Use publicly accessible HTTPS PNG/JPEG/GIF images. Recipients can block remote images;\nSVG support varies. The current URL policy does not support relative URLs, data URLs\nor <code>cid:</code> attachments. Invalid sources can be removed during input validation. Do not\nconvey essential information only through images.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Warnings and validation</h2>\n',
				id: 'warnings-and-validation',
				kind: 'content',
			},
			{
				html: '<p>Warnings are deduplicated <code>{ code, message }</code> entries: <code>columns-stacked</code>, <code>video-link</code>,\n<code>remote-images</code>, <code>svg-image</code>, <code>image-wrap</code>, <code>font-fallback</code>, <code>table-widths</code>, <code>row-heights</code>,\n<code>code-wrapping</code>, <code>large-html</code>, and unsupported node/mark codes. HTML over 100 KB gets\nan early clipping warning; smaller messages are not guaranteed to avoid clipping.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Input is rebuilt through schema and URL policies. Warnings describe email conversions,\nnot every element discarded during parsing. Custom importers remain trusted code. The\nexporter does not copy arbitrary CSS or custom serializers. An empty warning list is\nnot a security audit or an email-client compatibility certificate.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Preview and client testing</h2>\n',
				id: 'preview-and-client-testing',
				kind: 'content',
			},
			{
				html: '<p>Open <strong>Email export</strong> in the playground to copy HTML/text, inspect warnings and use the\nsandboxed browser preview. The preview accepts only freshly exported HTML and blocks\nscripts, forms, same-origin access and top navigation. Opening it can load referenced\nexternal images. It does not emulate an email client.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The exporter targets a conservative baseline for Gmail, Outlook and Apple Mail. Automated\nchecks cover structure, escaping, URL policies, conversions, limits, browser preview and\nSSR execution. Real inbox rendering still needs these checks before production:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Send generated HTML and text through the actual delivery provider.</li>\n<li>Check Gmail web/mobile, classic Outlook for Windows, new Outlook/web, and Apple Mail\non macOS/iOS. Outlook variants use different rendering engines.</li>\n<li>Test narrow screens, light/dark modes, blocked images, long links/code and merged tables.</li>\n<li>Review reading order, alt text, link destinations, plain-text readability and message size.</li>\n<li>Record client/version, date and screenshots; repeat after template/provider changes.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Clients can rewrite colours, fonts, spacing and links. Pixel-identical output and verified\ninbox compatibility are not claimed. Actual account/device tests remain outstanding.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>References: <a href="https://developers.google.com/workspace/gmail/design/css">Gmail CSS support</a>,\n<a href="https://mailchimp.com/help/limitations-of-html-email/">HTML email limitations</a>, and\n<a href="https://templates.mailchimp.com/getting-started/html-email-basics/">email development practices</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " email export\n\nuse exportemail to turn saved editor html into a separate email document and plain-text\nalternative. the normal form value, viewer and html pipe target websites. email export\ndoes not change saved editor content.\n\n export an email\n\ntypescript\nimport { exportemail } from 'ngx-editra';\n\nconst email = exportemail(savedhtml, {\n\ttitle: 'your project update',\n\tpreheader: 'the latest news from our team',\n\twidth: 600,\n\tlanguage: 'en',\n});\n\n// pass these bodies to your own backend or email provider.\nconst message = { html: email.html, text: email.text };\nconsole.log(email.warnings);\n\n\nhtml is a complete document with inline styles, presentation tables, a fluid container\nand an outlook conditional width fallback. text includes link/image urls. supply both\nusing your provider's multipart message api. the library does not send email or supply\nsmtp credentials, recipients, subjects, unsubscribe links, tracking or deliverability.\ntitle is html metadata, not the subject header.\n\non the sending backend, validate/authorize the saved document and export with the\nsame policies again. do not trust arbitrary html submitted by a browser as a ready-to-send body.\n\npass an optional third editraconfig argument for input policies and extension parsing:\n\ntypescript\nconst email = exportemail(savedhtml, { width: 640 }, editorconfig);\n\n\nwidth defaults to 600; integer widths 360–800 are accepted. language defaults to en.\ntitle and preheader are escaped. the function works without browser dom globals and\nmakes no network requests. it does not run extension lifecycle hooks or custom serializers.\n\n content behavior\n\n| content                              | email behavior                                                                     |\n| ------------------------------------ | ---------------------------------------------------------------------------------- |\n| headings, paragraphs and text marks  | static html with inline typography                                                 |\n| links, colours, highlights and sizes | validated urls/values with inline styles                                           |\n| fonts                                | common email fonts preserved; others fall back to arial                            |\n| lists                                | semantic lists with ordered starting numbers                                       |\n| tables                               | static tables with merged cells, borders and cell backgrounds                      |\n| table sizing                         | container-constrained width; custom cell widths normalized and row heights omitted |\n| images                               | allowed external urls, alt text, captions and bounded dimensions; wrapping removed |\n| columns                              | stacked in reading order using presentation-table rows                             |\n| video/iframe embeds                  | safe text links instead of embedded playback                                       |\n| code                                 | escaped static text without copy buttons or highlighting                           |\n| quotes and lines                     | simplified static email presentation                                               |\n| custom nodes/marks                   | supported children/text retained where possible; unsupported presentation omitted  |\n\nuse publicly accessible https png/jpeg/gif images. recipients can block remote images;\nsvg support varies. the current url policy does not support relative urls, data urls\nor cid: attachments. invalid sources can be removed during input validation. do not\nconvey essential information only through images.\n\n warnings and validation\n\nwarnings are deduplicated { code, message } entries: columns-stacked, video-link,\nremote-images, svg-image, image-wrap, font-fallback, table-widths, row-heights,\ncode-wrapping, large-html, and unsupported node/mark codes. html over 100 kb gets\nan early clipping warning; smaller messages are not guaranteed to avoid clipping.\n\ninput is rebuilt through schema and url policies. warnings describe email conversions,\nnot every element discarded during parsing. custom importers remain trusted code. the\nexporter does not copy arbitrary css or custom serializers. an empty warning list is\nnot a security audit or an email-client compatibility certificate.\n\n preview and client testing\n\nopen email export in the playground to copy html/text, inspect warnings and use the\nsandboxed browser preview. the preview accepts only freshly exported html and blocks\nscripts, forms, same-origin access and top navigation. opening it can load referenced\nexternal images. it does not emulate an email client.\n\nthe exporter targets a conservative baseline for gmail, outlook and apple mail. automated\nchecks cover structure, escaping, url policies, conversions, limits, browser preview and\nssr execution. real inbox rendering still needs these checks before production:\n\n1. send generated html and text through the actual delivery provider.\n2. check gmail web/mobile, classic outlook for windows, new outlook/web, and apple mail\n   on macos/ios. outlook variants use different rendering engines.\n3. test narrow screens, light/dark modes, blocked images, long links/code and merged tables.\n4. review reading order, alt text, link destinations, plain-text readability and message size.\n5. record client/version, date and screenshots; repeat after template/provider changes.\n\nclients can rewrite colours, fonts, spacing and links. pixel-identical output and verified\ninbox compatibility are not claimed. actual account/device tests remain outstanding.\n\nreferences: [gmail css support](https://developers.google.com/workspace/gmail/design/css),\n[html email limitations](https://mailchimp.com/help/limitations-of-html-email/), and\n[email development practices](https://templates.mailchimp.com/getting-started/html-email-basics/).\n",
	},
	{
		slug: 'events',
		title: 'Events and lifecycle',
		group: 'Build with Editra',
		source: 'docs/EVENTS.md',
		summary:
			"Use outputs to react to user actions without reaching into the component's private engine. Use Angular Forms for the document value and validation state.",
		readingMinutes: 2,
		html: "<h1>Events and application integration</h1>\n<p>Use outputs to react to user actions without reaching into the component's private engine. Use Angular Forms for the document value and validation state.</p>\n<h2>Listen for content and errors</h2>\n<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { NgxEditraComponent } from 'ngx-editra';\nimport type { EditraChange } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-editor-events',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `\n\t\t&lt;ngx-editra\n\t\t\t[formControl]=&quot;body&quot;\n\t\t\t(contentChange)=&quot;onContentChange($event)&quot;\n\t\t\t(editorError)=&quot;error = $event.message&quot;\n\t\t/&gt;\n\t\t&lt;p role=&quot;status&quot;&gt;{{ status }}&lt;/p&gt;\n\t\t&lt;p role=&quot;alert&quot;&gt;{{ error }}&lt;/p&gt;\n\t`,\n})\nexport class EditorEventsComponent {\n\treadonly body = new FormControl('', { nonNullable: true });\n\tstatus = 'Start editing.';\n\terror = '';\n\tonContentChange(change: EditraChange): void {\n\t\tthis.status = `Document changed: ${change.text.length} text characters.`;\n\t}\n}\n</code></pre>\n<h2>Event reference</h2>\n<table>\n<thead>\n<tr>\n<th>Output</th>\n<th>Payload</th>\n<th>Typical use</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>contentChange</td>\n<td>EditraChange: html, document, text</td>\n<td>Update an application preview after a document edit</td>\n</tr>\n<tr>\n<td>selectionChange</td>\n<td>from, to positions</td>\n<td>Reflect the current document selection</td>\n</tr>\n<tr>\n<td>transactionState</td>\n<td>docChanged, selectionChanged, from, to, dirty</td>\n<td>Observe editing transactions without serializing the document yourself</td>\n</tr>\n<tr>\n<td>dirtyChange</td>\n<td>boolean</td>\n<td>Show a document-edited indicator</td>\n</tr>\n<tr>\n<td>editorFocus / editorBlur</td>\n<td>void</td>\n<td>Track editor focus</td>\n</tr>\n<tr>\n<td>editorReady</td>\n<td>void</td>\n<td>Wait for browser editor activation before using DOM focus</td>\n</tr>\n<tr>\n<td>editorDestroyed</td>\n<td>void</td>\n<td>Observe component teardown</td>\n</tr>\n<tr>\n<td>editorError</td>\n<td>Error</td>\n<td>Present a parsing or initialization error in application UI</td>\n</tr>\n</tbody>\n</table>\n<p>Selection-only transactions do not emit contentChange. Programmatic writes and component setters have different notification semantics from user edits; see <a href=\"/guides/content\">loading and saving</a>.</p>\n<h2>Lifecycle and cleanup</h2>\n<p>DOM focus and blur calls are no-ops before browser activation. Getters and document conversions can be used during server rendering. The component owns its browser view and destroys it on teardown. Extensions must release their own subscriptions, event listeners, and node-view resources.</p>\n<p>Avoid writing the form value back into the editor on every contentChange: the form is already synchronized. This prevents feedback loops and unnecessary document replacement.</p>\n",
		headings: [
			{
				id: 'listen-for-content-and-errors',
				label: 'Listen for content and errors',
			},
			{
				id: 'event-reference',
				label: 'Event reference',
			},
			{
				id: 'lifecycle-and-cleanup',
				label: 'Lifecycle and cleanup',
			},
		],
		blocks: [
			{
				html: '<h1>Events and application integration</h1>\n',
				id: 'events-and-application-integration',
				kind: 'content',
			},
			{
				html: "<p>Use outputs to react to user actions without reaching into the component's private engine. Use Angular Forms for the document value and validation state.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Listen for content and errors</h2>\n',
				id: 'listen-for-content-and-errors',
				kind: 'content',
			},
			{
				code: "import { Component } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { NgxEditraComponent } from 'ngx-editra';\nimport type { EditraChange } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-editor-events',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `\n\t\t<ngx-editra\n\t\t\t[formControl]=\"body\"\n\t\t\t(contentChange)=\"onContentChange($event)\"\n\t\t\t(editorError)=\"error = $event.message\"\n\t\t/>\n\t\t<p role=\"status\">{{ status }}</p>\n\t\t<p role=\"alert\">{{ error }}</p>\n\t`,\n})\nexport class EditorEventsComponent {\n\treadonly body = new FormControl('', { nonNullable: true });\n\tstatus = 'Start editing.';\n\terror = '';\n\tonContentChange(change: EditraChange): void {\n\t\tthis.status = `Document changed: ${change.text.length} text characters.`;\n\t}\n}\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { NgxEditraComponent } from 'ngx-editra';\nimport type { EditraChange } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-editor-events',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, NgxEditraComponent],\n\ttemplate: `\n\t\t&lt;ngx-editra\n\t\t\t[formControl]=&quot;body&quot;\n\t\t\t(contentChange)=&quot;onContentChange($event)&quot;\n\t\t\t(editorError)=&quot;error = $event.message&quot;\n\t\t/&gt;\n\t\t&lt;p role=&quot;status&quot;&gt;{{ status }}&lt;/p&gt;\n\t\t&lt;p role=&quot;alert&quot;&gt;{{ error }}&lt;/p&gt;\n\t`,\n})\nexport class EditorEventsComponent {\n\treadonly body = new FormControl('', { nonNullable: true });\n\tstatus = 'Start editing.';\n\terror = '';\n\tonContentChange(change: EditraChange): void {\n\t\tthis.status = `Document changed: ${change.text.length} text characters.`;\n\t}\n}\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<h2>Event reference</h2>\n',
				id: 'event-reference',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Output</th>\n<th>Payload</th>\n<th>Typical use</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>contentChange</td>\n<td>EditraChange: html, document, text</td>\n<td>Update an application preview after a document edit</td>\n</tr>\n<tr>\n<td>selectionChange</td>\n<td>from, to positions</td>\n<td>Reflect the current document selection</td>\n</tr>\n<tr>\n<td>transactionState</td>\n<td>docChanged, selectionChanged, from, to, dirty</td>\n<td>Observe editing transactions without serializing the document yourself</td>\n</tr>\n<tr>\n<td>dirtyChange</td>\n<td>boolean</td>\n<td>Show a document-edited indicator</td>\n</tr>\n<tr>\n<td>editorFocus / editorBlur</td>\n<td>void</td>\n<td>Track editor focus</td>\n</tr>\n<tr>\n<td>editorReady</td>\n<td>void</td>\n<td>Wait for browser editor activation before using DOM focus</td>\n</tr>\n<tr>\n<td>editorDestroyed</td>\n<td>void</td>\n<td>Observe component teardown</td>\n</tr>\n<tr>\n<td>editorError</td>\n<td>Error</td>\n<td>Present a parsing or initialization error in application UI</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Selection-only transactions do not emit contentChange. Programmatic writes and component setters have different notification semantics from user edits; see <a href="/guides/content">loading and saving</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Lifecycle and cleanup</h2>\n',
				id: 'lifecycle-and-cleanup',
				kind: 'content',
			},
			{
				html: '<p>DOM focus and blur calls are no-ops before browser activation. Getters and document conversions can be used during server rendering. The component owns its browser view and destroys it on teardown. Extensions must release their own subscriptions, event listeners, and node-view resources.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Avoid writing the form value back into the editor on every contentChange: the form is already synchronized. This prevents feedback loops and unnecessary document replacement.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " events and application integration\n\nuse outputs to react to user actions without reaching into the component's private engine. use angular forms for the document value and validation state.\n\n listen for content and errors\n\ntypescript\nimport { component } from '@angular/core';\nimport { formcontrol, reactiveformsmodule } from '@angular/forms';\nimport { ngxeditracomponent } from 'ngx-editra';\nimport type { editrachange } from 'ngx-editra';\n\n@component({\n\tselector: 'app-editor-events',\n\tstandalone: true,\n\timports: [reactiveformsmodule, ngxeditracomponent],\n\ttemplate: \n\t\t<ngx-editra\n\t\t\t[formcontrol]=\"body\"\n\t\t\t(contentchange)=\"oncontentchange($event)\"\n\t\t\t(editorerror)=\"error = $event.message\"\n\t\t/>\n\t\t<p role=\"status\">{{ status }}</p>\n\t\t<p role=\"alert\">{{ error }}</p>\n\t,\n})\nexport class editoreventscomponent {\n\treadonly body = new formcontrol('', { nonnullable: true });\n\tstatus = 'start editing.';\n\terror = '';\n\toncontentchange(change: editrachange): void {\n\t\tthis.status = document changed: ${change.text.length} text characters.;\n\t}\n}\n\n\n event reference\n\n| output                   | payload                                       | typical use                                                            |\n| ------------------------ | --------------------------------------------- | ---------------------------------------------------------------------- |\n| contentchange            | editrachange: html, document, text            | update an application preview after a document edit                    |\n| selectionchange          | from, to positions                            | reflect the current document selection                                 |\n| transactionstate         | docchanged, selectionchanged, from, to, dirty | observe editing transactions without serializing the document yourself |\n| dirtychange              | boolean                                       | show a document-edited indicator                                       |\n| editorfocus / editorblur | void                                          | track editor focus                                                     |\n| editorready              | void                                          | wait for browser editor activation before using dom focus              |\n| editordestroyed          | void                                          | observe component teardown                                             |\n| editorerror              | error                                         | present a parsing or initialization error in application ui            |\n\nselection-only transactions do not emit contentchange. programmatic writes and component setters have different notification semantics from user edits; see [loading and saving](content.md).\n\n lifecycle and cleanup\n\ndom focus and blur calls are no-ops before browser activation. getters and document conversions can be used during server rendering. the component owns its browser view and destroys it on teardown. extensions must release their own subscriptions, event listeners, and node-view resources.\n\navoid writing the form value back into the editor on every contentchange: the form is already synchronized. this prevents feedback loops and unnecessary document replacement.\n",
	},
	{
		slug: 'toolbar',
		title: 'Toolbar',
		group: 'Build with Editra',
		source: 'docs/TOOLBAR.md',
		summary:
			'The toolbar includes text marks, history, block styles, fonts, sizes, colours, alignment,lists, indentation, media/link dialogs, tables, find/replace and fullscreen.',
		readingMinutes: 3,
		html: "<h1>Toolbar</h1>\n<p>The toolbar includes text marks, history, block styles, fonts, sizes, colours, alignment,\nlists, indentation, media/link dialogs, tables, find/replace and fullscreen.</p>\n<h2>Colour and highlight palettes</h2>\n<p>Font colour and text highlight use Word-style split buttons: the main icon applies the\ncurrent/last-used colour, and the arrow opens an anchored palette. With no font colour selected,\nthe main action is theme-aware Automatic. Font/cell palettes include\ntheme shades and standard colours. Highlight offers familiar highlighter colours.\nRecent colours, custom hex values and a native More colours picker are available.\nAutomatic removes the text-colour mark; No colour removes highlighting; No fill clears cell shading.\nChoosing a colour replaces that mark's value and preserves other formatting and the document selection.\nApplying the same colour does not toggle it off. Caret-only changes affect subsequent typing.</p>\n<p>Palette swatches support arrow/Home/End navigation, Enter activation and Escape closure.\nOutside clicks or moving focus out close the palette. Controls follow disabled/read-only states.\nThe public EditraColourPickerComponent exposes label, kind, value and disabled inputs;\ncolourChange emits a validated colour or null, and opened/closed events let adapters preserve selection.</p>\n<h2>Layout and customisation</h2>\n<p><code>config.toolbar.hidden</code> hides the complete toolbar. <code>config.toolbar.items</code> replaces the\ncommand-button list. Each item has <code>id</code>, <code>label</code>, <code>command</code> and an optional <code>icon</code>.\nBuilt-in actions use local SVG icons rather than text buttons. Buttons retain accessible labels,\ntooltips, selection preservation and disabled/active/mixed states. The default layout separates\nnative formatting selectors and insertion tools from grouped editing commands.</p>\n<p><code>icon</code> accepts a built-in icon name such as <code>bold</code>, <code>link</code>, <code>image</code> or <code>find</code>; omitted icons\nare inferred from the command. Existing plain-text custom glyphs such as <code>★</code> remain supported.\nUnknown custom commands use an extension icon. SVG strings are never interpreted as markup.\n<code>editraIconNames</code> and the <code>EditraIconName</code> type are exported from <code>ngx-editra</code> for discovery;\n<code>EditraIconComponent</code> is available for custom Angular UI. Icons inherit currentColor and work\nwithout fonts, external requests or a third-party icon dependency.\nExtension toolbar contributions are appended. <code>groups</code> supplies labeled command groups,\n<code>overflow: 'scroll'</code> is the default and keeps each toolbar row on one line, with horizontal\nscrolling when needed. Compact selectors leave more space for colour and insert tools.\nChoose <code>overflow: 'wrap'</code> for wrapped command groups on larger screens. <code>floating: true</code> enables\na selection toolbar. <code>hiddenItems</code> hides command IDs or formatting input labels. Table\noperations are contextual to a table selection. Native selectors show current/default/mixed values.\nIn editors up to 640px wide, both toolbar rows scroll horizontally instead of stacking\ninto a tall panel. This follows the editor's width, including narrow panels on desktop.\nCommand groups stay together, and keyboard focus brings off-screen buttons into view.\nTouch devices get 44px command targets. Active buttons retain their selected state on\nhover, and common command tooltips include their keyboard shortcuts.</p>\n<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const config: EditraConfig = {\n\ttoolbar: {\n\t\titems: [\n\t\t\t{ id: 'bold', label: 'Bold', command: 'bold', icon: 'bold' },\n\t\t\t{ id: 'undo', label: 'Undo', command: 'undo' },\n\t\t],\n\t},\n};\n</code></pre>\n<p>Toolbar buttons preserve the document selection on pointer interaction. Arrow/Home/End\nkeys move focus between enabled buttons. Mark buttons expose true/false/mixed pressed state.\nShortcuts use ProseMirror's Mod key: bold, italic, underline, undo/redo, indent/outdent.\nShift+Enter inserts a hard break. Native dialogs provide focus containment and Escape closure.</p>\n<p>Override dialog presentation with <code>provideEditraDialogs({ open, close })</code> from <code>ngx-editra</code>.\nThe default presenter uses showModal/close. Custom presenters must preserve focus containment,\nEscape behavior and focus return. Dialog contents and editor commands remain owned by the library.</p>\n",
		headings: [
			{
				id: 'colour-and-highlight-palettes',
				label: 'Colour and highlight palettes',
			},
			{
				id: 'layout-and-customisation',
				label: 'Layout and customisation',
			},
		],
		blocks: [
			{
				html: '<h1>Toolbar</h1>\n',
				id: 'toolbar',
				kind: 'content',
			},
			{
				html: '<p>The toolbar includes text marks, history, block styles, fonts, sizes, colours, alignment,\nlists, indentation, media/link dialogs, tables, find/replace and fullscreen.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Colour and highlight palettes</h2>\n',
				id: 'colour-and-highlight-palettes',
				kind: 'content',
			},
			{
				html: "<p>Font colour and text highlight use Word-style split buttons: the main icon applies the\ncurrent/last-used colour, and the arrow opens an anchored palette. With no font colour selected,\nthe main action is theme-aware Automatic. Font/cell palettes include\ntheme shades and standard colours. Highlight offers familiar highlighter colours.\nRecent colours, custom hex values and a native More colours picker are available.\nAutomatic removes the text-colour mark; No colour removes highlighting; No fill clears cell shading.\nChoosing a colour replaces that mark's value and preserves other formatting and the document selection.\nApplying the same colour does not toggle it off. Caret-only changes affect subsequent typing.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Palette swatches support arrow/Home/End navigation, Enter activation and Escape closure.\nOutside clicks or moving focus out close the palette. Controls follow disabled/read-only states.\nThe public EditraColourPickerComponent exposes label, kind, value and disabled inputs;\ncolourChange emits a validated colour or null, and opened/closed events let adapters preserve selection.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Layout and customisation</h2>\n',
				id: 'layout-and-customisation',
				kind: 'content',
			},
			{
				html: '<p><code>config.toolbar.hidden</code> hides the complete toolbar. <code>config.toolbar.items</code> replaces the\ncommand-button list. Each item has <code>id</code>, <code>label</code>, <code>command</code> and an optional <code>icon</code>.\nBuilt-in actions use local SVG icons rather than text buttons. Buttons retain accessible labels,\ntooltips, selection preservation and disabled/active/mixed states. The default layout separates\nnative formatting selectors and insertion tools from grouped editing commands.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p><code>icon</code> accepts a built-in icon name such as <code>bold</code>, <code>link</code>, <code>image</code> or <code>find</code>; omitted icons\nare inferred from the command. Existing plain-text custom glyphs such as <code>★</code> remain supported.\nUnknown custom commands use an extension icon. SVG strings are never interpreted as markup.\n<code>editraIconNames</code> and the <code>EditraIconName</code> type are exported from <code>ngx-editra</code> for discovery;\n<code>EditraIconComponent</code> is available for custom Angular UI. Icons inherit currentColor and work\nwithout fonts, external requests or a third-party icon dependency.\nExtension toolbar contributions are appended. <code>groups</code> supplies labeled command groups,\n<code>overflow: 'scroll'</code> is the default and keeps each toolbar row on one line, with horizontal\nscrolling when needed. Compact selectors leave more space for colour and insert tools.\nChoose <code>overflow: 'wrap'</code> for wrapped command groups on larger screens. <code>floating: true</code> enables\na selection toolbar. <code>hiddenItems</code> hides command IDs or formatting input labels. Table\noperations are contextual to a table selection. Native selectors show current/default/mixed values.\nIn editors up to 640px wide, both toolbar rows scroll horizontally instead of stacking\ninto a tall panel. This follows the editor's width, including narrow panels on desktop.\nCommand groups stay together, and keyboard focus brings off-screen buttons into view.\nTouch devices get 44px command targets. Active buttons retain their selected state on\nhover, and common command tooltips include their keyboard shortcuts.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				code: "import type { EditraConfig } from 'ngx-editra';\nexport const config: EditraConfig = {\n\ttoolbar: {\n\t\titems: [\n\t\t\t{ id: 'bold', label: 'Bold', command: 'bold', icon: 'bold' },\n\t\t\t{ id: 'undo', label: 'Undo', command: 'undo' },\n\t\t],\n\t},\n};\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const config: EditraConfig = {\n\ttoolbar: {\n\t\titems: [\n\t\t\t{ id: 'bold', label: 'Bold', command: 'bold', icon: 'bold' },\n\t\t\t{ id: 'undo', label: 'Undo', command: 'undo' },\n\t\t],\n\t},\n};\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: "<p>Toolbar buttons preserve the document selection on pointer interaction. Arrow/Home/End\nkeys move focus between enabled buttons. Mark buttons expose true/false/mixed pressed state.\nShortcuts use ProseMirror's Mod key: bold, italic, underline, undo/redo, indent/outdent.\nShift+Enter inserts a hard break. Native dialogs provide focus containment and Escape closure.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Override dialog presentation with <code>provideEditraDialogs({ open, close })</code> from <code>ngx-editra</code>.\nThe default presenter uses showModal/close. Custom presenters must preserve focus containment,\nEscape behavior and focus return. Dialog contents and editor commands remain owned by the library.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " toolbar\n\nthe toolbar includes text marks, history, block styles, fonts, sizes, colours, alignment,\nlists, indentation, media/link dialogs, tables, find/replace and fullscreen.\n\n colour and highlight palettes\n\nfont colour and text highlight use word-style split buttons: the main icon applies the\ncurrent/last-used colour, and the arrow opens an anchored palette. with no font colour selected,\nthe main action is theme-aware automatic. font/cell palettes include\ntheme shades and standard colours. highlight offers familiar highlighter colours.\nrecent colours, custom hex values and a native more colours picker are available.\nautomatic removes the text-colour mark; no colour removes highlighting; no fill clears cell shading.\nchoosing a colour replaces that mark's value and preserves other formatting and the document selection.\napplying the same colour does not toggle it off. caret-only changes affect subsequent typing.\n\npalette swatches support arrow/home/end navigation, enter activation and escape closure.\noutside clicks or moving focus out close the palette. controls follow disabled/read-only states.\nthe public editracolourpickercomponent exposes label, kind, value and disabled inputs;\ncolourchange emits a validated colour or null, and opened/closed events let adapters preserve selection.\n\n layout and customisation\n\nconfig.toolbar.hidden hides the complete toolbar. config.toolbar.items replaces the\ncommand-button list. each item has id, label, command and an optional icon.\nbuilt-in actions use local svg icons rather than text buttons. buttons retain accessible labels,\ntooltips, selection preservation and disabled/active/mixed states. the default layout separates\nnative formatting selectors and insertion tools from grouped editing commands.\n\nicon accepts a built-in icon name such as bold, link, image or find; omitted icons\nare inferred from the command. existing plain-text custom glyphs such as ★ remain supported.\nunknown custom commands use an extension icon. svg strings are never interpreted as markup.\neditraiconnames and the editraiconname type are exported from ngx-editra for discovery;\neditraiconcomponent is available for custom angular ui. icons inherit currentcolor and work\nwithout fonts, external requests or a third-party icon dependency.\nextension toolbar contributions are appended. groups supplies labeled command groups,\noverflow: 'scroll' is the default and keeps each toolbar row on one line, with horizontal\nscrolling when needed. compact selectors leave more space for colour and insert tools.\nchoose overflow: 'wrap' for wrapped command groups on larger screens. floating: true enables\na selection toolbar. hiddenitems hides command ids or formatting input labels. table\noperations are contextual to a table selection. native selectors show current/default/mixed values.\nin editors up to 640px wide, both toolbar rows scroll horizontally instead of stacking\ninto a tall panel. this follows the editor's width, including narrow panels on desktop.\ncommand groups stay together, and keyboard focus brings off-screen buttons into view.\ntouch devices get 44px command targets. active buttons retain their selected state on\nhover, and common command tooltips include their keyboard shortcuts.\n\ntypescript\nimport type { editraconfig } from 'ngx-editra';\nexport const config: editraconfig = {\n\ttoolbar: {\n\t\titems: [\n\t\t\t{ id: 'bold', label: 'bold', command: 'bold', icon: 'bold' },\n\t\t\t{ id: 'undo', label: 'undo', command: 'undo' },\n\t\t],\n\t},\n};\n\n\ntoolbar buttons preserve the document selection on pointer interaction. arrow/home/end\nkeys move focus between enabled buttons. mark buttons expose true/false/mixed pressed state.\nshortcuts use prosemirror's mod key: bold, italic, underline, undo/redo, indent/outdent.\nshift+enter inserts a hard break. native dialogs provide focus containment and escape closure.\n\noverride dialog presentation with provideeditradialogs({ open, close }) from ngx-editra.\nthe default presenter uses showmodal/close. custom presenters must preserve focus containment,\nescape behavior and focus return. dialog contents and editor commands remain owned by the library.\n",
	},
	{
		slug: 'theming',
		title: 'Theming',
		group: 'Build with Editra',
		source: 'docs/THEMING.md',
		summary:
			'Match the editor to your application with a theme, then adjust supported CSS custom properties when you need brand-specific colours. Editor and viewer styles load automatically; no global Sass import is required for either component.',
		readingMinutes: 3,
		html: '<h1>Theming</h1>\n<p>Match the editor to your application with a theme, then adjust supported CSS custom properties when you need brand-specific colours. Editor and viewer styles load automatically; no global Sass import is required for either component.</p>\n<p>For pages with a fixed header, set <code>--editra-sticky-offset</code> on <code>ngx-editra</code> to its height,\nincluding responsive overrides. This overrides <code>config.toolbar.stickyOffset</code> when pinned;\nfullscreen mode always uses a zero offset.</p>\n<pre><code class="language-typescript">import type { EditraConfig } from \'ngx-editra\';\nexport const config: EditraConfig = { theme: \'auto\' };\n</code></pre>\n<p>Bind this config through the editor\'s config input. Auto follows the operating system\'s preferred colour scheme; choose light or dark for an explicit application setting.</p>\n<pre><code class="language-scss">ngx-editra {\n\t--editra-focus: #155d4f;\n\t--editra-border: #b8c7c1;\n}\n</code></pre>\n<h2>Themes, variables, and contrast</h2>\n<p>Choose light, dark or auto (prefers-color-scheme) through config.theme. Styles are scoped to the\nAngular editor; the public ProseMirror stylesheet targets only editor-generated class names.</p>\n<p>Override CSS custom properties on ngx-editra: --editra-surface, --editra-text,\n--editra-border, --editra-active and --editra-focus. Preserve contrast and visible focus.\nFonts are constrained to Arial, Georgia, Verdana, Times New Roman and monospace.\nBuilt-in toolbar icons use local SVG paths; custom text glyphs are supported. Arbitrary SVG/HTML strings are not interpreted as markup.</p>\n<p>The UI respects reduced motion, wraps on narrow screens, and provides 36px editor controls.\nWCAG automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.</p>\n<h2>Rendering saved HTML</h2>\n<p>Import <code>NgxEditraViewerComponent</code> from <code>ngx-editra</code> and use:</p>\n<pre><code class="language-html">&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot; [config]=&quot;config&quot; /&gt;\n</code></pre>\n<p>The viewer renders headings, marks, lists, links, inline code, code blocks with language\nlabels, blockquotes, tables, images, captions, videos, dividers and columns. It uses the\nsame validated schema and content styles as the editor, without editing controls. Pass\nthe same configuration to retain custom extensions, video providers and URL policy.\nLight, dark and auto themes are supported. The viewer includes code copy controls.\nLanguage editing controls belong to the editor; saved HTML retains code text and language metadata.</p>\n<p>For HTML rendered outside Angular, include <code>ngx-editra/styles/content.scss</code> and wrap\ncanonical HTML from <code>getHTML()</code> or <code>serializeHTML()</code> in a <code>.editra-content</code> container.\nThe existing <code>editor.scss</code> entry point also includes these styles. Never insert untrusted\nraw HTML directly; the viewer validates input before rendering it.</p>\n<h2>Using Angular innerHTML</h2>\n<p>For automatic rendering, styles and code-copy buttons, import <code>EditraContentDirective</code> and use <code>&lt;div [editraContent]=&quot;savedHtml&quot;&gt;&lt;/div&gt;</code>. Optionally add <code>[editraContentConfig]=&quot;config&quot;</code> for a theme or custom extensions. No pipe, separate copy directive or Sass import is needed. See <a href="/guides/viewer">Display saved content</a>.</p>\n<p>Import the standalone <code>EditraHtmlPipe</code> from <code>ngx-editra</code> in your component imports. Styles load automatically; use:</p>\n<pre><code class="language-html">&lt;div [innerHTML]=&quot;savedHtml | editraHtml&quot;&gt;&lt;/div&gt;\n</code></pre>\n<p>The pipe validates saved HTML with the editor schema before trusting its output and adds a styled content wrapper. Configuration is optional: use <code>editraHtml: config</code> when needed.\nPlain Angular <code>[innerHTML]=&quot;savedHtml&quot;</code> strips inline styles and embedded players;\nthe pipe preserves approved formatting and video URLs. Pass the editor configuration\nfor the same extensions and URL policy, and replace the configuration object when it changes.\nDo not bypass Angular sanitization directly on raw saved HTML.</p>\n<p>Exported HTML also includes portable inline styles for code, blockquotes and table cells,\nso native <code>element.innerHTML</code> retains their basic appearance without editor CSS.\nThe shared stylesheet adds spacing, language labels and responsive presentation.\nThe <code>editraCodeCopy</code> directive adds accessible copy icons, clipboard handling and status\nfeedback to rendered code blocks, including when the HTML changes. <code>ngx-editra-viewer</code>\nalready includes it. Clipboard access requires HTTPS or localhost. Copy controls stay\nout of saved HTML; language selectors and resize handles remain editor-only.</p>\n',
		headings: [
			{
				id: 'themes-variables-and-contrast',
				label: 'Themes, variables, and contrast',
			},
			{
				id: 'rendering-saved-html',
				label: 'Rendering saved HTML',
			},
			{
				id: 'using-angular-innerhtml',
				label: 'Using Angular innerHTML',
			},
		],
		blocks: [
			{
				html: '<h1>Theming</h1>\n',
				id: 'theming',
				kind: 'content',
			},
			{
				html: '<p>Match the editor to your application with a theme, then adjust supported CSS custom properties when you need brand-specific colours. Editor and viewer styles load automatically; no global Sass import is required for either component.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>For pages with a fixed header, set <code>--editra-sticky-offset</code> on <code>ngx-editra</code> to its height,\nincluding responsive overrides. This overrides <code>config.toolbar.stickyOffset</code> when pinned;\nfullscreen mode always uses a zero offset.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "import type { EditraConfig } from 'ngx-editra';\nexport const config: EditraConfig = { theme: 'auto' };\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const config: EditraConfig = { theme: 'auto' };\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: "<p>Bind this config through the editor's config input. Auto follows the operating system's preferred colour scheme; choose light or dark for an explicit application setting.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				code: 'ngx-editra {\n\t--editra-focus: #155d4f;\n\t--editra-border: #b8c7c1;\n}\n',
				language: 'scss',
				html: '<pre><code class="language-scss">ngx-editra {\n\t--editra-focus: #155d4f;\n\t--editra-border: #b8c7c1;\n}\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<h2>Themes, variables, and contrast</h2>\n',
				id: 'themes-variables-and-contrast',
				kind: 'content',
			},
			{
				html: '<p>Choose light, dark or auto (prefers-color-scheme) through config.theme. Styles are scoped to the\nAngular editor; the public ProseMirror stylesheet targets only editor-generated class names.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Override CSS custom properties on ngx-editra: --editra-surface, --editra-text,\n--editra-border, --editra-active and --editra-focus. Preserve contrast and visible focus.\nFonts are constrained to Arial, Georgia, Verdana, Times New Roman and monospace.\nBuilt-in toolbar icons use local SVG paths; custom text glyphs are supported. Arbitrary SVG/HTML strings are not interpreted as markup.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The UI respects reduced motion, wraps on narrow screens, and provides 36px editor controls.\nWCAG automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Rendering saved HTML</h2>\n',
				id: 'rendering-saved-html',
				kind: 'content',
			},
			{
				html: '<p>Import <code>NgxEditraViewerComponent</code> from <code>ngx-editra</code> and use:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: '<ngx-editra-viewer [html]="savedHtml" [config]="config" />\n',
				language: 'html',
				html: '<pre><code class="language-html">&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot; [config]=&quot;config&quot; /&gt;\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>The viewer renders headings, marks, lists, links, inline code, code blocks with language\nlabels, blockquotes, tables, images, captions, videos, dividers and columns. It uses the\nsame validated schema and content styles as the editor, without editing controls. Pass\nthe same configuration to retain custom extensions, video providers and URL policy.\nLight, dark and auto themes are supported. The viewer includes code copy controls.\nLanguage editing controls belong to the editor; saved HTML retains code text and language metadata.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>For HTML rendered outside Angular, include <code>ngx-editra/styles/content.scss</code> and wrap\ncanonical HTML from <code>getHTML()</code> or <code>serializeHTML()</code> in a <code>.editra-content</code> container.\nThe existing <code>editor.scss</code> entry point also includes these styles. Never insert untrusted\nraw HTML directly; the viewer validates input before rendering it.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Using Angular innerHTML</h2>\n',
				id: 'using-angular-innerhtml',
				kind: 'content',
			},
			{
				html: '<p>For automatic rendering, styles and code-copy buttons, import <code>EditraContentDirective</code> and use <code>&lt;div [editraContent]=&quot;savedHtml&quot;&gt;&lt;/div&gt;</code>. Optionally add <code>[editraContentConfig]=&quot;config&quot;</code> for a theme or custom extensions. No pipe, separate copy directive or Sass import is needed. See <a href="/guides/viewer">Display saved content</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Import the standalone <code>EditraHtmlPipe</code> from <code>ngx-editra</code> in your component imports. Styles load automatically; use:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: '<div [innerHTML]="savedHtml | editraHtml"></div>\n',
				language: 'html',
				html: '<pre><code class="language-html">&lt;div [innerHTML]=&quot;savedHtml | editraHtml&quot;&gt;&lt;/div&gt;\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>The pipe validates saved HTML with the editor schema before trusting its output and adds a styled content wrapper. Configuration is optional: use <code>editraHtml: config</code> when needed.\nPlain Angular <code>[innerHTML]=&quot;savedHtml&quot;</code> strips inline styles and embedded players;\nthe pipe preserves approved formatting and video URLs. Pass the editor configuration\nfor the same extensions and URL policy, and replace the configuration object when it changes.\nDo not bypass Angular sanitization directly on raw saved HTML.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Exported HTML also includes portable inline styles for code, blockquotes and table cells,\nso native <code>element.innerHTML</code> retains their basic appearance without editor CSS.\nThe shared stylesheet adds spacing, language labels and responsive presentation.\nThe <code>editraCodeCopy</code> directive adds accessible copy icons, clipboard handling and status\nfeedback to rendered code blocks, including when the HTML changes. <code>ngx-editra-viewer</code>\nalready includes it. Clipboard access requires HTTPS or localhost. Copy controls stay\nout of saved HTML; language selectors and resize handles remain editor-only.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' theming\n\nmatch the editor to your application with a theme, then adjust supported css custom properties when you need brand-specific colours. editor and viewer styles load automatically; no global sass import is required for either component.\n\nfor pages with a fixed header, set --editra-sticky-offset on ngx-editra to its height,\nincluding responsive overrides. this overrides config.toolbar.stickyoffset when pinned;\nfullscreen mode always uses a zero offset.\n\ntypescript\nimport type { editraconfig } from \'ngx-editra\';\nexport const config: editraconfig = { theme: \'auto\' };\n\n\nbind this config through the editor\'s config input. auto follows the operating system\'s preferred colour scheme; choose light or dark for an explicit application setting.\n\nscss\nngx-editra {\n\t--editra-focus: 155d4f;\n\t--editra-border: b8c7c1;\n}\n\n\n themes, variables, and contrast\n\nchoose light, dark or auto (prefers-color-scheme) through config.theme. styles are scoped to the\nangular editor; the public prosemirror stylesheet targets only editor-generated class names.\n\noverride css custom properties on ngx-editra: --editra-surface, --editra-text,\n--editra-border, --editra-active and --editra-focus. preserve contrast and visible focus.\nfonts are constrained to arial, georgia, verdana, times new roman and monospace.\nbuilt-in toolbar icons use local svg paths; custom text glyphs are supported. arbitrary svg/html strings are not interpreted as markup.\n\nthe ui respects reduced motion, wraps on narrow screens, and provides 36px editor controls.\nwcag automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.\n\n rendering saved html\n\nimport ngxeditraviewercomponent from ngx-editra and use:\n\nhtml\n<ngx-editra-viewer [html]="savedhtml" [config]="config" />\n\n\nthe viewer renders headings, marks, lists, links, inline code, code blocks with language\nlabels, blockquotes, tables, images, captions, videos, dividers and columns. it uses the\nsame validated schema and content styles as the editor, without editing controls. pass\nthe same configuration to retain custom extensions, video providers and url policy.\nlight, dark and auto themes are supported. the viewer includes code copy controls.\nlanguage editing controls belong to the editor; saved html retains code text and language metadata.\n\nfor html rendered outside angular, include ngx-editra/styles/content.scss and wrap\ncanonical html from gethtml() or serializehtml() in a .editra-content container.\nthe existing editor.scss entry point also includes these styles. never insert untrusted\nraw html directly; the viewer validates input before rendering it.\n\n using angular innerhtml\n\nfor automatic rendering, styles and code-copy buttons, import editracontentdirective and use <div [editracontent]="savedhtml"></div>. optionally add [editracontentconfig]="config" for a theme or custom extensions. no pipe, separate copy directive or sass import is needed. see [display saved content](viewer.md).\n\nimport the standalone editrahtmlpipe from ngx-editra in your component imports. styles load automatically; use:\n\nhtml\n<div [innerhtml]="savedhtml | editrahtml"></div>\n\n\nthe pipe validates saved html with the editor schema before trusting its output and adds a styled content wrapper. configuration is optional: use editrahtml: config when needed.\nplain angular [innerhtml]="savedhtml" strips inline styles and embedded players;\nthe pipe preserves approved formatting and video urls. pass the editor configuration\nfor the same extensions and url policy, and replace the configuration object when it changes.\ndo not bypass angular sanitization directly on raw saved html.\n\nexported html also includes portable inline styles for code, blockquotes and table cells,\nso native element.innerhtml retains their basic appearance without editor css.\nthe shared stylesheet adds spacing, language labels and responsive presentation.\nthe editracodecopy directive adds accessible copy icons, clipboard handling and status\nfeedback to rendered code blocks, including when the html changes. ngx-editra-viewer\nalready includes it. clipboard access requires https or localhost. copy controls stay\nout of saved html; language selectors and resize handles remain editor-only.\n',
	},
	{
		slug: 'formatting',
		title: 'Text formatting',
		group: 'Editor features',
		source: 'docs/FORMATTING.md',
		summary:
			'Use the toolbar to change how content looks without writing HTML. Most text tools apply to selected text; when there is only a caret, mark tools affect what you type next.',
		readingMinutes: 3,
		html: '<h1>Text and paragraph formatting</h1>\n<p>Use the toolbar to change how content looks without writing HTML. Most text tools apply to selected text; when there is only a caret, mark tools affect what you type next.</p>\n<h2>Format text</h2>\n<ol>\n<li>Select a word or sentence in the editor.</li>\n<li>Choose Bold, Italic, Underline, Strike, Subscript, or Superscript.</li>\n<li>Choose the same toggle again to remove that mark. Clear formatting removes text marks from the selection.</li>\n</ol>\n<p>Bold, italic, and underline also support the platform modifier key: Ctrl on Windows/Linux or Command on macOS, together with B, I, or U.</p>\n<h2>Headings, fonts, and size</h2>\n<p>Use Paragraph style to choose a paragraph or heading level. Headings describe document structure; use them in a logical order instead of using size alone to create a heading.</p>\n<p>Font controls support Arial, Georgia, Verdana, Times New Roman, and monospace. Font-size values and imported styles are validated. A mixed indicator means the current selection contains more than one value; choosing a value applies it to the selection.</p>\n<h2>Text colour and highlighting</h2>\n<p>The main colour button applies the last chosen colour. Its arrow opens a palette. Pick a theme colour, a standard colour, a recent colour, or a custom value. Automatic removes the explicit text colour. No colour removes highlighting. Applying the same colour again keeps it applied rather than toggling it off.</p>\n<p>Use colour with sufficient contrast in both themes. Do not use colour as the only way to convey meaning.</p>\n<h2>Convert text case</h2>\n<p>Select text and use Text case. Choices include uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and toggle case. Conversion changes the selected text while retaining its marks. In a selected table-cell range, the conversion is limited to those cells.</p>\n<h2>Paragraph layout</h2>\n<table>\n<thead>\n<tr>\n<th>Tool</th>\n<th>How to use it</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Left, centre, right, justify</td>\n<td>Place the caret in a paragraph, or select paragraphs, then choose an alignment</td>\n</tr>\n<tr>\n<td>Line height</td>\n<td>Choose spacing for the selected paragraph content</td>\n</tr>\n<tr>\n<td>Bullet or numbered list</td>\n<td>Select paragraphs and activate the appropriate list tool</td>\n</tr>\n<tr>\n<td>Indent / outdent</td>\n<td>Adjust paragraph indentation or the nesting level of list items</td>\n</tr>\n<tr>\n<td>Blockquote</td>\n<td>Use for quoted content rather than simply italicizing a paragraph</td>\n</tr>\n<tr>\n<td>Inline code</td>\n<td>Add the code command to a custom toolbar, or import code markup; see the code-block guide</td>\n</tr>\n</tbody>\n</table>\n<p>Enter creates a new block. Shift+Enter creates a line break inside the current block. Undo restores a previous document state.</p>\n<h2>Configure the visible tools</h2>\n<p>Toolbar configuration controls presentation; hiding a button does not remove its document feature or sanitize imported content. Use schema feature configuration when you need to disable supported image, video, or table content. See <a href="/guides/toolbar">toolbar configuration</a> and <a href="/guides/configuration">configuration</a>.</p>\n',
		headings: [
			{
				id: 'format-text',
				label: 'Format text',
			},
			{
				id: 'headings-fonts-and-size',
				label: 'Headings, fonts, and size',
			},
			{
				id: 'text-colour-and-highlighting',
				label: 'Text colour and highlighting',
			},
			{
				id: 'convert-text-case',
				label: 'Convert text case',
			},
			{
				id: 'paragraph-layout',
				label: 'Paragraph layout',
			},
			{
				id: 'configure-the-visible-tools',
				label: 'Configure the visible tools',
			},
		],
		blocks: [
			{
				html: '<h1>Text and paragraph formatting</h1>\n',
				id: 'text-and-paragraph-formatting',
				kind: 'content',
			},
			{
				html: '<p>Use the toolbar to change how content looks without writing HTML. Most text tools apply to selected text; when there is only a caret, mark tools affect what you type next.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Format text</h2>\n',
				id: 'format-text',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Select a word or sentence in the editor.</li>\n<li>Choose Bold, Italic, Underline, Strike, Subscript, or Superscript.</li>\n<li>Choose the same toggle again to remove that mark. Clear formatting removes text marks from the selection.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Bold, italic, and underline also support the platform modifier key: Ctrl on Windows/Linux or Command on macOS, together with B, I, or U.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Headings, fonts, and size</h2>\n',
				id: 'headings-fonts-and-size',
				kind: 'content',
			},
			{
				html: '<p>Use Paragraph style to choose a paragraph or heading level. Headings describe document structure; use them in a logical order instead of using size alone to create a heading.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Font controls support Arial, Georgia, Verdana, Times New Roman, and monospace. Font-size values and imported styles are validated. A mixed indicator means the current selection contains more than one value; choosing a value applies it to the selection.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Text colour and highlighting</h2>\n',
				id: 'text-colour-and-highlighting',
				kind: 'content',
			},
			{
				html: '<p>The main colour button applies the last chosen colour. Its arrow opens a palette. Pick a theme colour, a standard colour, a recent colour, or a custom value. Automatic removes the explicit text colour. No colour removes highlighting. Applying the same colour again keeps it applied rather than toggling it off.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Use colour with sufficient contrast in both themes. Do not use colour as the only way to convey meaning.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Convert text case</h2>\n',
				id: 'convert-text-case',
				kind: 'content',
			},
			{
				html: '<p>Select text and use Text case. Choices include uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and toggle case. Conversion changes the selected text while retaining its marks. In a selected table-cell range, the conversion is limited to those cells.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Paragraph layout</h2>\n',
				id: 'paragraph-layout',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Tool</th>\n<th>How to use it</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Left, centre, right, justify</td>\n<td>Place the caret in a paragraph, or select paragraphs, then choose an alignment</td>\n</tr>\n<tr>\n<td>Line height</td>\n<td>Choose spacing for the selected paragraph content</td>\n</tr>\n<tr>\n<td>Bullet or numbered list</td>\n<td>Select paragraphs and activate the appropriate list tool</td>\n</tr>\n<tr>\n<td>Indent / outdent</td>\n<td>Adjust paragraph indentation or the nesting level of list items</td>\n</tr>\n<tr>\n<td>Blockquote</td>\n<td>Use for quoted content rather than simply italicizing a paragraph</td>\n</tr>\n<tr>\n<td>Inline code</td>\n<td>Add the code command to a custom toolbar, or import code markup; see the code-block guide</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Enter creates a new block. Shift+Enter creates a line break inside the current block. Undo restores a previous document state.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Configure the visible tools</h2>\n',
				id: 'configure-the-visible-tools',
				kind: 'content',
			},
			{
				html: '<p>Toolbar configuration controls presentation; hiding a button does not remove its document feature or sanitize imported content. Use schema feature configuration when you need to disable supported image, video, or table content. See <a href="/guides/toolbar">toolbar configuration</a> and <a href="/guides/configuration">configuration</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' text and paragraph formatting\n\nuse the toolbar to change how content looks without writing html. most text tools apply to selected text; when there is only a caret, mark tools affect what you type next.\n\n format text\n\n1. select a word or sentence in the editor.\n2. choose bold, italic, underline, strike, subscript, or superscript.\n3. choose the same toggle again to remove that mark. clear formatting removes text marks from the selection.\n\nbold, italic, and underline also support the platform modifier key: ctrl on windows/linux or command on macos, together with b, i, or u.\n\n headings, fonts, and size\n\nuse paragraph style to choose a paragraph or heading level. headings describe document structure; use them in a logical order instead of using size alone to create a heading.\n\nfont controls support arial, georgia, verdana, times new roman, and monospace. font-size values and imported styles are validated. a mixed indicator means the current selection contains more than one value; choosing a value applies it to the selection.\n\n text colour and highlighting\n\nthe main colour button applies the last chosen colour. its arrow opens a palette. pick a theme colour, a standard colour, a recent colour, or a custom value. automatic removes the explicit text colour. no colour removes highlighting. applying the same colour again keeps it applied rather than toggling it off.\n\nuse colour with sufficient contrast in both themes. do not use colour as the only way to convey meaning.\n\n convert text case\n\nselect text and use text case. choices include uppercase, lowercase, title case, sentence case, camelcase, pascalcase, snake_case, kebab-case, and toggle case. conversion changes the selected text while retaining its marks. in a selected table-cell range, the conversion is limited to those cells.\n\n paragraph layout\n\n| tool                         | how to use it                                                                             |\n| ---------------------------- | ----------------------------------------------------------------------------------------- |\n| left, centre, right, justify | place the caret in a paragraph, or select paragraphs, then choose an alignment            |\n| line height                  | choose spacing for the selected paragraph content                                         |\n| bullet or numbered list      | select paragraphs and activate the appropriate list tool                                  |\n| indent / outdent             | adjust paragraph indentation or the nesting level of list items                           |\n| blockquote                   | use for quoted content rather than simply italicizing a paragraph                         |\n| inline code                  | add the code command to a custom toolbar, or import code markup; see the code-block guide |\n\nenter creates a new block. shift+enter creates a line break inside the current block. undo restores a previous document state.\n\n configure the visible tools\n\ntoolbar configuration controls presentation; hiding a button does not remove its document feature or sanitize imported content. use schema feature configuration when you need to disable supported image, video, or table content. see [toolbar configuration](toolbar.md) and [configuration](configuration.md).\n',
	},
	{
		slug: 'links',
		title: 'Links',
		group: 'Editor features',
		source: 'docs/LINKS.md',
		summary:
			'Links let readers open a web page or an email address. The editor validates URLs before adding them to the document.',
		readingMinutes: 1,
		html: '<h1>Links</h1>\n<p>Links let readers open a web page or an email address. The editor validates URLs before adding them to the document.</p>\n<h2>Insert or edit a link</h2>\n<ol>\n<li>Select the text that should become a link.</li>\n<li>Open the link tool and enter an absolute HTTPS URL, such as https://example.com/help.</li>\n<li>Apply the dialog. To change an existing link, select its text and reopen the tool.</li>\n</ol>\n<p>Email links can use mailto, such as mailto:help@example.com. Automatic link handling also recognizes supported web URLs while editing. New-tab links use noopener/noreferrer.</p>\n<h2>URL rules</h2>\n<p>HTTPS is the default. Relative URLs, credentials in URLs, control characters, and javascript/data/file URLs are rejected. HTTP requires an explicit security configuration; only enable it for a deliberate application requirement.</p>\n<pre><code class="language-typescript">import type { EditraConfig } from \'ngx-editra\';\n\nexport const config: EditraConfig = {\n\tsecurity: { allowHttp: false },\n};\n</code></pre>\n<p>A link target being valid does not mean its content is safe or available. Validate saved content on your server and apply your own authorization and URL policy. See <a href="/guides/security">security</a>.</p>\n',
		headings: [
			{
				id: 'insert-or-edit-a-link',
				label: 'Insert or edit a link',
			},
			{
				id: 'url-rules',
				label: 'URL rules',
			},
		],
		blocks: [
			{
				html: '<h1>Links</h1>\n',
				id: 'links',
				kind: 'content',
			},
			{
				html: '<p>Links let readers open a web page or an email address. The editor validates URLs before adding them to the document.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Insert or edit a link</h2>\n',
				id: 'insert-or-edit-a-link',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Select the text that should become a link.</li>\n<li>Open the link tool and enter an absolute HTTPS URL, such as https://example.com/help.</li>\n<li>Apply the dialog. To change an existing link, select its text and reopen the tool.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Email links can use mailto, such as mailto:help@example.com. Automatic link handling also recognizes supported web URLs while editing. New-tab links use noopener/noreferrer.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>URL rules</h2>\n',
				id: 'url-rules',
				kind: 'content',
			},
			{
				html: '<p>HTTPS is the default. Relative URLs, credentials in URLs, control characters, and javascript/data/file URLs are rejected. HTTP requires an explicit security configuration; only enable it for a deliberate application requirement.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "import type { EditraConfig } from 'ngx-editra';\n\nexport const config: EditraConfig = {\n\tsecurity: { allowHttp: false },\n};\n",
				language: 'typescript',
				html: '<pre><code class="language-typescript">import type { EditraConfig } from \'ngx-editra\';\n\nexport const config: EditraConfig = {\n\tsecurity: { allowHttp: false },\n};\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>A link target being valid does not mean its content is safe or available. Validate saved content on your server and apply your own authorization and URL policy. See <a href="/guides/security">security</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " links\n\nlinks let readers open a web page or an email address. the editor validates urls before adding them to the document.\n\n insert or edit a link\n\n1. select the text that should become a link.\n2. open the link tool and enter an absolute https url, such as https://example.com/help.\n3. apply the dialog. to change an existing link, select its text and reopen the tool.\n\nemail links can use mailto, such as mailto:help@example.com. automatic link handling also recognizes supported web urls while editing. new-tab links use noopener/noreferrer.\n\n url rules\n\nhttps is the default. relative urls, credentials in urls, control characters, and javascript/data/file urls are rejected. http requires an explicit security configuration; only enable it for a deliberate application requirement.\n\ntypescript\nimport type { editraconfig } from 'ngx-editra';\n\nexport const config: editraconfig = {\n\tsecurity: { allowhttp: false },\n};\n\n\na link target being valid does not mean its content is safe or available. validate saved content on your server and apply your own authorization and url policy. see [security](security.md).\n",
	},
	{
		slug: 'images',
		title: 'Images',
		group: 'Editor features',
		source: 'docs/IMAGES.md',
		summary:
			'Add an image that is already hosted at an accessible HTTPS URL. The library inserts and edits image content; it does not upload files.',
		readingMinutes: 2,
		html: '<h1>Images</h1>\n<p>Add an image that is already hosted at an accessible HTTPS URL. The library inserts and edits image content; it does not upload files.</p>\n<h2>Insert your first image</h2>\n<ol>\n<li>Place the caret where the image should appear and open the image tool.</li>\n<li>Enter the image URL, add meaningful alternative text, and apply. A public image URL should return an image, not a website page.</li>\n<li>Select the inserted image to open its contextual tools. Reopen the image dialog to update alternative text and, if useful, add a caption.</li>\n<li>Drag the corner handle to resize, or focus the handle and use arrow keys. Save the HTML form value to retain the result.</li>\n</ol>\n<p>Use Add content beside image for an independent text column next to the image. See <a href="/guides/layout">columns</a>. For a smaller display without manual pixel sizing, use automatic sizing and the available content-width controls.</p>\n<h2>Image settings and behavior</h2>\n<p>Images are URL-only block nodes. The dialog supports HTTPS URL, alternative text, caption,\nwidth/height, alignment, border, radius, spacing, wrapping and aspect-ratio preservation.\nWidth and height start blank (Auto). With both blank, images use their natural size,\nlimited to the available content width. Choose Full content width to span the content area\nresponsively, or enter pixel dimensions for a custom size. Left/centre/right alignment\npositions the media itself; captions wrap within its width.\nSelect an image then reopen the dialog to edit/replace it; Delete selection removes it.\nPointer handles and arrow keys resize it through one persisted ProseMirror transaction.\nThe corner handle follows the image, supports horizontal and vertical dragging, and starts\nfrom its displayed size. Maintain aspect ratio enables proportional resizing; disabling it\nallows independent width/height changes. Resizing full-width media switches it to a custom\nsize. Escape/pointer cancellation restores the original size. Shift+Arrow uses a 1 px step.\nDimensions survive HTML/JSON round trips and undo/redo. Copy media URL uses the browser clipboard.</p>\n<p><code>imageExtension()</code> from <code>ngx-editra</code> supplies interactive node views. The default\nAngular adapter registers it; custom extension lists should register it explicitly.\n<code>config.image.enabled = false</code> removes the node from the schema. <code>pasteUrls</code> optionally\nconverts plain supported image URLs into images. Files, base64 uploads and file pickers are absent.</p>\n<p>A valid URL can still fail due to network errors, CORS/embedding policy, authentication or\nhotlink protection. Node views announce image load failure. The library cannot reliably\ndistinguish all remote causes. Captions export as figure/figcaption; image attributes are constrained.</p>\n',
		headings: [
			{
				id: 'insert-your-first-image',
				label: 'Insert your first image',
			},
			{
				id: 'image-settings-and-behavior',
				label: 'Image settings and behavior',
			},
		],
		blocks: [
			{
				html: '<h1>Images</h1>\n',
				id: 'images',
				kind: 'content',
			},
			{
				html: '<p>Add an image that is already hosted at an accessible HTTPS URL. The library inserts and edits image content; it does not upload files.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Insert your first image</h2>\n',
				id: 'insert-your-first-image',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Place the caret where the image should appear and open the image tool.</li>\n<li>Enter the image URL, add meaningful alternative text, and apply. A public image URL should return an image, not a website page.</li>\n<li>Select the inserted image to open its contextual tools. Reopen the image dialog to update alternative text and, if useful, add a caption.</li>\n<li>Drag the corner handle to resize, or focus the handle and use arrow keys. Save the HTML form value to retain the result.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Use Add content beside image for an independent text column next to the image. See <a href="/guides/layout">columns</a>. For a smaller display without manual pixel sizing, use automatic sizing and the available content-width controls.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Image settings and behavior</h2>\n',
				id: 'image-settings-and-behavior',
				kind: 'content',
			},
			{
				html: '<p>Images are URL-only block nodes. The dialog supports HTTPS URL, alternative text, caption,\nwidth/height, alignment, border, radius, spacing, wrapping and aspect-ratio preservation.\nWidth and height start blank (Auto). With both blank, images use their natural size,\nlimited to the available content width. Choose Full content width to span the content area\nresponsively, or enter pixel dimensions for a custom size. Left/centre/right alignment\npositions the media itself; captions wrap within its width.\nSelect an image then reopen the dialog to edit/replace it; Delete selection removes it.\nPointer handles and arrow keys resize it through one persisted ProseMirror transaction.\nThe corner handle follows the image, supports horizontal and vertical dragging, and starts\nfrom its displayed size. Maintain aspect ratio enables proportional resizing; disabling it\nallows independent width/height changes. Resizing full-width media switches it to a custom\nsize. Escape/pointer cancellation restores the original size. Shift+Arrow uses a 1 px step.\nDimensions survive HTML/JSON round trips and undo/redo. Copy media URL uses the browser clipboard.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p><code>imageExtension()</code> from <code>ngx-editra</code> supplies interactive node views. The default\nAngular adapter registers it; custom extension lists should register it explicitly.\n<code>config.image.enabled = false</code> removes the node from the schema. <code>pasteUrls</code> optionally\nconverts plain supported image URLs into images. Files, base64 uploads and file pickers are absent.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>A valid URL can still fail due to network errors, CORS/embedding policy, authentication or\nhotlink protection. Node views announce image load failure. The library cannot reliably\ndistinguish all remote causes. Captions export as figure/figcaption; image attributes are constrained.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' images\n\nadd an image that is already hosted at an accessible https url. the library inserts and edits image content; it does not upload files.\n\n insert your first image\n\n1. place the caret where the image should appear and open the image tool.\n2. enter the image url, add meaningful alternative text, and apply. a public image url should return an image, not a website page.\n3. select the inserted image to open its contextual tools. reopen the image dialog to update alternative text and, if useful, add a caption.\n4. drag the corner handle to resize, or focus the handle and use arrow keys. save the html form value to retain the result.\n\nuse add content beside image for an independent text column next to the image. see [columns](layout.md). for a smaller display without manual pixel sizing, use automatic sizing and the available content-width controls.\n\n image settings and behavior\n\nimages are url-only block nodes. the dialog supports https url, alternative text, caption,\nwidth/height, alignment, border, radius, spacing, wrapping and aspect-ratio preservation.\nwidth and height start blank (auto). with both blank, images use their natural size,\nlimited to the available content width. choose full content width to span the content area\nresponsively, or enter pixel dimensions for a custom size. left/centre/right alignment\npositions the media itself; captions wrap within its width.\nselect an image then reopen the dialog to edit/replace it; delete selection removes it.\npointer handles and arrow keys resize it through one persisted prosemirror transaction.\nthe corner handle follows the image, supports horizontal and vertical dragging, and starts\nfrom its displayed size. maintain aspect ratio enables proportional resizing; disabling it\nallows independent width/height changes. resizing full-width media switches it to a custom\nsize. escape/pointer cancellation restores the original size. shift+arrow uses a 1 px step.\ndimensions survive html/json round trips and undo/redo. copy media url uses the browser clipboard.\n\nimageextension() from ngx-editra supplies interactive node views. the default\nangular adapter registers it; custom extension lists should register it explicitly.\nconfig.image.enabled = false removes the node from the schema. pasteurls optionally\nconverts plain supported image urls into images. files, base64 uploads and file pickers are absent.\n\na valid url can still fail due to network errors, cors/embedding policy, authentication or\nhotlink protection. node views announce image load failure. the library cannot reliably\ndistinguish all remote causes. captions export as figure/figcaption; image attributes are constrained.\n',
	},
	{
		slug: 'videos',
		title: 'Videos',
		group: 'Editor features',
		source: 'docs/VIDEOS.md',
		summary:
			'Insert a supported video URL rather than pasting iframe markup. The editor creates a constrained embed or direct video element and saves the original URL with the document.',
		readingMinutes: 2,
		html: "<h1>Videos</h1>\n<p>Insert a supported video URL rather than pasting iframe markup. The editor creates a constrained embed or direct video element and saves the original URL with the document.</p>\n<h2>Insert a video</h2>\n<ol>\n<li>Place the caret and open the video tool.</li>\n<li>Paste a supported public YouTube, Vimeo, or direct MP4 URL.</li>\n<li>Apply, then select the video to edit its layout, caption, or dimensions.</li>\n<li>Use the resize handle or full-content-width setting and save the normal HTML form value.</li>\n</ol>\n<p>If playback fails, check the host's permissions and your application's CSP. Private/protected media, blocked providers, and arbitrary embed HTML are not made accessible by the editor. See <a href=\"/guides/troubleshooting\">troubleshooting</a>.</p>\n<h2>Providers and sizing</h2>\n<p>Supported public URLs: YouTube watch/shortened/Shorts URLs with valid video IDs, numeric Vimeo\nURLs and direct MP4 paths. Other providers require explicit registration. Original URL is persisted\nalongside canonical provider-generated embedding. Unsupported providers/paths produce dialog errors.</p>\n<p>The video dialog edits URL, dimensions, alignment, caption, aspect ratio and direct playback controls.\nWidth and height start blank (Auto). Direct video uses its intrinsic size once metadata loads;\nprovider embeds use a responsive preview up to 640 px wide with a 16:9 default ratio.\nThese preview defaults are not written as fixed document dimensions. Full content width\nfills the content area responsively. Left/centre/right alignment positions custom or automatic sizes.\n<code>videoExtension()</code> supplies pointer/keyboard resizing. Responsive CSS constrains width to the editor.\nThe corner handle follows the video and resizes from its displayed dimensions. Maintain aspect\nratio preserves proportions; disabling it allows independent width/height changes. A drag commits\none undoable transaction; Escape cancels. Resizing full-width video switches to a saved custom size.\nEmbeds load lazily; direct video uses metadata preload. Successful embedding/playback is not\nguaranteed by syntactic URL validity. There is no upload or automatic autoplay.</p>\n<pre><code class=\"language-typescript\">import type { EditraVideoProvider } from 'ngx-editra';\nexport const provider: EditraVideoProvider = {\n\tid: 'example',\n\tembedOrigins: ['https://media.example.com'],\n\tmatches: (url) =&gt; url.hostname === 'media.example.com' &amp;&amp; /^\\/watch\\/\\d+$/.test(url.pathname),\n\tgetEmbedUrl: (url) =&gt;\n\t\tnew URL(url.pathname.replace('/watch/', '/embed/'), 'https://media.example.com'),\n};\n// Register with config.video.providers = [provider].\n</code></pre>\n<p>Provider code is trusted and must follow exact-host/path restrictions. See SECURITY.md for CSP.</p>\n",
		headings: [
			{
				id: 'insert-a-video',
				label: 'Insert a video',
			},
			{
				id: 'providers-and-sizing',
				label: 'Providers and sizing',
			},
		],
		blocks: [
			{
				html: '<h1>Videos</h1>\n',
				id: 'videos',
				kind: 'content',
			},
			{
				html: '<p>Insert a supported video URL rather than pasting iframe markup. The editor creates a constrained embed or direct video element and saves the original URL with the document.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Insert a video</h2>\n',
				id: 'insert-a-video',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Place the caret and open the video tool.</li>\n<li>Paste a supported public YouTube, Vimeo, or direct MP4 URL.</li>\n<li>Apply, then select the video to edit its layout, caption, or dimensions.</li>\n<li>Use the resize handle or full-content-width setting and save the normal HTML form value.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>If playback fails, check the host\'s permissions and your application\'s CSP. Private/protected media, blocked providers, and arbitrary embed HTML are not made accessible by the editor. See <a href="/guides/troubleshooting">troubleshooting</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Providers and sizing</h2>\n',
				id: 'providers-and-sizing',
				kind: 'content',
			},
			{
				html: '<p>Supported public URLs: YouTube watch/shortened/Shorts URLs with valid video IDs, numeric Vimeo\nURLs and direct MP4 paths. Other providers require explicit registration. Original URL is persisted\nalongside canonical provider-generated embedding. Unsupported providers/paths produce dialog errors.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The video dialog edits URL, dimensions, alignment, caption, aspect ratio and direct playback controls.\nWidth and height start blank (Auto). Direct video uses its intrinsic size once metadata loads;\nprovider embeds use a responsive preview up to 640 px wide with a 16:9 default ratio.\nThese preview defaults are not written as fixed document dimensions. Full content width\nfills the content area responsively. Left/centre/right alignment positions custom or automatic sizes.\n<code>videoExtension()</code> supplies pointer/keyboard resizing. Responsive CSS constrains width to the editor.\nThe corner handle follows the video and resizes from its displayed dimensions. Maintain aspect\nratio preserves proportions; disabling it allows independent width/height changes. A drag commits\none undoable transaction; Escape cancels. Resizing full-width video switches to a saved custom size.\nEmbeds load lazily; direct video uses metadata preload. Successful embedding/playback is not\nguaranteed by syntactic URL validity. There is no upload or automatic autoplay.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "import type { EditraVideoProvider } from 'ngx-editra';\nexport const provider: EditraVideoProvider = {\n\tid: 'example',\n\tembedOrigins: ['https://media.example.com'],\n\tmatches: (url) => url.hostname === 'media.example.com' && /^\\/watch\\/\\d+$/.test(url.pathname),\n\tgetEmbedUrl: (url) =>\n\t\tnew URL(url.pathname.replace('/watch/', '/embed/'), 'https://media.example.com'),\n};\n// Register with config.video.providers = [provider].\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import type { EditraVideoProvider } from 'ngx-editra';\nexport const provider: EditraVideoProvider = {\n\tid: 'example',\n\tembedOrigins: ['https://media.example.com'],\n\tmatches: (url) =&gt; url.hostname === 'media.example.com' &amp;&amp; /^\\/watch\\/\\d+$/.test(url.pathname),\n\tgetEmbedUrl: (url) =&gt;\n\t\tnew URL(url.pathname.replace('/watch/', '/embed/'), 'https://media.example.com'),\n};\n// Register with config.video.providers = [provider].\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Provider code is trusted and must follow exact-host/path restrictions. See SECURITY.md for CSP.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " videos\n\ninsert a supported video url rather than pasting iframe markup. the editor creates a constrained embed or direct video element and saves the original url with the document.\n\n insert a video\n\n1. place the caret and open the video tool.\n2. paste a supported public youtube, vimeo, or direct mp4 url.\n3. apply, then select the video to edit its layout, caption, or dimensions.\n4. use the resize handle or full-content-width setting and save the normal html form value.\n\nif playback fails, check the host's permissions and your application's csp. private/protected media, blocked providers, and arbitrary embed html are not made accessible by the editor. see [troubleshooting](troubleshooting.md).\n\n providers and sizing\n\nsupported public urls: youtube watch/shortened/shorts urls with valid video ids, numeric vimeo\nurls and direct mp4 paths. other providers require explicit registration. original url is persisted\nalongside canonical provider-generated embedding. unsupported providers/paths produce dialog errors.\n\nthe video dialog edits url, dimensions, alignment, caption, aspect ratio and direct playback controls.\nwidth and height start blank (auto). direct video uses its intrinsic size once metadata loads;\nprovider embeds use a responsive preview up to 640 px wide with a 16:9 default ratio.\nthese preview defaults are not written as fixed document dimensions. full content width\nfills the content area responsively. left/centre/right alignment positions custom or automatic sizes.\nvideoextension() supplies pointer/keyboard resizing. responsive css constrains width to the editor.\nthe corner handle follows the video and resizes from its displayed dimensions. maintain aspect\nratio preserves proportions; disabling it allows independent width/height changes. a drag commits\none undoable transaction; escape cancels. resizing full-width video switches to a saved custom size.\nembeds load lazily; direct video uses metadata preload. successful embedding/playback is not\nguaranteed by syntactic url validity. there is no upload or automatic autoplay.\n\ntypescript\nimport type { editravideoprovider } from 'ngx-editra';\nexport const provider: editravideoprovider = {\n\tid: 'example',\n\tembedorigins: ['https://media.example.com'],\n\tmatches: (url) => url.hostname === 'media.example.com' && /^\\/watch\\/\\d+$/.test(url.pathname),\n\tgetembedurl: (url) =>\n\t\tnew url(url.pathname.replace('/watch/', '/embed/'), 'https://media.example.com'),\n};\n// register with config.video.providers = [provider].\n\n\nprovider code is trusted and must follow exact-host/path restrictions. see security.md for csp.\n",
	},
	{
		slug: 'tables',
		title: 'Tables',
		group: 'Editor features',
		source: 'docs/TABLES.md',
		summary:
			'Tables arrange related data into rows and columns. Use the table tool to insert a grid, then select a cell to reveal contextual editing tools.',
		readingMinutes: 4,
		html: '<h1>Tables</h1>\n<p>Tables arrange related data into rows and columns. Use the table tool to insert a grid, then select a cell to reveal contextual editing tools.</p>\n<h2>Insert and edit a table</h2>\n<ol>\n<li>Open the table tool and choose a grid size with the pointer or keyboard. Numeric row/column controls are available for a specific size.</li>\n<li>Click a cell and enter content. Use the table tools to add or remove a row/column, merge or split selected cells, or delete the table.</li>\n<li>Drag a row or column boundary to resize. Escape cancels; releasing commits one undoable change.</li>\n<li>Switch to Appearance for cell fill, border style, and line weight, or Dimensions for table width and minimum row height. Structure contains row, column, cell and AutoFit actions.</li>\n</ol>\n<p>Use tables for tabular information. For two independent content areas, prefer <a href="/guides/layout">columns</a>. Table content, spans, dimensions, and supported appearance are included in saved HTML/JSON.</p>\n<h2>Detailed table behavior</h2>\n<p>Tables use prosemirror-tables for layout, cell selection, span normalization,\nTab/Shift+Tab navigation, copy/paste and history-aware operations. ngx-editra owns the\nrow/column resize handles, including pointer cursors, keyboard resizing and cancellation.\nThe Word-style insertion picker previews a grid up to 10 columns by 8 rows. Clicking a cell\nor pressing Enter inserts immediately. Numeric rows/columns support larger sizes within the\nconfigured limits, with validation before insertion. The contextual menu supplements toolbar commands.\nCommands insert tables, add/remove rows/columns, delete tables, merge/split cells,\nand toggle header rows/columns. The Table tools popover and right-click Table actions dialog\ngroup commands into Rows, Columns, Cells, and Size, with Delete table separated below.\nThe popover separates Structure, Appearance, and Dimensions into focused views and remembers\nthe selected view while moving between cells. Appearance provides cell fill, border style,\nand line weight; Dimensions contains table width, minimum row height and reset-row-heights.\nCell text alignment uses the ordinary block alignment commands.</p>\n<p>Column widths, spans, row heights, table appearance and backgrounds are document attributes.\nSelect a table cell and drag its column borders or any point along a row border to\nresize; a guide and pixel readout preview the change, and release commits one history action.\nEscape or pointer cancellation discards the preview. Widths are assigned to logical columns,\nincluding cells with colspan/rowspan, rather than independently mutating table DOM.</p>\n<p>Resize boundaries have no visible icon. Tab focuses a boundary with a visible focus indicator.\nFocused column boundaries use Left/Right; row boundaries use Up/Down. Arrows adjust by 8 px;\nShift+Arrow adjusts by 1 px. Boundaries preserve keyboard focus during updates and are inactive\nin read-only/disabled editors. Row heights are minimums: content can require taller rows.\nGrip dimensions are bounded to 24–2000 px for rows and 48–4096 px for columns.\nTable and cell borders use consistent line settings and #b8c2d0 colour. The default\nline weight is 1 px; the line-weight control accepts supported values up to 8 px.\nSolid, dashed, dotted, double, and none styles apply consistently to table presentation,\nincluding exported HTML. Inspect the current table\'s controls when editing its appearance.</p>\n<p>AutoFit to page removes fixed column widths. Distribute columns preserves the current rendered\ntable width and gives logical columns equal widths. Percentage width edits remove fixed widths\nso the percentage takes effect. Row heights and cell styles are retained by AutoFit.\nTable overflow is horizontal. Malformed imports are repaired with fixTables.\nInsertion defaults to 3×3, bounded by config.table.maxRows/maxColumns (50/20 defaults).</p>\n<p>Automated tests cover row/column pointer and keyboard resizing, cancellation, isolated undo,\nsave/reload, merged-cell dimensions, equal columns, AutoFit, quick insertion, shading and validation.\nBroader native clipboard and cross-browser/manual accessibility coverage remains release work.</p>\n<p>Choose a border colour in the Insert table picker, or change it later under <strong>Table tools ? Appearance ? Border colour</strong>. The colour applies to the whole table and its cell borders, and is preserved in HTML, JSON, the viewer, and email export.</p>\n<p>Table borders default to black (<code>#000000</code>). Choosing <strong>Automatic</strong> in the border-colour palette restores black.</p>\n',
		headings: [
			{
				id: 'insert-and-edit-a-table',
				label: 'Insert and edit a table',
			},
			{
				id: 'detailed-table-behavior',
				label: 'Detailed table behavior',
			},
		],
		blocks: [
			{
				html: '<h1>Tables</h1>\n',
				id: 'tables',
				kind: 'content',
			},
			{
				html: '<p>Tables arrange related data into rows and columns. Use the table tool to insert a grid, then select a cell to reveal contextual editing tools.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Insert and edit a table</h2>\n',
				id: 'insert-and-edit-a-table',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Open the table tool and choose a grid size with the pointer or keyboard. Numeric row/column controls are available for a specific size.</li>\n<li>Click a cell and enter content. Use the table tools to add or remove a row/column, merge or split selected cells, or delete the table.</li>\n<li>Drag a row or column boundary to resize. Escape cancels; releasing commits one undoable change.</li>\n<li>Switch to Appearance for cell fill, border style, and line weight, or Dimensions for table width and minimum row height. Structure contains row, column, cell and AutoFit actions.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Use tables for tabular information. For two independent content areas, prefer <a href="/guides/layout">columns</a>. Table content, spans, dimensions, and supported appearance are included in saved HTML/JSON.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Detailed table behavior</h2>\n',
				id: 'detailed-table-behavior',
				kind: 'content',
			},
			{
				html: '<p>Tables use prosemirror-tables for layout, cell selection, span normalization,\nTab/Shift+Tab navigation, copy/paste and history-aware operations. ngx-editra owns the\nrow/column resize handles, including pointer cursors, keyboard resizing and cancellation.\nThe Word-style insertion picker previews a grid up to 10 columns by 8 rows. Clicking a cell\nor pressing Enter inserts immediately. Numeric rows/columns support larger sizes within the\nconfigured limits, with validation before insertion. The contextual menu supplements toolbar commands.\nCommands insert tables, add/remove rows/columns, delete tables, merge/split cells,\nand toggle header rows/columns. The Table tools popover and right-click Table actions dialog\ngroup commands into Rows, Columns, Cells, and Size, with Delete table separated below.\nThe popover separates Structure, Appearance, and Dimensions into focused views and remembers\nthe selected view while moving between cells. Appearance provides cell fill, border style,\nand line weight; Dimensions contains table width, minimum row height and reset-row-heights.\nCell text alignment uses the ordinary block alignment commands.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Column widths, spans, row heights, table appearance and backgrounds are document attributes.\nSelect a table cell and drag its column borders or any point along a row border to\nresize; a guide and pixel readout preview the change, and release commits one history action.\nEscape or pointer cancellation discards the preview. Widths are assigned to logical columns,\nincluding cells with colspan/rowspan, rather than independently mutating table DOM.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Resize boundaries have no visible icon. Tab focuses a boundary with a visible focus indicator.\nFocused column boundaries use Left/Right; row boundaries use Up/Down. Arrows adjust by 8 px;\nShift+Arrow adjusts by 1 px. Boundaries preserve keyboard focus during updates and are inactive\nin read-only/disabled editors. Row heights are minimums: content can require taller rows.\nGrip dimensions are bounded to 24–2000 px for rows and 48–4096 px for columns.\nTable and cell borders use consistent line settings and #b8c2d0 colour. The default\nline weight is 1 px; the line-weight control accepts supported values up to 8 px.\nSolid, dashed, dotted, double, and none styles apply consistently to table presentation,\nincluding exported HTML. Inspect the current table's controls when editing its appearance.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>AutoFit to page removes fixed column widths. Distribute columns preserves the current rendered\ntable width and gives logical columns equal widths. Percentage width edits remove fixed widths\nso the percentage takes effect. Row heights and cell styles are retained by AutoFit.\nTable overflow is horizontal. Malformed imports are repaired with fixTables.\nInsertion defaults to 3×3, bounded by config.table.maxRows/maxColumns (50/20 defaults).</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Automated tests cover row/column pointer and keyboard resizing, cancellation, isolated undo,\nsave/reload, merged-cell dimensions, equal columns, AutoFit, quick insertion, shading and validation.\nBroader native clipboard and cross-browser/manual accessibility coverage remains release work.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Choose a border colour in the Insert table picker, or change it later under <strong>Table tools ? Appearance ? Border colour</strong>. The colour applies to the whole table and its cell borders, and is preserved in HTML, JSON, the viewer, and email export.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Table borders default to black (<code>#000000</code>). Choosing <strong>Automatic</strong> in the border-colour palette restores black.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " tables\n\ntables arrange related data into rows and columns. use the table tool to insert a grid, then select a cell to reveal contextual editing tools.\n\n insert and edit a table\n\n1. open the table tool and choose a grid size with the pointer or keyboard. numeric row/column controls are available for a specific size.\n2. click a cell and enter content. use the table tools to add or remove a row/column, merge or split selected cells, or delete the table.\n3. drag a row or column boundary to resize. escape cancels; releasing commits one undoable change.\n4. switch to appearance for cell fill, border style, and line weight, or dimensions for table width and minimum row height. structure contains row, column, cell and autofit actions.\n\nuse tables for tabular information. for two independent content areas, prefer [columns](layout.md). table content, spans, dimensions, and supported appearance are included in saved html/json.\n\n detailed table behavior\n\ntables use prosemirror-tables for layout, cell selection, span normalization,\ntab/shift+tab navigation, copy/paste and history-aware operations. ngx-editra owns the\nrow/column resize handles, including pointer cursors, keyboard resizing and cancellation.\nthe word-style insertion picker previews a grid up to 10 columns by 8 rows. clicking a cell\nor pressing enter inserts immediately. numeric rows/columns support larger sizes within the\nconfigured limits, with validation before insertion. the contextual menu supplements toolbar commands.\ncommands insert tables, add/remove rows/columns, delete tables, merge/split cells,\nand toggle header rows/columns. the table tools popover and right-click table actions dialog\ngroup commands into rows, columns, cells, and size, with delete table separated below.\nthe popover separates structure, appearance, and dimensions into focused views and remembers\nthe selected view while moving between cells. appearance provides cell fill, border style,\nand line weight; dimensions contains table width, minimum row height and reset-row-heights.\ncell text alignment uses the ordinary block alignment commands.\n\ncolumn widths, spans, row heights, table appearance and backgrounds are document attributes.\nselect a table cell and drag its column borders or any point along a row border to\nresize; a guide and pixel readout preview the change, and release commits one history action.\nescape or pointer cancellation discards the preview. widths are assigned to logical columns,\nincluding cells with colspan/rowspan, rather than independently mutating table dom.\n\nresize boundaries have no visible icon. tab focuses a boundary with a visible focus indicator.\nfocused column boundaries use left/right; row boundaries use up/down. arrows adjust by 8 px;\nshift+arrow adjusts by 1 px. boundaries preserve keyboard focus during updates and are inactive\nin read-only/disabled editors. row heights are minimums: content can require taller rows.\ngrip dimensions are bounded to 24–2000 px for rows and 48–4096 px for columns.\ntable and cell borders use consistent line settings and b8c2d0 colour. the default\nline weight is 1 px; the line-weight control accepts supported values up to 8 px.\nsolid, dashed, dotted, double, and none styles apply consistently to table presentation,\nincluding exported html. inspect the current table's controls when editing its appearance.\n\nautofit to page removes fixed column widths. distribute columns preserves the current rendered\ntable width and gives logical columns equal widths. percentage width edits remove fixed widths\nso the percentage takes effect. row heights and cell styles are retained by autofit.\ntable overflow is horizontal. malformed imports are repaired with fixtables.\ninsertion defaults to 3×3, bounded by config.table.maxrows/maxcolumns (50/20 defaults).\n\nautomated tests cover row/column pointer and keyboard resizing, cancellation, isolated undo,\nsave/reload, merged-cell dimensions, equal columns, autofit, quick insertion, shading and validation.\nbroader native clipboard and cross-browser/manual accessibility coverage remains release work.\n\nchoose a border colour in the insert table picker, or change it later under table tools ? appearance ? border colour. the colour applies to the whole table and its cell borders, and is preserved in html, json, the viewer, and email export.\n\ntable borders default to black (000000). choosing automatic in the border-colour palette restores black.\n",
	},
	{
		slug: 'layout',
		title: 'Columns and lines',
		group: 'Editor features',
		source: 'docs/LAYOUT.md',
		summary:
			'Use columns when two parts of a document need independent side-by-side content. Use horizontal lines to separate sections visually. Both features are saved as document content.',
		readingMinutes: 2,
		html: '<h1>Columns and horizontal lines</h1>\n<p>Use columns when two parts of a document need independent side-by-side content. Use horizontal lines to separate sections visually. Both features are saved as document content.</p>\n<h2>Add columns</h2>\n<ol>\n<li>Place the caret where you want a column layout.</li>\n<li>Use the column insertion tool, or select an image and choose Add content beside image.</li>\n<li>Click inside each column to write headings, paragraphs, lists, or media independently.</li>\n</ol>\n<p>Adding content beside an image creates separate content areas rather than floating text around the image. This makes it possible to keep writing beside a tall image without merging that text into the image caption.</p>\n<h2>Resize columns</h2>\n<p>Drag the divider between the columns to adjust their proportions. Release to commit; Escape cancels a preview. The column weights are retained when the document is saved and reloaded. Undo reverses a committed resize. Use the layout controls to restore equal proportions when needed.</p>\n<p>Check the resulting content on narrow screens. Large media remains constrained by its available content area. If you render saved HTML separately, use the viewer so the shared responsive content styling is applied.</p>\n<h2>Insert a horizontal line</h2>\n<p>Use Insert horizontal line to insert immediately using the current line settings. Open Line settings to choose the style and weight. The chosen settings are reused for subsequent insertions. Selecting an existing divider allows its appearance to be edited; saved HTML retains the supported divider attributes.</p>\n<p>Dividers are visual separators, not a replacement for descriptive headings. See <a href="/guides/formatting">formatting</a> for document structure and <a href="/guides/viewer">saved-content rendering</a> for displaying the result.</p>\n',
		headings: [
			{
				id: 'add-columns',
				label: 'Add columns',
			},
			{
				id: 'resize-columns',
				label: 'Resize columns',
			},
			{
				id: 'insert-a-horizontal-line',
				label: 'Insert a horizontal line',
			},
		],
		blocks: [
			{
				html: '<h1>Columns and horizontal lines</h1>\n',
				id: 'columns-and-horizontal-lines',
				kind: 'content',
			},
			{
				html: '<p>Use columns when two parts of a document need independent side-by-side content. Use horizontal lines to separate sections visually. Both features are saved as document content.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Add columns</h2>\n',
				id: 'add-columns',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Place the caret where you want a column layout.</li>\n<li>Use the column insertion tool, or select an image and choose Add content beside image.</li>\n<li>Click inside each column to write headings, paragraphs, lists, or media independently.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Adding content beside an image creates separate content areas rather than floating text around the image. This makes it possible to keep writing beside a tall image without merging that text into the image caption.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Resize columns</h2>\n',
				id: 'resize-columns',
				kind: 'content',
			},
			{
				html: '<p>Drag the divider between the columns to adjust their proportions. Release to commit; Escape cancels a preview. The column weights are retained when the document is saved and reloaded. Undo reverses a committed resize. Use the layout controls to restore equal proportions when needed.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Check the resulting content on narrow screens. Large media remains constrained by its available content area. If you render saved HTML separately, use the viewer so the shared responsive content styling is applied.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Insert a horizontal line</h2>\n',
				id: 'insert-a-horizontal-line',
				kind: 'content',
			},
			{
				html: '<p>Use Insert horizontal line to insert immediately using the current line settings. Open Line settings to choose the style and weight. The chosen settings are reused for subsequent insertions. Selecting an existing divider allows its appearance to be edited; saved HTML retains the supported divider attributes.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Dividers are visual separators, not a replacement for descriptive headings. See <a href="/guides/formatting">formatting</a> for document structure and <a href="/guides/viewer">saved-content rendering</a> for displaying the result.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' columns and horizontal lines\n\nuse columns when two parts of a document need independent side-by-side content. use horizontal lines to separate sections visually. both features are saved as document content.\n\n add columns\n\n1. place the caret where you want a column layout.\n2. use the column insertion tool, or select an image and choose add content beside image.\n3. click inside each column to write headings, paragraphs, lists, or media independently.\n\nadding content beside an image creates separate content areas rather than floating text around the image. this makes it possible to keep writing beside a tall image without merging that text into the image caption.\n\n resize columns\n\ndrag the divider between the columns to adjust their proportions. release to commit; escape cancels a preview. the column weights are retained when the document is saved and reloaded. undo reverses a committed resize. use the layout controls to restore equal proportions when needed.\n\ncheck the resulting content on narrow screens. large media remains constrained by its available content area. if you render saved html separately, use the viewer so the shared responsive content styling is applied.\n\n insert a horizontal line\n\nuse insert horizontal line to insert immediately using the current line settings. open line settings to choose the style and weight. the chosen settings are reused for subsequent insertions. selecting an existing divider allows its appearance to be edited; saved html retains the supported divider attributes.\n\ndividers are visual separators, not a replacement for descriptive headings. see [formatting](formatting.md) for document structure and [saved-content rendering](viewer.md) for displaying the result.\n',
	},
	{
		slug: 'code-blocks',
		title: 'Code blocks',
		group: 'Editor features',
		source: 'docs/CODE_BLOCKS.md',
		summary:
			'Inline code is for a short fragment within a sentence. Code blocks are for multiple lines whose whitespace should be preserved.',
		readingMinutes: 2,
		html: "<h1>Inline code and code blocks</h1>\n<p>Inline code is for a short fragment within a sentence. Code blocks are for multiple lines whose whitespace should be preserved.</p>\n<h2>Insert and edit code</h2>\n<ol>\n<li>Place the caret in the document or select content to format.</li>\n<li>Choose the code-block tool for a separate block. Inline code can be imported from supported HTML/Markdown or exposed with the custom toolbar button below.</li>\n<li>Enter your code and choose the language label in the code-block controls.</li>\n</ol>\n<p>Code is stored as text, not executed. For example, typing an HTML script tag into a code block displays that text rather than running a script. A language label describes the content; it does not enable syntax highlighting.</p>\n<h2>Add an inline-code button</h2>\n<p>The built-in inline-code mark uses the code command; it is not a separate button in the default toolbar. To expose it, configure your toolbar with the following code and bind the resulting config to your editor:</p>\n<pre><code class=\"language-typescript\">import { defaultToolbar } from 'ngx-editra';\nimport type { EditraConfig } from 'ngx-editra';\n\nexport const config: EditraConfig = {\n\ttoolbar: {\n\t\titems: [...defaultToolbar, { id: 'inline-code', label: 'Inline code', command: 'code' }],\n\t},\n};\n</code></pre>\n<p>Select a short fragment and click Inline code to toggle that mark. The copy control described below belongs to multi-line code blocks.</p>\n<h2>Copy a code block</h2>\n<p>Use the copy button on the block. It copies the code text without the language selector or other editor controls. Clipboard access requires HTTPS or localhost and may be blocked by browser permissions. A failed copy is reported instead of silently succeeding.</p>\n<h2>Save and display code</h2>\n<p>The normal HTML form value preserves code text, whitespace, and supported language metadata. Copy buttons and language editing controls are UI and are not stored in the document.</p>\n<p>NgxEditraViewerComponent recreates copy controls when rendering saved code. If you use the HTML pipe instead, add EditraCodeCopyDirective to the content container. See <a href=\"/guides/viewer\">displaying saved content</a>.</p>\n",
		headings: [
			{
				id: 'insert-and-edit-code',
				label: 'Insert and edit code',
			},
			{
				id: 'add-an-inline-code-button',
				label: 'Add an inline-code button',
			},
			{
				id: 'copy-a-code-block',
				label: 'Copy a code block',
			},
			{
				id: 'save-and-display-code',
				label: 'Save and display code',
			},
		],
		blocks: [
			{
				html: '<h1>Inline code and code blocks</h1>\n',
				id: 'inline-code-and-code-blocks',
				kind: 'content',
			},
			{
				html: '<p>Inline code is for a short fragment within a sentence. Code blocks are for multiple lines whose whitespace should be preserved.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Insert and edit code</h2>\n',
				id: 'insert-and-edit-code',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Place the caret in the document or select content to format.</li>\n<li>Choose the code-block tool for a separate block. Inline code can be imported from supported HTML/Markdown or exposed with the custom toolbar button below.</li>\n<li>Enter your code and choose the language label in the code-block controls.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Code is stored as text, not executed. For example, typing an HTML script tag into a code block displays that text rather than running a script. A language label describes the content; it does not enable syntax highlighting.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Add an inline-code button</h2>\n',
				id: 'add-an-inline-code-button',
				kind: 'content',
			},
			{
				html: '<p>The built-in inline-code mark uses the code command; it is not a separate button in the default toolbar. To expose it, configure your toolbar with the following code and bind the resulting config to your editor:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "import { defaultToolbar } from 'ngx-editra';\nimport type { EditraConfig } from 'ngx-editra';\n\nexport const config: EditraConfig = {\n\ttoolbar: {\n\t\titems: [...defaultToolbar, { id: 'inline-code', label: 'Inline code', command: 'code' }],\n\t},\n};\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { defaultToolbar } from 'ngx-editra';\nimport type { EditraConfig } from 'ngx-editra';\n\nexport const config: EditraConfig = {\n\ttoolbar: {\n\t\titems: [...defaultToolbar, { id: 'inline-code', label: 'Inline code', command: 'code' }],\n\t},\n};\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Select a short fragment and click Inline code to toggle that mark. The copy control described below belongs to multi-line code blocks.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Copy a code block</h2>\n',
				id: 'copy-a-code-block',
				kind: 'content',
			},
			{
				html: '<p>Use the copy button on the block. It copies the code text without the language selector or other editor controls. Clipboard access requires HTTPS or localhost and may be blocked by browser permissions. A failed copy is reported instead of silently succeeding.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Save and display code</h2>\n',
				id: 'save-and-display-code',
				kind: 'content',
			},
			{
				html: '<p>The normal HTML form value preserves code text, whitespace, and supported language metadata. Copy buttons and language editing controls are UI and are not stored in the document.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>NgxEditraViewerComponent recreates copy controls when rendering saved code. If you use the HTML pipe instead, add EditraCodeCopyDirective to the content container. See <a href="/guides/viewer">displaying saved content</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " inline code and code blocks\n\ninline code is for a short fragment within a sentence. code blocks are for multiple lines whose whitespace should be preserved.\n\n insert and edit code\n\n1. place the caret in the document or select content to format.\n2. choose the code-block tool for a separate block. inline code can be imported from supported html/markdown or exposed with the custom toolbar button below.\n3. enter your code and choose the language label in the code-block controls.\n\ncode is stored as text, not executed. for example, typing an html script tag into a code block displays that text rather than running a script. a language label describes the content; it does not enable syntax highlighting.\n\n add an inline-code button\n\nthe built-in inline-code mark uses the code command; it is not a separate button in the default toolbar. to expose it, configure your toolbar with the following code and bind the resulting config to your editor:\n\ntypescript\nimport { defaulttoolbar } from 'ngx-editra';\nimport type { editraconfig } from 'ngx-editra';\n\nexport const config: editraconfig = {\n\ttoolbar: {\n\t\titems: [...defaulttoolbar, { id: 'inline-code', label: 'inline code', command: 'code' }],\n\t},\n};\n\n\nselect a short fragment and click inline code to toggle that mark. the copy control described below belongs to multi-line code blocks.\n\n copy a code block\n\nuse the copy button on the block. it copies the code text without the language selector or other editor controls. clipboard access requires https or localhost and may be blocked by browser permissions. a failed copy is reported instead of silently succeeding.\n\n save and display code\n\nthe normal html form value preserves code text, whitespace, and supported language metadata. copy buttons and language editing controls are ui and are not stored in the document.\n\nngxeditraviewercomponent recreates copy controls when rendering saved code. if you use the html pipe instead, add editracodecopydirective to the content container. see [displaying saved content](viewer.md).\n",
	},
	{
		slug: 'editing-tools',
		title: 'Editing tools',
		group: 'Editor features',
		source: 'docs/EDITING_TOOLS.md',
		summary:
			'These tools help writers work with larger documents. They change document state or editor presentation; your form value continues to be HTML.',
		readingMinutes: 2,
		html: '<h1>Find, undo, counts, and workspace tools</h1>\n<p>These tools help writers work with larger documents. They change document state or editor presentation; your form value continues to be HTML.</p>\n<h2>Find and replace</h2>\n<p>Open Find and replace, enter a search term, and use the match navigation controls to move between occurrences. Replace changes the current match; Replace all changes all applicable matches. Review the result and use Undo if needed. Searches are literal text, not user-supplied regular expressions.</p>\n<h2>Undo and redo</h2>\n<p>Use toolbar buttons or the platform undo/redo shortcuts. Text edits, formatting, inserted content, and committed table/media resizing participate in editing history. A resize drag is committed as one operation rather than a history entry for every pointer movement. Escape cancels an in-progress resize.</p>\n<p>Loading a document or changing schema/security/extension configuration is different from an ordinary user edit. Schema-related reconfiguration revalidates content and resets history. Do not rely on Undo as a storage backup.</p>\n<h2>Word and character counts</h2>\n<p>The editor displays document counts. Words are separated by whitespace; characters are counted as Unicode code points. Plain-text conversion includes captions and image alternative text. These counts are useful UI feedback, not a substitute for a server-side content limit.</p>\n<h2>Fullscreen</h2>\n<p>Use Fullscreen to expand the editing workspace. Background page scrolling is contained while the editor is fullscreen, and restored when it closes. This is an editor layout mode, not a request to put the entire browser into its native fullscreen API.</p>\n<h2>Keep tools available</h2>\n<pre><code class="language-typescript">import type { EditraConfig } from \'ngx-editra\';\n\nexport const config: EditraConfig = {\n\ttoolbar: { sticky: true, stickyOffset: 64, floating: true },\n\tminHeight: 280,\n\tmaxHeight: 640,\n};\n</code></pre>\n<p>Sticky keeps the toolbar visible while scrolling. stickyOffset leaves room for an application header, in pixels. Floating enables a selection toolbar. The pin control lets writers change the sticky state. Use <a href="/guides/toolbar">toolbar configuration</a> to choose tools and grouping.</p>\n',
		headings: [
			{
				id: 'find-and-replace',
				label: 'Find and replace',
			},
			{
				id: 'undo-and-redo',
				label: 'Undo and redo',
			},
			{
				id: 'word-and-character-counts',
				label: 'Word and character counts',
			},
			{
				id: 'fullscreen',
				label: 'Fullscreen',
			},
			{
				id: 'keep-tools-available',
				label: 'Keep tools available',
			},
		],
		blocks: [
			{
				html: '<h1>Find, undo, counts, and workspace tools</h1>\n',
				id: 'find-undo-counts-and-workspace-tools',
				kind: 'content',
			},
			{
				html: '<p>These tools help writers work with larger documents. They change document state or editor presentation; your form value continues to be HTML.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Find and replace</h2>\n',
				id: 'find-and-replace',
				kind: 'content',
			},
			{
				html: '<p>Open Find and replace, enter a search term, and use the match navigation controls to move between occurrences. Replace changes the current match; Replace all changes all applicable matches. Review the result and use Undo if needed. Searches are literal text, not user-supplied regular expressions.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Undo and redo</h2>\n',
				id: 'undo-and-redo',
				kind: 'content',
			},
			{
				html: '<p>Use toolbar buttons or the platform undo/redo shortcuts. Text edits, formatting, inserted content, and committed table/media resizing participate in editing history. A resize drag is committed as one operation rather than a history entry for every pointer movement. Escape cancels an in-progress resize.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Loading a document or changing schema/security/extension configuration is different from an ordinary user edit. Schema-related reconfiguration revalidates content and resets history. Do not rely on Undo as a storage backup.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Word and character counts</h2>\n',
				id: 'word-and-character-counts',
				kind: 'content',
			},
			{
				html: '<p>The editor displays document counts. Words are separated by whitespace; characters are counted as Unicode code points. Plain-text conversion includes captions and image alternative text. These counts are useful UI feedback, not a substitute for a server-side content limit.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Fullscreen</h2>\n',
				id: 'fullscreen',
				kind: 'content',
			},
			{
				html: '<p>Use Fullscreen to expand the editing workspace. Background page scrolling is contained while the editor is fullscreen, and restored when it closes. This is an editor layout mode, not a request to put the entire browser into its native fullscreen API.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Keep tools available</h2>\n',
				id: 'keep-tools-available',
				kind: 'content',
			},
			{
				code: "import type { EditraConfig } from 'ngx-editra';\n\nexport const config: EditraConfig = {\n\ttoolbar: { sticky: true, stickyOffset: 64, floating: true },\n\tminHeight: 280,\n\tmaxHeight: 640,\n};\n",
				language: 'typescript',
				html: '<pre><code class="language-typescript">import type { EditraConfig } from \'ngx-editra\';\n\nexport const config: EditraConfig = {\n\ttoolbar: { sticky: true, stickyOffset: 64, floating: true },\n\tminHeight: 280,\n\tmaxHeight: 640,\n};\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Sticky keeps the toolbar visible while scrolling. stickyOffset leaves room for an application header, in pixels. Floating enables a selection toolbar. The pin control lets writers change the sticky state. Use <a href="/guides/toolbar">toolbar configuration</a> to choose tools and grouping.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " find, undo, counts, and workspace tools\n\nthese tools help writers work with larger documents. they change document state or editor presentation; your form value continues to be html.\n\n find and replace\n\nopen find and replace, enter a search term, and use the match navigation controls to move between occurrences. replace changes the current match; replace all changes all applicable matches. review the result and use undo if needed. searches are literal text, not user-supplied regular expressions.\n\n undo and redo\n\nuse toolbar buttons or the platform undo/redo shortcuts. text edits, formatting, inserted content, and committed table/media resizing participate in editing history. a resize drag is committed as one operation rather than a history entry for every pointer movement. escape cancels an in-progress resize.\n\nloading a document or changing schema/security/extension configuration is different from an ordinary user edit. schema-related reconfiguration revalidates content and resets history. do not rely on undo as a storage backup.\n\n word and character counts\n\nthe editor displays document counts. words are separated by whitespace; characters are counted as unicode code points. plain-text conversion includes captions and image alternative text. these counts are useful ui feedback, not a substitute for a server-side content limit.\n\n fullscreen\n\nuse fullscreen to expand the editing workspace. background page scrolling is contained while the editor is fullscreen, and restored when it closes. this is an editor layout mode, not a request to put the entire browser into its native fullscreen api.\n\n keep tools available\n\ntypescript\nimport type { editraconfig } from 'ngx-editra';\n\nexport const config: editraconfig = {\n\ttoolbar: { sticky: true, stickyoffset: 64, floating: true },\n\tminheight: 280,\n\tmaxheight: 640,\n};\n\n\nsticky keeps the toolbar visible while scrolling. stickyoffset leaves room for an application header, in pixels. floating enables a selection toolbar. the pin control lets writers change the sticky state. use [toolbar configuration](toolbar.md) to choose tools and grouping.\n",
	},
	{
		slug: 'markdown',
		title: 'Markdown conversion',
		group: 'Editor features',
		source: 'docs/MARKDOWN.md',
		summary:
			"Markdown is useful for text-oriented workflows. It is an explicit conversion, not the editor's form value format: the form control always contains HTML.",
		readingMinutes: 1,
		html: '<h1>Markdown import and export</h1>\n<p>Markdown is useful for text-oriented workflows. It is an explicit conversion, not the editor\'s form value format: the form control always contains HTML.</p>\n<h2>Convert through the component</h2>\n<pre><code class="language-html">&lt;ngx-editra #editor [formControl]=&quot;body&quot; /&gt;\n&lt;button type=&quot;button&quot; (click)=&quot;editor.setMarkdown(\'# Welcome\')&quot;&gt;Load Markdown&lt;/button&gt;\n&lt;pre&gt;{{ editor.getMarkdown() }}&lt;/pre&gt;\n</code></pre>\n<p>Import ReactiveFormsModule and NgxEditraComponent in the owning component. Use error handling around programmatic imports in production; setMarkdown can throw for invalid input. Component setters do not automatically emit a save event.</p>\n<h2>Understand conversion limits</h2>\n<p>CommonMark supports ordinary headings, paragraphs, lists, blockquotes, links, and code. It cannot represent every rich-text attribute. Font, colour, highlight, and size presentation may be lost. Tables and videos export as safe raw HTML, which the receiving Markdown renderer may reject or display differently.</p>\n<p>Raw HTML Markdown import and custom nodes are not a lossless round trip. Choose HTML or JSON when retaining all supported document presentation is required. See <a href="/guides/content">content formats</a>.</p>\n<h2>Advanced conversion functions</h2>\n<p>The public importMarkdown(markdown, schema, config) and exportMarkdown(doc) functions operate on ProseMirror documents. They are useful when you own an engine integration. Most Angular applications should use the component methods so parsing and configuration stay aligned with the editor.</p>\n',
		headings: [
			{
				id: 'convert-through-the-component',
				label: 'Convert through the component',
			},
			{
				id: 'understand-conversion-limits',
				label: 'Understand conversion limits',
			},
			{
				id: 'advanced-conversion-functions',
				label: 'Advanced conversion functions',
			},
		],
		blocks: [
			{
				html: '<h1>Markdown import and export</h1>\n',
				id: 'markdown-import-and-export',
				kind: 'content',
			},
			{
				html: "<p>Markdown is useful for text-oriented workflows. It is an explicit conversion, not the editor's form value format: the form control always contains HTML.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Convert through the component</h2>\n',
				id: 'convert-through-the-component',
				kind: 'content',
			},
			{
				code: '<ngx-editra #editor [formControl]="body" />\n<button type="button" (click)="editor.setMarkdown(\'# Welcome\')">Load Markdown</button>\n<pre>{{ editor.getMarkdown() }}</pre>\n',
				language: 'html',
				html: '<pre><code class="language-html">&lt;ngx-editra #editor [formControl]=&quot;body&quot; /&gt;\n&lt;button type=&quot;button&quot; (click)=&quot;editor.setMarkdown(\'# Welcome\')&quot;&gt;Load Markdown&lt;/button&gt;\n&lt;pre&gt;{{ editor.getMarkdown() }}&lt;/pre&gt;\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Import ReactiveFormsModule and NgxEditraComponent in the owning component. Use error handling around programmatic imports in production; setMarkdown can throw for invalid input. Component setters do not automatically emit a save event.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Understand conversion limits</h2>\n',
				id: 'understand-conversion-limits',
				kind: 'content',
			},
			{
				html: '<p>CommonMark supports ordinary headings, paragraphs, lists, blockquotes, links, and code. It cannot represent every rich-text attribute. Font, colour, highlight, and size presentation may be lost. Tables and videos export as safe raw HTML, which the receiving Markdown renderer may reject or display differently.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Raw HTML Markdown import and custom nodes are not a lossless round trip. Choose HTML or JSON when retaining all supported document presentation is required. See <a href="/guides/content">content formats</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Advanced conversion functions</h2>\n',
				id: 'advanced-conversion-functions',
				kind: 'content',
			},
			{
				html: '<p>The public importMarkdown(markdown, schema, config) and exportMarkdown(doc) functions operate on ProseMirror documents. They are useful when you own an engine integration. Most Angular applications should use the component methods so parsing and configuration stay aligned with the editor.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' markdown import and export\n\nmarkdown is useful for text-oriented workflows. it is an explicit conversion, not the editor\'s form value format: the form control always contains html.\n\n convert through the component\n\nhtml\n<ngx-editra editor [formcontrol]="body" />\n<button type="button" (click)="editor.setmarkdown(\' welcome\')">load markdown</button>\n<pre>{{ editor.getmarkdown() }}</pre>\n\n\nimport reactiveformsmodule and ngxeditracomponent in the owning component. use error handling around programmatic imports in production; setmarkdown can throw for invalid input. component setters do not automatically emit a save event.\n\n understand conversion limits\n\ncommonmark supports ordinary headings, paragraphs, lists, blockquotes, links, and code. it cannot represent every rich-text attribute. font, colour, highlight, and size presentation may be lost. tables and videos export as safe raw html, which the receiving markdown renderer may reject or display differently.\n\nraw html markdown import and custom nodes are not a lossless round trip. choose html or json when retaining all supported document presentation is required. see [content formats](content.md).\n\n advanced conversion functions\n\nthe public importmarkdown(markdown, schema, config) and exportmarkdown(doc) functions operate on prosemirror documents. they are useful when you own an engine integration. most angular applications should use the component methods so parsing and configuration stay aligned with the editor.\n',
	},
	{
		slug: 'accessibility',
		title: 'Keyboard and accessibility',
		group: 'Reference',
		source: 'docs/ACCESSIBILITY.md',
		summary:
			'The editor provides labelled controls, keyboard navigation, focus indicators, and disabled/read-only states. Your application still needs accessible labels, validation messages, good colour contrast, and appropriate focus behavior.',
		readingMinutes: 2,
		html: '<h1>Keyboard use and accessibility</h1>\n<p>The editor provides labelled controls, keyboard navigation, focus indicators, and disabled/read-only states. Your application still needs accessible labels, validation messages, good colour contrast, and appropriate focus behavior.</p>\n<h2>Useful keyboard actions</h2>\n<table>\n<thead>\n<tr>\n<th>Action</th>\n<th>Keyboard interaction</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Navigate toolbar buttons</td>\n<td>Arrow keys, Home, and End within enabled button groups</td>\n</tr>\n<tr>\n<td>Bold / italic / underline</td>\n<td>Ctrl or Command with B / I / U</td>\n</tr>\n<tr>\n<td>Undo / redo</td>\n<td>Platform undo/redo shortcuts or toolbar controls</td>\n</tr>\n<tr>\n<td>Line break</td>\n<td>Shift+Enter</td>\n</tr>\n<tr>\n<td>Close a dialog or palette</td>\n<td>Escape</td>\n</tr>\n<tr>\n<td>Navigate colour swatches</td>\n<td>Arrows, Home, End, then Enter to choose</td>\n</tr>\n<tr>\n<td>Resize a focused table column boundary</td>\n<td>Left / Right arrows</td>\n</tr>\n<tr>\n<td>Resize a focused table row boundary</td>\n<td>Up / Down arrows</td>\n</tr>\n<tr>\n<td>Fine resizing</td>\n<td>Shift+Arrow uses a smaller step</td>\n</tr>\n</tbody>\n</table>\n<p>Table resize boundaries are visually unobtrusive but show a focus indicator when reached by keyboard. A committed resize can be undone. Escape cancels a pointer preview. Readonly and disabled editors do not allow resizing.</p>\n<h2>Application responsibilities</h2>\n<p>Give the surrounding form section a meaningful heading, explain what the user should enter, and show validation errors near the editor. Keep toolbar text/background contrast sufficient in every supported theme. Test at narrow widths and with keyboard-only navigation.</p>\n<p>Content authors should use logical headings, descriptive links, and image alternative text. Avoid relying on colour alone. For long exported code or tables, keep scrollable regions keyboard-accessible in your application\'s output UI.</p>\n<h2>Verification limits</h2>\n<p>Automated axe checks and keyboard browser tests cover many interactions. They do not replace manual screen-reader, high-contrast, browser, and assistive-technology testing in your application. Custom dialog presenters and extensions must preserve focus containment, Escape behavior, and focus return. See <a href="/guides/toolbar">toolbar configuration</a>.</p>\n',
		headings: [
			{
				id: 'useful-keyboard-actions',
				label: 'Useful keyboard actions',
			},
			{
				id: 'application-responsibilities',
				label: 'Application responsibilities',
			},
			{
				id: 'verification-limits',
				label: 'Verification limits',
			},
		],
		blocks: [
			{
				html: '<h1>Keyboard use and accessibility</h1>\n',
				id: 'keyboard-use-and-accessibility',
				kind: 'content',
			},
			{
				html: '<p>The editor provides labelled controls, keyboard navigation, focus indicators, and disabled/read-only states. Your application still needs accessible labels, validation messages, good colour contrast, and appropriate focus behavior.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Useful keyboard actions</h2>\n',
				id: 'useful-keyboard-actions',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Action</th>\n<th>Keyboard interaction</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Navigate toolbar buttons</td>\n<td>Arrow keys, Home, and End within enabled button groups</td>\n</tr>\n<tr>\n<td>Bold / italic / underline</td>\n<td>Ctrl or Command with B / I / U</td>\n</tr>\n<tr>\n<td>Undo / redo</td>\n<td>Platform undo/redo shortcuts or toolbar controls</td>\n</tr>\n<tr>\n<td>Line break</td>\n<td>Shift+Enter</td>\n</tr>\n<tr>\n<td>Close a dialog or palette</td>\n<td>Escape</td>\n</tr>\n<tr>\n<td>Navigate colour swatches</td>\n<td>Arrows, Home, End, then Enter to choose</td>\n</tr>\n<tr>\n<td>Resize a focused table column boundary</td>\n<td>Left / Right arrows</td>\n</tr>\n<tr>\n<td>Resize a focused table row boundary</td>\n<td>Up / Down arrows</td>\n</tr>\n<tr>\n<td>Fine resizing</td>\n<td>Shift+Arrow uses a smaller step</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Table resize boundaries are visually unobtrusive but show a focus indicator when reached by keyboard. A committed resize can be undone. Escape cancels a pointer preview. Readonly and disabled editors do not allow resizing.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Application responsibilities</h2>\n',
				id: 'application-responsibilities',
				kind: 'content',
			},
			{
				html: '<p>Give the surrounding form section a meaningful heading, explain what the user should enter, and show validation errors near the editor. Keep toolbar text/background contrast sufficient in every supported theme. Test at narrow widths and with keyboard-only navigation.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Content authors should use logical headings, descriptive links, and image alternative text. Avoid relying on colour alone. For long exported code or tables, keep scrollable regions keyboard-accessible in your application's output UI.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Verification limits</h2>\n',
				id: 'verification-limits',
				kind: 'content',
			},
			{
				html: '<p>Automated axe checks and keyboard browser tests cover many interactions. They do not replace manual screen-reader, high-contrast, browser, and assistive-technology testing in your application. Custom dialog presenters and extensions must preserve focus containment, Escape behavior, and focus return. See <a href="/guides/toolbar">toolbar configuration</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " keyboard use and accessibility\n\nthe editor provides labelled controls, keyboard navigation, focus indicators, and disabled/read-only states. your application still needs accessible labels, validation messages, good colour contrast, and appropriate focus behavior.\n\n useful keyboard actions\n\n| action                                 | keyboard interaction                                   |\n| -------------------------------------- | ------------------------------------------------------ |\n| navigate toolbar buttons               | arrow keys, home, and end within enabled button groups |\n| bold / italic / underline              | ctrl or command with b / i / u                         |\n| undo / redo                            | platform undo/redo shortcuts or toolbar controls       |\n| line break                             | shift+enter                                            |\n| close a dialog or palette              | escape                                                 |\n| navigate colour swatches               | arrows, home, end, then enter to choose                |\n| resize a focused table column boundary | left / right arrows                                    |\n| resize a focused table row boundary    | up / down arrows                                       |\n| fine resizing                          | shift+arrow uses a smaller step                        |\n\ntable resize boundaries are visually unobtrusive but show a focus indicator when reached by keyboard. a committed resize can be undone. escape cancels a pointer preview. readonly and disabled editors do not allow resizing.\n\n application responsibilities\n\ngive the surrounding form section a meaningful heading, explain what the user should enter, and show validation errors near the editor. keep toolbar text/background contrast sufficient in every supported theme. test at narrow widths and with keyboard-only navigation.\n\ncontent authors should use logical headings, descriptive links, and image alternative text. avoid relying on colour alone. for long exported code or tables, keep scrollable regions keyboard-accessible in your application's output ui.\n\n verification limits\n\nautomated axe checks and keyboard browser tests cover many interactions. they do not replace manual screen-reader, high-contrast, browser, and assistive-technology testing in your application. custom dialog presenters and extensions must preserve focus containment, escape behavior, and focus return. see [toolbar configuration](toolbar.md).\n",
	},
	{
		slug: 'troubleshooting',
		title: 'Troubleshooting',
		group: 'Reference',
		source: 'docs/TROUBLESHOOTING.md',
		summary:
			'Start with the symptom below. The live example can help separate application integration issues from editor behavior.',
		readingMinutes: 3,
		html: '<h1>Troubleshooting</h1>\n<p>Start with the symptom below. The live example can help separate application integration issues from editor behavior.</p>\n<h2>Installation cannot find ngx-editra</h2>\n<p>Install the default release with <code>npm install ngx-editra</code>. Check registry tags before\nassuming <code>npm install ngx-editra</code> selects a stable release: <code>latest</code> can also point\nto an alpha. Check the package name, version and tag before changing your\nregistry configuration. See <a href="/guides/installation">installation</a>.</p>\n<h2>The editor is not recognized</h2>\n<p>Import NgxEditraComponent into the standalone component or NgModule that owns the template. Import ReactiveFormsModule for formControl/formControlName, or FormsModule for ngModel. Import all public symbols from ngx-editra, without /core or /extensions suffixes.</p>\n<h2>The editor looks unstyled</h2>\n<p>Editor and viewer components include their default styles automatically. Confirm you are using the updated package and restart the application build after upgrading. Check for application CSS overriding <code>ngx-editra</code>, <code>.ProseMirror</code>, or generic buttons. If Content Security Policy blocks Angular\'s style elements, configure Angular\'s style nonce for your application\'s CSP. The viewer, content directive and HTML pipe load their styles automatically; see <a href="/guides/theming">theming</a>.</p>\n<h2>Required validation accepts an empty editor</h2>\n<p>The HTML string <code>&lt;p&gt;&lt;/p&gt;</code> is not an empty string. Set <code>[required]=&quot;true&quot;</code> on the editor to enable semantic empty-document validation. Show the form error after touch or submit. See <a href="/guides/angular-forms">Forms</a>.</p>\n<h2>An image or video will not load</h2>\n<p>Use an absolute public HTTPS URL. Files, base64 data, authenticated local paths, and arbitrary iframe markup are unsupported. Check the browser network panel, application CSP, and the media host\'s embedding policy. Syntax validation cannot guarantee that a provider allows playback. There is no file upload adapter in the library.</p>\n<h2>Media stops resizing after adding an extension</h2>\n<p>An explicit config.extensions list replaces the default extension list. Include imageExtension() and videoExtension() alongside custom extensions when you want their interactive media node views. See <a href="/guides/plugins">extensions</a>.</p>\n<h2>Saved content loses styles or embeds</h2>\n<p>Use NgxEditraViewerComponent or the validated HTML pipe with the same configuration as the editor. Plain Angular innerHTML may strip presentation or players. A change to enabled schema features or URL policy can also remove content on normalization. Do not bypass security validation on raw HTML.</p>\n<h2>Changing configuration has no effect</h2>\n<p>Replace the configuration object rather than mutating nested properties. For example, assign <code>{ ...config, theme: \'dark\' }</code>. The config input replaces application defaults; it is not a deep merge of your previous config. Schema-related changes revalidate content and reset history.</p>\n<h2>A code copy button fails</h2>\n<p>Use HTTPS or localhost and allow clipboard access. Browsers can deny permission; select and copy the text manually when unavailable. Copy controls are not stored inside the saved HTML.</p>\n<h2>Server rendering reports document/window errors</h2>\n<p>Check custom plugins, serializers, and application code for browser-global access during import or server execution. Initialize browser-only behavior after rendering and clean it up on teardown. See <a href="/guides/ssr">SSR</a>.</p>\n',
		headings: [
			{
				id: 'installation-cannot-find-ngx-editra',
				label: 'Installation cannot find ngx-editra',
			},
			{
				id: 'the-editor-is-not-recognized',
				label: 'The editor is not recognized',
			},
			{
				id: 'the-editor-looks-unstyled',
				label: 'The editor looks unstyled',
			},
			{
				id: 'required-validation-accepts-an-empty-editor',
				label: 'Required validation accepts an empty editor',
			},
			{
				id: 'an-image-or-video-will-not-load',
				label: 'An image or video will not load',
			},
			{
				id: 'media-stops-resizing-after-adding-an-extension',
				label: 'Media stops resizing after adding an extension',
			},
			{
				id: 'saved-content-loses-styles-or-embeds',
				label: 'Saved content loses styles or embeds',
			},
			{
				id: 'changing-configuration-has-no-effect',
				label: 'Changing configuration has no effect',
			},
			{
				id: 'a-code-copy-button-fails',
				label: 'A code copy button fails',
			},
			{
				id: 'server-rendering-reports-document-window-errors',
				label: 'Server rendering reports document/window errors',
			},
		],
		blocks: [
			{
				html: '<h1>Troubleshooting</h1>\n',
				id: 'troubleshooting',
				kind: 'content',
			},
			{
				html: '<p>Start with the symptom below. The live example can help separate application integration issues from editor behavior.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Installation cannot find ngx-editra</h2>\n',
				id: 'installation-cannot-find-ngx-editra',
				kind: 'content',
			},
			{
				html: '<p>Install the default release with <code>npm install ngx-editra</code>. Check registry tags before\nassuming <code>npm install ngx-editra</code> selects a stable release: <code>latest</code> can also point\nto an alpha. Check the package name, version and tag before changing your\nregistry configuration. See <a href="/guides/installation">installation</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>The editor is not recognized</h2>\n',
				id: 'the-editor-is-not-recognized',
				kind: 'content',
			},
			{
				html: '<p>Import NgxEditraComponent into the standalone component or NgModule that owns the template. Import ReactiveFormsModule for formControl/formControlName, or FormsModule for ngModel. Import all public symbols from ngx-editra, without /core or /extensions suffixes.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>The editor looks unstyled</h2>\n',
				id: 'the-editor-looks-unstyled',
				kind: 'content',
			},
			{
				html: "<p>Editor and viewer components include their default styles automatically. Confirm you are using the updated package and restart the application build after upgrading. Check for application CSS overriding <code>ngx-editra</code>, <code>.ProseMirror</code>, or generic buttons. If Content Security Policy blocks Angular's style elements, configure Angular's style nonce for your application's CSP. The viewer, content directive and HTML pipe load their styles automatically; see <a href=\"/guides/theming\">theming</a>.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Required validation accepts an empty editor</h2>\n',
				id: 'required-validation-accepts-an-empty-editor',
				kind: 'content',
			},
			{
				html: '<p>The HTML string <code>&lt;p&gt;&lt;/p&gt;</code> is not an empty string. Set <code>[required]=&quot;true&quot;</code> on the editor to enable semantic empty-document validation. Show the form error after touch or submit. See <a href="/guides/angular-forms">Forms</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>An image or video will not load</h2>\n',
				id: 'an-image-or-video-will-not-load',
				kind: 'content',
			},
			{
				html: "<p>Use an absolute public HTTPS URL. Files, base64 data, authenticated local paths, and arbitrary iframe markup are unsupported. Check the browser network panel, application CSP, and the media host's embedding policy. Syntax validation cannot guarantee that a provider allows playback. There is no file upload adapter in the library.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Media stops resizing after adding an extension</h2>\n',
				id: 'media-stops-resizing-after-adding-an-extension',
				kind: 'content',
			},
			{
				html: '<p>An explicit config.extensions list replaces the default extension list. Include imageExtension() and videoExtension() alongside custom extensions when you want their interactive media node views. See <a href="/guides/plugins">extensions</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Saved content loses styles or embeds</h2>\n',
				id: 'saved-content-loses-styles-or-embeds',
				kind: 'content',
			},
			{
				html: '<p>Use NgxEditraViewerComponent or the validated HTML pipe with the same configuration as the editor. Plain Angular innerHTML may strip presentation or players. A change to enabled schema features or URL policy can also remove content on normalization. Do not bypass security validation on raw HTML.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Changing configuration has no effect</h2>\n',
				id: 'changing-configuration-has-no-effect',
				kind: 'content',
			},
			{
				html: "<p>Replace the configuration object rather than mutating nested properties. For example, assign <code>{ ...config, theme: 'dark' }</code>. The config input replaces application defaults; it is not a deep merge of your previous config. Schema-related changes revalidate content and reset history.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>A code copy button fails</h2>\n',
				id: 'a-code-copy-button-fails',
				kind: 'content',
			},
			{
				html: '<p>Use HTTPS or localhost and allow clipboard access. Browsers can deny permission; select and copy the text manually when unavailable. Copy controls are not stored inside the saved HTML.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Server rendering reports document/window errors</h2>\n',
				id: 'server-rendering-reports-document-window-errors',
				kind: 'content',
			},
			{
				html: '<p>Check custom plugins, serializers, and application code for browser-global access during import or server execution. Initialize browser-only behavior after rendering and clean it up on teardown. See <a href="/guides/ssr">SSR</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " troubleshooting\n\nstart with the symptom below. the live example can help separate application integration issues from editor behavior.\n\n installation cannot find ngx-editra\n\ninstall the default release with npm install ngx-editra. check registry tags before\nassuming npm install ngx-editra selects a stable release: latest can also point\nto an alpha. check the package name, version and tag before changing your\nregistry configuration. see [installation](installation.md).\n\n the editor is not recognized\n\nimport ngxeditracomponent into the standalone component or ngmodule that owns the template. import reactiveformsmodule for formcontrol/formcontrolname, or formsmodule for ngmodel. import all public symbols from ngx-editra, without /core or /extensions suffixes.\n\n the editor looks unstyled\n\neditor and viewer components include their default styles automatically. confirm you are using the updated package and restart the application build after upgrading. check for application css overriding ngx-editra, .prosemirror, or generic buttons. if content security policy blocks angular's style elements, configure angular's style nonce for your application's csp. the viewer, content directive and html pipe load their styles automatically; see [theming](theming.md).\n\n required validation accepts an empty editor\n\nthe html string <p></p> is not an empty string. set [required]=\"true\" on the editor to enable semantic empty-document validation. show the form error after touch or submit. see [forms](angular_forms.md).\n\n an image or video will not load\n\nuse an absolute public https url. files, base64 data, authenticated local paths, and arbitrary iframe markup are unsupported. check the browser network panel, application csp, and the media host's embedding policy. syntax validation cannot guarantee that a provider allows playback. there is no file upload adapter in the library.\n\n media stops resizing after adding an extension\n\nan explicit config.extensions list replaces the default extension list. include imageextension() and videoextension() alongside custom extensions when you want their interactive media node views. see [extensions](plugins.md).\n\n saved content loses styles or embeds\n\nuse ngxeditraviewercomponent or the validated html pipe with the same configuration as the editor. plain angular innerhtml may strip presentation or players. a change to enabled schema features or url policy can also remove content on normalization. do not bypass security validation on raw html.\n\n changing configuration has no effect\n\nreplace the configuration object rather than mutating nested properties. for example, assign { ...config, theme: 'dark' }. the config input replaces application defaults; it is not a deep merge of your previous config. schema-related changes revalidate content and reset history.\n\n a code copy button fails\n\nuse https or localhost and allow clipboard access. browsers can deny permission; select and copy the text manually when unavailable. copy controls are not stored inside the saved html.\n\n server rendering reports document/window errors\n\ncheck custom plugins, serializers, and application code for browser-global access during import or server execution. initialize browser-only behavior after rendering and clean it up on teardown. see [ssr](ssr.md).\n",
	},
	{
		slug: 'plugins',
		title: 'Extensions',
		group: 'Reference',
		source: 'docs/PLUGINS.md',
		summary:
			'An extension adds trusted application behavior to the editor. Most applications can use built-in tools without creating one. Start with a command-only extension before adding schema nodes or browser node views.',
		readingMinutes: 2,
		html: "<h1>Plugins and extensions</h1>\n<p>An extension adds trusted application behavior to the editor. Most applications can use built-in tools without creating one. Start with a command-only extension before adding schema nodes or browser node views.</p>\n<h2>Add a command and toolbar button</h2>\n<ol>\n<li>Define an EditraExtension with a unique id.</li>\n<li>Return the custom command from commands and point a toolbar item at that command name.</li>\n<li>Pass the extension through config.extensions, including the default media extensions if you still want them.</li>\n</ol>\n<p><code>EditraExtension</code> supports unique IDs, explicit <code>requires</code>, schema nodes/marks, commands,\nkeyboard shortcuts, ProseMirror plugins, node views, toolbar items and browser lifecycle callbacks.\nDependencies are ordered before dependants while preserving deterministic registration order.\nDuplicate IDs/schema names/commands/shortcuts/node views and missing/cyclic dependencies throw.</p>\n<pre><code class=\"language-typescript\">import type { EditraExtension } from 'ngx-editra';\nimport { imageExtension, videoExtension } from 'ngx-editra';\nexport const greeting: EditraExtension = {\n\tid: 'greeting',\n\tcommands: () =&gt; ({\n\t\tgreeting: (state, dispatch) =&gt; {\n\t\t\tif (dispatch) dispatch(state.tr.insertText('Hello from an extension'));\n\t\t\treturn true;\n\t\t},\n\t}),\n\ttoolbar: [{ id: 'greeting', label: 'Insert greeting', command: 'greeting' }],\n};\nexport const extensions = [imageExtension(), videoExtension(), greeting];\n</code></pre>\n<p>On your component, use <code>config: EditraConfig = { extensions };</code> and bind <code>[config]=&quot;config&quot;</code>. Import the EditraConfig type from ngx-editra. The greeting example inserts text at the current selection and participates in document transactions/history.</p>\n<h2>Schema, ordering, and cleanup</h2>\n<p>Pass this list through config.extensions. Explicit lists replace default media node views.\nDispose extension resources in onDestroy; node views must implement destroy. Lifecycle callbacks\nare browser-only. Schema functions/serializers must be SSR-safe and extension code is trusted.\nBuilt-in HTML import handles the documented schema; custom nodes need their own import policy.\nCustom nodes can implement the SSR-safe <code>parseElement</code> hook, which receives a typed tag,\nattribute map, child nodes and text. Core tags and blocked executable subtrees take precedence.\nJSON imports pass through HTML normalization; a custom node needs both a serializer and a\nparseElement importer to round trip. A custom-node round-trip regression test covers this contract.</p>\n",
		headings: [
			{
				id: 'add-a-command-and-toolbar-button',
				label: 'Add a command and toolbar button',
			},
			{
				id: 'schema-ordering-and-cleanup',
				label: 'Schema, ordering, and cleanup',
			},
		],
		blocks: [
			{
				html: '<h1>Plugins and extensions</h1>\n',
				id: 'plugins-and-extensions',
				kind: 'content',
			},
			{
				html: '<p>An extension adds trusted application behavior to the editor. Most applications can use built-in tools without creating one. Start with a command-only extension before adding schema nodes or browser node views.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Add a command and toolbar button</h2>\n',
				id: 'add-a-command-and-toolbar-button',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Define an EditraExtension with a unique id.</li>\n<li>Return the custom command from commands and point a toolbar item at that command name.</li>\n<li>Pass the extension through config.extensions, including the default media extensions if you still want them.</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p><code>EditraExtension</code> supports unique IDs, explicit <code>requires</code>, schema nodes/marks, commands,\nkeyboard shortcuts, ProseMirror plugins, node views, toolbar items and browser lifecycle callbacks.\nDependencies are ordered before dependants while preserving deterministic registration order.\nDuplicate IDs/schema names/commands/shortcuts/node views and missing/cyclic dependencies throw.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "import type { EditraExtension } from 'ngx-editra';\nimport { imageExtension, videoExtension } from 'ngx-editra';\nexport const greeting: EditraExtension = {\n\tid: 'greeting',\n\tcommands: () => ({\n\t\tgreeting: (state, dispatch) => {\n\t\t\tif (dispatch) dispatch(state.tr.insertText('Hello from an extension'));\n\t\t\treturn true;\n\t\t},\n\t}),\n\ttoolbar: [{ id: 'greeting', label: 'Insert greeting', command: 'greeting' }],\n};\nexport const extensions = [imageExtension(), videoExtension(), greeting];\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import type { EditraExtension } from 'ngx-editra';\nimport { imageExtension, videoExtension } from 'ngx-editra';\nexport const greeting: EditraExtension = {\n\tid: 'greeting',\n\tcommands: () =&gt; ({\n\t\tgreeting: (state, dispatch) =&gt; {\n\t\t\tif (dispatch) dispatch(state.tr.insertText('Hello from an extension'));\n\t\t\treturn true;\n\t\t},\n\t}),\n\ttoolbar: [{ id: 'greeting', label: 'Insert greeting', command: 'greeting' }],\n};\nexport const extensions = [imageExtension(), videoExtension(), greeting];\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>On your component, use <code>config: EditraConfig = { extensions };</code> and bind <code>[config]=&quot;config&quot;</code>. Import the EditraConfig type from ngx-editra. The greeting example inserts text at the current selection and participates in document transactions/history.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Schema, ordering, and cleanup</h2>\n',
				id: 'schema-ordering-and-cleanup',
				kind: 'content',
			},
			{
				html: '<p>Pass this list through config.extensions. Explicit lists replace default media node views.\nDispose extension resources in onDestroy; node views must implement destroy. Lifecycle callbacks\nare browser-only. Schema functions/serializers must be SSR-safe and extension code is trusted.\nBuilt-in HTML import handles the documented schema; custom nodes need their own import policy.\nCustom nodes can implement the SSR-safe <code>parseElement</code> hook, which receives a typed tag,\nattribute map, child nodes and text. Core tags and blocked executable subtrees take precedence.\nJSON imports pass through HTML normalization; a custom node needs both a serializer and a\nparseElement importer to round trip. A custom-node round-trip regression test covers this contract.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " plugins and extensions\n\nan extension adds trusted application behavior to the editor. most applications can use built-in tools without creating one. start with a command-only extension before adding schema nodes or browser node views.\n\n add a command and toolbar button\n\n1. define an editraextension with a unique id.\n2. return the custom command from commands and point a toolbar item at that command name.\n3. pass the extension through config.extensions, including the default media extensions if you still want them.\n\neditraextension supports unique ids, explicit requires, schema nodes/marks, commands,\nkeyboard shortcuts, prosemirror plugins, node views, toolbar items and browser lifecycle callbacks.\ndependencies are ordered before dependants while preserving deterministic registration order.\nduplicate ids/schema names/commands/shortcuts/node views and missing/cyclic dependencies throw.\n\ntypescript\nimport type { editraextension } from 'ngx-editra';\nimport { imageextension, videoextension } from 'ngx-editra';\nexport const greeting: editraextension = {\n\tid: 'greeting',\n\tcommands: () => ({\n\t\tgreeting: (state, dispatch) => {\n\t\t\tif (dispatch) dispatch(state.tr.inserttext('hello from an extension'));\n\t\t\treturn true;\n\t\t},\n\t}),\n\ttoolbar: [{ id: 'greeting', label: 'insert greeting', command: 'greeting' }],\n};\nexport const extensions = [imageextension(), videoextension(), greeting];\n\n\non your component, use config: editraconfig = { extensions }; and bind [config]=\"config\". import the editraconfig type from ngx-editra. the greeting example inserts text at the current selection and participates in document transactions/history.\n\n schema, ordering, and cleanup\n\npass this list through config.extensions. explicit lists replace default media node views.\ndispose extension resources in ondestroy; node views must implement destroy. lifecycle callbacks\nare browser-only. schema functions/serializers must be ssr-safe and extension code is trusted.\nbuilt-in html import handles the documented schema; custom nodes need their own import policy.\ncustom nodes can implement the ssr-safe parseelement hook, which receives a typed tag,\nattribute map, child nodes and text. core tags and blocked executable subtrees take precedence.\njson imports pass through html normalization; a custom node needs both a serializer and a\nparseelement importer to round trip. a custom-node round-trip regression test covers this contract.\n",
	},
	{
		slug: 'api',
		title: 'Public API',
		group: 'Reference',
		source: 'docs/API.md',
		summary:
			'All public symbols are imported from ngx-editra. Internal implementation paths andseparate /core or /extensions import sources are unsupported.',
		readingMinutes: 5,
		html: '<h1>Public API</h1>\n<h2>Single package entry point</h2>\n<p>All public symbols are imported from <code>ngx-editra</code>. Internal implementation paths and\nseparate <code>/core</code> or <code>/extensions</code> import sources are unsupported.</p>\n<p>New to the component? Start with <a href="/guides/quick-start">Quick start</a>. Use <a href="/guides/events">events</a> for typed event handlers, <a href="/guides/content">content and saving</a> for conversion/persistence, and <a href="/guides/viewer">the viewer</a> for reading surfaces. This page is the compact reference rather than a setup tutorial.</p>\n<p><code>ngx-editra</code>: NgxEditraComponent, EditraToolbarComponent, EditraIconComponent, EditraColourPickerComponent,\neditraIconNames, EditraIconName, defaultToolbar, EDITRA_CONFIG,\nprovideEditra, EDITRA_DIALOG_PRESENTER, provideEditraDialogs and typed configuration/change/document/\nextension/provider/dialog presentation exports.</p>\n<p>Core exports from <code>ngx-editra</code>: EditraEngine, createSchema, createCommands, normalizeConfig, orderExtensions,\nparseHTML, serializeHTML, parseJSON, documentJSON, plainText, safeUrl, validateUrl, resolveVideo,\nsafeColor, safeFont, dimension, alignment, markActive/markStatus, cellBackground,\ntableAttribute, setParagraphAttribute, automaticLinks and typed contracts.</p>\n<p>Table dimension helpers: resizeTableRow, resizeTableColumns, setTableWidthPercent,\nfitTableToPage, distributeTableColumns and resetTableRowHeights. Resize helpers return validated\ntransactions or null; commands use the usual ProseMirror Command signature.</p>\n<p>Extension exports from <code>ngx-editra</code>: imageExtension, videoExtension, importMarkdown, exportMarkdown.</p>\n<h2>Saved content rendering</h2>\n<p>All rendering APIs validate saved HTML through the same schema and load shared styles\nautomatically. Each is standalone and exported from <code>ngx-editra</code>.</p>\n<table>\n<thead>\n<tr>\n<th>Import</th>\n<th>Template</th>\n<th>Code-copy controls</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>EditraContentDirective</code></td>\n<td><code>&lt;div [editraContent]=&quot;savedHtml&quot;&gt;&lt;/div&gt;</code></td>\n<td>Included</td>\n</tr>\n<tr>\n<td><code>EditraHtmlPipe</code></td>\n<td><code>&lt;div [innerHTML]=&quot;savedHtml | editraHtml&quot;&gt;&lt;/div&gt;</code></td>\n<td>Optional <code>EditraCodeCopyDirective</code></td>\n</tr>\n<tr>\n<td><code>NgxEditraViewerComponent</code></td>\n<td><code>&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot; /&gt;</code></td>\n<td>Included</td>\n</tr>\n</tbody>\n</table>\n<p>Configuration is optional: <code>[editraContentConfig]=&quot;config&quot;</code>, <code>editraHtml: config</code>, or\n<code>[config]=&quot;config&quot;</code>, respectively. Defaults come from <code>provideEditra</code> when configured.\nReplace configuration objects when changing themes or extensions. The pipe and directive\naccept null/undefined HTML as empty content. They render a block content wrapper; use\na <code>div</code>, <code>article</code> or other suitable block container. Do not combine <code>editraContent</code>\nwith another content binding or child template on its host. Copy controls require HTTPS\nor localhost in a browser; server rendering includes validated content and styles.</p>\n<h2>Media document attributes</h2>\n<p>Image/video nodes use <code>width: 0</code> and <code>height: 0</code> for automatic sizing, or positive pixel\ndimensions for custom sizing. <code>fullWidth: true</code> fills the available content width responsively.\n<code>align</code> supports left/center/right positioning, and <code>aspect</code> controls proportional interactive\nresizing. A resize saves custom dimensions and sets <code>fullWidth</code> to false. These are document\nattributes, rather than global editor configuration options.</p>\n<h2>Component inputs</h2>\n<table>\n<thead>\n<tr>\n<th>Input</th>\n<th>Type</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>config</code></td>\n<td><code>EditraConfig</code></td>\n<td>Immutable editor configuration.</td>\n</tr>\n<tr>\n<td><code>readonly</code></td>\n<td><code>boolean</code></td>\n<td>Display content without editing.</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>Enable semantic empty-document validation.</td>\n</tr>\n</tbody>\n</table>\n<p>Forms disabled state is set through the form API.</p>\n<h2>Component outputs</h2>\n<p>Outputs: contentChange ({html, document, text}), selectionChange ({from,to}), editorFocus,\neditorBlur, editorReady, editorDestroyed, editorError (Error), dirtyChange (boolean),\ntransactionState ({docChanged, selectionChanged, from, to, dirty}).\nSelection-only transactions never emit full contentChange.</p>\n<h2>Instance methods</h2>\n<table>\n<thead>\n<tr>\n<th>Method</th>\n<th>Return type</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>getHTML()</code></td>\n<td><code>string</code></td>\n<td>Export canonical HTML.</td>\n</tr>\n<tr>\n<td><code>getText()</code></td>\n<td><code>string</code></td>\n<td>Export plain text including captions and image alt text.</td>\n</tr>\n<tr>\n<td><code>getJSON()</code></td>\n<td><code>EditraDocument</code></td>\n<td>Export the document model.</td>\n</tr>\n<tr>\n<td><code>getMarkdown()</code></td>\n<td><code>string</code></td>\n<td>Export Markdown under the documented conversion policy.</td>\n</tr>\n<tr>\n<td><code>setHTML(html: string)</code></td>\n<td><code>void</code></td>\n<td>Replace content using the HTML policy.</td>\n</tr>\n<tr>\n<td><code>setJSON(value: EditraDocument)</code></td>\n<td><code>void</code></td>\n<td>Validate and replace document content.</td>\n</tr>\n<tr>\n<td><code>setMarkdown(value: string)</code></td>\n<td><code>void</code></td>\n<td>Import Markdown.</td>\n</tr>\n<tr>\n<td><code>clear()</code></td>\n<td><code>void</code></td>\n<td>Clear content with editing history.</td>\n</tr>\n<tr>\n<td><code>focus()</code> / <code>blur()</code></td>\n<td><code>void</code></td>\n<td>Control browser editing focus.</td>\n</tr>\n<tr>\n<td><code>isEmpty()</code></td>\n<td><code>boolean</code></td>\n<td>Check semantic document emptiness.</td>\n</tr>\n<tr>\n<td><code>isDirty()</code></td>\n<td><code>boolean</code></td>\n<td>Check editor dirty state.</td>\n</tr>\n</tbody>\n</table>\n<p>Programmatic setters silently synchronize an attached form\ncontrol without marking it dirty or emitting contentChange/valueChanges.\nclear is a user-style transaction with history. DOM focus/blur are no-ops before browser activation.\nState/conversion getters and setters work during SSR. Plain text includes captions and image alt text;\ncounts use whitespace-separated words and Unicode code points, including block separators.\nsetJSON/setMarkdown can throw on invalid input;\nwriteValue/setHTML report parsing failures through editorError without destroying existing content.</p>\n<h2>Core engine</h2>\n<p>Core EditraEngine is an imperative framework adapter API with a read-only EditorState getter and apply(Transaction).\nDo not mutate the Angular component\'s private engine. Use documented methods or extensions.</p>\n<p>For an advanced integration that owns its engine, the public engine can be used like this in an Angular application:</p>\n<pre><code class="language-typescript">import { EditraEngine } from \'ngx-editra\';\n\nconst engine = new EditraEngine({}, \'&lt;p&gt;Hello&lt;/p&gt;\');\nengine.apply(engine.state.tr.insertText(\' world\', 6));\nconst html = engine.getHTML();\nconsole.log(html);\n</code></pre>\n<p>This is a separate document engine, not a way to access the Angular component\'s private state. Most applications should use the component and Angular Forms. The published package includes Angular integration, so direct Node.js scripts need the appropriate Angular compilation/runtime setup.</p>\n<h2>Markdown conversion policy</h2>\n<p>CommonMark conversion supports its ordinary blocks/marks. Tables/videos export as safe raw HTML;\ncolour/font/size marks lose presentation. Raw HTML Markdown imports and custom nodes are not lossless.</p>\n<h2>Email export</h2>\n<p><code>exportEmail(html, options?, config?)</code> returns <code>EditraEmailResult</code> with complete <code>html</code>,\nplain <code>text</code>, and conversion <code>warnings</code>. <code>EditraEmailOptions</code> accepts title, preheader,\nwidth (360–800, default 600) and language. See <a href="/guides/email">email export</a> for content\nfallbacks, sending integration and the real-client verification requirements.</p>\n',
		headings: [
			{
				id: 'single-package-entry-point',
				label: 'Single package entry point',
			},
			{
				id: 'saved-content-rendering',
				label: 'Saved content rendering',
			},
			{
				id: 'media-document-attributes',
				label: 'Media document attributes',
			},
			{
				id: 'component-inputs',
				label: 'Component inputs',
			},
			{
				id: 'component-outputs',
				label: 'Component outputs',
			},
			{
				id: 'instance-methods',
				label: 'Instance methods',
			},
			{
				id: 'core-engine',
				label: 'Core engine',
			},
			{
				id: 'markdown-conversion-policy',
				label: 'Markdown conversion policy',
			},
			{
				id: 'email-export',
				label: 'Email export',
			},
		],
		blocks: [
			{
				html: '<h1>Public API</h1>\n',
				id: 'public-api',
				kind: 'content',
			},
			{
				html: '<h2>Single package entry point</h2>\n',
				id: 'single-package-entry-point',
				kind: 'content',
			},
			{
				html: '<p>All public symbols are imported from <code>ngx-editra</code>. Internal implementation paths and\nseparate <code>/core</code> or <code>/extensions</code> import sources are unsupported.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>New to the component? Start with <a href="/guides/quick-start">Quick start</a>. Use <a href="/guides/events">events</a> for typed event handlers, <a href="/guides/content">content and saving</a> for conversion/persistence, and <a href="/guides/viewer">the viewer</a> for reading surfaces. This page is the compact reference rather than a setup tutorial.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p><code>ngx-editra</code>: NgxEditraComponent, EditraToolbarComponent, EditraIconComponent, EditraColourPickerComponent,\neditraIconNames, EditraIconName, defaultToolbar, EDITRA_CONFIG,\nprovideEditra, EDITRA_DIALOG_PRESENTER, provideEditraDialogs and typed configuration/change/document/\nextension/provider/dialog presentation exports.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Core exports from <code>ngx-editra</code>: EditraEngine, createSchema, createCommands, normalizeConfig, orderExtensions,\nparseHTML, serializeHTML, parseJSON, documentJSON, plainText, safeUrl, validateUrl, resolveVideo,\nsafeColor, safeFont, dimension, alignment, markActive/markStatus, cellBackground,\ntableAttribute, setParagraphAttribute, automaticLinks and typed contracts.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Table dimension helpers: resizeTableRow, resizeTableColumns, setTableWidthPercent,\nfitTableToPage, distributeTableColumns and resetTableRowHeights. Resize helpers return validated\ntransactions or null; commands use the usual ProseMirror Command signature.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Extension exports from <code>ngx-editra</code>: imageExtension, videoExtension, importMarkdown, exportMarkdown.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Saved content rendering</h2>\n',
				id: 'saved-content-rendering',
				kind: 'content',
			},
			{
				html: '<p>All rendering APIs validate saved HTML through the same schema and load shared styles\nautomatically. Each is standalone and exported from <code>ngx-editra</code>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Import</th>\n<th>Template</th>\n<th>Code-copy controls</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>EditraContentDirective</code></td>\n<td><code>&lt;div [editraContent]=&quot;savedHtml&quot;&gt;&lt;/div&gt;</code></td>\n<td>Included</td>\n</tr>\n<tr>\n<td><code>EditraHtmlPipe</code></td>\n<td><code>&lt;div [innerHTML]=&quot;savedHtml | editraHtml&quot;&gt;&lt;/div&gt;</code></td>\n<td>Optional <code>EditraCodeCopyDirective</code></td>\n</tr>\n<tr>\n<td><code>NgxEditraViewerComponent</code></td>\n<td><code>&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot; /&gt;</code></td>\n<td>Included</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Configuration is optional: <code>[editraContentConfig]=&quot;config&quot;</code>, <code>editraHtml: config</code>, or\n<code>[config]=&quot;config&quot;</code>, respectively. Defaults come from <code>provideEditra</code> when configured.\nReplace configuration objects when changing themes or extensions. The pipe and directive\naccept null/undefined HTML as empty content. They render a block content wrapper; use\na <code>div</code>, <code>article</code> or other suitable block container. Do not combine <code>editraContent</code>\nwith another content binding or child template on its host. Copy controls require HTTPS\nor localhost in a browser; server rendering includes validated content and styles.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Media document attributes</h2>\n',
				id: 'media-document-attributes',
				kind: 'content',
			},
			{
				html: '<p>Image/video nodes use <code>width: 0</code> and <code>height: 0</code> for automatic sizing, or positive pixel\ndimensions for custom sizing. <code>fullWidth: true</code> fills the available content width responsively.\n<code>align</code> supports left/center/right positioning, and <code>aspect</code> controls proportional interactive\nresizing. A resize saves custom dimensions and sets <code>fullWidth</code> to false. These are document\nattributes, rather than global editor configuration options.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Component inputs</h2>\n',
				id: 'component-inputs',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Input</th>\n<th>Type</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>config</code></td>\n<td><code>EditraConfig</code></td>\n<td>Immutable editor configuration.</td>\n</tr>\n<tr>\n<td><code>readonly</code></td>\n<td><code>boolean</code></td>\n<td>Display content without editing.</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>Enable semantic empty-document validation.</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Forms disabled state is set through the form API.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Component outputs</h2>\n',
				id: 'component-outputs',
				kind: 'content',
			},
			{
				html: '<p>Outputs: contentChange ({html, document, text}), selectionChange ({from,to}), editorFocus,\neditorBlur, editorReady, editorDestroyed, editorError (Error), dirtyChange (boolean),\ntransactionState ({docChanged, selectionChanged, from, to, dirty}).\nSelection-only transactions never emit full contentChange.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Instance methods</h2>\n',
				id: 'instance-methods',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Method</th>\n<th>Return type</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>getHTML()</code></td>\n<td><code>string</code></td>\n<td>Export canonical HTML.</td>\n</tr>\n<tr>\n<td><code>getText()</code></td>\n<td><code>string</code></td>\n<td>Export plain text including captions and image alt text.</td>\n</tr>\n<tr>\n<td><code>getJSON()</code></td>\n<td><code>EditraDocument</code></td>\n<td>Export the document model.</td>\n</tr>\n<tr>\n<td><code>getMarkdown()</code></td>\n<td><code>string</code></td>\n<td>Export Markdown under the documented conversion policy.</td>\n</tr>\n<tr>\n<td><code>setHTML(html: string)</code></td>\n<td><code>void</code></td>\n<td>Replace content using the HTML policy.</td>\n</tr>\n<tr>\n<td><code>setJSON(value: EditraDocument)</code></td>\n<td><code>void</code></td>\n<td>Validate and replace document content.</td>\n</tr>\n<tr>\n<td><code>setMarkdown(value: string)</code></td>\n<td><code>void</code></td>\n<td>Import Markdown.</td>\n</tr>\n<tr>\n<td><code>clear()</code></td>\n<td><code>void</code></td>\n<td>Clear content with editing history.</td>\n</tr>\n<tr>\n<td><code>focus()</code> / <code>blur()</code></td>\n<td><code>void</code></td>\n<td>Control browser editing focus.</td>\n</tr>\n<tr>\n<td><code>isEmpty()</code></td>\n<td><code>boolean</code></td>\n<td>Check semantic document emptiness.</td>\n</tr>\n<tr>\n<td><code>isDirty()</code></td>\n<td><code>boolean</code></td>\n<td>Check editor dirty state.</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Programmatic setters silently synchronize an attached form\ncontrol without marking it dirty or emitting contentChange/valueChanges.\nclear is a user-style transaction with history. DOM focus/blur are no-ops before browser activation.\nState/conversion getters and setters work during SSR. Plain text includes captions and image alt text;\ncounts use whitespace-separated words and Unicode code points, including block separators.\nsetJSON/setMarkdown can throw on invalid input;\nwriteValue/setHTML report parsing failures through editorError without destroying existing content.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Core engine</h2>\n',
				id: 'core-engine',
				kind: 'content',
			},
			{
				html: "<p>Core EditraEngine is an imperative framework adapter API with a read-only EditorState getter and apply(Transaction).\nDo not mutate the Angular component's private engine. Use documented methods or extensions.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>For an advanced integration that owns its engine, the public engine can be used like this in an Angular application:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "import { EditraEngine } from 'ngx-editra';\n\nconst engine = new EditraEngine({}, '<p>Hello</p>');\nengine.apply(engine.state.tr.insertText(' world', 6));\nconst html = engine.getHTML();\nconsole.log(html);\n",
				language: 'typescript',
				html: "<pre><code class=\"language-typescript\">import { EditraEngine } from 'ngx-editra';\n\nconst engine = new EditraEngine({}, '&lt;p&gt;Hello&lt;/p&gt;');\nengine.apply(engine.state.tr.insertText(' world', 6));\nconst html = engine.getHTML();\nconsole.log(html);\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: "<p>This is a separate document engine, not a way to access the Angular component's private state. Most applications should use the component and Angular Forms. The published package includes Angular integration, so direct Node.js scripts need the appropriate Angular compilation/runtime setup.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Markdown conversion policy</h2>\n',
				id: 'markdown-conversion-policy',
				kind: 'content',
			},
			{
				html: '<p>CommonMark conversion supports its ordinary blocks/marks. Tables/videos export as safe raw HTML;\ncolour/font/size marks lose presentation. Raw HTML Markdown imports and custom nodes are not lossless.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Email export</h2>\n',
				id: 'email-export',
				kind: 'content',
			},
			{
				html: '<p><code>exportEmail(html, options?, config?)</code> returns <code>EditraEmailResult</code> with complete <code>html</code>,\nplain <code>text</code>, and conversion <code>warnings</code>. <code>EditraEmailOptions</code> accepts title, preheader,\nwidth (360–800, default 600) and language. See <a href="/guides/email">email export</a> for content\nfallbacks, sending integration and the real-client verification requirements.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' public api\n\n single package entry point\n\nall public symbols are imported from ngx-editra. internal implementation paths and\nseparate /core or /extensions import sources are unsupported.\n\nnew to the component? start with [quick start](quick_start.md). use [events](events.md) for typed event handlers, [content and saving](content.md) for conversion/persistence, and [the viewer](viewer.md) for reading surfaces. this page is the compact reference rather than a setup tutorial.\n\nngx-editra: ngxeditracomponent, editratoolbarcomponent, editraiconcomponent, editracolourpickercomponent,\neditraiconnames, editraiconname, defaulttoolbar, editra_config,\nprovideeditra, editra_dialog_presenter, provideeditradialogs and typed configuration/change/document/\nextension/provider/dialog presentation exports.\n\ncore exports from ngx-editra: editraengine, createschema, createcommands, normalizeconfig, orderextensions,\nparsehtml, serializehtml, parsejson, documentjson, plaintext, safeurl, validateurl, resolvevideo,\nsafecolor, safefont, dimension, alignment, markactive/markstatus, cellbackground,\ntableattribute, setparagraphattribute, automaticlinks and typed contracts.\n\ntable dimension helpers: resizetablerow, resizetablecolumns, settablewidthpercent,\nfittabletopage, distributetablecolumns and resettablerowheights. resize helpers return validated\ntransactions or null; commands use the usual prosemirror command signature.\n\nextension exports from ngx-editra: imageextension, videoextension, importmarkdown, exportmarkdown.\n\n saved content rendering\n\nall rendering apis validate saved html through the same schema and load shared styles\nautomatically. each is standalone and exported from ngx-editra.\n\n| import                     | template                                            | code-copy controls                 |\n| -------------------------- | --------------------------------------------------- | ---------------------------------- |\n| editracontentdirective   | <div [editracontent]="savedhtml"></div>           | included                           |\n| editrahtmlpipe           | <div [innerhtml]="savedhtml \\| editrahtml"></div> | optional editracodecopydirective |\n| ngxeditraviewercomponent | <ngx-editra-viewer [html]="savedhtml" />          | included                           |\n\nconfiguration is optional: [editracontentconfig]="config", editrahtml: config, or\n[config]="config", respectively. defaults come from provideeditra when configured.\nreplace configuration objects when changing themes or extensions. the pipe and directive\naccept null/undefined html as empty content. they render a block content wrapper; use\na div, article or other suitable block container. do not combine editracontent\nwith another content binding or child template on its host. copy controls require https\nor localhost in a browser; server rendering includes validated content and styles.\n\n media document attributes\n\nimage/video nodes use width: 0 and height: 0 for automatic sizing, or positive pixel\ndimensions for custom sizing. fullwidth: true fills the available content width responsively.\nalign supports left/center/right positioning, and aspect controls proportional interactive\nresizing. a resize saves custom dimensions and sets fullwidth to false. these are document\nattributes, rather than global editor configuration options.\n\n component inputs\n\n| input      | type           | purpose                                    |\n| ---------- | -------------- | ------------------------------------------ |\n| config   | editraconfig | immutable editor configuration.            |\n| readonly | boolean      | display content without editing.           |\n| required | boolean      | enable semantic empty-document validation. |\n\nforms disabled state is set through the form api.\n\n component outputs\n\noutputs: contentchange ({html, document, text}), selectionchange ({from,to}), editorfocus,\neditorblur, editorready, editordestroyed, editorerror (error), dirtychange (boolean),\ntransactionstate ({docchanged, selectionchanged, from, to, dirty}).\nselection-only transactions never emit full contentchange.\n\n instance methods\n\n| method                           | return type      | purpose                                                  |\n| -------------------------------- | ---------------- | -------------------------------------------------------- |\n| gethtml()                      | string         | export canonical html.                                   |\n| gettext()                      | string         | export plain text including captions and image alt text. |\n| getjson()                      | editradocument | export the document model.                               |\n| getmarkdown()                  | string         | export markdown under the documented conversion policy.  |\n| sethtml(html: string)          | void           | replace content using the html policy.                   |\n| setjson(value: editradocument) | void           | validate and replace document content.                   |\n| setmarkdown(value: string)     | void           | import markdown.                                         |\n| clear()                        | void           | clear content with editing history.                      |\n| focus() / blur()             | void           | control browser editing focus.                           |\n| isempty()                      | boolean        | check semantic document emptiness.                       |\n| isdirty()                      | boolean        | check editor dirty state.                                |\n\nprogrammatic setters silently synchronize an attached form\ncontrol without marking it dirty or emitting contentchange/valuechanges.\nclear is a user-style transaction with history. dom focus/blur are no-ops before browser activation.\nstate/conversion getters and setters work during ssr. plain text includes captions and image alt text;\ncounts use whitespace-separated words and unicode code points, including block separators.\nsetjson/setmarkdown can throw on invalid input;\nwritevalue/sethtml report parsing failures through editorerror without destroying existing content.\n\n core engine\n\ncore editraengine is an imperative framework adapter api with a read-only editorstate getter and apply(transaction).\ndo not mutate the angular component\'s private engine. use documented methods or extensions.\n\nfor an advanced integration that owns its engine, the public engine can be used like this in an angular application:\n\ntypescript\nimport { editraengine } from \'ngx-editra\';\n\nconst engine = new editraengine({}, \'<p>hello</p>\');\nengine.apply(engine.state.tr.inserttext(\' world\', 6));\nconst html = engine.gethtml();\nconsole.log(html);\n\n\nthis is a separate document engine, not a way to access the angular component\'s private state. most applications should use the component and angular forms. the published package includes angular integration, so direct node.js scripts need the appropriate angular compilation/runtime setup.\n\n markdown conversion policy\n\ncommonmark conversion supports its ordinary blocks/marks. tables/videos export as safe raw html;\ncolour/font/size marks lose presentation. raw html markdown imports and custom nodes are not lossless.\n\n email export\n\nexportemail(html, options?, config?) returns editraemailresult with complete html,\nplain text, and conversion warnings. editraemailoptions accepts title, preheader,\nwidth (360–800, default 600) and language. see [email export](email.md) for content\nfallbacks, sending integration and the real-client verification requirements.\n',
	},
	{
		slug: 'ssr',
		title: 'SSR & hydration',
		group: 'Reference',
		source: 'docs/SSR.md',
		summary:
			"Use the normal SSR setup for your application's Angular version. The editor can render initial content on the server and becomes interactive in the browser after rendering. You do not need to add fake browser globals.",
		readingMinutes: 2,
		html: "<h1>SSR and hydration</h1>\n<p>Use the normal SSR setup for your application's Angular version. The editor can render initial content on the server and becomes interactive in the browser after rendering. You do not need to add fake browser globals.</p>\n<h2>Server-safe document processing</h2>\n<p>The internal core does not require window, document, DOMParser or navigator for document conversion. Public imports come from the single ngx-editra Angular package; there is no separate framework-free core package entry point. parse5 converts HTML to the canonical document on both server and browser.\nThe deterministic serializer uses escaped strings and validated schema attributes.</p>\n<h2>What happens during rendering</h2>\n<p>The Angular component uses <code>NgxEditraViewerComponent</code> for its initial static content.\nThe viewer parses input through the schema and serializes validated attributes before\nmarking that canonical output as trusted HTML. This preserves styles and approved video\nplayers on both server and browser. Raw input is never passed to Angular's trust API.\nExtensions and video providers remain trusted application code.</p>\n<p>The component host has a static <code>ngSkipHydration</code> boundary. Angular hydrates the consuming\napplication, recreates that editor boundary and activates its ProseMirror view afterNextRender.\nThis deliberately avoids hydrating ProseMirror-managed DOM. Initial form content survives;\nstatic content is removed after activation and an empty browser surface owns the view.</p>\n<h2>Application setup and custom extensions</h2>\n<p>Enable your application's normal <code>provideClientHydration</code>/server rendering providers.\nAngular 18+ SSR bootstrap functions need the platform BootstrapContext, and patched newer\nrenderApplication APIs need explicit allowedHosts. The compatibility consumers demonstrate\nversion-specific server setup. Do not set browser globals on the server to hide errors.</p>\n<p>The Angular 22 playground and documentation explicitly use\n<code>provideClientHydration(withNoIncrementalHydration())</code> from <code>@angular/platform-browser</code>.\nThey retain standard hydration and load deferred demos after interaction. This avoids\nretaining repeatedly destroyed editor hosts in incremental event-replay bookkeeping;\nthe workspace checks repeated DOM/listener and heap growth. Angular 22 enables\nincremental hydration by default; applications choosing it should test their own\nmount/unmount lifecycle. See <a href=\"https://angular.dev/api/platform-browser/withNoIncrementalHydration\">Angular's hydration option</a>.</p>\n<p>Editor DOM methods are no-ops before activation. Conversion/state methods work during SSR.\nExtension onCreate/onDestroy callbacks run for browser editor activation/destruction only.</p>\n",
		headings: [
			{
				id: 'server-safe-document-processing',
				label: 'Server-safe document processing',
			},
			{
				id: 'what-happens-during-rendering',
				label: 'What happens during rendering',
			},
			{
				id: 'application-setup-and-custom-extensions',
				label: 'Application setup and custom extensions',
			},
		],
		blocks: [
			{
				html: '<h1>SSR and hydration</h1>\n',
				id: 'ssr-and-hydration',
				kind: 'content',
			},
			{
				html: "<p>Use the normal SSR setup for your application's Angular version. The editor can render initial content on the server and becomes interactive in the browser after rendering. You do not need to add fake browser globals.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Server-safe document processing</h2>\n',
				id: 'server-safe-document-processing',
				kind: 'content',
			},
			{
				html: '<p>The internal core does not require window, document, DOMParser or navigator for document conversion. Public imports come from the single ngx-editra Angular package; there is no separate framework-free core package entry point. parse5 converts HTML to the canonical document on both server and browser.\nThe deterministic serializer uses escaped strings and validated schema attributes.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>What happens during rendering</h2>\n',
				id: 'what-happens-during-rendering',
				kind: 'content',
			},
			{
				html: "<p>The Angular component uses <code>NgxEditraViewerComponent</code> for its initial static content.\nThe viewer parses input through the schema and serializes validated attributes before\nmarking that canonical output as trusted HTML. This preserves styles and approved video\nplayers on both server and browser. Raw input is never passed to Angular's trust API.\nExtensions and video providers remain trusted application code.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The component host has a static <code>ngSkipHydration</code> boundary. Angular hydrates the consuming\napplication, recreates that editor boundary and activates its ProseMirror view afterNextRender.\nThis deliberately avoids hydrating ProseMirror-managed DOM. Initial form content survives;\nstatic content is removed after activation and an empty browser surface owns the view.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Application setup and custom extensions</h2>\n',
				id: 'application-setup-and-custom-extensions',
				kind: 'content',
			},
			{
				html: "<p>Enable your application's normal <code>provideClientHydration</code>/server rendering providers.\nAngular 18+ SSR bootstrap functions need the platform BootstrapContext, and patched newer\nrenderApplication APIs need explicit allowedHosts. The compatibility consumers demonstrate\nversion-specific server setup. Do not set browser globals on the server to hide errors.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The Angular 22 playground and documentation explicitly use\n<code>provideClientHydration(withNoIncrementalHydration())</code> from <code>@angular/platform-browser</code>.\nThey retain standard hydration and load deferred demos after interaction. This avoids\nretaining repeatedly destroyed editor hosts in incremental event-replay bookkeeping;\nthe workspace checks repeated DOM/listener and heap growth. Angular 22 enables\nincremental hydration by default; applications choosing it should test their own\nmount/unmount lifecycle. See <a href="https://angular.dev/api/platform-browser/withNoIncrementalHydration">Angular\'s hydration option</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Editor DOM methods are no-ops before activation. Conversion/state methods work during SSR.\nExtension onCreate/onDestroy callbacks run for browser editor activation/destruction only.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " ssr and hydration\n\nuse the normal ssr setup for your application's angular version. the editor can render initial content on the server and becomes interactive in the browser after rendering. you do not need to add fake browser globals.\n\n server-safe document processing\n\nthe internal core does not require window, document, domparser or navigator for document conversion. public imports come from the single ngx-editra angular package; there is no separate framework-free core package entry point. parse5 converts html to the canonical document on both server and browser.\nthe deterministic serializer uses escaped strings and validated schema attributes.\n\n what happens during rendering\n\nthe angular component uses ngxeditraviewercomponent for its initial static content.\nthe viewer parses input through the schema and serializes validated attributes before\nmarking that canonical output as trusted html. this preserves styles and approved video\nplayers on both server and browser. raw input is never passed to angular's trust api.\nextensions and video providers remain trusted application code.\n\nthe component host has a static ngskiphydration boundary. angular hydrates the consuming\napplication, recreates that editor boundary and activates its prosemirror view afternextrender.\nthis deliberately avoids hydrating prosemirror-managed dom. initial form content survives;\nstatic content is removed after activation and an empty browser surface owns the view.\n\n application setup and custom extensions\n\nenable your application's normal provideclienthydration/server rendering providers.\nangular 18+ ssr bootstrap functions need the platform bootstrapcontext, and patched newer\nrenderapplication apis need explicit allowedhosts. the compatibility consumers demonstrate\nversion-specific server setup. do not set browser globals on the server to hide errors.\n\nthe angular 22 playground and documentation explicitly use\nprovideclienthydration(withnoincrementalhydration()) from @angular/platform-browser.\nthey retain standard hydration and load deferred demos after interaction. this avoids\nretaining repeatedly destroyed editor hosts in incremental event-replay bookkeeping;\nthe workspace checks repeated dom/listener and heap growth. angular 22 enables\nincremental hydration by default; applications choosing it should test their own\nmount/unmount lifecycle. see [angular's hydration option](https://angular.dev/api/platform-browser/withnoincrementalhydration).\n\neditor dom methods are no-ops before activation. conversion/state methods work during ssr.\nextension oncreate/ondestroy callbacks run for browser editor activation/destruction only.\n",
	},
	{
		slug: 'security',
		title: 'Security',
		group: 'Reference',
		source: 'docs/SECURITY.md',
		summary:
			'All HTML is parsed with parse5 and reconstructed as supported schema nodes/marks.Executable/foreign subtrees are dropped, unknown wrappers are unwrapped, and only explicitattributes survive. Output text and attributes are escaped. HTML sanitization is not regex-based.Regexes are used only for constrained scalar validation, URL recognition and literal search.',
		readingMinutes: 3,
		html: "<h1>Content policy and security</h1>\n<p>All HTML is parsed with parse5 and reconstructed as supported schema nodes/marks.\nExecutable/foreign subtrees are dropped, unknown wrappers are unwrapped, and only explicit\nattributes survive. Output text and attributes are escaped. HTML sanitization is not regex-based.\nRegexes are used only for constrained scalar validation, URL recognition and literal search.</p>\n<p>EditraHtmlPipe passes only the output of staticPreview's schema-based parsing and serialization\nto Angular's bypassSecurityTrustHtml API. This preserves validated formatting and approved media\nwhen rendering content. It does not make arbitrary HTML trustworthy. Keep this trust operation\ncentralized in the pipe and never pass raw input directly to it. Custom extension schemas and\nserializers are trusted application code and can affect this guarantee.</p>\n<p>URLs require absolute HTTPS by default. HTTP is explicitly opt-in. Credentials, control/space\ncharacters, javascript/data/file URLs and unsupported providers are rejected. Links also\npermit mailto. New-tab links have noopener/noreferrer. CSS values are bounded numbers,\nenumerated alignments/borders, approved fonts, and hex/RGB colours; arbitrary CSS is dropped.</p>\n<p>YouTube/Vimeo match exact hostnames and paths and create canonical HTTPS iframe URLs.\nCustom providers must declare exact allowed embed origins. Iframes use a restricted sandbox,\nlazy loading, referrer policy and fullscreen/picture-in-picture permissions. No autoplay permission\nis granted. Providers are trusted application code, not user-controlled configuration.</p>\n<p>Suggested CSP policy additions for enabled features:</p>\n<pre><code class=\"language-text\">frame-src https://www.youtube-nocookie.com https://player.vimeo.com;\nimg-src 'self' https:;\nmedia-src 'self' https:;\nstyle-src-attr 'unsafe-inline';\n</code></pre>\n<p>Prefer narrower image/media origins for your application. Angular/application script and style\npolicies need their normal nonce/hash configuration. Generated content uses bounded inline style\nattributes, so style-src-attr must permit them; this does not require unsafe-inline scripts.\nApplications prohibiting style attributes need a class-based renderer to preserve all formatting.\nNever permit arbitrary frame origins.\nThird-party providers may have additional requirements and may block playback or embedding.</p>\n<p>Client sanitization is not a replacement for server validation, authorization or safe redisplay.</p>\n<p>Email export rebuilds validated content without using extension serializers. Its\nplayground preview assigns only exporter output to a sandboxed iframe with a restrictive\nCSP. Raw editor HTML must never be assigned to that sink. Email warnings describe\nconversions, not a complete audit of removed input or a guarantee of inbox safety.\nRevalidate stored HTML/JSON on the server with the same content policy. Limits are one million\ninput characters and 100 nesting levels. Extension serializers/plugins are trusted application\ncode and need an independent audit; they must not emit unsafe tags/URLs or perform uploads.</p>\n<p>See <a href=\"https://angular.dev/best-practices/security\">Angular security guidance</a> and\n<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr\">CSP style attribute behavior</a>.</p>\n",
		headings: [],
		blocks: [
			{
				html: '<h1>Content policy and security</h1>\n',
				id: 'content-policy-and-security',
				kind: 'content',
			},
			{
				html: '<p>All HTML is parsed with parse5 and reconstructed as supported schema nodes/marks.\nExecutable/foreign subtrees are dropped, unknown wrappers are unwrapped, and only explicit\nattributes survive. Output text and attributes are escaped. HTML sanitization is not regex-based.\nRegexes are used only for constrained scalar validation, URL recognition and literal search.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>EditraHtmlPipe passes only the output of staticPreview's schema-based parsing and serialization\nto Angular's bypassSecurityTrustHtml API. This preserves validated formatting and approved media\nwhen rendering content. It does not make arbitrary HTML trustworthy. Keep this trust operation\ncentralized in the pipe and never pass raw input directly to it. Custom extension schemas and\nserializers are trusted application code and can affect this guarantee.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>URLs require absolute HTTPS by default. HTTP is explicitly opt-in. Credentials, control/space\ncharacters, javascript/data/file URLs and unsupported providers are rejected. Links also\npermit mailto. New-tab links have noopener/noreferrer. CSS values are bounded numbers,\nenumerated alignments/borders, approved fonts, and hex/RGB colours; arbitrary CSS is dropped.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>YouTube/Vimeo match exact hostnames and paths and create canonical HTTPS iframe URLs.\nCustom providers must declare exact allowed embed origins. Iframes use a restricted sandbox,\nlazy loading, referrer policy and fullscreen/picture-in-picture permissions. No autoplay permission\nis granted. Providers are trusted application code, not user-controlled configuration.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Suggested CSP policy additions for enabled features:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: "frame-src https://www.youtube-nocookie.com https://player.vimeo.com;\nimg-src 'self' https:;\nmedia-src 'self' https:;\nstyle-src-attr 'unsafe-inline';\n",
				language: 'text',
				html: "<pre><code class=\"language-text\">frame-src https://www.youtube-nocookie.com https://player.vimeo.com;\nimg-src 'self' https:;\nmedia-src 'self' https:;\nstyle-src-attr 'unsafe-inline';\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Prefer narrower image/media origins for your application. Angular/application script and style\npolicies need their normal nonce/hash configuration. Generated content uses bounded inline style\nattributes, so style-src-attr must permit them; this does not require unsafe-inline scripts.\nApplications prohibiting style attributes need a class-based renderer to preserve all formatting.\nNever permit arbitrary frame origins.\nThird-party providers may have additional requirements and may block playback or embedding.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Client sanitization is not a replacement for server validation, authorization or safe redisplay.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Email export rebuilds validated content without using extension serializers. Its\nplayground preview assigns only exporter output to a sandboxed iframe with a restrictive\nCSP. Raw editor HTML must never be assigned to that sink. Email warnings describe\nconversions, not a complete audit of removed input or a guarantee of inbox safety.\nRevalidate stored HTML/JSON on the server with the same content policy. Limits are one million\ninput characters and 100 nesting levels. Extension serializers/plugins are trusted application\ncode and need an independent audit; they must not emit unsafe tags/URLs or perform uploads.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>See <a href="https://angular.dev/best-practices/security">Angular security guidance</a> and\n<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr">CSP style attribute behavior</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " content policy and security\n\nall html is parsed with parse5 and reconstructed as supported schema nodes/marks.\nexecutable/foreign subtrees are dropped, unknown wrappers are unwrapped, and only explicit\nattributes survive. output text and attributes are escaped. html sanitization is not regex-based.\nregexes are used only for constrained scalar validation, url recognition and literal search.\n\neditrahtmlpipe passes only the output of staticpreview's schema-based parsing and serialization\nto angular's bypasssecuritytrusthtml api. this preserves validated formatting and approved media\nwhen rendering content. it does not make arbitrary html trustworthy. keep this trust operation\ncentralized in the pipe and never pass raw input directly to it. custom extension schemas and\nserializers are trusted application code and can affect this guarantee.\n\nurls require absolute https by default. http is explicitly opt-in. credentials, control/space\ncharacters, javascript/data/file urls and unsupported providers are rejected. links also\npermit mailto. new-tab links have noopener/noreferrer. css values are bounded numbers,\nenumerated alignments/borders, approved fonts, and hex/rgb colours; arbitrary css is dropped.\n\nyoutube/vimeo match exact hostnames and paths and create canonical https iframe urls.\ncustom providers must declare exact allowed embed origins. iframes use a restricted sandbox,\nlazy loading, referrer policy and fullscreen/picture-in-picture permissions. no autoplay permission\nis granted. providers are trusted application code, not user-controlled configuration.\n\nsuggested csp policy additions for enabled features:\n\ntext\nframe-src https://www.youtube-nocookie.com https://player.vimeo.com;\nimg-src 'self' https:;\nmedia-src 'self' https:;\nstyle-src-attr 'unsafe-inline';\n\n\nprefer narrower image/media origins for your application. angular/application script and style\npolicies need their normal nonce/hash configuration. generated content uses bounded inline style\nattributes, so style-src-attr must permit them; this does not require unsafe-inline scripts.\napplications prohibiting style attributes need a class-based renderer to preserve all formatting.\nnever permit arbitrary frame origins.\nthird-party providers may have additional requirements and may block playback or embedding.\n\nclient sanitization is not a replacement for server validation, authorization or safe redisplay.\n\nemail export rebuilds validated content without using extension serializers. its\nplayground preview assigns only exporter output to a sandboxed iframe with a restrictive\ncsp. raw editor html must never be assigned to that sink. email warnings describe\nconversions, not a complete audit of removed input or a guarantee of inbox safety.\nrevalidate stored html/json on the server with the same content policy. limits are one million\ninput characters and 100 nesting levels. extension serializers/plugins are trusted application\ncode and need an independent audit; they must not emit unsafe tags/urls or perform uploads.\n\nsee [angular security guidance](https://angular.dev/best-practices/security) and\n[csp style attribute behavior](https://developer.mozilla.org/en-us/docs/web/http/reference/headers/content-security-policy/style-src-attr).\n",
	},
	{
		slug: 'compatibility',
		title: 'Compatibility',
		group: 'Reference',
		source: 'docs/COMPATIBILITY.md',
		summary:
			'Use matching versions of Angular core, common, forms and platform-browser in your application.Check the peer dependencies of the package version you install:',
		readingMinutes: 2,
		html: '<h1>Angular compatibility</h1>\n<p>Use matching versions of Angular core, common, forms and platform-browser in your application.\nCheck the peer dependencies of the package version you install:</p>\n<pre><code class="language-sh">npm view ngx-editra@latest version peerDependencies\n</code></pre>\n<h2>Supported Angular versions</h2>\n<p>Version <code>1.0.0</code> supports stable Angular 17-22 with the peer range\n<code>&gt;=17.0.0 &lt;23.0.0</code>, including Angular 22.1.2. Angular prereleases, Angular 16\nand Angular 23 are outside this range. Earlier <code>0.1.0-alpha.0</code> releases use\nnarrower minimum patch versions:</p>\n<table>\n<thead>\n<tr>\n<th>Angular</th>\n<th>Minimum for 1.0.0</th>\n<th>Minimum for alpha.0</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>17</td>\n<td>17.0.0</td>\n<td>17.3.12</td>\n</tr>\n<tr>\n<td>18</td>\n<td>18.0.0</td>\n<td>18.2.14</td>\n</tr>\n<tr>\n<td>19</td>\n<td>19.0.0</td>\n<td>19.2.25</td>\n</tr>\n<tr>\n<td>20</td>\n<td>20.0.0</td>\n<td>20.3.33</td>\n</tr>\n<tr>\n<td>21</td>\n<td>21.0.0</td>\n<td>21.2.25</td>\n</tr>\n<tr>\n<td>22</td>\n<td>22.0.0</td>\n<td>22.2.2</td>\n</tr>\n</tbody>\n</table>\n<p>Check <a href="https://www.npmjs.com/package/ngx-editra?activeTab=versions">npm versions</a>\nfor availability before choosing a release. An older published version does not\nacquire a newer version\'s expanded peer range. Avoid <code>--force</code> and\n<code>--legacy-peer-deps</code> to bypass an incompatible Angular version.</p>\n<h2>Application requirements</h2>\n<p>Use the Node.js, TypeScript and RxJS versions supported by your Angular version.\nSee <a href="https://angular.dev/reference/versions">Angular version compatibility</a>.\nAngular is a peer dependency and is not bundled as a separate framework runtime.</p>\n<p>Compatibility testing covers minimum and later versions in each supported major,\nplus Angular 22.1.2. This does not mean every patch was individually tested or that\nolder Angular releases receive upstream security maintenance. Prefer current patched\nframework releases when possible.</p>\n<h2>Forms and server rendering</h2>\n<p>Reactive Forms and template-driven forms use Angular\'s ControlValueAccessor.\nAngular 22 Signal Forms uses the CVA compatibility integration and has dedicated\nconsumer tests. See <a href="/guides/angular-forms">forms integration</a>.</p>\n<p>The editor uses an explicit hydration boundary for ProseMirror-managed DOM.\nThe surrounding application can hydrate normally. See <a href="/guides/ssr">SSR and hydration</a>\nfor application setup and <a href="/guides/troubleshooting">troubleshooting</a> for integration issues.</p>\n',
		headings: [
			{
				id: 'supported-angular-versions',
				label: 'Supported Angular versions',
			},
			{
				id: 'application-requirements',
				label: 'Application requirements',
			},
			{
				id: 'forms-and-server-rendering',
				label: 'Forms and server rendering',
			},
		],
		blocks: [
			{
				html: '<h1>Angular compatibility</h1>\n',
				id: 'angular-compatibility',
				kind: 'content',
			},
			{
				html: '<p>Use matching versions of Angular core, common, forms and platform-browser in your application.\nCheck the peer dependencies of the package version you install:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				code: 'npm view ngx-editra@latest version peerDependencies\n',
				language: 'sh',
				html: '<pre><code class="language-sh">npm view ngx-editra@latest version peerDependencies\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<h2>Supported Angular versions</h2>\n',
				id: 'supported-angular-versions',
				kind: 'content',
			},
			{
				html: '<p>Version <code>1.0.0</code> supports stable Angular 17-22 with the peer range\n<code>&gt;=17.0.0 &lt;23.0.0</code>, including Angular 22.1.2. Angular prereleases, Angular 16\nand Angular 23 are outside this range. Earlier <code>0.1.0-alpha.0</code> releases use\nnarrower minimum patch versions:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Angular</th>\n<th>Minimum for 1.0.0</th>\n<th>Minimum for alpha.0</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>17</td>\n<td>17.0.0</td>\n<td>17.3.12</td>\n</tr>\n<tr>\n<td>18</td>\n<td>18.0.0</td>\n<td>18.2.14</td>\n</tr>\n<tr>\n<td>19</td>\n<td>19.0.0</td>\n<td>19.2.25</td>\n</tr>\n<tr>\n<td>20</td>\n<td>20.0.0</td>\n<td>20.3.33</td>\n</tr>\n<tr>\n<td>21</td>\n<td>21.0.0</td>\n<td>21.2.25</td>\n</tr>\n<tr>\n<td>22</td>\n<td>22.0.0</td>\n<td>22.2.2</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Check <a href="https://www.npmjs.com/package/ngx-editra?activeTab=versions">npm versions</a>\nfor availability before choosing a release. An older published version does not\nacquire a newer version\'s expanded peer range. Avoid <code>--force</code> and\n<code>--legacy-peer-deps</code> to bypass an incompatible Angular version.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Application requirements</h2>\n',
				id: 'application-requirements',
				kind: 'content',
			},
			{
				html: '<p>Use the Node.js, TypeScript and RxJS versions supported by your Angular version.\nSee <a href="https://angular.dev/reference/versions">Angular version compatibility</a>.\nAngular is a peer dependency and is not bundled as a separate framework runtime.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Compatibility testing covers minimum and later versions in each supported major,\nplus Angular 22.1.2. This does not mean every patch was individually tested or that\nolder Angular releases receive upstream security maintenance. Prefer current patched\nframework releases when possible.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>Forms and server rendering</h2>\n',
				id: 'forms-and-server-rendering',
				kind: 'content',
			},
			{
				html: '<p>Reactive Forms and template-driven forms use Angular\'s ControlValueAccessor.\nAngular 22 Signal Forms uses the CVA compatibility integration and has dedicated\nconsumer tests. See <a href="/guides/angular-forms">forms integration</a>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The editor uses an explicit hydration boundary for ProseMirror-managed DOM.\nThe surrounding application can hydrate normally. See <a href="/guides/ssr">SSR and hydration</a>\nfor application setup and <a href="/guides/troubleshooting">troubleshooting</a> for integration issues.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " angular compatibility\n\nuse matching versions of angular core, common, forms and platform-browser in your application.\ncheck the peer dependencies of the package version you install:\n\nsh\nnpm view ngx-editra@latest version peerdependencies\n\n\n supported angular versions\n\nversion 1.0.0 supports stable angular 17-22 with the peer range\n>=17.0.0 <23.0.0, including angular 22.1.2. angular prereleases, angular 16\nand angular 23 are outside this range. earlier 0.1.0-alpha.0 releases use\nnarrower minimum patch versions:\n\n| angular | minimum for 1.0.0 | minimum for alpha.0 |\n| ------- | ----------------- | ------------------- |\n| 17      | 17.0.0            | 17.3.12             |\n| 18      | 18.0.0            | 18.2.14             |\n| 19      | 19.0.0            | 19.2.25             |\n| 20      | 20.0.0            | 20.3.33             |\n| 21      | 21.0.0            | 21.2.25             |\n| 22      | 22.0.0            | 22.2.2              |\n\ncheck [npm versions](https://www.npmjs.com/package/ngx-editra?activetab=versions)\nfor availability before choosing a release. an older published version does not\nacquire a newer version's expanded peer range. avoid --force and\n--legacy-peer-deps to bypass an incompatible angular version.\n\n application requirements\n\nuse the node.js, typescript and rxjs versions supported by your angular version.\nsee [angular version compatibility](https://angular.dev/reference/versions).\nangular is a peer dependency and is not bundled as a separate framework runtime.\n\ncompatibility testing covers minimum and later versions in each supported major,\nplus angular 22.1.2. this does not mean every patch was individually tested or that\nolder angular releases receive upstream security maintenance. prefer current patched\nframework releases when possible.\n\n forms and server rendering\n\nreactive forms and template-driven forms use angular's controlvalueaccessor.\nangular 22 signal forms uses the cva compatibility integration and has dedicated\nconsumer tests. see [forms integration](angular_forms.md).\n\nthe editor uses an explicit hydration boundary for prosemirror-managed dom.\nthe surrounding application can hydrate normally. see [ssr and hydration](ssr.md)\nfor application setup and [troubleshooting](troubleshooting.md) for integration issues.\n",
	},
	{
		slug: 'changelog',
		title: 'Changelog',
		group: 'Reference',
		source: 'CHANGELOG.md',
		summary: '﻿# Changelog',
		readingMinutes: 3,
		html: "<p>﻿# Changelog</p>\n<h2>1.0.1 - in preparation</h2>\n<ul>\n<li>Export column layouts as validated HTML in Markdown instead of throwing an unsupported-node error.</li>\n</ul>\n<h2>1.0.0 - published</h2>\n<ul>\n<li>\n<p>Keep table and colour panels open when a queued toolbar scroll event arrives after opening.</p>\n</li>\n<li>\n<p>Add table border colours when inserting or editing tables, preserved in HTML, JSON and email export.</p>\n</li>\n<li>\n<p>Expand Angular peers to <code>&gt;=17.0.0 &lt;23.0.0</code>, including Angular 22.1.2.</p>\n</li>\n<li>\n<p>Verify Angular 22 Signal Forms compatibility for HTML values, validation, disabled\nstate, dirty/touched state and resets.</p>\n</li>\n<li>\n<p>Refresh semantic required validation after programmatic writes and resets.</p>\n</li>\n<li>\n<p>Keep toolbars compact with two scrollable rows, bounded selector widths and grouped\ninsert tools, larger touch targets, clearer active states and shortcut hints.</p>\n</li>\n<li>\n<p>Prepare the first stable release, installed with <code>npm install ngx-editra</code>.</p>\n</li>\n<li>\n<p>Group table actions into compact, responsive panels with separate Structure, Appearance,\nand Dimensions views and labelled appearance controls.</p>\n</li>\n<li>\n<p>Keep table resize cursors aligned with the actual handles and clear them in read-only mode.</p>\n</li>\n<li>\n<p>Refine colour, media, and line settings panels; allow alternative text during image insertion.</p>\n</li>\n</ul>\n<h2>0.1.0-alpha.0 - initial published release</h2>\n<h3>Editor and forms</h3>\n<ul>\n<li>Standalone <code>NgxEditraComponent</code> (<code>&lt;ngx-editra&gt;</code>) with HTML-valued Reactive Forms and\ntemplate-driven forms, semantic required validation, disabled/read-only states, typed\nevents and an explicit hydration boundary.</li>\n<li>ProseMirror engine with schema-based HTML/JSON validation, bounded parsing,\ndeterministic serialization and configurable URL/media policies.</li>\n<li>Formatting, headings, lists, alignment, history, find/replace, counts, font/highlight\npalettes, code blocks, tables, media, columns and horizontal lines.</li>\n<li>Model-backed media/table/column resizing with keyboard controls, cancellation and undo.</li>\n<li>Responsive toolbar controls, optional pinned/floating toolbars, viewport-contained\ndialogs and palettes, compact colour swatches and fullscreen editing.</li>\n<li>Programmatic writes reset history; rejected configuration preserves the active editor.\nImport validation includes nested code/captions and divider formatting.</li>\n</ul>\n<h3>Saved content and customization</h3>\n<ul>\n<li><code>exportEmail</code> generates separate inline-styled email HTML, plain text and conversion\nwarnings, with an Outlook width fallback and stacked column/video-link fallbacks.\nA sandboxed playground preview and client-testing guide accompany the API; real\nGmail/Outlook/Apple Mail verification remains outstanding.</li>\n<li><code>NgxEditraViewerComponent</code> (<code>&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot;&gt;</code>) and <code>[editraContent]</code>\nfor validated, styled saved HTML with code-copy controls.</li>\n<li><code>editraHtml</code> pipe for validated <code>[innerHTML]</code> rendering with automatic styles;\noptional <code>editraCodeCopy</code> supplies interactive copy controls for this binding.</li>\n<li>Included editor/content styles, light/dark/automatic themes, CSS custom properties and\noptional Sass exports. Public renderers do not require manual style imports.</li>\n<li>Public APIs exported from <code>ngx-editra</code>, including the document engine, typed\nconfiguration, deterministic extensions and CommonMark conversion utilities.</li>\n</ul>\n<h3>Documentation and examples</h3>\n<ul>\n<li>Playground and searchable documentation apps with examples, code copying and guides\ngenerated from the canonical repository Markdown.</li>\n</ul>\n<p>Signal Forms can use Angular's ControlValueAccessor compatibility integration, but dedicated\nSignal Forms integration tests are outstanding. This alpha does not establish stable-release\nacceptance or upstream security support for legacy runtimes.</p>\n",
		headings: [
			{
				id: '1-0-1-in-preparation',
				label: '1.0.1 - in preparation',
			},
			{
				id: '1-0-0-published',
				label: '1.0.0 - published',
			},
			{
				id: '0-1-0-alpha-0-initial-published-release',
				label: '0.1.0-alpha.0 - initial published release',
			},
			{
				id: 'editor-and-forms',
				label: 'Editor and forms',
			},
			{
				id: 'saved-content-and-customization',
				label: 'Saved content and customization',
			},
			{
				id: 'documentation-and-examples',
				label: 'Documentation and examples',
			},
		],
		blocks: [
			{
				html: '<p>﻿# Changelog</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>1.0.1 - in preparation</h2>\n',
				id: '1-0-1-in-preparation',
				kind: 'content',
			},
			{
				html: '<ul>\n<li>Export column layouts as validated HTML in Markdown instead of throwing an unsupported-node error.</li>\n</ul>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>1.0.0 - published</h2>\n',
				id: '1-0-0-published',
				kind: 'content',
			},
			{
				html: '<ul>\n<li>\n<p>Keep table and colour panels open when a queued toolbar scroll event arrives after opening.</p>\n</li>\n<li>\n<p>Add table border colours when inserting or editing tables, preserved in HTML, JSON and email export.</p>\n</li>\n<li>\n<p>Expand Angular peers to <code>&gt;=17.0.0 &lt;23.0.0</code>, including Angular 22.1.2.</p>\n</li>\n<li>\n<p>Verify Angular 22 Signal Forms compatibility for HTML values, validation, disabled\nstate, dirty/touched state and resets.</p>\n</li>\n<li>\n<p>Refresh semantic required validation after programmatic writes and resets.</p>\n</li>\n<li>\n<p>Keep toolbars compact with two scrollable rows, bounded selector widths and grouped\ninsert tools, larger touch targets, clearer active states and shortcut hints.</p>\n</li>\n<li>\n<p>Prepare the first stable release, installed with <code>npm install ngx-editra</code>.</p>\n</li>\n<li>\n<p>Group table actions into compact, responsive panels with separate Structure, Appearance,\nand Dimensions views and labelled appearance controls.</p>\n</li>\n<li>\n<p>Keep table resize cursors aligned with the actual handles and clear them in read-only mode.</p>\n</li>\n<li>\n<p>Refine colour, media, and line settings panels; allow alternative text during image insertion.</p>\n</li>\n</ul>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2>0.1.0-alpha.0 - initial published release</h2>\n',
				id: '0-1-0-alpha-0-initial-published-release',
				kind: 'content',
			},
			{
				html: '<h3>Editor and forms</h3>\n',
				id: 'editor-and-forms',
				kind: 'content',
			},
			{
				html: '<ul>\n<li>Standalone <code>NgxEditraComponent</code> (<code>&lt;ngx-editra&gt;</code>) with HTML-valued Reactive Forms and\ntemplate-driven forms, semantic required validation, disabled/read-only states, typed\nevents and an explicit hydration boundary.</li>\n<li>ProseMirror engine with schema-based HTML/JSON validation, bounded parsing,\ndeterministic serialization and configurable URL/media policies.</li>\n<li>Formatting, headings, lists, alignment, history, find/replace, counts, font/highlight\npalettes, code blocks, tables, media, columns and horizontal lines.</li>\n<li>Model-backed media/table/column resizing with keyboard controls, cancellation and undo.</li>\n<li>Responsive toolbar controls, optional pinned/floating toolbars, viewport-contained\ndialogs and palettes, compact colour swatches and fullscreen editing.</li>\n<li>Programmatic writes reset history; rejected configuration preserves the active editor.\nImport validation includes nested code/captions and divider formatting.</li>\n</ul>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h3>Saved content and customization</h3>\n',
				id: 'saved-content-and-customization',
				kind: 'content',
			},
			{
				html: '<ul>\n<li><code>exportEmail</code> generates separate inline-styled email HTML, plain text and conversion\nwarnings, with an Outlook width fallback and stacked column/video-link fallbacks.\nA sandboxed playground preview and client-testing guide accompany the API; real\nGmail/Outlook/Apple Mail verification remains outstanding.</li>\n<li><code>NgxEditraViewerComponent</code> (<code>&lt;ngx-editra-viewer [html]=&quot;savedHtml&quot;&gt;</code>) and <code>[editraContent]</code>\nfor validated, styled saved HTML with code-copy controls.</li>\n<li><code>editraHtml</code> pipe for validated <code>[innerHTML]</code> rendering with automatic styles;\noptional <code>editraCodeCopy</code> supplies interactive copy controls for this binding.</li>\n<li>Included editor/content styles, light/dark/automatic themes, CSS custom properties and\noptional Sass exports. Public renderers do not require manual style imports.</li>\n<li>Public APIs exported from <code>ngx-editra</code>, including the document engine, typed\nconfiguration, deterministic extensions and CommonMark conversion utilities.</li>\n</ul>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h3>Documentation and examples</h3>\n',
				id: 'documentation-and-examples',
				kind: 'content',
			},
			{
				html: '<ul>\n<li>Playground and searchable documentation apps with examples, code copying and guides\ngenerated from the canonical repository Markdown.</li>\n</ul>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Signal Forms can use Angular's ControlValueAccessor compatibility integration, but dedicated\nSignal Forms integration tests are outstanding. This alpha does not establish stable-release\nacceptance or upstream security support for legacy runtimes.</p>\n",
				id: '',
				kind: 'content',
			},
		],
		search: '﻿ changelog\n\n 1.0.1 - in preparation\n\n-   export column layouts as validated html in markdown instead of throwing an unsupported-node error.\n\n 1.0.0 - published\n\n-   keep table and colour panels open when a queued toolbar scroll event arrives after opening.\n\n-   add table border colours when inserting or editing tables, preserved in html, json and email export.\n\n-   expand angular peers to >=17.0.0 <23.0.0, including angular 22.1.2.\n-   verify angular 22 signal forms compatibility for html values, validation, disabled\n    state, dirty/touched state and resets.\n-   refresh semantic required validation after programmatic writes and resets.\n-   keep toolbars compact with two scrollable rows, bounded selector widths and grouped\n    insert tools, larger touch targets, clearer active states and shortcut hints.\n-   prepare the first stable release, installed with npm install ngx-editra.\n-   group table actions into compact, responsive panels with separate structure, appearance,\n    and dimensions views and labelled appearance controls.\n-   keep table resize cursors aligned with the actual handles and clear them in read-only mode.\n-   refine colour, media, and line settings panels; allow alternative text during image insertion.\n\n 0.1.0-alpha.0 - initial published release\n\n editor and forms\n\n-   standalone ngxeditracomponent (<ngx-editra>) with html-valued reactive forms and\n    template-driven forms, semantic required validation, disabled/read-only states, typed\n    events and an explicit hydration boundary.\n-   prosemirror engine with schema-based html/json validation, bounded parsing,\n    deterministic serialization and configurable url/media policies.\n-   formatting, headings, lists, alignment, history, find/replace, counts, font/highlight\n    palettes, code blocks, tables, media, columns and horizontal lines.\n-   model-backed media/table/column resizing with keyboard controls, cancellation and undo.\n-   responsive toolbar controls, optional pinned/floating toolbars, viewport-contained\n    dialogs and palettes, compact colour swatches and fullscreen editing.\n-   programmatic writes reset history; rejected configuration preserves the active editor.\n    import validation includes nested code/captions and divider formatting.\n\n saved content and customization\n\n-   exportemail generates separate inline-styled email html, plain text and conversion\n    warnings, with an outlook width fallback and stacked column/video-link fallbacks.\n    a sandboxed playground preview and client-testing guide accompany the api; real\n    gmail/outlook/apple mail verification remains outstanding.\n-   ngxeditraviewercomponent (<ngx-editra-viewer [html]="savedhtml">) and [editracontent]\n    for validated, styled saved html with code-copy controls.\n-   editrahtml pipe for validated [innerhtml] rendering with automatic styles;\n    optional editracodecopy supplies interactive copy controls for this binding.\n-   included editor/content styles, light/dark/automatic themes, css custom properties and\n    optional sass exports. public renderers do not require manual style imports.\n-   public apis exported from ngx-editra, including the document engine, typed\n    configuration, deterministic extensions and commonmark conversion utilities.\n\n documentation and examples\n\n-   playground and searchable documentation apps with examples, code copying and guides\n    generated from the canonical repository markdown.\n\nsignal forms can use angular\'s controlvalueaccessor compatibility integration, but dedicated\nsignal forms integration tests are outstanding. this alpha does not establish stable-release\nacceptance or upstream security support for legacy runtimes.\n',
	},
	{
		slug: 'security-reporting',
		title: 'Report a vulnerability',
		group: 'Reference',
		source: 'SECURITY.md',
		summary:
			'Do not post exploit details, credentials or private documents in public issues.Use GitHub private vulnerability reportingwhen the repository offers that option. If private reporting is unavailable, open aminimal issue requesting a private contact channel; do not include vulnerability details.The maintainer must enable private reporting in the repository security settings beforeadvertising it as an active reporting channel. No response-time guarantee is establishedfor this library.',
		readingMinutes: 1,
		html: '<h1>Reporting security vulnerabilities</h1>\n<p>Do not post exploit details, credentials or private documents in public issues.\nUse <a href="https://github.com/Khatri-Sanjay/ngx-editra/security/advisories/new">GitHub private vulnerability reporting</a>\nwhen the repository offers that option. If private reporting is unavailable, open a\nminimal issue requesting a private contact channel; do not include vulnerability details.\nThe maintainer must enable private reporting in the repository security settings before\nadvertising it as an active reporting channel. No response-time guarantee is established\nfor this library.</p>\n<p>Include the affected version or source revision, Angular/browser versions, a minimal\nreproduction with synthetic content, impact, and any suggested mitigation through the\nprivate channel. Keep reports private while fixes and disclosure are coordinated.</p>\n<p>The current development line receives fixes in this repository. Version 1.0.0 is\nbeing prepared as the first stable release; no historical release lines or LTS\ncommitments are maintained. Angular compatibility\nranges describe integration testing, not security support for legacy Angular or Node.</p>\n<p>See <a href="/guides/security">content security policy</a> for HTML validation, URL restrictions,\ntrusted extensions and server-side responsibilities.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1>Reporting security vulnerabilities</h1>\n',
				id: 'reporting-security-vulnerabilities',
				kind: 'content',
			},
			{
				html: '<p>Do not post exploit details, credentials or private documents in public issues.\nUse <a href="https://github.com/Khatri-Sanjay/ngx-editra/security/advisories/new">GitHub private vulnerability reporting</a>\nwhen the repository offers that option. If private reporting is unavailable, open a\nminimal issue requesting a private contact channel; do not include vulnerability details.\nThe maintainer must enable private reporting in the repository security settings before\nadvertising it as an active reporting channel. No response-time guarantee is established\nfor this library.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Include the affected version or source revision, Angular/browser versions, a minimal\nreproduction with synthetic content, impact, and any suggested mitigation through the\nprivate channel. Keep reports private while fixes and disclosure are coordinated.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The current development line receives fixes in this repository. Version 1.0.0 is\nbeing prepared as the first stable release; no historical release lines or LTS\ncommitments are maintained. Angular compatibility\nranges describe integration testing, not security support for legacy Angular or Node.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>See <a href="/guides/security">content security policy</a> for HTML validation, URL restrictions,\ntrusted extensions and server-side responsibilities.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' reporting security vulnerabilities\n\ndo not post exploit details, credentials or private documents in public issues.\nuse [github private vulnerability reporting](https://github.com/khatri-sanjay/ngx-editra/security/advisories/new)\nwhen the repository offers that option. if private reporting is unavailable, open a\nminimal issue requesting a private contact channel; do not include vulnerability details.\nthe maintainer must enable private reporting in the repository security settings before\nadvertising it as an active reporting channel. no response-time guarantee is established\nfor this library.\n\ninclude the affected version or source revision, angular/browser versions, a minimal\nreproduction with synthetic content, impact, and any suggested mitigation through the\nprivate channel. keep reports private while fixes and disclosure are coordinated.\n\nthe current development line receives fixes in this repository. version 1.0.0 is\nbeing prepared as the first stable release; no historical release lines or lts\ncommitments are maintained. angular compatibility\nranges describe integration testing, not security support for legacy angular or node.\n\nsee [content security policy](docs/security.md) for html validation, url restrictions,\ntrusted extensions and server-side responsibilities.\n',
	},
];
