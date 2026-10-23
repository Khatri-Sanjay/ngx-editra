# Progress

## Release status

ngx-editra has a published `1.0.0`; patch release `1.0.1`
is in preparation with the `latest` npm tag. The current development line receives fixes;
no historical maintenance branch or LTS promise is established. The remaining manual
and repository-setting checks below must be completed before the next publication.

## Implemented and covered

-   Standalone Angular editor with HTML-valued forms, disabled/read-only states, validation,
    reset, typed outputs, commands and document conversion.
-   Dedicated Angular 22 Signal Forms integration, real browser clipboard checks,
    forced-colour keyboard focus checks and repeated destruction/retention measurements.
-   ProseMirror document engine with schema-based HTML/JSON validation, bounded input,
    escaped serialization, ordered extensions and URL/media policies.
-   Text formatting, lists, code blocks, code copying, tables and resizing, media layout,
    columns, themes, keyboard controls, find/replace and Markdown conversion.
-   Saved content through the viewer, content directive and HTML pipe with automatic styles.
-   SSR/static rendering, an explicit editor hydration boundary, CSP nonce checks and
    isolated-request rendering tests.
-   Regression coverage for identical-value history resets, CSS divider imports, nested
    code/caption limits and rejected-configuration extension lifecycle.
-   Public-package playground and documentation app, including production browser tests.
-   Release metadata, vulnerability-reporting policy, workspace/consumer dependency checks,
    scheduled CI and reproducible validation with source/archive fingerprints.

## Current validation evidence

Run `npm run validate -- --compatibility` and then `npm run verify:evidence`.
The validator writes a new report for every run, including failures. Do not infer current
results from this document, earlier messages or a previous archive.

| Report                                  | Evidence                                                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| artifacts/release-validation.json       | Per-check status, actual library test count, production browser results, source fingerprint and archive SHA-256 |
| artifacts/package-manifest.json         | Packed archive hash and source fingerprint                                                                      |
| artifacts/compatibility-results.json    | Per-consumer Angular/Node versions, lockfile hash, fresh browser results and exact archive identity             |
| artifacts/angular-22-current-audit.json | Current maintained-consumer production dependency audit                                                         |
| artifacts/performance.json              | Core performance observations for the tested build                                                              |

The supported consumer matrix is Angular 17-22. A changed source tree or archive invalidates
release evidence. Installed candidate lockfiles are recorded separately; tracked consumer
source, declared tooling requirements and lockfiles remain part of the source fingerprint.
Remote CI success must be verified on the actual release revision.

## Remaining acceptance work

-   Test email exports in real Gmail, Outlook variants and Apple Mail inboxes; browser
    preview and serializer tests do not establish verified email-client rendering.
-   Verify remote CI, required checks/reviews and private vulnerability reporting in GitHub settings.
-   Complete manual screen-reader, high-contrast and independent application/security reviews.
-   Review the full lazy editor download cost and compatibility-consumer bundle warnings;
    the smaller initial playground shell does not establish a lightweight editor bundle.
-   Retain Angular 17-22 for 1.x while isolating the private Angular 17 compiler from the Angular 22 websites. Review tracked compiler advisories by the deadline in security-audit-baseline.json.
-   Verify npm ownership and release notes before explicitly publishing the exact validated archive.

## Documented limitations

CommonMark cannot retain every visual formatting attribute. Row heights are minimums;
content can require greater height. External media availability and embeddability require
real provider checks; deterministic tests mock network resources. Compatibility with a
legacy Angular version does not establish upstream security support for its runtime.

## Ownership and architecture

Root policies and docs/ are canonical. Only the consumer documents selected in scripts/library-docs.mjs are assembled into the npm distribution and public docs. The npm consumer README is maintained in packages/ngx-editra/README.md; the root
README covers workspace development and deployment. Applications import the public ngx-editra entry point. Core, extensions and Angular
adapters remain separated by enforced import boundaries. The engine owns document state;
browser views apply transactions. Extension serializers and providers are trusted code.
See ARCHITECTURE.md, docs/MAINTENANCE.md and docs/RELEASING.md for the maintained policies.
