import { test, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

async function start(page: Page): Promise<void> {
	await page.goto('/');
	const surface = page.locator('.ProseMirror').first();
	await expect(surface).toBeVisible();
	await surface.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Media sizing');
}
async function insert(page: Page, kind: 'image' | 'video', url: string): Promise<void> {
	await page.getByRole('button', { name: kind, exact: true }).click();
	const dialog = page.getByRole('dialog');
	await expect(dialog.getByLabel('Width', { exact: true })).toHaveCount(0);
	await expect(dialog.getByLabel('Height', { exact: true })).toHaveCount(0);
	await dialog.getByLabel('URL', { exact: true }).fill(url);
	await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
}
async function drag(
	page: Page,
	handle: Locator,
	dx: number,
	dy: number,
	cancel = false,
): Promise<void> {
	await handle.scrollIntoViewIfNeeded();
	const box = await handle.boundingBox();
	if (!box) throw new Error('Missing media corner');
	const x = box.x + box.width / 2,
		y = box.y + box.height / 2;
	await page.mouse.move(x, y);
	await page.mouse.down();
	await page.mouse.move(x + dx, y + dy, { steps: 4 });
	if (cancel) await page.keyboard.press('Escape');
	await page.mouse.up();
}
async function assertAlignment(page: Page, media: Locator, alignment: string): Promise<void> {
	await page.locator('.ProseMirror img').click();
	await expect(page.locator('.editra-media-view')).toHaveClass(/ProseMirror-selectednode/);
	await page.getByRole('button', { name: 'Align ' + alignment, exact: true }).click();
	const rect = await media.boundingBox(),
		area = await contentArea(page);
	if (!rect || !area) throw new Error('Missing alignment geometry');
	if (alignment === 'left') expect(Math.abs(rect.x - area.x)).toBeLessThan(2);
	if (alignment === 'right')
		expect(Math.abs(rect.x + rect.width - area.x - area.width)).toBeLessThan(2);
	if (alignment === 'center')
		expect(Math.abs(rect.x + rect.width / 2 - area.x - area.width / 2)).toBeLessThan(2);
}

async function contentArea(page: Page): Promise<{ x: number; width: number }> {
	return page
		.locator('.ProseMirror')
		.first()
		.evaluate((element) => {
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			const left = parseFloat(style.paddingLeft);
			const right = parseFloat(style.paddingRight);
			return { x: rect.x + left, width: element.clientWidth - left - right };
		});
}
test('automatic images align, fill content width, resize, cancel and reload responsively', async ({
	page,
}) => {
	await page.route('https://media.example.test/automatic.svg', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120"><rect width="240" height="120" fill="#4472c4"/></svg>',
		}),
	);
	await start(page);
	await insert(page, 'image', 'https://media.example.test/automatic.svg');
	const image = page.locator('.ProseMirror img');
	await expect
		.poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
		.toBe(240);
	expect((await image.boundingBox())?.width).toBe(240);
	await expect(image).not.toHaveAttribute('width');
	await expect(image).not.toHaveAttribute('height');
	for (const align of ['left', 'center', 'right']) await assertAlignment(page, image, align);
	await page.locator('.ProseMirror img').click();
	await page.getByRole('button', { name: 'image', exact: true }).click();
	const dialog = page.getByRole('dialog');
	await dialog.getByText('Image and video settings', { exact: true }).click();
	await dialog.getByLabel('Full content width').check();
	await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(page.locator('.ProseMirror figure')).toHaveAttribute('data-full-width', 'true');
	expect((await image.boundingBox())?.width).toBeCloseTo((await contentArea(page)).width, 0);
	const handle = page.getByRole('button', { name: 'Resize image; use arrow keys' });
	const saved = await page.locator('.output pre').textContent();
	await drag(page, handle, -60, -30, true);
	await expect(page.locator('.output pre')).toHaveText(saved ?? '');
	await drag(page, handle, -120, 0);
	await expect(page.locator('.ProseMirror figure')).toHaveAttribute('data-full-width', 'false');
	const size = await image.boundingBox();
	if (!size) throw new Error('Missing resized image');
	expect(size.width / size.height).toBeCloseTo(2, 1);
	await page.getByRole('button', { name: 'undo', exact: true }).click();
	await expect(page.locator('.output pre')).toHaveText(saved ?? '');
	if (!saved) throw new Error('Missing full-width HTML');
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill(saved);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await page.setViewportSize({ width: 390, height: 844 });
	await expect
		.poll(() =>
			image.evaluate(
				(el) =>
					el.getBoundingClientRect().width <=
					(el.closest('.ProseMirror')?.clientWidth ?? 0),
			),
		)
		.toBe(true);
	await image.scrollIntoViewIfNeeded();
	await page.screenshot({ path: 'artifacts/media-auto-image-mobile.png', fullPage: false });
});

