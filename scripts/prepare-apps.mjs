import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

async function run(args) {
	await new Promise((resolve, reject) => {
		const child = spawn(process.execPath, args, {
			cwd: root,
			stdio: 'inherit',
			windowsHide: true,
		});
		child.once('error', reject);
		child.once('exit', (code) =>
			code === 0
				? resolve()
				: reject(new Error(`App preparation failed (${code}): ${args.join(' ')}`)),
		);
	});
}

// App type checking needs the compiled public API and each app's own Angular 22 packages.
// A root npm ci intentionally installs only the Angular 17 library workspace.
await run(['scripts/build-library.mjs']);
for (const app of ['playground', 'documentation'])
	await run(['scripts/run-app.mjs', 'prepare', app]);
