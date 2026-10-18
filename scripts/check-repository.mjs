import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const info = JSON.parse(await readFile('npm-package.json', 'utf8'));
const repo = new URL(info.repositoryUrl).pathname.replace(/^\//, '').replace(/\/$/, '');
const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
async function get(path) {
	try {
		const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
			headers: {
				Accept: 'application/vnd.github+json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			signal: AbortSignal.timeout(20000),
		});
		return response.ok ? await response.json() : { unavailable: response.status };
	} catch {
		return { unavailable: 'network' };
	}
}
const repository = await get('');
const branch = repository.default_branch;
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const dirty = Boolean(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim());
const [protection, reporting, checks] = await Promise.all([
	branch
		? get(`/branches/${encodeURIComponent(branch)}/protection`)
		: { unavailable: 'unknown branch' },
	get('/private-vulnerability-reporting'),
	get(`/commits/${head}/check-runs`),
]);
const contexts = [
	...(protection.required_status_checks?.contexts ?? []),
	...(protection.required_status_checks?.checks ?? []).map((check) => check.context),
];
const runs = checks.check_runs ?? [];
const report = {
	checkedAt: new Date().toISOString(),
	repository: info.repositoryUrl,
	head,
	dirty,
	authenticated: Boolean(token),
	checks: {
		privateVulnerabilityReporting: reporting.enabled === true,
		requiredPackageCheck: contexts.some(
			(name) => name === 'package' || name.endsWith('/ package'),
		),
		pullRequestReview:
			(protection.required_pull_request_reviews?.required_approving_review_count ?? 0) >= 1,
		resolvedConversations: protection.required_conversation_resolution?.enabled === true,
		currentRevisionCI:
			!dirty &&
			runs.some(
				(run) =>
					run.name === 'package' &&
					run.status === 'completed' &&
					run.conclusion === 'success',
			),
	},
	unavailable: {
		repository: repository.unavailable,
		protection: protection.unavailable,
		reporting: reporting.unavailable,
		ci: checks.unavailable,
	},
};
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/repository-settings.json', JSON.stringify(report, null, 2) + '\n');
for (const [name, passed] of Object.entries(report.checks))
	console.log(`${passed ? 'Verified' : 'Unverified'}: ${name}`);
console.log(
	'Read-only check. Supply GH_TOKEN with repository administration read access for private settings.',
);
if (process.argv.includes('--strict') && Object.values(report.checks).some((value) => !value))
	process.exitCode = 1;
