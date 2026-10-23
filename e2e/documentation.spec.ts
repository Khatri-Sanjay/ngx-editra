import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { publishedVersionTests } from './published-version';

publishedVersionTests(
	[
		'.site-header .version',
		'.sidebar-version',
		'.home-page > p:has(a[href="https://www.npmjs.com/package/ngx-editra"])',
	],
	'.home-page > p:has(a[href="https://www.npmjs.com/package/ngx-editra"])',
	'previews development version',
);

async function accessibility(page: Page): Promise<unknown[]> {
	await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
	return page.evaluate(async () => {
		const win = window as unknown as { axe: { run: () => Promise<{ violations: unknown[] }> } };
		return (await win.axe.run()).violations;
	});
}

test('live example copies the selected format and explains clipboard denial', async ({
	page,
	context,
}) => {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/examples');
	await page.getByRole('button', { name: 'JSON', exact: true }).click();
	const source = page.getByRole('region', { name: 'Current document source' });
	await expect(source).toContainText('"type": "doc"');
	await page.getByRole('button', { name: 'Copy output', exact: true }).click();
	await expect(page.getByRole('status')).toHaveText('Document output copied.');
	// Native Windows clipboard text normalizes LF to CRLF.
	expect((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n')).toBe(
		await source.textContent(),
	);
	await page.getByRole('button', { name: 'TEXT', exact: true }).click();
	await expect(page.getByRole('status')).toBeEmpty();
	await page.evaluate(() => {
		Object.defineProperty(navigator.clipboard, 'writeText', {
			value: () => Promise.reject(new Error('Denied')),
		});
	});
	await page.getByRole('button', { name: 'Copy output', exact: true }).click();
	await expect(page.getByRole('status')).toContainText('Copy unavailable');
});

test('mobile navigation closes with Escape and restores keyboard focus', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const menu = page.getByRole('button', { name: 'Menu', exact: true });
	await menu.click();
	await page.getByRole('searchbox').fill('forms');
	await page.getByRole('searchbox').press('Escape');
	await expect(menu).toHaveAttribute('aria-expanded', 'false');
	await expect(menu).toBeFocused();
	await menu.click();
	await expect(page.getByRole('searchbox')).toBeEmpty();
});

test('every documented guide has a prerendered page and code is copyable', async ({
	page,
	request,
	context,
}) => {
	const routes = (await readFile('apps/documentation/prerender-routes.txt', 'utf8'))
		.trim()
		.split(/\r?\n/);
	for (const slug of [
		'deployment',
		'publishing',
		'releasing',
		'maintenance',
		'contributing',
		'project-status',
	])
		expect(routes).not.toContain(`/guides/${slug}`);
	for (const route of routes.filter((route) => route.startsWith('/guides/'))) {
		const response = await request.get(route);
		expect(response.ok(), route).toBe(true);
		expect(await response.text(), route).toContain('guide-prose');
	}
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/guides/quick-start');
	await page.getByRole('button', { name: 'Copy code examples' }).click();
	await expect(page.locator('.copy-status')).toHaveText('Code examples copied.');
	expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
		'NgxEditraComponent',
	);
	await page.goto('/guides/api');
	const anchor = page.locator('.on-this-page a[href*="#"]').first();
	await expect(anchor).toBeVisible();
	await anchor.click();
	await expect(page).toHaveURL(/#/);
	const fragment = new URL(page.url()).hash.slice(1);
	await expect(page.locator(`[id="${fragment}"]`)).toBeVisible();
});

