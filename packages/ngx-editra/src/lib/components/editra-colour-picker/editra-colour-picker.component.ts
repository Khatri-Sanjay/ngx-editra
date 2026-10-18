import { scrollChangedSinceOpen } from '../../utils/popup-behavior';
import { lockPageScroll } from '../../utils/page-scroll-lock';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild,
	inject,
} from '@angular/core';
import type { ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { safeColor } from '../../core/public-api';
import { EditraIconComponent } from '../editra-icon/editra-icon.component';
import { observePopover, positionPopover } from '../../utils/popover-position';
import { themeColours, standardColours, highlightColours } from './colour-palettes';

@Component({
	selector: 'editra-colour-picker',
	standalone: true,
	imports: [EditraIconComponent],
	templateUrl: './editra-colour-picker.component.html',
	styleUrl: './editra-colour-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditraColourPickerComponent implements OnChanges, OnDestroy {
	@Input() label = 'Text colour';
	@Input() kind: 'color' | 'highlight' | 'background' | 'border' = 'color';
	@Input() value = '';
	@Input() disabled = false;
	@Output() readonly colourChange = new EventEmitter<string | null>();
	@Output() readonly opened = new EventEmitter<void>();
	@Output() readonly closed = new EventEmitter<void>();
	@ViewChild('palette') private palette?: ElementRef<HTMLDialogElement>;
	@ViewChild('toggle') private toggle?: ElementRef<HTMLButtonElement>;
	private readonly document = inject(DOCUMENT);
	private readonly changeDetector = inject(ChangeDetectorRef);
	private events: AbortController | undefined;
	private lastUsed = '';
	private readonly groupFocus = new Map<string, number>();
	recent: readonly string[] = [];
	customColour = '#4472c4';
	error = '';
	isOpen = false;
	get colour(): string {
		return (
			safeColor(this.value) ??
			(this.lastUsed ||
				(this.kind === 'highlight'
					? '#ffff00'
					: this.kind === 'background'
						? '#ffffff'
						: '#182338'))
		);
	}
	get icon(): string {
		if (this.kind === 'border') return 'table';
		return this.kind === 'highlight'
			? 'highlight'
			: this.kind === 'background'
				? 'cell_color'
				: 'text_color';
	}
	get indicatorColour(): string {
		return this.kind === 'color' && !safeColor(this.value) && !this.lastUsed
			? 'var(--editra-text, #182338)'
			: this.colour;
	}
	get title(): string {
		if (this.kind === 'border') return 'Table border colour';
		return this.kind === 'highlight'
			? 'Text highlight colour'
			: this.kind === 'background'
				? 'Cell shading'
				: 'Font colour';
	}
	get removeLabel(): string {
		return this.kind === 'color' || this.kind === 'border'
			? 'Automatic'
			: this.kind === 'background'
				? 'No fill'
				: 'No colour';
	}
	get colourGroups() {
		return this.kind === 'highlight'
			? [{ title: 'Highlight colours', columns: 8, colours: highlightColours }]
			: [
					{ title: 'Theme colours', columns: 10, colours: themeColours },
					{ title: 'Standard colours', columns: 10, colours: standardColours },
				];
	}
	ngOnChanges(): void {
		this.groupFocus.clear();
		if (this.disabled) this.close(false);
	}
	applyLast(): void {
		if (!this.disabled)
			this.choose(
				this.kind === 'color' && !safeColor(this.value) && !this.lastUsed
					? null
					: this.colour,
			);
	}
	private releaseScroll: (() => void) | undefined;
	openPalette(): void {
		if (this.disabled) return;
		if (this.isOpen) {
			this.close(true);
			return;
		}
		const palette = this.palette?.nativeElement,
			toggle = this.toggle?.nativeElement;
		if (!palette || !toggle) return;
		this.error = '';
		const selectedColour = safeColor(this.value);
		if (selectedColour && /^#[a-f\d]{6}$/iu.test(selectedColour))
			this.customColour = selectedColour;
		this.isOpen = true;
		this.opened.emit();
		palette.show();
		this.releaseScroll = lockPageScroll(this.document);
		this.position();
		const events = new AbortController();
		this.events = events;
		this.document.addEventListener(
			'pointerdown',
			(event) => {
				const target = event.target;
				if (
					target instanceof Node &&
					!palette.contains(target) &&
					!toggle.closest('editra-colour-picker')?.contains(target)
				)
					this.close(false);
			},
			{ capture: true, signal: events.signal },
		);
		this.document.addEventListener(
			'focusin',
			(event) => {
				if (
					event.target instanceof Node &&
					!toggle.closest('editra-colour-picker')?.contains(event.target)
				)
					this.close(false);
			},
			{ signal: events.signal },
		);
		observePopover(palette, toggle, events.signal);
		const blockScroll = (event: Event): void => {
			if (!(event.target instanceof Node && palette.contains(event.target)))
				event.preventDefault();
		};
		this.document.defaultView?.addEventListener('wheel', blockScroll, {
			capture: true,
			passive: false,
			signal: events.signal,
		});
		this.document.defaultView?.addEventListener('touchmove', blockScroll, {
			capture: true,
			passive: false,
			signal: events.signal,
		});
		const scrollChanged = scrollChangedSinceOpen(toggle);
		this.document.defaultView?.addEventListener(
			'scroll',
			(event) => {
				if (
					!(event.target instanceof Node && palette.contains(event.target)) &&
					scrollChanged(event.target)
				)
					this.close(false);
			},
			{
				capture: true,
				signal: events.signal,
			},
		);
		(
			(!this.value ? palette.querySelector<HTMLButtonElement>('.automatic-colour') : null) ??
			palette.querySelector<HTMLButtonElement>('[data-swatch][aria-pressed="true"]') ??
			palette.querySelector<HTMLButtonElement>('[data-swatch][tabindex="0"]')
		)?.focus({ preventScroll: true });
	}
	swatchTabIndex(
		group: string,
		index: number,
		colours: readonly { readonly colour: string }[],
	): number {
		const selected = colours.findIndex((swatch) => swatch.colour === safeColor(this.value));
		return index === (this.groupFocus.get(group) ?? Math.max(0, selected)) ? 0 : -1;
	}
	focusSwatch(group: string, index: number): void {
		this.groupFocus.set(group, index);
	}
	private position(): void {
		const palette = this.palette?.nativeElement,
			toggle = this.toggle?.nativeElement;
		if (palette && toggle) positionPopover(palette, toggle);
	}
	choose(colour: string | null): void {
		if (this.disabled) return;
		const valid = colour === null ? null : safeColor(colour);
		if (colour !== null && !valid) return;
		if (valid) {
			this.lastUsed = valid;
			this.customColour = /^#[a-f\d]{6}$/iu.test(valid) ? valid : this.customColour;
			this.recent = [valid, ...this.recent.filter((recent) => recent !== valid)].slice(0, 10);
		}
		this.colourChange.emit(valid);
		this.close(false);
	}
	updateCustom(event: Event): void {
		if (event.target instanceof HTMLInputElement) {
			this.customColour = event.target.value;
			this.error = '';
		}
	}
	applyCustom(): void {
		const colour = this.customColour.trim();
		if (!/^#[a-f\d]{6}$/iu.test(colour)) {
			this.error = 'Use a hex colour such as #4472c4.';
			return;
		}
		this.choose(colour.toLowerCase());
	}
	useNative(event: Event): void {
		if (event.target instanceof HTMLInputElement) this.choose(event.target.value);
	}
	close(restoreFocus: boolean): void {
		if (!this.isOpen) return;
		this.isOpen = false;
		this.releaseScroll?.();
		this.releaseScroll = undefined;
		this.events?.abort();
		this.events = undefined;
		this.palette?.nativeElement.close();
		this.closed.emit();
		if (restoreFocus) this.toggle?.nativeElement.focus({ preventScroll: true });
		this.changeDetector.markForCheck();
	}
	navigate(event: KeyboardEvent): void {
		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			this.close(true);
			return;
		}
		if (
			!(event.target instanceof HTMLButtonElement) ||
			!event.target.hasAttribute('data-swatch')
		)
			return;
		const group = event.target.closest('[data-palette]');
		if (!group) return;
		const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('[data-swatch]'));
		const index = buttons.indexOf(event.target),
			columns = Number(group.getAttribute('data-columns')) || 10;
		const delta =
			event.key === 'ArrowRight'
				? 1
				: event.key === 'ArrowLeft'
					? -1
					: event.key === 'ArrowDown'
						? columns
						: event.key === 'ArrowUp'
							? -columns
							: 0;
		if (!delta && event.key !== 'Home' && event.key !== 'End') return;
		event.preventDefault();
		event.stopPropagation();
		buttons[
			event.key === 'Home'
				? 0
				: event.key === 'End'
					? buttons.length - 1
					: (index + delta + buttons.length) % buttons.length
		]?.focus({ preventScroll: true });
	}
	ngOnDestroy(): void {
		this.releaseScroll?.();
		this.events?.abort();
	}
}
