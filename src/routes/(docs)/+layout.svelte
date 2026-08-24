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
	<a class="skip-link" href="#docs-main">Skip to content</a>
	<Sidebar />
	<div class="docs-column">
		<header class="topbar">
			<a class="topbar-home" href="/">Documentation</a>
			<nav aria-label="Documentation"><a href="/#components">Components</a><a href="/#installation">Install</a><a href="/r/">Registry JSON</a></nav>
			<DarkToggle />
		</header>
		<main id="docs-main">{@render children()}</main>
	</div>
</div>