test('docs render on the server, navigate, search, and persist theme', async ({
	page,
	request,
}) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	const response = await request.get('/guides/angular-forms');
	expect(response.ok()).toBe(true);
	expect(await response.text()).toContain('ControlValueAccessor');
	await page.goto('/');
	await expect(
		page.getByRole('heading', { name: 'Your content. Your editor. Your way.' }),
	).toBeVisible();
	await page.getByRole('link', { name: 'Start building' }).click();
	await expect(page).toHaveURL(/guides\/quick-start/);
	await expect(page.locator('.guide-prose h1')).toHaveText('Quick start');
	await expect(page.locator('.guide-prose pre')).toContainText('NgxEditraComponent');
	await page.getByRole('searchbox').fill('javascript/data/file');
	await expect(page.locator('.search-results')).toContainText('Security');
	await page
		.locator('.search-results')
		.getByRole('link', { name: 'Security', exact: false })
		.click();
	await expect(page).toHaveURL(/guides\/security/);
	await page.getByRole('button', { name: 'Toggle dark theme' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await page.goto('/guides/not-a-real-page');
	await expect(page.getByRole('heading', { name: "That page isn't here." })).toBeVisible();
	expect(errors).toEqual([]);
});

test('live example edits real form values and handles disabled, read-only, and reset', async ({
	page,
}) => {
	await page.goto('/examples');
	const surface = page.locator('.ProseMirror');
	await expect(surface).toBeVisible();
	await surface.click();
	await page.keyboard.press('Control+End');
	await page.keyboard.type(' Documentation test.');
	await expect(page.locator('.output-panel pre')).toContainText('Documentation test.');
	await page.getByRole('button', { name: 'TEXT', exact: true }).click();
	await expect(page.locator('.output-panel pre')).not.toContainText('<p>');
	await page.getByRole('button', { name: 'Read-only off', exact: true }).click();
	await expect(surface).toHaveAttribute('contenteditable', 'false');
	await page.getByRole('button', { name: 'Read-only on', exact: true }).click();
	await page.getByRole('button', { name: 'Disable editor', exact: true }).click();
	await expect(surface).toHaveAttribute('contenteditable', 'false');
	await page.getByRole('button', { name: 'Enable editor', exact: true }).click();
	await expect(surface).toHaveAttribute('contenteditable', 'true');
	await page.getByRole('button', { name: 'Reset content', exact: true }).click();
	await expect(surface).toHaveText('A fresh start.');
	await expect(page.locator('ngx-editra-viewer')).toContainText('A fresh start.');
	await page.getByRole('button', { name: 'MARKDOWN', exact: true }).click();
	await expect(page.locator('.output-panel pre')).toContainText('A fresh start.');
	await expect(page.locator('.output-panel pre')).not.toContainText('<p>');
});

test('task guides explain setup, every feature family, and individual code copying', async ({
	page,
	context,
}) => {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/guides/features');
	await expect(
		page.getByRole('heading', { name: 'Feature overview', exact: true }),
	).toBeVisible();
	await expect(page.locator('.guide-prose')).toContainText('What is not included');
	await page
		.locator('.guide-prose')
		.getByRole('link', { name: 'Columns and lines', exact: true })
		.first()
		.click();
	await expect(page).toHaveURL(/guides\/layout/);
	await expect(page.locator('.guide-prose')).toContainText('Resize columns');
	await page.goto('/guides/installation');
	await expect(page.locator('.guide-prose')).toContainText('npm install ngx-editra');
	await expect(page.locator('.guide-prose')).toContainText('>=17.0.0 <23.0.0');
	await expect(page.locator('.guide-prose')).toContainText(
		'alpha.0 still uses narrower patch minimums',
	);
	const firstCode = page.locator('.guide-code-region').first();
	await firstCode.getByRole('button', { name: /Copy code example/ }).click();
	await expect(firstCode.getByRole('status')).toHaveText('Code copied to clipboard.');
	expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
		'npm install ngx-editra',
	);
	await page.goto('/guides/content');
	await expect(page.locator('.guide-prose')).toContainText('valueChanges');
	await page.getByRole('searchbox').fill('syntax highlighting');
	await expect(page.locator('.search-results')).toContainText('Code blocks');
});

test('mobile navigation and document pages remain accessible', async ({ page }) => {
	await page.goto('/');
	expect(await accessibility(page)).toEqual([]);
	await page.screenshot({ path: 'artifacts/documentation-desktop.png', fullPage: true });
	await page.setViewportSize({ width: 390, height: 844 });
	await page.getByRole('button', { name: 'Menu', exact: true }).click();
	await page.locator('nav').getByRole('link', { name: 'Public API', exact: true }).click();
	await expect(page.locator('.guide-prose h1')).toHaveText('Public API');
	await expect(page.getByRole('button', { name: 'Menu', exact: true })).toHaveAttribute(
		'aria-expanded',
		'false',
	);
	expect(
		await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
	).toBe(true);
	expect(await accessibility(page)).toEqual([]);
	await page.screenshot({ path: 'artifacts/documentation-mobile.png', fullPage: true });
});

