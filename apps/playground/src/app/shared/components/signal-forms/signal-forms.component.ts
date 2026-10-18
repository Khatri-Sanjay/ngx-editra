import { Component, signal } from '@angular/core';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import { NgxEditraComponent } from 'ngx-editra';

@Component({
	standalone: true,
	imports: [FormField, NgxEditraComponent],
	selector: 'app-signal-forms',
	styleUrl: './signal-forms.component.scss',
	templateUrl: './signal-forms.component.html',
})
export class SignalFormsComponent {
	readonly initial = '<p>A signal-driven draft.</p>';
	readonly model = signal({ body: this.initial });
	readonly locked = signal(false);
	readonly article = form(this.model, (path) => {
		required(path.body);
		disabled(path.body, () => this.locked());
	});
	reset(): void {
		this.article().reset({ body: this.initial });
	}
}
