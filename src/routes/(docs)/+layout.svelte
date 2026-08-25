<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import DarkToggle from '$lib/docs/DarkToggle.svelte';
	import DocsPanel from '$lib/docs/DocsPanel.svelte';
	import Sidebar from '$lib/docs/Sidebar.svelte';

	let { children }: { children: Snippet } = $props();
	let railCollapsed = $state(false);
	let panelCollapsed = $state(false);
	let mobilePanelOpen = $state(false);
	const routeLabel = $derived(page.url.pathname.match(/\/components\/([^/]+)/)?.[1]?.replaceAll('-', ' ') ?? 'component registry');

	$effect(() => {
		railCollapsed = localStorage.getItem('resax-rail') === 'collapsed';
		panelCollapsed = localStorage.getItem('resax-panel') === 'collapsed';
	});

	function setRail(collapsed: boolean) {
		railCollapsed = collapsed;
		localStorage.setItem('resax-rail', collapsed ? 'collapsed' : 'open');
	}
	function setPanel(collapsed: boolean) {
		panelCollapsed = collapsed;
		localStorage.setItem('resax-panel', collapsed ? 'collapsed' : 'open');
	}
</script>

<svelte:head>
	{@html `<script>const mode=localStorage.getItem('resax-mode');const dark=mode!=='light';document.documentElement.classList.toggle('dark',dark);document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';</script>`}
</svelte:head>

