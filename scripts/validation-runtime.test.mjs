import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dirname } from 'node:path';
import { validationRuntime } from './validation-runtime.mjs';

const local = {
	node20: '/tools/node20/node',
	npm10: '/tools/npm10/npm-cli.js',
	browser: '/tools/edge',
};

test('validation from Node 24 selects the configured compiler, npm and browser', () => {
	const result = validationRuntime(
		local,
		{ npm_execpath: '/tools/npm11/npm-cli.js', Path: '/existing' },
		{ major: 24, executable: '/tools/node24/node' },
		'/repo',
	);
	assert.equal(result.node, local.node20);
	assert.equal(result.npm, local.npm10);
	assert.equal(result.env.npm_execpath, local.npm10);
	assert.equal(result.env.CHROME_BIN, local.browser);
	assert.equal(result.env.EDITRA_BROWSER, local.browser);
	assert.equal(result.env.EDITRA_NODE24, '/tools/node24/node');
	assert.ok(result.env.PATH.startsWith(dirname(local.node20)));
	assert.equal(Object.keys(result.env).filter((key) => key.toLowerCase() === 'path').length, 1);
});

test('CI uses its Node 20/npm 10 and explicit browser without a local config', () => {
	const result = validationRuntime(
		{},
		{ npm_execpath: '/ci/npm-cli.js', CHROME_BIN: '/ci/chrome', EDITRA_NODE24: '/ci/node24' },
		{ major: 20, executable: '/ci/node20' },
		'/repo',
	);
	assert.equal(result.node, '/ci/node20');
	assert.equal(result.npm, '/ci/npm-cli.js');
	assert.equal(result.env.CHROME_BIN, '/ci/chrome');
	assert.equal(result.env.EDITRA_NODE24, '/ci/node24');
});

test('explicit toolchain settings override local paths', () => {
	const result = validationRuntime(
		local,
		{
			EDITRA_NODE20: '/custom/node',
			EDITRA_NPM_CLI: '/custom/npm',
			EDITRA_BROWSER: '/custom/browser',
		},
		{ major: 24, executable: '/node24' },
		'/repo',
	);
	assert.equal(result.node, '/custom/node');
	assert.equal(result.npm, '/custom/npm');
	assert.equal(result.env.CHROME_BIN, '/custom/browser');
});

test('a missing Node 20 configuration stops validation before using Node 24', () => {
	assert.throws(
		() => validationRuntime({}, {}, { major: 24, executable: '/node24' }, '/repo'),
		/Configure Node 20/,
	);
});
