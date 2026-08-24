<script lang="ts" module>
	import type { NotificationItem } from './notify.svelte';
	export interface NotificationProps { item: NotificationItem; }
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION } from '$lib/registry/lib/easing';
	import { dismissNotification, pauseNotification, resumeNotification } from './notify.svelte';
	let { item }: NotificationProps = $props();
	const side = $derived(item.position.endsWith('left') ? -18 : item.position.endsWith('right') ? 18 : 0);
	const vertical = $derived(item.position.startsWith('top') ? -12 : 12);
	const inlineStyle = $derived(`${styleColor(item.color) ?? '--rx-color: var(--rx-primary)'}; --rx-notify-duration: ${item.duration}ms`);
	function activate(event: MouseEvent) {
		if ((event.target as HTMLElement).closest('.rx-notification__close')) return;
		item.onClick?.();
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (clickable status regions receive keyboard handling below) -->
<article
	class="rx-notification rx-notification--{item.variant}"
	class:rx-notification--clickable={Boolean(item.onClick)}
	style={inlineStyle}
	role={item.color === 'danger' ? 'alert' : 'status'}
	tabindex={item.onClick ? 0 : undefined}
	onclick={activate}
	onkeydown={(event) => { if (item.onClick && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); item.onClick(); } }}
	onpointerenter={() => pauseNotification(item.id)}
	onpointerleave={() => resumeNotification(item.id)}
	transition:fly={{ x: side, y: vertical, duration: RX_DURATION.base }}
>
	{#if item.icon}<span class="rx-notification__icon" aria-hidden="true">{@render item.icon()}</span>{/if}
	<div class="rx-notification__body">
		{#if item.content}{@render item.content()}{:else}{#if item.title}<strong>{item.title}</strong>{/if}{#if item.text}<p>{item.text}</p>{/if}{/if}
	</div>
	{#if item.closable}<button class="rx-notification__close" type="button" aria-label="Close notification" onclick={(event) => { event.stopPropagation(); dismissNotification(item.id); }}>×</button>{/if}
	{#if item.progress && item.duration > 0}<span class="rx-notification__progress" class:rx-notification__progress--paused={item.paused} aria-hidden="true"></span>{/if}
</article>

<style>
	.rx-notification { position: relative; display: flex; align-items: flex-start; gap: .75rem; box-sizing: border-box; width: min(24rem, calc(100vw - 2rem)); overflow: hidden; padding: 1rem 1.1rem; border: 1px solid rgb(var(--rx-color) / .22); border-radius: var(--rx-radius); color: rgb(var(--rx-dark)); background: rgb(var(--rx-light)); box-shadow: 0 12px 30px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); pointer-events: auto; }
	.rx-notification--clickable { cursor: pointer; }
	.rx-notification--clickable:focus-visible { outline: 3px solid rgb(var(--rx-color) / .3); outline-offset: 2px; }
	.rx-notification__icon { display: inline-flex; flex: none; color: rgb(var(--rx-color)); }
	.rx-notification__body { min-width: 0; flex: 1; }
	.rx-notification__body strong { display: block; color: rgb(var(--rx-color)); }
	.rx-notification__body p { margin: .18rem 0 0; line-height: 1.42; }
	.rx-notification__close { flex: none; width: 1.6rem; height: 1.6rem; padding: 0; border: 0; border-radius: 999px; color: rgb(var(--rx-dark) / .65); background: transparent; cursor: pointer; font-size: 1.25rem; line-height: 1; }
	.rx-notification__close:hover { color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .12); }
	.rx-notification--banner { width: min(36rem, calc(100vw - 2rem)); border-radius: 0; border-inline: 4px solid rgb(var(--rx-color)); }
	.rx-notification--card { border: 0; border-top: 4px solid rgb(var(--rx-color)); box-shadow: 0 18px 40px rgb(var(--rx-dark) / .2); }
	.rx-notification--glow { border-color: rgb(var(--rx-color) / .72); box-shadow: 0 0 24px rgb(var(--rx-color) / .38), inset 0 0 18px rgb(var(--rx-color) / .08); }
	.rx-notification--inline { width: auto; max-width: calc(100vw - 2rem); padding: .65rem .85rem; align-items: center; }
	.rx-notification--inline .rx-notification__body { display: flex; gap: .4rem; align-items: baseline; }
	.rx-notification--inline .rx-notification__body p { margin: 0; }
	.rx-notification--snackbar { border: 0; border-radius: calc(var(--rx-radius) * .7); color: rgb(var(--rx-light)); background: rgb(var(--rx-dark)); }
	.rx-notification--snackbar .rx-notification__close { color: rgb(var(--rx-light) / .72); }
	.rx-notification__progress { position: absolute; inset: auto 0 0; height: 3px; background: rgb(var(--rx-color)); transform-origin: left; animation: rx-notification-countdown var(--rx-notify-duration) linear forwards; }
	.rx-notification__progress--paused { animation-play-state: paused; }
	@keyframes rx-notification-countdown { to { transform: scaleX(0); } }
	@media (prefers-color-scheme: dark) { .rx-notification { color: rgb(var(--rx-light)); background: hsl(from rgb(var(--rx-dark)) h s calc(l + 9)); } .rx-notification__close { color: rgb(var(--rx-light) / .65); } }
	@media (prefers-reduced-motion: reduce) { .rx-notification { transition: none; } .rx-notification__progress { animation-timing-function: steps(1, end); } }
</style>