<div class:rail-collapsed={railCollapsed} class:panel-collapsed={panelCollapsed} class="docs-shell">
	<a class="skip-link" href="#docs-main">Skip to content</a>
	<Sidebar collapsed={railCollapsed} onCollapsedChange={setRail} />
	<div class="docs-column">
		<header class="topbar">
			{#if railCollapsed}<button class="shell-control rail-open" type="button" aria-label="Expand component navigation" onclick={() => setRail(false)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"></path></svg></button>{/if}
			<a class="topbar-home" href={`${base}/`} aria-label="Resax documentation home"><span>Resax</span><small>/ {routeLabel}</small></a>
			<nav aria-label="Documentation"><a href={`${base}/#components`}>Components</a><a href={`${base}/#installation`}>Install</a><a href={`${base}/r/index.json`}>Registry</a></nav>
			<DarkToggle />
			{#if panelCollapsed}<button class="shell-control panel-open" type="button" aria-label="Expand page details" onclick={() => setPanel(false)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"></path></svg></button>{/if}
			<button class="shell-control mobile-panel" type="button" aria-label="Toggle page details" aria-expanded={mobilePanelOpen} onclick={() => mobilePanelOpen = !mobilePanelOpen}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7h.01"></path></svg></button>
		</header>
		<main id="docs-main">{@render children()}</main>
	</div>
	<DocsPanel collapsed={panelCollapsed} mobileOpen={mobilePanelOpen} onCollapsedChange={setPanel} onMobileOpenChange={(open) => mobilePanelOpen = open} />
</div>

<style>
	:global(html) { scroll-padding-top: 72px; }
	:global(body) { overflow: hidden; background: rgb(var(--rx-background)); }
	.docs-shell { display: grid; grid-template-columns: 300px minmax(0, 1fr) 300px; width: 100%; height: 100dvh; overflow: hidden; color: rgb(var(--rx-text)); background: rgb(var(--rx-background)); font-family: "Outfit Variable", "Inter Variable", system-ui, -apple-system, sans-serif; transition: grid-template-columns 340ms var(--rx-ease-out); }
	.docs-shell.rail-collapsed { grid-template-columns: 0 minmax(0, 1fr) 300px; }
	.docs-shell.panel-collapsed { grid-template-columns: 300px minmax(0, 1fr) 0; }
	.docs-shell.rail-collapsed.panel-collapsed { grid-template-columns: 0 minmax(0, 1fr) 0; }
	.docs-column { position: relative; min-width: 0; height: 100dvh; display: flex; flex-direction: column; overflow: hidden; background: rgb(var(--rx-background)); box-shadow: inset 0 0 150px rgb(0 0 0 / .16); }
	.topbar { position: relative; z-index: 20; display: flex; height: 56px; flex: none; align-items: center; gap: 8px; box-sizing: border-box; border-bottom: 0; padding: 0 14px; background: linear-gradient(to bottom, rgb(var(--rx-background)) 54%, rgb(var(--rx-background) / 0)); }
	.topbar-home { display: inline-flex; min-width: 0; align-items: baseline; gap: 7px; margin-right: auto; color: rgb(var(--rx-text)); text-decoration: none; }
	.topbar-home span { font-size: 13px; font-weight: 650; }
	.topbar-home small { overflow: hidden; color: rgb(var(--rx-text-secondary)); font-size: 11px; font-weight: 500; text-overflow: ellipsis; text-transform: capitalize; white-space: nowrap; }
	.topbar nav { display: flex; align-items: center; gap: 2px; }
	.topbar nav a { border-radius: 8px; padding: 7px 9px; color: rgb(var(--rx-text-secondary)); font-size: 11px; font-weight: 600; text-decoration: none; transition: color 160ms ease, background 160ms ease; }
	.topbar nav a:hover { color: rgb(var(--rx-text)); background: rgb(var(--rx-text) / .06); }
	.shell-control { display: inline-flex; width: 32px; height: 32px; flex: none; align-items: center; justify-content: center; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-sm); color: rgb(var(--rx-text-secondary)); background: rgb(var(--rx-background) / .6); cursor: pointer; backdrop-filter: blur(8px); transition: color 160ms ease, background 160ms ease, transform 240ms var(--rx-ease-spring); }
	.shell-control:hover { color: rgb(var(--rx-text)); background: rgb(var(--rx-surface-2)); }
	.shell-control:active { transform: scale(.94); }
	.shell-control:focus-visible { outline: 2px solid rgb(var(--rx-primary)); outline-offset: 1px; }
	.shell-control svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
	.mobile-panel { display: none; }
	main { width: auto; min-height: 0; max-width: none; flex: 1; overflow: auto; box-sizing: border-box; margin: 0; padding: 44px clamp(24px, 4vw, 64px) 80px; scrollbar-width: thin; scrollbar-color: rgb(var(--rx-text) / .15) transparent; }
	main :global(.page-heading) { width: min(100%, 1180px); margin: 0 auto; padding: 0 0 30px; border-bottom: 1px solid rgb(var(--rx-border)); }
	main :global(.page-heading .eyebrow) { margin: 0 0 8px; color: rgb(var(--rx-text-secondary)); font-size: 10px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; }
	main :global(.page-heading h1) { margin: 0; color: rgb(var(--rx-text)); font-size: clamp(38px, 5vw, 58px); font-weight: 600; letter-spacing: -.055em; line-height: .96; }
	main :global(.page-heading > p:last-child) { max-width: 660px; margin: 14px 0 0; color: rgb(var(--rx-text-secondary)); font-size: 13px; line-height: 1.7; }
	main :global(.page-heading ~ .demo-section) { width: min(100%, 1180px); margin-right: auto; margin-left: auto; }
	.skip-link { position: fixed; top: 10px; left: 50%; z-index: 100; transform: translate(-50%, -160%); border-radius: var(--rx-control-r-sm); padding: 9px 13px; color: rgb(var(--rx-primary-contrast-rgb)); background: rgb(var(--rx-primary)); font-size: 12px; font-weight: 650; transition: transform 180ms var(--rx-ease-out); }
	.skip-link:focus { transform: translate(-50%, 0); }

	@media (max-width: 900px) {
		:global(body) { overflow: auto; }
		.docs-shell, .docs-shell.rail-collapsed, .docs-shell.panel-collapsed, .docs-shell.rail-collapsed.panel-collapsed { display: block; height: auto; min-height: 100dvh; overflow: visible; }
		.docs-column { height: auto; min-height: calc(100dvh - 56px); overflow: visible; box-shadow: none; }
		.topbar { position: sticky; top: 56px; height: 44px; padding: 0 10px; border-bottom: 1px solid rgb(var(--rx-border)); background: rgb(var(--rx-background) / .86); backdrop-filter: blur(14px); }
		.topbar-home small, .topbar nav, .rail-open, .panel-open { display: none; }
		.mobile-panel { display: inline-flex; }
		main { min-height: auto; overflow: visible; padding: 30px 16px 64px; }
		main :global(.page-heading) { padding-bottom: 24px; }
	}
	@media (max-width: 430px) { .topbar-home span { font-size: 12px; } }
	@media (prefers-reduced-motion: reduce) { .docs-shell, .shell-control, .skip-link, .topbar nav a { transition: none; } }
	@media (forced-colors: active) { .shell-control { border: 1px solid CanvasText; } }
</style>
