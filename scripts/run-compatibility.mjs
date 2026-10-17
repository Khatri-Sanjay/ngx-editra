import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { sourceFingerprint } from './release-evidence.mjs';
import { mkdir, writeFile, readFile, copyFile, cp } from 'node:fs/promises';
import { compatibilityMatrix } from './compatibility-matrix.mjs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = process.cwd(),
	results = [];
const node20 = process.env['EDITRA_NODE20'] ?? process.execPath;
const node24 = process.env['EDITRA_NODE24'] ?? process.execPath;
const npm = process.env['EDITRA_NPM_CLI'] ?? process.env['npm_execpath'];
const npm24 = process.env['EDITRA_NPM24_CLI'] ?? npm;
if (!npm) throw new Error('Set EDITRA_NPM_CLI to the npm CLI JavaScript entry point');
const majors = process.argv.slice(2).length
	? process.argv.slice(2).map(Number)
	: [17, 18, 19, 20, 21, 22];
if (majors.some((major) => ![17, 18, 19, 20, 21, 22].includes(major)))
	throw new Error('Supported consumer majors: 17, 18, 19, 20, 21, 22');
function run(node, args, cwd, env = {}) {
	return new Promise((resolveResult) => {
		const child = spawn(node, args, {
			cwd,
			env: { ...process.env, ...env },
			stdio: 'inherit',
			shell: false,
		});
		child.once('error', (error) => {
			console.error(error);
			resolveResult(false);
		});
		child.once('exit', (code) => resolveResult(code === 0));
	});
}
await mkdir(resolve(root, 'artifacts'), { recursive: true });
const pkg = JSON.parse(await readFile(resolve(root, 'packages/ngx-editra/package.json'), 'utf8'));
const archive = resolve(root, `artifacts/${pkg.name}-${pkg.version}.tgz`);
const archiveSha256 = createHash('sha256')
	.update(await readFile(archive))
	.digest('hex');
const manifest = JSON.parse(await readFile('artifacts/package-manifest.json', 'utf8'));
const sourceSha256 = await sourceFingerprint();
if (manifest.archiveSha256 !== archiveSha256 || manifest.sourceSha256 !== sourceSha256)
	throw new Error('Archive is stale or unverified. Run npm run pack before consumer validation.');
