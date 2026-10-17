import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { archiveInfo, sourceFingerprint } from './release-evidence.mjs';
import { libraryDocuments } from './library-docs.mjs';
import { posix } from 'node:path';
await mkdir('artifacts', { recursive: true });
const cli = process.env['npm_execpath'] ?? process.env['EDITRA_NPM_CLI'];
if (!cli) throw new Error('Run through npm run pack, or set EDITRA_NPM_CLI');
function run(args, capture = false) {
	return new Promise((resolve, reject) => {
		const child = spawn(process.execPath, [cli, ...args], {
			shell: false,
			stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
		});
		let output = '';
		if (capture) child.stdout.on('data', (data) => (output += data));
		child.once('error', reject);
		child.once('exit', (code) =>
			code === 0 ? resolve(output) : reject(new Error(`npm exit ${code}`)),
		);
	});
}
const sourceBefore = await sourceFingerprint();
await run(['run', 'build']);
const dry = JSON.parse(await run(['pack', './dist/ngx-editra', '--dry-run', '--json'], true));
const files = dry[0].files.map((file) => file.path);
for (const path of ['index.d.ts', 'styles/editor.scss', 'styles/content.scss', ...libraryDocuments])
	if (!files.includes(path)) throw new Error(`Missing package asset: ${path}`);
for (const path of files.filter((file) => file.endsWith('.md'))) {
	if (!libraryDocuments.includes(path))
		throw new Error(`Unexpected documentation in npm package: ${path}`);
	const contents = await readFile(`dist/ngx-editra/${path}`, 'utf8');
	for (const [, link] of contents.matchAll(/\]\(([^)]+)\)/g)) {
		if (/^(?:[a-z]+:|\/|#)/i.test(link)) continue;
		const target = link.split('#')[0];
		if (
			target.endsWith('.md') &&
			!files.includes(posix.normalize(posix.join(posix.dirname(path), target)))
		)
			throw new Error(`Missing documentation link target in ${path}: ${link}`);
	}
}
const pkg = JSON.parse(await readFile('dist/ngx-editra/package.json', 'utf8'));
for (const [source, target] of [
	['packages/ngx-editra/README.md', 'dist/ngx-editra/README.md'],
	['LICENSE', 'dist/ngx-editra/LICENSE'],
])
	if ((await readFile(source, 'utf8')) !== (await readFile(target, 'utf8')))
		throw new Error(`Package document differs from its canonical source: ${target}`);
if (pkg.name !== 'ngx-editra') throw new Error('Unexpected npm package name');
if (
	pkg.repository?.url !== 'git+https://github.com/Khatri-Sanjay/ngx-editra.git' ||
	pkg.homepage !== 'https://ngx-editra-docs.vercel.app' ||
	pkg.bugs?.url !== 'https://github.com/Khatri-Sanjay/ngx-editra/issues'
)
	throw new Error('Missing or unexpected project metadata links');
const rootExport = pkg.exports?.['.'];
if (!rootExport?.types || !rootExport?.default)
	throw new Error('Missing public ngx-editra entry point');
if (pkg.exports?.['./core'] || pkg.exports?.['./extensions'])
	throw new Error('Unexpected secondary entry points');
function verifyExportTargets(exports) {
	if (typeof exports === 'string') {
		if (!exports.startsWith('./') || !files.includes(exports.slice(2)))
			throw new Error(`Missing or non-local export target: ${exports}`);
	} else if (exports && typeof exports === 'object') {
		for (const value of Object.values(exports)) verifyExportTargets(value);
	}
}
verifyExportTargets(pkg.exports);
if (
	Object.values(pkg.dependencies).some(
		(value) => value.startsWith('file:') || value.startsWith('workspace:'),
	)
)
	throw new Error('Local distribution dependency');
if (dry[0].bundled.length) throw new Error('Unexpected bundled dependencies');
const declarations = await readFile('dist/ngx-editra/lib/public-api.d.ts', 'utf8');
for (const symbol of [
	'NgxEditraComponent',
	'NgxEditraViewerComponent',
	'EditraHtmlPipe',
	'EditraCodeCopyDirective',
	'EditraContentDirective',
	'exportEmail',
]) {
	if (!declarations.includes(` ${symbol} `))
		throw new Error(`Missing public declaration: ${symbol}`);
}
await writeFile('artifacts/package-report.json', JSON.stringify(dry, null, 2) + '\n');
console.log(
	await run(['pack', './dist/ngx-editra', '--pack-destination', 'artifacts', '--json'], true),
);
if ((await sourceFingerprint()) !== sourceBefore)
	throw new Error('Source changed during packing; rebuild the archive.');
await writeFile(
	'artifacts/package-manifest.json',
	JSON.stringify(
		{
			...(await archiveInfo()),
			sourceSha256: await sourceFingerprint(),
			packedAt: new Date().toISOString(),
			node: process.version,
		},
		null,
		2,
	) + '\n',
);
