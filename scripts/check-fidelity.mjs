#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const LEDGER_PATH = resolve(ROOT, 'docs/FIDELITY-LEDGER.json');
const EXPECTED_FAMILIES = 57;
const EXPECTED_VARIANTS = 328;
const ALLOWED_STATUS = new Set(['literal', 'composed', 'unsupported', 'unresolved']);
const ALLOWED_API_MAPPING = new Set(['component-default', 'prop', 'composition']);

const registryItemByFamily = {
	'avatar-group': 'avatar', number: 'input-number', otp: 'input-otp', radio: 'radio-group',
	'upload-file': 'upload-file'
};

const implementationDirByFamily = {
	'avatar-group': 'avatar', number: 'input-number', otp: 'input-otp', radio: 'radio-group',
	'upload-file': 'upload'
};

const docsSlugByFamily = {
	'avatar-group': 'avatar', number: 'input-number', otp: 'otp'
};

const ownerFamilies = {
	'buttons-cards': ['button', 'card', 'ask-ai-button'],
	'choice-controls': ['checkbox', 'radio', 'radio-group', 'switch'],
	'rich-inputs': ['slider', 'calendar', 'number', 'otp', 'rating'],
	'navigation-core': ['accordion', 'tabs', 'file-tree', 'breadcrumb', 'pagination', 'steps', 'dot-stepper'],
	'shell-physics': ['sidebar', 'nav-menu', 'dock', 'scrollbar', 'cursor'],
	'overlays-feedback': ['popup', 'drawer', 'tooltip', 'dropdown', 'context-menu', 'notification'],
	'inputs-display': ['input', 'textarea', 'select', 'upload-file', 'color-picker', 'chip', 'button-group', 'split-button'],
	'visual-feedback': ['avatar', 'avatar-group', 'badge', 'indicator', 'progress', 'spinner', 'skeleton', 'alert'],
	'data-layout': ['timeline', 'link-bar', 'table', 'list', 'code', 'transform', 'separator', 'spacer', 'slide-confirm', 'inline-overflow', 'tick-rail']
};

const ownerByFamily = Object.fromEntries(
	Object.entries(ownerFamilies).flatMap(([owner, families]) => families.map((family) => [family, owner]))
);

const baseUsesDefault = new Set([
	'alert', 'badge', 'breadcrumb', 'button', 'card', 'chip', 'code', 'cursor', 'dock', 'dot-stepper',
	'file-tree', 'input', 'link-bar', 'list', 'nav-menu', 'notification', 'pagination', 'progress',
	'scrollbar', 'select', 'sidebar', 'steps', 'table', 'tabs', 'textarea', 'timeline'
]);

const noVariantProp = new Set([
	'ask-ai-button', 'button-group', 'inline-overflow', 'slide-confirm', 'spacer', 'split-button', 'tick-rail'
]);

const primaryImplementationByFamily = {
	'avatar-group': ['src/lib/registry/ui/avatar/avatar-group.svelte', 'src/lib/registry/ui/avatar/index.ts'],
	'context-menu': ['src/lib/registry/ui/context-menu/context-menu.svelte', 'src/lib/registry/ui/context-menu/index.ts'],
	'cursor': ['src/lib/registry/ui/cursor/cursor.ts', 'src/lib/registry/ui/cursor/index.ts'],
	'number': ['src/lib/registry/ui/input-number/input-number.svelte', 'src/lib/registry/ui/input-number/index.ts'],
	'otp': ['src/lib/registry/ui/input-otp/input-otp.svelte', 'src/lib/registry/ui/input-otp/index.ts'],
	'radio': ['src/lib/registry/ui/radio-group/radio.svelte', 'src/lib/registry/ui/radio-group/index.ts'],
	'upload-file': ['src/lib/registry/ui/upload/upload.svelte', 'src/lib/registry/ui/upload/index.ts']
};

function rel(path) { return relative(ROOT, path).replaceAll('\\', '/'); }
function json(path) { return JSON.parse(readFileSync(path, 'utf8')); }
function text(path) { return readFileSync(path, 'utf8'); }

function manifests() {
	const referenceRoot = resolve(ROOT, 'references');
	return readdirSync(referenceRoot, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && entry.name !== '_shared')
		.map((entry) => resolve(referenceRoot, entry.name, 'metadata/manifest.json'))
		.filter(existsSync)
		.sort()
		.map((path) => ({ path, data: json(path) }));
}

function sourceVariant(family, slug) {
	const prefix = `vs-${family}`;
	return slug === prefix ? 'base' : slug.slice(prefix.length + 1);
}

