import { readFile } from 'node:fs/promises';
const pkg = JSON.parse(await readFile('packages/ngx-editra/package.json', 'utf8'));
const report = JSON.parse(await readFile(`docs/acceptance/${pkg.version}.json`, 'utf8'));
if (report.version !== pkg.version)
	throw new Error('Acceptance record version does not match the package');
const required = [
	'gmail',
	'outlook',
	'apple-mail',
	'screen-reader',
	'high-contrast',
	'independent-review',
];
const failures = [];
for (const id of required) {
	const check = report.checks.find((item) => item.id === id);
	if (!check || !['pending', 'pass', 'fail'].includes(check.status))
		throw new Error(`Invalid acceptance record: ${id}`);
	if (
		check.status === 'pass' &&
		(!check.reviewer ||
			!check.clientVersion ||
			!check.evidence ||
			!Number.isFinite(Date.parse(check.testedAt)))
	)
		throw new Error(
			`Passing acceptance needs reviewer, client/version, date and evidence: ${id}`,
		);
	console.log(`${check.status}: ${id}`);
	if (check.status !== 'pass') failures.push(id);
}
console.log(
	`${required.length - failures.length}/${required.length} manual checks have passing evidence. See docs/acceptance/README.md.`,
);
if (process.argv.includes('--strict') && failures.length) process.exitCode = 1;
