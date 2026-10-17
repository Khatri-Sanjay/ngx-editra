# Feature overview

ngx-editra is a rich-text editor for Angular applications. Writers use a toolbar; your application receives an HTML string through Angular Forms. You can also read the document as JSON, plain text, or Markdown.

## Start with these three steps

1. [Install the library](INSTALLATION.md); component styles load automatically.
2. [Create your first editor](QUICK_START.md).
3. [Connect a form and save its value](ANGULAR_FORMS.md).

Open the live example in this documentation to try the real component. The library is an alpha; review [compatibility](COMPATIBILITY.md) and [content security](SECURITY.md) before adopting it.

## What writers can do

| Feature          | What it does                                                                      | Learn more                        |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------- |
| Text formatting  | Bold, italic, underline, strike, subscript, superscript, and clear formatting     | [Formatting](FORMATTING.md)       |
| Typography       | Headings, fonts, sizes, text colour, highlights, and text-case conversion         | [Formatting](FORMATTING.md)       |
| Paragraph layout | Alignment, indentation, line spacing, lists, and blockquotes                      | [Formatting](FORMATTING.md)       |
| Links            | Insert and edit validated web and email links                                     | [Links](LINKS.md)                 |
| Images           | Insert by URL, add captions, align, resize, and place content beside an image     | [Images](IMAGES.md)               |
| Videos           | Embed supported YouTube/Vimeo URLs or play a direct MP4                           | [Videos](VIDEOS.md)               |
| Tables           | Insert, merge/split cells, add rows/columns, resize, shade, and adjust borders    | [Tables](TABLES.md)               |
| Columns          | Arrange independent content side by side and resize the divider                   | [Columns and lines](LAYOUT.md)    |
| Horizontal lines | Add a divider with a chosen style and weight                                      | [Columns and lines](LAYOUT.md)    |
| Code             | Insert inline code or a code block with a language label and copy control         | [Code blocks](CODE_BLOCKS.md)     |
| Find and replace | Find text, move between matches, replace one or all                               | [Editing tools](EDITING_TOOLS.md) |
| Undo and redo    | Reverse document edits, formatting, and committed resizing operations             | [Editing tools](EDITING_TOOLS.md) |
| Workspace tools  | Fullscreen, pinned toolbar, floating selection toolbar, and word/character counts | [Editing tools](EDITING_TOOLS.md) |

## What application developers can do

| Requirement                  | Integration                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| Bind an editor to a form     | Reactive Forms, form groups, or ngModel; values stay HTML                                    |
| Validate required content    | Set the editor's required input for semantic empty-document validation                       |
| Disable editing              | Use the form's disable/enable methods, or the readonly input for viewing                     |
| Set application defaults     | provideEditra(config), with per-editor config input overrides                                |
| Match a design system        | Light, dark, or auto themes and CSS custom properties                                        |
| Save and restore content     | Read form HTML or explicit JSON conversion methods; use your own backend                     |
| Render saved documents       | NgxEditraViewerComponent, editraContent directive, or editraHtml pipe with automatic styles  |
| React to editor activity     | Content, selection, ready, destroy, focus, blur, dirty, error, and transaction events        |
| Add behavior                 | Typed extensions with commands, toolbar items, schema contributions, plugins, and node views |
| Server-render an application | Static validated content on the server; browser editing starts after rendering               |

## What is not included

Use [email export](EMAIL.md) for a separate conservative email HTML/text body with
conversion warnings. Real Gmail, Outlook and Apple Mail rendering still requires inbox tests.

The library does not provide a backend, file uploads, cloud storage, collaboration, track changes, PDF/Word export, or syntax highlighting. An image/video URL must already be accessible to the viewer. A valid URL does not guarantee that its host allows embedding.

HTML and JSON preserve supported document features. Markdown is a conversion format and cannot preserve every colour, font, table, or media detail. See [content and saving](CONTENT.md).
