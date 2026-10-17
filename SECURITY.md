# Reporting security vulnerabilities

Do not post exploit details, credentials or private documents in public issues.
Use [GitHub private vulnerability reporting](https://github.com/Khatri-Sanjay/ngx-editra/security/advisories/new)
when the repository offers that option. If private reporting is unavailable, open a
minimal issue requesting a private contact channel; do not include vulnerability details.
The maintainer must enable private reporting in the repository security settings before
advertising it as an active reporting channel. No response-time guarantee is established
for this library.

Include the affected version or source revision, Angular/browser versions, a minimal
reproduction with synthetic content, impact, and any suggested mitigation through the
private channel. Keep reports private while fixes and disclosure are coordinated.

The current development line receives fixes in this repository. Version 1.0.0 is
being prepared as the first stable release; no historical release lines or LTS
commitments are maintained. Angular compatibility
ranges describe integration testing, not security support for legacy Angular or Node.

See [content security policy](docs/SECURITY.md) for HTML validation, URL restrictions,
trusted extensions and server-side responsibilities.
