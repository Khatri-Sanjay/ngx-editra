import { lockPageScroll } from './page-scroll-lock';
import { observePopover } from './popover-position';

/** Ignore queued scroll notifications for positions already current when a panel opens. */
export function scrollChangedSinceOpen(
	anchor: HTMLElement,
): (target: EventTarget | null) => boolean {
	const position = (target: EventTarget | null): string =>
		target instanceof HTMLElement
			? target.scrollLeft + ':' + target.scrollTop
			: (anchor.ownerDocument.defaultView?.scrollX ?? 0) +
				':' +
				(anchor.ownerDocument.defaultView?.scrollY ?? 0);
	const positions = new Map<EventTarget, string>();
	for (let element: HTMLElement | null = anchor; element; element = element.parentElement)
		positions.set(element, position(element));
	positions.set(anchor.ownerDocument, position(anchor.ownerDocument));
	return (target) => !target || positions.get(target) !== position(target);
}

/** Floating toolbar panels contain scrolling and clean up on every dismissal path. */
export function openToolbarPopup(popup: HTMLElement, anchor: HTMLElement): () => void {
	popup.showPopover();
	const events = new AbortController(),
		release = lockPageScroll(popup.ownerDocument);
	const window = popup.ownerDocument.defaultView;
	const scrollChanged = scrollChangedSinceOpen(anchor);
	observePopover(popup, anchor, events.signal);
	const inside = (target: EventTarget | null): boolean =>
		target instanceof Node &&
		(popup.contains(target) ||
			(target instanceof HTMLElement &&
				!!target.closest('[popover]:popover-open,dialog[open]')));
	const cleanup = (): void => {
		events.abort();
		release();
	};
	popup.addEventListener(
		'toggle',
		() => {
			if (!popup.matches(':popover-open')) cleanup();
		},
		{ signal: events.signal },
	);
	const block = (event: Event): void => {
		if (!inside(event.target)) event.preventDefault();
	};
	window?.addEventListener('wheel', block, {
		capture: true,
		passive: false,
		signal: events.signal,
	});
	window?.addEventListener('touchmove', block, {
		capture: true,
		passive: false,
		signal: events.signal,
	});
	window?.addEventListener(
		'scroll',
		(event) => {
			if (
				!inside(event.target) &&
				scrollChanged(event.target) &&
				popup.matches(':popover-open')
			)
				popup.hidePopover();
		},
		{ capture: true, signal: events.signal },
	);
	window?.addEventListener(
		'keydown',
		(event) => {
			if (event.key !== 'Escape') return;
			const other =
				event.target instanceof HTMLElement
					? event.target.closest('[popover],dialog')
					: null;
			if (other && other !== popup) return;
			event.preventDefault();
			event.stopPropagation();
			popup.hidePopover();
			anchor.focus({ preventScroll: true });
		},
		{ capture: true, signal: events.signal },
	);
	return cleanup;
}
