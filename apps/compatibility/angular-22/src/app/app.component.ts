import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NgxEditraComponent,
	EditraContentDirective,
	EditraHtmlPipe,
	NgxEditraViewerComponent,
} from 'ngx-editra';
import type { EditraConfig, EditraChange, EditraTheme } from 'ngx-editra';
import { demoContent } from './demo-content';
import { SignalFormsExampleComponent } from './signal-forms-example.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		SignalFormsExampleComponent,
		FormsModule,
		ReactiveFormsModule,
		NgxEditraComponent,
		EditraContentDirective,
		EditraHtmlPipe,
		NgxEditraViewerComponent,
	],
	templateUrl: './playground.html',
	styleUrl: './playground.scss',
})
export class AppComponent {
	@ViewChild('editor') editor?: NgxEditraComponent;
	readonly initial = demoContent;
	readonly form = new FormGroup({ body: new FormControl(demoContent, { nonNullable: true }) });
	config: EditraConfig = {
		theme: 'light',
		placeholder: 'Your story starts here…',
		minHeight: 320,
	};
	readonly compactConfig: EditraConfig = { toolbar: { hidden: true } };
	readonly formats = ['HTML', 'JSON', 'Text', 'Markdown'];
	selected = 'HTML';
	readOnly = false;
	mounted = true;
	signalsOpen = false;
	toggleSignals(event: Event): void {
		if (event.target instanceof HTMLDetailsElement) this.signalsOpen = event.target.open;
	}
	templateValue = '<p>A template-driven editor.</p>';
	markdownInput = '# Fresh ideas\n\nStart with **something small**.';
	htmlInput = '<p>Imported HTML</p>';
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
	importMarkdown(): void {
		this.editor?.setMarkdown(this.markdownInput);
		this.form.controls.body.setValue(this.editor?.getHTML() ?? '');
	}
	importHTML(): void {
		this.editor?.setHTML(this.htmlInput);
	}
}