test('automatic embeds use responsive proportions and full-width resizing persists', async ({
	page,
}) => {
	await page.route('https://www.youtube-nocookie.com/**', (route) =>
		route.fulfill({ contentType: 'text/html', body: '<title>Mock video</title><p>Video</p>' }),
	);
	await start(page);
	await insert(page, 'video', 'https://youtu.be/dQw4w9WgXcQ');
	const frame = page.locator('.ProseMirror iframe');
	await expect(frame).not.toHaveAttribute('width');
	await expect(frame).not.toHaveAttribute('height');
	expect((await frame.boundingBox())?.width).toBe(640);
	await page
		.locator('.editra-media-view')
		.filter({ has: page.locator('video,iframe') })
		.click();
	await page.getByRole('button', { name: 'video', exact: true }).click();
	const dialog = page.getByRole('dialog');
	await dialog.getByText('Image and video settings', { exact: true }).click();
	await dialog.getByLabel('Full content width').check();
	await dialog.getByLabel('Alignment', { exact: true }).selectOption('left');
	await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
	const full = await frame.boundingBox();
	if (!full) throw new Error('Missing video');
	expect(full.width / full.height).toBeCloseTo(16 / 9, 2);
	const handle = page.getByRole('button', { name: 'Resize video; use arrow keys' });
	await drag(page, handle, -100, 0);
	await expect(frame).toHaveAttribute('width', String(Math.round(full.width - 100)));
	const html = await page.locator('.output pre').textContent();
	if (!html) throw new Error('Missing video HTML');
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill(html);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await expect(page.locator('.output pre')).toHaveText(html);
	await page.setViewportSize({ width: 390, height: 844 });
	await expect
		.poll(() =>
			frame.evaluate(
				(el) =>
					el.getBoundingClientRect().width <=
					(el.closest('.ProseMirror')?.clientWidth ?? 0),
			),
		)
		.toBe(true);
});

test('direct media uses metadata size and unlocked resizing changes width and height independently', async ({
	page,
}) => {
	await page.setViewportSize({ width: 1800, height: 1000 });
	await start(page);
	await page.route('https://media.example.test/automatic.mp4', (route) =>
		route.fulfill({
			contentType: 'video/mp4',
			headers: {
				'access-control-allow-origin': '*',
				'cross-origin-resource-policy': 'cross-origin',
			},
			body: readFileSync(resolve('e2e/fixtures/flower.mp4')),
		}),
	);
	await insert(page, 'video', 'https://media.example.test/automatic.mp4');
	const video = page.locator('.ProseMirror video');
	await expect.poll(() => video.evaluate((el) => (el as HTMLVideoElement).videoWidth)).toBe(960);
	expect((await video.boundingBox())?.width).toBe(960);
	await expect(video).not.toHaveAttribute('width');
	await page
		.locator('.editra-media-view')
		.filter({ has: page.locator('video,iframe') })
		.click();
	await page.getByRole('button', { name: 'video', exact: true }).click();
	const dialog = page.getByRole('dialog');
	await dialog.getByText('Image and video settings', { exact: true }).click();
	await dialog.getByLabel('Maintain aspect ratio').uncheck();
	await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
	await drag(page, page.getByRole('button', { name: 'Resize video; use arrow keys' }), 30, 40);
	await expect(video).toHaveAttribute('width', '990');
	await expect(video).toHaveAttribute('height', '580');
	const size = await video.boundingBox();
	expect(size?.width).toBe(990);
	expect(size?.height).toBe(580);
	await page.getByLabel('Read only', { exact: true }).check();
	await expect(
		page.getByRole('button', { name: 'Resize video; use arrow keys' }),
	).not.toBeVisible();
});

