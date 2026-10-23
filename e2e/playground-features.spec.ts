import { test, expect } from '@playwright/test';
import { publishedVersionTests } from './published-version';

publishedVersionTests(['.package-links > a:first-child'], 'footer > span', 'Demo build');

test('sample documents, reset, source formats and copying work together', async ({ page }) => {
	await page.goto('/');
	const editor = page.locator('.ProseMirror').first();
	await page.getByLabel('Sample document', { exact: true }).selectOption('article');
	await expect(editor).toContainText('A fresh perspective');
	await editor.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Changed sample');
	await page.getByRole('button', { name: 'Reset form', exact: true }).click();
	await expect(editor).toContainText('A fresh perspective');
	await page.getByRole('button', { name: 'JSON', exact: true }).click();
	const source = page.getByRole('region', { name: 'Document source code' });
	await expect(source).toContainText('"type": "doc"');
	await page.evaluate(() => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: {
				writeText: async (text: string) => {
					document.documentElement.dataset['copiedOutput'] = text;
				},
			},
		});
	});
	await page.getByRole('button', { name: 'Copy output', exact: true }).click();
	await expect(page.getByRole('status')).toHaveText('Document output copied.');
	expect(await page.evaluate(() => document.documentElement.dataset['copiedOutput'])).toBe(
		await source.textContent(),
	);
	await page.getByRole('button', { name: 'Text', exact: true }).click();
	await expect(page.getByRole('status')).toBeEmpty();
	await page.evaluate(() => {
		Object.defineProperty(navigator.clipboard, 'writeText', {
			value: () => Promise.reject(new Error('Denied')),
		});
	});
	await page.getByRole('button', { name: 'Copy output', exact: true }).click();
	await expect(page.getByRole('status')).toContainText('Copy unavailable');
	await page.getByLabel('Sample document', { exact: true }).selectOption('blank');
	await expect(editor).toHaveText('');
	await page.setViewportSize({ width: 390, height: 844 });
	await page.screenshot({ path: 'artifacts/playground-features-mobile.png' });
	await page.evaluate(() => scrollTo(0, 0));
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
		true,
	);
	await page.screenshot({ path: 'artifacts/playground-settings-mobile.png' });
});

test('workspace imports, empty state and responsive layout remain usable', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto('/');
	await page.screenshot({ path: 'artifacts/playground-redesign-desktop.png', fullPage: true });
	await page.getByText('Import Markdown', { exact: true }).first().click();
	await page
		.getByLabel('Markdown input', { exact: true })
		.fill('# A new draft\n\nReady to preview.');
	await page.getByRole('button', { name: 'Import Markdown', exact: true }).click();
	await expect(page.locator('.ProseMirror').first()).toContainText('A new draft');
	await expect(page.getByRole('region', { name: 'Reader preview content' })).toContainText(
		'Ready to preview.',
	);
	await page.getByRole('button', { name: 'Unmount editor', exact: true }).click();
	await expect(page.getByRole('heading', { name: 'Your draft is still here.' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Import Markdown', exact: true })).toBeDisabled();
	await page.getByRole('button', { name: 'Continue editing', exact: true }).click();
	await expect(page.locator('.ProseMirror').first()).toContainText('A new draft');
	for (const width of [1024, 390, 320]) {
		await page.setViewportSize({ width, height: 844 });
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
			true,
		);
	}
	await page.evaluate(() => scrollTo(0, 0));
	await page.screenshot({ path: 'artifacts/playground-redesign-mobile.png', fullPage: true });
});

test('unmounted editor preserves each output format and reflects sample changes', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByLabel('Sample document', { exact: true }).selectOption('article');
	const source = page.getByRole('region', { name: 'Document source code' });
	const outputs = new Map<string, string>();
	for (const format of ['HTML', 'JSON', 'Text', 'Markdown']) {
		await page.getByRole('button', { name: format, exact: true }).click();
		outputs.set(format, (await source.textContent()) ?? '');
	}
	await page.getByRole('button', { name: 'Unmount editor', exact: true }).click();
	for (const [format, expected] of outputs) {
		await page.getByRole('button', { name: format, exact: true }).click();
		await expect(source).toHaveText(expected);
	}
	await page.getByLabel('Sample document', { exact: true }).selectOption('blank');
	await page.getByRole('button', { name: 'JSON', exact: true }).click();
	await expect(source).toContainText('"type": "doc"');
	await expect(source).not.toContainText('A fresh perspective');
	await page.getByRole('button', { name: 'Text', exact: true }).click();
	await expect(source).toBeEmpty();
});
