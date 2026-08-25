import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';

interface RegistryItem {
	name?: string;
	dependencies?: string[];
	registryDependencies?: string[];
	files?: Array<{ path?: string; target?: string }>;
}

interface Registry {
	items?: RegistryItem[];
}

interface BuiltItem {
	name?: string;
	type?: string;
	dependencies?: string[];
	registryDependencies?: string[];
	files?: Array<{ content?: string }>;
}

const directory = resolve(import.meta.dirname, '../static/r');
const registryPath = resolve(import.meta.dirname, '../registry.json');
const packagePath = resolve(import.meta.dirname, '../package.json');
const familiesPath = resolve(import.meta.dirname, '../references/_shared/metadata/families.json');
const migrationPath = resolve(import.meta.dirname, '../docs/MIGRATION.md');
const registry = JSON.parse(await readFile(registryPath, 'utf8')) as Registry;
const packageJson = JSON.parse(await readFile(packagePath, 'utf8')) as {
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
};
if (!Array.isArray(registry.items)) throw new Error('registry.json: expected an items array');

const expectedNames = new Set<string>();
for (const [index, item] of registry.items.entries()) {
	if (!item.name) throw new Error(`registry.json: item at index ${index} is missing a name`);
	if (expectedNames.has(item.name)) throw new Error(`registry.json: duplicate item name "${item.name}"`);
	expectedNames.add(item.name);
}

// Official shadcn-svelte base components we intentionally depend on by plain name, even when a
// Resax item shares the name (plain names always resolve to the OFFICIAL registry). Extend this
// list when a new stream adopts another official base.
const officialBases = new Set([
	'dialog', 'sheet', 'tooltip', 'dropdown-menu', 'context-menu', 'sonner',
	'accordion', 'tabs', 'breadcrumb', 'pagination', 'sidebar', 'navigation-menu', 'scroll-area', 'table', 'button-group'
]);

for (const item of registry.items) {
	if (!item.name) continue;
	if (!item.files?.length) throw new Error(`registry.json: item "${item.name}" has no files`);
	for (const file of item.files) {
		if (!file.path) throw new Error(`registry.json: item "${item.name}" has a file without a path`);
		await access(resolve(import.meta.dirname, '..', file.path)).catch(() => {
			throw new Error(`registry.json: item "${item.name}" references missing file "${file.path}"`);
		});
	}
	for (const dependency of item.dependencies ?? []) {
		if (!packageJson.dependencies?.[dependency] && !packageJson.devDependencies?.[dependency]) {
			throw new Error(`registry.json: item "${item.name}" uses undeclared npm dependency "${dependency}"`);
		}
	}
	for (const dependency of item.registryDependencies ?? []) {
		if (dependency.startsWith('local:')) {
			const target = dependency.slice('local:'.length);
			if (!expectedNames.has(target)) throw new Error(`registry.json: item "${item.name}" references missing local item "${target}"`);
			continue;
		}
		if (URL.canParse(dependency) || officialBases.has(dependency)) continue;
		const detail = expectedNames.has(dependency)
			? `references our own item "${dependency}" without the "local:" prefix`
			: `uses unapproved plain registry dependency "${dependency}"`;
		throw new Error(
			`registry.json: item "${item.name}" ${detail}; plain names must be approved official shadcn-svelte bases`
		);
	}
}

const localEdges = new Map(
	registry.items.map((item) => [
		item.name!,
		(item.registryDependencies ?? []).filter((dependency) => dependency.startsWith('local:')).map((dependency) => dependency.slice(6))
	])
);

// Registry builds do not infer dependencies from source imports. Verify that every consumer-facing
// relative import is shipped by the same item, and that imports crossing registry items have a
// corresponding local dependency edge (aliases such as rx-button may own the same source files).
const workspace = resolve(import.meta.dirname, '..');
const ownersBySource = new Map<string, Set<string>>();
for (const item of registry.items) {
	for (const file of item.files ?? []) {
		if (!file.path || !item.name) continue;
		const source = resolve(workspace, file.path);
		const owners = ownersBySource.get(source) ?? new Set<string>();
		owners.add(item.name);
		ownersBySource.set(source, owners);
	}
}

function resolveRegistryImport(source: string, specifier: string): string | undefined {
	let base: string;
	if (specifier.startsWith('.')) base = resolve(dirname(source), specifier);
	else if (specifier.startsWith('$lib/registry/')) base = resolve(workspace, 'src/lib/registry', specifier.slice(14));
	else if (specifier.startsWith('$lib/components/')) base = resolve(workspace, 'src/lib/components', specifier.slice(16));
	else return undefined;

	const candidates = [base];
	if (base.endsWith('.js')) candidates.push(`${base.slice(0, -3)}.ts`);
	if (base.endsWith('.svelte')) candidates.push(`${base}.ts`);
	if (!extname(base)) candidates.push(`${base}.ts`, `${base}.svelte`, resolve(base, 'index.ts'), resolve(base, 'index.svelte'));
	return candidates.find((candidate) => ownersBySource.has(candidate));
}

