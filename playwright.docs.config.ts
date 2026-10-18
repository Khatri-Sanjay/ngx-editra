import { defineConfig } from '@playwright/test';

const port = process.env['EDITRA_DOCS_PORT'] ?? '4301';
const baseURL = `http://localhost:${port}`;

export default defineConfig({
	testDir: './e2e',
	testMatch: 'documentation.spec.ts',
	outputDir: 'test-results/documentation',
	timeout: 30_000,
	workers: 1,
	reporter: [['list'], ['json', { outputFile: 'artifacts/documentation-e2e.json' }]],
	use: {
		baseURL,
		browserName: 'chromium',
		launchOptions: {
			...(process.env['EDITRA_BROWSER']
				? { executablePath: process.env['EDITRA_BROWSER'] }
				: {}),
		},
		trace: 'retain-on-failure',
	},
	webServer: {
		command: 'node scripts/run-app.mjs serve-built documentation',
		url: baseURL,
		env: { PORT: port },
		reuseExistingServer: false,
		timeout: 60_000,
	},
});
