import { readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const path = new URL('../npm-package.json', import.meta.url);
const info = JSON.parse(await readFile(path, 'utf8'));
const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(info.name)}`, {
	signal: AbortSignal.timeout(30000),
});
if (!response.ok) throw new Error(`npm registry returned ${response.status}`);
const metadata = await response.json();
info.channel = 'latest';
const version = metadata['dist-tags']?.latest;
if (metadata.name !== info.name || !metadata.versions?.[version])
	throw new Error(`Missing published ${info.channel} release for ${info.name}`);
info.publishedVersion = version;
try {
	const downloads = await fetch(
		`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(info.name)}`,
		{
			signal: AbortSignal.timeout(15000),
		},
	);
	const stats = await downloads.json();
	info.downloadsAvailable = downloads.ok && typeof stats.downloads === 'number';
} catch {
	console.warn('Download statistics unavailable; retaining the previous badge state.');
}
await writeFile(path, JSON.stringify(info, null, '\t') + '\n');
const badge = info.downloadsAvailable
	? `https://img.shields.io/npm/dm/${info.name}`
	: 'https://img.shields.io/badge/downloads-pending-lightgrey';
for (const file of [
	'README.md',
	'packages/ngx-editra/README.md',
	'apps/documentation/README.md',
	'apps/playground/README.md',
	'docs/PACKAGE.md',
]) {
	const text = await readFile(file, 'utf8');
	await writeFile(
		file,
		text.replace(/(\[!\[npm downloads per month\]\()[^)]*(\)\]\()/g, `$1${badge}$2`),
	);
}
const generated = spawnSync(process.execPath, ['scripts/generate-documentation.mjs'], {
	stdio: 'inherit',
});
if (generated.status !== 0) process.exit(generated.status ?? 1);
console.log(
	`Package links now reference ${info.name}@${version} (${info.channel}). Nothing was published.`,
);
