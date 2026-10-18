import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:net';
import {
	assertPreviewPortsAvailable,
	canReuseDependencies,
	dependencyKey,
	hashDirectory,
} from './app-workspace.mjs';

test('dependency reuse requires a matching lockfile and installed Angular tools', async () => {
	const directory = await mkdtemp(join(tmpdir(), 'editra-app-'));
	await writeFile(join(directory, 'package.json'), '{}');
	await writeFile(join(directory, 'package-lock.json'), '{"lockfileVersion":3}');
	const key = await dependencyKey(directory);
	assert.equal(await canReuseDependencies(directory, key), false);
	await mkdir(join(directory, 'node_modules/@angular/cli/bin'), { recursive: true });
	await mkdir(join(directory, 'node_modules/@angular/core'), { recursive: true });
	await writeFile(join(directory, 'node_modules/@angular/cli/bin/ng.js'), '');
	await writeFile(join(directory, 'node_modules/@angular/core/package.json'), '{}');
	await writeFile(
		join(directory, 'node_modules/.editra-prepared.json'),
		JSON.stringify({ dependencies: key }),
	);
	assert.equal(await canReuseDependencies(directory, key), true);
	await writeFile(join(directory, 'package-lock.json'), '{"lockfileVersion":3,"changed":true}');
	assert.equal(await canReuseDependencies(directory, await dependencyKey(directory)), false);
});

test('compiled package content changes invalidate its copy without changing dependency keys', async () => {
	const directory = await mkdtemp(join(tmpdir(), 'editra-library-'));
	await writeFile(join(directory, 'package.json'), '{}');
	const before = await hashDirectory(directory);
	await writeFile(join(directory, 'editor.mjs'), 'export const version = 1;');
	const added = await hashDirectory(directory);
	assert.notEqual(added, before);
	await writeFile(join(directory, 'editor.mjs'), 'export const version = 2;');
	assert.notEqual(await hashDirectory(directory), added);
});

test('running previews are detected before dependency installation', async (context) => {
	const server = createServer();
	await new Promise((resolveResult) => server.listen(0, '127.0.0.1', resolveResult));
	context.after(() => new Promise((resolveResult) => server.close(resolveResult)));
	await assert.rejects(
		assertPreviewPortsAvailable([{ name: 'Playground', port: server.address().port }]),
		/already in use.*No dependencies were changed/,
	);
	await assert.rejects(assertPreviewPortsAvailable([{ port: 'invalid' }]), /integers/);
	await assert.rejects(
		assertPreviewPortsAvailable([{ port: 4200 }, { port: 4200 }]),
		/different ports/,
	);
});
