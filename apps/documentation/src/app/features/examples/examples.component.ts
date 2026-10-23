import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxEditraComponent, NgxEditraViewerComponent } from 'ngx-editra';
import type { EditraConfig, EditraDocument } from 'ngx-editra';
import { DocsTheme } from '../../core/services/docs-theme.service';

@Component({
	selector: 'app-docs-examples',
	standalone: true,
	imports: [ReactiveFormsModule, NgxEditraComponent, NgxEditraViewerComponent, RouterLink],
	templateUrl: './examples.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesComponent {
	private readonly document = inject(DOCUMENT);
	readonly copyStatus = signal('');
	readonly body = new FormControl(
		'<h2>A little room for your ideas.</h2><p>Select some text, try a heading, or add a list. This is the <strong>real editor</strong>, connected to an Angular FormControl.</p><ul><li>Strictly typed configuration</li><li>HTML form values</li><li>Your own extensions</li></ul>',
		{ nonNullable: true },
	);
	private readonly theme = inject(DocsTheme);
	readonly config = computed<EditraConfig>(() => ({
		placeholder: 'Start writing…',
		theme: this.theme.dark() ? 'dark' : 'light',
	}));
	readonly formats: readonly ('html' | 'text' | 'json' | 'markdown')[] = [
		'html',
		'text',
		'json',
		'markdown',
	];
	readonlyState = false;
	output: 'html' | 'text' | 'json' | 'markdown' = 'html';
	toggleDisabled(): void {
		if (this.body.disabled) this.body.enable();
		else this.body.disable();
	}
	reset(): void {
		this.copyStatus.set('');
		this.body.reset('<p>A fresh start.</p>');
	}
	jsonOutput(document: EditraDocument): string {
		return JSON.stringify(document, null, 2);
	}
	async copyOutput(value: string): Promise<void> {
		try {
			const clipboard = this.document.defaultView?.navigator.clipboard;
			if (!clipboard) throw new Error('Clipboard unavailable');
			await clipboard.writeText(value);
			this.copyStatus.set('Document output copied.');
		} catch {
			this.copyStatus.set(
				'Copy unavailable. Select the document source and copy it manually.',
			);
		}
	}
}
