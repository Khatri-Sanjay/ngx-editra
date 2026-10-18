import 'zone.js/node';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './src/main.server';
const folder = resolve(dirname(fileURLToPath(import.meta.url)), '../browser');
const port = Number(process.env['PORT'] ?? 4000);
const types: Record<string, string> = {
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.ico': 'image/x-icon',
	'.html': 'text/html',
	'.svg': 'image/svg+xml',
};
createServer((req, res) => {
	void (async () => {
		const url = new URL(req.url ?? '/', 'http://localhost:' + port);
		if (extname(url.pathname)) {
			const path = resolve(folder, '.' + decodeURIComponent(url.pathname));
			if (!path.startsWith(folder + sep)) {
				res.writeHead(403).end();
				return;
			}
			res.setHeader('Content-Type', types[extname(path)] ?? 'application/octet-stream');
			res.end(await readFile(path));
			return;
		}
		const document = await readFile(
			resolve(dirname(fileURLToPath(import.meta.url)), 'index.server.html'),
			'utf8',
		);
		const html = await renderApplication(bootstrap, {
			document,
			url: url.href,
			allowedHosts: ['localhost'],
		});
		res.setHeader('Content-Type', 'text/html');
		res.end(html);
	})().catch((error: unknown) => {
		console.error(error);
		res.writeHead(500).end('Render failed');
	});
}).listen(port, '127.0.0.1', () => console.log('Consumer server http://localhost:' + port));