function apiFor(family, variant) {
	if (noVariantProp.has(family)) return { mapping: 'component-default', props: {} };
	if (family === 'accordion') {
		if (['bounce', 'glow', 'slide'].includes(variant)) return { mapping: 'composition', props: { variant: 'default', effect: variant } };
		return { mapping: variant === 'base' ? 'composition' : 'prop', props: { variant: variant === 'base' ? 'default' : variant, effect: 'none' } };
	}
	if (family === 'popup') {
		if (variant === 'confirm') return { mapping: 'component-default', component: 'ConfirmPopup', props: {} };
		return { mapping: 'prop', props: { transition: variant === 'base' ? 'morph' : variant } };
	}
	if (family === 'progress') {
		if (variant === 'circular') return { mapping: 'composition', props: { shape: 'circle', variant: 'default' } };
		return { mapping: 'prop', props: { shape: 'line', variant: variant === 'base' ? 'default' : variant } };
	}
	if (family === 'tabs' && variant === 'vertical') return { mapping: 'composition', props: { orientation: 'vertical', variant: 'default' } };
	if (family === 'transform' && variant === 'base') return { mapping: 'component-default', props: {} };
	if (family === 'spinner') return { mapping: 'prop', props: { type: variant === 'base' ? 'default' : variant } };
	if (family === 'cursor') return { mapping: 'prop', props: { variant: variant === 'base' ? 'default' : variant } };
	const value = variant === 'base' && baseUsesDefault.has(family) ? 'default' : variant;
	return { mapping: 'prop', props: { variant: value } };
}

function implementationFor(family, variant) {
	if (family === 'popup' && variant === 'confirm') {
		return ['src/lib/registry/ui/popup/confirm-popup.svelte', 'src/lib/registry/ui/popup/popup.svelte', 'src/lib/registry/ui/popup/index.ts'];
	}
	if (family === 'notification') {
		return ['src/lib/registry/ui/notification/notify.svelte.ts', 'src/lib/registry/ui/notification/notification.svelte', 'src/lib/registry/ui/notification/index.ts'];
	}
	if (family === 'calendar') {
		return ['src/lib/registry/ui/calendar/calendar.svelte', 'src/lib/registry/ui/calendar/date-picker.svelte', 'src/lib/registry/ui/calendar/index.ts'];
	}
	if (primaryImplementationByFamily[family]) return primaryImplementationByFamily[family];
	const directory = implementationDirByFamily[family] ?? family;
	const preferred = [
		`src/lib/registry/ui/${directory}/${directory}.svelte`,
		`src/lib/registry/ui/${directory}/index.ts`
	];
	if (family === 'accordion') preferred.unshift('src/lib/registry/ui/accordion/accordion-item.svelte');
	if (family === 'tabs') preferred.unshift('src/lib/registry/ui/tabs/tabs-list.svelte', 'src/lib/registry/ui/tabs/tabs-trigger.svelte');
	if (family === 'steps') preferred.unshift('src/lib/registry/ui/steps/step.svelte');
	return [...new Set(preferred)];
}