test('URL-only insertion and editable content beside an image', async ({ page }) => {
	await page.route('https://media.example.test/side.svg', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120"><rect width="240" height="120"/></svg>',
		}),
	);
	await start(page);
	await page.getByRole('button', { name: 'image', exact: true }).click();
	const dialog = page.getByRole('dialog');
	await expect(dialog.getByLabel('URL', { exact: true })).toBeVisible();
	await expect(dialog.getByLabel('Alternative text', { exact: true })).toBeVisible();
	await dialog.getByLabel('URL', { exact: true }).fill('https://media.example.test/side.svg');
	await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
	await page.locator('.ProseMirror img').click();
	await page.getByRole('button', { name: 'Add content beside image', exact: true }).click();
	await page.keyboard.insertText('Text beside the image');
	const text = page.locator('.ProseMirror p').filter({ hasText: 'Text beside the image' });
	await expect(text).toBeVisible();
	await expect(page.locator('.ProseMirror [data-editra-column]')).toHaveCount(2);
	await expect(page.locator('.editra-media-view')).toHaveCSS('float', 'none');
	await expect(page.locator('.ProseMirror [data-editra-column]').first()).toHaveAttribute(
		'data-column-weight',
		'35',
	);
	await expect(page.locator('.ProseMirror figure')).toHaveAttribute('data-full-width', 'true');
	const imageWidth = await page
		.locator('.ProseMirror img')
		.evaluate((el) => el.getBoundingClientRect().width);
	const columnWidth = await page
		.locator('.ProseMirror [data-editra-column]')
		.first()
		.evaluate((el) => el.clientWidth);
	expect(columnWidth - imageWidth).toBeLessThan(12);
	const imageBox = await page.locator('.ProseMirror img').boundingBox();
	const textBox = await text.evaluate((el) => {
		const range = document.createRange();
		range.selectNodeContents(el);
		return range.getBoundingClientRect().toJSON();
	});
	expect(textBox?.x).toBeGreaterThan((imageBox?.x ?? 0) + (imageBox?.width ?? 0));
	await page.getByRole('button', { name: 'bold', exact: true }).click();
	await page.keyboard.insertText(' formatted content');
	await expect(text.locator('strong')).toHaveText(' formatted content');
	const html = await page.locator('.output pre').textContent();
	expect(html).toContain('data-editra-columns="true"');
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill(html ?? '');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await expect(page.locator('.ProseMirror [data-editra-column]')).toHaveCount(2);
	await expect(page.locator('.ProseMirror [data-editra-column]').nth(1)).toContainText(
		'Text beside the image',
	);
});

test('blank columns keep headings, images and following text independent', async ({ page }) => {
	await page.route('https://media.example.test/column.svg', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="90"><rect width="180" height="90"/></svg>',
		}),
	);
	await start(page);
	await page.keyboard.press('Enter');
	await page.keyboard.insertText('This stays below the columns');
	await page.keyboard.press('Home');
	await page.getByRole('button', { name: 'Insert columns', exact: true }).click();
	const cols = page.locator('.ProseMirror [data-editra-column]');
	await expect(cols).toHaveCount(2);
	await page.getByLabel('Paragraph style').selectOption('h2');
	await page.keyboard.insertText('Column heading');
	await expect(cols.first().locator('h2')).toHaveText('Column heading');
	await cols.nth(1).click();
	await page.keyboard.insertText('Independent paragraph');
	await expect(cols.nth(1)).toContainText('Independent paragraph');
	await page.keyboard.press('Enter');
	await page.getByRole('button', { name: 'image', exact: true }).click();
	await page
		.getByRole('dialog')
		.getByLabel('URL', { exact: true })
		.fill('https://media.example.test/column.svg');
	await page.getByRole('dialog').getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(cols.nth(1).locator('img')).toHaveCount(1);
	await cols.nth(1).locator('img').click();
	await page.getByRole('button', { name: 'Fit image to column', exact: true }).click();
	await expect(cols.nth(1).locator('figure')).toHaveAttribute('data-full-width', 'true');
	await expect(cols.first().locator('h2')).toHaveText('Column heading');
	await page.setViewportSize({ width: 390, height: 844 });
	const first = await cols.first().boundingBox(),
		second = await cols.nth(1).boundingBox();
	expect(second?.y).toBeGreaterThan((first?.y ?? 0) + (first?.height ?? 0));
	await expect(
		page.locator('.ProseMirror > p').filter({ hasText: 'This stays below the columns' }),
	).toBeVisible();
});

