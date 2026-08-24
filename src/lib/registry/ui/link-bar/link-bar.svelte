<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	export interface LinkBarItem { id: string; label: string; href?: string; icon?: Snippet; disabled?: boolean; }
	export interface LinkBarProps { items: LinkBarItem[]; active?: string; color?: RxColor; variant?: 'default'|'glow'|'magnet'|'pill'|'slide'|'underline'; onActiveChange?: (id: string) => void; }
</script>
<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';
	let { items, active = $bindable(''), color, variant = 'default', onActiveChange }: LinkBarProps = $props();
	let root: HTMLElement;
	let indicator = $state('opacity:0');
	function update() { const el = root?.querySelector<HTMLElement>('[aria-current="page"]'); if (el) indicator = `opacity:1;transform:translateX(${el.offsetLeft}px);width:${el.offsetWidth}px`; }
	function select(item: LinkBarItem, event: MouseEvent) { if (item.disabled) { event.preventDefault(); return; } active = item.id; onActiveChange?.(item.id); queueMicrotask(update); }
	function observe(node: HTMLElement) { root=node; const observer=new ResizeObserver(update); observer.observe(node); queueMicrotask(update); return () => observer.disconnect(); }
</script>
<nav class="rx-link-bar rx-link-bar--{variant}" style={`${styleColor(color) ?? '--rx-color:var(--rx-primary)'};--rx-duration:${RX_DURATION.base}ms;--rx-ease:${RX_EASE}`} aria-label="Section navigation" {@attach observe}>
	<span class="rx-link-bar__indicator" style={indicator}></span>
	{#each items as item (item.id)}
		<a href={item.href ?? '#'} aria-current={active === item.id ? 'page' : undefined} aria-disabled={item.disabled ? 'true' : undefined} tabindex={item.disabled ? -1 : undefined} onclick={(e) => select(item,e)}>{#if item.icon}<span aria-hidden="true">{@render item.icon()}</span>{/if}<span>{item.label}</span></a>
	{/each}
</nav>
<style>
	.rx-link-bar{position:relative;display:flex;gap:.2rem;width:max-content;padding:.3rem;border-radius:calc(var(--rx-radius)*1.2);background:rgb(var(--rx-text)/.055)}
	a{position:relative;z-index:1;display:flex;align-items:center;gap:.4rem;padding:.55rem .85rem;border-radius:var(--rx-radius);color:rgb(var(--rx-text)/.62);text-decoration:none;transition:color var(--rx-duration) var(--rx-ease),transform var(--rx-duration) var(--rx-ease)}
	a:focus-visible{outline:3px solid rgb(var(--rx-color)/.25);outline-offset:2px}a[aria-current=page]{color:rgb(var(--rx-color));font-weight:650}a[aria-disabled=true]{opacity:.4;cursor:not-allowed}
	.rx-link-bar__indicator{position:absolute;inset-block:.3rem;border-radius:var(--rx-radius);background:rgb(var(--rx-color)/.14);box-shadow:0 5px 16px rgb(var(--rx-color)/.14);transition:transform var(--rx-duration) var(--rx-ease),width var(--rx-duration) var(--rx-ease),opacity var(--rx-duration)}
	.rx-link-bar--underline .rx-link-bar__indicator{inset-block:auto .18rem;height:2px}.rx-link-bar--glow .rx-link-bar__indicator{box-shadow:0 0 18px rgb(var(--rx-color)/.5)}.rx-link-bar--pill .rx-link-bar__indicator{background:rgb(var(--rx-color));}.rx-link-bar--pill a[aria-current=page]{color:rgb(var(--rx-light))}
	@media (hover:hover) and (pointer:fine){.rx-link-bar--magnet a:hover{transform:translateY(-2px)}}
	@media (prefers-reduced-motion:reduce),(pointer:coarse){a,.rx-link-bar__indicator{transition:none}.rx-link-bar--magnet a:hover{transform:none}}
</style>
