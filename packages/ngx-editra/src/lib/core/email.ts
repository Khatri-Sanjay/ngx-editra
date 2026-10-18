import type { Node } from 'prosemirror-model';
import type { EditraConfig } from './types';
import { attributes, stringAttribute } from './attributes';
import { normalizeConfig } from './configuration';
import { parseHTML } from './content';
import { orderExtensions } from './engine';
import { createSchema } from './schema';
import { alignment, dimension, escapeHTML, safeColor, safeFont, safeUrl } from './security';

export interface EditraEmailOptions {
	readonly title?: string;
	readonly preheader?: string;
	/** Maximum outer content width in pixels, 360–800. Defaults to 600. */
	readonly width?: number;
	readonly language?: string;
}
export interface EditraEmailWarning {
	readonly code: string;
	readonly message: string;
}
export interface EditraEmailResult {
	/** Complete email HTML document, not an Angular template. */
	readonly html: string;
	/** Alternative MIME text body. The caller supplies transport and headers. */
	readonly text: string;
	readonly warnings: readonly EditraEmailWarning[];
}

/** Conservative email export. No DOM, network requests or extension serializers are used. */
export function exportEmail(
	html: string,
	options: EditraEmailOptions = {},
	config: EditraConfig = {},
): EditraEmailResult {
	const width = options.width ?? 600;
	if (!Number.isInteger(width) || width < 360 || width > 800)
		throw new RangeError('Email width must be an integer from 360 to 800');
	const language = options.language ?? 'en';
	if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/iu.test(language))
		throw new Error('Invalid email language');
	const normalized = normalizeConfig(config);
	const extensions = orderExtensions(normalized.extensions ?? []);
	const doc = parseHTML(html, createSchema(normalized, extensions), {
		...normalized,
		extensions,
	});
	const warnings = new Map<string, EditraEmailWarning>();
	const warn = (code: string, message: string): void => {
		warnings.set(code, { code, message });
	};
	const font =
		'font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:#182338;';
	const table = 'border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;';
	const contentWidth = width - 40;
	function children(
		node: Node,
		available: number,
		border = '1px solid #b8c2d0',
		tableColumns = 0,
	): string {
		const result: string[] = [];
		node.forEach((child) => result.push(render(child, available, border, tableColumns)));
		return result.join('');
	}
	function text(node: Node): string {
		if (node.isText) {
			let value = node.text ?? '';
			const link = node.marks.find((mark) => mark.type.name === 'link');
			const href = link && safeUrl(attributes(link)['href'], normalized.security, true);
			if (href && value !== href) value += ` (${href})`;
			return value;
		}
		const a = attributes(node);
		if (node.type.name === 'image' || node.type.name === 'video')
			return (
				[
					stringAttribute(node, 'alt'),
					stringAttribute(node, 'caption'),
					safeUrl(a[node.type.name === 'video' ? 'url' : 'src'], normalized.security),
				]
					.filter(Boolean)
					.join('\n') + '\n'
			);
		if (node.type.name === 'hard_break') return '\n';
		if (node.type.name === 'horizontal_rule') return '\n---\n';
		const parts: string[] = [];
		node.forEach((child, _offset, index) => {
			const prefix =
				node.type.name === 'bullet_list'
					? '- '
					: node.type.name === 'ordered_list'
						? `${dimension(a['order'], 1, 100000) + index}. `
						: '';
			parts.push(prefix + (node.isTextblock ? text(child) : text(child).trimEnd()));
		});
		const inline = node.isTextblock;
		return (
			parts.join(inline ? '' : node.type.name === 'table_row' ? '\t' : '\n') +
			(inline ? '\n' : '')
		);
	}
	function render(node: Node, available: number, border: string, tableColumns = 0): string {
		const a = attributes(node);
		const name = node.type.name;
		if (node.isText) {
			let value = escapeHTML(node.text ?? '');
			for (const mark of [...node.marks].reverse()) {
				const kind = mark.type.name;
				const attrs = attributes(mark);
				const tags: Record<string, string> = {
					bold: 'strong',
					italic: 'em',
					underline: 'u',
					strike: 's',
					subscript: 'sub',
					superscript: 'sup',
				};
				if (tags[kind]) value = `<${tags[kind]}>${value}</${tags[kind]}>`;
				else if (kind === 'link') {
					const href = safeUrl(attrs['href'], normalized.security, true);
					if (href)
						value = `<a href="${escapeHTML(href)}" style="color:#1763d1;text-decoration:underline;">${value}</a>`;
				} else if (kind === 'color' || kind === 'highlight') {
					const colour = safeColor(attrs['value']);
					if (colour)
						value = `<span style="${kind === 'color' ? 'color' : 'background-color'}:${colour};">${value}</span>`;
				} else if (kind === 'size') {
					const size = Math.max(8, dimension(attrs['value'], 16, 96));
					value = `<span style="font-size:${size}px;line-height:${Math.round(size * 1.5)}px;">${value}</span>`;
				} else if (kind === 'font') {
					const rawFont = safeFont(attrs['value']);
					const selected = rawFont === 'monospace' ? 'Courier New' : rawFont;
					const supported = [
						'Arial',
						'Helvetica',
						'Verdana',
						'Tahoma',
						'Georgia',
						'Times New Roman',
						'Courier New',
						'Trebuchet MS',
					];
					if (selected && supported.includes(selected))
						value = `<span style="font-family:${escapeHTML(selected)},${selected === 'Courier New' ? 'monospace' : selected === 'Georgia' || selected === 'Times New Roman' ? 'serif' : 'Arial,sans-serif'};">${value}</span>`;
					else warn('font-fallback', 'Custom fonts use the email default font.');
				} else if (kind === 'code')
					value = `<code style="font-family:Courier New,monospace;background-color:#f1f3f7;">${value}</code>`;
				else
					warn(
						`mark-${kind}`,
						`Unsupported mark ${kind} was omitted; text was preserved.`,
					);
			}
			return value;
		}
		if (name === 'image') {
			const src = safeUrl(a['src'], normalized.security);
			if (!src) return '';
			warn(
				'remote-images',
				'Images use external URLs; recipients may block them. Provide useful alternative text.',
			);
			if (/\.svg(?:$|[?#])/iu.test(src))
				warn(
					'svg-image',
					'SVG image support varies; use a hosted PNG, JPEG or GIF for broader email compatibility.',
				);
			if (a['wrap']) warn('image-wrap', 'Image text wrapping was removed for email.');
			const original = dimension(a['width']);
			const imageWidth = Math.max(
				1,
				Math.min(available, a['fullWidth'] ? available : original || available),
			);
			const height =
				original && dimension(a['height'])
					? Math.max(1, Math.round((dimension(a['height']) * imageWidth) / original))
					: 0;
			const align = alignment(a['align']);
			const margin = align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0';
			return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${table}"><tr><td align="${align}" style="padding:8px 0;${font}"><img src="${escapeHTML(src)}" alt="${escapeHTML(stringAttribute(node, 'alt'))}" width="${imageWidth}"${height ? ` height="${height}"` : ''} style="display:block;border:0;width:100%;max-width:${imageWidth}px;height:auto;margin:${margin};">${a['caption'] ? `<p style="${font}font-size:13px;line-height:20px;margin:8px 0 0;">${escapeHTML(stringAttribute(node, 'caption'))}</p>` : ''}</td></tr></table>`;
		}
		if (name === 'video') {
			warn('video-link', 'Embedded videos were replaced with links.');
			const href = safeUrl(a['url'], normalized.security);
			const label = stringAttribute(node, 'caption') || 'Watch video';
			return href
				? `<p style="${font}margin:0 0 12px;"><a href="${escapeHTML(href)}" style="color:#1763d1;text-decoration:underline;">${escapeHTML(label)}</a></p>`
				: '';
		}
		if (name === 'content_columns') {
			warn(
				'columns-stacked',
				'Columns were stacked in reading order for narrow screens and email clients.',
			);
			return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${table}">${children(node, available, border)}</table>`;
		}
		if (name === 'content_column')
			return `<tr><td valign="top" style="${font}padding:0 0 12px;">${children(node, available, border)}</td></tr>`;
		if (name === 'table') {
			const style = ['solid', 'dashed', 'dotted', 'double', 'none'].includes(
				String(a['border']),
			)
				? String(a['border'])
				: 'solid';
			const edge = `${Math.max(1, dimension(a['borderWidth'], 1, 8))}px ${style} ${safeColor(a['borderColor']) ?? '#000000'}`;
			const percent = Math.max(1, dimension(a['width'], 100, 100));
			let columns = 0;
			node.firstChild?.forEach(
				(cell) => (columns += Math.max(1, dimension(attributes(cell)['colspan'], 1, 100))),
			);
			return `<table width="${percent}%" cellpadding="0" cellspacing="0" border="0" style="${table}width:${percent}%;table-layout:fixed;border:${edge};margin:12px 0;"><tbody>${children(node, Math.floor((available * percent) / 100), edge, columns)}</tbody></table>`;
		}
		if (name === 'table_row') {
			if (a['height'])
				warn(
					'row-heights',
					'Fixed table row heights were omitted so email text can expand.',
				);
			let columns = tableColumns;
			if (!columns)
				node.forEach(
					(cell) =>
						(columns += Math.max(1, dimension(attributes(cell)['colspan'], 1, 100))),
				);
			const cells: string[] = [];
			node.forEach((cell) => {
				const attrs = attributes(cell);
				const colspan = Math.max(1, dimension(attrs['colspan'], 1, 100));
				const rowspan = Math.max(1, dimension(attrs['rowspan'], 1, 100));
				const tag = cell.type.name === 'table_header' ? 'th' : 'td';
				const background = safeColor(attrs['background']);
				if (attrs['colwidth'])
					warn(
						'table-widths',
						'Custom cell widths were normalized for the email container.',
					);
				cells.push(
					`<${tag} colspan="${colspan}" rowspan="${rowspan}" valign="top"${background ? ` bgcolor="${background}"` : ''} style="${font}text-align:left;border:${border};padding:8px;word-wrap:break-word;${background ? `background-color:${background};` : ''}">${children(cell, Math.max(1, Math.floor((available * colspan) / Math.max(1, columns)) - 16), border)}</${tag}>`,
				);
			});
			return `<tr>${cells.join('')}</tr>`;
		}
		const inner = children(node, available, border);
		if (name === 'doc') return inner;
		if (name === 'hard_break') return '<br>';
		if (name === 'paragraph' || name === 'heading') {
			const level = Math.max(1, dimension(a['level'], 1, 6));
			const size = name === 'heading' ? ([32, 26, 22, 20, 18, 16][level - 1] ?? 16) : 16;
			const tag = name === 'heading' ? `h${level}` : 'p';
			const line =
				typeof a['lineHeight'] === 'number'
					? Math.max(1, Math.min(3, a['lineHeight']))
					: 1.5;
			return `<${tag} style="${font}font-size:${size}px;line-height:${Math.round(size * line)}px;text-align:${alignment(a['align'])};margin:0 0 12px ${dimension(a['indent'], 0, 8) * 24}px;">${inner || '<br>'}</${tag}>`;
		}
		if (name === 'bullet_list' || name === 'ordered_list') {
			const tag = name === 'bullet_list' ? 'ul' : 'ol';
			return `<${tag}${tag === 'ol' ? ` start="${Math.max(1, dimension(a['order'], 1, 100000))}"` : ''} style="${font}margin:0 0 12px;padding-left:24px;">${inner}</${tag}>`;
		}
		if (name === 'list_item') return `<li style="${font}margin:0 0 4px;">${inner}</li>`;
		if (name === 'blockquote')
			return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${table}"><tr><td style="${font}border-left:3px solid #b8c2d0;background-color:#f7f9fc;padding:12px 16px;">${inner}</td></tr></table>`;
		if (name === 'code_block') {
			warn(
				'code-wrapping',
				'Code is static text; wrapping and spacing can differ between email clients.',
			);
			const code = escapeHTML(node.textContent)
				.replace(/\t/g, '    ')
				.replace(/ /g, '&#160;')
				.replace(/\r\n?|\n/g, '<br>');
			return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${table}"><tr><td style="font-family:Courier New,monospace;font-size:14px;line-height:21px;color:#182338;background-color:#f1f3f7;padding:16px;word-break:break-all;">${code}</td></tr></table>`;
		}
		if (name === 'horizontal_rule')
			return '<hr style="border:0;border-top:1px solid #b8c2d0;margin:16px 0;">';
		warn(`node-${name}`, `Unsupported node ${name} was flattened to its supported content.`);
		return inner;
	}
	const content = render(doc, contentWidth, '1px solid #b8c2d0');
	const preheader = options.preheader
		? `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHTML(options.preheader)}</div>`
		: '';
	const result = `<!doctype html><html lang="${language}" xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHTML(options.title ?? 'Message')}</title></head><body style="margin:0;padding:0;background-color:#f2f4f7;">${preheader}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2f4f7" style="${table}"><tr><td align="center" style="padding:20px 0;"><!--[if mso]><table role="presentation" width="${width}" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="${table}width:100%;max-width:${width}px;"><tr><td style="${font}padding:20px;word-wrap:break-word;">${content}</td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></body></html>`;
	if (new TextEncoder().encode(result).length > 100_000)
		warn('large-html', 'Exported HTML exceeds 100 KB; some clients may clip long messages.');
	return { html: result, text: text(doc).trim(), warnings: [...warnings.values()] };
}