test('column divider drags, cancels, undoes, resets and persists', async ({ page }) => {
	await start(page);
	await page.getByRole('button', { name: 'Insert columns', exact: true }).click();
	await page.keyboard.insertText('Left content');
	const divider = page.getByRole('button', { name: 'Resize content columns' });
	const cols = page.locator('.ProseMirror [data-editra-column]');
	await expect(divider).toBeVisible();
	const before = await page.locator('.output pre').textContent();
	await drag(page, divider, 100, 0, true);
	await expect(page.locator('.output pre')).toHaveText(before ?? '');
	const initial = (await cols.first().boundingBox())?.width ?? 0;
	await drag(page, divider, 100, 0);
	await expect(cols.first()).not.toHaveAttribute('data-column-weight', '50');
	await expect
		.poll(async () => {
			const grip = await divider.boundingBox(),
				col = await cols.first().boundingBox();
			return Math.abs((grip?.x ?? 0) - (col?.x ?? 0) - (col?.width ?? 0));
		})
		.toBeLessThan(2);
	await expect(page.locator('.editra-columns-dragging')).toHaveCount(0);
	await expect
		.poll(() => divider.evaluate((el) => el.getBoundingClientRect().height))
		.toBeLessThan(81);
	await page.mouse.move(0, 0);
	await page.locator('.ProseMirror p').first().click();
	await page.mouse.move(0, 0);
	await expect
		.poll(() => divider.evaluate((el) => getComputedStyle(el, '::after').opacity))
		.toBe('0');
	expect((await cols.first().boundingBox())?.width).toBeGreaterThan(initial + 50);
	await page.getByRole('button', { name: 'undo', exact: true }).click();
	await expect(page.locator('.output pre')).toHaveText(before ?? '');
	await divider.focus();
	await divider.press('ArrowRight');
	await expect(cols.first()).toHaveAttribute('data-column-weight', '55');
	await expect(cols.nth(1)).toHaveAttribute('data-column-weight', '45');
	const saved = await page.locator('.output pre').textContent();
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill(saved ?? '');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await expect(cols.first()).toHaveAttribute('data-column-weight', '55');
	await expect(cols.first()).toContainText('Left content');
	await divider.focus();
	await divider.press('Home');
	await expect(cols.first()).toHaveAttribute('data-column-weight', '50');
	await page.getByLabel('Read only', { exact: true }).check();
	await expect(divider).not.toBeVisible();
	await page.getByLabel('Read only', { exact: true }).uncheck();
	await expect(divider).toBeVisible();
	await page.setViewportSize({ width: 390, height: 844 });
	await expect(divider).not.toBeVisible();
});

