<script lang="ts">
	import type { Component } from 'svelte';
	import DemoSection from '$lib/docs/DemoSection.svelte';

	let { data }: { data: { slug: string } } = $props();
	const title = $derived(data.slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '));
	const pageModules = import.meta.glob<{ default: Component }>('$lib/docs/pages/*.svelte', { eager: true });
	const pages = Object.fromEntries(
		Object.entries(pageModules).map(([path, module]) => [path.split('/').pop()?.replace('.svelte', ''), module.default])
	) as Record<string, Component>;
	const Page = $derived(pages[data.slug]);
</script>

<svelte:head><title>{title} — Resax</title></svelte:head>

{#if Page}
	<Page />
{:else}
	<div class="page-heading"><p class="eyebrow">Component</p><h1>{title}</h1><p>Resax visual primitive with theme-token styling.</p></div>
	<DemoSection title="Preview"><p class="coming-soon">Coming soon in a later Resax phase.</p></DemoSection>
{/if}
