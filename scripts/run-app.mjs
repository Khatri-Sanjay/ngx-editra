import { spawn } from 'node:child_process';
import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { delimiter, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	assertPreviewPortsAvailable,
	canReuseDependencies,
	dependencyKey,
	hashDirectory,
} from './app-workspace.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const [action, app, ...flags] = process.argv.slice(2);
if (
	!['build', 'serve', 'prepare', 'serve-built', 'clean-cache'].includes(action) ||
	!['documentation', 'playground'].includes(app)
)
	throw new Error(
		'Usage: node scripts/run-app.mjs build|serve|prepare|serve-built|clean-cache documentation|playground',
	);
if (action === 'serve') {
	const portIndex = flags.indexOf('--port');
	const port =
		portIndex >= 0
			? flags[portIndex + 1]
			: (flags.find((flag) => flag.startsWith('--port='))?.slice(7) ??
				(app === 'playground' ? '4200' : '4300'));
	await assertPreviewPortsAvailable([{ name: app, port }]);
	if (portIndex < 0 && !flags.some((flag) => flag.startsWith('--port=')))
		flags.push('--port', port);
}
let local = {};
try {
	local = JSON.parse(await readFile(resolve(root, 'release.local.json'), 'utf8'));
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}
const node =
	process.env.EDITRA_NODE24 ??
	local.node24 ??
	(process.versions.node.startsWith('24.') ? process.execPath : undefined);
if (!node)
	throw new Error('The websites use Node 24. Set EDITRA_NODE24 or node24 in release.local.json.');
await access(node);
const npm =
	process.env.EDITRA_NPM24_CLI ??
	resolve(root, 'artifacts/toolchains/npm24/node_modules/npm/bin/npm-cli.js');
function run(executable, args, cwd = root) {
	return new Promise((resolveResult, reject) => {
		const child = spawn(executable, args, {
			cwd,
			stdio: 'inherit',
			windowsHide: true,
			env: { ...process.env, PATH: dirname(executable) + delimiter + process.env.PATH },
		});
		child.once('error', reject);
		child.once('exit', (code) =>
			code === 0 ? resolveResult() : reject(new Error(`${app} ${action} failed (${code})`)),
		);
	});
}
if (action === 'serve-built') {
	await run(node, [resolve(root, 'dist', app, 'server/server.mjs')]);
	process.exit(0);
}
if (action === 'clean-cache') {
	await run(
		node,
		[resolve(root, 'apps', app, 'node_modules/@angular/cli/bin/ng.js'), 'cache', 'clean'],
		resolve(root, 'apps', app),
	);
	process.exit(0);
}
try {
	await access(npm);
} catch {
	const bootstrapNpm =
		process.env.npm_execpath ??
		resolve(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js');
	await mkdir(resolve(root, 'artifacts/toolchains/npm24'), { recursive: true });
	await run(process.execPath, [
		bootstrapNpm,
		'install',
		'--prefix',
		resolve(root, 'artifacts/toolchains/npm24'),
		'npm@11.6.2',
		'--ignore-scripts',
		'--no-audit',
		'--no-fund',
	]);
}
const cwd = resolve(root, 'apps', app);
await access(resolve(root, 'dist/ngx-editra/package.json')).catch(() => {
	throw new Error('Build the library first: npm run build');
});
if (!flags.includes('--prepared')) {
	const dependencies = await dependencyKey(cwd);
	const library = await hashDirectory(resolve(root, 'dist/ngx-editra'));
	const stamp = resolve(cwd, 'node_modules/.editra-prepared.json');
	const reuse = await canReuseDependencies(cwd, dependencies);
	if (!reuse) {
		try {
			await run(
				node,
				[npm, 'ci', '--ignore-scripts', '--install-links', '--no-audit', '--no-fund'],
				cwd,
			);
		} catch (error) {
			throw new Error(
				`${error.message}. Stop running ${app} previews before refreshing dependencies; Windows may lock Sass files. Then run the command again.`,
				{ cause: error },
			);
		}
	} else {
		console.log(`${app}: reusing installed dependencies.`);
	}
	let previous = {};
	try {
		previous = JSON.parse(await readFile(stamp, 'utf8'));
	} catch {
		/* First preparation. */
	}
	const installed = resolve(cwd, 'node_modules/ngx-editra');
	const hasLibrary = await access(resolve(installed, 'package.json')).then(
		() => true,
		() => false,
	);
	if (reuse && (previous.library !== library || !hasLibrary)) {
		// Only replace this app's local package copy, never the dependency tree or toolchain.
		if (!installed.startsWith(resolve(root, 'apps') + sep))
			throw new Error('Local package path is outside the workspace apps directory.');
		await rm(installed, { recursive: true, force: true });
		await cp(resolve(root, 'dist/ngx-editra'), installed, { recursive: true });
		console.log(`${app}: refreshed the compiled ngx-editra package.`);
	}
	await writeFile(stamp, JSON.stringify({ dependencies, library }) + '\n');
}
if (action !== 'prepare')
	await run(
		node,
		[
			resolve(cwd, 'node_modules/@angular/cli/bin/ng.js'),
			action,
			app,
			...flags.filter((flag) => flag !== '--prepared'),
		],
		cwd,
	);
