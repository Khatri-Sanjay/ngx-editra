import { delimiter, dirname, resolve } from 'node:path';

export function validationRuntime(local, environment, runtime, root) {
	const node =
		environment.EDITRA_NODE20 ??
		local.node20 ??
		(runtime.major === 20 ? runtime.executable : undefined);
	if (!node)
		throw new Error(
			'Configure Node 20 in release.local.json or EDITRA_NODE20. See docs/PUBLISHING.md.',
		);
	const npm =
		environment.EDITRA_NPM_CLI ??
		local.npm10 ??
		(runtime.major === 20 ? environment.npm_execpath : undefined) ??
		resolve(dirname(node), 'node_modules/npm/bin/npm-cli.js');
	const browser = environment.EDITRA_BROWSER ?? environment.CHROME_BIN ?? local.browser;
	const node24 =
		environment.EDITRA_NODE24 ??
		local.node24 ??
		(runtime.major === 24 ? runtime.executable : undefined);
	// Windows treats Path and PATH as the same key. Keep only one spelling.
	const env = Object.fromEntries(
		Object.entries(environment).filter(([key]) => key.toLowerCase() !== 'path'),
	);
	Object.assign(env, {
		PATH: dirname(node) + delimiter + (environment.PATH ?? environment.Path ?? ''),
		EDITRA_NODE20: node,
		EDITRA_NPM_CLI: npm,
		npm_execpath: npm,
		EDITRA_NPM24_CLI:
			environment.EDITRA_NPM24_CLI ??
			resolve(root, 'artifacts/toolchains/npm24/node_modules/npm/bin/npm-cli.js'),
	});
	if (node24) env.EDITRA_NODE24 = node24;
	if (browser) {
		env.CHROME_BIN = browser;
		env.EDITRA_BROWSER = browser;
	}
	return { node, npm, env };
}
