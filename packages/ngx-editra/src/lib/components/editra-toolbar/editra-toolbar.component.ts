import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { EditraToolbarItem, EditraToolbarGroup } from '../../core/public-api';
import { EditraIconComponent } from '../editra-icon/editra-icon.component';
import { hasEditraIcon } from '../editra-icon/icon-paths';

export const defaultToolbar: readonly EditraToolbarItem[] = [
	...[
		'undo',
		'redo',
		'bold',
		'italic',
		'underline',
		'strike',
		'subscript',
		'superscript',
		'clear',
	].map((command) => ({ id: command, label: command, command })),
	...['left', 'center', 'right', 'justify'].map((align) => ({
		id: `align_${align}`,
		label: `Align ${align}`,
		command: `align_${align}`,
	})),
	...['bullet_list', 'ordered_list', 'indent', 'outdent', 'blockquote', 'code_block'].map(
		(command) => ({ id: command, label: command.replaceAll('_', ' '), command }),
	),
];
@Component({
	selector: 'editra-toolbar',
	standalone: true,
	imports: [EditraIconComponent],
	template: `
		<div class="toolbar-shell">
			<div
				role="toolbar"
				aria-label="Formatting and insert options"
				tabindex="0"
				class="options-bar"
				(keydown)="navigate($event)"
			>
				<ng-content />
			</div>
			<div
				role="toolbar"
				tabindex="0"
				aria-label="Text formatting"
				class="command-bar"
				[class.scroll]="overflow === 'scroll'"
				(keydown)="navigate($event)"
			>
				@for (group of renderedGroups; track group.id) {
					<div role="group" [attr.aria-label]="group.label" class="toolbar-group">
						@for (item of group.items; track item.id) {
							<button
								class="command-button"
								type="button"
								[disabled]="disabled || !enabled(item.command)"
								[attr.aria-label]="item.label"
								[attr.aria-pressed]="active(item.command)"
								[title]="commandTitle(item)"
								(pointerdown)="$event.preventDefault()"
								(click)="execute.emit(item.command)"
							>
								<editra-icon
									[name]="item.icon ?? item.command"
									[glyph]="iconGlyph(item)"
								/>
							</button>
						}
					</div>
				}
				<ng-content select="[editor-tools]" />
			</div>
		</div>
	`,
	styles: [
		`
			:host {
				display: block;
				container-type: inline-size;
			}
			[role='toolbar'] {
				position: relative;
				display: flex;
				flex-wrap: wrap;
				gap: 6px;
				align-items: center;
				padding: 8px;
				font-size: 13px;
				min-width: 0;
				background: var(--editra-toolbar, var(--editra-surface, #fff));
			}
			.toolbar-shell {
				border-bottom: 1px solid var(--editra-border, #ccd2dc);
				border-radius: 8px 8px 0 0;
				overflow: hidden;
			}
			.options-bar {
				border-bottom: 1px solid var(--editra-border, #ccd2dc);
			}
			.options-bar:empty {
				display: none;
			}
			.command-bar {
				gap: 6px;
			}
			.command-button {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 36px;
				flex-shrink: 0;
			}
			button {
				font: inherit;
				min-height: 36px;
				border: 1px solid transparent;
				border-radius: 5px;
				background: transparent;
				color: inherit;
				padding: 7px;
				cursor: pointer;
			}
			button[aria-pressed='true'] {
				background: var(--editra-active, #dce9ff);
				color: var(--editra-focus, #1763d1);
				border-color: var(--editra-focus, #1763d1);
			}
			button[aria-pressed='mixed'] {
				background: var(--editra-active, #dce9ff);
				border-style: dashed;
				border-color: var(--editra-focus, #1763d1);
			}
			button:not(:disabled):not([aria-pressed='true']):hover {
				background: var(--editra-hover, #e9edf3);
			}
			button:focus-visible {
				outline: 3px solid var(--editra-focus, #1763d1);
				outline-offset: 2px;
			}
			button:disabled {
				opacity: 0.5;
				cursor: default;
			}
			.toolbar-group {
				display: flex;
				gap: 2px;
				flex-wrap: nowrap;
				flex-shrink: 0;
				border-right: 1px solid var(--editra-border, #ccd2dc);
				padding-right: 6px;
				margin-right: 0;
				align-items: center;
			}
			.toolbar-group:last-child {
				border-right: 0;
				margin-right: 0;
				padding-right: 0;
			}
			[role='toolbar'].scroll {
				flex-wrap: nowrap;
				overflow-x: auto;
				max-width: 100%;
				scrollbar-width: thin;
				scroll-padding-inline: 8px;
			}
			.scroll .toolbar-group {
				flex-wrap: nowrap;
				flex-shrink: 0;
			}
			@container (max-width: 640px) {
				[role='toolbar'] {
					flex-wrap: nowrap;
					overflow-x: auto;
					max-width: 100%;
					scrollbar-width: thin;
					scroll-padding-inline: 8px;
				}
				.command-bar .toolbar-group {
					flex-wrap: nowrap;
					flex-shrink: 0;
				}
			}
			@media (pointer: coarse) {
				.command-button {
					width: 44px;
					min-height: 44px;
				}
			}
		`,
	],
})
export class EditraToolbarComponent {
	@Input() items: readonly EditraToolbarItem[] = defaultToolbar;
	@Input() groups: readonly EditraToolbarGroup[] = [];
	@Input() overflow: 'wrap' | 'scroll' = 'scroll';
	get renderedGroups(): readonly EditraToolbarGroup[] {
		if (this.groups.length) return this.groups.filter((group) => group.items.length);
		const groups: { id: string; label: string; items: EditraToolbarItem[] }[] = [];
		for (const item of this.items) {
			const label = ['undo', 'redo'].includes(item.command)
				? 'History'
				: [
							'bold',
							'italic',
							'underline',
							'strike',
							'subscript',
							'superscript',
							'clear',
					  ].includes(item.command)
					? 'Text formatting'
					: item.command.startsWith('align_')
						? 'Alignment'
						: ['bullet_list', 'ordered_list', 'indent', 'outdent'].includes(
									item.command,
							  )
							? 'Lists and indentation'
							: ['blockquote', 'code', 'code_block', 'horizontal_rule'].includes(
										item.command,
								  )
								? 'Blocks and code'
								: 'Custom commands';
			const previous = groups[groups.length - 1];
			if (previous?.label === label) previous.items.push(item);
			else groups.push({ id: `group-${groups.length}`, label, items: [item] });
		}
		return groups;
	}
	iconGlyph(item: EditraToolbarItem): string {
		return item.icon && !hasEditraIcon(item.icon) ? item.icon : '';
	}
	commandTitle(item: EditraToolbarItem): string {
		const shortcuts: Readonly<Record<string, string>> = {
			bold: 'Ctrl/⌘+B',
			italic: 'Ctrl/⌘+I',
			underline: 'Ctrl/⌘+U',
			undo: 'Ctrl/⌘+Z',
			redo: 'Ctrl/⌘+Shift+Z',
		};
		const label = item.label.charAt(0).toUpperCase() + item.label.slice(1);
		return shortcuts[item.command] ? `${label} (${shortcuts[item.command]})` : label;
	}
	@Input() disabled = false;
	@Input() enabled: (id: string) => boolean = () => true;
	@Input() active: (id: string) => boolean | 'mixed' = () => false;
	@Output() readonly execute = new EventEmitter<string>();
	navigate(event: KeyboardEvent): void {
		if (event.defaultPrevented) return;
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement)
			return;
		if (
			!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) ||
			!(event.currentTarget instanceof HTMLElement)
		)
			return;
		const buttons = Array.from(
			event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
		).filter((button) => button.getClientRects().length > 0);
		if (!buttons.length) return;
		const index = buttons.findIndex((button) => button === event.target);
		const next =
			event.key === 'Home'
				? 0
				: event.key === 'End'
					? buttons.length - 1
					: (index + (event.key === 'ArrowLeft' ? -1 : 1) + buttons.length) %
						buttons.length;
		buttons[next]?.focus();
		event.preventDefault();
	}
}
