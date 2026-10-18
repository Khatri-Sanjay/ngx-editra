# Angular Forms

Connect the editor to your Angular form just like another value accessor. Its value is an HTML string, so you can load, validate, reset, disable, and save it through the form API.

| Form API                                            | Current support                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| Reactive Forms: `formControl` and `formControlName` | Implemented and integration-tested                                       |
| Template-driven forms: `ngModel`                    | Implemented and integration-tested                                       |
| Signal Forms: `formField`                           | Angular 22 integration-tested through ControlValueAccessor compatibility |

## Complete reactive form example

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxEditraComponent } from 'ngx-editra';

@Component({
	selector: 'app-description-form',
	standalone: true,
	imports: [ReactiveFormsModule, NgxEditraComponent],
	template: `
		<form [formGroup]="form" (ngSubmit)="save()">
			<h2>Article description</h2>
			<ngx-editra formControlName="description" [required]="true" />
			@if (
				form.controls.description.touched && form.controls.description.hasError('required')
			) {
				<p role="alert">Enter a description before saving.</p>
			}
			<button type="submit">Save draft</button>
		</form>
	`,
})
export class DescriptionFormComponent {
	readonly form = new FormGroup({
		description: new FormControl('', { nonNullable: true }),
	});
	save(): void {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;
		const html = this.form.controls.description.value;
		// Send html through your own application service.
		console.log(html);
	}
}
```

Use an actual application service instead of the example console output when persisting data. The editor does not include a backend or submission handler.

## Binding and validation behavior

Import `NgxEditraComponent` with `ReactiveFormsModule` or `FormsModule`.
`[formControl]`, `formControlName`, and `[(ngModel)]` use stable HTML strings.
Null resets to an empty paragraph. `setValue`, `patchValue`, reset, disable and enable
are supported through ControlValueAccessor.

```html
<ngx-editra
	formControlName="description"
	[required]="true"
	[readonly]="readOnly"
	(contentChange)="onContentChange($event)"
/>
```

`required` on the editor validates semantic emptiness, since `<p></p>` is a nonempty string
to Angular's ordinary string validator. Set `[required]="true"` when you need this behavior.
Editor-to-form transactions emit changes; programmatic writes do not emit `contentChange`
or mark the form dirty. Touched is reported when focus leaves the entire editor, including
its toolbar/dialog. Moving focus within the editor does not touch the form.

For autosave, subscribe to form `valueChanges` or `contentChange`, and debounce storage
requests in your application. Required form consistency itself is synchronous.

## Template-driven forms

Import FormsModule and NgxEditraComponent in the component that owns this template. Declare `body = '<p>Initial content.</p>';` on that component.

```html
<ngx-editra [(ngModel)]="body" name="body" [required]="true" />
```

The name is needed when this control is inside a template-driven form. Do not bind ngModel and formControl to the same editor.

## Signal Forms compatibility (Angular 22)

Angular's `FormField` supports components that provide a `ControlValueAccessor`, which
is the editor's existing integration. The editor does not implement the native
`FormValueControl` interface. Signal Forms is stable in Angular 22. See Angular's
[FormField reference](https://angular.dev/api/forms/signals/FormField).

Dedicated Angular 22 consumer tests cover HTML value updates in both directions,
dirty/touched state, disabled state, semantic required validation and resets. Open
**Signal Forms integration** in the playground for a working example. This is CVA
compatibility; the library does not import Angular's Signal Forms API, preserving
compatibility with older Angular applications.

```typescript
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { NgxEditraComponent } from 'ngx-editra';

@Component({
	selector: 'app-signal-description',
	standalone: true,
	imports: [FormField, NgxEditraComponent],
	template: `<ngx-editra [formField]="articleForm.body" />`,
})
export class SignalDescriptionComponent {
	readonly model = signal({ body: '<p>Initial content.</p>' });
	readonly articleForm = form(this.model, (path) => required(path.body));
}
```

Read the HTML from `model().body`. Do not combine `formField`, `ngModel` and `formControl`
on the same editor. This example requires Angular 22; Angular 17–20 applications should
use Reactive Forms or template-driven forms.

Reset values and interaction state together with
`articleForm().reset({ body: '<p>Initial content.</p>' })`. Apply disabled/readonly
rules through Signal Forms rather than competing template bindings. Semantic
validation also updates after programmatic writes and resets.

## Disabled and readonly are different

Call `control.disable()` to disable a reactive control and `control.enable()` to restore it. Disabled controls are excluded from a FormGroup's ordinary value; use Angular's getRawValue when your save policy includes them.

Use the editor's readonly input when users may read the content while the form control remains enabled. Neither state changes the stored HTML. For display without an editor/form control, use the [viewer](VIEWER.md).
