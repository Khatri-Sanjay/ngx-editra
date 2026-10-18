import { test, expect } from '@playwright/test';

test('table cursor follows the actual resize boundary and resets in cell text and read-only mode', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill(
			'<table><tr><td><p>First cell</p></td><td><p>Second cell</p></td></tr><tr><td><p>Third cell</p></td><td><p>Fourth cell</p></td></tr></table><p>After the table.</p>',
		);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const editor = page.locator('.ProseMirror').first();
	const cell = editor.locator('td').first();
	await cell.click();
	const column = page.getByRole('button', { name: 'Resize column 1; use Left and Right arrows' });
	await expect(column).toBeVisible();
	const before = await page.getByRole('region', { name: 'Document source code' }).textContent();
	const cursorAt = async (x: number, y: number) => {
		await page.mouse.move(x, y);
		return page.evaluate(
			({ x, y }) => {
				const element = document.elementFromPoint(x, y);
				return element ? getComputedStyle(element).cursor : '';
			},
			{ x, y },
		);
	};
	const box = await cell.boundingBox();
	if (!box) throw new Error('Missing table cell');
	for (let repeat = 0; repeat < 3; repeat++) {
		expect(await cursorAt(box.x + box.width, box.y + box.height / 2)).toBe('col-resize');
		expect(await cursorAt(box.x + box.width / 2, box.y + box.height)).toBe('row-resize');
		expect(await cursorAt(box.x + box.width / 2, box.y + box.height / 2)).toBe('text');
		expect(await cursorAt(box.x + box.width - 4, box.y + box.height / 2)).toBe('text');
	}
	expect(await cursorAt(box.x + box.width, box.y + box.height / 2)).toBe('col-resize');
	await page.getByLabel('Read only', { exact: true }).focus();
	await page.keyboard.press('Space');
	await expect(editor).toHaveAttribute('contenteditable', 'false');
	await expect(column).not.toBeVisible();
	expect(await cursorAt(box.x + box.width, box.y + box.height / 2)).not.toMatch(/resize/);
	await expect(editor).not.toHaveClass(/resize-cursor/);
	await page.getByLabel('Read only', { exact: true }).focus();
	await page.keyboard.press('Space');
	await expect(column).toBeVisible();
	expect(await cursorAt(box.x + box.width, box.y + box.height / 2)).toBe('col-resize');
	expect(await cursorAt(box.x + box.width / 2, box.y + box.height / 2)).toBe('text');
	await expect(page.getByRole('region', { name: 'Document source code' })).toHaveText(
		before ?? '',
	);
});
