import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

// Keep historical DOM recording out of retained-node measurements.
test.use({ trace: 'off' });
test.beforeEach(async ({ page }) => {
	await page.route('https://**/*', (route) => route.abort());
});

test('code copying uses the browser Clipboard API without a mock', async ({ page, context }) => {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill('<pre><code>const clipboardCheck = 42;</code></pre>');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const block = page.locator('.ProseMirror .editra-code-block').first();
	await block.getByRole('button', { name: 'Copy code', exact: true }).click();
	await expect(block.getByRole('status')).toHaveText('Copied!');
	expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
		'const clipboardCheck = 42;',
	);
});

test('forced colours preserve toolbar focus and active state', async ({ page }) => {
	await page.emulateMedia({ forcedColors: 'active' });
	await page.goto('/');
	const editor = page.locator('.ProseMirror').first();
	await editor.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('High contrast text');
	await page.keyboard.press('ControlOrMeta+a');
	const bold = page.getByRole('button', { name: 'bold', exact: true }).first();
	await bold.click();
	await expect(bold).toHaveAttribute('aria-pressed', 'true');
	await page.keyboard.press('Tab');
	await bold.focus();
	await expect(bold).toBeFocused();
	await expect(bold).not.toHaveCSS('outline-style', 'none');
	await page
		.locator('ngx-editra')
		.first()
		.screenshot({ path: 'artifacts/toolbar-forced-colours.png' });
});

test('repeated editor destruction releases DOM and event listeners', async ({ page, context }) => {
	test.setTimeout(60000);
	await page.goto('/');
	await expect(page.locator('.ProseMirror').first()).toBeVisible();
	// Use a small local document so remote sample media cannot skew retained-node measurements.
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill('<p>Lifecycle measurement.</p>');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const session = await context.newCDPSession(page);
	const cycle = async (): Promise<void> => {
		await page.getByRole('button', { name: 'Unmount editor', exact: true }).click();
		await expect(page.locator('#editor-workspace .ProseMirror')).toHaveCount(0);
		await page.getByRole('button', { name: 'Mount editor', exact: true }).click();
		await expect(page.locator('#editor-workspace .ProseMirror')).toHaveCount(1);
	};
	// Warm the framework's bounded caches before measuring repeated growth.
	for (let iteration = 0; iteration < 3; iteration++) await cycle();
	await session.send('HeapProfiler.collectGarbage');
	const before = await session.send('Memory.getDOMCounters');
	const heapBefore = await session.send('Runtime.getHeapUsage');
	for (let iteration = 0; iteration < 20; iteration++) {
		await cycle();
	}
	await page.evaluate(
		() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
	);
	await session.send('HeapProfiler.collectGarbage');
	const after = await session.send('Memory.getDOMCounters');
	const heapAfter = await session.send('Runtime.getHeapUsage');
	await writeFile(
		'artifacts/browser-lifecycle.json',
		JSON.stringify(
			{
				cycles: 20,
				before,
				after,
				heapBefore,
				heapAfter,
				note: 'Chromium retained DOM/listener regression check; not a proof of leak-free behaviour in all browsers.',
			},
			null,
			2,
		),
	);
	expect(after.documents - before.documents).toBeLessThanOrEqual(2);
	expect(after.nodes - before.nodes).toBeLessThan(500);
	expect(after.jsEventListeners - before.jsEventListeners).toBeLessThan(100);
	expect(heapAfter.usedSize - heapBefore.usedSize).toBeLessThan(4 * 1024 * 1024);
});
