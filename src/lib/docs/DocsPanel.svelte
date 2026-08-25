<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { nav } from './nav';

	let {
		collapsed = false,
		mobileOpen = false,
		onCollapsedChange,
		onMobileOpenChange
	}: {
		collapsed?: boolean;
		mobileOpen?: boolean;
		onCollapsedChange?: (collapsed: boolean) => void;
		onMobileOpenChange?: (open: boolean) => void;
	} = $props();
	let headings = $state<Array<{ id: string; label: string }>>([]);
	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;
	const flatItems = nav.flatMap((group) => group.items.filter((item) => item.built).map((item) => ({ ...item, category: group.category })));
	const routePath = $derived(page.url.pathname.slice(base.length).replace(/\/+$/, '') || '/');
	const slug = $derived(routePath.match(/^\/components\/([^/]+)$/)?.[1]);
	const index = $derived(slug ? flatItems.findIndex((item) => item.slug === slug) : -1);
	const current = $derived(index >= 0 ? flatItems[index] : undefined);
	const previous = $derived(index > 0 ? flatItems[index - 1] : undefined);
	const next = $derived(index >= 0 && index < flatItems.length - 1 ? flatItems[index + 1] : undefined);
	const registryAliases: Record<string, string> = { otp: 'input-otp', radio: 'radio-group' };
	const registryItem = $derived(slug ? registryAliases[slug] ?? slug : undefined);
	const installCommand = $derived(registryItem ? `npx shadcn-svelte@latest add https://alois-reinstadler.github.io/resax/r/${registryItem}.json` : '');

	async function copyInstall() {
		if (!installCommand) return;
		try {
			await navigator.clipboard.writeText(installCommand);
			copied = true;
			if (copyTimer) clearTimeout(copyTimer);
			copyTimer = setTimeout(() => copied = false, 1800);
		} catch { copied = false; }
	}

	$effect(() => {
		routePath;
		const update = () => {
			headings = Array.from(document.querySelectorAll<HTMLElement>('#docs-main .demo-section > header h2'))
				.map((heading) => ({ id: heading.closest<HTMLElement>('.demo-section')?.querySelector<HTMLElement>('.demo-frame')?.id ?? '', label: heading.textContent?.trim() ?? '' }))
				.filter((heading) => heading.id && heading.label);
		};
		const timer = window.setTimeout(update, 0);
		const observer = new MutationObserver(update);
		const main = document.querySelector('#docs-main');
		if (main) observer.observe(main, { childList: true, subtree: true });
		return () => { window.clearTimeout(timer); observer.disconnect(); if (copyTimer) clearTimeout(copyTimer); };
	});
</script>

