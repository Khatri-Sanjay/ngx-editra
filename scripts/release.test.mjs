import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./release.mjs', import.meta.url));
const invoke = (...args) =>
	spawnSync(process.execPath, [script, ...args], {
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'pipe'],
		env: {
			...process.env,
			EDITRA_NPM_CLI: fileURLToPath(new URL('./never-publish-test-npm.js', import.meta.url)),
		},
	});

test('release help explains preparation without publishing', () => {
	const result = invoke('--help');
	assert.equal(result.status, 0, result.stderr);
	assert.match(result.stdout, /never publish/);
});
test('publishing refuses noninteractive execution before running npm', () => {
	const result = invoke('--publish');
	assert.equal(result.status, 1);
	assert.match(result.stderr, /Publishing requires an interactive terminal/);
});
test('release has no flag to bypass the publishing confirmation', () => {
	const result = invoke('--publish', '--yes');
	assert.equal(result.status, 1);
	assert.match(result.stderr, /Use npm run release/);
});
