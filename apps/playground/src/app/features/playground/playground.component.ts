import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NgxEditraComponent,
	EditraContentDirective,
	EditraHtmlPipe,
	NgxEditraViewerComponent,
	EditraEngine,
	exportMarkdown,
} from 'ngx-editra';
import type { EditraConfig, EditraChange, EditraTheme } from 'ngx-editra';
import { demoContent } from './data/demo-content';
import { imageExtension, videoExtension } from 'ngx-editra';
import { toolbarPreset } from './toolbar-presets';
import { samples } from './data/samples';
import { DocumentOutputComponent } from '../../shared/components/document-output/document-output.component';
import type { DocumentFormat } from '../../shared/components/document-output/document-output.component';
import { EmailExportComponent } from '../../shared/components/email-export/email-export.component';
import { packageInfo } from '../../shared/data/package-info';
import { SignalFormsComponent } from '../../shared/components/signal-forms/signal-forms.component';

@Component({
	selector: 'app-playground',
	standalone: true,
	imports: [
		SignalFormsComponent,
		DocumentOutputComponent,
		EmailExportComponent,
		FormsModule,
		ReactiveFormsModule,
		NgxEditraComponent,
		EditraContentDirective,
		EditraHtmlPipe,
		NgxEditraViewerComponent,
	],
	templateUrl: './playground.component.html',
	styleUrl: './playground.component.scss',
})
export class PlaygroundComponent {
	readonly package = packageInfo;
	@ViewChild('editor') editor?: NgxEditraComponent;
	initial = demoContent;
	readonly samples = samples;
	loadSample(event: Event): void {
		if (!(event.target instanceof HTMLSelectElement)) return;
		const id = event.target.value;
		const sample = samples.find((sample) => sample.id === id);
		if (!sample) return;
		this.initial = sample.html;
		this.form.reset({ body: sample.html });
		this.error = '';
	}
	readonly form = new FormGroup({ body: new FormControl(demoContent, { nonNullable: true }) });
	config: EditraConfig = {
		theme: 'light',
		placeholder: 'Your story starts here…',
		minHeight: 320,
		maxHeight: 560,
		extensions: [imageExtension(), videoExtension()],
	};
	preset(event: Event): void {
		if (event.target instanceof HTMLSelectElement)
			this.config = { ...this.config, toolbar: toolbarPreset(event.target.value) };
	}
	readonly compactConfig: EditraConfig = { toolbar: { hidden: true } };
	selected: DocumentFormat = 'HTML';
	private detachedOutput?: {
		html: string;
		config: EditraConfig;
		values: Record<DocumentFormat, string>;
	};
	readOnly = false;
	mounted = true;
	emailOpen = false;
	signalsOpen = false;
	toggleSignals(event: Event): void {
		if (event.target instanceof HTMLDetailsElement) this.signalsOpen = event.target.open;
	}
	toggleEmail(event: Event): void {
		if (event.target instanceof HTMLDetailsElement) this.emailOpen = event.target.open;
	}
	templateValue = '<p>A template-driven editor.</p>';
	markdownInput = '# Fresh ideas\n\nStart with **something small**.';
	htmlInput = '<h2>Imported HTML</h2><p>Safe <strong>formatting</strong> survives.</p>';
	error = '';
	changed(_event: EditraChange): void {
		this.error = '';
	}
	theme(value: EditraTheme): void {
		this.config = { ...this.config, theme: value };
	}
	disable(value: boolean): void {
		if (value) this.form.controls.body.disable();
		else this.form.controls.body.enable();
	}
	output(): string {
		if (!this.editor || !this.mounted) {
			const html = this.form.controls.body.value;
			if (this.selected === 'HTML') return html;
			if (this.detachedOutput?.html !== html || this.detachedOutput.config !== this.config) {
				const model = new EditraEngine(this.config, html);
				this.detachedOutput = {
					html,
					config: this.config,
					values: {
						HTML: html,
						JSON: JSON.stringify(model.getJSON(), null, 2),
						Text: model.getText(),
						Markdown: exportMarkdown(model.state.doc),
					},
				};
			}
			return this.detachedOutput.values[this.selected];
		}
		switch (this.selected) {
			case 'JSON':
				return JSON.stringify(this.editor.getJSON(), null, 2);
			case 'Text':
				return this.editor.getText();
			case 'Markdown':
				return this.editor.getMarkdown();
			default:
				return this.form.controls.body.value;
		}
	}
	private importDocument(apply: () => void): void {
		if (!this.editor) {
			this.error = 'Mount the editor before importing a document.';
			return;
		}
		try {
			apply();
			this.error = '';
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Unable to import this document.';
		}
	}
	importMarkdown(): void {
		this.importDocument(() => this.editor?.setMarkdown(this.markdownInput));
	}
	importHTML(): void {
		this.importDocument(() => this.editor?.setHTML(this.htmlInput));
	}
}
