import { DOCUMENT } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	Input,
	signal,
} from '@angular/core';
import type { OnChanges } from '@angular/core';

@Component({
	selector: 'app-code-example',
	standalone: true,
	templateUrl: './code-example.component.html',
	styleUrl: './code-example.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeExampleComponent implements OnChanges {
	@Input({ required: true }) code = '';
	@Input() language = '';
	@Input() label = 'Code example';
	private readonly document = inject(DOCUMENT);
	private timer?: ReturnType<typeof setTimeout>;
	private revision = 0;
	readonly state = signal<'idle' | 'copying' | 'copied' | 'error'>('idle');
	constructor() {
		inject(DestroyRef).onDestroy(() => {
			this.revision++;
			if (this.timer !== undefined) clearTimeout(this.timer);
		});
	}
	ngOnChanges(): void {
		this.revision++;
		if (this.timer !== undefined) clearTimeout(this.timer);
		this.state.set('idle');
	}
	async copy(): Promise<void> {
		if (this.state() === 'copying') return;
		const revision = this.revision;
		if (this.timer !== undefined) clearTimeout(this.timer);
		this.state.set('copying');
		try {
			const clipboard = this.document.defaultView?.navigator.clipboard;
			if (!clipboard) throw new Error('Clipboard unavailable');
			await clipboard.writeText(this.code);
			if (revision !== this.revision) return;
			this.state.set('copied');
			this.timer = setTimeout(() => this.state.set('idle'), 2000);
		} catch {
			if (revision !== this.revision) return;
			this.state.set('error');
		}
	}
}
