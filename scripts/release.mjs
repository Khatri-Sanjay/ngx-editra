import { spawn } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import { dirname, resolve, delimiter } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { verifyStableRelease } from './release-policy.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const flags = process.argv.slice(2);
const registry = 'https://registry.npmjs.org/';

async function main() {
	if (
		flags.length > 1 ||
		flags.some((flag) => !['--help', '--check', '--publish'].includes(flag))
	)
		throw new Error('Use npm run release, release:check, or release:publish.');
	if (flags.includes('--help')) {
		console.log(
			'release:check: check local toolchains without validation or publication.\nrelease: validate and prepare the archive; never publish.\nrelease:publish: verify the prepared archive, show a dry run, and ask before publishing.\nConfigure Node 20, Node 24 and a browser in release.local.json; see docs/PUBLISHING.md.',
		);
		return;
	}
	if (flags.includes('--publish') && (!process.stdin.isTTY || !process.stdout.isTTY))
		throw new Error('Publishing requires an interactive terminal. No package was published.');
	process.chdir(root);
	let local = {};
	try {
		local = JSON.parse(await readFile('release.local.json', 'utf8'));
	} catch (error) {
		if (error.code !== 'ENOENT') throw error;
	}
	const node20 =
		local.node20 ??
		process.env.EDITRA_NODE20 ??
		(process.versions.node.startsWith('20.') ? process.execPath : undefined);
	const node24 =
		local.node24 ??
		process.env.EDITRA_NODE24 ??
		(process.versions.node.startsWith('24.') ? process.execPath : undefined);
	const browser = local.browser ?? process.env.EDITRA_BROWSER ?? process.env.CHROME_BIN;
	if (!node20 || !node24 || !browser)
		throw new Error(
			'Set node20, node24 and browser in release.local.json. See release.config.example.json.',
		);
	const npm10 =
		process.env.EDITRA_NPM_CLI ??
		local.npm10 ??
		resolve(dirname(node20), 'node_modules/npm/bin/npm-cli.js');
	const npm24 = resolve(root, 'artifacts/toolchains/npm24/node_modules/npm/bin/npm-cli.js');
	const env = {
		...process.env,
		EDITRA_NODE20: node20,
		EDITRA_NODE24: node24,
		EDITRA_NPM_CLI: npm10,
		EDITRA_NPM24_CLI: npm24,
		npm_execpath: npm10,
		CHROME_BIN: browser,
		EDITRA_BROWSER: browser,
		PATH: dirname(node20) + delimiter + process.env.PATH,
	};
	async function run(executable, args, capture = false, allowFailure = false) {
		return new Promise((resolveResult, reject) => {
			const child = spawn(executable, args, {
				cwd: root,
				env,
				shell: false,
				stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
			});
			let output = '';
			if (capture) {
				child.stdout.on('data', (data) => {
					output += data;
				});
				child.stderr.on('data', (data) => {
					output += data;
				});
			}
			child.once('error', reject);
			child.once('exit', (code) =>
				code === 0 || allowFailure
					? resolveResult({ code, output: output.trim() })
					: reject(
							new Error(
								capture
									? output.trim()
									: `Command failed (${code}): ${args.join(' ')}`,
							),
						),
			);
		});
	}
	for (const path of [node20, node24, npm10, browser]) await access(path);
	for (const [executable, args, expected] of [
		[node20, ['--version'], /^v20\./],
		[node24, ['--version'], /^v24\./],
		[node20, [npm10, '--version'], /^10\./],
	]) {
		const { output } = await run(executable, args, true);
		if (!expected.test(output)) throw new Error(`Unexpected toolchain version: ${output}`);
		console.log(output);
	}
	if (flags.includes('--check')) {
		console.log('Release toolchains are configured. No package was published.');
		return;
	}
	const pkg = JSON.parse(await readFile('packages/ngx-editra/package.json', 'utf8'));
	const archive = `./artifacts/${pkg.name}-${pkg.version}.tgz`;
	const tag = pkg.publishConfig?.tag ?? (pkg.version.includes('-') ? 'next' : 'latest');
	if (pkg.version.includes('-') && tag === 'latest')
		throw new Error('Use the next tag for prereleases.');
	if (!flags.includes('--publish')) {
		await access('node_modules/@angular/cli/bin/ng.js').catch(() => {
			throw new Error(
				'Install dependencies with npm ci first. Stop dev servers before installation.',
			);
		});
		await run(node20, ['scripts/generate-documentation.mjs']);
		const evidence = await run(node20, ['scripts/verify-release.mjs'], true, true);
		if (evidence.code !== 0) {
			let modern = null;
			try {
				modern = JSON.parse(
					await readFile(resolve(dirname(npm24), '../package.json'), 'utf8'),
				);
			} catch {}
			if (modern?.version !== '11.6.2')
				await run(node20, [
					npm10,
					'install',
					'--prefix',
					'artifacts/toolchains/npm24',
					'npm@11.6.2',
					'--ignore-scripts',
					'--no-audit',
					'--no-fund',
				]);
			await run(node20, ['scripts/validate.mjs', '--compatibility']);
		} else console.log('Reusing validation for the unchanged source and archive.');
		await run(node20, ['scripts/verify-release.mjs']);
		await run(node20, [
			npm10,
			'publish',
			archive,
			'--access',
			'public',
			'--tag',
			tag,
			`--registry=${registry}`,
			'--dry-run',
		]);
		console.log(
			`\nPrepared ${pkg.name}@${pkg.version}. No package was published.\nNext: npm run release:publish`,
		);
		return;
	}
	await run(node20, ['scripts/verify-release.mjs']);
	await verifyStableRelease(pkg.version, (args) => run(node20, args));
	const account = await run(node20, [npm10, 'whoami', `--registry=${registry}`], true);
	const response = await fetch(
		`${registry}${encodeURIComponent(pkg.name)}/${encodeURIComponent(pkg.version)}`,
		{ signal: AbortSignal.timeout(15000) },
	);
	if (response.ok)
		throw new Error(
			`${pkg.name}@${pkg.version} is already published. Choose a new version and run npm run release.`,
		);
	if (response.status !== 404)
		throw new Error(`Cannot check npm version availability (${response.status}).`);
	await run(node20, [
		npm10,
		'publish',
		archive,
		'--access',
		'public',
		'--tag',
		tag,
		`--registry=${registry}`,
		'--dry-run',
	]);
	const manifest = JSON.parse(await readFile('artifacts/package-manifest.json', 'utf8'));
	console.log(
		`\nAccount: ${account.output}\nPackage: ${pkg.name}@${pkg.version}\nTag: ${tag}\nArchive: ${archive}\nSHA-256: ${manifest.archiveSha256}`,
	);
	const confirmation = `publish ${pkg.name}@${pkg.version}`;
	const prompt = createInterface({ input: process.stdin, output: process.stdout });
	let answer;
	try {
		answer = await prompt.question(`Type "${confirmation}" to publish: `);
	} finally {
		prompt.close();
	}
	if (answer.trim() !== confirmation) {
		console.log('Cancelled. No package was published.');
		return;
	}
	await run(node20, ['scripts/verify-release.mjs']);
	await verifyStableRelease(pkg.version, (args) => run(node20, args));
	await run(node20, [
		npm10,
		'publish',
		archive,
		'--access',
		'public',
		'--tag',
		tag,
		`--registry=${registry}`,
	]);
	console.log('Published successfully. Refresh website metadata with: npm run package:sync');
}

main().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