test('copy feedback keeps code blocks, buttons and the page position stable', async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: { writeText: () => new Promise<void>((resolve) => setTimeout(resolve, 350)) },
		});
	});
	await page.goto('/guides/installation');
	const example = page.locator('.guide-code-region').first();
	const button = example.getByRole('button');
	const geometry = () =>
		example.evaluate((element) => {
			const block = element.getBoundingClientRect();
			const control = element.querySelector('button')!.getBoundingClientRect();
			return {
				height: block.height,
				top: block.top,
				buttonWidth: control.width,
				buttonHeight: control.height,
				buttonLeft: control.left,
				scroll: window.scrollY,
			};
		});
	for (const width of [1280, 390]) {
		await page.setViewportSize({ width, height: 900 });
		await button.scrollIntoViewIfNeeded();
		const before = await geometry();
		await button.click();
		await expect(button).toHaveText('Copying…');
		await expect(button).toBeFocused();
		expect(await geometry()).toEqual(before);
		await expect(button).toHaveText('Copied!');
		expect(await geometry()).toEqual(before);
		await expect(button).toHaveText('Copy code', { timeout: 4000 });
		expect(await geometry()).toEqual(before);
	}
	await page.evaluate(() => {
		Object.defineProperty(navigator.clipboard, 'writeText', {
			value: () => Promise.reject(new Error('Permission denied')),
		});
	});
	const before = await geometry();
	await button.click();
	await expect(example.getByRole('status')).toContainText('Select the code');
	await expect(example.locator('.code-example-language')).toHaveText('Copy manually');
	expect(await geometry()).toEqual(before);
});

test('toolbar fills available space, renders the link icon and stays framed when pinned', async ({
	page,
}) => {
	await page.setViewportSize({ width: 1333, height: 920 });
	await page.goto('/examples');
	const editor = page.locator('ngx-editra');
	const toolbar = editor.locator('editra-toolbar');
	const link = editor.getByRole('button', { name: 'link', exact: true });
	const highlight = editor.locator('editra-colour-picker[kind="highlight"]');
	await expect(link).toBeVisible();
	const linkBox = await link.boundingBox();
	const highlightBox = await highlight.boundingBox();
	expect(Math.abs((linkBox?.y ?? 0) - (highlightBox?.y ?? 100))).toBeLessThan(3);
	const bounds = await link.locator('path').evaluate((path) => {
		const box = (path as SVGGraphicsElement).getBBox();
		return { left: box.x, right: box.x + box.width, top: box.y, bottom: box.y + box.height };
	});
	expect(bounds.left).toBeGreaterThanOrEqual(1);
	expect(bounds.right).toBeLessThanOrEqual(23);
	expect(bounds.top).toBeGreaterThanOrEqual(1);
	expect(bounds.bottom).toBeLessThanOrEqual(23);
	for (const width of [1333, 390]) {
		await page.setViewportSize({ width, height: 920 });
		const commands = await toolbar.locator('.command-bar').boundingBox();
		expect(commands?.height).toBeLessThan(70);
		await editor.locator('.ProseMirror').click();
		const before = await editor.boundingBox();
		await editor.getByRole('button', { name: 'Sticky toolbar', exact: true }).click();
		const after = await editor.boundingBox();
		expect(Math.abs((before?.height ?? 0) - (after?.height ?? 100))).toBeLessThan(1);
		const top = await editor.evaluate((el) => el.getBoundingClientRect().top + scrollY);
		await page.evaluate((top) => scrollTo(0, top + 40), top);
		await expect
			.poll(async () => (await toolbar.boundingBox())?.y ?? -1)
			.toBeGreaterThanOrEqual(width <= 800 ? 65 : 74);
		const frame = await toolbar.evaluate((el) => {
			const css = getComputedStyle(el, '::after');
			return {
				color: css.borderTopColor,
				width: css.borderTopWidth,
				pointerEvents: css.pointerEvents,
				focus: getComputedStyle(el).getPropertyValue('--editra-focus').trim(),
			};
		});
		expect(frame.width).toBe('1px');
		expect(frame.pointerEvents).toBe('none');
		await expect(toolbar).toHaveCSS('--editra-frame', frame.focus);
		const padding = await editor.locator('.editra-surface').evaluate((surface) => {
			const last = surface.querySelector('.ProseMirror > :last-child')!;
			return surface.getBoundingClientRect().bottom - last.getBoundingClientRect().bottom;
		});
		expect(padding).toBeLessThanOrEqual(24);
		await page.screenshot({ path: `artifacts/editor-toolbar-pinned-${width}.png` });
		await editor.getByRole('button', { name: 'Sticky toolbar', exact: true }).click();
	}
});

