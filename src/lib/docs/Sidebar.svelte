<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { nav } from './nav';

	let {
		collapsed = false,
		onCollapsedChange
	}: {
		collapsed?: boolean;
		onCollapsedChange?: (collapsed: boolean) => void;
	} = $props();
	let open = $state(false);
	let query = $state('');
	const normalizedPath = $derived(page.url.pathname.replace(/\/+$/, '') || '/');
	const groups = $derived(
		nav
			.map((group) => ({ ...group, items: group.items.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase())) }))
			.filter((group) => group.items.length)
	);
	const componentCount = $derived(nav.reduce((total, group) => total + group.items.filter((item) => item.built).length, 0));

	function keyboard(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
		if (event.key === '/' && event.target instanceof HTMLElement && !event.target.matches('input, textarea, select, [contenteditable]')) {
			event.preventDefault();
			open = true;
			requestAnimationFrame(() => document.querySelector<HTMLInputElement>('.component-search input')?.focus());
		}
	}
</script>

<svelte:window onkeydown={keyboard} />

<aside class:collapsed class="sidebar" aria-label="Component catalog">
	<div class="sidebar-head">
		<a class="brand" href={`${base}/`} aria-label="Resax home"><span aria-hidden="true">R</span><strong>Resax</strong></a>
		<button class="rail-collapse" type="button" aria-label="Collapse component navigation" onclick={() => onCollapsedChange?.(true)}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"></path></svg>
		</button>
		<button class="menu-toggle" type="button" aria-label="Toggle component navigation" aria-controls="component-navigation" aria-expanded={open} onclick={() => open = !open}>
			<span></span><span></span><span></span>
		</button>
	</div>
	<div class="sidebar-body" class:open id="component-navigation">
		<div class="sidebar-summary"><span>Components</span><strong>{componentCount}</strong></div>
		<label class="component-search">
			<span class="sr-only">Filter components</span>
			<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>
			<input bind:value={query} placeholder="Search components…" />
			<kbd>/</kbd>
		</label>
		<nav aria-label="Components">
			{#each groups as group}
				<section class="nav-group">
					<h2>{group.category}</h2>
					<ul>
						{#each group.items as item}
							<li><a class:active={normalizedPath === `${base}/components/${item.slug}`} class:disabled={!item.built} href={`${base}/components/${item.slug}`} aria-disabled={!item.built} onclick={() => open = false}>{item.name}{#if !item.built}<span>Soon</span>{/if}</a></li>
						{/each}
					</ul>
				</section>
			{/each}
			{#if groups.length === 0}<p class="nav-empty">No components match “{query}”.</p>{/if}
		</nav>
	</div>
</aside>
{#if open}<button class="sidebar-scrim" type="button" aria-label="Close component navigation" onclick={() => open = false}></button>{/if}

<style>
	.sidebar { position: sticky; top: 14px; z-index: 40; box-sizing: border-box; width: calc(300px - 14px); height: calc(100dvh - 28px); margin: 14px 0 14px 14px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid rgb(var(--rx-border)); border-radius: 20px; background: rgb(var(--rx-surface)); box-shadow: var(--rx-shadow-float); transition: opacity 180ms ease, transform 340ms var(--rx-ease-out); }
	.sidebar.collapsed { pointer-events: none; opacity: 0; transform: translateX(calc(-100% - 14px)); }
	.sidebar-head { flex: none; display: flex; align-items: center; height: 52px; padding: 0 8px 0 18px; border-bottom: 1px solid rgb(var(--rx-border)); }
	.brand { display: inline-flex; min-width: 0; align-items: center; gap: 10px; color: rgb(var(--rx-text)); text-decoration: none; }
	.brand > span { display: grid; width: 28px; height: 28px; flex: none; place-items: center; border-radius: 9px; color: rgb(var(--rx-primary-contrast-rgb)); background: rgb(var(--rx-primary)); box-shadow: 0 8px 20px rgb(var(--rx-primary) / .24); font-size: 13px; font-weight: 760; }
	.brand strong { overflow: hidden; font-size: 15px; font-weight: 650; letter-spacing: .01em; white-space: nowrap; }
	.rail-collapse, .menu-toggle { display: inline-flex; width: 32px; height: 32px; margin-left: auto; align-items: center; justify-content: center; border: 0; border-radius: var(--rx-control-r-sm); color: rgb(var(--rx-text-secondary)); background: transparent; cursor: pointer; transition: color 160ms ease, background 160ms ease, transform 240ms var(--rx-ease-spring); }
	.rail-collapse:hover, .menu-toggle:hover { color: rgb(var(--rx-text)); background: rgb(var(--rx-text) / .07); }
	.rail-collapse:active, .menu-toggle:active { transform: scale(.94); }
	.rail-collapse:focus-visible, .menu-toggle:focus-visible { outline: 2px solid rgb(var(--rx-primary)); outline-offset: 1px; }
	.rail-collapse svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
	.menu-toggle { display: none; }
	.menu-toggle span { width: 15px; height: 1.5px; border-radius: 1px; background: currentColor; }
	.sidebar-body { min-height: 0; flex: 1; overflow: auto; padding: 14px 12px 22px; scrollbar-width: thin; scrollbar-color: rgb(var(--rx-text) / .14) transparent; }
	.sidebar-summary { display: flex; align-items: center; justify-content: space-between; margin: 0 6px 10px; color: rgb(var(--rx-text-secondary)); font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
	.sidebar-summary strong { display: inline-flex; min-width: 22px; height: 20px; align-items: center; justify-content: center; border-radius: 999px; color: rgb(var(--rx-text-secondary)); background: rgb(var(--rx-text) / .07); font-size: 11px; font-variant-numeric: tabular-nums; letter-spacing: 0; }
	.component-search { position: relative; display: block; margin-bottom: 14px; }
	.component-search svg { position: absolute; top: 50%; left: 11px; width: 15px; height: 15px; transform: translateY(-50%); fill: none; stroke: currentColor; stroke-width: 1.8; color: rgb(var(--rx-text-muted)); pointer-events: none; }
	.component-search input { box-sizing: border-box; width: 100%; height: 36px; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-sm); padding: 0 34px; outline: 0; color: rgb(var(--rx-text)); background: rgb(var(--rx-input)); font: inherit; font-size: 12px; transition: border-color 160ms ease, background 160ms ease, box-shadow 160ms ease; }
	.component-search input::placeholder { color: rgb(var(--rx-text-muted)); }
	.component-search input:focus { border-color: rgb(var(--rx-primary)); background: rgb(var(--rx-background)); box-shadow: 0 0 0 3px rgb(var(--rx-primary) / .1); }
	.component-search kbd { position: absolute; top: 50%; right: 8px; min-width: 19px; transform: translateY(-50%); border: 1px solid rgb(var(--rx-border)); border-radius: 5px; color: rgb(var(--rx-text-muted)); background: rgb(var(--rx-surface-2)); font: 600 10px/17px ui-monospace, monospace; text-align: center; }
	.nav-group h2 { margin: 16px 9px 5px; color: rgb(var(--rx-text-secondary)); font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
	.nav-group ul { display: grid; gap: 2px; margin: 0; padding: 0; list-style: none; }
	.nav-group a { position: relative; display: flex; min-height: 34px; align-items: center; gap: 8px; box-sizing: border-box; border-radius: 9px; padding: 0 11px; color: rgb(var(--rx-text-secondary)); font-size: 13px; font-weight: 500; text-decoration: none; transition: color 180ms var(--rx-ease-out), background 180ms var(--rx-ease-out), padding-left 340ms var(--rx-ease-spring); }
	.nav-group a:hover { color: rgb(var(--rx-text)); background: rgb(var(--rx-text) / .06); }
	.nav-group a.active { padding-left: 15px; color: rgb(var(--rx-text)); background: rgb(var(--rx-text) / .1); }
	.nav-group a.active::after { content: ''; position: absolute; top: 50%; right: 12px; width: 3px; height: 18px; transform: translateY(-50%); border-radius: 999px; background: rgb(var(--rx-primary)); }
	.nav-group a > span { margin-left: auto; color: rgb(var(--rx-text-muted)); font-size: 9px; letter-spacing: .05em; text-transform: uppercase; }
	.nav-group a.disabled { color: rgb(var(--rx-text-muted)); }
	.nav-empty { margin: 18px 8px; color: rgb(var(--rx-text-muted)); font-size: 12px; line-height: 1.5; }
	.sidebar-scrim { display: none; }

	@media (max-width: 900px) {
		.sidebar, .sidebar.collapsed { position: sticky; top: 0; width: 100%; height: 56px; margin: 0; border-width: 0 0 1px; border-radius: 0; opacity: 1; transform: none; pointer-events: auto; overflow: visible; background: rgb(var(--rx-background) / .88); box-shadow: none; backdrop-filter: blur(14px); }
		.sidebar-head { height: 56px; padding: 0 12px; }
		.rail-collapse { display: none; }
		.menu-toggle { display: grid; gap: 3px; }
		.sidebar-body { position: fixed; top: 56px; left: 0; z-index: 53; display: block; box-sizing: border-box; width: min(300px, calc(100vw - 32px)); height: calc(100dvh - 56px); padding: 14px 12px 24px; border-right: 1px solid rgb(var(--rx-border)); background: rgb(var(--rx-surface)); box-shadow: 22px 0 48px rgb(0 0 0 / .28); transform: translateX(-105%); transition: transform 340ms var(--rx-ease-out); }
		.sidebar-body.open { transform: none; }
		.sidebar-scrim { position: fixed; inset: 56px 0 0; z-index: 52; display: block; border: 0; background: rgb(0 0 0 / .55); backdrop-filter: blur(2px); }
	}
	@media (prefers-reduced-motion: reduce) { .sidebar, .sidebar-body, .nav-group a, .rail-collapse, .menu-toggle { transition: none; } }
	@media (forced-colors: active) { .sidebar, .component-search input, .nav-group a.active { border: 1px solid CanvasText; } }
</style>