<aside class:collapsed class:mobile-open={mobileOpen} class="docs-panel" aria-label="Page details">
	<header>
		<div><small>{current?.category ?? 'Svelte 5 registry'}</small><h2>{current?.name ?? 'Resax'}</h2></div>
		<button type="button" aria-label="Collapse page details" onclick={() => onCollapsedChange?.(true)}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"></path></svg>
		</button>
	</header>
	<div class="panel-body">
		{#if current && registryItem}
			<section>
				<h3>Install</h3>
				<code>{installCommand}</code>
				<button class="copy-install" type="button" onclick={copyInstall} aria-label={`Copy ${registryItem} install command`}>{copied ? 'Copied' : 'Copy command'}</button>
			</section>
			{#if headings.length}
				<section>
					<h3>On this page</h3>
					<nav aria-label="On this page">
						{#each headings as heading}<a href={`#${heading.id}`} onclick={() => onMobileOpenChange?.(false)}>{heading.label}</a>{/each}
					</nav>
				</section>
			{/if}
			<section class="pager" aria-label="Adjacent components">
				{#if previous}<a href={`${base}/components/${previous.slug}`}><span>Previous</span><strong>← {previous.name}</strong></a>{/if}
				{#if next}<a href={`${base}/components/${next.slug}`}><span>Next</span><strong>{next.name} →</strong></a>{/if}
			</section>
		{:else}
			<section><h3>Registry first</h3><p>Install the theme once, then copy any component directly into your Svelte 5 project.</p><a class="panel-link" href={`${base}/#installation`}>Installation →</a></section>
			<section><h3>Source-owned</h3><p>Every component, shared effect, and token arrives through the shadcn-svelte registry.</p><a class="panel-link" href={`${base}/r/index.json`}>Registry JSON →</a></section>
		{/if}
	</div>
</aside>
{#if mobileOpen}<button class="panel-scrim" type="button" aria-label="Close page details" onclick={() => onMobileOpenChange?.(false)}></button>{/if}

<style>
	.docs-panel { position: sticky; top: 14px; z-index: 30; box-sizing: border-box; width: 286px; height: calc(100dvh - 28px); margin: 14px 14px 14px 0; display: flex; flex-direction: column; overflow: hidden; border: 1px solid rgb(var(--rx-border)); border-radius: 20px; background: rgb(var(--rx-surface)); box-shadow: var(--rx-shadow-float); transition: opacity 180ms ease, transform 340ms var(--rx-ease-out); }
	.docs-panel.collapsed { pointer-events: none; opacity: 0; transform: translateX(calc(100% + 14px)); }
	header { display: flex; min-height: 72px; flex: none; align-items: center; gap: 10px; padding: 0 12px 0 20px; border-bottom: 1px solid rgb(var(--rx-border)); }
	header > div { min-width: 0; flex: 1; }
	header small { display: block; margin-bottom: 3px; overflow: hidden; color: rgb(var(--rx-text-secondary)); font-size: 10px; font-weight: 600; letter-spacing: .08em; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
	header h2 { margin: 0; overflow: hidden; color: rgb(var(--rx-text)); font-size: 16px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
	header button { display: inline-flex; width: 32px; height: 32px; flex: none; align-items: center; justify-content: center; border: 0; border-radius: var(--rx-control-r-sm); color: rgb(var(--rx-text-secondary)); background: transparent; cursor: pointer; transition: color 160ms ease, background 160ms ease, transform 240ms var(--rx-ease-spring); }
	header button:hover { color: rgb(var(--rx-text)); background: rgb(var(--rx-text) / .07); }
	header button:active { transform: scale(.94); }
	header button:focus-visible { outline: 2px solid rgb(var(--rx-primary)); outline-offset: 1px; }
	header svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
	.panel-body { min-height: 0; flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgb(var(--rx-text) / .14) transparent; }
	section { padding: 18px 20px; border-bottom: 1px solid rgb(var(--rx-border)); }
	section h3 { margin: 0 0 10px; color: rgb(var(--rx-text-secondary)); font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
	section p { margin: 0; color: rgb(var(--rx-text-secondary)); font-size: 12px; line-height: 1.65; }
	section code { display: block; overflow-wrap: anywhere; color: rgb(var(--rx-text-secondary)); font: 11px/1.65 ui-monospace, monospace; }
	.copy-install { margin-top: 12px; border: 1px solid rgb(var(--rx-border)); border-radius: 8px; padding: 7px 9px; color: rgb(var(--rx-text-secondary)); background: rgb(var(--rx-input)); font-size: 10px; font-weight: 600; cursor: pointer; transition: color 160ms ease, border-color 160ms ease, transform 240ms var(--rx-ease-spring); }
	.copy-install:hover { border-color: rgb(var(--rx-border-hover)); color: rgb(var(--rx-text)); }
	.copy-install:active { transform: scale(.96); }
	.copy-install:focus-visible { outline: 2px solid rgb(var(--rx-primary)); outline-offset: 1px; }
	nav { display: grid; gap: 2px; }
	nav a { overflow: hidden; border-radius: 8px; padding: 7px 9px; color: rgb(var(--rx-text-secondary)); font-size: 12px; line-height: 1.3; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; transition: color 160ms ease, background 160ms ease, transform 240ms var(--rx-ease-out); }
	nav a:hover { color: rgb(var(--rx-text)); background: rgb(var(--rx-text) / .06); transform: translateX(2px); }
	.pager { display: grid; gap: 8px; border-bottom: 0; }
	.pager a { display: grid; gap: 3px; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-md); padding: 10px 12px; color: rgb(var(--rx-text)); background: rgb(var(--rx-input)); text-decoration: none; transition: border-color 160ms ease, transform 240ms var(--rx-ease-out); }
	.pager a:hover { border-color: rgb(var(--rx-border-hover)); transform: translateY(-2px); }
	.pager span { color: rgb(var(--rx-text-secondary)); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; }
	.pager strong { font-size: 12px; font-weight: 600; }
	.panel-link { display: inline-flex; margin-top: 12px; color: rgb(var(--rx-text)); font-size: 12px; font-weight: 600; text-decoration: none; }
	.panel-link:hover { color: rgb(var(--rx-primary)); }
	.panel-scrim { display: none; }

	@media (max-width: 900px) {
		.docs-panel, .docs-panel.collapsed { position: fixed; inset: auto 10px 10px; z-index: 61; width: auto; height: auto; max-height: 45dvh; margin: 0; opacity: 0; pointer-events: none; transform: translateY(calc(100% + 18px)); }
		.docs-panel.mobile-open { opacity: 1; pointer-events: auto; transform: none; }
		.panel-scrim { position: fixed; inset: 56px 0 0; z-index: 60; display: block; border: 0; background: rgb(0 0 0 / .5); backdrop-filter: blur(2px); }
	}
	@media (prefers-reduced-motion: reduce) { .docs-panel, header button, nav a, .pager a, .copy-install { transition: none; } }
	@media (forced-colors: active) { .docs-panel, .pager a { border: 1px solid CanvasText; } }
</style>
