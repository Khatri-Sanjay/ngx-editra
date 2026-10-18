import { Plugin, PluginKey } from 'prosemirror-state';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type { EditorView } from 'prosemirror-view';
import type { PluginView } from 'prosemirror-state';
import { findTable, TableMap } from 'prosemirror-tables';
import { closeHistory } from 'prosemirror-history';
import { resizeTableColumns, resizeTableRow } from './table-dimensions';
import { attributes } from './attributes';
import { EditraTableView } from './table-view';

type Axis = 'row' | 'column';
interface Geometry {
	readonly position: number;
	readonly node: ProseMirrorNode;
	readonly table: HTMLTableElement;
	readonly rows: readonly DOMRect[];
	readonly columns: readonly DOMRect[];
	readonly widths: readonly number[];
}
interface Gesture {
	readonly kind: Axis;
	readonly index: number;
	readonly geometry: Geometry;
	readonly doc: ProseMirrorNode;
	readonly original: number;
	readonly offset: number;
	readonly button: HTMLButtonElement;
	readonly pointerId: number;
	readonly events: AbortController;
	value: number;
	moved: boolean;
}

/** Browser-only controls live outside the ProseMirror document DOM. */
class TableResizeControls implements PluginView {
	private readonly parent: HTMLElement;
	private readonly layer: HTMLDivElement;
	private readonly guide: HTMLDivElement;
	private readonly feedback: HTMLSpanElement;
	private readonly status: HTMLSpanElement;
	private readonly events = new AbortController();
	private readonly handles = new Map<string, HTMLButtonElement>();
	private readonly observer: ResizeObserver;
	private frame = 0;
	private destroyed = false;
	private gesture: Gesture | undefined;
	constructor(private readonly view: EditorView) {
		const parent = view.dom.parentElement;
		if (!parent) throw new Error('Table resizing requires an editor container.');
		this.parent = parent;
		const document = view.dom.ownerDocument;
		this.layer = document.createElement('div');
		this.layer.className = 'editra-table-resize-layer';
		this.layer.contentEditable = 'false';
		this.layer.hidden = true;
		this.guide = document.createElement('div');
		this.guide.className = 'editra-table-resize-guide';
		this.guide.hidden = true;
		this.feedback = document.createElement('span');
		this.feedback.className = 'editra-table-resize-feedback';
		this.feedback.setAttribute('aria-hidden', 'true');
		this.feedback.hidden = true;
		this.status = document.createElement('span');
		this.status.className = 'editra-resize-announcement';
		this.status.setAttribute('role', 'status');
		this.layer.append(this.guide, this.feedback, this.status);
		parent.append(this.layer);
		this.layer.addEventListener('pointerdown', (event) => this.start(event), {
			signal: this.events.signal,
		});
		this.layer.addEventListener('keydown', (event) => this.keyboard(event), {
			signal: this.events.signal,
		});
		const window = document.defaultView;
		window?.addEventListener('resize', this.schedule, { signal: this.events.signal });
		window?.addEventListener('scroll', this.schedule, {
			capture: true,
			signal: this.events.signal,
		});
		this.observer = new ResizeObserver(this.schedule);
		this.observer.observe(parent);
		this.observer.observe(view.dom);
		this.schedule();
	}
	update(): void {
		if (this.gesture && (this.view.state.doc !== this.gesture.doc || !this.view.editable))
			this.cancel();
		this.schedule();
	}
	private readonly schedule = (): void => {
		if (this.destroyed || this.frame) return;
		this.frame =
			this.view.dom.ownerDocument.defaultView?.requestAnimationFrame(() => {
				this.frame = 0;
				this.render();
			}) ?? 0;
	};
	private geometry(): Geometry | null {
		if (!this.view.editable) return null;
		const selected = findTable(this.view.state.selection.$from);
		if (!selected) return null;
		const dom = this.view.nodeDOM(selected.pos);
		if (!(dom instanceof Element)) return null;
		const table = dom.matches('table') ? dom : dom.querySelector('table');
		if (!(table instanceof HTMLTableElement)) return null;
		const map = TableMap.get(selected.node);
		const rect = table.getBoundingClientRect();
		const columns = Array.from(table.querySelectorAll(':scope > colgroup > col'), (column) =>
			column.getBoundingClientRect(),
		);
		if (columns.length !== map.width) return null;
		return {
			position: selected.pos,
			node: selected.node,
			table,
			rows: Array.from(table.rows, (row) => row.getBoundingClientRect()),
			columns,
			widths: columns.map((column) => column.width || rect.width / map.width),
		};
	}
	private coordinates(rect: DOMRect): { left: number; top: number } {
		const parent = this.parent.getBoundingClientRect();
		return {
			left: rect.left - parent.left + this.parent.scrollLeft - this.parent.clientLeft,
			top: rect.top - parent.top + this.parent.scrollTop - this.parent.clientTop,
		};
	}
	private render(): void {
		const geometry = this.geometry();
		this.layer.hidden = !geometry;
		if (!geometry) return;
		const table = geometry.table.getBoundingClientRect();
		const origin = this.coordinates(table);
		const keys = new Set<string>();
		for (const kind of ['row', 'column'] as const) {
			const rects = kind === 'row' ? geometry.rows : geometry.columns;
			rects.forEach((rect, index) => {
				const key = `${kind}-${index}`;
				keys.add(key);
				let button = this.handles.get(key);
				if (!button) {
					button = this.view.dom.ownerDocument.createElement('button');
					button.type = 'button';
					button.className = `editra-table-${kind}-resize`;
					button.dataset['kind'] = kind;
					button.dataset['index'] = String(index);
					this.handles.set(key, button);
					this.layer.append(button);
				}
				const label = `Resize ${kind} ${index + 1}; use ${kind === 'row' ? 'Up and Down' : 'Left and Right'} arrows`;
				button.setAttribute('aria-label', label);
				button.title = label;
				const coordinate = this.coordinates(rect);
				button.style.left = `${kind === 'row' ? origin.left : coordinate.left + rect.width - 12}px`;
				button.style.top = `${kind === 'row' ? coordinate.top + rect.height - 12 : origin.top}px`;
				button.style.width = `${kind === 'row' ? table.width : 24}px`;
				button.style.height = `${kind === 'row' ? 24 : table.height}px`;
			});
		}
		for (const [key, button] of this.handles)
			if (!keys.has(key)) {
				button.remove();
				this.handles.delete(key);
			}
	}
	private target(event: Event): { button: HTMLButtonElement; kind: Axis; index: number } | null {
		if (!(event.target instanceof Element)) return null;
		const button = event.target.closest('button');
		if (!(button instanceof HTMLButtonElement) || !this.layer.contains(button)) return null;
		const kind = button.dataset['kind'];
		const index = Number(button.dataset['index']);
		return (kind === 'row' || kind === 'column') && Number.isInteger(index)
			? { button, kind, index }
			: null;
	}
	private start(event: PointerEvent): void {
		const target = this.target(event),
			geometry = this.geometry();
		if (!target || !geometry || event.button !== 0) return;
		const rect = (target.kind === 'row' ? geometry.rows : geometry.columns)[target.index];
		if (!rect) return;
		event.preventDefault();
		this.cancel();
		target.button.setPointerCapture(event.pointerId);
		target.button.focus({ preventScroll: true });
		const events = new AbortController();
		this.gesture = {
			...target,
			geometry,
			doc: this.view.state.doc,
			original: target.kind === 'row' ? rect.height : rect.width,
			offset:
				target.kind === 'row' ? event.clientY - rect.bottom : event.clientX - rect.right,
			pointerId: event.pointerId,
			events,
			value: target.kind === 'row' ? rect.height : rect.width,
			moved: false,
		};
		const window = this.view.dom.ownerDocument.defaultView;
		window?.addEventListener('pointermove', (move) => this.move(move), {
			signal: events.signal,
		});
		window?.addEventListener(
			'pointerup',
			(up) => {
				if (up.pointerId === this.gesture?.pointerId) this.finish();
			},
			{ signal: events.signal },
		);
		window?.addEventListener('pointercancel', () => this.cancel(), { signal: events.signal });
		window?.addEventListener('blur', () => this.cancel(), { signal: events.signal });
		window?.addEventListener(
			'keydown',
			(key) => {
				if (key.key === 'Escape') {
					key.preventDefault();
					key.stopPropagation();
					this.cancel();
				}
			},
			{ capture: true, signal: events.signal },
		);
	}
	private move(event: PointerEvent): void {
		const gesture = this.gesture;
		if (!gesture || event.pointerId !== gesture.pointerId) return;
		const geometry = this.geometry();
		const rect = (gesture.kind === 'row' ? geometry?.rows : geometry?.columns)?.[gesture.index];
		if (!rect || this.view.state.doc !== gesture.doc) {
			this.cancel();
			return;
		}
		const delta =
			gesture.kind === 'row'
				? event.clientY - rect.bottom - gesture.offset
				: event.clientX - rect.right - gesture.offset;
		gesture.moved = Math.abs(delta) >= 1;
		gesture.value = Math.max(
			gesture.kind === 'row' ? 24 : 48,
			Math.min(gesture.kind === 'row' ? 2000 : 4096, Math.round(gesture.original + delta)),
		);
		const table = gesture.geometry.table.getBoundingClientRect();
		const origin = this.coordinates(table),
			coordinate = this.coordinates(rect);
		this.guide.hidden = false;
		this.guide.style.left = `${gesture.kind === 'row' ? origin.left : coordinate.left + gesture.value}px`;
		this.guide.style.top = `${gesture.kind === 'row' ? coordinate.top + gesture.value : origin.top}px`;
		this.guide.style.width = `${gesture.kind === 'row' ? table.width : 1}px`;
		this.guide.style.height = `${gesture.kind === 'row' ? 1 : table.height}px`;
		this.feedback.hidden = false;
		this.feedback.textContent = `${gesture.kind === 'row' ? 'Height' : 'Width'}: ${gesture.value} px`;
		this.feedback.style.left = `${origin.left + 8}px`;
		this.feedback.style.top = `${Math.max(0, origin.top - 30)}px`;
	}
	private finish(): void {
		const gesture = this.gesture;
		this.cancel();
		if (gesture?.moved && this.view.state.doc === gesture.doc && this.view.editable)
			this.commit(gesture.geometry, gesture.kind, gesture.index, gesture.value);
	}
	private commit(geometry: Geometry, kind: Axis, index: number, value: number): void {
		const widths = [...geometry.widths];
		widths[index] = value;
		const tr =
			kind === 'row'
				? resizeTableRow(this.view.state, geometry.position, index, value)
				: resizeTableColumns(this.view.state, geometry.position, widths);
		if (tr) {
			this.view.dispatch(tr);
			this.view.dispatch(closeHistory(this.view.state.tr).setMeta('addToHistory', false));
			this.status.textContent = `${kind === 'row' ? 'Row' : 'Column'} ${index + 1} resized to ${Math.round(value)} pixels.`;
		}
	}
	private keyboard(event: KeyboardEvent): void {
		const target = this.target(event),
			geometry = this.geometry();
		if (!target || !geometry) return;
		const delta =
			target.kind === 'row'
				? event.key === 'ArrowDown'
					? 1
					: event.key === 'ArrowUp'
						? -1
						: 0
				: event.key === 'ArrowRight'
					? 1
					: event.key === 'ArrowLeft'
						? -1
						: 0;
		if (!delta) return;
		const rect = (target.kind === 'row' ? geometry.rows : geometry.columns)[target.index];
		if (!rect) return;
		event.preventDefault();
		this.commit(
			geometry,
			target.kind,
			target.index,
			(target.kind === 'row'
				? Number(attributes(geometry.node.child(target.index))['height']) || rect.height
				: rect.width) +
				delta * (event.shiftKey ? 1 : 8),
		);
	}
	private cancel(): void {
		const gesture = this.gesture;
		this.gesture = undefined;
		gesture?.events.abort();
		if (gesture?.button.hasPointerCapture(gesture.pointerId))
			gesture.button.releasePointerCapture(gesture.pointerId);
		this.guide.hidden = true;
		this.feedback.hidden = true;
	}
	destroy(): void {
		this.destroyed = true;
		this.cancel();
		this.events.abort();
		this.observer.disconnect();
		if (this.frame) this.view.dom.ownerDocument.defaultView?.cancelAnimationFrame(this.frame);
		this.layer.remove();
	}
}

/** Register pointer/keyboard row and column boundaries without constructing DOM during SSR. */
export function tableResizing(): Plugin {
	return new Plugin({
		key: new PluginKey('editra-table-resizing'),
		// One owner for pointer resizing; keep ProseMirror's column layout without its competing mouse handlers.
		props: { nodeViews: { table: (node) => new EditraTableView(node, 48) } },
		view: (view) => new TableResizeControls(view),
	});
}
