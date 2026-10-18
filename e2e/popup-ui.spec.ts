import { test, expect } from '@playwright/test';

test('compact panels align controls, preview lines and insert images with alternative text', async ({
	page,
}) => {
	await page.route('https://example.com/popup-image.svg', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="120" height="80" fill="#17634f"/></svg>',
		}),
	);
	await page.goto('/');
	await page.getByRole('button', { name: 'Choose text colour', exact: true }).click();
	const palette = page.getByRole('dialog', { name: 'Font colour palette', exact: true });
	const input = await palette.getByLabel('Custom colour hex').boundingBox();
	const apply = await palette.getByRole('button', { name: 'Apply', exact: true }).boundingBox();
	if (!input || !apply) throw new Error('Missing colour controls');
	expect(Math.abs(input.y + input.height - apply.y - apply.height)).toBeLessThan(1);
	const panelBounds = await palette.boundingBox();
	const moreColours = await palette.getByLabel('More colours', { exact: true }).boundingBox();
	if (!panelBounds || !moreColours) throw new Error('Missing palette footer');
	expect(moreColours.y + moreColours.height).toBeLessThanOrEqual(
		panelBounds.y + panelBounds.height - 8,
	);
	await palette.screenshot({ path: 'artifacts/popup-colour-redesign.png' });
	await page.keyboard.press('Escape');
	await page.getByRole('button', { name: 'Line settings', exact: true }).click();
	const line = page.getByRole('dialog', { name: 'Line settings', exact: true });
	await line.getByLabel('Line style', { exact: true }).selectOption('dotted');
	await line.getByLabel('Horizontal line weight', { exact: true }).selectOption('3');
	await expect(line.locator('.line-preview')).toHaveCSS('border-top-style', 'dotted');
	await expect(line.locator('.line-preview')).toHaveCSS('border-top-width', '3px');
	await line.screenshot({ path: 'artifacts/popup-line-redesign.png' });
	await page.keyboard.press('Escape');
	await page.getByRole('button', { name: 'image', exact: true }).click();
	const image = page.getByRole('dialog', { name: 'Edit image', exact: true });
	await expect(image.getByLabel('URL', { exact: true })).toBeFocused();
	await image.getByLabel('URL', { exact: true }).fill('https://example.com/popup-image.svg');
	await image.getByLabel('Alternative text', { exact: true }).fill('Green sample illustration');
	await image.screenshot({ path: 'artifacts/popup-image-redesign.png' });
	await image.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(
		page
			.locator('.ProseMirror')
			.first()
			.locator('img[src="https://example.com/popup-image.svg"]'),
	).toHaveAttribute('alt', 'Green sample illustration');
	await page.setViewportSize({ width: 390, height: 844 });
	await page.getByRole('button', { name: 'Choose highlight colour', exact: true }).click();
	const highlight = page.getByRole('dialog', {
		name: 'Text highlight colour palette',
		exact: true,
	});
	await highlight.screenshot({ path: 'artifacts/popup-highlight-redesign-mobile.png' });
	const bounds = await highlight.boundingBox();
	expect(bounds?.x).toBeGreaterThanOrEqual(0);
	expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(390);
	await page.keyboard.press('Escape');
});
