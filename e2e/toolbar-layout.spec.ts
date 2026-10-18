import { test, expect } from '@playwright/test';

test('desktop options stay on one row without stranding insert tools', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto('/');
	const workspace = page.getByRole('region', { name: 'Reactive Forms example', exact: true });
	await expect(workspace.locator('.ProseMirror')).toBeVisible();
	const options = workspace.getByRole('toolbar', { name: 'Formatting and insert options' });
	for (const width of [1280, 1100, 900, 760]) {
		await workspace.evaluate((element, width) => {
			(element as HTMLElement).style.width = `${width}px`;
		}, width);
		expect((await options.boundingBox())?.height).toBeLessThan(65);
		const inserts = workspace.getByRole('group', { name: 'Insert content', exact: true });
		const tops = await inserts
			.locator('button:visible')
			.evaluateAll((buttons) =>
				buttons.map((button) => Math.round(button.getBoundingClientRect().top)),
			);
		expect(new Set(tops).size).toBe(1);
		await options.focus();
		await page.keyboard.press('End');
		await expect(options.locator('button:enabled:visible').last()).toBeFocused();
		await workspace
			.locator('editra-toolbar')
			.screenshot({ path: `artifacts/toolbar-desktop-${width}.png` });
	}
});

test('narrow editors keep two scrollable toolbar rows and keyboard access to every command', async ({
	page,
}) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/');
	const workspace = page.getByRole('region', { name: 'Reactive Forms example', exact: true });
	await expect(workspace.locator('.ProseMirror')).toBeVisible();
	for (const width of [550, 360]) {
		await workspace.evaluate((element, width) => {
			(element as HTMLElement).style.width = `${width}px`;
		}, width);
		const options = workspace.getByRole('toolbar', { name: 'Formatting and insert options' });
		const commands = workspace.getByRole('toolbar', { name: 'Text formatting', exact: true });
		for (const row of [options, commands]) {
			const dimensions = await row.evaluate((element) => ({
				height: element.getBoundingClientRect().height,
				scrollWidth: element.scrollWidth,
				width: element.clientWidth,
			}));
			expect(dimensions.height).toBeLessThan(75);
			expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.width);
		}
		await commands.focus();
		await page.keyboard.press('End');
		await expect(
			workspace.getByRole('button', { name: 'Fullscreen', exact: true }),
		).toBeFocused();
		await expect(workspace.getByRole('button', { name: 'bold', exact: true })).toHaveAttribute(
			'title',
			/Ctrl.*B/,
		);
		await workspace
			.locator('editra-toolbar')
			.screenshot({ path: `artifacts/toolbar-narrow-${width}.png` });
	}
});

test('touch toolbar fits the viewport and keeps commands large enough to tap', async ({
	browser,
}) => {
	const context = await browser.newContext({
		viewport: { width: 390, height: 844 },
		hasTouch: true,
		isMobile: true,
	});
	const page = await context.newPage();
	try {
		await page.goto('/');
		const editor = page.getByRole('region', { name: 'Reactive Forms example', exact: true });
		await expect(editor.locator('.ProseMirror')).toBeVisible();
		const size = await editor.getByRole('button', { name: 'bold', exact: true }).boundingBox();
		expect(size?.width).toBeGreaterThanOrEqual(44);
		expect(size?.height).toBeGreaterThanOrEqual(44);
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
			true,
		);
		await editor.locator('editra-toolbar').screenshot({ path: 'artifacts/toolbar-touch.png' });
	} finally {
		await context.close();
	}
});
