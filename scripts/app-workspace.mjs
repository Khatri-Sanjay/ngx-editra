import { createHash } from 'node:crypto';
import { access, readFile, readdir } from 'node:fs/promises';
import { createConnection } from 'node:net';
import { resolve } from 'node:path';

export async function hashDirectory(directory) {
	const hash = createHash('sha256');
	async function visit(path) {
		const entries = await readdir(path, { withFileTypes: true });
		entries.sort((a, b) => a.name.localeCompare(b.name));
		for (const entry of entries) {
			hash.update(entry.name + '\0');
			const child = resolve(path, entry.name);
			if (entry.isDirectory()) await visit(child);
			else if (entry.isFile()) hash.update(await readFile(child));
		}
	}
	await visit(directory);
	return hash.digest('hex');
}

export async function dependencyKey(directory) {
	const hash = createHash('sha256').update('node24-install-links-v1\0');
	for (const name of ['package.json', 'package-lock.json']) {
		hash.update(name + '\0');
		hash.update(await readFile(resolve(directory, name)));
	}
	return hash.digest('hex');
}

export async function canReuseDependencies(directory, key) {
	try {
		const state = JSON.parse(
			await readFile(resolve(directory, 'node_modules/.editra-prepared.json'), 'utf8'),
		);
		await access(resolve(directory, 'node_modules/@angular/cli/bin/ng.js'));
		await access(resolve(directory, 'node_modules/@angular/core/package.json'));
		return state.dependencies === key;
	} catch {
		return false;
	}
}

export async function assertPreviewPortsAvailable(previews) {
	const ports = previews.map(({ port }) => Number(port));
	if (ports.some((port) => !Number.isInteger(port) || port < 1 || port > 65535))
		throw new Error('Preview ports must be integers between 1 and 65535.');
	if (new Set(ports).size !== ports.length)
		throw new Error('Playground and documentation need different ports.');
	for (const [index, preview] of previews.entries()) {
		const results = await Promise.allSettled(
			['127.0.0.1', '::1'].map(
				(host) =>
					new Promise((resolveResult) => {
						const socket = createConnection({ host, port: ports[index] });
						const finish = (busy) => {
							socket.destroy();
							resolveResult(busy);
						};
						socket.once('connect', () => finish(true));
						socket.once('error', () => finish(false));
						socket.setTimeout(1000, () => finish(false));
					}),
			),
		);
		if (results.some((result) => result.status === 'fulfilled' && result.value))
			throw new Error(
				`${preview.name} port ${preview.port} is already in use. Stop the existing preview with Ctrl+C, or choose different PLAYGROUND_PORT and DOCS_PORT values. No dependencies were changed.`,
			);
	}
}
