import type { Node } from 'prosemirror-model';
import type { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

/** Copy controls are view-only and never become part of saved code. */
export class CodeBlockNodeView implements NodeView {
	readonly dom: HTMLDivElement;
	readonly contentDOM: HTMLElement;
	private readonly header: HTMLDivElement;
	private readonly language: HTMLSelectElement;
	private readonly status: HTMLSpanElement;
	private readonly button: HTMLButtonElement;
	private timer: ReturnType<typeof setTimeout> | undefined;
	private destroyed = false;
	constructor(
		private node: Node,
		private readonly view: EditorView,
		private readonly getPos: () => number | undefined,
	) {
		const doc = view.dom.ownerDocument;
		this.dom = doc.createElement('div');
		this.dom.className = 'editra-code-block';
		this.header = doc.createElement('div');
		this.header.className = 'editra-code-header';
		this.header.contentEditable = 'false';
		this.language = doc.createElement('select');
		this.language.setAttribute('aria-label', 'Code language');
		for (const [value, title] of [
			['', 'Plain text'],
			['java', 'Java'],
			['typescript', 'TypeScript / Angular'],
			['javascript', 'JavaScript'],
			['html', 'HTML / Angular template'],
			['css', 'CSS'],
			['scss', 'SCSS'],
			['python', 'Python'],
			['json', 'JSON'],
			['sql', 'SQL'],
			['bash', 'Shell'],
			['c', 'C'],
			['cpp', 'C++'],
			['csharp', 'C#'],
			['go', 'Go'],
			['rust', 'Rust'],
			['php', 'PHP'],
			['ruby', 'Ruby'],
			['swift', 'Swift'],
			['kotlin', 'Kotlin'],
			['xml', 'XML'],
			['yaml', 'YAML'],
			['markdown', 'Markdown'],
		] as const) {
			const option = doc.createElement('option');
			option.value = value;
			option.textContent = title;
			this.language.append(option);
		}
		this.language.addEventListener('change', this.changeLanguage);
		this.status = doc.createElement('span');
		this.status.className = 'editra-code-status';
		this.status.setAttribute('role', 'status');
		this.button = doc.createElement('button');
		this.button.type = 'button';
		this.setCopyState(false);
		this.button.setAttribute('aria-label', 'Copy code');

		this.button.addEventListener('click', this.onCopy);
		this.header.append(this.language, this.status, this.button);
		const pre = doc.createElement('pre');
		this.contentDOM = doc.createElement('code');
		pre.append(this.contentDOM);
		this.dom.append(this.header, pre);
		this.syncLanguage();
	}
	private readonly onCopy = () => {
		void this.copy();
	};
	private readonly copy = async () => {
		try {
			await this.dom.ownerDocument.defaultView?.navigator.clipboard.writeText(
				this.node.textContent,
			);
			if (this.destroyed) return;
			this.setCopyState(true);
			this.status.textContent = 'Copied!';
		} catch {
			if (this.destroyed) return;
			this.status.textContent = 'Unable to copy. Select the code and copy manually.';
		}
		if (this.timer !== undefined) clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.setCopyState(false);
			this.status.textContent = '';
		}, 2000);
	};
	update(node: Node): boolean {
		if (node.type !== this.node.type) return false;
		this.node = node;
		this.syncLanguage();
		return true;
	}
	private syncLanguage(): void {
		const value = String(this.node.attrs['language'] || '');
		if (!Array.from(this.language.options).some((option) => option.value === value)) {
			const option = this.dom.ownerDocument.createElement('option');
			option.value = value;
			option.textContent = value;
			this.language.append(option);
		}
		this.language.value = value;
	}
	private readonly changeLanguage = () => {
		const pos = this.getPos();
		if (pos === undefined || !this.view.editable) {
			this.syncLanguage();
			return;
		}
		this.view.dispatch(
			this.view.state.tr.setNodeMarkup(pos, undefined, {
				...this.node.attrs,
				language: this.language.value,
			}),
		);
	};
	private setCopyState(copied: boolean): void {
		const doc = this.dom.ownerDocument;
		const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('viewBox', '0 0 24 24');
		svg.setAttribute('width', '18');
		svg.setAttribute('height', '18');
		svg.setAttribute('fill', 'none');
		svg.setAttribute('stroke', 'currentColor');
		svg.setAttribute('stroke-width', '1.6');
		svg.setAttribute('aria-hidden', 'true');
		const path = doc.createElementNS(svg.namespaceURI, 'path');
		path.setAttribute('d', copied ? 'M5 12l4 4L19 6' : 'M8 8h12v13H8z M16 8V3H3v13h5');
		svg.append(path);
		this.button.replaceChildren(svg);
		this.button.title = copied ? 'Copied!' : 'Copy code';
	}
	stopEvent(event: Event): boolean {
		return event.target instanceof globalThis.Node && this.header.contains(event.target);
	}
	ignoreMutation(mutation: ViewMutationRecord): boolean {
		return mutation.type !== 'selection' && this.header.contains(mutation.target);
	}
	destroy(): void {
		this.destroyed = true;
		if (this.timer !== undefined) clearTimeout(this.timer);
		this.button.removeEventListener('click', this.onCopy);
		this.language.removeEventListener('change', this.changeLanguage);
	}
}