test('colour swatches stay compact and opening a palette preserves the sticky page layout', async ({
	page,
}) => {
	await page.goto('/examples');
	await page.setViewportSize({ width: 1333, height: 900 });
	const editor = page.locator('ngx-editra');
	const toggle = editor.getByRole('button', { name: 'Choose text colour', exact: true });
	await toggle.scrollIntoViewIfNeeded();
	const before = await page.locator('.site-header').boundingBox();
	const editorBefore = await editor.boundingBox();
	await toggle.click();
	const palette = editor.locator('editra-colour-picker dialog[open]');
	await expect(palette.getByRole('button', { name: 'Automatic', exact: true })).toHaveAttribute(
		'aria-pressed',
		'true',
	);
	await expect(palette.getByRole('button', { name: 'Automatic', exact: true })).toBeFocused();
	const swatch = palette.locator('.swatch').first();
	const swatchBounds = await swatch.boundingBox();
	expect(swatchBounds?.width).toBeGreaterThanOrEqual(24);
	expect(swatchBounds?.width).toBeLessThanOrEqual(28);
	await expect(swatch).toHaveCSS('height', '24px');
	await expect(palette.getByRole('textbox', { name: 'Custom colour hex' })).toBeVisible();
	await expect(palette.locator('input[type="color"]')).toHaveCSS('width', '40px');
	expect(await page.locator('.site-header').boundingBox()).toEqual(before);
	expect(await editor.boundingBox()).toEqual(editorBefore);
	const colour = palette.locator('.swatch').nth(4);
	const name = await colour.getAttribute('aria-label');
	await colour.click();
	await toggle.click();
	await expect(palette.getByRole('button', { name: name!, exact: true }).first()).toHaveAttribute(
		'aria-pressed',
		'true',
	);
	await palette.screenshot({ path: 'artifacts/compact-colour-palette.png' });
	await palette.press('Escape');
});

test('editor popups stay within the viewport after rendering and resizing', async ({ page }) => {
	await page.goto('/examples');
	const editor = page.locator('ngx-editra');
	for (const width of [1902, 390]) {
		await page.setViewportSize({ width, height: 700 });
		for (const name of [
			'table',
			'find',
			'Choose text colour',
			'Choose highlight colour',
			'link',
		]) {
			await editor.getByRole('button', { name, exact: true }).click();
			const popup = editor.locator('dialog[open]');
			await expect(popup).toBeVisible();
			await expect
				.poll(async () =>
					popup.evaluate((element) => {
						const rect = element.getBoundingClientRect();
						return (
							rect.left >= 0 &&
							rect.top >= 0 &&
							rect.right <= innerWidth &&
							rect.bottom <= innerHeight
						);
					}),
				)
				.toBe(true);
			await page.setViewportSize({ width, height: 500 });
			await expect
				.poll(async () =>
					popup.evaluate(
						(element) => element.getBoundingClientRect().bottom <= innerHeight,
					),
				)
				.toBe(true);
			await popup.screenshot({
				path: `artifacts/popup-${name.replaceAll(' ', '-')}-${width}.png`,
			});
			await popup.press('Escape');
			await expect(popup).toHaveCount(0);
			await page.setViewportSize({ width, height: 700 });
		}
	}
});

test('fullscreen covers the viewport without exposing the surrounding page', async ({ page }) => {
	await page.goto('/examples');
	const editor = page.locator('ngx-editra');
	for (const width of [1333, 390]) {
		await page.setViewportSize({ width, height: 900 });
		await editor.getByRole('button', { name: 'Fullscreen', exact: true }).click();
		await expect(editor).toHaveClass(/editra-fullscreen/);
		const bounds = await editor.boundingBox();
		expect(bounds).toEqual({ x: 0, y: 0, width, height: 900 });
		const coverage = await editor.evaluate((host) => {
			const points: [number, number][] = [
				[1, 1],
				[innerWidth - 2, 1],
				[1, innerHeight - 2],
				[innerWidth - 2, innerHeight - 2],
			];
			return points.every(([x, y]) => host.contains(document.elementFromPoint(x, y)));
		});
		expect(coverage).toBe(true);
		await expect(editor).toHaveCSS('display', 'flex');
		await expect(editor).toHaveCSS('background-color', 'rgb(255, 255, 255)');
		await page.screenshot({ path: `artifacts/editor-fullscreen-${width}.png` });
		await editor.locator('.ProseMirror').focus();
		await page.keyboard.press('Escape');
		await expect(editor).not.toHaveClass(/editra-fullscreen/);
		await expect(editor).toHaveCSS('margin-top', '16px');
	}
});

