import { Schema } from 'prosemirror-model';
import type { DOMOutputSpec, MarkSpec, NodeSpec, Node } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import { tableNodes } from 'prosemirror-tables';
import { attributes, stringAttribute } from './attributes';
import { alignment, dimension, safeColor, safeFont, safeUrl, resolveVideo } from './security';
import type { EditraConfig, EditraExtension } from './types';

const blockAttrs = {
	align: { default: 'left' },
	indent: { default: 0 },
	lineHeight: { default: 1.5 },
};
function blockFromDOM(dom: HTMLElement | string): Record<string, unknown> | false {
	if (typeof dom === 'string') return false;
	return {
		align: alignment(dom.style.textAlign),
		indent: dimension(dom.style.marginLeft, 0, 192) / 24,
		lineHeight: Math.max(1, Math.min(3, Number(dom.style.lineHeight) || 1.5)),
	};
}
function blockStyle(node: Node): string {
	const a = attributes(node);
	const line =
		typeof a['lineHeight'] === 'number' && a['lineHeight'] >= 1 && a['lineHeight'] <= 3
			? a['lineHeight']
			: 1.5;
	return `text-align:${alignment(a['align'])};margin-left:${dimension(a['indent'], 0, 8) * 24}px;line-height:${line}`;
}
function mediaFigureStyle(a: Readonly<Record<string, unknown>>, embedded = false): string {
	const align = alignment(a['align']),
		width = dimension(a['width']),
		height = dimension(a['height']);
	const spacing = dimension(a['spacing'], 8, 100);
	const full = a['fullWidth'] === true;
	const size = full
		? '100%'
		: width
			? `${width}px`
			: embedded
				? `min(${height ? Math.min(4096, Math.round((height * 16) / 9)) : 640}px,100%)`
				: 'fit-content';
	const wrap = a['wrap'] === true && !full && align !== 'center';
	return `display:block;box-sizing:border-box;width:${size};max-width:100%;text-align:${align};margin-top:${spacing}px;margin-bottom:${spacing}px;margin-left:${wrap && align === 'right' ? spacing + 'px' : align === 'left' ? 0 : 'auto'};margin-right:${wrap && align === 'left' ? spacing + 'px' : align === 'right' ? 0 : 'auto'};${wrap ? `float:${align};` : ''}`;
}
function mediaDimensions(a: Readonly<Record<string, unknown>>, embedded = false): string {
	const width = dimension(a['width']),
		height = dimension(a['height']);
	const full = a['fullWidth'] === true;
	const ratio = width && height ? `${width}/${height}` : embedded ? '16/9' : '';
	return `display:block;max-width:100%;width:${full || embedded || width ? '100%' : 'auto'};height:${!full && height && (a['aspect'] === false || (!width && !embedded)) ? `${height}px` : 'auto'};${ratio && (!full || embedded) ? `aspect-ratio:${ratio};` : ''}`;
}
export function createSchema(
	config: EditraConfig = {},
	extensions: readonly EditraExtension[] = [],
): Schema {
	const nodes: Record<string, NodeSpec> = {
		doc: { content: 'block+' },
		paragraph: {
			content: 'inline*',
			group: 'block',
			attrs: blockAttrs,
			parseDOM: [{ tag: 'p', getAttrs: blockFromDOM }],
			toDOM: (node) => ['p', { style: blockStyle(node) }, 0],
		},
		text: { group: 'inline' },
		content_columns: {
			group: 'block',
			content: 'content_column{2}',
			defining: true,
			isolating: true,
			parseDOM: [{ tag: 'div[data-editra-columns]' }],
			toDOM: () => [
				'div',
				{
					'data-editra-columns': 'true',
					style: 'display:flex;flex-wrap:wrap;gap:16px;align-items:stretch;clear:both;margin:16px 0',
				},
				0,
			],
		},
		content_column: {
			attrs: { weight: { default: 50 } },
			content: 'block+',
			defining: true,
			isolating: true,
			parseDOM: [
				{
					tag: 'div[data-editra-column]',
					getAttrs: (dom) => ({
						weight:
							typeof dom === 'string'
								? 50
								: Math.max(
										5,
										Math.min(
											95,
											dimension(
												dom.getAttribute('data-column-weight'),
												50,
												95,
											),
										),
									),
					}),
				},
			],
			toDOM: (node) => [
				'div',
				{
					'data-editra-column': 'true',
					'data-column-weight': Math.max(
						5,
						Math.min(95, dimension(attributes(node)['weight'], 50, 95)),
					),
					style: `flex:${Math.max(5, Math.min(95, dimension(attributes(node)['weight'], 50, 95)))} 1 max(calc((100% - 16px) * ${Math.max(5, Math.min(95, dimension(attributes(node)['weight'], 50, 95)))} / 100),calc((480px - 100%) * 999));min-width:min(48px,100%);max-width:100%;display:flow-root`,
				},
				0,
			],
		},
		heading: {
			content: 'inline*',
			group: 'block',
			defining: true,
			attrs: { ...blockAttrs, level: { default: 1 } },
			parseDOM: [1, 2, 3, 4, 5, 6].map((level) => ({
				tag: `h${level}`,
				getAttrs: (dom) => ({ ...blockFromDOM(dom), level }),
			})),
			toDOM: (node) => [
				`h${dimension(attributes(node)['level'], 1, 6) || 1}`,
				{ style: blockStyle(node) },
				0,
			],
		},
		blockquote: {
			content: 'block+',
			group: 'block',
			defining: true,
			parseDOM: [{ tag: 'blockquote' }],
			toDOM: () => [
				'blockquote',
				{
					style: 'margin:0.65em 0;padding:10px 16px;border-inline-start:3px solid var(--editra-border,#b8c2d0);background:var(--editra-toolbar,#f7f9fc);border-radius:0 6px 6px 0',
				},
				0,
			],
		},
		code_block: {
			attrs: { language: { default: '' } },
			content: 'text*',
			marks: '',
			group: 'block',
			code: true,
			defining: true,
			parseDOM: [
				{
					tag: 'pre',
					preserveWhitespace: 'full',
					getAttrs: (dom) => ({
						language:
							typeof dom === 'string'
								? ''
								: dom.getAttribute('data-language') ||
									dom
										.querySelector('code')
										?.className.match(/\blanguage-([\w+-]+)/u)?.[1] ||
									'',
					}),
				},
			],
			toDOM: (node) => {
				const language = String(attributes(node)['language'] || '')
					.replace(/[^\w+-]/gu, '')
					.slice(0, 40);
				return [
					'pre',
					{
						...(language ? { 'data-language': language } : {}),
						style: 'margin:0.75em 0;padding:16px;background:var(--editra-toolbar,#f7f9fc);border:1px solid var(--editra-border,#b8c2d0);border-radius:8px;white-space:pre;overflow-x:auto;tab-size:4',
					},
					[
						'code',
						{
							...(language ? { class: `language-${language}` } : {}),
							style: 'font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:0.9em',
						},
						0,
					],
				];
			},
		},
		horizontal_rule: {
			group: 'block',
			attrs: { style: { default: 'solid' }, weight: { default: 1 } },
			parseDOM: [
				{
					tag: 'hr',
					getAttrs: (dom) =>
						typeof dom === 'string'
							? false
							: {
									style: ['solid', 'dashed', 'dotted', 'double'].includes(
										dom.getAttribute('data-line-style') ??
											dom.style.borderTopStyle,
									)
										? (dom.getAttribute('data-line-style') ??
											dom.style.borderTopStyle)
										: 'solid',
									weight: Math.max(
										1,
										dimension(
											dom.getAttribute('data-line-weight') ??
												dom.style.borderTopWidth,
											1,
											8,
										),
									),
								},
				},
			],
			toDOM: (node) => [
				'hr',
				{
					'data-line-style': ['solid', 'dashed', 'dotted', 'double'].includes(
						String(attributes(node)['style']),
					)
						? attributes(node)['style']
						: 'solid',
					'data-line-weight': Math.max(1, dimension(attributes(node)['weight'], 1, 8)),
					style: `border:0;border-top:${Math.max(attributes(node)['style'] === 'double' ? 3 : 1, dimension(attributes(node)['weight'], 1, 8))}px ${['solid', 'dashed', 'dotted', 'double'].includes(String(attributes(node)['style'])) ? String(attributes(node)['style']) : 'solid'} currentColor;margin:16px 0`,
				},
			],
		},
		hard_break: {
			inline: true,
			group: 'inline',
			selectable: false,
			parseDOM: [{ tag: 'br' }],
			toDOM: () => ['br'],
		},
	};
	const simple: Record<string, string> = {
		bold: 'strong',
		italic: 'em',
		underline: 'u',
		strike: 's',
		subscript: 'sub',
		superscript: 'sup',
		code: 'code',
	};
	const marks: Record<string, MarkSpec> = {};
	for (const [name, tag] of Object.entries(simple))
		marks[name] = {
			parseDOM: [{ tag }],
			toDOM: () =>
				name === 'code'
					? [
							tag,
							{
								style: 'font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:0.9em;background:var(--editra-hover,#e9edf3);border:1px solid var(--editra-border,#b8c2d0);border-radius:4px;padding:0.1em 0.3em;box-decoration-break:clone',
							},
							0,
						]
					: [tag, 0],
			...(name === 'code' ? { code: true } : {}),
			...(name === 'subscript'
				? { excludes: 'superscript' }
				: name === 'superscript'
					? { excludes: 'subscript' }
					: {}),
		};
	marks['link'] = {
		attrs: { href: {}, newTab: { default: false } },
		inclusive: false,
		parseDOM: [
			{
				tag: 'a[href]',
				getAttrs: (dom) =>
					typeof dom === 'string'
						? false
						: safeUrl(dom.getAttribute('href'), config.security, true)
							? {
									href: safeUrl(dom.getAttribute('href'), config.security, true),
									newTab: dom.getAttribute('target') === '_blank',
								}
							: false,
			},
		],
		toDOM: (mark) => [
			'a',
			{
				href: safeUrl(attributes(mark)['href'], config.security, true) ?? '',
				...(attributes(mark)['newTab']
					? { target: '_blank', rel: 'noopener noreferrer' }
					: {}),
			},
			0,
		],
	};
	for (const name of ['color', 'highlight', 'font', 'size'])
		marks[name] = {
			attrs: { value: {} },
			parseDOM: [
				{
					style:
						name === 'color'
							? 'color'
							: name === 'highlight'
								? 'background-color'
								: name === 'font'
									? 'font-family'
									: 'font-size',
					getAttrs: (value) => {
						const checked =
							name === 'font'
								? safeFont(value)
								: name === 'size'
									? dimension(value, 0, 96)
									: safeColor(value);
						return checked ? { value: checked } : false;
					},
				},
			],
			toDOM: (mark) => {
				const value = attributes(mark)['value'];
				const style =
					name === 'color'
						? `color:${safeColor(value) ?? '#000000'}`
						: name === 'highlight'
							? `background-color:${safeColor(value) ?? '#ffffff'}`
							: name === 'font'
								? `font-family:${safeFont(value) ?? 'Arial'}`
								: `font-size:${dimension(value, 16, 96)}px`;
				return ['span', { style }, 0];
			},
		};
	let schema = new Schema({ nodes, marks });
	let expanded = addListNodes(schema.spec.nodes, 'paragraph block*', 'block');
	if (config.table?.enabled !== false) {
		const tables = tableNodes({
			tableGroup: 'block',
			cellContent: 'block+',
			cellAttributes: {
				background: {
					default: null,
					getFromDOM: (dom) => safeColor(dom.style.backgroundColor),
					setDOMAttr: (value: unknown, attrs) => {
						const color = safeColor(value);
						if (color) attrs['style'] = `background-color:${color}`;
					},
				},
			},
		});
		const table = tables['table'],
			row = tables['table_row'];
		if (table)
			tables['table'] = {
				...table,
				attrs: {
					width: { default: 100 },
					border: { default: 'solid' },
					borderWidth: { default: 1 },
					borderColor: { default: '#000000' },
				},
				parseDOM: [
					{
						tag: 'table',
						getAttrs: (dom) =>
							typeof dom === 'string'
								? false
								: {
										borderWidth: Math.max(
											1,
											dimension(dom.style.borderWidth, 1, 8),
										),
										borderColor: safeColor(dom.style.borderColor) ?? '#000000',
										width: dimension(
											dom.style.width.replace('%', ''),
											100,
											100,
										),
										border: [
											'solid',
											'dashed',
											'dotted',
											'double',
											'none',
										].includes(dom.style.borderStyle)
											? dom.style.borderStyle
											: 'solid',
									},
					},
				],
				toDOM: (node) => [
					'table',
					{
						style: `width:${dimension(attributes(node)['width'], 100, 100)}%;border:${Math.max(1, dimension(attributes(node)['borderWidth'], 1, 8))}px ${['solid', 'dashed', 'dotted', 'double', 'none'].includes(String(attributes(node)['border'])) ? String(attributes(node)['border']) : 'solid'} ${safeColor(attributes(node)['borderColor']) ?? '#000000'};border-collapse:collapse;table-layout:fixed;max-width:100%`,
					},
					['tbody', { style: 'border:inherit' }, 0],
				],
			};
		if (row)
			tables['table_row'] = {
				...row,
				attrs: { height: { default: 0 } },
				parseDOM: [
					{
						tag: 'tr',
						getAttrs: (dom) =>
							typeof dom === 'string'
								? false
								: { height: dimension(dom.style.height, 0, 2000) },
					},
				],
				toDOM: (node) => [
					'tr',
					dimension(attributes(node)['height'])
						? {
								style: `border:inherit;height:${dimension(attributes(node)['height'])}px`,
							}
						: { style: 'border:inherit' },
					0,
				],
			};
		for (const [name, tag] of [
			['table_cell', 'td'],
			['table_header', 'th'],
		] as const) {
			const cell = tables[name];
			if (cell)
				tables[name] = {
					...cell,
					toDOM: (node) => {
						const attrs = attributes(node),
							background = safeColor(attrs['background']);
						return [
							tag,
							{
								colspan: attrs['colspan'],
								rowspan: attrs['rowspan'],
								...(Array.isArray(attrs['colwidth'])
									? { 'data-colwidth': attrs['colwidth'].join(',') }
									: {}),
								style:
									'border:inherit;padding:8px;min-width:30px;vertical-align:top' +
									(Array.isArray(attrs['colwidth']) &&
									attrs['colwidth'].every(
										(width: unknown) => dimension(width) > 0,
									)
										? ';width:' +
											attrs['colwidth'].reduce(
												(sum: number, width: unknown) =>
													sum + dimension(width),
												0,
											) +
											'px'
										: '') +
									(background ? ';background-color:' + background : ''),
							},
							0,
						];
					},
				};
		}
		expanded = expanded.append(tables);
	}
	if (config.image?.enabled !== false)
		expanded = expanded.addToEnd('image', {
			group: 'block',
			atom: true,
			draggable: true,
			attrs: {
				src: {},
				alt: { default: '' },
				caption: { default: '' },
				width: { default: 0 },
				height: { default: 0 },
				align: { default: 'center' },
				fullWidth: { default: false },
				radius: { default: 0 },
				border: { default: 'none' },
				spacing: { default: 8 },
				wrap: { default: false },
				aspect: { default: true },
			},
			parseDOM: [
				{
					tag: 'figure[data-editra-image]',
					getAttrs: (dom) => {
						if (typeof dom === 'string') return false;
						const img = dom.querySelector('img');
						const src = safeUrl(img?.getAttribute('src'), config.security);
						if (!src || !img) return false;
						return {
							src,
							alt: img.getAttribute('alt') ?? '',
							caption: dom.querySelector('figcaption')?.textContent ?? '',
							width: dimension(img.getAttribute('width')),
							height: dimension(img.getAttribute('height')),
							align: alignment(dom.style.textAlign),
							fullWidth: dom.getAttribute('data-full-width') === 'true',
							radius: dimension(img.style.borderRadius, 0, 100),
							spacing: dimension(dom.style.marginTop || dom.style.margin, 8, 100),
							border:
								img.style.borderStyle === 'solid' ||
								img.style.borderStyle === 'dashed'
									? img.style.borderStyle
									: 'none',
							wrap: dom.getAttribute('data-wrap') === 'true',
							aspect: dom.getAttribute('data-aspect') !== 'false',
						};
					},
				},
				{
					tag: 'img[src]',
					getAttrs: (dom) =>
						typeof dom === 'string'
							? false
							: safeUrl(dom.getAttribute('src'), config.security)
								? {
										src: safeUrl(dom.getAttribute('src'), config.security),
										alt: dom.getAttribute('alt') ?? '',
										width: dimension(dom.getAttribute('width')),
										height: dimension(dom.getAttribute('height')),
									}
								: false,
				},
			],
			toDOM: (node) => {
				const a = attributes(node);
				const border =
					a['border'] === 'solid' || a['border'] === 'dashed'
						? `1px ${a['border']} currentColor`
						: 'none';
				const img: DOMOutputSpec = [
					'img',
					{
						src: safeUrl(a['src'], config.security) ?? '',
						alt: stringAttribute(node, 'alt'),
						loading: 'lazy',
						...(dimension(a['width']) ? { width: dimension(a['width']) } : {}),
						...(dimension(a['height']) ? { height: dimension(a['height']) } : {}),
						style: `${mediaDimensions(a)}border-radius:${dimension(a['radius'], 0, 100)}px;border:${border}`,
					},
				];
				return [
					'figure',
					{
						'data-editra-image': '',
						'data-aspect': a['aspect'] === false ? 'false' : 'true',
						'data-wrap': a['wrap'] === true ? 'true' : 'false',
						'data-full-width': a['fullWidth'] === true ? 'true' : 'false',
						style: mediaFigureStyle(a),
					},
					img,
					...(stringAttribute(node, 'caption')
						? [
								[
									'figcaption',
									{ style: 'width:0;min-width:100%;overflow-wrap:anywhere' },
									stringAttribute(node, 'caption'),
								] as DOMOutputSpec,
							]
						: []),
				];
			},
		});
	if (config.video?.enabled !== false)
		expanded = expanded.addToEnd('video', {
			group: 'block',
			atom: true,
			draggable: true,
			attrs: {
				url: {},
				caption: { default: '' },
				width: { default: 0 },
				height: { default: 0 },
				align: { default: 'center' },
				fullWidth: { default: false },
				controls: { default: true },
				aspect: { default: true },
			},
			parseDOM: [
				{
					tag: 'figure[data-editra-video]',
					getAttrs: (dom) => {
						if (typeof dom === 'string') return false;
						const url = dom.getAttribute('data-editra-video'),
							media = dom.querySelector('video,iframe');
						return resolveVideo(url, config.security, config.video?.providers)
							? {
									url,
									caption: dom.querySelector('figcaption')?.textContent ?? '',
									width: dimension(media?.getAttribute('width')),
									height: dimension(media?.getAttribute('height')),
									align: alignment(dom.style.textAlign),
									fullWidth: dom.getAttribute('data-full-width') === 'true',
									controls:
										media?.tagName !== 'VIDEO' ||
										media.hasAttribute('controls'),
									aspect: dom.getAttribute('data-aspect') !== 'false',
								}
							: false;
					},
				},
			],
			toDOM: (node) => {
				const a = attributes(node),
					video = resolveVideo(a['url'], config.security, config.video?.providers);
				if (!video) return ['p', 'Unsupported video'];
				const media: DOMOutputSpec = video.direct
					? [
							'video',
							{
								src: video.src,
								controls: a['controls'] !== false ? '' : null,
								preload: 'metadata',
								...(dimension(a['width']) ? { width: dimension(a['width']) } : {}),
								...(dimension(a['height'])
									? { height: dimension(a['height']) }
									: {}),
								style: mediaDimensions(a),
							},
						]
					: [
							'iframe',
							{
								src: video.src,
								title: stringAttribute(node, 'caption') || 'Embedded video',
								...(dimension(a['width']) ? { width: dimension(a['width']) } : {}),
								...(dimension(a['height'])
									? { height: dimension(a['height']) }
									: {}),
								loading: 'lazy',
								sandbox: 'allow-scripts allow-same-origin allow-presentation',
								allow: 'fullscreen; picture-in-picture',
								referrerpolicy: 'strict-origin-when-cross-origin',
								style: `${mediaDimensions(a, true)}border:0`,
							},
						];
				return [
					'figure',
					{
						'data-editra-video': video.original,
						'data-full-width': a['fullWidth'] === true ? 'true' : 'false',
						'data-aspect': a['aspect'] === false ? 'false' : 'true',
						style: mediaFigureStyle(a, !video.direct),
					},
					media,
					...(stringAttribute(node, 'caption')
						? [
								[
									'figcaption',
									{ style: 'width:0;min-width:100%;overflow-wrap:anywhere' },
									stringAttribute(node, 'caption'),
								] as DOMOutputSpec,
							]
						: []),
				];
			},
		});
	let expandedMarks = schema.spec.marks;
	for (const extension of extensions) {
		for (const [name, spec] of Object.entries(extension.nodes ?? {})) {
			if (expanded.get(name)) throw new Error(`Duplicate node: ${name}`);
			expanded = expanded.addToEnd(name, spec);
		}
		for (const [name, spec] of Object.entries(extension.marks ?? {})) {
			if (expandedMarks.get(name)) throw new Error(`Duplicate mark: ${name}`);
			expandedMarks = expandedMarks.addToEnd(name, spec);
		}
	}
	schema = new Schema({ nodes: expanded, marks: expandedMarks });
	return schema;
}