const execute = promisify(execFile);
// Preserve other consumer results only when they validate this exact archive.
try {
	const previous = JSON.parse(
		await readFile(resolve(root, 'artifacts/compatibility-results.json'), 'utf8'),
	);
	results.push(
		...previous.filter(
			(result) =>
				result.archiveSha256 === archiveSha256 &&
				result.sourceSha256 === sourceSha256 &&
				!majors.includes(result.angular),
		),
	);
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}
// Prevent npm caching an older same-version local package.
const snapshot = resolve(root, `artifacts/ngx-editra-${archiveSha256.slice(0, 12)}.tgz`);
await copyFile(archive, snapshot);
await writeFile('artifacts/compatibility-results.json', JSON.stringify(results, null, 2) + '\n');
async function verify({ angular: major, profile, version, typescript, zone }) {
	const id = `angular-${major}-${profile}`;
	const consumerNpm = major >= 21 ? npm24 : npm;
	const node = major >= 21 ? node24 : node20,
		template = resolve(root, `apps/compatibility/angular-${major}`),
		directory = profile === 'current' ? template : resolve(root, `artifacts/consumers/${id}`);
	if (profile !== 'current') {
		await cp(template, directory, {
			recursive: true,
			filter: (path) =>
				!/(^|[\\/])(node_modules|dist|\.angular|package-lock\.json)([\\/]|$)/.test(path),
		});
		const candidate = JSON.parse(await readFile(resolve(template, 'package.json'), 'utf8'));
		for (const dependencies of [candidate.dependencies, candidate.devDependencies])
			for (const name of Object.keys(dependencies))
				if (name.startsWith('@angular/') || name === '@angular-devkit/build-angular')
					dependencies[name] = version;
		candidate.devDependencies.typescript = typescript;
		candidate.dependencies['zone.js'] = zone;
		await writeFile(resolve(directory, 'package.json'), JSON.stringify(candidate, null, 2));
		// BootstrapContext was added after the initial Angular 18–20 releases.
		if (profile === 'minimum' && major <= 20)
			await copyFile(
				resolve(root, 'apps/compatibility/angular-17/src/main.server.ts'),
				resolve(directory, 'src/main.server.ts'),
			);
		if (profile === 'minimum' && major <= 21) {
			const server = resolve(directory, 'server.ts');
			await writeFile(
				server,
				(await readFile(server, 'utf8')).replace(
					/^\s*allowedHosts: \['localhost'\],\r?\n/m,
					'',
				),
			);
		}
	}
	console.log(`\n=== Angular ${major} ${profile} independent tarball consumer ===`);
	const result = {
		angular: major,
		profile,
		archiveSha256,
		sourceSha256,
		startedAt: new Date().toISOString(),
		node: (await execute(node, ['--version'])).stdout.trim(),
		install: false,
		build: false,
		browserFormsSsrHydration: false,
		productionAudit: major === 22 && profile === 'current' ? false : null,
		peerBypass: process.env['EDITRA_CANDIDATE_PEERS'] === '1',
	};
	results.push(result);
	const manifestPath = resolve(directory, 'package.json');
	const lockPath = resolve(directory, 'package-lock.json');
	const originalManifest = await readFile(manifestPath);
	const originalLock = profile === 'current' ? await readFile(lockPath) : null;
	try {
		// Candidate peer testing: publish metadata remains restricted until the matrix passes.
		result.install = await run(
			node,
			[
				consumerNpm,
				'install',
				snapshot,
				...(process.env['EDITRA_CANDIDATE_PEERS'] === '1' ? ['--legacy-peer-deps'] : []),
				'--workspaces=false',
				'--offline=false',
				'--cache',
				resolve(root, '.npm-cache'),
				'--no-audit',
				'--no-fund',
			],
			directory,
		);
		if (result.install)
			result.build = await run(
				node,
				['node_modules/@angular/cli/bin/ng.js', 'build', 'playground'],
				directory,
			);
		if (result.install) {
			const angularPackage = JSON.parse(
				await readFile(
					resolve(directory, 'node_modules/@angular/core/package.json'),
					'utf8',
				),
			);
			result.angularVersion = angularPackage.version;
			if (version && result.angularVersion !== version)
				throw new Error(`Expected Angular ${version}, installed ${result.angularVersion}`);
			result.consumerLockSha256 = createHash('sha256')
				.update(await readFile(resolve(directory, 'package-lock.json')))
				.digest('hex');
		}
		if (result.build)
			result.browserFormsSsrHydration = await run(
				node,
				[
					resolve(root, 'node_modules/@playwright/test/cli.js'),
					'test',
					'e2e/editor.spec.ts',
					'e2e/media.spec.ts',
					'e2e/media-layout.spec.ts',
					'e2e/word-tools.spec.ts',
					'e2e/rendering.spec.ts',
				],
				root,
				{
					EDITRA_SERVER_COMMAND: `"${node}" "${resolve(directory, 'dist/playground/server/server.mjs')}"`,
					EDITRA_E2E_REPORT: `artifacts/${id}-e2e.json`,
					EDITRA_TEST_OUTPUT: `test-results/${id}`,
					EDITRA_BASE_URL: `http://localhost:${4700 + major}`,
					PORT: String(4700 + major),
					EDITRA_SCREENSHOT_PREFIX: `${id}-word`,
				},
			);
		if (result.browserFormsSsrHydration) {
			const report = JSON.parse(await readFile(`artifacts/${id}-e2e.json`, 'utf8'));
			result.browserTests = report.stats;
			result.browserFormsSsrHydration =
				report.stats.expected > 0 &&
				!report.stats.unexpected &&
				!report.stats.flaky &&
				!report.stats.skipped &&
				Date.parse(report.stats.startTime) >= Date.parse(result.startedAt);
		}
		if (major === 22 && profile === 'current' && result.install) {
			let output;
			try {
				output = (
					await execute(
						node,
						[consumerNpm, 'audit', '--omit=dev', '--json', '--workspaces=false'],
						{
							cwd: directory,
							maxBuffer: 8 * 1024 * 1024,
						},
					)
				).stdout;
			} catch (error) {
				output = error.stdout || JSON.stringify({ error: error.message });
			}
			await writeFile('artifacts/angular-22-current-audit.json', output);
			const audit = JSON.parse(output);
			result.productionAudit = audit.metadata?.vulnerabilities?.total === 0;
		}
		result.finishedAt = new Date().toISOString();
		return result;
	} finally {
		await writeFile(manifestPath, originalManifest);
		if (originalLock) await writeFile(lockPath, originalLock);
	}
}
// Profiles sharing a major also share a server port; run each major's profiles sequentially.
for (let index = 0; index < majors.length; index += 2) {
	await Promise.all(
		majors.slice(index, index + 2).map(async (major) => {
			for (const row of compatibilityMatrix.filter((entry) => entry.angular === major))
				await verify(row);
		}),
	);
	await writeFile(
		resolve(root, 'artifacts/compatibility-results.json'),
		JSON.stringify(
			results.sort((a, b) => a.angular - b.angular),
			null,
			2,
		) + '\n',
	);
}
if (
	results.some(
		(result) =>
			!result.build ||
			!result.browserFormsSsrHydration ||
			(result.angular === 22 && result.profile === 'current' && !result.productionAudit),
	)
)
	process.exitCode = 1;
