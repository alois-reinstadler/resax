<script lang="ts">
	import type { Snippet } from 'svelte';
	let { title, children, source = '// Source example unavailable.', item: _item }: { title: string; children: Snippet; source?: string; item?: string } = $props();
	const registryAliases: Record<string, string> = { otp: 'input-otp', radio: 'radio-group' };
	const sectionId = $derived(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
	const explicitItem = $derived(_item ? registryAliases[_item] ?? _item : undefined);
</script>

<section class="demo-section" aria-labelledby={`${sectionId}-title`} data-registry-item={explicitItem}>
	<header><h2><span id={`${sectionId}-title`}>{title}</span></h2><a href={`#${sectionId}`} aria-label={`Link to ${title}`}>#</a></header>
	<div class="demo-frame" id={sectionId}>{@render children()}</div>
	<details><summary>View source</summary><textarea readonly rows={Math.min(16, Math.max(3, source.split('\n').length))} aria-label={`${title} source code`} value={source}></textarea></details>
</section>

<style>
	.demo-section { width: 100%; margin-top: 44px; }
	.demo-section > header { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; }
	.demo-section > header h2 { margin: 0; color: rgb(var(--rx-text)); font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
	.demo-section > header a { color: rgb(var(--rx-text-muted)); font-size: 13px; text-decoration: none; opacity: 0; transition: color 160ms ease, opacity 160ms ease; }
	.demo-section > header:hover a, .demo-section > header a:focus-visible { opacity: 1; }
	.demo-section > header a:hover { color: rgb(var(--rx-primary)); }
	.demo-section > header a:focus-visible { border-radius: 4px; outline: 2px solid rgb(var(--rx-primary)); outline-offset: 2px; }
	.demo-frame { position: relative; isolation: isolate; box-sizing: border-box; width: 100%; min-height: min(360px, 44dvh); display: grid; place-items: safe center; overflow: visible; border: 1px dashed rgb(var(--rx-border-strong)); border-radius: 14px; padding: clamp(24px, 5vw, 52px); background: transparent; box-shadow: inset 0 0 120px rgb(0 0 0 / .08); scroll-margin-top: 70px; }
	details { margin-top: 10px; overflow: hidden; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-md); background: rgb(var(--rx-surface)); }
	summary { padding: 11px 14px; color: rgb(var(--rx-text-secondary)); font-size: 11px; font-weight: 600; cursor: pointer; user-select: none; transition: color 160ms ease, background 160ms ease; }
	summary:hover { color: rgb(var(--rx-text)); background: rgb(var(--rx-text) / .04); }
	summary:focus-visible { outline: 2px solid rgb(var(--rx-primary)); outline-offset: -2px; }
	textarea { box-sizing: border-box; width: calc(100% - 20px); margin: 0 10px 10px; resize: vertical; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-control-r-sm); padding: 14px; outline: 0; color: rgb(var(--rx-text-secondary)); background: rgb(var(--rx-background)); font: 11px/1.65 ui-monospace, monospace; tab-size: 2; }
	textarea:focus-visible { border-color: rgb(var(--rx-primary)); box-shadow: 0 0 0 2px rgb(var(--rx-primary) / .12); }
	@media (max-width: 900px) { .demo-section { margin-top: 36px; } .demo-frame { min-height: 260px; padding: 22px 16px; } }
	@media (prefers-reduced-motion: reduce) { .demo-section > header a, summary { transition: none; } }
	@media (forced-colors: active) { .demo-frame, details, textarea { border: 1px solid CanvasText; } }
</style>
