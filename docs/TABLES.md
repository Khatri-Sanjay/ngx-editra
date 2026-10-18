# Tables

Tables arrange related data into rows and columns. Use the table tool to insert a grid, then select a cell to reveal contextual editing tools.

## Insert and edit a table

1. Open the table tool and choose a grid size with the pointer or keyboard. Numeric row/column controls are available for a specific size.
2. Click a cell and enter content. Use the table tools to add or remove a row/column, merge or split selected cells, or delete the table.
3. Drag a row or column boundary to resize. Escape cancels; releasing commits one undoable change.
4. Switch to Appearance for cell fill, border style, and line weight, or Dimensions for table width and minimum row height. Structure contains row, column, cell and AutoFit actions.

Use tables for tabular information. For two independent content areas, prefer [columns](LAYOUT.md). Table content, spans, dimensions, and supported appearance are included in saved HTML/JSON.

## Detailed table behavior

Tables use prosemirror-tables for layout, cell selection, span normalization,
Tab/Shift+Tab navigation, copy/paste and history-aware operations. ngx-editra owns the
row/column resize handles, including pointer cursors, keyboard resizing and cancellation.
The Word-style insertion picker previews a grid up to 10 columns by 8 rows. Clicking a cell
or pressing Enter inserts immediately. Numeric rows/columns support larger sizes within the
configured limits, with validation before insertion. The contextual menu supplements toolbar commands.
Commands insert tables, add/remove rows/columns, delete tables, merge/split cells,
and toggle header rows/columns. The Table tools popover and right-click Table actions dialog
group commands into Rows, Columns, Cells, and Size, with Delete table separated below.
The popover separates Structure, Appearance, and Dimensions into focused views and remembers
the selected view while moving between cells. Appearance provides cell fill, border style,
and line weight; Dimensions contains table width, minimum row height and reset-row-heights.
Cell text alignment uses the ordinary block alignment commands.

Column widths, spans, row heights, table appearance and backgrounds are document attributes.
Select a table cell and drag its column borders or any point along a row border to
resize; a guide and pixel readout preview the change, and release commits one history action.
Escape or pointer cancellation discards the preview. Widths are assigned to logical columns,
including cells with colspan/rowspan, rather than independently mutating table DOM.

Resize boundaries have no visible icon. Tab focuses a boundary with a visible focus indicator.
Focused column boundaries use Left/Right; row boundaries use Up/Down. Arrows adjust by 8 px;
Shift+Arrow adjusts by 1 px. Boundaries preserve keyboard focus during updates and are inactive
in read-only/disabled editors. Row heights are minimums: content can require taller rows.
Grip dimensions are bounded to 24–2000 px for rows and 48–4096 px for columns.
Table and cell borders use consistent line settings and #b8c2d0 colour. The default
line weight is 1 px; the line-weight control accepts supported values up to 8 px.
Solid, dashed, dotted, double, and none styles apply consistently to table presentation,
including exported HTML. Inspect the current table's controls when editing its appearance.

AutoFit to page removes fixed column widths. Distribute columns preserves the current rendered
table width and gives logical columns equal widths. Percentage width edits remove fixed widths
so the percentage takes effect. Row heights and cell styles are retained by AutoFit.
Table overflow is horizontal. Malformed imports are repaired with fixTables.
Insertion defaults to 3×3, bounded by config.table.maxRows/maxColumns (50/20 defaults).

Automated tests cover row/column pointer and keyboard resizing, cancellation, isolated undo,
save/reload, merged-cell dimensions, equal columns, AutoFit, quick insertion, shading and validation.
Broader native clipboard and cross-browser/manual accessibility coverage remains release work.

Choose a border colour in the Insert table picker, or change it later under **Table tools ? Appearance ? Border colour**. The colour applies to the whole table and its cell borders, and is preserved in HTML, JSON, the viewer, and email export.

Table borders default to black (`#000000`). Choosing **Automatic** in the border-colour palette restores black.
