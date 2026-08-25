import { createHash } from 'node:crypto';
import { access, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const workspace = process.cwd();
const checkOnly = process.argv.includes('--check');
const inventoryPath = path.join(workspace, 'docs/reference-inventory.json');
const referencesRoot = path.join(workspace, 'references');
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));

function assertSafeRelative(candidate) {
	if (!candidate.startsWith('references/') || candidate.includes('..') || path.isAbsolute(candidate)) {
		throw new Error(`Unsafe reference destination: ${candidate}`);
	}
}

async function exists(candidate) {
	try {
		await access(candidate);
		return true;
	} catch {
		return false;
	}
}

async function sha256(candidate) {
	return createHash('sha256').update(await readFile(candidate)).digest('hex');
}

if (inventory.summary.unmapped || inventory.summary.ambiguous || inventory.summary.proposedPathCollisions) {
	throw new Error('Inventory must have zero unmapped, ambiguous, and colliding files before organization');
}

const sourceExists = await exists(path.join(workspace, 'scrape'));
if (sourceExists && (await exists(referencesRoot))) {
	throw new Error('Both scrape/ and references/ exist; refusing a partial or destructive merge');
}
if (checkOnly && sourceExists) throw new Error('references/ has not been organized yet');

if (sourceExists) {
	for (const item of inventory.inventory) {
		assertSafeRelative(item.proposedPath);
		const source = path.join(workspace, item.originalPath);
		const destination = path.join(workspace, item.proposedPath);
		if ((await sha256(source)) !== item.sha256) throw new Error(`Source changed since inventory: ${item.originalPath}`);
		await mkdir(path.dirname(destination), { recursive: true });
		await rename(source, destination);
	}
	await rm(path.join(workspace, 'scrape'), { recursive: true });
}

const grouped = Map.groupBy(
	inventory.inventory.filter((item) => item.ownership === 'component'),
	(item) => item.componentKey
);

for (const [componentKey, files] of grouped) {
	const manifest = {
		schemaVersion: 1,
		provenance: {
			tier: 'restricted-raw-reference',
			implementationInput: true,
			authorization: 'Maintainer directed this port to proceed after the raw-source provenance restriction was explicitly raised on 2026-08-25.',
			note: 'Authorization is scoped to this Resax port; preserve the original restriction and provenance files.'
		},
		component: files[0].component,
		componentKey,
		family: files[0].family,
		variants: [...new Set(files.map((item) => item.variantSlug).filter(Boolean))].sort(),
		artifacts: files
			.map(({ originalPath, proposedPath, sha256, bytes, artifactType, variant, variantSlug, stateHints }) => ({
				originalPath,
				path: proposedPath.replace(`references/${componentKey}/`, ''),
				sha256,
				bytes,
				artifactType,
				variant,
				variantSlug,
				stateHints
			}))
			.sort((a, b) => a.path.localeCompare(b.path))
	};
	if (!checkOnly) {
		const target = path.join(referencesRoot, componentKey, 'metadata/manifest.json');
		await mkdir(path.dirname(target), { recursive: true });
		await writeFile(target, `${JSON.stringify(manifest, null, 2)}\n`);
	}
}

const rootManifest = {
	...inventory,
	generatedAt: undefined,
	movePerformed: true,
	sourceRoot: 'references',
	organizedFrom: 'scrape'
};
delete rootManifest.generatedAt;
if (!checkOnly) {
	await writeFile(path.join(referencesRoot, 'manifest.json'), `${JSON.stringify(rootManifest, null, 2)}\n`);
	await writeFile(
		path.join(referencesRoot, 'README.md'),
	`# Vuesax source references

This directory is a lossless archive of the Vuesax scrape, organized by component. Raw scraped artifacts and clean-room material are deliberately separated by provenance.

## Provenance boundary

The raw web-component, extracted CSS, compiled Vue, and scoped CSS artifacts are **restricted reference material**. The archived clean-room README says they must not be used as implementation input without documented written authorization. On 2026-08-25, after this restriction was explicitly raised, the maintainer directed the Resax port to proceed. That authorization is recorded in \`AUTHORIZATION.md\` and is scoped to this project; the original provenance files remain intact.

- \`<component>/web-component\`: extracted web-component implementation
- \`<component>/css/shadow\`: extracted shadow-root CSS
- \`<component>/compiled/vue\`: compiled Vue island output
- \`<component>/css/vue-scoped\`: compiled Vue scoped CSS
- \`<component>/metadata/manifest.json\`: variants, original paths, state hints, sizes, and SHA-256 hashes
- \`_shared/clean-room\`: clean-room specifications and coverage records
- \`_shared/metadata\`: original catalogs
- \`_shared/theme\`: shared source tokens
- \`_shared/docs-css\`: docs-only bundles that are not component implementations

The files retain their original basenames. Use \`pnpm references:check\` to verify that the organization is complete and byte-for-byte intact.
`
	);
	await writeFile(
		path.join(referencesRoot, 'AUTHORIZATION.md'),
		`# Raw-reference authorization record

The archived clean-room provenance states that raw Vuesax implementation artifacts require written authorization before they may be used as implementation input.

On 2026-08-25, the restriction was explicitly presented to the repository maintainer in the active project session. The maintainer responded \`go on\`, directing the Resax port to continue with source-literal fidelity work. This record scopes that direction to the Resax port and does not remove or alter the original provenance terms archived under \`_shared/clean-room\`.
`
	);
}

let checked = 0;
for (const item of inventory.inventory) {
	const destination = path.join(workspace, item.proposedPath);
	if ((await sha256(destination)) !== item.sha256) throw new Error(`Reference hash mismatch: ${item.proposedPath}`);
	checked += 1;
}

console.log(`${checkOnly ? 'Verified' : 'Organized and verified'} ${checked} source files across ${grouped.size} component reference folders.`);
