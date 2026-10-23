import { readFile, writeFile, mkdir } from 'node:fs/promises';
import MarkdownIt from 'markdown-it';
import { libraryGuides } from './library-docs.mjs';
import { format, resolveConfig } from 'prettier';
import { posix } from 'node:path';

const check = process.argv.includes('--check');
async function output(path, contents) {
	if (check) {
		const current = await readFile(path, 'utf8');
		if (current.replace(/\r\n/g, '\n') !== contents.replace(/\r\n/g, '\n'))
			throw new Error(`Stale generated documentation: ${path}. Run npm run docs:generate.`);
	} else await writeFile(path, contents);
}

// This snapshot is the SSR/offline fallback. Browser labels refresh npm latest independently.
const packageInfo = JSON.parse(await readFile('npm-package.json', 'utf8'));
const libraryPackage = JSON.parse(await readFile('packages/ngx-editra/package.json', 'utf8'));
packageInfo.developmentVersion = libraryPackage.version;
packageInfo.installCommand = `npm install ${packageInfo.name}${packageInfo.channel === 'latest' ? '' : `@${packageInfo.channel}`}`;
packageInfo.downloadsBadgeUrl = packageInfo.downloadsAvailable
	? `https://img.shields.io/npm/dm/${packageInfo.name}`
	: 'https://img.shields.io/badge/downloads-pending-lightgrey';
for (const path of [
	'apps/documentation/src/app/content/generated/package-info.ts',
	'apps/playground/src/app/shared/data/package-info.ts',
]) {
	await mkdir(posix.dirname(path), { recursive: true });
	await output(
		path,
		await format(
			`// Generated from npm-package.json and the library manifest. Run npm run package:sync after publication.\nexport const packageInfo = ${JSON.stringify(packageInfo)} as const;\n`,
			{ ...(await resolveConfig(path, { editorconfig: true })), parser: 'typescript' },
		),
	);
}

// Only repository-authored Markdown is compiled; raw HTML stays disabled.
const markdown = new MarkdownIt({ html: false });
// Angular templates own heading anchors on their block wrappers. Keeping IDs out
// of innerHTML avoids stripped attributes while retaining Angular sanitization.
markdown.renderer.rules.heading_open = (tokens, index) => `<${tokens[index].tag}>`;
const sources = [
	...libraryGuides.map(([slug, title, group, file]) => ({
		slug,
		title,
		group,
		source: `docs/${file}.md`,
	})),
	{ slug: 'changelog', title: 'Changelog', group: 'Reference', source: 'CHANGELOG.md' },
	{
		slug: 'security-reporting',
		title: 'Report a vulnerability',
		group: 'Reference',
		source: 'SECURITY.md',
	},
];
const slugs = new Map(sources.map(({ slug, source }) => [source, slug]));
const documents = [];
for (const source of sources) {
	const text = await readFile(source.source, 'utf8');
	const tokens = markdown.parse(text, {});
	const introduction = tokens.find(
		(token, index) => token.type === 'inline' && tokens[index - 1]?.type === 'paragraph_open',
	);
	const summary = introduction?.children?.map((token) => token.content).join('') ?? source.title;
	const readingMinutes = Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
	const headings = [];
	const used = new Map();
	for (let index = 0; index < tokens.length; index++) {
		const token = tokens[index];
		if (token.type === 'heading_open') {
			const label = tokens[index + 1]?.content ?? source.title;
			const base = label
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '');
			const count = used.get(base) ?? 0;
			used.set(base, count + 1);
			const id = count ? `${base}-${count}` : base;
			token.attrSet('id', id);
			if (token.tag !== 'h1') headings.push({ id, label });
		}
		for (const child of token.children ?? []) {
			if (child.type !== 'link_open') continue;
			const href = child.attrGet('href');
			const filename = href?.split('#')[0];
			const target =
				filename && !/^(?:[a-z]+:|\/)/iu.test(filename)
					? posix.normalize(posix.join(posix.dirname(source.source), filename))
					: null;
			const slug = target && slugs.get(target);
			if (slug)
				child.attrSet(
					'href',
					`/guides/${slug}${href.includes('#') ? '#' + href.split('#')[1] : ''}`,
				);
		}
	}
	const blocks = [];
	for (let index = 0; index < tokens.length; index++) {
		const start = index;
		const token = tokens[start];
		if (token.nesting === 1) {
			while (index + 1 < tokens.length) {
				index++;
				if (tokens[index].nesting === -1 && tokens[index].level === token.level) break;
			}
		}
		blocks.push({
			...(['fence', 'code_block'].includes(token.type)
				? { code: token.content, language: token.info.trim().split(/\s+/)[0] || 'text' }
				: {}),
			html: markdown.renderer.render(tokens.slice(start, index + 1), markdown.options, {}),
			id: token.type === 'heading_open' ? token.attrGet('id') : '',
			kind:
				token.type === 'table_open'
					? 'table'
					: ['fence', 'code_block'].includes(token.type)
						? 'code'
						: 'content',
		});
	}
	documents.push({
		...source,
		summary,
		readingMinutes,
		html: markdown.renderer.render(tokens, markdown.options, {}),
		headings,
		blocks,
		search: text.replace(/[`#*]/g, '').toLowerCase(),
	});
}
await mkdir('apps/documentation/src/app/content/generated', { recursive: true });
const generatedPath = 'apps/documentation/src/app/content/generated/guides.ts';
await output(
	generatedPath,
	await format(
		`// Generated from repository Markdown by scripts/generate-documentation.mjs.\nimport type { Guide } from '../../shared/models/guide';\nexport const guides: readonly Guide[] = ${JSON.stringify(documents, null, '\t')};\n`,
		{ ...(await resolveConfig(generatedPath, { editorconfig: true })), parser: 'typescript' },
	),
);
const navigationPath = 'apps/documentation/src/app/content/generated/navigation.ts';
const navigation = documents.map(({ slug, title, group, summary, search }) => ({
	slug,
	title,
	group,
	summary,
	search,
}));
await output(
	navigationPath,
	await format(
		`// Generated navigation/search index; full articles load with the guide route.\nimport type { GuideNavigation } from '../../shared/models/guide';\nexport const guideNavigation: readonly GuideNavigation[] = ${JSON.stringify(navigation)};\n`,
		{ ...(await resolveConfig(navigationPath, { editorconfig: true })), parser: 'typescript' },
	),
);
await output(
	'apps/documentation/prerender-routes.txt',
	['/', '/examples', ...documents.map(({ slug }) => `/guides/${slug}`)].join('\n') + '\n',
);
console.log(`Generated ${documents.length} documentation pages and prerender routes.`);
