import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { guideNavigation } from '../../content/generated/navigation';
import { DocsTheme } from '../../core/services/docs-theme.service';
import { PublishedPackage } from '../../core/services/published-package.service';

@Component({
	selector: 'app-docs-shell',
	standalone: true,
	imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
	templateUrl: './docs-shell.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsShellComponent {
	private readonly published = inject(PublishedPackage);
	get package() {
		return this.published.info();
	}
	private readonly theme = inject(DocsTheme);
	readonly guides = guideNavigation;
	readonly groups = [...new Set(guideNavigation.map((guide) => guide.group))];
	readonly menuOpen = signal(false);
	readonly dark = this.theme.dark;
	query = '';
	get results() {
		const query = this.query.trim().toLowerCase();
		return query
			? guideNavigation.filter((guide) =>
					`${guide.title.toLowerCase()} ${guide.search}`.includes(query),
				)
			: [];
	}
	toggleTheme(): void {
		this.theme.toggle();
	}
	closeMenu(): void {
		this.menuOpen.set(false);
		this.query = '';
	}
}
