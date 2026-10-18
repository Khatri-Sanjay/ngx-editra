import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { assertReleaseEvidence, requiredChecks } from './release-evidence.mjs';
import { angularPeerRange, compatibilityMatrix } from './compatibility-matrix.mjs';

const manifest = { sourceSha256: 'source', archiveSha256: 'archive' };
const report = () => ({
	status: 'passed',
	...manifest,
	steps: [...requiredChecks, 'test:compatibility'].map((name) => ({ name, exitCode: 0 })),
	compatibility: compatibilityMatrix.map(({ angular, profile, version }) => ({
		angular,
		profile,
		angularVersion: version ?? `${angular}.9.0`,
		...manifest,
		install: true,
		build: true,
		browserFormsSsrHydration: true,
		signalForms: angular === 22 ? true : null,
		productionAudit: angular === 22 && profile === 'current' ? true : null,
		peerBypass: false,
	})),
});

test('published Angular peers match the bounded compatibility policy', async () => {
	const pkg = JSON.parse(
		await readFile(new URL('../packages/ngx-editra/package.json', import.meta.url), 'utf8'),
	);
	for (const range of Object.values(pkg.peerDependencies)) assert.equal(range, angularPeerRange);
});

test('accepts matching complete release evidence', () => {
	assert.doesNotThrow(() => assertReleaseEvidence(report(), manifest, 'source', 'archive'));
});
test('rejects source or archive changes after validation', () => {
	assert.throws(() => assertReleaseEvidence(report(), manifest, 'changed', 'archive'), /source/);
	assert.throws(() => assertReleaseEvidence(report(), manifest, 'source', 'changed'), /archive/);
});
test('rejects failed, incomplete or mismatched consumer evidence', () => {
	const cases = [
		{ ...report(), status: 'running' },
		{ ...report(), steps: [{ exitCode: 1 }] },
		{ ...report(), compatibility: [] },
		{ ...report(), steps: [] },
	];
	for (const candidate of cases)
		assert.throws(() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'));
	const candidate = report();
	const maintained = candidate.compatibility.find(
		(row) => row.angular === 22 && row.profile === 'current',
	);
	maintained.productionAudit = false;
	assert.throws(
		() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'),
		/Angular 22/,
	);
	maintained.productionAudit = true;
	maintained.signalForms = false;
	assert.throws(
		() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'),
		/Angular 22/,
	);
	maintained.signalForms = true;
	candidate.compatibility[0].peerBypass = true;
	assert.throws(
		() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'),
		/Angular 17/,
	);
	candidate.compatibility[0].peerBypass = false;
	candidate.compatibility[0].archiveSha256 = 'previous-archive';
	assert.throws(
		() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'),
		/Angular 17/,
	);
});

test('requires every boundary profile and its exact Angular version', () => {
	const candidate = report();
	candidate.compatibility = candidate.compatibility.filter((row) => row.profile !== 'minimum');
	assert.throws(() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'), /minimum/);
	const wrongVersion = report();
	wrongVersion.compatibility.find((row) => row.profile === '22.1.2').angularVersion = '22.2.2';
	assert.throws(
		() => assertReleaseEvidence(wrongVersion, manifest, 'source', 'archive'),
		/22.1.2/,
	);
});
