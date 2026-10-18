import { parseFragment } from 'parse5';
import type { DefaultTreeAdapterTypes } from 'parse5';
import type { DOMOutputSpec, Mark, Node, Schema } from 'prosemirror-model';
import { Fragment } from 'prosemirror-model';
import type { EditraConfig, EditraDocument } from './types';
import {
	alignment,
	dimension,
	escapeHTML,
	safeColor,
	safeFont,
	safeUrl,
	resolveVideo,
} from './security';
import { stringAttribute } from './attributes';

type HtmlNode = DefaultTreeAdapterTypes.ChildNode;
function attr(node: DefaultTreeAdapterTypes.Element, name: string): string {
	return node.attrs.find((a) => a.name === name)?.value ?? '';
}
function style(node: DefaultTreeAdapterTypes.Element): Record<string, string> {
	const result: Record<string, string> = {};
	for (const part of attr(node, 'style').split(';')) {
		const separator = part.indexOf(':');
		if (separator > 0)
			result[part.slice(0, separator).trim().toLowerCase()] = part
				.slice(separator + 1)
				.trim();
	}
	return result;
}
function text(node: HtmlNode, depth = 0): string {
	if (depth > 100) throw new Error('Content nesting exceeds the supported limit');
	return 'value' in node
		? node.value
		: 'childNodes' in node
			? node.childNodes.map((child) => text(child, depth + 1)).join('')
			: '';
}
function element(node: HtmlNode): node is DefaultTreeAdapterTypes.Element {
	return 'tagName' in node;
}
const blocked = new Set([
	'script',
	'style',
	'template',
	'object',
	'embed',
	'svg',
	'math',
	'noscript',
	'input',
	'button',
	'form',
]);

