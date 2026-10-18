import type { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'editra-table-grid',
	standalone: true,
	template: ` <p class="table-size-preview" aria-live="polite">
			{{ previewColumns || selectedColumns || 1 }} ×
			{{ previewRows || selectedRows || 1 }} table
		</p>
		<div
			role="grid"
			aria-label="Choose table dimensions"
			tabindex="0"
			aria-multiselectable="true"
			(keydown)="navigate($event)"
			(pointerleave)="previewRows = 0; previewColumns = 0"
		>
			@for (row of rows; track row) {
				<div role="row">
					@for (column of columns; track column) {
						<div
							role="gridcell"
							[attr.aria-selected]="
								row <= (previewRows || selectedRows) &&
								column <= (previewColumns || selectedColumns)
							"
						>
							<button
								type="button"
								[attr.aria-label]="
									'Choose ' + row + ' rows and ' + column + ' columns'
								"
								[attr.data-cell]="(row - 1) * columns.length + column - 1"
								[attr.tabindex]="
									active === (row - 1) * columns.length + column - 1 ? 0 : -1
								"
								(click)="choose(row, column)"
								(pointerenter)="preview(row, column)"
								(focus)="preview(row, column)"
							></button>
						</div>
					}
				</div>
			}
		</div>`,
	styles: [
		`
			[role='grid'] {
				display: inline-block;
				margin: 8px 0;
				padding: 3px;
				border-radius: 5px;
				outline-offset: 1px;
			}
			[role='gridcell'] {
				display: flex;
			}
			[role='row'] {
				display: flex;
				gap: 2px;
				margin-bottom: 2px;
			}
			button {
				width: 24px;
				height: 24px;
				min-height: 24px;
				padding: 0;
				border-radius: 2px;
				border: 1px solid var(--editra-grid-border, var(--editra-border, #77869d));
				background: var(--editra-surface, #fff);
				cursor: pointer;
			}
			[aria-selected='true'] button {
				background: var(--editra-active, #dce9ff);
			}
			button:focus-visible {
				outline: 3px solid var(--editra-focus, #1763d1);
				outline-offset: 1px;
			}
			.table-size-preview {
				margin: 0;
				font-size: 12px;
				font-weight: 600;
				color: var(--editra-focus, #1763d1);
			}
		`,
	],
})
export class EditraTableGridComponent implements OnChanges {
	@Input() maxRows = 8;
	@Input() maxColumns = 10;
	@Input() quickInsert = false;
	@Output() readonly dimensions = new EventEmitter<{ rows: number; columns: number }>();
	@Output() readonly insert = new EventEmitter<{ rows: number; columns: number }>();
	active = 0;
	@Input() selectedRows = 0;
	@Input() selectedColumns = 0;
	previewRows = 0;
	previewColumns = 0;
	ngOnChanges(): void {
		this.previewRows = 0;
		this.previewColumns = 0;
	}
	preview(rows: number, columns: number): void {
		this.previewRows = rows;
		this.previewColumns = columns;
		this.active = (rows - 1) * this.columns.length + columns - 1;
	}
	get rows() {
		return Array.from({ length: Math.max(1, Math.min(8, this.maxRows)) }, (_, i) => i + 1);
	}
	get columns() {
		return Array.from({ length: Math.max(1, Math.min(10, this.maxColumns)) }, (_, i) => i + 1);
	}
	choose(rows: number, columns: number): void {
		this.selectedRows = rows;
		this.selectedColumns = columns;
		this.dimensions.emit({ rows, columns });
		if (this.quickInsert) this.insert.emit({ rows, columns });
	}
	navigate(event: KeyboardEvent): void {
		if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
			this.choose(
				Math.floor(this.active / this.columns.length) + 1,
				(this.active % this.columns.length) + 1,
			);
			event.preventDefault();
			return;
		}
		const delta =
			event.key === 'ArrowLeft'
				? -1
				: event.key === 'ArrowRight'
					? 1
					: event.key === 'ArrowUp'
						? -this.columns.length
						: event.key === 'ArrowDown'
							? this.columns.length
							: 0;
		if (!delta || !(event.currentTarget instanceof HTMLElement)) return;
		this.active =
			(this.active + delta + this.rows.length * this.columns.length) %
			(this.rows.length * this.columns.length);
		event.currentTarget
			.querySelector<HTMLButtonElement>(`button[data-cell="${this.active}"]`)
			?.focus();
		event.preventDefault();
	}
}
