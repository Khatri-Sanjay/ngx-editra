import { execFile, spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { validationRuntime } from './validation-runtime.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
let local = {};
try {
	local = JSON.parse(await readFile(new URL('../release.local.json', import.meta.url), 'utf8'));
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}
const { node, npm, env } = validationRuntime(
	local,
	process.env,
	{ executable: process.execPath, major: Number(process.versions.node.split('.')[0]) },
	root,
);
const execute = promisify(execFile);
for (const [args, expected] of [
	[['--version'], /^v20\./],
	[[npm, '--version'], /^10\./],
]) {
	const { stdout } = await execute(node, args, { cwd: root, env });
	if (!expected.test(stdout.trim()))
		throw new Error(
			`Validation requires Node 20/npm 10. Configured tool returned ${stdout.trim()}.`,
		);
}
console.log(`Validation toolchain: ${node}\nBrowser: ${env.CHROME_BIN ?? 'system default'}`);
process.exitCode = await new Promise((resolve, reject) => {
	const child = spawn(node, ['scripts/validate.mjs', ...process.argv.slice(2)], {
		cwd: root,
		env,
		shell: false,
		stdio: 'inherit',
	});
	child.once('error', reject);
	child.once('exit', (code) => resolve(code ?? 1));
});
