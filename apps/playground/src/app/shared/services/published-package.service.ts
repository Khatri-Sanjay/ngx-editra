import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, timeout } from 'rxjs';
import { packageInfo } from '../data/package-info';

@Injectable({ providedIn: 'root' })
export class PublishedPackage {
	private readonly http = inject(HttpClient);
	private readonly document = inject(DOCUMENT);
	private readonly destroyRef = inject(DestroyRef);
	private readonly version = signal<string>(packageInfo.publishedVersion);
	private loading = false;
	readonly info = computed(() => ({ ...packageInfo, publishedVersion: this.version() }));

	constructor() {
		afterNextRender(() => {
			this.refresh();
			const window = this.document.defaultView;
			if (!window) return;
			const refresh = () => this.refresh();
			window.addEventListener('focus', refresh);
			const timer = window.setInterval(refresh, 5 * 60 * 1000);
			this.destroyRef.onDestroy(() => {
				window.removeEventListener('focus', refresh);
				window.clearInterval(timer);
			});
		});
	}

	private refresh(): void {
		if (this.loading) return;
		this.loading = true;
		this.http
			.get<unknown>(
				`https://registry.npmjs.org/${encodeURIComponent(packageInfo.name)}/latest`,
				{
					cache: 'no-store',
					credentials: 'omit',
					transferCache: false,
				},
			)
			.pipe(
				timeout(5000),
				takeUntilDestroyed(this.destroyRef),
				finalize(() => (this.loading = false)),
			)
			.subscribe({
				next: (value) => {
					if (
						!value ||
						typeof value !== 'object' ||
						!('name' in value) ||
						!('version' in value)
					)
						return;
					if (
						value.name === packageInfo.name &&
						typeof value.version === 'string' &&
						/^\d+\.\d+\.\d+(?:-[\da-zA-Z]+(?:[.-][\da-zA-Z]+)*)?(?:\+[\da-zA-Z]+(?:[.-][\da-zA-Z]+)*)?$/.test(
							value.version,
						)
					)
						this.version.set(value.version);
				},
				error: () => {
					// Keep the last known release when the registry is unavailable.
				},
			});
	}
}
