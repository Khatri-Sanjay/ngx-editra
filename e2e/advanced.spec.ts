import { test, expect } from '@playwright/test';

test('configurable groups, hidden controls and floating toolbar', async ({ page }) => {
	await page.goto('/');
	const editor = page.locator('.ProseMirror').first();
	await expect(editor).toBeVisible();
	await expect(page.getByLabel('Paragraph style', { exact: true }).first()).toHaveValue('h1');
	await expect(page.getByLabel('Line height', { exact: true }).first()).toHaveValue('1.5');
	await page.screenshot({ path: 'artifacts/playground.png', fullPage: false });
	await editor.click();
	await expect(page.getByRole('button', { name: 'Insert greeting', exact: true })).toHaveCount(0);
	await page.getByLabel('Toolbar preset').selectOption('compact');
	await expect(page.getByRole('button', { name: 'image', exact: true })).toHaveCount(0);
	await page.getByLabel('Toolbar preset').selectOption('grouped');
	await expect(page.getByRole('group', { name: 'History', exact: true })).toBeVisible();
	await editor.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Plain selection');
	await page.keyboard.press('ControlOrMeta+a');
	await expect(page.locator('.floating-toolbar')).toBeVisible();
	await page.getByRole('button', { name: 'bold', exact: true }).first().click();
	await expect(editor.locator('strong')).not.toHaveCount(0);
});

test('image pointer resizing is one reversible transaction', async ({ page }) => {
	await page.route('https://media.example.test/pointer.png', (route) =>
		route.fulfill({
			status: 200,
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100"/></svg>',
		}),
	);
	await page.goto('/');
	await expect(page.locator('.ProseMirror').first()).toBeVisible();
	await page.locator('.ProseMirror').first().click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Image resizing');
	await page.getByRole('button', { name: 'image', exact: true }).click();
	const dialog = page.getByRole('dialog');
	await dialog.getByLabel('URL', { exact: true }).fill('https://media.example.test/pointer.png');
	await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
	const handle = page.getByRole('button', { name: 'Resize image; use arrow keys' });
	await handle.scrollIntoViewIfNeeded();
	const box = await handle.boundingBox();
	if (!box) throw new Error('Missing handle');
	await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
	await page.mouse.down();
	await page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2, { steps: 5 });
	await page.mouse.up();
	await expect(page.locator('.ProseMirror img')).toHaveAttribute('width', '250');
	await page.getByRole('button', { name: 'undo', exact: true }).click();
	await expect(page.locator('.ProseMirror img')).not.toHaveAttribute('width');
});
test('keyboard table grid, contextual menu and persisted row sizing', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('.ProseMirror').first()).toBeVisible();
	await page.locator('.ProseMirror').first().click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Table sizing');
	await page.getByRole('button', { name: 'table', exact: true }).click();
	const dialog = page.getByRole('dialog');
	await dialog.getByRole('button', { name: 'Choose 1 rows and 1 columns' }).focus();
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	await expect(dialog).not.toBeVisible();
	await expect(page.locator('.ProseMirror td')).toHaveCount(2);
	await page.locator('.ProseMirror td').first().click();
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await page.getByRole('button', { name: 'Dimensions', exact: true }).click();
	await page.getByLabel('Row height pixels').fill('60');
	await page.getByLabel('Row height pixels').press('Tab');
	await expect(page.locator('.output pre')).toContainText('height:60px');
	await page.locator('.ProseMirror td').first().click({ button: 'right' });
	await expect(page.getByRole('menu')).toBeVisible();
	await page.getByRole('menuitem', { name: /Add row below/u }).click();
	await expect(page.locator('.ProseMirror td')).toHaveCount(3);
});
test('pasted HTML retains permitted formatting and removes executable content', async ({
	page,
}) => {
	await page.goto('/');
	const editor = page.locator('.ProseMirror').first();
	await expect(editor).toBeVisible();
	await editor.click();
	await page.keyboard.press('ControlOrMeta+a');
	await editor.evaluate((element) => {
		const data = new DataTransfer();
		data.setData(
			'text/html',
			'<p style="text-align:right"><a href="javascript:alert(1)" onclick="evil()">Plain</a><span style="color:#ff0000">Red</span></p><script>evil()</script>',
		);
		element.dispatchEvent(
			new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: data }),
		);
	});
	await expect(editor).toContainText('PlainRed');
	await expect(page.locator('.output pre')).toContainText('#ff0000');
	await expect(page.locator('.output pre')).toContainText('text-align:right');
	await expect(page.locator('.output pre')).not.toContainText('javascript:');
	await expect(page.locator('.output pre')).not.toContainText('onclick');
});
