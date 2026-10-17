import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { resolve } from 'node:path';

async function open(page: Page): Promise<void> {
	await page.goto('/');
	await expect(page.locator('.ProseMirror').first()).toBeVisible();
}
async function replaceDocument(page: Page, text: string): Promise<void> {
	const editor = page.locator('.ProseMirror').first();
	await editor.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText(text);
}
test('SSR, hydration, forms, reset and repeated mount/unmount', async ({ page, request }) => {
	const response = await request.get('/');
	const html = await response.text();
	expect(response.ok()).toBeTruthy();
	expect(html).toContain('editra-static');
	expect(html).toContain('A calmer place to write');
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	page.on('console', (msg) => {
		if (msg.type() === 'error') errors.push(msg.text());
	});
	await open(page);
	await expect(page.locator('.editra-static')).toHaveCount(0);
	await expect(page.locator('.ProseMirror')).toHaveCount(2);
	await replaceDocument(page, 'Browser form value');
	await expect(
		page
			.getByRole('region', { name: 'Reactive Forms example', exact: true })
			.locator('.section-heading'),
	).toContainText('Modified');
	await page.getByRole('button', { name: 'Reset form', exact: true }).click();
	await expect(page.locator('.ProseMirror').first()).toContainText('A calmer place to write');
	for (let i = 0; i < 3; i++) {
		await page.getByRole('button', { name: 'Unmount editor' }).click();
		await expect(page.locator('.ProseMirror')).toHaveCount(1);
		await page.getByRole('button', { name: 'Mount editor' }).click();
		await expect(page.locator('.ProseMirror')).toHaveCount(2);
	}
	expect(errors).toEqual([]);
});
test('selected formatting, keyboard undo, disabled and read-only forms', async ({ page }) => {
	await open(page);
	await replaceDocument(page, 'Format this');
	await page.keyboard.press('ControlOrMeta+a');
	await page.getByRole('button', { name: 'bold', exact: true }).first().click();
	await expect(page.locator('.ProseMirror strong').first()).toHaveText('Format this');
	await page.keyboard.press('ControlOrMeta+z');
	await expect(page.locator('.ProseMirror strong')).toHaveCount(0);
	await page.getByLabel('Disabled', { exact: true }).check();
	await expect(page.locator('.ProseMirror').first()).toHaveAttribute('contenteditable', 'false');
	await page.getByLabel('Disabled', { exact: true }).uncheck();
	await page.getByLabel('Read only', { exact: true }).check();
	await expect(page.locator('.ProseMirror').first()).toHaveAttribute('contenteditable', 'false');
});
test('secure links, native dialog keyboard focus and video provider validation', async ({
	page,
}) => {
	await open(page);
	await replaceDocument(page, 'Link text');
	await page.keyboard.press('ControlOrMeta+a');
	await page.getByRole('button', { name: 'link', exact: true }).first().click();
	await expect(page.getByRole('dialog')).toBeVisible();
	await page.getByRole('dialog').getByLabel('URL', { exact: true }).fill('javascript:alert(1)');
	await page.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(page.getByRole('alert')).toContainText('not permitted');
	await page.getByRole('dialog').getByLabel('URL', { exact: true }).fill('https://example.com');
	await page.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(page.locator('.ProseMirror a').first()).toHaveAttribute(
		'rel',
		'noopener noreferrer',
	);
	await page.getByRole('button', { name: 'video', exact: true }).first().click();
	await page
		.getByRole('dialog')
		.getByLabel('URL', { exact: true })
		.fill('https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ');
	await page.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(page.getByRole('alert')).toContainText('Unsupported');
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog')).not.toBeVisible();
});
test('image insertion, persistence, keyboard resizing and broken loading', async ({ page }) => {
	await page.route('https://media.example.test/picture.png', (route) =>
		route.fulfill({
			status: 200,
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100"/></svg>',
		}),
	);
	await open(page);
	await replaceDocument(page, 'Media');
	await page.keyboard.press('ArrowDown');
	await page.getByRole('button', { name: 'image', exact: true }).first().click();
	await page
		.getByRole('dialog')
		.getByLabel('URL', { exact: true })
		.fill('https://media.example.test/picture.png');
	await page.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(page.locator('.ProseMirror img')).not.toHaveAttribute('width');
	const handle = page.getByRole('button', { name: 'Resize image; use arrow keys' });
	await handle.focus();
	await handle.press('ArrowRight');
	await expect(page.locator('.ProseMirror img')).toHaveAttribute('width', '210');
	await expect(page.locator('.ProseMirror img')).toHaveAttribute('height', '105');
	await expect(page.locator('.output pre')).toContainText(
		'https://media.example.test/picture.png',
	);
});
test('tables, find/replace, themes, fullscreen and mobile layout', async ({ page }) => {
	await open(page);
	await replaceDocument(page, 'Find this. Find this.');
	await page.getByRole('button', { name: 'find', exact: true }).first().click();
	await page.getByRole('dialog').getByLabel('Find', { exact: true }).fill('Find');
	await page.getByRole('dialog').getByLabel('Replace with').fill('Replace');
	await page.getByRole('button', { name: 'Replace all', exact: true }).click();
	await page.getByRole('button', { name: 'Close', exact: true }).click();
	await expect(page.locator('.ProseMirror').first()).toContainText('Replace this. Replace this.');
	await page.getByRole('button', { name: 'table', exact: true }).first().click();
	await page.getByRole('dialog').getByLabel('Rows', { exact: true }).fill('2');
	await page.getByRole('dialog').getByLabel('Columns', { exact: true }).fill('2');
	await page.getByRole('button', { name: 'Insert table', exact: true }).click();
	await expect(page.locator('.ProseMirror td')).toHaveCount(4);
	await page.locator('.ProseMirror td').first().click();
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await page.getByRole('button', { name: 'Add row below', exact: true }).click();
	await expect(page.locator('.ProseMirror td')).toHaveCount(6);
	await page.getByLabel('Theme', { exact: true }).selectOption('dark');
	await expect(page.locator('ngx-editra').first()).toHaveClass(/editra-dark/u);
	await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
	await expect(page.locator('ngx-editra').first()).toHaveClass(/editra-fullscreen/u);
	await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
	await page.setViewportSize({ width: 390, height: 844 });
	expect(
		await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
	).toBeTruthy();
});
test('automated accessibility of editor and dialog', async ({ page }) => {
	await open(page);
	await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
	const audit = async (): Promise<unknown> =>
		page.evaluate(async () => {
			const win = window as unknown as {
				axe: {
					run: (
						context: string,
						options: { runOnly: { type: string; values: string[] } },
					) => Promise<{ violations: unknown[] }>;
				};
			};
			return (
				await win.axe.run('main', {
					runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
				})
			).violations;
		});
	expect(await audit()).toEqual([]);
	await page.getByRole('button', { name: 'image', exact: true }).first().click();
	expect(await audit()).toEqual([]);
});
