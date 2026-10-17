import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { libraryDocuments, libraryGuides } from './library-docs.mjs';

test('consumer documentation contains no workspace publication or deployment instructions', async () => {
	for (const file of libraryDocuments.filter((file) => file.endsWith('.md'))) {
		const source = file === 'README.md' ? 'packages/ngx-editra/README.md' : file;
		const content = await readFile(source, 'utf8');
		assert.doesNotMatch(
			content,
			/^#{1,6}\s+(?:Release process|Publish to npm|Deploy the websites)\b/im,
			source,
		);
		assert.doesNotMatch(
			content,
			/\]\([^)]*(?:RELEASING|PUBLISHING|DEPLOYMENT)\.md(?:#[^)]*)?\)/i,
			source,
		);
		assert.doesNotMatch(content, /npm run (?:release(?::publish)?|build:site)\b/, source);
	}
});

test('public library guides exclude workspace and release operations', () => {
	const internal = new Set([
		'DEPLOYMENT',
		'PUBLISHING',
		'RELEASING',
		'MAINTENANCE',
		'COMPATIBILITY_TESTING',
	]);
	for (const [, , , file] of libraryGuides)
		assert(!internal.has(file), `${file} is a maintainer guide`);
	for (const file of ['ARCHITECTURE.md', 'CONTRIBUTING.md', 'PROGRESS.md'])
		assert(!libraryDocuments.includes(file), `${file} must stay in the repository`);
});

test('npm documentation retains essential consumer guides and license', () => {
	for (const file of [
		'README.md',
		'LICENSE',
		'CHANGELOG.md',
		'SECURITY.md',
		'docs/INSTALLATION.md',
		'docs/API.md',
		'docs/ANGULAR_FORMS.md',
		'docs/CONTENT.md',
		'docs/EMAIL.md',
	])
		assert(libraryDocuments.includes(file), `Missing ${file}`);
	assert.equal(new Set(libraryDocuments).size, libraryDocuments.length);
});
