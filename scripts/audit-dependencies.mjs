import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const execute = promisify(execFile);
const baselinePath = 'security-audit-baseline.json';
const record = process.argv.includes('--record-baseline');
const npm = process.env.EDITRA_NPM_CLI ?? process.env.npm_execpath;
if (!npm) throw new Error('Run through npm run audit:dependencies');
let local = {};
try {
	local = JSON.parse(await readFile('release.local.json', 'utf8'));
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}
const modernNode =
	process.env.EDITRA_NODE24 ??
	local.node24 ??
	(process.versions.node.startsWith('24.') ? process.execPath : undefined);
const modernNpm =
	process.env.EDITRA_NPM24_CLI ??
	resolve('artifacts/toolchains/npm24/node_modules/npm/bin/npm-cli.js');
await mkdir('artifacts', { recursive: true });
let failed = false;
for (const target of ['workspace', 'playground', 'documentation']) {
	const modern = target !== 'workspace';
	const node = modern ? modernNode : process.execPath;
	const cli = modern ? modernNpm : npm;
	if (!node || !cli) throw new Error('Configure modern toolchains with npm run release');
	let output;
	try {
		output = (
			await execute(
				node,
				[
					cli,
					'audit',
					'--json',
					'--workspaces=false',
					'--fetch-retries=1',
					'--fetch-timeout=30000',
				],
				{
					cwd: modern ? resolve('apps', target) : process.cwd(),
					maxBuffer: 16 * 1024 * 1024,
					timeout: 120000,
				},
			)
		).stdout;
	} catch (error) {
		output = error.stdout;
	}
	const audit = JSON.parse(output || '{}');
	if (!audit.metadata?.vulnerabilities || audit.error)
		throw new Error(`Audit unavailable for ${target}`);
	await writeFile(`artifacts/audit-${target}.json`, JSON.stringify(audit, null, 2) + '\n');
	const findings = Object.entries(audit.vulnerabilities ?? {})
		.map(([name, item]) => ({
			name,
			severity: item.severity,
			range: item.range,
			advisories: item.via.map((v) => (typeof v === 'string' ? v : v.url)).sort(),
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
	if (!modern) {
		if (record)
			await writeFile(
				baselinePath,
				JSON.stringify(
					{
						scope: 'Private Angular 17 library compilation and tests only. Public apps use independent Angular 22 dependencies. These findings remain security debt, not resolved advisories.',
						reviewedAt: new Date().toISOString().slice(0, 10),
						nextReview: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
						findings,
					},
					null,
					'\t',
				) + '\n',
			);
		const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
		const known = new Set(baseline.findings.map((item) => JSON.stringify(item)));
		const unexpected = findings.filter((item) => !known.has(JSON.stringify(item)));
		if (unexpected.length || new Date().toISOString().slice(0, 10) > baseline.nextReview) {
			console.error(
				`Workspace audit needs review: ${unexpected.map((item) => item.name).join(', ') || 'baseline expired'}`,
			);
			failed = true;
		}
		console.log(
			`Workspace: ${findings.length} tracked legacy findings; ${unexpected.length} unreviewed. Review by ${baseline.nextReview}.`,
		);
	} else {
		const counts = audit.metadata.vulnerabilities;
		console.log(
			`${target}: ${counts.total} findings (${counts.high} high, ${counts.critical} critical).`,
		);
		// Modern website applications have no legacy framework exceptions.
		if (counts.total) failed = true;
	}
}
if (failed) process.exitCode = 1;
