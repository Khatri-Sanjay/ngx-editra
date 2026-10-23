import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, inject, NgZone, PLATFORM_ID } from '@angular/core';
import type { AfterViewInit, OnDestroy } from '@angular/core';

/** Adds accessible copy controls to code blocks inserted through innerHTML. */
@Directive({ selector: '[editraCodeCopy]', standalone: true, host: { '(click)': 'copy($event)' } })
export class EditraCodeCopyDirective implements AfterViewInit, OnDestroy {
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	private readonly platform = inject(PLATFORM_ID);
	private readonly zone = inject(NgZone);
	private observer?: MutationObserver;
	private readonly timers = new Map<HTMLButtonElement, ReturnType<typeof setTimeout>>();
	private destroyed = false;

	ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platform)) return;
		this.zone.runOutsideAngular(() => {
			this.decorate();
			this.observer = new MutationObserver(() => this.decorate());
			this.observer.observe(this.element, { childList: true, subtree: true });
		});
	}

	private decorate(): void {
		for (const [button, timer] of this.timers) {
			if (this.element.contains(button)) continue;
			clearTimeout(timer);
			this.timers.delete(button);
		}
		const doc = this.element.ownerDocument;
		for (const pre of Array.from(this.element.querySelectorAll('pre'))) {
			if (!pre.querySelector('code') || pre.closest('.editra-rendered-code')) continue;
			const wrapper = doc.createElement('div');
			wrapper.className = 'editra-rendered-code';
			const header = doc.createElement('div');
			header.className = 'editra-rendered-code-header';
			const language = doc.createElement('span');
			language.textContent = pre.dataset['language'] || 'Plain text';
			const status = doc.createElement('span');
			status.className = 'editra-copy-status';
			status.setAttribute('role', 'status');
			const button = doc.createElement('button');
			button.type = 'button';
			button.className = 'editra-copy-code';
			button.title = 'Copy code';
			button.setAttribute('aria-label', 'Copy code');
			const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
			for (const [key, value] of Object.entries({
				viewBox: '0 0 24 24',
				width: '18',
				height: '18',
				fill: 'none',
				stroke: 'currentColor',
				'stroke-width': '1.6',
				'aria-hidden': 'true',
			}))
				svg.setAttribute(key, value);
			const path = doc.createElementNS(svg.namespaceURI, 'path');
			path.setAttribute('d', 'M8 8h12v13H8z M16 8V3H3v13h5');
			svg.append(path);
			button.append(svg);
			header.append(language, status, button);
			pre.before(wrapper);
			wrapper.append(header, pre);
		}
	}

	async copy(event: Event): Promise<void> {
		const target = event.target;
		if (!(target instanceof Element)) return;
		const button = target.closest<HTMLButtonElement>('button.editra-copy-code');
		if (!button || !this.element.contains(button)) return;
		const wrapper = button.closest('.editra-rendered-code');
		const code = wrapper?.querySelector('pre > code');
		const status = wrapper?.querySelector('.editra-copy-status');
		if (!code || !status) return;
		const timer = this.timers.get(button);
		if (timer !== undefined) clearTimeout(timer);
		try {
			const clipboard = this.element.ownerDocument.defaultView?.navigator.clipboard;
			if (!clipboard) throw new Error('Clipboard unavailable');
			await clipboard.writeText(code.textContent ?? '');
			if (this.destroyed || !this.element.contains(button)) return;
			status.textContent = 'Copied!';
			button.title = 'Copied!';
			button.setAttribute('aria-label', 'Copied!');
		} catch {
			if (this.destroyed || !this.element.contains(button)) return;
			status.textContent = 'Unable to copy. Select the code and copy manually.';
		}
		this.timers.set(
			button,
			setTimeout(() => {
				status.textContent = '';
				button.title = 'Copy code';
				button.setAttribute('aria-label', 'Copy code');
				this.timers.delete(button);
			}, 2000),
		);
	}

	ngOnDestroy(): void {
		this.destroyed = true;
		this.observer?.disconnect();
		for (const timer of this.timers.values()) clearTimeout(timer);
		this.timers.clear();
	}
}
