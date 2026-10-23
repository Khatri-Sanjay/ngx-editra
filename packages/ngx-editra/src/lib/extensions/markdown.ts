import {
	defaultMarkdownParser,
	defaultMarkdownSerializer,
	MarkdownSerializer,
} from 'prosemirror-markdown';
import type { Node, Schema } from 'prosemirror-model';
import { parseHTML, serializeHTML } from '../core/public-api';
import type { EditraConfig } from '../core/public-api';

/** CommonMark import. Unsupported Markdown extensions are treated as plain text. */
export function importMarkdown(markdown: string, schema: Schema, config: EditraConfig = {}): Node {
	return parseHTML(serializeHTML(defaultMarkdownParser.parse(markdown)), schema, config);
}
/** Unsupported Markdown formatting is exported as safe HTML; round trips are not lossless. */
export function exportMarkdown(doc: Node): string {
	const serializer = new MarkdownSerializer(
		{
			...defaultMarkdownSerializer.nodes,
			image: (state, node) => {
				state.write(serializeHTML(node));
				state.closeBlock(node);
			},
			video: (state, node) => {
				state.write(serializeHTML(node));
				state.closeBlock(node);
			},
			table: (state, node) => {
				state.write(serializeHTML(node));
				state.closeBlock(node);
			},
			content_columns: (state, node) => {
				state.write(serializeHTML(node));
				state.closeBlock(node);
			},
		},
		{
			...defaultMarkdownSerializer.marks,
			bold: defaultMarkdownSerializer.marks['strong'] ?? {
				open: '**',
				close: '**',
				mixable: true,
			},
			italic: defaultMarkdownSerializer.marks['em'] ?? {
				open: '*',
				close: '*',
				mixable: true,
			},
			underline: { open: '<u>', close: '</u>' },
			strike: { open: '<s>', close: '</s>' },
			subscript: { open: '<sub>', close: '</sub>' },
			superscript: { open: '<sup>', close: '</sup>' },
			color: { open: '', close: '' },
			highlight: { open: '', close: '' },
			font: { open: '', close: '' },
			size: { open: '', close: '' },
		},
	);
	return serializer.serialize(doc);
}
