# Images

Add an image that is already hosted at an accessible HTTPS URL. The library inserts and edits image content; it does not upload files.

## Insert your first image

1. Place the caret where the image should appear and open the image tool.
2. Enter the image URL, add meaningful alternative text, and apply. A public image URL should return an image, not a website page.
3. Select the inserted image to open its contextual tools. Reopen the image dialog to update alternative text and, if useful, add a caption.
4. Drag the corner handle to resize, or focus the handle and use arrow keys. Save the HTML form value to retain the result.

Use Add content beside image for an independent text column next to the image. See [columns](LAYOUT.md). For a smaller display without manual pixel sizing, use automatic sizing and the available content-width controls.

## Image settings and behavior

Images are URL-only block nodes. The dialog supports HTTPS URL, alternative text, caption,
width/height, alignment, border, radius, spacing, wrapping and aspect-ratio preservation.
Width and height start blank (Auto). With both blank, images use their natural size,
limited to the available content width. Choose Full content width to span the content area
responsively, or enter pixel dimensions for a custom size. Left/centre/right alignment
positions the media itself; captions wrap within its width.
Select an image then reopen the dialog to edit/replace it; Delete selection removes it.
Pointer handles and arrow keys resize it through one persisted ProseMirror transaction.
The corner handle follows the image, supports horizontal and vertical dragging, and starts
from its displayed size. Maintain aspect ratio enables proportional resizing; disabling it
allows independent width/height changes. Resizing full-width media switches it to a custom
size. Escape/pointer cancellation restores the original size. Shift+Arrow uses a 1 px step.
Dimensions survive HTML/JSON round trips and undo/redo. Copy media URL uses the browser clipboard.

`imageExtension()` from `ngx-editra` supplies interactive node views. The default
Angular adapter registers it; custom extension lists should register it explicitly.
`config.image.enabled = false` removes the node from the schema. `pasteUrls` optionally
converts plain supported image URLs into images. Files, base64 uploads and file pickers are absent.

A valid URL can still fail due to network errors, CORS/embedding policy, authentication or
hotlink protection. Node views announce image load failure. The library cannot reliably
distinguish all remote causes. Captions export as figure/figcaption; image attributes are constrained.
