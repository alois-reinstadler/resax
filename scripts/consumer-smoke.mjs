import { createReadStream, existsSync, readFileSync, rmSync } from 'node:fs';
import { mkdtemp } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join, normalize, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const repository = resolve(import.meta.dirname, '..');
const staticRoot = resolve(repository, 'static');
const temporaryRoot = process.env.RESAX_SMOKE_TMP_ROOT || '/var/tmp';
const temporaryDirectories = new Set();
let server;

function run(command, args, options = {}) {
	console.log(`\n> ${command} ${args.join(' ')}`);
	return new Promise((resolveRun, reject) => {
		const child = spawn(command, args, {
			cwd: options.cwd ?? repository,
			stdio: ['pipe', 'inherit', 'inherit']
		});
		child.once('error', reject);
		child.once('exit', (code, signal) => {
			if (code === 0) resolveRun();
			else reject(new Error(`${command} exited with ${signal ?? `status ${code}`}`));
		});
		if (options.input !== undefined) child.stdin.end(options.input);
		else child.stdin.end();
	});
}

async function makeConsumer(label) {
	const directory = await mkdtemp(join(temporaryRoot, `resax-consumer-smoke-${label}-`));
	temporaryDirectories.add(directory);
	await run('pnpm', [
		'dlx', 'sv', 'create', '.', '--template', 'minimal', '--types', 'ts',
		'--add', 'tailwindcss=plugins:none', '--install', 'pnpm', '--no-dir-check'
	], { cwd: directory });
	return directory;
}

async function initialize(directory, aliases) {
	await run('pnpm', [
		'dlx', 'shadcn-svelte@latest', 'init', '--preset', 'a0', '--base-color', 'neutral',
		'--css', 'src/routes/layout.css', '--components-alias', aliases.components,
		'--lib-alias', aliases.lib, '--utils-alias', aliases.utils,
		'--hooks-alias', aliases.hooks, '--ui-alias', aliases.ui, '--no-deps-install'
	], { cwd: directory, input: 'y\n' });
	// CLI 1.5 exits at its stylesheet confirmation when stdin is not a TTY.
	// The config and utils are already written; install the init-time support deps explicitly.
	await run('pnpm', [
		'add', '-D', 'clsx', 'tailwind-merge', 'tailwind-variants', 'tw-animate-css',
		'@lucide/svelte', '@fontsource-variable/inter'
	], { cwd: directory });
}

async function install(directory, baseUrl, items) {
	await run('pnpm', [
		'dlx', 'shadcn-svelte@latest', 'add', '-y', '-o',
		...items.map((item) => `${baseUrl}/r/${item}.json`)
	], { cwd: directory });
	await run('pnpm', ['check'], { cwd: directory });
	await run('pnpm', ['build'], { cwd: directory });
}

function cleanup() {
	server?.close();
	for (const directory of temporaryDirectories) {
		const resolved = resolve(directory);
		const expectedPrefix = resolve(temporaryRoot, 'resax-consumer-smoke-');
		if (!resolved.startsWith(expectedPrefix) || resolved === repository) {
			console.error(`Refusing to clean unexpected path: ${resolved}`);
			continue;
		}
		if (existsSync(resolved)) rmSync(resolved, { recursive: true, force: true });
	}
	temporaryDirectories.clear();
}

for (const signal of ['SIGINT', 'SIGTERM']) {
	process.once(signal, () => {
		cleanup();
		process.exit(128 + (signal === 'SIGINT' ? 2 : 15));
	});
}

try {
	await run('pnpm', ['registry:build']);
	server = createServer((request, response) => {
		const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
		const relative = normalize(pathname).replace(/^[/\\]+/, '');
		const file = resolve(staticRoot, relative);
		if (!file.startsWith(`${staticRoot}/`) || !existsSync(file)) {
			response.writeHead(404).end('Not found');
			return;
		}
		response.setHeader('content-type', file.endsWith('.json') ? 'application/json' : 'application/octet-stream');
		createReadStream(file).pipe(response);
	});
	await new Promise((resolveListen, reject) => {
		server.once('error', reject);
		server.listen(0, '127.0.0.1', resolveListen);
	});
	const address = server.address();
	if (!address || typeof address === 'string') throw new Error('Could not resolve registry server port');
	const baseUrl = `http://127.0.0.1:${address.port}`;
	const defaultAliases = {
		components: '$lib/components', lib: '$lib', utils: '$lib/utils',
		hooks: '$lib/hooks', ui: '$lib/components/ui'
	};

	const representative = await makeConsumer('matrix');
	await initialize(representative, defaultAliases);
	await install(representative, baseUrl, [
		'button', 'calendar', 'popup', 'notification', 'tabs',
		'sidebar', 'table', 'code', 'cursor', 'split-button'
	]);

	const allItems = JSON.parse(readFileSync(join(staticRoot, 'r/index.json'), 'utf8')).map((item) => item.name);
	const complete = await makeConsumer('all');
	await initialize(complete, defaultAliases);
	await install(complete, baseUrl, allItems);

	const custom = await makeConsumer('aliases');
	await initialize(custom, {
		components: '$lib/widgets', lib: '$lib/kernel', utils: '$lib/shared/utils',
		hooks: '$lib/runtime/hooks', ui: '$lib/widgets/ui'
	});
	await install(custom, baseUrl, ['button', 'popup', 'sidebar', 'table', 'code', 'split-button']);

	console.log(`\nConsumer smoke passed: representative matrix, all ${allItems.length} items, and custom aliases.`);
} finally {
	cleanup();
}
