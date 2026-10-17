import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NgxEditraComponent,
	EditraContentDirective,
	EditraHtmlPipe,
	NgxEditraViewerComponent,
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

@Component({
	selector: 'app-playground',
	standalone: true,
	imports: [
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
	readOnly = false;
	mounted = true;
	emailOpen = false;
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
		if (!this.editor) return this.form.controls.body.value;
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
