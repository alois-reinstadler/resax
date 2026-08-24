<script lang="ts">
	import type { Snippet } from 'svelte';
	import DarkToggle from '$lib/docs/DarkToggle.svelte';
	import Sidebar from '$lib/docs/Sidebar.svelte';
	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<script>
		{`if (localStorage.getItem('resax-mode') === 'dark' || (!localStorage.getItem('resax-mode') && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark');`}
	</script>
</svelte:head>

<div class="docs-shell">
	<Sidebar />
	<div class="docs-column">
		<header class="topbar"><DarkToggle /></header>
		<main>{@render children()}</main>
	</div>
</div>
