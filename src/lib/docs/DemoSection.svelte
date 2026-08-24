<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	let { title, children, source = '// Component source will land in Phase 1.', item }: { title: string; children: Snippet; source?: string; item?: string } = $props();
	let copyStatus = $state<'idle' | 'copied' | 'failed'>('idle');
	let copyTimer: ReturnType<typeof setTimeout> | undefined;
	const routeItem = $derived(page.url.pathname.match(/^\/components\/([^/]+)\/?$/)?.[1]);
	const registryAliases: Record<string, string> = { otp: 'input-otp', radio: 'radio-group' };
	const registryItem = $derived(item ?? (routeItem ? registryAliases[routeItem] ?? routeItem : undefined));
	const installCommand = $derived(registryItem ? `npx shadcn-svelte@latest add http://localhost:5173/r/${registryItem}.json` : '');
	$effect(() => () => { if (copyTimer) clearTimeout(copyTimer); });
	async function copyInstall() {
		if (!installCommand) return;
		try {
			if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
			await navigator.clipboard.writeText(installCommand);
			copyStatus = 'copied';
		} catch {
			copyStatus = 'failed';
		}
		if (copyTimer) clearTimeout(copyTimer);
		copyTimer = setTimeout(() => copyStatus = 'idle', 1800);
	}
</script>

<section class="demo-section">
	<header><h2>{title}</h2><a href={`#${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} aria-label={`Link to ${title}`}>#</a></header>
	{#if registryItem}
		<div class="install-command">
			<code>{installCommand}</code>
			<button type="button" onclick={copyInstall} aria-label={`Copy ${registryItem} install command`}>{copyStatus === 'copied' ? 'Copied' : copyStatus === 'failed' ? 'Copy failed' : 'Copy'}</button>
		</div>
	{/if}
	<div class="demo-frame" id={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{@render children()}</div>
	<details><summary>View source</summary><pre><code>{source}</code></pre></details>
</section>
