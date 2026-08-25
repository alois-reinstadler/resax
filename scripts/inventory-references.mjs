import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('scrape');
const output = path.resolve('docs/reference-inventory.json');

const catalog = JSON.parse(await readFile(path.join(root, 'vuesax/catalog.json'), 'utf8'));
const families = JSON.parse(await readFile(path.join(root, 'vuesax/families.json'), 'utf8'));
const cleanRoomSpecs = JSON.parse(
	await readFile(path.join(root, 'vuesax-clean-room/CLEAN_ROOM_COMPONENT_SPECS.json'), 'utf8')
).components;

const catalogEntries = Object.values(catalog);
const byTitle = new Map();
for (const entry of catalogEntries) {
	const matches = byTitle.get(entry.title) ?? [];
	matches.push(entry);
	byTitle.set(entry.title, matches);
}

const kebab = (value) =>
	value
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/[^a-zA-Z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.toLowerCase();

const cleanRoomFamilies = [
	...new Set(
		cleanRoomSpecs
			.map((spec) => catalog[spec.path.replace('/c/', '')]?.family)
			.filter(Boolean)
	)
].sort();

const allFamilies = Object.keys(families).sort();

const statePatterns = [
	['active', /\bactive\b/],
	['checked', /\bcheck(?:ed|ing)?\b/],
	['selected', /\bselect(?:ed|ion)?\b/],
	['disabled', /\bdisabled\b/],
	['hover', /\bhover\b/],
	['focus', /\bfocus(?:ed)?\b/],
	['pressed', /\bpress(?:ed|ing)?\b/],
	['loading', /\bloading\b/],
	['open', /\bopen(?:ed|ing)?\b/],
	['expanded', /\bexpand(?:ed|ing|s)?\b/],
	['collapsed', /\bcollaps(?:e|ed|ing)\b/],
	['dragging', /\bdrag(?:ged|ging|s)?\b/],
	['dropping', /\bdrop(?:ped|ping|s|zone)?\b/],
	['error', /\berror\b/],
	['success', /\bsuccess\b/],
	['indeterminate', /\bindeterminate\b/],
	['dismissed', /\bdismiss(?:ed|ible)?\b/],
	['keyboard', /\bkeyboard\b/],
	['pointer', /\b(?:pointer|cursor)\b/]
];

function variantHint(entry) {
	const base = `vs-${kebab(entry.familyLabel)}`;
	return entry.slug === base ? 'base' : entry.slug.startsWith(`${base}-`) ? entry.slug.slice(base.length + 1) : kebab(entry.title.replace(entry.family, '')) || 'base';
}

function stateHints(entry) {
	const text = `${entry.title} ${entry.description}`.toLowerCase();
	return statePatterns.filter(([, pattern]) => pattern.test(text)).map(([state]) => state);
}

function compiledStem(filename) {
	return filename.replace(/\.(?:js|css)$/, '').replace(/\.[^.]+$/, '');
}

function familyTarget(entry) {
	return kebab(entry.familyLabel);
}

function componentMapping(entry, section, filename, rule) {
	return {
		ownership: 'component',
		family: entry.family,
		component: entry.familyLabel,
		componentKey: familyTarget(entry),
		variant: variantHint(entry),
		variantSlug: entry.slug,
		stateHints: stateHints(entry),
		proposedPath: `references/${familyTarget(entry)}/${section}/${filename}`,
		mappingRule: rule,
		confidence: 'exact'
	};
}

function sharedMapping(section, filename, artifactType, familiesInFile = []) {
	return {
		ownership: 'shared',
		family: null,
		component: null,
		componentKey: '_shared',
		variant: null,
		variantSlug: null,
		stateHints: [],
		proposedPath: `references/_shared/${section}/${filename}`,
		mappingRule: 'shared artifact; preserve once and reference from component manifests as needed',
		confidence: 'exact',
		familiesInFile,
		artifactType
	};
}

async function walk(directory) {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const absolute = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await walk(absolute)));
		else files.push(absolute);
	}
	return files;
}

