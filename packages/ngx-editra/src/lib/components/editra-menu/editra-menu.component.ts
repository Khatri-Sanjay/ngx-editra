import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { EditraToolbarItem, EditraToolbarGroup } from '../../core/public-api';
import { EditraIconComponent } from '../editra-icon/editra-icon.component';

@Component({
	selector: 'editra-menu',
	standalone: true,
	imports: [EditraIconComponent],
	template: ` <div
		role="menu"
		aria-label="Table actions"
		tabindex="0"
		(keydown)="navigate($event)"
	>
		@for (group of renderedGroups; track group.id) {
			<div
				class="menu-group"
				role="group"
				[attr.aria-label]="group.label || null"
				[class.destructive]="group.id === 'Remove'"
			>
				@if (group.label) {
					<span class="menu-group-label">{{ group.label }}</span>
				}
				@for (item of group.items; track item.id) {
					<button
						type="button"
						role="menuitem"
						[disabled]="!enabled(item.command)"
						(click)="execute.emit(item.command)"
					>
						<editra-icon [name]="item.icon ?? item.command" /> {{ item.label }}
					</button>
				}
			</div>
		}
	</div>`,
	styles: [
		`
			[role='menu'] {
				display: grid;
				grid-template-columns: repeat(2, minmax(0, 1fr));
				gap: 10px;
			}
			.menu-group {
				display: grid;
				align-content: start;
				gap: 3px;
				min-width: 0;
				padding: 10px;
				border-radius: 8px;
				background: var(--editra-toolbar, #f7f9fc);
			}
			.menu-group-label {
				font-size: 11px;
				font-weight: 600;
				color: var(--editra-muted, #56657a);
				margin-bottom: 4px;
			}
			.destructive {
				grid-column: 1 / -1;
				background: transparent;
				border-top: 1px solid var(--editra-border, #ccd2dc);
				border-radius: 0;
				padding: 8px 0 0;
			}
			.destructive .menu-group-label {
				display: none;
			}
			.destructive button:not(:disabled) {
				color: var(--editra-error, #b42318);
			}
			button {
				display: flex;
				align-items: center;
				gap: 10px;
				font:
					400 12px/1.4 system-ui,
					sans-serif;
				text-align: left;
				min-height: 36px;
				padding: 7px 6px;
				background: transparent;
				color: inherit;
				border: 1px solid transparent;
				border-radius: 5px;
				cursor: pointer;
			}
			button:not(:disabled):hover {
				background: var(--editra-hover, #e9edf3);
			}
			button editra-icon {
				transform: scale(0.9);
			}
			button:focus-visible {
				outline: 3px solid var(--editra-focus, #1763d1);
			}
			button:disabled {
				opacity: 0.5;
				cursor: default;
			}
			@media (max-width: 380px) {
				[role='menu'] {
					grid-template-columns: 1fr;
				}
			}
			@media (pointer: coarse) {
				button {
					min-height: 44px;
				}
			}
		`,
	],
})
export class EditraMenuComponent {
	@Input() groups: readonly EditraToolbarGroup[] = [];
	get renderedGroups(): readonly EditraToolbarGroup[] {
		return this.groups.length ? this.groups : [{ id: 'all', label: '', items: this.items }];
	}
	@Input() items: readonly EditraToolbarItem[] = [];
	@Input() enabled: (id: string) => boolean = () => true;
	@Output() readonly execute = new EventEmitter<string>();
	navigate(event: KeyboardEvent): void {
		if (
			!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key) ||
			!(event.currentTarget instanceof HTMLElement)
		)
			return;
		const buttons = Array.from(
				event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
			),
			index = buttons.findIndex((button) => button === event.target);
		const next =
			event.key === 'Home'
				? 0
				: event.key === 'End'
					? buttons.length - 1
					: (index + (event.key === 'ArrowUp' ? -1 : 1) + buttons.length) %
						buttons.length;
		buttons[next]?.focus();
		event.preventDefault();
	}
}
