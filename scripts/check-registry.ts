import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

interface RegistryItem {
	name?: string;
	registryDependencies?: string[];
}

interface Registry {
	items?: RegistryItem[];
}

interface BuiltItem {
	name?: string;
	type?: string;
	files?: Array<{ content?: string }>;
}

const directory = resolve(import.meta.dirname, '../static/r');
const registryPath = resolve(import.meta.dirname, '../registry.json');
const registry = JSON.parse(await readFile(registryPath, 'utf8')) as Registry;
if (!Array.isArray(registry.items)) throw new Error('registry.json: expected an items array');

const expectedNames = new Set<string>();
for (const [index, item] of registry.items.entries()) {
	if (!item.name) throw new Error(`registry.json: item at index ${index} is missing a name`);
	if (expectedNames.has(item.name)) throw new Error(`registry.json: duplicate item name "${item.name}"`);
	expectedNames.add(item.name);

}

for (const item of registry.items) {
	for (const dependency of item.registryDependencies ?? []) {
		if (dependency.startsWith('local:') || URL.canParse(dependency)) continue;
		// Plain names resolve to the OFFICIAL shadcn-svelte registry (intended for shadcn base
		// components per AGENTS.md) — but a plain name matching one of our own items is the
		// classic footgun: it silently targets the wrong registry.
		if (expectedNames.has(dependency)) {
			throw new Error(
				`registry.json: item "${item.name}" references our own item "${dependency}" without the "local:" prefix; ` +
				'plain names resolve to the official shadcn-svelte registry'
			);
		}
	}
}

const files = (await readdir(directory)).filter((file) => file.endsWith('.json'));
const expectedFiles = new Set(['index.json', ...[...expectedNames].map((name) => `${name}.json`)]);
const missingFiles = [...expectedFiles].filter((file) => !files.includes(file));
const extraFiles = files.filter((file) => !expectedFiles.has(file));
if (missingFiles.length || extraFiles.length) {
	throw new Error(
		`static/r JSON files do not match registry.json` +
		`${missingFiles.length ? `; missing: ${missingFiles.join(', ')}` : ''}` +
		`${extraFiles.length ? `; unexpected: ${extraFiles.join(', ')}` : ''}`
	);
}

for (const name of expectedNames) {
	const file = `${name}.json`;
	const value = JSON.parse(await readFile(resolve(directory, file), 'utf8')) as BuiltItem;
	if (value.name !== name) throw new Error(`${file}: expected name "${name}", found "${value.name ?? ''}"`);
	if (!value.type || !value.files?.length || value.files.some((entry) => !entry.content)) {
		throw new Error(`${file}: missing type or populated file content`);
	}
}

const index = JSON.parse(await readFile(resolve(directory, 'index.json'), 'utf8')) as BuiltItem[];
if (!Array.isArray(index)) throw new Error('index.json: expected an array of item summaries');
const indexNames = index.map((item) => item.name);
const missingIndexItems = [...expectedNames].filter((name) => !indexNames.includes(name));
const unexpectedIndexItems = indexNames.filter((name) => !name || !expectedNames.has(name));
const duplicateIndexItems = indexNames.filter((name, index) => indexNames.indexOf(name) !== index);
if (index.length !== expectedNames.size || missingIndexItems.length || unexpectedIndexItems.length || duplicateIndexItems.length) {
	throw new Error(
		'index.json summaries do not match registry.json items' +
		`${missingIndexItems.length ? `; missing: ${missingIndexItems.join(', ')}` : ''}` +
		`${unexpectedIndexItems.length ? `; unexpected: ${unexpectedIndexItems.join(', ')}` : ''}` +
		`${duplicateIndexItems.length ? `; duplicate: ${duplicateIndexItems.join(', ')}` : ''}`
	);
}
for (const [indexPosition, item] of index.entries()) {
	if (!item.name || !item.type) {
		throw new Error(`index.json: summary at index ${indexPosition} is missing name or type`);
	}
}

console.log(`Validated ${expectedNames.size} registry items and index.json`);