/** Parses without browser globals. Unknown wrappers are unwrapped; executable subtrees are dropped. */
export function parseHTML(html: string, schema: Schema, config: EditraConfig = {}): Node {
	if (html.length > (config.security?.maxInputLength ?? 1_000_000))
		throw new Error('Content exceeds the configured size limit');
	function create(
		name: string,
		attrs: Record<string, unknown>,
		children: readonly Node[] = [],
	): Node[] {
		const type = schema.nodes[name];
		if (!type) return [];
		const node = type.createAndFill(attrs, Fragment.fromArray([...children]));
		return node ? [node] : [];
	}
	function paragraphs(children: readonly Node[]): Node[] {
		const result: Node[] = [],
			inline: Node[] = [];
		const flush = (): void => {
			if (inline.length) {
				if (!inline.every((node) => node.isText && !node.text?.trim()))
					result.push(...create('paragraph', {}, inline));
				inline.length = 0;
			}
		};
		for (const child of children) {
			if (child.isInline) inline.push(child);
			else {
				flush();
				result.push(child);
			}
		}
		flush();
		return result.length ? result : create('paragraph', {});
	}
	function walk(
		node: HtmlNode,
		marks: readonly Mark[] = [],
		depth = 0,
		preserve = false,
	): Node[] {
		if (depth > 100) throw new Error('Content nesting exceeds the supported limit');
		if ('value' in node) {
			const value = preserve ? node.value : node.value.replace(/\s+/gu, ' ');
			return value ? [schema.text(value, marks)] : [];
		}
		if (!element(node) || blocked.has(node.tagName)) return [];
		const tag = node.tagName,
			css = style(node);
		let nextMarks: readonly Mark[] = marks;
		function mark(name: string, attrs: Record<string, unknown> = {}): void {
			const type = schema.marks[name];
			if (type) nextMarks = type.create(attrs).addToSet(nextMarks);
		}
		const tagMarks: Record<string, string> = {
			strong: 'bold',
			b: 'bold',
			em: 'italic',
			i: 'italic',
			u: 'underline',
			s: 'strike',
			del: 'strike',
			strike: 'strike',
			sub: 'subscript',
			sup: 'superscript',
			code: 'code',
		};
		const tagMark = tagMarks[tag];
		if (tagMark && !preserve) mark(tagMark);
		if (tag === 'a') {
			const href = safeUrl(attr(node, 'href'), config.security, true);
			if (href) mark('link', { href, newTab: attr(node, 'target') === '_blank' });
		}
		if (safeColor(css['color'])) mark('color', { value: safeColor(css['color']) });
		if (safeColor(css['background-color']) && tag !== 'td' && tag !== 'th')
			mark('highlight', { value: safeColor(css['background-color']) });
		if (safeFont(css['font-family'])) mark('font', { value: safeFont(css['font-family']) });
		if (css['font-size'] && dimension(css['font-size'], 0, 96) >= 8)
			mark('size', { value: dimension(css['font-size'], 16, 96) });
		if (css['font-weight'] === 'bold' || css['font-weight'] === '700') mark('bold');
		if (css['font-style'] === 'italic') mark('italic');
		if (tag === 'div' && attr(node, 'data-editra-columns') === 'true') {
			const columns = node.childNodes.filter(
				(child) => element(child) && attr(child, 'data-editra-column') === 'true',
			);
			if (columns.length === 2)
				return create(
					'content_columns',
					{},
					columns.flatMap((child) => walk(child, nextMarks, depth + 1)),
				);
		}
		if (tag === 'div' && attr(node, 'data-editra-column') === 'true') {
			return create(
				'content_column',
				{
					weight: Math.max(
						5,
						Math.min(95, dimension(attr(node, 'data-column-weight'), 50, 95)),
					),
				},
				paragraphs(node.childNodes.flatMap((child) => walk(child, nextMarks, depth + 1))),
			);
		}
		if (tag === 'figure') {
			const media = node.childNodes.find(
				(child) => element(child) && ['img', 'iframe', 'video'].includes(child.tagName),
			);
			if (media && element(media)) {
				const caption = node.childNodes.find(
					(child) => element(child) && child.tagName === 'figcaption',
				);
				if (media.tagName === 'img')
					return image(media, {
						caption: caption ? text(caption, depth + 1) : '',
						align: alignment(css['text-align']),
						spacing: dimension(css['margin-top'] ?? css['margin'], 8, 100),
						wrap: attr(node, 'data-wrap') === 'true',
						aspect: attr(node, 'data-aspect') !== 'false',
						fullWidth: attr(node, 'data-full-width') === 'true',
					});
				const url = attr(node, 'data-editra-video') || attr(media, 'src');
				return video(media, url, {
					caption: caption ? text(caption, depth + 1) : '',
					align: alignment(css['text-align']),
					aspect: attr(node, 'data-aspect') !== 'false',
					fullWidth: attr(node, 'data-full-width') === 'true',
				});
			}
		}
		if (tag === 'img') return image(node);
		if (tag === 'iframe' || tag === 'video') return video(node, attr(node, 'src'));
		if (tag === 'br') return create('hard_break', {});
		if (tag === 'hr') {
			const border = css['border-top']?.split(/\s+/u) ?? [];
			const line =
				attr(node, 'data-line-style') ||
				css['border-top-style'] ||
				border.find((part) => ['solid', 'dashed', 'dotted', 'double'].includes(part));
			return create('horizontal_rule', {
				style: ['solid', 'dashed', 'dotted', 'double'].includes(line ?? '')
					? line
					: 'solid',
				weight: Math.max(
					1,
					dimension(
						attr(node, 'data-line-weight') ||
							css['border-top-width'] ||
							border.find((part) => /^\d+(?:\.\d+)?(?:px)?$/u.test(part)),
						1,
						8,
					),
				),
			});
		}
		if (tag === 'pre') {
			const code = node.childNodes.find(
				(child) => element(child) && child.tagName === 'code',
			);
			const language = (
				attr(node, 'data-language') ||
				(code && element(code)
					? attr(code, 'class')?.match(/\blanguage-([\w+-]+)/u)?.[1]
					: '') ||
				''
			)
				.replace(/[^\w+-]/gu, '')
				.slice(0, 40);
			const value = text(node, depth);
			return create('code_block', { language }, value ? [schema.text(value)] : []);
		}
		const children = node.childNodes.flatMap((child) =>
			walk(child, nextMarks, depth + 1, preserve),
		);
		const attrs = {
			align: alignment(css['text-align']),
			indent: dimension(css['margin-left'], 0, 192) / 24,
			lineHeight: Math.max(1, Math.min(3, Number(css['line-height']) || 1.5)),
		};
		if (/^h[1-6]$/u.test(tag))
			return create(
				'heading',
				{ ...attrs, level: Number(tag[1]) },
				children.filter((child) => child.isInline),
			);
		if (tag === 'p' || (tag === 'div' && children.every((child) => child.isInline)))
			return children.every((child) => child.isInline)
				? create('paragraph', attrs, children)
				: paragraphs(children);
		if (tag === 'blockquote') return create('blockquote', {}, paragraphs(children));
		if (tag === 'ul' || tag === 'ol')
			return create(
				tag === 'ul' ? 'bullet_list' : 'ordered_list',
				tag === 'ol' ? { order: dimension(attr(node, 'start'), 1) || 1 } : {},
				children.filter((child) => child.type.name === 'list_item'),
			);
		if (tag === 'li') return create('list_item', {}, paragraphs(children));
		if (tag === 'table')
			return create(
				'table',
				{
					width: dimension(css['width']?.replace('%', ''), 100, 100),
					borderColor:
						safeColor(
							css['border-color'] ??
								css['border']?.match(/#[\da-f]{3,6}\b|rgb\([^)]*\)/iu)?.[0],
						) ?? '#000000',
					borderWidth: Math.max(
						1,
						dimension(css['border-width'] ?? css['border']?.split(' ')[0], 1, 8),
					),
					border:
						['solid', 'dashed', 'dotted', 'double', 'none'].find((style) =>
							(css['border-style'] ?? css['border'] ?? '').includes(style),
						) ?? 'solid',
				},
				children.filter((child) => child.type.name === 'table_row'),
			);
		if (tag === 'tr')
			return create(
				'table_row',
				{ height: dimension(css['height'], 0, 2000) },
				children.filter((child) =>
					['table_cell', 'table_header'].includes(child.type.name),
				),
			);
		if (tag === 'td' || tag === 'th')
			return create(
				tag === 'td' ? 'table_cell' : 'table_header',
				{
					colspan: Math.max(1, dimension(attr(node, 'colspan'), 1, 100)),
					rowspan: Math.max(1, dimension(attr(node, 'rowspan'), 1, 100)),
					colwidth: attr(node, 'data-colwidth')
						? attr(node, 'data-colwidth')
								.split(',')
								.map((value) => dimension(value, 100))
						: null,
					background: safeColor(css['background-color']),
				},
				paragraphs(children),
			);
		for (const extension of config.extensions ?? []) {
			const imported = extension.parseElement?.(
				{
					tag,
					attributes: Object.fromEntries(
						node.attrs
							.filter((a) => !/^on/iu.test(a.name))
							.map((a) => [a.name, a.value]),
					),
					content: children,
					text: text(node, depth),
				},
				schema,
			);
			if (imported) {
				imported.check();
				return [imported];
			}
		}
		return children;
	}
	function image(
		node: DefaultTreeAdapterTypes.Element,
		extra: Record<string, unknown> = {},
	): Node[] {
		const src = safeUrl(attr(node, 'src'), config.security),
			css = style(node);
		return src
			? create('image', {
					src,
					alt: attr(node, 'alt'),
					width: dimension(attr(node, 'width')),
					height: dimension(attr(node, 'height')),
					radius: dimension(css['border-radius'], 0, 100),
					border: css['border']?.includes('dashed')
						? 'dashed'
						: css['border']?.includes('solid')
							? 'solid'
							: 'none',
					...extra,
				})
			: [];
	}
	function video(
		node: DefaultTreeAdapterTypes.Element,
		url: string,
		extra: Record<string, unknown> = {},
	): Node[] {
		return resolveVideo(url, config.security, config.video?.providers)
			? create('video', {
					url,
					width: dimension(attr(node, 'width')),
					height: dimension(attr(node, 'height')),
					controls:
						node.tagName !== 'video' || node.attrs.some((a) => a.name === 'controls'),
					...extra,
				})
			: [];
	}
	const children = parseFragment(html).childNodes.flatMap((node) => walk(node));
	const doc = schema.topNodeType.createChecked(null, paragraphs(children));
	doc.check();
	return doc;
}

function renderSpec(spec: DOMOutputSpec, content: string, appendDefault = false): string {
	if (typeof spec === 'string') return escapeHTML(spec);
	if (!Array.isArray(spec))
		throw new Error('DOM-only serializers cannot be rendered on the server');
	const tag: unknown = spec[0];
	if (
		typeof tag !== 'string' ||
		!/^[a-z][a-z0-9-]*$/u.test(tag) ||
		['script', 'style', 'object', 'embed'].includes(tag)
	)
		throw new Error('Unsafe serializer tag');
	const second: unknown = spec[1];
	const hasAttrs = second !== null && typeof second === 'object' && !Array.isArray(second);
	let attrs = '';
	if (hasAttrs)
		for (const [key, value] of Object.entries(second as Record<string, unknown>)) {
			if (!/^[\w-]+$/u.test(key) || /^on/iu.test(key) || key === 'srcdoc')
				throw new Error('Unsafe serializer attribute');
			if (value !== null && value !== undefined)
				attrs += ` ${key}="${escapeHTML(String(value))}"`;
		}
	const descendants = spec.slice(hasAttrs ? 2 : 1);
	const hasHole = (value: unknown): boolean =>
		value === 0 || (Array.isArray(value) && value.some(hasHole));
	const children =
		descendants
			.map((child: DOMOutputSpec | 0) => (child === 0 ? content : renderSpec(child, content)))
			.join('') + (appendDefault && !descendants.some(hasHole) ? content : '');
	return `<${tag}${attrs}>${['img', 'br', 'hr'].includes(tag) ? '' : children + `</${tag}>`}`;
}
/** Deterministic HTML renderer with no DOM dependency. Extensions are trusted application code. */
export function serializeHTML(doc: Node): string {
	function render(node: Node): string {
		let html: string;
		if (node.isText) html = escapeHTML(node.text ?? '');
		else {
			const children: string[] = [];
			node.forEach((child) => children.push(render(child)));
			html =
				node.type.name === 'doc'
					? children.join('')
					: node.type.spec.toDOM
						? renderSpec(node.type.spec.toDOM(node), children.join(''))
						: children.join('');
		}
		for (const mark of [...node.marks].reverse())
			if (mark.type.spec.toDOM)
				html = renderSpec(mark.type.spec.toDOM(mark, true), html, true);
		return html;
	}
	return render(doc);
}
export function documentJSON(doc: Node): EditraDocument {
	return doc.toJSON() as EditraDocument;
}
/** Validates structure and reimports attributes through the security policy. */
export function parseJSON(value: EditraDocument, schema: Schema, config: EditraConfig = {}): Node {
	const encoded = JSON.stringify(value);
	if (encoded.length > (config.security?.maxInputLength ?? 1_000_000))
		throw new Error('Content exceeds the configured size limit');
	const doc = schema.nodeFromJSON(value);
	doc.check();
	if (doc.type !== schema.topNodeType) throw new Error('Expected a document root');
	return parseHTML(serializeHTML(doc), schema, config);
}
export function plainText(doc: Node): string {
	return doc.textBetween(
		0,
		doc.content.size,
		'\n',
		(node) =>
			node.type.spec.leafText?.(node) ??
			(stringAttribute(node, 'caption') || stringAttribute(node, 'alt') || '\n'),
	);
}
