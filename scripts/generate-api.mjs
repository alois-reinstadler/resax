import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../src/lib/registry/ui/', import.meta.url).pathname;
const output = new URL('../docs/API.md', import.meta.url).pathname;
const files = [];
function walk(directory) {
	for (const name of readdirSync(directory)) {
		const path = join(directory, name);
		if (statSync(path).isDirectory()) walk(path);
		else if ((name.endsWith('.svelte') || name.endsWith('.ts')) && !name.includes('.test') && !name.includes('harness')) files.push(path);
	}
}
walk(root);
const sections = [];
for (const path of files.sort()) {
	const source = readFileSync(path, 'utf8');
	const exports = [...source.matchAll(/export\s+(?:interface|type|class|const|function)\s+([A-Za-z0-9_]+)/g)].map((match) => match[1]);
	if (!exports.length) continue;
	const props = [...source.matchAll(/export interface (\w+Props)[^{]*\{([^}]+)\}/gs)].map((match) => `### ${match[1]}\n\n\`\`\`ts\ninterface ${match[1]} {${match[2].trimEnd()}\n}\n\`\`\``).join('\n\n');
	sections.push(`## ${relative(root, path)}\n\nExports: ${exports.map((name) => `\`${name}\``).join(', ')}${props ? `\n\n${props}` : ''}`);
}
const generated = `# Public API reference\n\nGenerated from consumer source by \`node scripts/generate-api.mjs\`. Do not edit manually. The check command regenerates this file and fails when \`git diff --exit-code docs/API.md\` reports drift.\n\n${sections.join('\n\n')}\n`;
if (process.argv.includes('--check')) {
	if (readFileSync(output, 'utf8') !== generated) {
		console.error('docs/API.md is stale; run pnpm api:build.');
		process.exit(1);
	}
	console.log(`Validated docs/API.md from ${files.length} source files (${sections.length} documented exports).`);
} else {
	writeFileSync(output, generated);
	console.log(`Generated docs/API.md from ${files.length} source files (${sections.length} documented exports).`);
}
