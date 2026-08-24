import { readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');
const fail = (message) => { throw new Error(message); };
const slugify = (name) => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const families = JSON.parse(read('scrape/vuesax/families.json'));
const registry = JSON.parse(read('registry.json'));
const migration = read('docs/MIGRATION.md');
const api = read('docs/API.md');
const navSource = read('src/lib/docs/nav.ts');
const demoSource = read('src/lib/docs/DemoSection.svelte');
const sidebarSource = read('src/lib/docs/Sidebar.svelte');
const componentRoute = read('src/routes/(docs)/components/[slug]/+page.svelte');

const familyLabels = Object.values(families).map((family) => family.label);
if (familyLabels.length !== 57) fail(`expected 57 scraped families, found ${familyLabels.length}`);
for (const label of familyLabels) {
	if (!new RegExp(`\\| ${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\|`).test(migration)) {
		fail(`migration table omits ${label}`);
	}
}

const internalItems = new Set(['rx-button', 'rx-skeleton', 'rx-separator']);
const publicItems = registry.items.filter((item) => !internalItems.has(item.name));
if (publicItems.length !== 59) fail(`expected 59 public registry items, found ${publicItems.length}`);
const publicNames = new Set(publicItems.map((item) => item.name));
const foundationItems = new Set(['theme', 'utils-color', 'utils-easing', 'ripple']);
const documentedItems = publicItems.filter((item) => !foundationItems.has(item.name));

const pageSlugs = readdirSync(join(root, 'src/lib/docs/pages'))
	.filter((name) => name.endsWith('.svelte'))
	.map((name) => basename(name, '.svelte'))
	.sort();
const expectedPages = documentedItems.map((item) => item.name === 'input-otp' ? 'otp' : item.name).concat('radio').sort();
if (JSON.stringify(pageSlugs) !== JSON.stringify(expectedPages)) {
	fail(`fixture pages differ from public component inventory\nexpected: ${expectedPages.join(', ')}\nactual: ${pageSlugs.join(', ')}`);
}

const groupsBlock = navSource.match(/const groups[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1];
if (!groupsBlock) fail('could not parse docs navigation groups');
const navNames = [...groupsBlock.matchAll(/:\s*\[([^\]]*)\]/g)]
	.flatMap((match) => [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]));
const navSlugs = navNames.map(slugify).sort();
if (new Set(navSlugs).size !== navSlugs.length) fail('docs navigation contains duplicate slugs');
if (JSON.stringify(navSlugs) !== JSON.stringify(pageSlugs)) fail('docs navigation does not expose every fixture page exactly once');

const routeAliases = { otp: 'input-otp', radio: 'radio-group' };
for (const slug of pageSlugs) {
	const item = routeAliases[slug] ?? slug;
	if (!publicNames.has(item)) fail(`${slug} resolves to missing registry item ${item}`);
	const source = read(`src/lib/docs/pages/${slug}.svelte`);
	if ((source.match(/<h1(?:\s|>)/g) ?? []).length !== 1) fail(`${slug} must contain exactly one h1`);
	if (!source.includes('<DemoSection')) fail(`${slug} has no demo section/install surface`);
	const titles = [...source.matchAll(/<DemoSection\s+title=["']([^"']+)["']/g)].map((match) => slugify(match[1]));
	if (new Set(titles).size !== titles.length) fail(`${slug} contains duplicate demo anchor ids`);
	for (const match of source.matchAll(/href=["']\/components\/([^"'#?]+)["']/g)) {
		if (!pageSlugs.includes(match[1])) fail(`${slug} links to missing component page ${match[1]}`);
	}
}
if (!demoSource.includes("otp: 'input-otp'") || !demoSource.includes("radio: 'radio-group'")) fail('DemoSection lacks renamed/merged registry aliases');

for (const item of documentedItems) {
	const sourceFile = item.files.find((file) => file.path.startsWith('src/lib/registry/ui/'));
	if (!sourceFile) continue;
	const directory = sourceFile.path.split('/')[4];
	if (!api.includes(`## ${directory}/`)) fail(`generated API reference omits ${item.name} source family`);
}

const apiCheck = spawnSync(process.execPath, ['scripts/generate-api.mjs', '--check'], { cwd: root, encoding: 'utf8' });
if (apiCheck.status !== 0) fail(apiCheck.stderr.trim() || apiCheck.stdout.trim() || 'API check failed');

if (!sidebarSource.includes('aria-label="Components"') || !sidebarSource.includes('aria-expanded={open}') || !sidebarSource.includes('class="menu-toggle"')) {
	fail('sidebar is missing navigation landmark or responsive disclosure semantics');
}
if (!componentRoute.includes('import.meta.glob') || !componentRoute.includes('{#if Page}')) fail('component route is not SSR-safe fixture discovery');
if (!demoSource.includes('<section') || !demoSource.includes('<header><h2>') || !demoSource.includes('<details><summary>View source')) {
	fail('demo framing no longer matches the established Vuesax documentation hierarchy');
}

console.log(`Validated docs: ${familyLabels.length} families, ${publicItems.length} public items, ${pageSlugs.length} fixture pages, ${navSlugs.length} navigation links.`);