test('resized images keep their size and use separate left or right content sections', async ({
	page,
}) => {
	await page.route('https://media.example.test/resized.svg', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="400" height="200"/></svg>',
		}),
	);
	await start(page);
	await insert(page, 'image', 'https://media.example.test/resized.svg');
	const image = page.locator('.ProseMirror img');
	await expect
		.poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
		.toBe(400);
	await drag(page, page.getByRole('button', { name: 'Resize image; use arrow keys' }), -100, 0);
	await expect(image).toHaveAttribute('width', '300');
	await expect(
		page.getByRole('button', { name: 'Add content beside image', exact: true }),
	).toBeVisible();
	await page.getByRole('button', { name: 'Add content beside image', exact: true }).click();
	await expect(image).toHaveAttribute('width', '300');
	await page.keyboard.insertText('Separate content');
	const cols = page.locator('.ProseMirror [data-editra-column]');
	await expect(cols.nth(1)).toContainText('Separate content');
	await image.click();
	await page.getByRole('button', { name: 'Image section right', exact: true }).click();
	await expect(cols.nth(1).locator('img')).toHaveCount(1);
	await expect(cols.first()).toContainText('Separate content');
	await page.getByRole('button', { name: 'Add content beside image', exact: true }).click();
	await page.keyboard.insertText('More ');
	await expect(cols.first()).toContainText('More Separate content');
	await expect(page.locator('.ProseMirror [data-editra-columns]')).toHaveCount(1);
	await image.click();
	await page.getByRole('button', { name: 'Align right', exact: true }).click();
	await expect(cols.nth(1).locator('figure')).toHaveCSS('text-align', 'right');
	await page.getByRole('button', { name: 'Image section left', exact: true }).click();
	await expect(cols.first().locator('img')).toHaveCount(1);
	await expect(cols.nth(1)).toContainText('More Separate content');
});

test('columns resize below twenty percent and toolbar actions use icons', async ({ page }) => {
	await start(page);
	const insertButton = page.getByRole('button', { name: 'Insert columns', exact: true });
	await expect(insertButton.locator('editra-icon svg')).toHaveCount(1);
	await expect(insertButton).toHaveAttribute('title', 'Insert columns');
	await insertButton.click();
	const divider = page.getByRole('button', { name: 'Resize content columns' });
	await divider.focus();
	for (let i = 0; i < 8; i++) await divider.press('ArrowLeft');
	const cols = page.locator('.ProseMirror [data-editra-column]');
	await expect(cols.first()).toHaveAttribute('data-column-weight', '10');
	expect((await cols.first().boundingBox())?.width).toBeLessThan(220);
	await drag(page, divider, -150, 0);
	await expect(cols.first()).toHaveAttribute('data-column-weight', '5');
	await expect(cols.nth(1)).toHaveAttribute('data-column-weight', '95');
	const html = await page.locator('.output pre').textContent();
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill(html ?? '');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await expect(cols.first()).toHaveAttribute('data-column-weight', '5');
	await page.setViewportSize({ width: 390, height: 844 });
	await expect(divider).not.toBeVisible();
	const first = await cols.first().boundingBox(),
		second = await cols.nth(1).boundingBox();
	expect(second?.y).toBeGreaterThan((first?.y ?? 0) + (first?.height ?? 0));
});

test('blank space beside a tall image accepts additional independent content', async ({ page }) => {
	await page.route('https://media.example.test/tall.svg', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="800"><rect width="400" height="800"/></svg>',
		}),
	);
	await start(page);
	await insert(page, 'image', 'https://media.example.test/tall.svg');
	await page.locator('.ProseMirror img').click();
	await page.getByRole('button', { name: 'Add content beside image', exact: true }).click();
	await page.keyboard.insertText('Short text');
	const cols = page.locator('.ProseMirror [data-editra-column]');
	const content = cols.nth(1);
	const box = await content.boundingBox(),
		imageBox = await cols.first().boundingBox();
	if (!box || !imageBox) throw new Error('Missing columns');
	expect(box.height).toBeCloseTo(imageBox.height, 0);
	await content.click({ position: { x: 30, y: Math.min(box.height - 20, 300) } });
	await page.keyboard.insertText('Content added in the empty space');
	await expect(content.locator('p')).toHaveCount(2);
	await expect(content.locator('p').nth(1)).toHaveText('Content added in the empty space');
	await page.getByLabel('Paragraph style').selectOption('h2');
	await expect(content.locator('h2')).toHaveText('Content added in the empty space');
	await expect(cols.first().locator('img')).toHaveCount(1);
	await expect(page.locator('.ProseMirror [data-editra-columns]')).toHaveCount(1);
});
