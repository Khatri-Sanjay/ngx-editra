# Toolbar

The toolbar includes text marks, history, block styles, fonts, sizes, colours, alignment,
lists, indentation, media/link dialogs, tables, find/replace and fullscreen.

## Colour and highlight palettes

Font colour and text highlight use Word-style split buttons: the main icon applies the
current/last-used colour, and the arrow opens an anchored palette. With no font colour selected,
the main action is theme-aware Automatic. Font/cell palettes include
theme shades and standard colours. Highlight offers familiar highlighter colours.
Recent colours, custom hex values and a native More colours picker are available.
Automatic removes the text-colour mark; No colour removes highlighting; No fill clears cell shading.
Choosing a colour replaces that mark's value and preserves other formatting and the document selection.
Applying the same colour does not toggle it off. Caret-only changes affect subsequent typing.

Palette swatches support arrow/Home/End navigation, Enter activation and Escape closure.
Outside clicks or moving focus out close the palette. Controls follow disabled/read-only states.
The public EditraColourPickerComponent exposes label, kind, value and disabled inputs;
colourChange emits a validated colour or null, and opened/closed events let adapters preserve selection.

## Layout and customisation

`config.toolbar.hidden` hides the complete toolbar. `config.toolbar.items` replaces the
command-button list. Each item has `id`, `label`, `command` and an optional `icon`.
Built-in actions use local SVG icons rather than text buttons. Buttons retain accessible labels,
tooltips, selection preservation and disabled/active/mixed states. The default layout separates
native formatting selectors and insertion tools from grouped editing commands.

`icon` accepts a built-in icon name such as `bold`, `link`, `image` or `find`; omitted icons
are inferred from the command. Existing plain-text custom glyphs such as `★` remain supported.
Unknown custom commands use an extension icon. SVG strings are never interpreted as markup.
`editraIconNames` and the `EditraIconName` type are exported from `ngx-editra` for discovery;
`EditraIconComponent` is available for custom Angular UI. Icons inherit currentColor and work
without fonts, external requests or a third-party icon dependency.
Extension toolbar contributions are appended. `groups` supplies labeled command groups,
`overflow: 'scroll'` is the default and keeps commands in a compact horizontal scrolling row.
Choose `overflow: 'wrap'` for wrapped command groups on larger screens. `floating: true` enables
a selection toolbar. `hiddenItems` hides command IDs or formatting input labels. Table
operations are contextual to a table selection. Native selectors show current/default/mixed values.
In editors up to 640px wide, both toolbar rows scroll horizontally instead of stacking
into a tall panel. This follows the editor's width, including narrow panels on desktop.
Command groups stay together, and keyboard focus brings off-screen buttons into view.
Touch devices get 44px command targets. Active buttons retain their selected state on
hover, and common command tooltips include their keyboard shortcuts.

```typescript
import type { EditraConfig } from 'ngx-editra';
export const config: EditraConfig = {
	toolbar: {
		items: [
			{ id: 'bold', label: 'Bold', command: 'bold', icon: 'bold' },
			{ id: 'undo', label: 'Undo', command: 'undo' },
		],
	},
};
```

Toolbar buttons preserve the document selection on pointer interaction. Arrow/Home/End
keys move focus between enabled buttons. Mark buttons expose true/false/mixed pressed state.
Shortcuts use ProseMirror's Mod key: bold, italic, underline, undo/redo, indent/outdent.
Shift+Enter inserts a hard break. Native dialogs provide focus containment and Escape closure.

Override dialog presentation with `provideEditraDialogs({ open, close })` from `ngx-editra`.
The default presenter uses showModal/close. Custom presenters must preserve focus containment,
Escape behavior and focus return. Dialog contents and editor commands remain owned by the library.