function classify(relativePath) {
	const parts = relativePath.split('/');
	const filename = parts.at(-1);

	if (parts[0] === 'vuesax-clean-room') {
		const artifactType = filename.endsWith('.md') ? 'clean-room-document' : 'clean-room-metadata';
		return sharedMapping('clean-room', filename, artifactType, cleanRoomFamilies);
	}

	if (parts.length === 2) {
		if (filename === 'tokens.css') return sharedMapping('theme', filename, 'theme-css', allFamilies);
		if (filename === 'catalog.json' || filename === 'families.json') {
			return sharedMapping('metadata', filename, 'catalog-metadata', allFamilies);
		}
		return sharedMapping('provenance', filename, 'provenance-document', allFamilies);
	}

	if (parts[1] === 'wc' || parts[1] === 'shadow-css') {
		const slug = filename.replace(/\.(?:js|css)$/, '');
		const entry = catalog[slug];
		if (!entry) return { ...sharedMapping('unmapped', filename, 'unknown'), confidence: 'unmapped' };
		return componentMapping(
			entry,
			parts[1] === 'wc' ? 'web-component' : 'css/shadow',
			filename,
			'exact catalog slug filename match'
		);
	}

	if (parts[1] === 'islands' || parts[1] === 'css') {
		const stem = compiledStem(filename);
		let matches = byTitle.get(stem) ?? [];
		let rule = 'compiled filename stem exactly matches catalog title';

		if (stem === 'VsAskAiButton') {
			matches = [catalog['vs-ask-ai-button']];
			rule = 'explicit shipped-name alias: VsAskAiButton -> catalog title VsButtonAskAi';
		}

		if (parts[1] === 'islands' && stem === 'VsFileTreeNode') {
			const entry = catalog['vs-file-tree'];
			return {
				...componentMapping(entry, 'compiled/vue', filename, 'explicit helper ownership: VsFileTreeNode -> FileTree'),
				variant: 'helper-node',
				variantSlug: null
			};
		}

		if (matches.length === 1) {
			return componentMapping(
				matches[0],
				parts[1] === 'islands' ? 'compiled/vue' : 'css/vue-scoped',
				filename,
				rule
			);
		}

		if (matches.length > 1) {
			return {
				...sharedMapping('ambiguous', filename, 'ambiguous-compiled-asset'),
				confidence: 'ambiguous',
				candidateVariants: matches.map((entry) => entry.slug)
			};
		}

		if (parts[1] === 'css') {
			const section = stem.startsWith('Blk') ? 'docs-css/blocks' : 'docs-css/infrastructure';
			return sharedMapping(section, filename, 'docs-site-css');
		}

		return { ...sharedMapping('unmapped', filename, 'unknown'), confidence: 'unmapped' };
	}

	return { ...sharedMapping('unmapped', filename, 'unknown'), confidence: 'unmapped' };
}

const sourceFiles = (await walk(root)).sort();
const inventory = [];
for (const absolute of sourceFiles) {
	const content = await readFile(absolute);
	const relativePath = path.relative(root, absolute).split(path.sep).join('/');
	const mapping = classify(relativePath);
	const artifactType =
		mapping.artifactType ??
		(relativePath.includes('/wc/')
			? 'web-component-source'
			: relativePath.includes('/shadow-css/')
				? 'extracted-shadow-css'
				: relativePath.includes('/islands/')
					? 'compiled-vue-island'
					: 'compiled-vue-scoped-css');

	inventory.push({
		originalPath: `scrape/${relativePath}`,
		bytes: (await stat(absolute)).size,
		sha256: createHash('sha256').update(content).digest('hex'),
		artifactType,
		...mapping
	});
}

const countBy = (field) =>
	Object.fromEntries(
		[...new Set(inventory.map((item) => item[field]))]
			.sort((a, b) => String(a).localeCompare(String(b)))
			.map((value) => [value, inventory.filter((item) => item[field] === value).length])
	);

const proposedPaths = new Map();
for (const item of inventory) {
	const sources = proposedPaths.get(item.proposedPath) ?? [];
	sources.push(item.originalPath);
	proposedPaths.set(item.proposedPath, sources);
}

const report = {
	schemaVersion: 1,
	generatedAt: new Date().toISOString(),
	sourceRoot: 'scrape',
	proposedRoot: 'references',
	movePerformed: false,
	summary: {
		files: inventory.length,
		bytes: inventory.reduce((total, item) => total + item.bytes, 0),
		componentOwned: inventory.filter((item) => item.ownership === 'component').length,
		shared: inventory.filter((item) => item.ownership === 'shared').length,
		ambiguous: inventory.filter((item) => item.confidence === 'ambiguous').length,
		unmapped: inventory.filter((item) => item.confidence === 'unmapped').length,
		catalogVariants: catalogEntries.length,
		families: allFamilies.length,
		cleanRoomFamilies: cleanRoomFamilies.length,
		proposedPathCollisions: [...proposedPaths.values()].filter((sources) => sources.length > 1).length
	},
	counts: {
		byArtifactType: countBy('artifactType'),
		byOwnership: countBy('ownership'),
		byComponentKey: countBy('componentKey')
	},
	proposedPathCollisions: [...proposedPaths.entries()]
		.filter(([, sources]) => sources.length > 1)
		.map(([proposedPath, originalPaths]) => ({ proposedPath, originalPaths })),
	inventory
};

await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary, null, 2));
