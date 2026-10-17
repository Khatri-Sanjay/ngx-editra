# Maintenance policy

This is an alpha library. The current development line receives fixes; older source snapshots
do not have separate maintenance branches or an LTS promise. Breaking changes may still
occur before a stable release and must be recorded in CHANGELOG.md with migration notes.

## Ownership and reporting

The repository owner is [Khatri-Sanjay](https://github.com/Khatri-Sanjay).
Use [issues](https://github.com/Khatri-Sanjay/ngx-editra/issues) for reproducible bugs
and feature requests. Follow [security reporting](../SECURITY.md) for vulnerabilities.
No support-response SLA is promised. Maintainers should triage new reports weekly,
prioritize security/data-loss issues, and record deferred issues and their impact.

## Dependency and support boundaries

Dependabot checks the workspace, GitHub Actions and all six independent consumer projects
weekly. Consumer Angular majors stay fixed so the matrix keeps testing distinct versions.
TypeScript minor updates need manual review against each Angular compiler's supported range.
The local ngx-editra tarball is updated by the compatibility runner, not Dependabot.
Tracked consumer manifests do not depend on generated archives. The runner temporarily
installs a candidate, validates its real dependency graph, records the installed lockfile
hash, and restores the original manifest and lockfile even on failure. Dependency bots
can therefore resolve the consumer dependencies before ngx-editra is published.
Review update PRs through the complete release validation; never auto-merge major upgrades.

Angular 17 is the current oldest compiler/runtime baseline. Node 20/npm 10, TypeScript 5.4
and ESLint 8 remain the documented legacy compilation toolchain. This is a compatibility
constraint, not a claim that the tooling is maintained upstream. Do not use this baseline
to choose a production application's runtime; use its Angular version's supported tooling.

Before a stable release, decide whether to retain Angular 17-19 compatibility or raise the
minimum peer major. Raising it requires a documented breaking change, migrating the root
Angular/CLI/ng-packagr/TypeScript/lint toolchain together, updating runtime requirements,
and validating the new supported matrix. Retaining it requires tracking build-only audit
findings and keeping legacy compilation isolated from production consumers. Do not upgrade
the compiler alone while continuing to advertise untested older peers.

## Evidence and release controls

Run `npm run validate -- --compatibility` before a release. Validation writes a fresh
`artifacts/release-validation.json` automatically, including failures, runtime versions,
source fingerprint and archive SHA-256. `npm run verify:evidence` rejects incomplete or
stale evidence. Source changes after validation require a new validation run.

Static documentation describes test coverage rather than copying changing test totals.
Use the generated reports for current counts and the exact package tested. Compatibility
consumer tarball references are normalized in the source fingerprint. Tracked consumer
source, dependency declarations and lockfiles are included; installed candidate lockfile
hashes are also recorded separately in each result.

GitHub Actions must pass on the release revision. In repository settings, require the
`Validate and prepare package / package` check before merging, require review and resolved
conversations, restrict direct release-branch pushes, and enable private vulnerability
reporting. Repository settings cannot be established by committing YAML alone; verify
them using an authenticated owner account. Publishing remains an explicit owner action.