function inferMechanisms(contents, stateHints) {
	const rules = [
		['pointer-position', /pointer(move|enter)|client[XY]|--(?:m|g|ink|iris)[xy]/i],
		['pointer-capture', /setPointerCapture|releasePointerCapture/i],
		['raf-batching', /requestAnimationFrame/i],
		['resize-measurement', /ResizeObserver|getBoundingClientRect|offset(?:Width|Height|Left|Top)/i],
		['spring-motion', /spring|stiffness|damping|cubic-bezier\(\s*\.34\s*,\s*1\.[345678]/i],
		['waapi-motion', /\.animate\s*\(/i],
		['keyframe-motion', /@keyframes|animation\s*:/i],
		['state-transition', /transition\s*:/i],
		['radial-field', /radial-gradient/i],
		['conic-field', /conic-gradient/i],
		['gradient-field', /linear-gradient/i],
		['masked-layer', /mask(?:-composite)?\s*:/i],
		['clip-path', /clip-path/i],
		['blur-filter', /filter\s*:.*blur|backdrop-filter/i],
		['shadow-stack', /box-shadow|drop-shadow/i],
		['blend-compositing', /mix-blend-mode|globalCompositeOperation/i],
		['transform-choreography', /transform\s*:|translate[3XYZd]*\(|rotate[XYZd]*\(|scale[XYZd]*\(/i],
		['svg-filter', /filter\s*:\s*url\(#|<filter\b|createElementNS[^\n]*['\"]filter['\"]/i],
		['canvas-renderer', /globalCompositeOperation|clearRect\s*\(|createRadialGradient\s*\(|fillRect\s*\(/i],
		['keyboard-interaction', /keydown|event\.key|\.key\s*===/i],
		['reduced-motion', /prefers-reduced-motion/i],
		['forced-colors', /forced-colors/i],
		['timed-state', /setTimeout|setInterval/i]
	];
	const mechanisms = rules.filter(([, pattern]) => pattern.test(contents)).map(([id]) => id);
	for (const hint of stateHints) mechanisms.push(`state-${String(hint).toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`);
	if (!mechanisms.length) mechanisms.push('source-geometry');
	return [...new Set(mechanisms)].sort();
}

function evidenceFor(manifestPath, manifest, slug) {
	const familyRoot = resolve(manifestPath, '../..');
	const artifacts = manifest.artifacts
		.filter((artifact) => artifact.variantSlug === slug)
		.sort((a, b) => {
			const rank = { 'extracted-shadow-css': 0, 'web-component-source': 1, 'compiled-vue-island': 2, 'compiled-vue-scoped-css': 3 };
			return (rank[a.artifactType] ?? 9) - (rank[b.artifactType] ?? 9);
		});
	return artifacts.map((artifact) => rel(resolve(familyRoot, artifact.path)));
}

function buildLedger() {
	const rows = [];
	for (const { path: manifestPath, data: manifest } of manifests()) {
		const family = manifest.componentKey;
		for (const slug of manifest.variants) {
			const variant = sourceVariant(family, slug);
			const referenceEvidence = evidenceFor(manifestPath, manifest, slug);
			const stateHints = manifest.artifacts
				.filter((artifact) => artifact.variantSlug === slug)
				.flatMap((artifact) => artifact.stateHints ?? []);
			const sourceContents = referenceEvidence
				.filter((path) => path.includes('/css/shadow/') || path.includes('/web-component/'))
				.filter((path) => existsSync(resolve(ROOT, path)))
				.map((path) => text(resolve(ROOT, path))).join('\n');
			rows.push({
				slug,
				family,
				sourceVariant: variant,
				owner: ownerByFamily[family] ?? 'unassigned',
				registryItem: registryItemByFamily[family] ?? family,
				api: apiFor(family, variant),
				status: 'unresolved',
				reason: 'Awaiting reviewed source-to-port visual, interaction, API, and docs evidence.',
				openGaps: ['visual-review', 'interaction-evidence-review'],
				mechanisms: inferMechanisms(sourceContents, stateHints),
				referenceManifest: rel(manifestPath),
				referenceEvidence,
				implementationPaths: implementationFor(family, variant),
				docsPaths: [`src/lib/docs/pages/${docsSlugByFamily[family] ?? family}.svelte`],
				verification: { mechanisms: [], interactionTests: [], visualEvidence: [], deviations: [], reviewedBy: null, reviewedAt: null, visualReviewedBy: null, visualReviewedAt: null }
			});
		}
	}
	rows.sort((a, b) => a.family.localeCompare(b.family) || a.slug.localeCompare(b.slug));
	return {
		schemaVersion: 1,
		generatedFrom: 'references/*/metadata/manifest.json',
		statusDefinitions: {
			literal: 'The Svelte API directly renders the source variant and reviewed evidence proves its defining mechanisms.',
			composed: 'The port recreates the complete source variant by composing primitives or explicit orthogonal API axes; composition is not a waiver.',
			unsupported: 'Deliberately excluded with a source-specific reason documented in the public docs. This remains a final-pass blocker.',
			unresolved: 'Parity is not yet proven. This remains a final-pass blocker.'
		},
		expected: { families: EXPECTED_FAMILIES, variants: EXPECTED_VARIANTS },
		rows
	};
}

function refreshDerivedEvidence(ledger) {
	const manifestByFamily = new Map(manifests().map((entry) => [entry.data.componentKey, entry]));
	for (const row of ledger.rows) {
		const entry = manifestByFamily.get(row.family);
		if (!entry) continue;
		const referenceEvidence = evidenceFor(entry.path, entry.data, row.slug);
		const stateHints = entry.data.artifacts.filter((artifact) => artifact.variantSlug === row.slug).flatMap((artifact) => artifact.stateHints ?? []);
		const sourceContents = referenceEvidence
			.filter((path) => path.includes('/css/shadow/') || path.includes('/web-component/'))
			.filter((path) => existsSync(resolve(ROOT, path)))
			.map((path) => text(resolve(ROOT, path))).join('\n');
		row.referenceManifest = rel(entry.path);
		row.referenceEvidence = referenceEvidence;
		row.mechanisms = inferMechanisms(sourceContents, stateHints);
	}
	return ledger;
}

function filesUnder(directory) {
	if (!existsSync(directory)) return [];
	const files = [];
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		const path = resolve(directory, entry.name);
		if (entry.isDirectory()) files.push(...filesUnder(path));
		else files.push(path);
	}
	return files;
}

function completeGalleryEvidence(row) {
	const docsSlug = docsSlugByFamily[row.family] ?? row.family;
	const paths = (row.verification?.visualEvidence ?? [])
		.filter((path) => path.toLowerCase().includes(`-${docsSlug}-gallery-`))
		.map((path) => path.toLowerCase());
	return ['light', 'dark'].every((theme) =>
		['desktop', 'mobile'].every((viewport) =>
			paths.some((path) => path.endsWith(`${theme}-${docsSlug}-gallery-${viewport}-linux.png`))
		)
	);
}

function attachVisualEvidence(ledger) {
	const snapshots = filesUnder(resolve(ROOT, 'tests/e2e/docs-visual.spec.ts-snapshots'))
		.filter((path) => /\.(?:png|webp|jpe?g)$/i.test(path));
	for (const row of ledger.rows) {
		const slug = docsSlugByFamily[row.family] ?? row.family;
		const galleryNeedle = `-${slug}-gallery-`;
		const gallery = snapshots.filter((path) => path.toLowerCase().includes(galleryNeedle));
		const extras = snapshots.filter((path) => path.toLowerCase().includes(`-${slug}-`) && !gallery.includes(path));
		row.verification.visualEvidence = [...gallery, ...extras].map(rel).sort();
		if (!completeGalleryEvidence(row) && !(row.openGaps ?? []).includes('visual-review')) {
			row.openGaps = [...(row.openGaps ?? []), 'visual-review'];
		}
	}
	return ledger;
}

function approveVisualEvidence(ledger, reviewer, family) {
	const reviewedAt = new Date().toISOString().slice(0, 10);
	let approved = 0;
	for (const row of ledger.rows) {
		if (family && row.family !== family) continue;
		if (!completeGalleryEvidence(row)) continue;
		row.verification.visualReviewedBy = reviewer;
		row.verification.visualReviewedAt = reviewedAt;
		row.openGaps = (row.openGaps ?? []).filter((gap) => gap !== 'visual-review');
		approved++;
	}
	return approved;
}

function approveImplementationMechanisms(ledger, reviewer) {
	let approved = 0;
	for (const row of ledger.rows) {
		const verification = row.verification ?? {};
		if (verification.reviewedBy !== reviewer || !verification.reviewedAt) continue;
		if (!(verification.interactionTests ?? []).length) continue;
		verification.mechanisms = [...row.mechanisms];
		row.openGaps = (row.openGaps ?? []).filter((gap) => gap !== 'mechanism-evidence-review');
		approved++;
	}
	return approved;
}

function composedStatus(row) {
	if (['button', 'card', 'input', 'textarea', 'select', 'upload-file', 'color-picker', 'chip', 'sidebar', 'nav-menu', 'tooltip', 'dropdown', 'context-menu', 'notification', 'table'].includes(row.family)) return true;
	if (row.family === 'accordion' && ['base', 'bounce', 'glow', 'slide'].includes(row.sourceVariant)) return true;
	if (row.slug === 'vs-tabs-vertical' || row.slug === 'vs-progress-circular') return true;
	if (row.family === 'popup' && ['base', 'confirm'].includes(row.sourceVariant)) return true;
	if (row.family === 'drawer' && ['base', 'push'].includes(row.sourceVariant)) return true;
	if (row.family === 'transform' && ['base', 'fade', 'flip', 'scale'].includes(row.sourceVariant)) return true;
	return false;
}

function promoteReviewedRows(ledger) {
	let promoted = 0;
	for (const row of ledger.rows) {
		const verification = row.verification ?? {};
		if ((row.openGaps ?? []).length) continue;
		if (!verification.reviewedBy || !verification.reviewedAt || !verification.visualReviewedBy || !verification.visualReviewedAt) continue;
		if (!(verification.interactionTests ?? []).length || (verification.visualEvidence ?? []).length < 4) continue;
		if (row.mechanisms.some((mechanism) => !(verification.mechanisms ?? []).includes(mechanism))) {
			row.openGaps = ['mechanism-evidence-review'];
			continue;
		}
		const nextStatus = composedStatus(row) ? 'composed' : 'literal';
		if (row.status !== nextStatus) promoted++;
		row.status = nextStatus;
		row.reason = row.status === 'composed'
			? 'Reviewed source mechanics are completely recreated through the documented primitive or orthogonal API composition.'
			: 'Reviewed source mechanics are directly implemented by the mapped Svelte renderer.';
	}
	return promoted;
}

function quotePattern(value) {
	const escaped = value.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return new RegExp(`(?:['\"\\x60]|\\b)${escaped}(?:['\"\\x60]|\\b)`);
}

function check() {
	const errors = [];
	const warnings = [];
	const source = manifests();
	const sourceFamilies = new Set(source.map(({ data }) => data.componentKey));
	const sourceSlugs = source.flatMap(({ data }) => data.variants);
	const sourceSlugSet = new Set(sourceSlugs);
	const sourceRecordBySlug = new Map(source.flatMap(({ path, data }) => data.variants.map((slug) => [slug, {
		family: data.componentKey,
		variant: sourceVariant(data.componentKey, slug),
		manifest: rel(path),
		evidence: new Set(evidenceFor(path, data, slug))
	}])));
	const registry = json(resolve(ROOT, 'registry.json'));
	const registryItems = new Set(registry.items.map((item) => item.name));

	if (!existsSync(LEDGER_PATH)) {
		console.error(`Fidelity ledger missing: ${rel(LEDGER_PATH)}. Run node scripts/check-fidelity.mjs --bootstrap once.`);
		process.exitCode = 1;
		return;
	}
	const ledger = json(LEDGER_PATH);
	const rows = Array.isArray(ledger.rows) ? ledger.rows : [];
	const counts = new Map();
	for (const row of rows) counts.set(row.slug, (counts.get(row.slug) ?? 0) + 1);

	if (sourceFamilies.size !== EXPECTED_FAMILIES) errors.push(`source family count ${sourceFamilies.size}; expected ${EXPECTED_FAMILIES}`);
	if (sourceSlugs.length !== EXPECTED_VARIANTS) errors.push(`source variant count ${sourceSlugs.length}; expected ${EXPECTED_VARIANTS}`);
	if (sourceSlugSet.size !== EXPECTED_VARIANTS) errors.push(`source unique variant count ${sourceSlugSet.size}; expected ${EXPECTED_VARIANTS}`);
	if (rows.length !== EXPECTED_VARIANTS) errors.push(`ledger row count ${rows.length}; expected ${EXPECTED_VARIANTS}`);
	if (new Set(rows.map((row) => row.family)).size !== EXPECTED_FAMILIES) errors.push(`ledger family count ${new Set(rows.map((row) => row.family)).size}; expected ${EXPECTED_FAMILIES}`);
	for (const slug of sourceSlugSet) if (counts.get(slug) !== 1) errors.push(`${slug}: expected exactly one ledger row, found ${counts.get(slug) ?? 0}`);
	for (const slug of counts.keys()) if (!sourceSlugSet.has(slug)) errors.push(`${slug}: ledger slug is absent from source manifests`);

	const unresolvedByOwner = new Map();
	const unsupportedByOwner = new Map();
	for (const row of rows) {
		const id = row.slug ?? '<missing-slug>';
		const sourceRecord = sourceRecordBySlug.get(id);
		if (!ALLOWED_STATUS.has(row.status)) errors.push(`${id}: invalid status ${JSON.stringify(row.status)}`);
		if (row.status === 'unresolved' && (!Array.isArray(row.openGaps) || !row.openGaps.length)) errors.push(`${id}: unresolved status requires explicit openGaps`);
		if ((row.status === 'literal' || row.status === 'composed') && Array.isArray(row.openGaps) && row.openGaps.length) errors.push(`${id}: ${row.status} status cannot retain openGaps`);
		if (!sourceFamilies.has(row.family)) errors.push(`${id}: unknown family ${JSON.stringify(row.family)}`);
		if (sourceRecord && row.family !== sourceRecord.family) errors.push(`${id}: family ${JSON.stringify(row.family)} does not match source ${JSON.stringify(sourceRecord.family)}`);
		if (sourceRecord && row.sourceVariant !== sourceRecord.variant) errors.push(`${id}: sourceVariant ${JSON.stringify(row.sourceVariant)} does not match source ${JSON.stringify(sourceRecord.variant)}`);
		if (sourceRecord && row.referenceManifest !== sourceRecord.manifest) errors.push(`${id}: referenceManifest does not match its source manifest`);
		if (!row.owner) errors.push(`${id}: owner is required`);
		else if (ownerByFamily[row.family] && row.owner !== ownerByFamily[row.family]) errors.push(`${id}: owner ${JSON.stringify(row.owner)} does not match family owner ${JSON.stringify(ownerByFamily[row.family])}`);
		const expectedRegistryItem = registryItemByFamily[row.family] ?? row.family;
		if (row.registryItem !== expectedRegistryItem) errors.push(`${id}: registry item ${JSON.stringify(row.registryItem)} does not match expected ${JSON.stringify(expectedRegistryItem)}`);
		if (!registryItems.has(row.registryItem)) errors.push(`${id}: registry item ${JSON.stringify(row.registryItem)} does not exist`);
		if (!row.api || typeof row.api.mapping !== 'string' || !row.api.props || typeof row.api.props !== 'object') errors.push(`${id}: explicit api.mapping and api.props are required`);
		else if (!ALLOWED_API_MAPPING.has(row.api.mapping)) errors.push(`${id}: invalid api.mapping ${JSON.stringify(row.api.mapping)}`);
		else if (row.api.mapping === 'component-default' && Object.keys(row.api.props).length) errors.push(`${id}: component-default mappings must have no props`);
		else if (row.api.mapping === 'composition' && Object.keys(row.api.props).length < 2) errors.push(`${id}: composition mappings require at least two explicit props`);
		if (sourceRecord && JSON.stringify(row.api) !== JSON.stringify(apiFor(row.family, sourceRecord.variant))) {
			errors.push(`${id}: API mapping does not match the mechanically expected source mapping`);
		}
		if (typeof row.reason !== 'string' || !row.reason.trim()) errors.push(`${id}: a status reason is required`);
		if (!Array.isArray(row.mechanisms) || !row.mechanisms.length || row.mechanisms.some((mechanism) => typeof mechanism !== 'string' || !mechanism)) errors.push(`${id}: at least one mechanism ID is required`);
		if (!Array.isArray(row.referenceEvidence) || !row.referenceEvidence.length) errors.push(`${id}: reference evidence is required`);
		if (!Array.isArray(row.implementationPaths) || !row.implementationPaths.length) errors.push(`${id}: implementation paths are required`);
		if (!Array.isArray(row.docsPaths) || !row.docsPaths.length) errors.push(`${id}: docs paths are required`);
		for (const path of row.referenceEvidence ?? []) {
			if (!path.startsWith(`references/${row.family}/`)) errors.push(`${id}: reference evidence is outside its family: ${path}`);
			if (sourceRecord && !sourceRecord.evidence.has(path)) errors.push(`${id}: reference evidence is not assigned to this source slug: ${path}`);
		}
		for (const path of row.implementationPaths ?? []) if (!path.startsWith('src/lib/registry/')) errors.push(`${id}: implementation path is outside the registry: ${path}`);
		for (const path of row.docsPaths ?? []) if (!path.startsWith('src/lib/docs/pages/')) errors.push(`${id}: docs path is outside component pages: ${path}`);
		for (const [kind, paths] of [['reference evidence', row.referenceEvidence ?? []], ['implementation', row.implementationPaths ?? []], ['docs', row.docsPaths ?? []]]) {
			for (const path of paths) if (!existsSync(resolve(ROOT, path))) errors.push(`${id}: ${kind} path does not exist: ${path}`);
		}
		if (!existsSync(resolve(ROOT, row.referenceManifest ?? ''))) errors.push(`${id}: reference manifest does not exist: ${row.referenceManifest}`);

		const implementationText = (row.implementationPaths ?? []).filter((path) => existsSync(resolve(ROOT, path))).map((path) => text(resolve(ROOT, path))).join('\n');
		for (const [prop, value] of Object.entries(row.api?.props ?? {})) {
			if (!implementationText.includes(prop)) errors.push(`${id}: API prop ${prop} is not declared in implementation paths`);
			if (typeof value === 'string' && !quotePattern(value).test(implementationText)) errors.push(`${id}: API value ${prop}=${JSON.stringify(value)} is not declared in implementation paths`);
		}

		const docsText = (row.docsPaths ?? []).filter((path) => existsSync(resolve(ROOT, path))).map((path) => text(resolve(ROOT, path))).join('\n');
		for (const [prop, value] of Object.entries(row.api?.props ?? {})) {
			if (typeof value !== 'string' || ['base', 'default', 'none', 'line'].includes(value)) continue;
			if (!quotePattern(value).test(docsText)) errors.push(`${id}: docs do not expose ${prop}=${JSON.stringify(value)}`);
		}

		const verification = row.verification ?? {};
		for (const mechanism of verification.mechanisms ?? []) if (!row.mechanisms.includes(mechanism)) errors.push(`${id}: verified mechanism is not declared by the row: ${mechanism}`);
		for (const path of verification.interactionTests ?? []) {
			if (!/\.(?:test|spec)\.[cm]?[jt]sx?$/.test(path)) errors.push(`${id}: interaction evidence is not a test file: ${path}`);
			if (!existsSync(resolve(ROOT, path))) errors.push(`${id}: interaction test path does not exist: ${path}`);
		}
		for (const path of verification.visualEvidence ?? []) {
			if (!/\.(?:png|webp|jpe?g)$/i.test(path)) errors.push(`${id}: visual evidence is not an image: ${path}`);
			if (!existsSync(resolve(ROOT, path))) errors.push(`${id}: visual evidence path does not exist: ${path}`);
			const docsSlug = docsSlugByFamily[row.family] ?? row.family;
			if (!path.toLowerCase().includes(`-${docsSlug}-`)) errors.push(`${id}: visual evidence does not identify its docs family (${docsSlug}): ${path}`);
		}
		for (const deviation of verification.deviations ?? []) {
			if (!deviation || typeof deviation !== 'object' || !deviation.reference || !deviation.source || !deviation.port || !deviation.reason) errors.push(`${id}: each deviation requires reference, source, port, and reason`);
			else if (!existsSync(resolve(ROOT, deviation.reference))) errors.push(`${id}: deviation reference does not exist: ${deviation.reference}`);
		}
		if (verification.reviewedBy && !verification.reviewedAt) errors.push(`${id}: reviewedBy requires reviewedAt`);
		if (verification.visualReviewedBy && !verification.visualReviewedAt) errors.push(`${id}: visualReviewedBy requires visualReviewedAt`);
		if (row.status === 'literal' || row.status === 'composed') {
			if (/awaiting|unresolved|not yet/i.test(row.reason)) errors.push(`${id}: ${row.status} retains an unresolved status reason`);
			if (!verification.reviewedBy || !verification.reviewedAt) errors.push(`${id}: ${row.status} requires reviewedBy and reviewedAt`);
			const verifiedMechanisms = new Set(verification.mechanisms ?? []);
			const missingMechanisms = row.mechanisms.filter((mechanism) => !verifiedMechanisms.has(mechanism));
			if (missingMechanisms.length) errors.push(`${id}: ${row.status} has unverified mechanisms: ${missingMechanisms.join(', ')}`);
			if (!Array.isArray(verification.interactionTests) || !verification.interactionTests.length) errors.push(`${id}: ${row.status} requires interactionTests evidence`);
			if (!Array.isArray(verification.visualEvidence) || verification.visualEvidence.length < 4) errors.push(`${id}: ${row.status} requires at least four visualEvidence images (desktop/mobile, light/dark)`);
			else if (!completeGalleryEvidence(row)) errors.push(`${id}: visualEvidence must include its family gallery in light/dark and desktop/mobile`);
			if (!verification.visualReviewedBy || !verification.visualReviewedAt) errors.push(`${id}: ${row.status} requires an explicit visual reviewer and review date`);
		}
		if (row.status === 'unsupported') {
			if (!row.reason || row.reason.length < 20) errors.push(`${id}: unsupported status requires a specific reason`);
			if (!verification.docsAnchor || !docsText.includes(verification.docsAnchor)) errors.push(`${id}: unsupported status requires a docsAnchor present in its docs page`);
		}
		if (row.status === 'unresolved') {
			const ownerRows = unresolvedByOwner.get(row.owner) ?? [];
			ownerRows.push(id);
			unresolvedByOwner.set(row.owner, ownerRows);
		}
		if (row.status === 'unsupported') {
			const ownerRows = unsupportedByOwner.get(row.owner) ?? [];
			ownerRows.push(id);
			unsupportedByOwner.set(row.owner, ownerRows);
		}
	}

	const unresolvedCount = [...unresolvedByOwner.values()].reduce((total, group) => total + group.length, 0);
	const unsupportedCount = [...unsupportedByOwner.values()].reduce((total, group) => total + group.length, 0);
	if (unresolvedCount) errors.push(`${unresolvedCount} unresolved fidelity rows remain`);
	if (unsupportedCount) errors.push(`${unsupportedCount} unsupported fidelity rows remain`);

	console.log(`Fidelity source: ${sourceFamilies.size} families, ${sourceSlugs.length} variants (${sourceSlugSet.size} unique).`);
	console.log(`Fidelity ledger: ${rows.length} rows, ${new Set(rows.map((row) => row.family)).size} families.`);
	console.log(`Evidence progress: ${rows.filter((row) => row.verification?.reviewedBy).length} implementation-reviewed, ${rows.filter((row) => row.verification?.interactionTests?.length).length} with focused tests, ${rows.filter((row) => row.verification?.visualEvidence?.length).length} with visual evidence, ${rows.filter((row) => row.verification?.visualReviewedBy).length} visually reviewed.`);
	for (const [label, grouped] of [['UNRESOLVED', unresolvedByOwner], ['UNSUPPORTED', unsupportedByOwner]]) {
		for (const [owner, slugs] of [...grouped].sort(([a], [b]) => a.localeCompare(b))) console.log(`${label} ${owner} (${slugs.length}): ${slugs.join(', ')}`);
	}
	const routineGaps = new Set(['visual-review', 'implementation-agent-review', 'interaction-evidence-review', 'mechanism-evidence-review']);
	for (const row of rows) {
		const specific = (row.openGaps ?? []).filter((gap) => !routineGaps.has(gap));
		if (specific.length) console.log(`OPEN_GAP ${row.owner} ${row.slug}: ${specific.join(', ')}`);
	}
	for (const warning of warnings) console.warn(`WARN ${warning}`);
	if (errors.length) {
		for (const error of errors) console.error(`ERROR ${error}`);
		console.error(`Fidelity check failed with ${errors.length} error(s).`);
		process.exitCode = 1;
	} else {
		console.log('Fidelity check passed: every source variant has complete, reviewed port evidence.');
	}
}

if (process.argv.includes('--approve-implementation-mechanisms')) {
	if (!existsSync(LEDGER_PATH)) {
		console.error(`${rel(LEDGER_PATH)} does not exist; bootstrap it first.`);
		process.exitCode = 1;
	} else {
		const reviewerArg = process.argv.find((arg) => arg.startsWith('--reviewer='));
		const reviewer = reviewerArg?.slice('--reviewer='.length).trim();
		if (!reviewer) {
			console.error('--approve-implementation-mechanisms requires --reviewer=<name> after that reviewer confirms every declared mechanism.');
			process.exitCode = 1;
		} else {
			const ledger = json(LEDGER_PATH);
			const approved = approveImplementationMechanisms(ledger, reviewer);
			if (!approved) {
				console.error(`No implementation-reviewed rows found for ${reviewer}.`);
				process.exitCode = 1;
			} else {
				writeFileSync(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);
				console.log(`Approved declared mechanisms for ${approved} rows reviewed by ${reviewer}.`);
			}
		}
	}
} else if (process.argv.includes('--promote-reviewed')) {
	if (!existsSync(LEDGER_PATH)) {
		console.error(`${rel(LEDGER_PATH)} does not exist; bootstrap it first.`);
		process.exitCode = 1;
	} else {
		const ledger = json(LEDGER_PATH);
		const promoted = promoteReviewedRows(ledger);
		writeFileSync(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);
		console.log(`Promoted ${promoted} fully reviewed rows in ${rel(LEDGER_PATH)}.`);
	}
} else if (process.argv.includes('--approve-visual-evidence')) {
	if (!existsSync(LEDGER_PATH)) {
		console.error(`${rel(LEDGER_PATH)} does not exist; bootstrap it first.`);
		process.exitCode = 1;
	} else {
		const reviewerArg = process.argv.find((arg) => arg.startsWith('--reviewer='));
		const familyArg = process.argv.find((arg) => arg.startsWith('--family='));
		const reviewer = reviewerArg?.slice('--reviewer='.length).trim();
		if (!reviewer) {
			console.error('--approve-visual-evidence requires --reviewer=<name> after the images have actually been inspected.');
			process.exitCode = 1;
		} else {
			const ledger = json(LEDGER_PATH);
			const approved = approveVisualEvidence(ledger, reviewer, familyArg?.slice('--family='.length));
			writeFileSync(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);
			console.log(`Approved reviewed visual evidence for ${approved} rows in ${rel(LEDGER_PATH)}.`);
		}
	}
} else if (process.argv.includes('--attach-visual-evidence')) {
	if (!existsSync(LEDGER_PATH)) {
		console.error(`${rel(LEDGER_PATH)} does not exist; bootstrap it first.`);
		process.exitCode = 1;
	} else {
		const ledger = attachVisualEvidence(json(LEDGER_PATH));
		writeFileSync(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);
		console.log(`Attached visual evidence for ${ledger.rows.filter((row) => row.verification.visualEvidence.length >= 4).length} rows in ${rel(LEDGER_PATH)}.`);
	}
} else if (process.argv.includes('--refresh-derived')) {
	if (!existsSync(LEDGER_PATH)) {
		console.error(`${rel(LEDGER_PATH)} does not exist; bootstrap it first.`);
		process.exitCode = 1;
	} else {
		const ledger = refreshDerivedEvidence(json(LEDGER_PATH));
		writeFileSync(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);
		console.log(`Refreshed source-derived evidence for ${ledger.rows.length} rows in ${rel(LEDGER_PATH)}.`);
	}
} else if (process.argv.includes('--bootstrap')) {
	if (existsSync(LEDGER_PATH) && !process.argv.includes('--force')) {
		console.error(`${rel(LEDGER_PATH)} already exists; refusing to overwrite without --force.`);
		process.exitCode = 1;
	} else {
		const ledger = buildLedger();
		writeFileSync(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);
		console.log(`Wrote ${ledger.rows.length} rows to ${rel(LEDGER_PATH)}.`);
	}
} else {
	check();
}
