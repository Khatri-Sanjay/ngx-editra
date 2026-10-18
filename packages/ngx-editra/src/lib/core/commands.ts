import type { Schema, MarkType } from 'prosemirror-model';
import type { Command, EditorState } from 'prosemirror-state';
import { toggleMark, setBlockType, wrapIn, lift } from 'prosemirror-commands';
import { wrapInList, sinkListItem, liftListItem } from 'prosemirror-schema-list';
import { undo, redo } from 'prosemirror-history';
import {
	addColumnAfter,
	addColumnBefore,
	addRowAfter,
	addRowBefore,
	deleteColumn,
	deleteRow,
	deleteTable,
	mergeCells,
	splitCell,
	toggleHeaderRow,
	toggleHeaderColumn,
	setCellAttr,
} from 'prosemirror-tables';
import { attributes } from './attributes';
import { safeColor } from './security';
import { fitTableToPage, distributeTableColumns, resetTableRowHeights } from './table-dimensions';

export function markActive(state: EditorState, mark: MarkType): boolean {
	return state.selection.empty
		? mark.isInSet(state.storedMarks ?? state.selection.$from.marks()) !== undefined
		: state.doc.rangeHasMark(state.selection.from, state.selection.to, mark);
}
export function markStatus(state: EditorState, mark: MarkType): boolean | 'mixed' {
	if (state.selection.empty) return markActive(state, mark);
	let marked = false,
		unmarked = false;
	state.selection.ranges.forEach(({ $from, $to }) =>
		state.doc.nodesBetween($from.pos, $to.pos, (node) => {
			if (!node.isText) return;
			if (mark.isInSet(node.marks)) marked = true;
			else unmarked = true;
		}),
	);
	return marked && unmarked ? 'mixed' : marked;
}
export function setParagraphAttribute(
	key: 'align' | 'indent' | 'lineHeight',
	value: string | number,
): Command {
	return (state, dispatch) => {
		const tr = state.tr;
		state.selection.ranges.forEach(({ $from, $to }) =>
			state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
				if (
					node.type.name === 'paragraph' ||
					node.type.name === 'heading' ||
					(key === 'align' &&
						value !== 'justify' &&
						(node.type.name === 'image' || node.type.name === 'video'))
				)
					tr.setNodeMarkup(pos, undefined, { ...attributes(node), [key]: value });
			}),
		);
		if (!tr.docChanged) return false;
		if (dispatch) dispatch(tr.scrollIntoView());
		return true;
	};
}
export function createCommands(schema: Schema): Readonly<Record<string, Command>> {
	const commands: Record<string, Command> = {
		undo,
		redo,
		lift,
		clear: (state, dispatch) => {
			if (dispatch) {
				const tr = state.tr.setStoredMarks([]);
				for (const { $from, $to } of state.selection.ranges)
					tr.removeMark($from.pos, $to.pos);
				state.selection.ranges.forEach(({ $from, $to }) =>
					state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
						if (node.type.name === 'paragraph' || node.type.name === 'heading') {
							const attrs = attributes(node);
							if (
								attrs['align'] !== 'left' ||
								attrs['indent'] !== 0 ||
								attrs['lineHeight'] !== 1.5
							)
								tr.setNodeMarkup(pos, undefined, {
									...attrs,
									align: 'left',
									indent: 0,
									lineHeight: 1.5,
								});
						}
					}),
				);
				dispatch(tr);
			}
			return true;
		},
	};
	for (const [name, type] of Object.entries(schema.marks))
		if (name !== 'link' && !['font', 'size', 'color', 'highlight'].includes(name))
			commands[name] = toggleMark(type);
	const paragraph = schema.nodes['paragraph'],
		heading = schema.nodes['heading'],
		listItem = schema.nodes['list_item'];
	if (paragraph) commands['paragraph'] = setBlockType(paragraph);
	if (heading)
		for (let level = 1; level <= 6; level++)
			commands[`h${level}`] = setBlockType(heading, { level });
	for (const name of ['bullet_list', 'ordered_list', 'blockquote']) {
		const type = schema.nodes[name];
		if (type) commands[name] = name === 'blockquote' ? wrapIn(type) : wrapInList(type);
	}
	const code = schema.nodes['code_block'];
	if (code) commands['code_block'] = setBlockType(code);
	for (const align of ['left', 'center', 'right', 'justify'])
		commands[`align_${align}`] = setParagraphAttribute('align', align);
	for (const [name, delta] of [
		['indent', 1],
		['outdent', -1],
	] as const)
		commands[name] = (state, dispatch, view) => {
			if (
				listItem &&
				(delta > 0 ? sinkListItem(listItem) : liftListItem(listItem))(state, dispatch, view)
			)
				return true;
			const tr = state.tr;
			for (const { $from, $to } of state.selection.ranges)
				state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
					if (node.type.name !== 'paragraph' && node.type.name !== 'heading') return;
					const attrs = attributes(node),
						indent = Number(attrs['indent']) || 0;
					tr.setNodeMarkup(pos, undefined, {
						...attrs,
						indent: Math.max(0, Math.min(8, indent + delta)),
					});
				});
			if (!tr.docChanged) return false;
			if (dispatch) dispatch(tr.scrollIntoView());
			return true;
		};
	const rule = schema.nodes['horizontal_rule'];
	if (rule)
		commands['horizontal_rule'] = (state, dispatch) => {
			if (dispatch) dispatch(state.tr.replaceSelectionWith(rule.create()).scrollIntoView());
			return true;
		};
	Object.assign(commands, {
		fitTableToPage,
		distributeTableColumns,
		resetTableRowHeights,
		addColumnAfter,
		addColumnBefore,
		addRowAfter,
		addRowBefore,
		deleteColumn,
		deleteRow,
		deleteTable,
		mergeCells,
		splitCell,
		toggleHeaderRow,
		toggleHeaderColumn,
	});
	return commands;
}
export function cellBackground(value: string): Command {
	return setCellAttr('background', safeColor(value));
}
export function tableAttribute(
	nodeType: 'table' | 'table_row',
	key: 'width' | 'border' | 'height' | 'borderWidth' | 'borderColor',
	value: string | number,
): Command {
	return (state, dispatch) => {
		const position = state.selection.$from;
		for (let depth = position.depth; depth > 0; depth--)
			if (position.node(depth).type.name === nodeType) {
				if (dispatch)
					dispatch(
						state.tr.setNodeMarkup(position.before(depth), undefined, {
							...attributes(position.node(depth)),
							[key]: key === 'borderColor' ? (safeColor(value) ?? '#000000') : value,
						}),
					);
				return true;
			}
		return false;
	};
}
