// Keep remote acceptance outside CI: it verifies the completed CI run itself.
export async function verifyStableRelease(version, run) {
	if (version.includes('-')) return;
	await run(['scripts/check-acceptance.mjs', '--strict']);
	await run(['scripts/check-repository.mjs', '--strict']);
}
