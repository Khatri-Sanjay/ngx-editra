import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeExampleComponent } from '../../shared/components/code-example/code-example.component';
import { packageInfo } from '../../content/generated/package-info';
@Component({
	selector: 'app-docs-home',
	standalone: true,
	imports: [RouterLink, CodeExampleComponent],
	templateUrl: './home.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	readonly package = packageInfo;
	readonly tasks = [
		{
			slug: 'features',
			title: 'Explore every feature',
			description:
				'See what writers and application developers can do, with links to each guide.',
		},
		{
			slug: 'content',
			title: 'Load and save a document',
			description:
				'Read form HTML, restore a draft, and choose HTML, JSON, plain text, or Markdown.',
		},
		{
			slug: 'viewer',
			title: 'Display saved content',
			description:
				'Render an article with the read-only viewer and preserve supported formatting.',
		},
		{
			slug: 'formatting',
			title: 'Format text and paragraphs',
			description:
				'Use headings, colours, highlights, lists, alignment, spacing, and text-case tools.',
		},
		{
			slug: 'layout',
			title: 'Build richer layouts',
			description: 'Work with side-by-side columns, image sections, and horizontal dividers.',
		},
		{
			slug: 'troubleshooting',
			title: 'Solve an integration problem',
			description:
				'Check installation, styles, forms, media, clipboard access, and server rendering.',
		},
	];
	readonly example = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxEditraComponent } from 'ngx-editra';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgxEditraComponent],
  template: '<ngx-editra [formControl]="body" />',
})
export class ExampleComponent {
  readonly body = new FormControl('<p>Hello, Editra.</p>',
    { nonNullable: true });
}`;
}
