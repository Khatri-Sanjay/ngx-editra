import { openToolbarPopup } from '../../utils/popup-behavior';
import type { TextPiece, TextCase } from '../../utils/text-case';
import { lockPageScroll } from '../../utils/page-scroll-lock';
import { ColumnsNodeView } from '../../node-views/columns-node-view';
import { CodeBlockNodeView } from '../../node-views/code-block-node-view';
import { NgxEditraViewerComponent } from '../ngx-editra-viewer/ngx-editra-viewer.component';
import {
	afterNextRender,
	Component,
	EventEmitter,
	forwardRef,
	inject,
	Input,
	NgZone,
	Output,
	ViewChild,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	ViewEncapsulation,
	booleanAttribute,
	Injector,
} from '@angular/core';
import type { ElementRef } from '@angular/core';
import type { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import type {
	AbstractControl,
	ControlValueAccessor,
	ValidationErrors,
	Validator,
} from '@angular/forms';
import type { EditorView, NodeViewConstructor } from 'prosemirror-view';
import { TextSelection, NodeSelection } from 'prosemirror-state';
import type { Selection, Transaction } from 'prosemirror-state';
import type { Mark, Node as ProseMirrorNode } from 'prosemirror-model';
import { CellSelection } from 'prosemirror-tables';
import { closeHistory } from 'prosemirror-history';
import {
	cellBackground,
	setTableWidthPercent,
	tableAttribute,
	serializeHTML,
	attributes,
	dimension,
	EditraEngine,
	markStatus,
	setParagraphAttribute,
	safeColor,
	safeFont,
	safeUrl,
	validateUrl,
	resolveVideo,
} from '../../core/public-api';
import type {
	EditraChange,
	EditraConfig,
	EditraDocument,
	EditraTransactionState,
} from '../../core/public-api';
import {
	imageExtension,
	videoExtension,
	importMarkdown,
	exportMarkdown,
} from '../../extensions/public-api';
import { EditraToolbarComponent, defaultToolbar } from '../editra-toolbar/editra-toolbar.component';
import { EditraIconComponent } from '../editra-icon/editra-icon.component';
import { EditraColourPickerComponent } from '../editra-colour-picker/editra-colour-picker.component';
import { observePopover } from '../../utils/popover-position';
import { EDITRA_CONFIG, EDITRA_DIALOG_PRESENTER } from '../../config/editra.config';
import { EditraTableGridComponent } from '../editra-table-grid/editra-table-grid.component';
import { EditraMenuComponent } from '../editra-menu/editra-menu.component';

type DialogKind = 'link' | 'image' | 'video' | 'table' | 'find' | 'tableContext';
interface DialogValues {
	url: string;
	alt: string;
	caption: string;
	width: number | null;
	height: number | null;
	fullWidth: boolean;
	align: string;
	radius: number;
	border: string;
	spacing: number;
	wrap: boolean;
	rows: number;
	columns: number;
	query: string;
	replacement: string;
	newTab: boolean;
	aspect: boolean;
	controls: boolean;
}
const dialogDefaults = (): DialogValues => ({
	url: '',
	alt: '',
	caption: '',
	width: null,
	height: null,
	fullWidth: false,
	align: 'center',
	radius: 0,
	border: 'none',
	spacing: 8,
	wrap: false,
	rows: 3,
	columns: 3,
	query: '',
	replacement: '',
	newTab: true,
	aspect: true,
	controls: true,
});

/** Standalone, HTML-valued Angular Forms adapter. Editing is activated only after browser render. */
@Component({
	selector: 'ngx-editra',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	// ProseMirror creates DOM outside Angular's template. All rules are host-prefixed.
	encapsulation: ViewEncapsulation.None,
	imports: [
		NgxEditraViewerComponent,
		FormsModule,
		EditraToolbarComponent,
		EditraIconComponent,
		EditraColourPickerComponent,
		EditraTableGridComponent,
		EditraMenuComponent,
	],
	host: {
		ngSkipHydration: 'true',
		'[class.editra-dark]': 'config.theme === "dark"',
		'[class.editra-auto]': 'config.theme === "auto"',
		'[class.editra-fullscreen]': 'fullscreen',
		'(focusin)': 'handleFocus()',
		'(focusout)': 'handleBlur($event)',
		'(keydown.escape)': 'exitFullscreen()',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NgxEditraComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => NgxEditraComponent),
			multi: true,
		},
	],
	templateUrl: './ngx-editra.component.html',
	styleUrl: './ngx-editra.component.scss',
})
export class NgxEditraComponent implements ControlValueAccessor, Validator, OnChanges, OnDestroy {
	@Input() config: EditraConfig = inject(EDITRA_CONFIG);
	@Input({ transform: booleanAttribute }) readonly = false;
	@Input({ transform: booleanAttribute }) required = false;
	@Output() readonly contentChange = new EventEmitter<EditraChange>();
	@Output() readonly selectionChange = new EventEmitter<{
		readonly from: number;
		readonly to: number;
	}>();
	@Output() readonly editorFocus = new EventEmitter<void>();
	@Output() readonly editorBlur = new EventEmitter<void>();
	@Output() readonly editorReady = new EventEmitter<void>();
	@Output() readonly editorDestroyed = new EventEmitter<void>();
	@Output() readonly editorError = new EventEmitter<Error>();
	@Output() readonly dirtyChange = new EventEmitter<boolean>();
	@Output() readonly transactionState = new EventEmitter<EditraTransactionState>();
	@ViewChild('surface', { static: true }) private surface!: ElementRef<HTMLElement>;
	@ViewChild('dialog', { static: true }) private dialog!: ElementRef<HTMLDialogElement>;
	private readonly zone = inject(NgZone);
	private readonly changeDetector = inject(ChangeDetectorRef);
	private readonly injector = inject(Injector);
	private readonly dialogPresenter = inject(EDITRA_DIALOG_PRESENTER);
	private engine = new EditraEngine({
		...this.config,
		extensions: this.config.extensions ?? [imageExtension(), videoExtension()],
	});
	private view: EditorView | undefined;
	private destroyed = false;
	private focused = false;
	private savedSelection: Selection | undefined;
	private colourSelection:
		| {
				readonly kind: 'color' | 'highlight' | 'background' | 'border';
				readonly selection: Selection;
				readonly document: ProseMirrorNode;
		  }
		| undefined;
	private tablePickerEvents: AbortController | undefined;
	private onChange: (value: string) => void = () => {};
	private onTouched: () => void = () => {};
	private onValidatorChange: () => void = () => {};
	disabled = false;
	ready = false;
	fullscreen = false;
	private stickyOverride: boolean | undefined;
	get toolbarSticky(): boolean {
		return this.stickyOverride ?? this.config.toolbar?.sticky ?? false;
	}
	toggleStickyToolbar(): void {
		this.stickyOverride = !this.toolbarSticky;
		this.announcement = this.toolbarSticky ? 'Toolbar pinned' : 'Toolbar unpinned';
	}
	dialogKind: DialogKind = 'link';
	values = dialogDefaults();
	error = '';
	announcement = '';
	matchIndex = -1;
	readonly dialogKinds: readonly DialogKind[] = ['link', 'image', 'video', 'table'];
	readonly fonts = ['Arial', 'Georgia', 'Verdana', 'Times New Roman', 'monospace'];
	private nodeViews(): Record<string, NodeViewConstructor> {
		const result: Record<string, NodeViewConstructor> = {
			code_block: (node, view, getPos) => new CodeBlockNodeView(node, view, getPos),
			content_columns: (node, view, getPos) => new ColumnsNodeView(node, view, getPos),
		};
		for (const ext of this.engine.extensions)
			for (const [name, factory] of Object.entries(ext.nodeViews ?? {})) {
				if (result[name]) throw new Error(`Duplicate node view: ${name}`);
				result[name] = factory;
			}
		return result;
	}
	get toolbarItems() {
		return [
			...(this.config.toolbar?.items ?? defaultToolbar),
			...this.engine.extensions.flatMap((ext) => [...(ext.toolbar ?? [])]),
		].filter((item) => !this.config.toolbar?.hiddenItems?.includes(item.id));
	}
	get toolbarGroups() {
		const groups = (this.config.toolbar?.groups ?? []).map((group) => ({
			...group,
			items: group.items.filter(
				(item) => !this.config.toolbar?.hiddenItems?.includes(item.id),
			),
		}));
		const extensions = this.engine.extensions
			.flatMap((ext) => [...(ext.toolbar ?? [])])
			.filter((item) => !this.config.toolbar?.hiddenItems?.includes(item.id));
		return groups.length && extensions.length
			? [
					...groups,
					{ id: 'editra-extension-commands', label: 'Extensions', items: extensions },
				]
			: groups;
	}
	showControl(id: string): boolean {
		if (
			(id === 'image' && this.config.image?.enabled === false) ||
			(id === 'video' && this.config.video?.enabled === false) ||
			((id === 'table' ||
				id.startsWith('Table ') ||
				id.startsWith('Cell ') ||
				id === 'Row height pixels') &&
				this.config.table?.enabled === false)
		)
			return false;
		return !this.config.toolbar?.hiddenItems?.includes(id);
	}
	readonly floatingItems = defaultToolbar.filter((item) =>
		['bold', 'italic', 'underline', 'clear'].includes(item.id),
	);
	readonly tableActions = Object.entries({
		addRowBefore: 'Add row above',
		addRowAfter: 'Add row below',
		deleteRow: 'Remove row',
		addColumnBefore: 'Add column before',
		addColumnAfter: 'Add column after',
		deleteColumn: 'Remove column',
		mergeCells: 'Merge cells',
		splitCell: 'Split cells',
		toggleHeaderRow: 'Toggle header row',
		toggleHeaderColumn: 'Toggle header column',
		deleteTable: 'Delete table',
		fitTableToPage: 'AutoFit table to page',
		distributeTableColumns: 'Distribute columns',
	}).map(([command, label]) => ({ id: command, label, command }));
	readonly tableActionGroups = [
		{ label: 'Rows', ids: ['addRowBefore', 'addRowAfter', 'deleteRow'] },
		{ label: 'Columns', ids: ['addColumnBefore', 'addColumnAfter', 'deleteColumn'] },
		{
			label: 'Cells',
			ids: ['mergeCells', 'splitCell', 'toggleHeaderRow', 'toggleHeaderColumn'],
		},
		{ label: 'Size', ids: ['fitTableToPage', 'distributeTableColumns'] },
		{ label: 'Remove', ids: ['deleteTable'] },
	].map((group) => ({
		label: group.label,
		actions: group.ids.flatMap((id) => this.tableActions.filter((action) => action.id === id)),
	}));
	readonly tableMenuGroups = this.tableActionGroups.map((group) => ({
		id: group.label,
		label: group.label,
		items: group.actions,
	}));
	get currentTableLineWeight(): number {
		return Math.max(1, dimension(this.tableNodeAttribute('table', 'borderWidth'), 1, 8));
	}
	get currentTableBorder(): string {
		return this.tableNodeAttribute('table', 'border') || 'solid';
	}
	get currentTableBorderColour(): string {
		return safeColor(this.tableNodeAttribute('table', 'borderColor')) ?? '#000000';
	}
	newTableBorderColour = '#000000';
	private tablePopupCleanup: (() => void) | undefined;
	private linePopupCleanup: (() => void) | undefined;
	private releaseDialogScroll: (() => void) | undefined;
	private releaseFullscreenScroll: (() => void) | undefined;
	tableMenuOpen = false;
	tablePanel: 'structure' | 'appearance' | 'dimensions' = 'structure';
	onTableMenuToggle(popup: HTMLElement): void {
		this.tableMenuOpen = popup.matches(':popover-open');
	}
	toggleTableMenu(popup: HTMLElement, event: Event): void {
		if (popup.matches(':popover-open')) {
			popup.hidePopover();
			return;
		}
		if (!(event.currentTarget instanceof HTMLElement)) return;
		this.tablePopupCleanup?.();
		this.tablePopupCleanup = openToolbarPopup(popup, event.currentTarget);
		popup
			.querySelector<HTMLButtonElement>('.table-panel-switch button[aria-pressed="true"]')
			?.focus({ preventScroll: true });
	}
	floatingVisible = false;
	floatingX = 0;
	floatingY = 0;
	get locked(): boolean {
		return this.disabled || this.readonly || this.config.readonly === true;
	}
	get selectionEmpty(): boolean {
		return this.engine.state.selection.empty;
	}
	get editingMedia(): boolean {
		return (
			this.savedSelection instanceof NodeSelection &&
			['image', 'video'].includes(this.savedSelection.node.type.name)
		);
	}
	get imageSelected(): boolean {
		const selection = this.engine.state.selection;
		return selection instanceof NodeSelection && selection.node.type.name === 'image';
	}
	get imageInColumn(): boolean {
		if (!this.imageSelected) return false;
		const pos = this.engine.state.selection.$from;
		for (let depth = pos.depth; depth > 0; depth--)
			if (pos.node(depth).type.name === 'content_column') return true;
		return false;
	}
	fitImageToColumn(): void {
		const selection = this.engine.state.selection;
		if (this.locked || !this.imageInColumn || !(selection instanceof NodeSelection)) return;
		this.dispatch(
			this.engine.state.tr.setNodeMarkup(selection.from, undefined, {
				...attributes(selection.node),
				fullWidth: true,
				width: 0,
				height: 0,
				spacing: 0,
				wrap: false,
				align: 'center',
			}),
		);
		this.focus();
	}
	private focusBesideImage(): boolean {
		const selection = this.engine.state.selection;
		if (!this.imageInColumn) return false;
		const pos = selection.$from;
		for (let depth = pos.depth; depth > 0; depth--) {
			if (pos.node(depth).type.name !== 'content_columns') continue;
			const layout = pos.node(depth),
				index = pos.index(depth) === 0 ? 1 : 0;
			const column = layout.child(index);
			const start = pos.start(depth) + (index === 1 ? layout.child(0).nodeSize : 0);
			let target: number | undefined;
			column.descendants((node, offset) => {
				if (target === undefined && node.isTextblock) target = start + offset + 2;
			});
			const tr = this.engine.state.tr;
			if (target === undefined) {
				const end = start + column.nodeSize - 1;
				tr.insert(end, this.engine.schema.nodes['paragraph']!.create());
				target = end + 1;
			}
			tr.setSelection(TextSelection.create(tr.doc, target));
			this.dispatch(tr.scrollIntoView());
			this.focus();
			return true;
		}
		return false;
	}
	placeImageSide(side: 'left' | 'right'): void {
		if (this.locked || !this.imageInColumn) return;
		const pos = this.engine.state.selection.$from;
		for (let depth = pos.depth; depth > 0; depth--) {
			if (pos.node(depth).type.name !== 'content_columns') continue;
			const layout = pos.node(depth),
				index = pos.index(depth),
				desired = side === 'left' ? 0 : 1;
			if (index === desired) return;
			const start = pos.before(depth);
			const next = layout.type.create(layout.attrs, [layout.child(1), layout.child(0)]);
			const tr = this.engine.state.tr.replaceWith(start, start + layout.nodeSize, next);
			const imagePos =
				start + 2 + (desired === 1 ? next.child(0).nodeSize : 0) + pos.parentOffset;
			tr.setSelection(NodeSelection.create(tr.doc, imagePos));
			this.dispatch(tr);
			this.focus();
			return;
		}
	}
	insertColumns(withImage = false): void {
		if (this.locked) return;
		if (withImage && this.focusBesideImage()) return;
		const selection = this.engine.state.selection;
		const schema = this.engine.schema;
		const columns = schema.nodes['content_columns'],
			column = schema.nodes['content_column'],
			paragraph = schema.nodes['paragraph'];
		if (!columns || !column || !paragraph) return;
		if (
			withImage &&
			(!(selection instanceof NodeSelection) || selection.node.type.name !== 'image')
		)
			return;
		const image =
			withImage && selection instanceof NodeSelection
				? selection.node.type.create({
						...attributes(selection.node),
						wrap: false,
						align: attributes(selection.node)['align'],
						fullWidth: !dimension(attributes(selection.node)['width']),
						spacing: 0,
					})
				: undefined;
		const resizedWidth = image ? dimension(attributes(image)['width']) : 0;
		const available = (this.view?.dom.clientWidth ?? 640) - 16;
		const weight = resizedWidth
			? Math.max(5, Math.min(95, Math.round(((resizedWidth + 10) / available) * 100)))
			: 35;
		const imageColumn = column.create(
			{ weight: image ? weight : 50 },
			image ? [image, paragraph.create()] : [paragraph.create()],
		);
		const contentColumn = column.create(
			{ weight: image ? 100 - weight : 50 },
			paragraph.create(),
		);
		const imageRight = image && attributes(image)['align'] === 'right';
		const layout = columns.create(
			null,
			imageRight ? [contentColumn, imageColumn] : [imageColumn, contentColumn],
		);
		const tr = this.engine.state.tr.replaceSelectionWith(layout);
		let target: number | undefined;
		tr.doc.descendants((node, pos) => {
			if (node === layout)
				target = pos + (withImage && !imageRight ? layout.child(0).nodeSize + 3 : 3);
		});
		if (target !== undefined) tr.setSelection(TextSelection.create(tr.doc, target));
		this.dispatch(tr.scrollIntoView());
		this.focus();
		this.announcement =
			'Two independent columns added. Click either column to add headings, text, images, or other content.';
	}
	get mediaSelected(): boolean {
		const selection = this.engine.state.selection;
		return (
			selection instanceof NodeSelection &&
			['image', 'video'].includes(selection.node.type.name)
		);
	}
	get html(): string {
		return this.engine.getHTML();
	}
	get counts() {
		return this.engine.counts();
	}
	get currentBlock(): string {
		const selection = this.engine.state.selection;
		const values = new Set<string>();
		const read = (node: ProseMirrorNode): void => {
			if (node.isTextblock)
				values.add(
					node.type.name === 'heading'
						? `h${dimension(attributes(node)['level'], 1, 6)}`
						: node.type.name,
				);
		};
		if (selection.empty) read(selection.$from.parent);
		else
			for (const { $from, $to } of selection.ranges)
				this.engine.state.doc.nodesBetween($from.pos, $to.pos, read);
		if (values.size > 1) return 'mixed';
		const value = [...values][0] ?? 'paragraph';
		return value === 'paragraph' || value === 'code_block' || /^h[1-6]$/u.test(value)
			? value
			: 'custom';
	}
	get tableActive(): boolean {
		return this.enabled('addRowAfter');
	}
	get currentCellBackground(): string {
		const selection = this.engine.state.selection;
		if (selection instanceof CellSelection) {
			const colours = new Set<string>();
			selection.forEachCell((cell) =>
				colours.add(safeColor(attributes(cell)['background']) ?? ''),
			);
			return colours.size > 1 ? 'mixed' : ([...colours][0] ?? '');
		}
		return (
			this.tableNodeAttribute('table_cell', 'background') ||
			this.tableNodeAttribute('table_header', 'background')
		);
	}
	get currentTableWidth(): number {
		return dimension(this.tableNodeAttribute('table', 'width'), 100, 100);
	}
	get currentRowHeight(): number {
		return dimension(this.tableNodeAttribute('table_row', 'height'), 0, 2000);
	}
	private tableNodeAttribute(type: string, key: string): string {
		const position = this.engine.state.selection.$from;
		for (let depth = position.depth; depth > 0; depth--)
			if (position.node(depth).type.name === type) {
				const value = attributes(position.node(depth))[key];
				return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
			}
		return '';
	}
	rememberColourSelection(kind: 'color' | 'highlight' | 'background' | 'border'): void {
		this.colourSelection = {
			kind,
			selection: this.engine.state.selection,
			document: this.engine.state.doc,
		};
	}
	clearColourSelection(kind: 'color' | 'highlight' | 'background' | 'border'): void {
		if (this.colourSelection?.kind === kind) this.colourSelection = undefined;
	}
	applyColour(kind: 'color' | 'highlight' | 'background' | 'border', value: string | null): void {
		if (this.locked) return;
		const colour = value === null ? null : safeColor(value);
		if (value !== null && colour === null) {
			this.report(new TypeError('Invalid colour.'));
			return;
		}
		const saved = this.colourSelection;
		const selection =
			saved?.kind === kind && saved.document === this.engine.state.doc
				? saved.selection
				: this.engine.state.selection;
		if (kind === 'background' || kind === 'border') {
			if (!selection.eq(this.engine.state.selection))
				this.dispatch(this.engine.state.tr.setSelection(selection));
			(kind === 'border'
				? tableAttribute('table', 'borderColor', colour ?? '#000000')
				: cellBackground(colour ?? ''))(
				this.engine.state,
				(tr) => this.dispatch(closeHistory(tr)),
				this.view,
			);
		} else {
			const mark = this.engine.schema.marks[kind];
			if (!mark) return;
			const previous = this.formatValue(kind);
			if (
				selection.eq(this.engine.state.selection) &&
				((colour && safeColor(previous) === colour) || (colour === null && previous === ''))
			) {
				this.focus();
				return;
			}
			const tr = this.engine.state.tr.setSelection(selection);
			if (selection.empty) {
				if (colour) tr.addStoredMark(mark.create({ value: colour }));
				else tr.removeStoredMark(mark);
			} else {
				for (const { $from, $to } of selection.ranges) {
					tr.removeMark($from.pos, $to.pos, mark);
					if (colour) tr.addMark($from.pos, $to.pos, mark.create({ value: colour }));
				}
			}
			this.dispatch(closeHistory(tr));
		}
		this.focus();
	}
	openToolDialog(kind: DialogKind, event: Event): void {
		this.openDialog(kind);
		const dialog = this.dialog.nativeElement;
		if (kind === 'table' && event.currentTarget instanceof HTMLElement && dialog.open) {
			const anchor = event.currentTarget;
			const events = new AbortController();
			this.tablePickerEvents = events;
			observePopover(dialog, anchor, events.signal);
		}
	}
	dialogBackdrop(event: MouseEvent): void {
		if (this.dialogKind !== 'table' || event.target !== this.dialog.nativeElement) return;
		const rect = this.dialog.nativeElement.getBoundingClientRect();
		if (
			event.clientX < rect.left ||
			event.clientX > rect.right ||
			event.clientY < rect.top ||
			event.clientY > rect.bottom
		)
			this.closeDialog();
	}
	get currentLineHeight(): number | 'mixed' {
		const selection = this.engine.state.selection;
		if (selection.empty) return Number(attributes(selection.$from.parent)['lineHeight']) || 1.5;
		const values = new Set<number>();
		for (const { $from, $to } of selection.ranges)
			this.engine.state.doc.nodesBetween($from.pos, $to.pos, (node) => {
				if (node.type.name === 'paragraph' || node.type.name === 'heading')
					values.add(Number(attributes(node)['lineHeight']) || 1.5);
			});
		return values.size > 1 ? 'mixed' : ([...values][0] ?? 1.5);
	}
	formatValue(kind: 'font' | 'size' | 'color' | 'highlight'): string {
		const type = this.engine.schema.marks[kind];
		if (!type) return '';
		const values = new Set<string>();
		const read = (marks: readonly Mark[]): string => {
			const mark = type.isInSet(marks);
			return mark ? String(attributes(mark)['value'] ?? '') : '';
		};
		if (this.engine.state.selection.empty)
			return read(this.engine.state.storedMarks ?? this.engine.state.selection.$from.marks());
		for (const { $from, $to } of this.engine.state.selection.ranges)
			this.engine.state.doc.nodesBetween($from.pos, $to.pos, (node) => {
				if (node.isText) values.add(read(node.marks));
			});
		return values.size > 1 ? 'mixed' : ([...values][0] ?? '');
	}
	readonly enabled = (id: string): boolean =>
		!this.locked && (this.engine.commands[id]?.(this.engine.state) ?? false);
	readonly active = (id: string): boolean | 'mixed' => {
		const mark = this.engine.schema.marks[id];
		if (mark) return markStatus(this.engine.state, mark);
		if (id.startsWith('align_')) {
			const selection = this.engine.state.selection;
			if (selection instanceof NodeSelection || selection.empty)
				return (
					attributes(
						selection instanceof NodeSelection
							? selection.node
							: selection.$from.parent,
					)['align'] === id.slice(6)
				);
			const values = new Set<string>();
			for (const { $from, $to } of selection.ranges)
				this.engine.state.doc.nodesBetween($from.pos, $to.pos, (node) => {
					if (node.type.name === 'paragraph' || node.type.name === 'heading')
						values.add(String(attributes(node)['align']));
				});
			return values.size > 1 ? 'mixed' : values.has(id.slice(6));
		}
		const position = this.engine.state.selection.$from;
		for (let depth = position.depth; depth > 0; depth--)
			if (position.node(depth).type.name === id) return true;
		return false;
	};

