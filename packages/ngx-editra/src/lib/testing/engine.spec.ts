import {
	EditraEngine,
	orderExtensions,
	safeUrl,
	resolveVideo,
	parseJSON,
	serializeHTML,
	markStatus,
	normalizeConfig,
	tableAttribute,
	resizeTableRow,
	resizeTableColumns,
	attributes,
} from '../core/public-api';
import { TextSelection } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { undoDepth } from 'prosemirror-history';
import { importMarkdown, exportMarkdown } from '../extensions/public-api';
import type { EditraHtmlElement } from '../core/public-api';
import type { Schema } from 'prosemirror-model';

describe('Editra engine', () => {
	it('clears undo history when a programmatic value equals the current document', () => {
		for (const format of ['html', 'json']) {
			const engine = new EditraEngine({}, '<p>Original</p>');
			engine.apply(engine.state.tr.insertText('Updated ', 1));
			expect(undoDepth(engine.state)).toBe(1);
			if (format === 'html') engine.setHTML(engine.getHTML());
			else engine.setJSON(engine.getJSON());
			expect(engine.dirty).toBeFalse();
			expect(undoDepth(engine.state)).toBe(0);
		}
	});
	it('preserves code languages and escaped code through HTML round trips', () => {
		const engine = new EditraEngine(
			{},
			'<pre><code class="language-java">if (x &lt; 2) {}</code></pre>',
		);
		expect(attributes(engine.state.doc.firstChild!)['language']).toBe('java');
		const html = engine.getHTML();
		expect(html).toContain('data-language="java"');
		expect(html).toContain('class="language-java"');
		const restored = new EditraEngine({}, html);
		expect(restored.state.doc.toJSON()).toEqual(engine.state.doc.toJSON());
	});
	it('keeps omitted image and video dimensions automatic through HTML round trips', () => {
		const engine = new EditraEngine(
			{},
			'<img src="https://example.com/auto.png"><video src="https://example.com/auto.mp4" controls></video><iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"></iframe>',
		);
		engine.state.doc.forEach((node) => {
			expect(attributes(node)['width']).toBe(0);
			expect(attributes(node)['height']).toBe(0);
		});
		expect(engine.getHTML()).not.toMatch(/(?:^| )width="|(?:^| )height="/);
		expect(new EditraEngine({}, engine.getHTML()).getJSON()).toEqual(engine.getJSON());
	});
	it('retains full-width media, alignment and optional dimensions in model round trips', () => {
		const engine = new EditraEngine(
			{},
			'<figure data-full-width="true" style="text-align:right"><img src="https://example.com/full.png" width="320" height="160"></figure><figure data-editra-video="https://youtu.be/dQw4w9WgXcQ" data-full-width="true" style="text-align:left"><iframe></iframe></figure>',
		);
		expect(engine.getHTML()).toContain('width:100%');
		expect(new EditraEngine({}, engine.getHTML()).getJSON()).toEqual(engine.getJSON());
		expect(
			new EditraEngine().schema.nodes['video']?.create({
				url: 'https://youtu.be/dQw4w9WgXcQ',
			}).attrs['width'],
		).toBe(0);
	});
	it('keeps height-only and unlocked media sizing explicit without forcing a width', () => {
		const engine = new EditraEngine(
			{},
			'<figure data-aspect="false"><img src="https://example.com/tall.png" height="240"></figure>',
		);
		expect(engine.getHTML()).toContain('height:240px');
		expect(engine.getHTML()).not.toContain(' width="');
		expect(new EditraEngine({}, engine.getHTML()).getJSON()).toEqual(engine.getJSON());
	});

	it('keeps nested-table dimensions when AutoFitting the outer table', () => {
		const engine = new EditraEngine(
			{},
			'<table><tr><td><p>Outer</p><table><tr><td data-colwidth="123">Inner</td></tr></table></td></tr></table>',
		);
		const resized = resizeTableColumns(engine.state, 0, [200]);
		if (!resized) throw new Error('Missing outer table');
		engine.apply(resized);
		expect(
			engine.commands['fitTableToPage']?.(engine.state, (tr) => engine.apply(tr)),
		).toBeTrue();
		expect(engine.getHTML()).toContain('data-colwidth="123"');
		expect(engine.getHTML()).not.toContain('data-colwidth="200"');
	});
	it('resizes physical rows with isolated undo and an HTML/JSON round trip', () => {
		const engine = new EditraEngine(
			{},
			'<table><tr><td>A</td><td>B</td></tr><tr><td>C</td><td>D</td></tr></table>',
		);
		engine.apply(engine.state.tr.insertText('x', 4));
		const before = engine.getJSON();
		const tr = resizeTableRow(engine.state, 0, 1, 96);
		if (!tr) throw new Error('Missing resize transaction');
		engine.apply(tr);
		expect(engine.getHTML()).toContain('height:96px');
		expect(new EditraEngine({}, engine.getHTML()).getJSON()).toEqual(engine.getJSON());
		expect(
			engine.commands['undo']?.(engine.state, (transaction) => engine.apply(transaction)),
		).toBeTrue();
		expect(engine.getJSON()).toEqual(before);
		expect(
			engine.commands['redo']?.(engine.state, (transaction) => engine.apply(transaction)),
		).toBeTrue();
		expect(engine.getHTML()).toContain('height:96px');
	});
	it('resizes logical columns across column and row spans without changing cell content', () => {
		const engine = new EditraEngine(
			{},
			'<table><tr><td rowspan="2">A</td><td colspan="2">B</td></tr><tr><td>C</td><td>D</td></tr></table>',
		);
		const tr = resizeTableColumns(engine.state, 0, [180, 240, 130]);
		if (!tr) throw new Error('Missing column transaction');
		engine.apply(tr);
		const widths = new Map<string, unknown>();
		engine.state.doc.descendants((node) => {
			if (node.type.name === 'table_cell')
				widths.set(node.textContent, attributes(node)['colwidth']);
		});
		expect(widths.get('A')).toEqual([180]);
		expect(widths.get('B')).toEqual([240, 130]);
		expect(widths.get('C')).toEqual([240]);
		expect(widths.get('D')).toEqual([130]);
		expect(engine.getHTML()).toContain('rowspan="2"');
		expect(engine.getHTML()).toContain('colspan="2"');
		engine.state.doc.check();
		expect(new EditraEngine({}, engine.getHTML()).getJSON()).toEqual(engine.getJSON());
	});
	it('AutoFits and distributes columns while resetting row heights independently', () => {
		const engine = new EditraEngine({}, '<table><tr><td>A</td><td>B</td></tr></table>');
		const widths = resizeTableColumns(engine.state, 0, [100, 200]);
		if (!widths) throw new Error('Missing dimensions');
		engine.apply(widths);
		const row = resizeTableRow(engine.state, 0, 0, 80);
		if (row) engine.apply(row);
		expect(
			engine.commands['fitTableToPage']?.(engine.state, (tr) => engine.apply(tr)),
		).toBeTrue();
		expect(engine.getHTML()).not.toContain('data-colwidth');
		expect(engine.getHTML()).toContain('height:80px');
		expect(
			engine.commands['distributeTableColumns']?.(engine.state, (tr) => engine.apply(tr)),
		).toBeTrue();
		expect(engine.getHTML()).toContain('data-colwidth="120"');
		expect(
			engine.commands['resetTableRowHeights']?.(engine.state, (tr) => engine.apply(tr)),
		).toBeTrue();
		expect(engine.getHTML()).not.toContain('height:80px');
	});
	it('rejects invalid resize targets and bounds finite row/column dimensions', () => {
		const engine = new EditraEngine({}, '<table><tr><td>A</td><td>B</td></tr></table>');
		expect(resizeTableRow(engine.state, 0, -1, 50)).toBeNull();
		expect(resizeTableRow(engine.state, -1, 0, 50)).toBeNull();
		expect(
			resizeTableColumns(engine.state, engine.state.doc.content.size + 10, [80, 80]),
		).toBeNull();
		expect(resizeTableRow(engine.state, 0, 0, NaN)).toBeNull();
		expect(resizeTableColumns(engine.state, 0, [80])).toBeNull();
		expect(resizeTableColumns(engine.state, 0, [Infinity, 80])).toBeNull();
		const row = resizeTableRow(engine.state, 0, 0, 9000);
		if (row) engine.apply(row);
		expect(engine.getHTML()).toContain('height:2000px');
		const cols = resizeTableColumns(engine.state, 0, [2, 9000]);
		if (cols) engine.apply(cols);
		expect(engine.getHTML()).toContain('data-colwidth="48"');
		expect(engine.getHTML()).toContain('data-colwidth="4096"');
	});
	it('normalizes redundant and mutually exclusive imported marks', () => {
		const engine = new EditraEngine(
			{},
			'<p><strong><span style="font-weight:700">Bold</span></strong><sub><sup>superscript</sup></sub></p>',
		);
		engine.state.doc.check();
		expect(engine.getHTML()).toContain('<strong>Bold</strong>');
		expect(engine.getHTML()).toContain('<sup>superscript</sup>');
	});
	it('merges a full rectangular table selection with row spans and splits it back', () => {
		const engine = new EditraEngine(
			{},
			'<table><tr><td>A</td><td>B</td><td>C</td></tr><tr><td>D</td><td>E</td><td>F</td></tr></table>',
		);
		const positions: number[] = [];
		engine.state.doc.descendants((node, pos) => {
			if (node.type.name === 'table_cell') positions.push(pos);
		});
		const first = positions[0],
			last = positions[5];
		if (first === undefined || last === undefined) throw new Error('Missing cells');
		engine.apply(
			engine.state.tr.setSelection(CellSelection.create(engine.state.doc, first, last)),
		);
		expect(engine.commands['mergeCells']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		engine.state.doc.check();
		expect(engine.getHTML()).toContain('rowspan="2"');
		expect(new EditraEngine({}, engine.getHTML()).getJSON()).toEqual(engine.getJSON());
		expect(engine.commands['splitCell']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		engine.state.doc.check();
		expect(engine.getHTML().match(/<td/gu)?.length).toBe(6);
	});
	it('treats empty headings, lists and whitespace as semantically empty', () => {
		for (const html of ['<h1></h1>', '<p>   </p>', '<ul><li><p></p></li></ul>'])
			expect(new EditraEngine({}, html).isEmpty()).toBeTrue();
		expect(new EditraEngine({}, '<img src="https://example.com/a.png">').isEmpty()).toBeFalse();
	});
	it('validates config bounds without discarding defaults', () => {
		expect(normalizeConfig({ theme: 'dark' }).minHeight).toBe(180);
		expect(() => normalizeConfig({ minHeight: NaN })).toThrow();
		expect(() => normalizeConfig({ minHeight: 200, maxHeight: 100 })).toThrow();
	});
	it('preserves whitespace between inline wrappers', () => {
		expect(new EditraEngine({}, '<strong>one</strong> <em>two</em>').getText()).toBe('one two');
	});
	it('finds matches across formatting boundaries', () => {
		expect(new EditraEngine({}, '<p>Hel<strong>lo</strong></p>').find('hello').length).toBe(1);
	});
	it('reports mixed formatting states', () => {
		const engine = new EditraEngine({}, '<p><strong>bold</strong> plain</p>');
		engine.apply(engine.state.tr.setSelection(TextSelection.create(engine.state.doc, 1, 11)));
		const bold = engine.schema.marks['bold'];
		if (!bold) throw new Error('Missing bold');
		expect(markStatus(engine.state, bold)).toBe('mixed');
	});
	it('automatically links permitted typed URLs', () => {
		const engine = new EditraEngine();
		engine.apply(engine.state.tr.insertText('https://example.com '));
		expect(engine.getHTML()).toContain('href="https://example.com/"');
	});
	it('round trips registered custom schema nodes through their explicit server-safe importer', () => {
		const config = {
			extensions: [
				{
					id: 'callout',
					nodes: {
						callout: {
							group: 'block',
							content: 'block+',
							toDOM: () => ['aside', { 'data-callout': '' }, 0] as const,
						},
					},
					parseElement: (element: EditraHtmlElement, schema: Schema) =>
						element.tag === 'aside'
							? (schema.nodes['callout']?.createAndFill(null, [...element.content]) ??
								null)
							: null,
				},
			],
		};
		const engine = new EditraEngine(config, '<aside data-callout><p>Note</p></aside>');
		expect(engine.getHTML()).toContain('<aside');
		const value = engine.getJSON();
		engine.setJSON(value);
		expect(engine.getJSON()).toEqual(value);
	});
	it('persists model-backed table width and row height changes', () => {
		const engine = new EditraEngine({}, '<table><tr><td>A</td></tr></table>');
		engine.apply(engine.state.tr.setSelection(TextSelection.create(engine.state.doc, 4)));
		tableAttribute('table', 'width', 80)(engine.state, (tr) => engine.apply(tr));
		tableAttribute('table_row', 'height', 60)(engine.state, (tr) => engine.apply(tr));
		expect(engine.getHTML()).toContain('width:80%');
		expect(engine.getHTML()).toContain('height:60px');
		expect(new EditraEngine({}, engine.getHTML()).getJSON()).toEqual(engine.getJSON());
	});
	it('round trips every text mark, block and list without a browser parser', () => {
		const input =
			'<h2>Hello <strong>bold</strong><em>italic</em><u>underlined</u><s>strike</s><sub>low</sub><sup>high</sup><code>code</code></h2><blockquote><p>Quote</p></blockquote><ol start="3"><li><p>one</p><ul><li><p>nested</p></li></ul></li></ol><pre><code>  a\n b</code></pre><hr><p><br></p>';
		const first = new EditraEngine({}, input),
			second = new EditraEngine({}, first.getHTML());
		expect(second.getJSON()).toEqual(first.getJSON());
		expect(first.getText()).toContain('  a\n b');
	});
	it('preserves safe style marks and block attributes', () => {
		const first = new EditraEngine(
			{},
			'<p style="text-align:right;margin-left:48px;line-height:2"><span style="color:#ff0000;background-color:#ffff00;font-family:Georgia;font-size:24px">styled</span></p>',
		);
		expect(new EditraEngine({}, first.getHTML()).getJSON()).toEqual(first.getJSON());
	});
	it('drops executable subtrees, events, dangerous styles and unsafe URLs', () => {
		const engine = new EditraEngine(
			{},
			'<script>alert(1)</script><svg onload="alert(1)">bad</svg><p onclick="alert(1)"><a href="java&#x73;cript:alert(1)">safe text</a><span style="color:expression(alert(1));font-family:url(evil)">ok</span></p><img src="data:image/png;base64,foo" onerror="evil()"><iframe src="https://evil.test/embed"></iframe>',
		);
		const html = engine.getHTML();
		for (const forbidden of [
			'script',
			'onload',
			'onclick',
			'onerror',
			'javascript:',
			'expression',
			'data:image',
			'evil.test',
			'<svg',
		])
			expect(html).not.toContain(forbidden);
		expect(html).toContain('safe text');
	});
	it('rejects URL obfuscation and credentials', () => {
		for (const value of [
			'javascript:alert(1)',
			'data:text/html,evil',
			'https://user:pass@example.com',
			' https://example.com',
			'http://example.com',
			'java\nscript:evil',
			'//example.com',
		])
			expect(safeUrl(value)).toBeNull();
		expect(safeUrl('http://example.com', { allowHttp: true })).toBe('http://example.com/');
	});
	it('matches providers by exact hostname and URL path', () => {
		expect(resolveVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ')?.src).toBe(
			'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
		);
		expect(resolveVideo('https://youtu.be/dQw4w9WgXcQ')?.provider).toBe('youtube');
		expect(resolveVideo('https://youtube.com/shorts/dQw4w9WgXcQ')?.provider).toBe('youtube');
		expect(resolveVideo('https://vimeo.com/12345')?.src).toBe(
			'https://player.vimeo.com/video/12345',
		);
		expect(resolveVideo('https://cdn.example.com/video.mp4')?.direct).toBeTrue();
		for (const url of [
			'https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ',
			'https://evil.test/youtube.com/watch?v=dQw4w9WgXcQ',
			'https://youtube.com/evil/dQw4w9WgXcQ',
		])
			expect(resolveVideo(url)).toBeNull();
	});
	it('round trips image dimensions, captions and video original URLs', () => {
		const html =
			'<figure style="text-align:right;margin:12px" data-wrap="true"><img src="https://example.com/a.png" alt="A &amp; B" width="320" height="200" style="border-radius:8px;border:1px dashed currentColor"><figcaption>A caption</figcaption></figure><figure data-editra-video="https://youtu.be/dQw4w9WgXcQ"><iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" width="640" height="360"></iframe></figure>';
		const first = new EditraEngine({}, html);
		expect(new EditraEngine({}, first.getHTML()).getJSON()).toEqual(first.getJSON());
		expect(first.getHTML()).toContain('https://youtu.be/dQw4w9WgXcQ');
	});
	it('retains images imported inside paragraphs', () => {
		expect(
			new EditraEngine(
				{},
				'<p>Before<img src="https://example.com/a.png" alt="Photo">After</p>',
			).getHTML(),
		).toContain('<img');
	});
	it('repairs malformed tables and round trips spans and column dimensions', () => {
		const first = new EditraEngine(
			{},
			'<table><tr><th colspan="2" data-colwidth="100,150"><p>Heading</p></th></tr><tr><td><p>A</p></td><td><p>B</p></td></tr></table>',
		);
		first.state.doc.check();
		expect(new EditraEngine({}, first.getHTML()).getJSON()).toEqual(first.getJSON());
	});
	it('changes selected text with transactions and supports undo and redo', () => {
		const engine = new EditraEngine({}, '<p>Hello world</p>');
		engine.apply(engine.state.tr.setSelection(TextSelection.create(engine.state.doc, 1, 6)));
		expect(engine.commands['bold']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		expect(engine.getHTML()).toContain('<strong>Hello</strong>');
		expect(engine.commands['undo']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		expect(engine.getHTML()).not.toContain('<strong>');
		engine.commands['redo']?.(engine.state, (tr) => engine.apply(tr));
		expect(engine.getHTML()).toContain('<strong>');
	});
	it('does not mark selection-only transactions dirty', () => {
		const engine = new EditraEngine({}, '<p>abc</p>');
		expect(
			engine.apply(engine.state.tr.setSelection(TextSelection.create(engine.state.doc, 2))),
		).toBeFalse();
		expect(engine.dirty).toBeFalse();
	});
	it('clears marks without destroying the list structure', () => {
		const engine = new EditraEngine({}, '<ul><li><p><strong>Text</strong></p></li></ul>');
		engine.apply(engine.state.tr.setSelection(TextSelection.create(engine.state.doc, 3, 7)));
		engine.commands['clear']?.(engine.state, (tr) => engine.apply(tr));
		expect(engine.getHTML()).toContain('<ul>');
		expect(engine.getHTML()).not.toContain('<strong>');
	});
	it('indents nested lists and can outdent them', () => {
		const engine = new EditraEngine({}, '<ul><li><p>First</p></li><li><p>Second</p></li></ul>');
		let second = 0;
		engine.state.doc.descendants((node, pos) => {
			if (node.isText && node.text === 'Second') second = pos;
		});
		engine.apply(engine.state.tr.setSelection(TextSelection.create(engine.state.doc, second)));
		expect(engine.commands['indent']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		expect(engine.getHTML().match(/<ul>/gu)?.length).toBe(2);
		expect(engine.commands['outdent']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		expect(engine.getHTML().match(/<ul>/gu)?.length).toBe(1);
	});
	it('merges and splits cells and deletes a table with undo', () => {
		const engine = new EditraEngine(
			{},
			'<table><tr><td>A</td><td>B</td></tr><tr><td>C</td><td>D</td></tr></table>',
		);
		const positions: number[] = [];
		engine.state.doc.descendants((node, pos) => {
			if (node.type.name === 'table_cell') positions.push(pos);
		});
		const first = positions[0],
			last = positions[1];
		if (first === undefined || last === undefined) throw new Error('Missing cells');
		engine.apply(
			engine.state.tr.setSelection(CellSelection.create(engine.state.doc, first, last)),
		);
		expect(engine.commands['mergeCells']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		expect(engine.commands['splitCell']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		expect(engine.commands['deleteTable']?.(engine.state, (tr) => engine.apply(tr))).toBeTrue();
		expect(engine.getHTML()).not.toContain('<table');
		engine.commands['undo']?.(engine.state, (tr) => engine.apply(tr));
		expect(engine.getHTML()).toContain('<table');
	});
	it('counts Unicode characters and finds literal matches without mutation', () => {
		const engine = new EditraEngine({}, '<p>Hello hello 😀</p>');
		const html = engine.getHTML();
		expect(engine.find('hello').length).toBe(2);
		expect(engine.getHTML()).toBe(html);
		expect(engine.counts()).toEqual({ words: 3, characters: 13 });
	});
	it('validates JSON structure and sanitizes attributes', () => {
		const engine = new EditraEngine();
		expect(() =>
			parseJSON({ type: 'doc', content: [{ type: 'unknown' }] }, engine.schema),
		).toThrow();
		const doc = parseJSON(
			{
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'x',
								marks: [{ type: 'link', attrs: { href: 'javascript:evil' } }],
							},
						],
					},
				],
			},
			engine.schema,
		);
		expect(serializeHTML(doc)).not.toContain('javascript:');
	});
	it('rejects oversized input', () => {
		expect(
			() => new EditraEngine({ security: { maxInputLength: 5 } }, '<p>long</p>'),
		).toThrow();
	});
	it('rejects duplicate, missing and cyclic extension registrations', () => {
		expect(() => orderExtensions([{ id: 'a' }, { id: 'a' }])).toThrow();
		expect(() => orderExtensions([{ id: 'a', requires: ['b'] }])).toThrow();
		expect(() =>
			orderExtensions([
				{ id: 'a', requires: ['b'] },
				{ id: 'b', requires: ['a'] },
			]),
		).toThrow();
		expect(
			orderExtensions([{ id: 'a', requires: ['b'] }, { id: 'b' }]).map((ext) => ext.id),
		).toEqual(['b', 'a']);
		expect(
			() =>
				new EditraEngine({
					extensions: [{ id: 'bad', commands: () => ({ bold: () => true }) }],
				}),
		).toThrow();
	});
	it('disables optional media and tables in the schema', () => {
		const engine = new EditraEngine({
			image: { enabled: false },
			video: { enabled: false },
			table: { enabled: false },
		});
		expect(engine.schema.nodes['image']).toBeUndefined();
		expect(engine.schema.nodes['video']).toBeUndefined();
		expect(engine.schema.nodes['table']).toBeUndefined();
	});
	it('imports and exports CommonMark', () => {
		const engine = new EditraEngine();
		engine.setHTML(serializeHTML(importMarkdown('# Hello\n\n**World**', engine.schema)));
		expect(engine.getHTML()).toContain('<strong>World</strong>');
		expect(exportMarkdown(engine.state.doc)).toContain('**World**');
	});
	it('exports column layouts as escaped HTML in Markdown without losing adjacent blocks', () => {
		const engine = new EditraEngine(
			{},
			'<p>Before</p><div data-editra-columns="true">' +
				'<div data-editra-column="true"><p>Left &lt;script&gt;</p></div>' +
				'<div data-editra-column="true"><p>Right</p></div></div><p>After</p>',
		);
		const markdown = exportMarkdown(engine.state.doc);
		expect(markdown).toContain('data-editra-columns="true"');
		expect(markdown).toContain('Left &lt;script&gt;');
		expect(markdown).not.toContain('<script>');
		expect(markdown).toContain('Right');
		expect(markdown.indexOf('Before')).toBeLessThan(markdown.indexOf('data-editra-columns'));
		expect(markdown.indexOf('Right')).toBeLessThan(markdown.indexOf('After'));
	});
});
