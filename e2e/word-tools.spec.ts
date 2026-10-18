import { test, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { resolve } from 'node:path';
const screenshotPrefix = process.env['EDITRA_SCREENSHOT_PREFIX'] ?? 'word';

async function document(page: Page, text: string): Promise<Locator> {
	await page.goto('/');
	const surface = page.locator('.ProseMirror').first();
	await expect(surface).toBeVisible();
	await surface.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText(text);
	return surface;
}
async function drag(page: Page, handle: Locator, x: number, y: number): Promise<void> {
	await handle.scrollIntoViewIfNeeded();
	const box = await handle.boundingBox();
	if (!box) throw new Error('Missing table resize grip');
	await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
	await page.mouse.down();
	await page.mouse.move(box.x + box.width / 2 + x, box.y + box.height / 2 + y, { steps: 5 });
	await page.mouse.up();
}

test('Word-style font/highlight palettes preserve selection, replace colours and remove formatting', async ({
	page,
}) => {
	await document(page, 'Colour this selection');
	await page.keyboard.press('ControlOrMeta+a');
	const automatic = await page.locator('.output pre').textContent();
	await page.getByRole('button', { name: 'Text colour', exact: true }).click();
	await expect(page.locator('.output pre')).toHaveText(automatic ?? '');
	await page.getByRole('button', { name: 'Choose text colour', exact: true }).click();
	let palette = page.getByRole('dialog', { name: 'Font colour palette' });
	await expect(palette).toBeVisible();
	await palette.getByRole('button', { name: 'Red (#ff0000)', exact: true }).click();
	await expect(page.locator('.output pre')).toContainText('color:#ff0000');
	await page.getByRole('button', { name: 'Text colour', exact: true }).click();
	await expect(page.locator('.output pre')).toContainText('color:#ff0000');
	await page.getByRole('button', { name: 'Choose text colour', exact: true }).click();
	await palette.getByRole('button', { name: 'Blue (#0070c0)', exact: true }).click();
	await expect(page.locator('.output pre')).toContainText('color:#0070c0');
	await expect(page.locator('.output pre')).not.toContainText('color:#ff0000');
	await page.getByRole('button', { name: 'Choose highlight colour', exact: true }).click();
	palette = page.getByRole('dialog', { name: 'Text highlight colour palette' });
	await palette.getByRole('button', { name: 'Yellow (#ffff00)', exact: true }).click();
	await expect(page.locator('.output pre')).toContainText('background-color:#ffff00');
	await page.getByRole('button', { name: 'Choose highlight colour', exact: true }).click();
	await palette.getByRole('button', { name: 'No colour', exact: true }).click();
	await expect(page.locator('.output pre')).not.toContainText('<mark');
	await page.getByRole('button', { name: 'Choose text colour', exact: true }).click();
	palette = page.getByRole('dialog', { name: 'Font colour palette' });
	await palette.getByLabel('Custom colour hex').fill('#zzzzzz');
	await palette.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(palette.getByRole('alert')).toContainText('hex colour');
	await palette.getByLabel('Custom colour hex').fill('#123abc');
	await palette.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(page.locator('.output pre')).toContainText('color:#123abc');
	await page.getByRole('button', { name: 'Choose text colour', exact: true }).click();
	await expect(palette.getByRole('group', { name: 'Recent colours' })).toBeVisible();
	await palette.getByRole('button', { name: 'Automatic', exact: true }).click();
	await expect(page.locator('.output pre')).not.toContainText('color:');
});

test('table grid previews size and inserts immediately; numeric dimensions are validated', async ({
	page,
}) => {
	await document(page, 'Table below');
	await page.getByRole('button', { name: 'table', exact: true }).click();
	const picker = page.getByRole('dialog', { name: 'Edit table' });
	await picker.getByRole('button', { name: 'Choose 2 rows and 3 columns', exact: true }).hover();
	await expect(picker.locator('.table-size-preview')).toHaveText('3 × 2 table');
	await expect(page.locator('.ProseMirror td')).toHaveCount(0);
	await picker.getByRole('button', { name: 'Choose 2 rows and 3 columns', exact: true }).click();
	await expect(picker).not.toBeVisible();
	await expect(page.locator('.ProseMirror td')).toHaveCount(6);
	await page.locator('.ProseMirror td').first().click();
	await expect(page.getByRole('button', { name: 'Table tools', exact: true })).toBeVisible();
	await expect(
		page.getByRole('button', { name: 'Resize row 1; use Up and Down arrows' }),
	).toBeVisible();
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await page.getByRole('button', { name: 'Appearance', exact: true }).click();
	await page.getByRole('button', { name: 'Choose cell background colour', exact: true }).click();
	await page
		.getByRole('dialog', { name: 'Cell shading palette' })
		.getByRole('button', { name: 'Yellow (#ffff00)', exact: true })
		.click();
	await expect(page.locator('.output pre')).toContainText('background-color:#ffff00');
	await page.getByRole('button', { name: 'table', exact: true }).click();
	await picker.getByLabel('Rows', { exact: true }).fill('0');
	await picker.getByRole('button', { name: 'Insert table', exact: true }).click();
	await expect(picker.getByRole('alert')).toContainText('Choose 1');
	await page.keyboard.press('Escape');
	await expect(picker).not.toBeVisible();
});

test('row/column pointer resizing has isolated undo, cancellation, and save/reload persistence', async ({
	page,
}) => {
	await document(page, 'Resizable table');
	await page.getByRole('button', { name: 'table', exact: true }).click();
	await page
		.getByRole('dialog')
		.getByRole('button', { name: 'Choose 3 rows and 3 columns', exact: true })
		.click();
	await page.locator('.ProseMirror td').first().click();
	const row = page.getByRole('button', { name: 'Resize row 1; use Up and Down arrows' });
	const column = page.getByRole('button', { name: 'Resize column 1; use Left and Right arrows' });
	const before = await page.locator('.output pre').textContent();
	await row.click();
	await expect(row).toBeFocused();
	await expect(page.locator('.output pre')).toHaveText(before ?? '');
	await drag(page, row, 0, 40);
	await expect(page.locator('.ProseMirror tr').first()).toHaveAttribute('style', /height:/);
	await page.getByRole('button', { name: 'undo', exact: true }).click();
	await expect(page.locator('.output pre')).toHaveText(before ?? '');
	await expect(page.locator('.ProseMirror td')).toHaveCount(9);
	await drag(page, row, 0, 32);
	await drag(page, column, 50, 0);
	await expect(page.locator('.output pre')).toContainText('data-colwidth');
	const saved = await page.locator('.output pre').textContent();
	if (!saved) throw new Error('Missing saved table');
	await row.scrollIntoViewIfNeeded();
	const box = await row.boundingBox();
	if (!box) throw new Error('Missing row grip');
	await page.mouse.move(box.x + 12, box.y + 12);
	await page.mouse.down();
	await page.mouse.move(box.x + 12, box.y + 52);
	await page.keyboard.press('Escape');
	await page.mouse.up();
	await expect(page.locator('.output pre')).toHaveText(saved);
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill(saved);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await expect(page.locator('.output pre')).toHaveText(saved);
	await page.getByLabel('Read only', { exact: true }).check();
	await expect(row).not.toBeVisible();
	await expect(column).not.toBeVisible();
	await page.getByLabel('Read only', { exact: true }).uncheck();
	await page.locator('.ProseMirror td').first().click();
	await expect(row).toBeVisible();
});

test('invisible boundaries resize rows across their width and keep every border consistent', async ({
	page,
}) => {
	await document(page, 'Border resizing');
	await page.getByRole('button', { name: 'table', exact: true }).click();
	await page
		.getByRole('dialog')
		.getByRole('button', { name: 'Choose 3 rows and 3 columns', exact: true })
		.click();
	await page.locator('.ProseMirror td').first().click();
	const row = page.getByRole('button', { name: 'Resize row 1; use Up and Down arrows' });
	const table = page.locator('.ProseMirror table').first();
	await expect(row).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
	await expect(row).toHaveCSS('border-width', '0px');
	for (const fraction of [0.05, 0.5, 0.95]) {
		const box = await row.boundingBox();
		if (!box) throw new Error('Missing row boundary');
		const height = await page
			.locator('.ProseMirror tr')
			.first()
			.evaluate((el) => el.getBoundingClientRect().height);
		await page.mouse.move(box.x + box.width * fraction, box.y + box.height / 2);
		await page.mouse.down();
		await page.mouse.move(box.x + box.width * fraction, box.y + box.height / 2 + 16, {
			steps: 4,
		});
		await page.mouse.up();
		await expect
			.poll(() =>
				page
					.locator('.ProseMirror tr')
					.first()
					.evaluate((el) => el.getBoundingClientRect().height),
			)
			.toBeGreaterThan(height + 10);
	}
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await page.getByRole('button', { name: 'Appearance', exact: true }).click();
	for (const style of ['solid', 'dashed', 'none']) {
		await page.getByLabel('Table border', { exact: true }).selectOption(style);
		const appearance = await table.evaluate((el) =>
			[el, ...el.querySelectorAll('td, th')].map((node) => {
				const css = getComputedStyle(node);
				return {
					width: css.borderTopWidth,
					color: css.borderTopColor,
					style: css.borderTopStyle,
				};
			}),
		);
		for (const border of appearance)
			expect(border).toEqual({
				width: style === 'none' ? '0px' : '1px',
				color: 'rgb(0, 0, 0)',
				style,
			});
	}
	await page.getByLabel('Table border', { exact: true }).selectOption('solid');
	await page.screenshot({ path: 'artifacts/table-border-resizing.png', fullPage: false });
});

test('keyboard resizing, AutoFit and equal columns work with merged cells', async ({ page }) => {
	await document(page, 'Merged table');
	await page.getByRole('button', { name: 'table', exact: true }).click();
	await page
		.getByRole('dialog')
		.getByRole('button', { name: 'Choose 2 rows and 2 columns', exact: true })
		.click();
	const cells = page.locator('.ProseMirror td');
	await cells.nth(0).click({ modifiers: ['ControlOrMeta'] });
	await cells.nth(1).click({ modifiers: ['Shift'] });
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await page.getByRole('button', { name: 'Merge cells', exact: true }).click();
	await expect(cells).toHaveCount(3);
	await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
	const violations = await page.evaluate(async () => {
		const win = window as unknown as {
			axe: { run: (context: string) => Promise<{ violations: unknown[] }> };
		};
		return (await win.axe.run('main')).violations;
	});
	expect(violations).toEqual([]);
	await page.screenshot({
		path: `artifacts/${screenshotPrefix}-table-layout.png`,
		fullPage: false,
	});
	const column = page.getByRole('button', { name: 'Resize column 1; use Left and Right arrows' });
	await column.focus();
	await column.press('ArrowRight');
	await expect(page.locator('.output pre')).toContainText('colspan="2"');
	await expect(page.locator('.output pre')).toContainText('data-colwidth');
	const row = page.getByRole('button', { name: 'Resize row 1; use Up and Down arrows' });
	await row.focus();
	await row.press('ArrowDown');
	await expect(row).toBeFocused();
	await expect(page.locator('.output pre')).toContainText('height:');
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await page.getByRole('button', { name: 'Distribute columns', exact: true }).click();
	await expect(page.locator('.output pre')).toContainText('data-colwidth');
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await page.getByRole('button', { name: 'AutoFit table to page', exact: true }).click();
	await expect(page.locator('.output pre')).not.toContainText('data-colwidth');
	await expect(cells).toHaveCount(3);
});

test('colour palettes are keyboard-operable and accessible in light/dark/mobile modes', async ({
	page,
}) => {
	await document(page, 'Accessible colour');
	await page.keyboard.press('ControlOrMeta+a');
	await page.getByRole('button', { name: 'Choose text colour', exact: true }).click();
	const palette = page.getByRole('dialog', { name: 'Font colour palette' });
	await expect(palette.getByRole('button', { name: 'Automatic', exact: true })).toBeFocused();
	await page.keyboard.press('Tab');
	await expect(
		palette.getByRole('button', { name: 'White (#ffffff)', exact: true }),
	).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(
		palette.getByRole('button', { name: 'Black (#000000)', exact: true }),
	).toBeFocused();
	await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
	const audit = () =>
		page.evaluate(async () => {
			const win = window as unknown as {
				axe: { run: (context: string) => Promise<{ violations: unknown[] }> };
			};
			return (await win.axe.run('main')).violations;
		});
	expect(await audit()).toEqual([]);
	await page.screenshot({
		path: `artifacts/${screenshotPrefix}-colour-palette.png`,
		fullPage: false,
	});
	await page.keyboard.press('Escape');
	await expect(
		page.getByRole('button', { name: 'Choose text colour', exact: true }),
	).toBeFocused();
	await page.getByLabel('Theme', { exact: true }).selectOption('dark');
	await page.setViewportSize({ width: 390, height: 844 });
	await page.getByRole('button', { name: 'Choose highlight colour', exact: true }).click();
	expect(await audit()).toEqual([]);
	await page.screenshot({
		path: `artifacts/${screenshotPrefix}-highlight-mobile.png`,
		fullPage: false,
	});
	await page.keyboard.press('Escape');
	await page.getByLabel('Disabled', { exact: true }).check();
	await expect(
		page.getByRole('button', { name: 'Choose text colour', exact: true }),
	).toBeDisabled();
});