test('the entire editor canvas accepts typing with one outer focus border', async ({ page }) => {
	await page.goto('/examples');
	await page.getByRole('button', { name: 'Reset content', exact: true }).click();
	const editor = page.locator('ngx-editra');
	const canvas = editor.locator('.editra-surface');
	const document = canvas.locator('.ProseMirror');
	for (const width of [1280, 390]) {
		await page.setViewportSize({ width, height: 900 });
		const bounds = await canvas.boundingBox();
		if (!bounds) throw new Error('Missing editor canvas');
		await canvas.click({ position: { x: 24, y: bounds.height - 8 } });
		await expect(document).toBeFocused();
		await page.keyboard.type(` Canvas ${width}.`);
		await expect(page.locator('.output-panel pre')).toContainText(`Canvas ${width}.`);
		const size = await canvas.evaluate((surface) => {
			const content = surface.querySelector('.ProseMirror')!;
			return {
				canvas: surface.clientHeight,
				document: content.getBoundingClientRect().height,
			};
		});
		expect(Math.abs(size.canvas - size.document)).toBeLessThanOrEqual(1);
		await expect(document).toHaveCSS('outline-style', 'none');
		await expect(editor).not.toHaveCSS('box-shadow', 'none');
	}
	await editor.screenshot({ path: 'artifacts/editor-full-canvas-mobile.png' });
	await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
	const fullscreen = await canvas.boundingBox();
	if (!fullscreen) throw new Error('Missing fullscreen canvas');
	await canvas.click({ position: { x: 24, y: fullscreen.height - 8 } });
	await expect(document).toBeFocused();
	await page.keyboard.type(' Fullscreen canvas.');
	await expect(document).toContainText('Fullscreen canvas.');
	await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
});

test('code copying preserves source, shows local feedback, and handles clipboard denial', async ({
	page,
	context,
}) => {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/');
	const homeExample = page.locator('app-code-example');
	await homeExample.getByRole('button', { name: 'Copy code example: getting started' }).click();
	// Windows clipboard storage normalizes line endings to CRLF.
	expect((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n')).toBe(
		await homeExample.locator('code').textContent(),
	);
	await expect(homeExample.getByRole('button')).toHaveText('Copied!');
	await expect(homeExample.getByRole('button')).toHaveText('Copy code', { timeout: 4000 });
	await page.goto('/guides/installation');
	const example = page.locator('.guide-code-region').first();
	await expect(example.locator('.code-example-language')).toHaveText('sh');
	await example.getByRole('button').focus();
	await page.keyboard.press('Enter');
	expect((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n')).toBe(
		'npm install ngx-editra\n',
	);
	await expect(example.getByRole('status')).toHaveText('Code copied to clipboard.');
	await page.evaluate(() => {
		Object.defineProperty(navigator.clipboard, 'writeText', {
			configurable: true,
			value: () => Promise.reject(new Error('Permission denied')),
		});
	});
	await example.getByRole('button').click();
	await expect(example.getByRole('status')).toContainText('Select the code');
	await expect(example.getByRole('button')).toBeEnabled();
	await expect(example.locator('code')).toHaveText('npm install ngx-editra\n');
	await page.goto('/guides/quick-start');
	await expect(page.locator('.code-example-status')).toBeEmpty();
	await page.setViewportSize({ width: 390, height: 844 });
	const code = page.locator('.guide-code-region pre').first();
	await code.scrollIntoViewIfNeeded();
	await code.evaluate((element) => {
		element.scrollLeft = element.scrollWidth;
	});
	await expect(page.locator('.guide-code-region button').first()).toBeInViewport();
	expect(await accessibility(page)).toEqual([]);
	await page.screenshot({ path: 'artifacts/documentation-copy-mobile.png', fullPage: true });
});
