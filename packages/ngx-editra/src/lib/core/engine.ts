import { EditorState, TextSelection } from 'prosemirror-state';
import type { Command, Transaction } from 'prosemirror-state';
import type { Node, Schema } from 'prosemirror-model';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, chainCommands, exitCode } from 'prosemirror-commands';
import { splitListItem } from 'prosemirror-schema-list';
import { tableEditing, goToNextCell, fixTables } from 'prosemirror-tables';
import { createSchema } from './schema';
import { createCommands } from './commands';
import { parseHTML, serializeHTML, documentJSON, plainText, parseJSON } from './content';
import { automaticLinks } from './plugins';
import { tableResizing } from './table-resizing';
import { normalizeConfig } from './configuration';
import type { EditraConfig, EditraDocument, EditraExtension, EditraCounts } from './types';

export function orderExtensions(
	extensions: readonly EditraExtension[],
): readonly EditraExtension[] {
	const ids = new Map<string, EditraExtension>(),
		result: EditraExtension[] = [],
		visiting = new Set<string>();
	for (const ext of extensions) {
		if (ids.has(ext.id)) throw new Error(`Duplicate extension: ${ext.id}`);
		ids.set(ext.id, ext);
	}
	function visit(ext: EditraExtension): void {
		if (result.includes(ext)) return;
		if (visiting.has(ext.id)) throw new Error(`Circular extension dependency: ${ext.id}`);
		visiting.add(ext.id);
		for (const id of ext.requires ?? []) {
			const dependency = ids.get(id);
			if (!dependency) throw new Error(`Missing extension: ${id}`);
			visit(dependency);
		}
		visiting.delete(ext.id);
		result.push(ext);
	}
	for (const ext of extensions) visit(ext);
	return result;
}
/** Model owner. Safe to construct in Node/SSR; browser views are attached separately. */
export class EditraEngine {
	readonly schema: Schema;
	readonly commands: Readonly<Record<string, Command>>;
	readonly extensions: readonly EditraExtension[];
	private editorState: EditorState;
	get state(): EditorState {
		return this.editorState;
	}
	dirty = false;
	readonly config: EditraConfig;
	constructor(config: EditraConfig = {}, html = '') {
		const normalized = normalizeConfig(config);
		this.extensions = orderExtensions(normalized.extensions ?? []);
		this.config = { ...normalized, extensions: this.extensions };
		config = this.config;
		this.schema = createSchema(config, this.extensions);
		const commands = { ...createCommands(this.schema) };
		for (const ext of this.extensions)
			for (const [id, command] of Object.entries(ext.commands?.(this.schema) ?? {})) {
				if (commands[id]) throw new Error(`Duplicate command: ${id}`);
				commands[id] = command;
			}
		this.commands = commands;
		const shortcuts: Record<string, Command> = {};
		for (const [key, id] of Object.entries({
			'Mod-b': 'bold',
			'Mod-i': 'italic',
			'Mod-u': 'underline',
			'Mod-z': 'undo',
			'Shift-Mod-z': 'redo',
			'Mod-y': 'redo',
			'Mod-]': 'indent',
			'Mod-[': 'outdent',
		})) {
			const command = commands[id];
			if (command) shortcuts[key] = command;
		}
		const item = this.schema.nodes['list_item'];
		if (item)
			shortcuts['Enter'] = chainCommands(
				splitListItem(item),
				baseKeymap['Enter'] ?? (() => false),
			);
		shortcuts['Mod-Enter'] = exitCode;
		const hardBreak = this.schema.nodes['hard_break'];
		if (hardBreak)
			shortcuts['Shift-Enter'] = (state, dispatch) => {
				if (dispatch)
					dispatch(state.tr.replaceSelectionWith(hardBreak.create()).scrollIntoView());
				return true;
			};
		if (config.table?.enabled !== false) {
			shortcuts['Tab'] = goToNextCell(1);
			shortcuts['Shift-Tab'] = goToNextCell(-1);
		}
		for (const ext of this.extensions)
			for (const [key, command] of Object.entries(ext.shortcuts?.(this.schema) ?? {})) {
				if (shortcuts[key]) throw new Error(`Duplicate shortcut: ${key}`);
				shortcuts[key] = command;
			}
		this.editorState = EditorState.create({
			schema: this.schema,
			doc: parseHTML(html, this.schema, config),
			plugins: [
				history(),
				keymap(shortcuts),
				keymap(baseKeymap),
				automaticLinks(this.schema, config.security),
				...(config.table?.enabled !== false ? [tableResizing(), tableEditing()] : []),
				...this.extensions.flatMap((ext) => [...(ext.plugins?.(this.schema) ?? [])]),
			],
		});
		const repair = fixTables(this.state);
		if (repair) this.editorState = this.state.apply(repair);
	}
	apply(transaction: Transaction): boolean {
		const result = this.state.applyTransaction(transaction);
		this.editorState = result.state;
		const changed = result.transactions.some((tr) => tr.docChanged);
		if (changed) this.dirty = true;
		return changed;
	}
	setHTML(html: string): void {
		this.replace(parseHTML(html, this.schema, this.config));
	}
	setJSON(value: EditraDocument): void {
		this.replace(parseJSON(value, this.schema, this.config));
	}
	private replace(doc: Node): void {
		// Programmatic values reset history and dirty state, preserving a bounded cursor position.
		const position = Math.min(this.state.selection.from, Math.max(1, doc.content.size - 1));
		this.editorState = EditorState.create({
			schema: this.schema,
			doc,
			plugins: this.state.plugins,
			selection: TextSelection.near(doc.resolve(position)),
		});
		const repair = fixTables(this.state);
		if (repair) this.editorState = this.state.apply(repair);
		this.dirty = false;
	}
	getHTML(): string {
		return serializeHTML(this.state.doc);
	}
	getJSON(): EditraDocument {
		return documentJSON(this.state.doc);
	}
	getText(): string {
		return plainText(this.state.doc);
	}
	isEmpty(): boolean {
		let meaningful = false;
		this.state.doc.descendants((node) => {
			if (
				(node.isText && node.text?.trim()) ||
				(node.isAtom && !node.isText && node.type.name !== 'hard_break')
			)
				meaningful = true;
		});
		return !meaningful;
	}
	counts(): EditraCounts {
		const text = this.getText();
		return {
			words: text.trim() ? text.trim().split(/\s+/u).length : 0,
			characters: Array.from(text).length,
		};
	}
	find(
		query: string,
		caseSensitive = false,
	): readonly { readonly from: number; readonly to: number }[] {
		if (!query) return [];
		const found: { from: number; to: number }[] = [];
		const expression = new RegExp(
			query.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'),
			caseSensitive ? 'gu' : 'giu',
		);
		this.state.doc.descendants((node, pos) => {
			if (!node.isTextblock) return;
			const text = node.textBetween(0, node.content.size, '', '\ufffc');
			for (const match of text.matchAll(expression))
				found.push({
					from: pos + 1 + match.index,
					to: pos + 1 + match.index + match[0].length,
				});
			return false;
		});
		return found;
	}
}
