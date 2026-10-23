import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const registry = 'https://registry.npmjs.org/ngx-editra/latest';

export function publishedVersionTests(
	selectors: readonly string[],
	developmentSelector: string,
	developmentLabel: string,
) {
	test('published version follows npm latest on load and window focus', async ({ page }) => {
		let version = '999.0.1';
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		await page.route(registry, (route) =>
			route.fulfill({ json: { name: 'ngx-editra', version } }),
		);
		await page.goto('/');
		for (const selector of selectors)
			await expect(page.locator(selector)).toContainText(version);
		const library = JSON.parse(await readFile('packages/ngx-editra/package.json', 'utf8')) as {
			version: string;
		};
		await expect(page.locator(developmentSelector)).toContainText(
			`${developmentLabel} ${library.version}`,
		);
		await expect(page.locator(developmentSelector)).not.toContainText(
			`${developmentLabel} ${version}`,
		);
		version = '999.0.2';
		await page.evaluate(() => window.dispatchEvent(new Event('focus')));
		for (const selector of selectors)
			await expect(page.locator(selector)).toContainText(version);
		expect(errors).toEqual([]);
	});

	test('published version retains its snapshot offline and retries on focus', async ({
		page,
	}) => {
		const snapshot = JSON.parse(await readFile('npm-package.json', 'utf8')) as {
			publishedVersion: string;
		};
		let offline = true;
		await page.route(registry, (route) =>
			offline
				? route.abort('failed')
				: route.fulfill({ json: { name: 'ngx-editra', version: '999.0.3' } }),
		);
		const failure = page.waitForEvent('requestfailed', {
			predicate: (request) => request.url() === registry,
		});
		await page.goto('/');
		await failure;
		for (const selector of selectors)
			await expect(page.locator(selector)).toContainText(snapshot.publishedVersion);
		offline = false;
		await page.evaluate(() => window.dispatchEvent(new Event('focus')));
		for (const selector of selectors)
			await expect(page.locator(selector)).toContainText('999.0.3');
	});

	for (const invalid of [
		{ name: 'another-package', version: '999.0.4' },
		{ name: 'ngx-editra', version: '<invalid>' },
	]) {
		test(`published version ignores invalid registry metadata: ${invalid.name}/${invalid.version}`, async ({
			page,
		}) => {
			const snapshot = JSON.parse(await readFile('npm-package.json', 'utf8')) as {
				publishedVersion: string;
			};
			await page.route(registry, (route) => route.fulfill({ json: invalid }));
			const response = page.waitForResponse(registry);
			await page.goto('/');
			await response;
			for (const selector of selectors)
				await expect(page.locator(selector)).toContainText(snapshot.publishedVersion);
		});
	}
}
