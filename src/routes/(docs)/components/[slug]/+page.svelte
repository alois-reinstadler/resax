<script lang="ts">
	import DemoSection from '$lib/docs/DemoSection.svelte';
	let { data }: { data: { slug: string } } = $props();
	const title = $derived(data.slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '));
</script>

<svelte:head><title>{title} — Resax</title></svelte:head>
<div class="page-heading">
	<p class="eyebrow">Component</p>
	<h1>{title}</h1>
	<p>This component is coming soon.</p>
</div>
<DemoSection title="Preview"><p class="coming-soon">Coming soon in a later Resax phase.</p></DemoSection>
