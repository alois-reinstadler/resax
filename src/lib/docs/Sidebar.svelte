<script lang="ts">
	import { page } from '$app/state';
	import { nav } from './nav';
	let open = $state(false);
	let query = $state('');
	const groups = $derived(nav.map((group) => ({ ...group, items: group.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.items.length));
	const componentCount = $derived(nav.reduce((total, group) => total + group.items.filter((item) => item.built).length, 0));
	function keyboard(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
		if (event.key === '/' && event.target instanceof HTMLElement && !event.target.matches('input, textarea, select, [contenteditable]')) {
			event.preventDefault();
			document.querySelector<HTMLInputElement>('.component-search input')?.focus();
		}
	}
</script>

<svelte:window onkeydown={keyboard} />

<aside class="sidebar">
	<div class="sidebar-head">
		<a class="brand" href="/" aria-label="Resax home"><span>R</span><strong>Resax</strong><small>Svelte UI</small></a>
		<button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-controls="component-navigation" aria-expanded={open} onclick={() => open = !open}>
			<span></span><span></span><span></span>
		</button>
	</div>
	<div class="sidebar-body" class:open id="component-navigation">
	<div class="sidebar-summary"><span>Components</span><strong>{componentCount}</strong></div>
	<label class="component-search"><span class="sr-only">Filter components</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg><input bind:value={query} placeholder="Search components…" /><kbd>/</kbd></label>
	<nav aria-label="Components">
		{#each groups as group}
			<section class="nav-group">
				<h2>{group.category}</h2>
				<ul>
					{#each group.items as item}
						<li><a class:active={page.url.pathname === `/components/${item.slug}`} class:disabled={!item.built} href={`/components/${item.slug}`} aria-disabled={!item.built} onclick={() => open = false}>{item.name}{#if !item.built}<span>Soon</span>{/if}</a></li>
					{/each}
				</ul>
			</section>
		{/each}
		{#if groups.length === 0}<p class="nav-empty">No components match “{query}”.</p>{/if}
	</nav>
	</div>
</aside>
{#if open}<button class="sidebar-scrim" type="button" aria-label="Close navigation" onclick={() => open = false}></button>{/if}
