# Maintenance policy

Version 1.0.0 is being prepared as the first stable line. After publication, bug and
security fixes target the current stable line; older snapshots have no separate
maintenance branch or LTS promise. Stable releases follow semantic versioning:
breaking public API changes require a major version and migration notes. Prereleases
use `next`; stable releases use `latest`. Do not describe an unpublished version as published.

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

Angular 17-22 compatibility is retained for 1.x. The private root compiler/test environment
uses Angular 17, Node 20/npm 10 and TypeScript 5.4 to preserve the oldest compiler baseline.
Its legacy dependencies are development dependencies and are not deployed as a website
runtime. The playground and documentation have independent Angular 22, Node 24/npm 11,
TypeScript 6 toolchains, lockfiles and application builders. `scripts/run-app.mjs`
installs their dependencies and copies the compiled public library with npm `--install-links`.
It does not resolve Angular from the root compiler environment.

`npm run audit:dependencies` audits the entire dependency tree of both public apps and
requires zero findings. Known root-toolchain advisories are recorded exactly by package,
range, severity and advisory URL in `security-audit-baseline.json`; these remain security
debt. New/changed advisories or an expired review deadline fail validation. Review each
finding before explicitly refreshing the baseline with `--record-baseline`. Never use
`npm audit fix --force` to upgrade the library compiler across Angular majors.
Use trusted source/dependencies and isolated build workers; do not expose legacy test
servers or process untrusted build input. Compatibility with an old Angular version
does not imply upstream framework security support.

Raising the minimum peer major requires a documented breaking change, migrating the
library compiler/ng-packagr/TypeScript toolchain together, and validating the new matrix.

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

Run `npm run repo:check` to record read-only verification in
`artifacts/repository-settings.json`; `--strict` fails on missing or unverified checks.
Provide `GH_TOKEN` through the environment, never committed files or command arguments,
when GitHub requires authentication. A green local run does not prove remote settings
or CI on an uncommitted revision. Real inbox, assistive-technology and independent-review
evidence is maintained separately in [manual acceptance](acceptance/README.md).

The Angular 22 compatibility fixture intentionally loads the complete editor for integration tests. Its initial bundle warns at 500 kB and fails at 1.1 MB, allowing the measured Angular 22.0.0 framework output (about 1.054 MB) while retaining a fixed upper bound. This fixture budget is separate from the public apps and is not a library download-size claim.

`npm run lint` prepares the compiled library and both independent website dependencies before type-aware ESLint runs. This is required on a fresh checkout: root `npm ci` installs only the Angular 17 library workspace. Website preparation selects Node 24/npm 11 and reuses matching installs; keep those toolchains configured for local lint and CI. Do not run the ESLint binary directly against unprepared apps or disable unsafe-type rules to hide missing imports.
