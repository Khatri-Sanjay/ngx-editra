import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { editraIconPaths } from './icon-paths';

/** Decorative local SVG icon; the containing control supplies its accessible label. */
@Component({
	selector: 'editra-icon',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'aria-hidden': 'true' },
	template: `
		@if (glyph) {
			<span class="glyph">{{ glyph }}</span>
		} @else {
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="20"
				height="20"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				@if (letter) {
					<text
						[attr.x]="name === 'font_size' ? 8 : 12"
						y="17"
						text-anchor="middle"
						fill="currentColor"
						stroke="none"
						font-family="Arial, sans-serif"
						[attr.font-size]="name === 'text_case' ? 17 : 20"
						[attr.font-weight]="name === 'bold' ? 700 : 500"
						[attr.font-style]="name === 'italic' ? 'italic' : 'normal'"
					>
						{{ letter }}
					</text>
					@if (name === 'underline') {
						<path d="M5 21h14" />
					}
					@if (name === 'strike') {
						<path d="M4 12h16" />
					}
					@if (name === 'font_size') {
						<path d="M19 4v16 M16 7l3-3 3 3 M16 17l3 3 3-3" />
					}
				} @else {
					@for (path of paths; track $index) {
						<path [attr.d]="path" />
					}
				}
			</svg>
		}
	`,
	styles: `
		:host {
			display: inline-flex;
			width: 20px;
			height: 20px;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}
		svg {
			display: block;
		}
		.glyph {
			font:
				600 16px/1 system-ui,
				sans-serif;
		}
	`,
})
export class EditraIconComponent {
	@Input() name = 'custom';
	@Input() glyph = '';
	get letter(): string {
		return (
			(
				{
					font: 'A',
					font_size: 'A',
					text_case: 'Aa',
					text_color: 'A',
				} as Record<string, string>
			)[this.name] ?? ''
		);
	}
	get paths(): readonly string[] {
		return editraIconPaths(this.name);
	}
}
