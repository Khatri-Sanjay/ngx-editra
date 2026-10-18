import { test, expect } from '@playwright/test';
test('table size and border colour work when inserting and editing', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill('<p>New table</p>');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await page.getByRole('button', { name: 'table', exact: true }).click();
	const picker = page.getByRole('dialog', { name: 'Edit table', exact: true });
	await expect(picker.locator('[role="gridcell"][aria-selected="true"]')).toHaveCount(9);
	await picker.getByLabel('Rows', { exact: true }).fill('2');
	await picker.getByLabel('Columns', { exact: true }).fill('3');
	await expect(picker.locator('[role="gridcell"][aria-selected="true"]')).toHaveCount(6);
	await picker.getByLabel('New table border colour').evaluate((element: HTMLInputElement) => {
		element.value = '#123abc';
		element.dispatchEvent(new Event('input', { bubbles: true }));
	});
	await expect(
		picker.getByRole('button', { name: 'Insert table', exact: true }),
	).toBeInViewport();
	await picker.screenshot({ path: 'artifacts/table-picker-compact.png' });
	await picker.getByRole('button', { name: 'Insert table', exact: true }).click();
	await expect(page.locator('.ProseMirror td')).toHaveCount(6);
	await expect(page.locator('.ProseMirror table')).toHaveCSS('border-color', 'rgb(18, 58, 188)');
	await page.locator('.ProseMirror td').first().click();
	await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	const tools = page.getByRole('dialog', { name: 'Table tools', exact: true });
	await tools.getByRole('button', { name: 'Appearance', exact: true }).click();
	await tools.getByRole('button', { name: 'Choose table border colour', exact: true }).click();
	const palette = page.getByRole('dialog', { name: 'Table border colour palette', exact: true });
	await palette.getByRole('button', { name: 'Red (#ff0000)', exact: true }).click();
	await expect(page.locator('.ProseMirror table')).toHaveCSS('border-color', 'rgb(255, 0, 0)');
	await expect(page.getByRole('region', { name: 'Document source code' })).toContainText(
		'#ff0000',
	);
	await tools.screenshot({ path: 'artifacts/table-border-appearance.png' });
});

test('table picker keeps actions inside a narrow viewport', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await page.getByRole('button', { name: 'table', exact: true }).click();
	const picker = page.getByRole('dialog', { name: 'Edit table', exact: true });
	await expect(picker.getByLabel('New table border colour')).toBeInViewport();
	await expect(
		picker.getByRole('button', { name: 'Insert table', exact: true }),
	).toBeInViewport();
	const bounds = await picker.boundingBox();
	expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(390);
	await picker.screenshot({ path: 'artifacts/table-picker-mobile.png' });
});