const importPattern = /(?:\b(?:from|export\s+[^;]*?from)\s*|\bimport\s*\(\s*)(['"])([^'"]+)\1/g;
for (const item of registry.items) {
	if (!item.name) continue;
	const ownSources = new Set((item.files ?? []).flatMap((file) => file.path ? [resolve(workspace, file.path)] : []));
	const dependencies = new Set(localEdges.get(item.name) ?? []);
	for (const source of ownSources) {
		if (!/\.(?:svelte|ts)$/.test(source)) continue;
		const content = await readFile(source, 'utf8');
		for (const match of content.matchAll(importPattern)) {
			const specifier = match[2];
			const officialMatch = /^\$lib\/components\/ui\/([^/]+)/.exec(specifier);
			if (officialMatch) {
				const bundledTarget = resolveRegistryImport(source, specifier);
				if (bundledTarget && ownSources.has(bundledTarget)) continue;
				// Vendored official files rely on the official registry item's own transitive graph.
				// Resax wrappers, by contrast, must declare each official base they import directly.
				if (relative(workspace, source).startsWith('src/lib/components/')) continue;
				const base = officialMatch[1];
				if (!officialBases.has(base) || !(item.registryDependencies ?? []).includes(base)) {
					throw new Error(
						`registry.json: item "${item.name}" imports official shadcn-svelte base "${base}" from "${relative(workspace, source)}" without the matching approved plain-name registry dependency`
					);
				}
				continue;
			}
			if (!specifier.startsWith('.') && !specifier.startsWith('$lib/registry/')) continue;
			const target = resolveRegistryImport(source, specifier);
			if (!target) {
				throw new Error(
					`registry.json: item "${item.name}" imports unowned consumer source "${specifier}" from "${relative(workspace, source)}"`
				);
			}
			if (ownSources.has(target)) continue;
			const owners = ownersBySource.get(target)!;
			if (![...owners].some((owner) => dependencies.has(owner))) {
				throw new Error(
					`registry.json: item "${item.name}" imports "${relative(workspace, target)}" from "${relative(workspace, source)}" without a local dependency on one of its owners: ${[...owners].join(', ')}`
				);
			}
		}
	}
}

const visiting = new Set<string>();
const visited = new Set<string>();
function visit(name: string, path: string[]): void {
	if (visiting.has(name)) throw new Error(`registry.json: local dependency cycle: ${[...path, name].join(' -> ')}`);
	if (visited.has(name)) return;
	visiting.add(name);
	for (const dependency of localEdges.get(name) ?? []) visit(dependency, [...path, name]);
	visiting.delete(name);
	visited.add(name);
}
for (const name of expectedNames) visit(name, []);

const families = Object.values(JSON.parse(await readFile(familiesPath, 'utf8')) as Record<string, { label?: string }>)
	.map((family) => family.label)
	.filter((label): label is string => Boolean(label));
const migration = await readFile(migrationPath, 'utf8');
const coverageRows = [...migration.matchAll(/^\| ([^|]+?) \| `([^`]+)` \| ([^|]+?) \|$/gm)]
	.map((match) => ({ family: match[1], item: match[2] }));
const coverage = new Map<string, string>();
for (const row of coverageRows) {
	if (coverage.has(row.family)) throw new Error(`docs/MIGRATION.md: duplicate family coverage row "${row.family}"`);
	coverage.set(row.family, row.item);
	if (!expectedNames.has(row.item)) throw new Error(`docs/MIGRATION.md: family "${row.family}" maps to missing registry item "${row.item}"`);
}
const missingFamilies = families.filter((family) => !coverage.has(family));
const unexpectedFamilies = [...coverage.keys()].filter((family) => !families.includes(family));
if (missingFamilies.length || unexpectedFamilies.length || coverage.size !== families.length) {
	throw new Error(
		'docs/MIGRATION.md family coverage differs from references/_shared/metadata/families.json' +
		`${missingFamilies.length ? `; missing: ${missingFamilies.join(', ')}` : ''}` +
		`${unexpectedFamilies.length ? `; unexpected: ${unexpectedFamilies.join(', ')}` : ''}`
	);
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
	const source = registry.items.find((item) => item.name === name)!;
	if (value.name !== name) throw new Error(`${file}: expected name "${name}", found "${value.name ?? ''}"`);
	if (!value.type || !value.files?.length || value.files.some((entry) => !entry.content)) {
		throw new Error(`${file}: missing type or populated file content`);
	}
	const expectedDependencies = source.dependencies ?? [];
	if (JSON.stringify(value.dependencies ?? []) !== JSON.stringify(expectedDependencies)) {
		throw new Error(`${file}: npm dependencies differ from registry.json`);
	}
	const expectedRegistryDependencies = (source.registryDependencies ?? []).map((dependency) =>
		dependency.startsWith('local:') ? `./${dependency.slice(6)}.json` : dependency
	);
	if (JSON.stringify(value.registryDependencies ?? []) !== JSON.stringify(expectedRegistryDependencies)) {
		throw new Error(`${file}: registry dependencies differ from registry.json`);
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
