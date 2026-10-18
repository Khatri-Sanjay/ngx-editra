import { test, expect } from '@playwright/test';

// Runs only in Angular 22 tarball consumers, selected by the compatibility runner.
test('Signal Forms synchronizes HTML, dirty/touched, disabled, validation and reset', async ({
	page,
}) => {
	await page.goto('/');
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.getByText('Signal Forms integration', { exact: true }).click();
	const example = page.getByRole('region', { name: 'Signal Forms example', exact: true });
	const editor = example.getByRole('textbox', { name: 'Rich text editor' });
	const value = example.getByTestId('signal-value');
	const state = example.getByTestId('signal-state');
	await expect(editor).toContainText('A signal-driven draft.');
	await expect(state).toContainText('Pristine');
	await expect(state).toContainText('Untouched');
	await expect(state).toContainText('Valid');
	await editor.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Changed through Signal Forms');
	await expect(value).toContainText(/<p(?:\s[^>]*)?>Changed through Signal Forms<\/p>/);
	await expect(state).toContainText('Modified');
	await example.getByRole('button', { name: 'Set signal value' }).focus();
	await expect(state).toContainText('Touched');
	await example.getByRole('button', { name: 'Set signal value' }).click();
	await expect(editor).toContainText('Updated from the signal model.');
	await example.getByRole('button', { name: 'Disable signal editor' }).click();
	await expect(editor).toHaveAttribute('contenteditable', 'false');
	await expect(value).toContainText('Updated from the signal model.');
	await example.getByRole('button', { name: 'Enable signal editor' }).click();
	await expect(editor).toHaveAttribute('contenteditable', 'true');
	await example.getByRole('button', { name: 'Clear signal value' }).click();
	await expect(editor).toBeEmpty();
	await expect(state).toContainText('Invalid');
	// A visually empty HTML paragraph must also be invalid, although its string is nonempty.
	await editor.click();
	await page.keyboard.press('Space');
	await expect(state).toContainText('Invalid');
	await example.getByRole('button', { name: 'Reset signal form' }).click();
	await expect(editor).toContainText('A signal-driven draft.');
	await expect(state).toContainText('Pristine');
	await expect(state).toContainText('Untouched');
	await expect(state).toContainText('Valid');
	expect(errors).toEqual([]);
});
