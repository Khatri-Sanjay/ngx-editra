import { spawn } from 'node:child_process';
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { libraryDocuments } from './library-docs.mjs';

const root = new URL('../', import.meta.url);
const distribution = new URL('dist/ngx-editra/', root);

await new Promise((resolve, reject) => {
	const child = spawn(
		process.execPath,
		[
			fileURLToPath(new URL('node_modules/@angular/cli/bin/ng.js', root)),
			'build',
			'ngx-editra',
			...process.argv.slice(2),
		],
		{ cwd: fileURLToPath(root), shell: false, stdio: 'inherit' },
	);
	child.once('error', reject);
	child.once('exit', (code, signal) =>
		code === 0 ? resolve() : reject(new Error(`Library build failed: ${signal ?? code}`)),
	);
});

// Ship only consumer documentation. Maintainer guides stay in the source repository.
for (const path of libraryDocuments) {
	const destination = new URL(path, distribution);
	await mkdir(new URL('./', destination), { recursive: true });
	await copyFile(
		new URL(path === 'README.md' ? 'packages/ngx-editra/README.md' : path, root),
		destination,
	);
}
