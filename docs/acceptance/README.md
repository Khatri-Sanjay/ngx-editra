# Manual release acceptance

This directory is workspace-only and is excluded from npm and public documentation.
Automated tests do not establish real inbox, assistive-technology or independent-review results.

Use the file matching the candidate version (`1.0.1.json`) to record each actual result with reviewer, exact client/OS/version,
ISO test date and a screenshot/report location. Keep private messages, account details
and customer content out of the repository. Use synthetic content from the playground.
Leave unperformed checks pending; a plan or browser preview is not passing evidence.

For email, export HTML and text from the playground and send them using your own
delivery provider. Check all listed client variants, reading order, dark mode, blocked
images, merged tables, long URLs/code, link destinations and plain text. Record differences
and fixes. No mail is sent by repository scripts.

For screen readers, exercise the toolbar by keyboard, edit content, open/close every
dialog, select table cells and colours, read saved content, and verify focus return.
Repeat with Windows High Contrast. Browser forced-colour tests are supplemental.

Run `npm run acceptance:check` for the current status or
`npm run acceptance:check -- --strict` to require complete passing evidence.
Verify GitHub settings and release-revision CI with `npm run repo:check -- --strict`.
These reports are separate from automated release validation; do not claim complete
manual acceptance while any entry remains pending.
