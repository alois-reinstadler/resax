import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const directory = resolve(import.meta.dirname, '../static/r');
const files = (await readdir(directory)).filter((file) => file.endsWith('.json'));
if (files.length !== 17) throw new Error(`Expected 17 JSON files (index + 16 items), found ${files.length}`);
for (const file of files) {
	const value = JSON.parse(await readFile(resolve(directory, file), 'utf8')) as {
		name?: string; type?: string; files?: Array<{ content?: string }>;
	};
	if (file === 'index.json') {
		if (!Array.isArray(value) || value.length !== 16) throw new Error('index.json: expected sixteen item summaries');
		continue;
	}
	if (!value.name || !value.type || !value.files?.length || value.files.some((entry) => !entry.content)) {
		throw new Error(`${file}: missing type or populated file content`);
	}
}
console.log(`Validated ${files.length - 1} registry items and index.json`);
