<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '../../lib/color.js';

	export type SpinnerType = 'default' | 'waves' | 'corners' | 'border' | 'points' | 'square' | 'gradient' | 'rectangle' | 'circles' | 'scale';
	export type SpinnerSize = 'xl' | 'lg' | 'default' | 'sm' | 'mini';
	export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
		type?: SpinnerType;
		color?: RxColor;
		size?: SpinnerSize;
		text?: Snippet;
	}

	export const spinnerSizeClass: Record<SpinnerSize, string> = {
		xl: 'rx-spinner--xl', lg: 'rx-spinner--lg', default: 'rx-spinner--default', sm: 'rx-spinner--sm', mini: 'rx-spinner--mini'
	};
</script>

<script lang="ts">
	import { styleColor } from '../../lib/color.js';
	import { cn } from '../../../utils.js';
	let { type = 'default', color = 'primary', size = 'default', text, class: className, style, ...rest }: SpinnerProps = $props();
	const colorStyle = $derived([styleColor(color), typeof style === 'string' ? style : undefined].filter(Boolean).join('; '));
	const pieces = $derived(type === 'waves' ? 5 : type === 'corners' ? 4 : type === 'points' ? 3 : type === 'rectangle' ? 5 : type === 'circles' ? 3 : type === 'scale' ? 3 : 1);
</script>

<div {...rest} class={cn('rx-spinner', `rx-spinner--${type}`, spinnerSizeClass[size], className)} style={colorStyle} role="status">
	<div class="rx-spinner__visual" aria-hidden="true">
		{#each Array(pieces) as _, index}<i style={`--rx-index: ${index}`}></i>{/each}
	</div>
	{#if text}<div class="rx-spinner__text">{@render text()}</div>{:else}<span class="rx-sr-only">Loading</span>{/if}
</div>

<style>
	.rx-spinner { --rx-spinner-size: 32px; display: inline-flex; flex-direction: column; align-items: center; gap: .5rem; color: rgb(var(--rx-color)); }
	.rx-spinner--xl { --rx-spinner-size: 64px; } .rx-spinner--lg { --rx-spinner-size: 48px; } .rx-spinner--sm { --rx-spinner-size: 24px; } .rx-spinner--mini { --rx-spinner-size: 16px; }
	.rx-spinner__visual { position: relative; width: var(--rx-spinner-size); height: var(--rx-spinner-size); }
	i { position: absolute; display: block; box-sizing: border-box; background: currentColor; }
	.rx-spinner--default i, .rx-spinner--border i { inset: 0; border: calc(var(--rx-spinner-size) / 9) solid rgb(var(--rx-color) / .22); border-top-color: currentColor; border-radius: 50%; background: transparent; animation: rx-spinner-spin .8s linear infinite; }
	.rx-spinner--border i { border-right-color: currentColor; }
	.rx-spinner--waves .rx-spinner__visual { display: flex; align-items: center; justify-content: space-between; }
	.rx-spinner--waves i { position: static; width: 12%; height: 65%; border-radius: var(--rx-radius); animation: rx-spinner-wave 1s ease-in-out infinite; animation-delay: calc(var(--rx-index) * .1s); }
	.rx-spinner--corners i { width: 30%; height: 30%; border-radius: 30%; animation: rx-spinner-corner 1.2s ease-in-out infinite; animation-delay: calc(var(--rx-index) * .15s); }
	.rx-spinner--corners i:nth-child(2) { right: 0; } .rx-spinner--corners i:nth-child(3) { right: 0; bottom: 0; } .rx-spinner--corners i:nth-child(4) { bottom: 0; }
	.rx-spinner--points .rx-spinner__visual, .rx-spinner--scale .rx-spinner__visual { display: flex; align-items: center; justify-content: space-around; }
	.rx-spinner--points i, .rx-spinner--scale i { position: static; width: 24%; aspect-ratio: 1; border-radius: 50%; animation: rx-spinner-point .8s ease-in-out infinite alternate; animation-delay: calc(var(--rx-index) * .15s); }
	.rx-spinner--square i { inset: 15%; border-radius: 18%; animation: rx-spinner-square 1s ease-in-out infinite; }
	.rx-spinner--gradient i { inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, rgb(var(--rx-color) / 0), rgb(var(--rx-color))); animation: rx-spinner-spin .8s linear infinite; mask: radial-gradient(farthest-side, transparent 62%, rgb(var(--rx-dark)) 64%); }
	.rx-spinner--rectangle .rx-spinner__visual { display: flex; align-items: flex-end; justify-content: space-between; }
	.rx-spinner--rectangle i { position: static; width: 14%; height: 100%; animation: rx-spinner-rect 1s ease-in-out infinite; animation-delay: calc(var(--rx-index) * .1s); }
	.rx-spinner--circles i { inset: calc(var(--rx-index) * 14%); border: max(2px, calc(var(--rx-spinner-size) / 16)) solid currentColor; border-right-color: transparent; border-radius: 50%; background: transparent; animation: rx-spinner-spin 1s linear infinite; animation-direction: alternate; }
	.rx-spinner--scale i { border-radius: 12%; animation-name: rx-spinner-scale; }
	.rx-spinner__text { font-size: .875rem; } .rx-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
	@keyframes rx-spinner-spin { to { transform: rotate(360deg); } }
	@keyframes rx-spinner-wave { 0%,100% { transform: scaleY(.45); opacity: .45; } 50% { transform: scaleY(1); opacity: 1; } }
	@keyframes rx-spinner-corner { 50% { transform: scale(.25) rotate(90deg); opacity: .35; } }
	@keyframes rx-spinner-point { to { transform: translateY(-45%); opacity: .35; } }
	@keyframes rx-spinner-square { 50% { transform: rotate(90deg) scale(.55); border-radius: 50%; } }
	@keyframes rx-spinner-rect { 0%,100% { transform: scaleY(.25); opacity: .4; } 50% { transform: scaleY(1); } }
	@keyframes rx-spinner-scale { 0%,100% { transform: scale(.4); opacity: .35; } 50% { transform: scale(1); opacity: 1; } }
	@media (prefers-reduced-motion: reduce) { i { animation: none !important; } }
</style>