	constructor() {
		afterNextRender(() => {
			void this.initialize().catch((error: unknown) => this.report(error));
		});
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['config']) {
			try {
				const previous = changes['config'].previousValue as EditraConfig | undefined;
				if (previous?.toolbar?.sticky !== this.config.toolbar?.sticky)
					this.stickyOverride = undefined;
				const schemaChanged =
					!previous ||
					previous.extensions !== this.config.extensions ||
					previous.security !== this.config.security ||
					previous.video?.providers !== this.config.video?.providers ||
					previous.image?.enabled !== this.config.image?.enabled ||
					previous.video?.enabled !== this.config.video?.enabled ||
					previous.table?.enabled !== this.config.table?.enabled;
				if (schemaChanged) {
					const html = this.engine.getHTML();
					const replacement = new EditraEngine(
						{
							...this.config,
							extensions: this.config.extensions ?? [
								imageExtension(),
								videoExtension(),
							],
						},
						html,
					);
					if (this.view) this.engine.extensions.forEach((ext) => ext.onDestroy?.());
					this.engine = replacement;
					if (this.view) this.engine.extensions.forEach((ext) => ext.onCreate?.());
					this.view?.updateState(this.engine.state);
					this.view?.setProps({ nodeViews: this.nodeViews() });
				}
			} catch (error: unknown) {
				this.report(error);
			}
		}
		this.updateView();
		this.onValidatorChange();
	}
	private async initialize(): Promise<void> {
		if (this.destroyed || this.view) return;
		const { EditorView } = await import('prosemirror-view');
		if (this.destroyed) return;
		this.ready = true;
		this.changeDetector.detectChanges();
		try {
			this.zone.runOutsideAngular(() => {
				this.view = new EditorView(this.surface.nativeElement, {
					state: this.engine.state,
					editable: () => !this.locked,
					attributes: {
						role: 'textbox',
						'aria-multiline': 'true',
						'aria-label': 'Rich text editor',
						'data-placeholder': this.config.placeholder ?? 'Start writing…',
						spellcheck: String(this.config.spellcheck !== false),
					},
					nodeViews: this.nodeViews(),
					dispatchTransaction: (tr) => this.dispatch(tr),
					// Parse all pasted HTML through the same server-safe allowlist instead of trusting DOM.
					transformPastedHTML: (html) =>
						new EditraEngine(this.engine.config, html).getHTML(),
					handleDOMEvents: {
						contextmenu: (_view, event) => {
							if (!this.locked && this.enabled('addRowAfter')) {
								event.preventDefault();
								this.zone.run(() => this.openDialog('tableContext'));
								return true;
							}
							return false;
						},
						paste: (_view, event) => {
							if (event.clipboardData?.files.length) {
								event.preventDefault();
								this.announcement = 'File uploads are not supported';
								return true;
							}
							if (this.config.image?.pasteUrls) {
								const url = event.clipboardData?.getData('text/plain') ?? '';
								if (
									safeUrl(url, this.config.security) &&
									/\.(?:png|jpe?g|gif|webp|avif)(?:\?|$)/iu.test(url)
								) {
									event.preventDefault();
									this.insertMedia('image', { src: url });
									return true;
								}
							}
							return false;
						},
						drop: (_view, event) => {
							if (event.dataTransfer?.files.length) {
								event.preventDefault();
								return true;
							}
							return false;
						},
					},
				});
			});
		} catch (error: unknown) {
			this.ready = false;
			this.surface.nativeElement.replaceChildren();
			this.changeDetector.detectChanges();
			throw error;
		}
		this.engine.extensions.forEach((ext) => ext.onCreate?.());
		this.zone.run(() => {
			this.ready = true;
			this.editorReady.emit();
			this.changeDetector.markForCheck();
		});
		if (this.config.autofocus) this.focus();
	}
	private dispatch(tr: Transaction): void {
		if (this.destroyed || (this.locked && tr.docChanged)) return;
		const mediaError: unknown = tr.getMeta('editra-media-error');
		if (
			typeof mediaError === 'object' &&
			mediaError !== null &&
			'message' in mediaError &&
			typeof mediaError.message === 'string'
		)
			this.report(new Error(mediaError.message));
		const wasDirty = this.engine.dirty;
		const previousSelection = this.engine.state.selection;
		const changed = this.engine.apply(tr);
		this.view?.updateState(this.engine.state);
		const selection = this.engine.state.selection;
		this.floatingVisible =
			this.config.toolbar?.floating === true &&
			!selection.empty &&
			!(selection instanceof NodeSelection);
		if (this.floatingVisible && this.view) {
			const coordinates = this.view.coordsAtPos(selection.from);
			this.floatingX = Math.max(
				8,
				Math.min(
					coordinates.left,
					(this.view.dom.ownerDocument.defaultView?.innerWidth ?? 1024) - 320,
				),
			);
			this.floatingY = Math.max(8, coordinates.top - 56);
		}
		this.zone.run(() => {
			this.changeDetector.markForCheck();
			const selectionChanged = !previousSelection.eq(this.engine.state.selection);
			this.transactionState.emit({
				docChanged: changed,
				selectionChanged,
				from: this.engine.state.selection.from,
				to: this.engine.state.selection.to,
				dirty: this.engine.dirty,
			});
			if (changed) {
				if (!wasDirty) this.dirtyChange.emit(true);
				const html = this.engine.getHTML();
				this.onChange(html);
				this.onValidatorChange();
				this.contentChange.emit({
					html,
					document: this.engine.getJSON(),
					text: this.engine.getText(),
				});
			}
			if (selectionChanged)
				this.selectionChange.emit({
					from: this.engine.state.selection.from,
					to: this.engine.state.selection.to,
				});
		});
	}
	execute(id: string): void {
		if (this.locked) return;
		this.engine.commands[id]?.(this.engine.state, (tr) => this.dispatch(tr), this.view);
		this.focus();
	}
	format(
		event: Event,
		kind: 'heading' | 'font' | 'size' | 'color' | 'highlight' | 'lineHeight',
	): void {
		const target = event.target;
		if (
			!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement) ||
			this.locked
		)
			return;
		if (kind === 'heading') {
			this.execute(target.value);
			return;
		}
		if (kind === 'lineHeight') {
			const line = Number(target.value);
			if (Number.isFinite(line) && line >= 1 && line <= 3)
				setParagraphAttribute('lineHeight', line)(
					this.engine.state,
					(tr) => this.dispatch(tr),
					this.view,
				);
			this.focus();
			return;
		}
		const value =
			kind === 'font'
				? safeFont(target.value)
				: kind === 'size'
					? dimension(target.value, 16, 96)
					: safeColor(target.value);
		const mark = this.engine.schema.marks[kind];
		if (mark && (value !== null || target.value === '')) {
			const selection = this.engine.state.selection,
				tr = this.engine.state.tr;
			const next = target.value === '' ? null : mark.create({ value });
			if (selection.empty) {
				tr.removeStoredMark(mark);
				if (next) tr.addStoredMark(next);
			} else
				for (const { $from, $to } of selection.ranges) {
					tr.removeMark($from.pos, $to.pos, mark);
					if (next) tr.addMark($from.pos, $to.pos, next);
				}
			this.dispatch(tr);
		}
		this.focus();
	}
	openDialog(kind: DialogKind): void {
		this.tablePickerEvents?.abort();
		this.tablePickerEvents = undefined;
		if (!this.view) return;
		if (this.locked && kind !== 'find') return;
		this.savedSelection = this.engine.state.selection;
		this.dialogKind = kind;
		this.dialog.nativeElement.style.removeProperty('left');
		this.dialog.nativeElement.style.removeProperty('top');
		this.dialog.nativeElement.style.removeProperty('max-height');
		this.values = dialogDefaults();
		if (kind === 'table') {
			this.newTableBorderColour = '#000000';
			this.values.rows = Math.min(3, this.config.table?.maxRows ?? 50);
			this.values.columns = Math.min(3, this.config.table?.maxColumns ?? 20);
		}
		this.error = '';
		if (kind === 'link') {
			const link = this.engine.schema.marks['link']?.isInSet(
				this.engine.state.selection.$from.marks(),
			);
			if (link) {
				const a = attributes(link);
				this.values.url = String(a['href'] ?? '');
				this.values.newTab = a['newTab'] === true;
				if (this.savedSelection.empty) {
					const position = this.savedSelection.$from;
					let from = position.start() + position.parentOffset,
						to = from;
					const selectedFrom = this.savedSelection.from;
					position.parent.forEach((child, offset) => {
						if (child.marks.some((mark) => mark.eq(link))) {
							const start = position.start() + offset,
								end = start + child.nodeSize;
							if (start <= selectedFrom && end >= selectedFrom) {
								from = start;
								to = end;
							}
						}
					});
					this.savedSelection = TextSelection.create(this.engine.state.doc, from, to);
				}
			}
		}
		const node =
			this.savedSelection instanceof NodeSelection ? this.savedSelection.node : undefined;
		if (node?.type.name === kind) {
			const a = attributes(node);
			this.values = {
				...this.values,
				url: String(a[kind === 'image' ? 'src' : 'url'] ?? ''),
				alt: String(a['alt'] ?? ''),
				caption: String(a['caption'] ?? ''),
				width: dimension(a['width']) || null,
				height: dimension(a['height']) || null,
				fullWidth: a['fullWidth'] === true,
				align: String(a['align'] ?? 'center'),
				radius: dimension(a['radius']),
				spacing: dimension(a['spacing'], 8),
				border: String(a['border'] ?? 'none'),
				wrap: a['wrap'] === true,
				aspect: a['aspect'] !== false,
				controls: a['controls'] !== false,
			};
		}
		this.changeDetector.detectChanges();
		this.dialogPresenter.open(this.dialog.nativeElement);
		if (kind === 'link' || kind === 'image' || kind === 'video')
			this.dialog.nativeElement
				.querySelector<HTMLInputElement>('input[type="url"]')
				?.focus({ preventScroll: true });
		this.releaseDialogScroll ??= lockPageScroll(this.dialog.nativeElement.ownerDocument);
		if (kind === 'tableContext')
			this.dialog.nativeElement
				.querySelector<HTMLButtonElement>('[role="menu"] button:not(:disabled)')
				?.focus();
	}
	closeDialog(): void {
		this.releaseDialogScroll?.();
		this.releaseDialogScroll = undefined;
		this.dialogPresenter.close(this.dialog.nativeElement);
		if (this.dialogKind === 'find' || this.dialogKind === 'tableContext')
			this.savedSelection = undefined;
		else this.restoreSelection();
		this.focus();
	}
	dialogClosed(): void {
		if (!this.dialog.nativeElement.open) {
			this.releaseDialogScroll?.();
			this.releaseDialogScroll = undefined;
			this.tablePickerEvents?.abort();
			this.tablePickerEvents = undefined;
			this.focus();
		}
	}
	private restoreSelection(): void {
		if (this.savedSelection) {
			if (this.savedSelection.$from.doc === this.engine.state.doc)
				this.dispatch(this.engine.state.tr.setSelection(this.savedSelection));
			this.savedSelection = undefined;
		}
	}
	chooseTable(dimensions: { rows: number; columns: number }): void {
		this.values.rows = dimensions.rows;
		this.values.columns = dimensions.columns;
	}
	insertGridTable(dimensions: { rows: number; columns: number }): void {
		this.chooseTable(dimensions);
		this.applyDialog();
	}
	contextAction(command: string): void {
		this.savedSelection = undefined;
		this.execute(command);
		this.dialogPresenter.close(this.dialog.nativeElement);
		this.focus();
	}
	applyDialog(): void {
		const kind = this.dialogKind;
		if (kind === 'find') {
			this.findNext();
			return;
		}
		const value = this.values;
		if (
			kind === 'table' &&
			(!Number.isInteger(value.rows) ||
				!Number.isInteger(value.columns) ||
				value.rows < 1 ||
				value.columns < 1 ||
				value.rows > (this.config.table?.maxRows ?? 50) ||
				value.columns > (this.config.table?.maxColumns ?? 20))
		) {
			this.error = `Choose 1–${this.config.table?.maxRows ?? 50} rows and 1–${this.config.table?.maxColumns ?? 20} columns.`;
			return;
		}
		const validation = validateUrl(value.url, this.config.security, kind === 'link');
		const url = validation.ok ? validation.url : null;
		if (kind !== 'table' && !validation.ok) {
			this.error =
				validation.reason === 'unsupported-protocol'
					? 'This URL protocol is not permitted. Use HTTPS.'
					: validation.reason === 'credentials-not-allowed'
						? 'URLs containing login credentials are not permitted.'
						: 'Enter a valid absolute URL.';
			return;
		}
		if (
			kind === 'video' &&
			!resolveVideo(url, this.config.security, this.config.video?.providers)
		) {
			this.error = 'Unsupported video provider or URL path.';
			return;
		}
		this.restoreSelection();
		if (kind === 'link') {
			const mark = this.engine.schema.marks['link'];
			if (mark && url) {
				const tr = this.engine.state.tr;
				if (this.engine.state.selection.empty) tr.insertText(url);
				tr.addMark(
					this.engine.state.selection.from,
					this.engine.state.selection.empty
						? this.engine.state.selection.from + url.length
						: this.engine.state.selection.to,
					mark.create({ href: url, newTab: value.newTab }),
				);
				this.dispatch(tr);
			}
		} else if (kind === 'image' || kind === 'video')
			this.insertMedia(kind, {
				...(kind === 'image' ? { src: url, alt: value.alt } : { url }),
				caption: value.caption,
				width: value.fullWidth ? 0 : dimension(value.width),
				height: value.fullWidth ? 0 : dimension(value.height),
				fullWidth: value.fullWidth,
				align: value.align,
				radius: dimension(value.radius, 0, 100),
				border: value.border,
				spacing: dimension(value.spacing, 8, 100),
				wrap: value.wrap,
				aspect: value.aspect,
				controls: value.controls,
			});
		else this.insertTable(value.rows, value.columns);
		this.dialogPresenter.close(this.dialog.nativeElement);
		this.focus();
	}
	private insertMedia(kind: 'image' | 'video', attrs: Record<string, unknown>): void {
		if (this.locked) return;

		const type = this.engine.schema.nodes[kind];
		if (!type) return;
		const selection = this.engine.state.selection,
			tr = this.engine.state.tr;
		if (selection instanceof NodeSelection && selection.node.type === type)
			tr.setNodeMarkup(selection.from, undefined, {
				...attributes(selection.node),
				...attrs,
			});
		else tr.replaceSelectionWith(type.create(attrs));
		this.dispatch(tr.scrollIntoView());
	}
	private insertTable(rows: number, columns: number): void {
		const schema = this.engine.schema,
			table = schema.nodes['table'],
			row = schema.nodes['table_row'],
			cell = schema.nodes['table_cell'],
			paragraph = schema.nodes['paragraph'];
		if (!table || !row || !cell || !paragraph) return;
		const content = Array.from(
			{ length: Math.max(1, dimension(rows, 3, this.config.table?.maxRows ?? 50)) },
			() =>
				row.create(
					null,
					Array.from(
						{
							length: Math.max(
								1,
								dimension(columns, 3, this.config.table?.maxColumns ?? 20),
							),
						},
						() => cell.create(null, paragraph.create()),
					),
				),
		);
		this.dispatch(
			this.engine.state.tr
				.replaceSelectionWith(
					table.create(
						{ borderColor: safeColor(this.newTableBorderColour) ?? '#000000' },
						content,
					),
				)
				.scrollIntoView(),
		);
	}
	readonly textCases = [
		{ value: 'upper', label: 'UPPERCASE' },
		{ value: 'lower', label: 'lowercase' },
		{ value: 'title', label: 'Title Case' },
		{ value: 'sentence', label: 'Sentence case' },
		{ value: 'camel', label: 'camelCase' },
		{ value: 'pascal', label: 'PascalCase' },
		{ value: 'snake', label: 'snake_case' },
		{ value: 'kebab', label: 'kebab-case' },
		{ value: 'toggle', label: 'tOGGLE cASE' },
	];
	async applyTextCase(event: Event): Promise<void> {
		if (this.locked || !(event.target instanceof HTMLSelectElement)) return;
		const mode = event.target.value as TextCase;
		event.target.value = '';
		if (!this.textCases.some((item) => item.value === mode)) return;
		const selection = this.engine.state.selection;
		if (selection.empty) return;
		const document = this.engine.state.doc;
		const { changeTextCase } = await import('../../utils/text-case');
		if (this.locked || document !== this.engine.state.doc) return;
		const runs: TextPiece[][] = [];
		for (const { $from, $to } of selection.ranges) {
			let run: TextPiece[] = [];
			this.engine.state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
				if (!node.isText || !node.text) return;
				const from = Math.max(pos, $from.pos),
					to = Math.min(pos + node.nodeSize, $to.pos);
				if (to <= from) return;
				if (!run.length || run[run.length - 1]!.to !== from) {
					run = [];
					runs.push(run);
				}
				run.push({
					from,
					to,
					text: node.text.slice(from - pos, to - pos),
					marks: node.marks,
				});
			});
		}
		const tr = closeHistory(this.engine.state.tr);
		for (const run of runs.sort((a, b) => b[0]!.from - a[0]!.from))
			tr.replaceWith(
				run[0]!.from,
				run[run.length - 1]!.to,
				changeTextCase(run, mode, this.engine.schema),
			);
		if (selection instanceof TextSelection)
			tr.setSelection(
				TextSelection.create(
					tr.doc,
					tr.mapping.map(selection.from, -1),
					tr.mapping.map(selection.to, 1),
				),
			);
		if (tr.docChanged) this.dispatch(tr);
		this.focus();
	}
	private lineDefaults = { style: 'solid', weight: 1 };
	insertSavedLine(): void {
		const type = this.engine.schema.nodes['horizontal_rule'];
		if (this.locked || !type) return;
		const selection = this.engine.state.selection,
			tr = this.engine.state.tr;
		if (selection instanceof NodeSelection && selection.node.type === type)
			tr.insert(selection.to, type.create(this.lineDefaults));
		else tr.replaceSelectionWith(type.create(this.lineDefaults));
		this.dispatch(tr.scrollIntoView());
		this.focus();
	}
	lineStyle = 'solid';
	lineWeight = 1;
	private lineSelection: Selection | undefined;
	private lineDocument: ProseMirrorNode | undefined;
	openLineSettings(popup: HTMLElement, event: Event): void {
		if (this.locked) return;
		if (popup.matches(':popover-open')) {
			popup.hidePopover();
			return;
		}
		this.lineSelection = this.engine.state.selection;
		this.lineDocument = this.engine.state.doc;
		const node =
			this.lineSelection instanceof NodeSelection &&
			this.lineSelection.node.type.name === 'horizontal_rule'
				? this.lineSelection.node
				: undefined;
		this.lineStyle = node ? String(attributes(node)['style']) : this.lineDefaults.style;
		this.lineWeight = node
			? dimension(attributes(node)['weight'], 1, 8)
			: this.lineDefaults.weight;
		if (!(event.currentTarget instanceof HTMLElement)) return;
		this.linePopupCleanup?.();
		this.linePopupCleanup = openToolbarPopup(popup, event.currentTarget);
		popup.querySelector('select')?.focus();
	}
	applyLineSettings(popup: HTMLElement): void {
		const type = this.engine.schema.nodes['horizontal_rule'];
		if (
			this.locked ||
			!type ||
			!this.lineSelection ||
			this.lineDocument !== this.engine.state.doc
		) {
			popup.hidePopover();
			return;
		}
		const selection = this.lineSelection,
			tr = this.engine.state.tr.setSelection(selection);
		const attrs = {
			style: this.lineStyle,
			weight: Math.max(this.lineStyle === 'double' ? 3 : 1, dimension(this.lineWeight, 1, 8)),
		};
		this.lineDefaults = attrs;
		if (selection instanceof NodeSelection && selection.node.type === type)
			tr.setNodeMarkup(selection.from, undefined, attrs);
		else tr.replaceSelectionWith(type.create(attrs));
		this.dispatch(tr.scrollIntoView());
		popup.hidePopover();
		this.focus();
	}
	removeSelected(): void {
		if (!this.locked) this.dispatch(this.engine.state.tr.deleteSelection());
	}
	tableFormat(
		event: Event,
		kind: 'background' | 'width' | 'height' | 'border' | 'borderWidth',
	): void {
		if (
			this.locked ||
			!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement)
		)
			return;
		const value = event.target.value;
		const command =
			kind === 'background'
				? cellBackground(value)
				: kind === 'width'
					? setTableWidthPercent(dimension(value, 100, 100))
					: tableAttribute(
							kind === 'height' ? 'table_row' : 'table',
							kind,
							kind === 'border'
								? ['solid', 'dashed', 'dotted', 'double', 'none'].includes(value)
									? value
									: 'solid'
								: kind === 'borderWidth'
									? Math.max(1, dimension(value, 1, 8))
									: dimension(value, 0, 2000),
						);
		command(this.engine.state, (tr) => this.dispatch(tr), this.view);
		this.focus();
	}
	findInputEnter(event: Event): void {
		event.preventDefault();
		this.findNext(event instanceof KeyboardEvent && event.shiftKey ? -1 : 1);
	}
	get findCount(): number {
		return this.values.query ? this.engine.find(this.values.query).length : 0;
	}
	get findSummary(): string {
		const count = this.findCount;
		return !this.values.query
			? 'Enter text to find.'
			: !count
				? 'No matches found.'
				: this.matchIndex < 0
					? count + ' matches found.'
					: this.matchIndex + 1 + ' of ' + count + ' matches';
	}
	findNext(step = 1): void {
		const matches = this.engine.find(this.values.query);
		this.matchIndex = matches.length
			? this.matchIndex < 0
				? step < 0
					? matches.length - 1
					: 0
				: (this.matchIndex + step + matches.length) % matches.length
			: -1;
		const match = matches[this.matchIndex];
		if (match)
			this.dispatch(
				this.engine.state.tr
					.setSelection(TextSelection.create(this.engine.state.doc, match.from, match.to))
					.scrollIntoView(),
			);
		this.announcement = matches.length
			? `${this.matchIndex + 1} of ${matches.length} matches`
			: 'No matches';
	}
	replaceCurrent(): void {
		if (this.locked) return;
		const matches = this.engine.find(this.values.query),
			match = matches[Math.max(0, this.matchIndex)];
		if (match)
			this.dispatch(
				this.engine.state.tr.insertText(this.values.replacement, match.from, match.to),
			);
		this.matchIndex = Math.max(0, this.matchIndex) - 1;
		this.findNext();
	}
	replaceAll(): void {
		if (this.locked) return;
		const tr = this.engine.state.tr;
		for (const match of [...this.engine.find(this.values.query)].reverse())
			tr.insertText(this.values.replacement, match.from, match.to);
		if (tr.docChanged) this.dispatch(tr);
		this.findNext();
	}
	toggleFullscreen(): void {
		this.fullscreen = !this.fullscreen;
		if (this.fullscreen)
			this.releaseFullscreenScroll = lockPageScroll(this.surface.nativeElement.ownerDocument);
		else {
			this.releaseFullscreenScroll?.();
			this.releaseFullscreenScroll = undefined;
		}
		this.announcement = this.fullscreen
			? 'Full-screen editor opened'
			: 'Full-screen editor closed';
	}
	exitFullscreen(): void {
		if (this.fullscreen) this.toggleFullscreen();
	}
	handleFocus(): void {
		if (!this.focused) {
			this.focused = true;
			this.editorFocus.emit();
		}
	}
	handleBlur(event: FocusEvent): void {
		if (
			event.relatedTarget instanceof Node &&
			this.surface.nativeElement.closest('ngx-editra')?.contains(event.relatedTarget)
		)
			return;
		if (this.dialog.nativeElement.open) return;
		if (
			event.relatedTarget === null &&
			this.surface.nativeElement
				.closest('ngx-editra')
				?.querySelector('editra-colour-picker dialog[open]')
		)
			return;
		this.focused = false;
		this.onTouched();
		this.editorBlur.emit();
	}
	writeValue(value: unknown): void {
		if (value !== null && value !== undefined && typeof value !== 'string') {
			this.report(new TypeError('Editor form values must be HTML strings or null'));
			return;
		}
		this.replaceHTML(typeof value === 'string' ? value : '');
	}
	private replaceHTML(value: string): boolean {
		try {
			const wasDirty = this.engine.dirty;
			this.engine.setHTML(value);
			this.view?.updateState(this.engine.state);
			// Signal Forms caches legacy validators until their change callback fires.
			// Programmatic writes can change semantic emptiness without a transaction.
			this.onValidatorChange();
			this.changeDetector.markForCheck();
			if (wasDirty && !this.engine.dirty) this.dirtyChange.emit(false);
			return true;
		} catch (error: unknown) {
			this.report(error);
			return false;
		}
	}
	private syncFormValue(): void {
		const control = this.injector.get(NgControl, null, { self: true })?.control;
		control?.setValue(this.engine.getHTML(), { emitEvent: false });
	}
	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}
	setDisabledState(value: boolean): void {
		this.disabled = value;
		this.updateView();
		this.changeDetector.markForCheck();
	}
	validate(_control: AbstractControl): ValidationErrors | null {
		return this.required && this.engine.isEmpty() ? { required: true } : null;
	}
	registerOnValidatorChange(fn: () => void): void {
		this.onValidatorChange = fn;
	}
	private updateView(): void {
		this.view?.setProps({
			editable: () => !this.locked,
			attributes: {
				role: 'textbox',
				'aria-multiline': 'true',
				'aria-label': 'Rich text editor',
				'aria-readonly': String(this.locked),
				'data-placeholder': this.config.placeholder ?? 'Start writing…',
				spellcheck: String(this.config.spellcheck !== false),
			},
		});
		this.view?.dom
			.querySelectorAll<HTMLButtonElement>('.editra-resize,.editra-column-resize')
			.forEach((handle) => {
				handle.disabled = this.locked;
			});
	}
	getHTML(): string {
		return this.engine.getHTML();
	}
	getText(): string {
		return this.engine.getText();
	}
	getJSON(): EditraDocument {
		return this.engine.getJSON();
	}
	setHTML(html: string): void {
		if (this.replaceHTML(html)) this.syncFormValue();
	}
	setJSON(value: EditraDocument): void {
		const wasDirty = this.engine.dirty;
		this.engine.setJSON(value);
		this.view?.updateState(this.engine.state);
		this.onValidatorChange();
		this.changeDetector.markForCheck();
		this.syncFormValue();
		if (wasDirty) this.dirtyChange.emit(false);
	}
	getMarkdown(): string {
		return exportMarkdown(this.engine.state.doc);
	}
	setMarkdown(value: string): void {
		this.setHTML(serializeHTML(importMarkdown(value, this.engine.schema, this.engine.config)));
	}
	clear(): void {
		if (!this.locked) {
			this.dispatch(this.engine.state.tr.delete(0, this.engine.state.doc.content.size));
			this.focus();
		}
	}
	focus(): void {
		this.view?.focus();
	}
	blur(): void {
		this.view?.dom.blur();
	}
	isEmpty(): boolean {
		return this.engine.isEmpty();
	}
	isDirty(): boolean {
		return this.engine.dirty;
	}
	private report(error: unknown): void {
		const failure = error instanceof Error ? error : new Error(String(error));
		this.error = failure.message;
		this.editorError.emit(failure);
		this.changeDetector.markForCheck();
	}
	ngOnDestroy(): void {
		this.releaseDialogScroll?.();
		this.tablePopupCleanup?.();
		this.linePopupCleanup?.();
		this.releaseFullscreenScroll?.();
		this.tablePickerEvents?.abort();
		this.destroyed = true;
		this.view?.destroy();
		if (this.view) this.engine.extensions.forEach((ext) => ext.onDestroy?.());
		this.editorDestroyed.emit();
	}
}
