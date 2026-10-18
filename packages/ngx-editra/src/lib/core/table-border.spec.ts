import { createSchema } from './schema';
import { parseHTML, serializeHTML, parseJSON, documentJSON } from './content';
import { exportEmail } from './email';
describe('table border colour', () => {
	const schema = createSchema();
	it('preserves shorthand and longhand colours through HTML and JSON', () => {
		for (const style of ['border:2px dashed #123abc', 'border-color:rgb(18, 58, 188)']) {
			const doc = parseHTML(
				'<table style="' + style + '"><tr><td>A</td></tr></table>',
				schema,
			);
			expect(doc.firstChild?.attrs['borderColor']).toBe('#123abc');
			expect(serializeHTML(parseJSON(documentJSON(doc), schema))).toContain('#123abc');
		}
	});
	it('normalizes unsafe JSON colours to the default', () => {
		const doc = parseHTML('<table><tr><td>A</td></tr></table>', schema);
		const json = documentJSON(doc);
		const unsafe = {
			...json,
			content: (json.content ?? []).map((node) => ({
				...node,
				attrs: { ...node.attrs, borderColor: 'url(javascript:alert(1))' },
			})),
		};
		const html = serializeHTML(parseJSON(unsafe, schema));
		expect(html).toContain('#000000');
		expect(html).not.toContain('javascript');
	});
	it('uses the colour for email table and cell borders', () => {
		const result = exportEmail(
			'<table style="border:2px solid #123abc"><tr><td>A</td></tr></table>',
		);
		const parsed = new DOMParser().parseFromString(result.html, 'text/html');
		const cell = Array.from(parsed.querySelectorAll('td'))
			.reverse()
			.find((el) => el.textContent === 'A');
		expect(cell?.getAttribute('style')).toContain('2px solid #123abc');
	});
});
