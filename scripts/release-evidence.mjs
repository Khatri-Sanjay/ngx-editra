import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { compatibilityMatrix } from './compatibility-matrix.mjs';

const roots = [
	'packages/ngx-editra',
	'scripts',
	'docs',
	'.github',
	'e2e',
	'apps/playground',
	'apps/documentation',
	'apps/compatibility',
];
const rootFiles = [
	'security-audit-baseline.json',
	'release.config.example.json',
	'npm-package.json',
	'package.json',
	'package-lock.json',
	'angular.json',
	'tsconfig.json',
	'eslint.config.cjs',
	'.nvmrc',
	'.prettierrc.json',
	'.prettierignore',
	'.editorconfig',
	'.gitignore',
	'playwright.config.ts',
	'playwright.docs.config.ts',
	'README.md',
	'ARCHITECTURE.md',
	'CHANGELOG.md',
	'CONTRIBUTING.md',
	'PROGRESS.md',
	'SECURITY.md',
	'LICENSE',
];
const ignored = new Set(['node_modules', 'dist', '.angular', 'test-results']);
export const requiredChecks = [
	'docs:check',
	'format:check',
	'build',
	'lint',
	'test:architecture',
	'test:maintenance',
	'audit:dependencies',
	'typecheck',
	'test:ci',
	'test:ssr',
	'pack',
	'build:playground',
	'build:docs',
	'test:e2e',
	'test:docs',
	'test:performance',
];

/** Hash release inputs; consumer manifests contain generated archive paths. */
export async function sourceFingerprint(root = '.') {
	const files = [...rootFiles];
	async function walk(directory) {
		for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
			if (ignored.has(entry.name) || entry.isSymbolicLink()) continue;
			const path = `${directory}/${entry.name}`;
			if (entry.isDirectory()) await walk(path);
			else files.push(path);
		}
	}
	for (const directory of roots) await walk(directory);
	const hash = createHash('sha256');
	for (const path of files.sort()) {
		hash.update(path + '\0');
		const contents = await readFile(join(root, path));
		if (path.startsWith('apps/compatibility/') && path.endsWith('/package.json')) {
			const pkg = JSON.parse(contents.toString('utf8'));
			if (pkg.dependencies) delete pkg.dependencies['ngx-editra'];
			hash.update(JSON.stringify(pkg));
		} else hash.update(contents);
		hash.update('\0');
	}
	return hash.digest('hex');
}

export async function archiveInfo() {
	const pkg = JSON.parse(await readFile('packages/ngx-editra/package.json', 'utf8'));
	const archive = `artifacts/${pkg.name}-${pkg.version}.tgz`;
	return {
		archive,
		archiveSha256: createHash('sha256')
			.update(await readFile(archive))
			.digest('hex'),
	};
}

export function assertReleaseEvidence(
	report,
	manifest,
	currentSource,
	currentArchive,
	compatibility = true,
) {
	if (
		report.status !== 'passed' ||
		!report.steps?.length ||
		report.steps.some((step) => step.exitCode !== 0)
	)
		throw new Error('Validation is incomplete or failed');
	for (const name of [...requiredChecks, ...(compatibility ? ['test:compatibility'] : [])]) {
		if (!report.steps.some((step) => step.name === name && step.exitCode === 0))
			throw new Error(`Missing required validation step: ${name}`);
	}
	if (report.sourceSha256 !== currentSource || manifest.sourceSha256 !== currentSource)
		throw new Error('Release evidence is stale: source inputs changed');
	if (manifest.archiveSha256 !== currentArchive || report.archiveSha256 !== currentArchive)
		throw new Error('Release evidence is stale: archive changed');
	if (compatibility) {
		for (const { angular, profile, version } of compatibilityMatrix) {
			const row = report.compatibility?.find(
				(item) => item.angular === angular && item.profile === profile,
			);
			if (
				!row ||
				Number(row.angularVersion?.split('.')[0]) !== angular ||
				(version && row.angularVersion !== version) ||
				row.archiveSha256 !== currentArchive ||
				row.sourceSha256 !== currentSource ||
				!row.install ||
				!row.build ||
				!row.browserFormsSsrHydration ||
				(angular === 22 && row.signalForms !== true) ||
				row.peerBypass !== false ||
				(angular === 22 && profile === 'current' && row.productionAudit !== true)
			)
				throw new Error(`Missing matching passing Angular ${angular} ${profile} evidence`);
		}
	}
}
