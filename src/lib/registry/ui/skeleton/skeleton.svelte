<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	export type SkeletonVariant = 'base' | 'pulse' | 'wave' | 'shine' | 'gradient' | 'blink';
	export type SkeletonShape = 'rect' | 'text' | 'title' | 'circle' | 'avatar';
	export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> { variant?: SkeletonVariant; shape?: SkeletonShape; loading?: boolean; duration?: number; index?: number; angle?: number; intensity?: number; glow?: number; direction?: 'ltr' | 'rtl'; children?: Snippet; }
</script>
<script lang="ts">
	import { cn } from '$lib/utils.js';
	let { variant = 'base', shape = 'rect', loading = true, duration = 1400, index = 0, angle = 90, intensity = .45, glow = .3, direction = 'ltr', children, class: className, style, ...rest }: SkeletonProps = $props();
	const inlineStyle=$derived(`--rx-skeleton-duration:${Math.max(100,duration)}ms;--rx-skeleton-index:${index};--rx-skeleton-angle:${angle}deg;--rx-skeleton-intensity:${intensity};--rx-skeleton-glow:${glow};--rx-skeleton-direction:${direction==='rtl'?-1:1};${typeof style==='string'?style:''}`);
</script>
<div {...rest} class={cn('rx-skeleton-wrap', className)} style={inlineStyle} aria-busy={loading}>
	{#if loading}<div class={cn('rx-skeleton', `rx-skeleton--${variant}`, `rx-skeleton--${shape}`)} aria-hidden="true"></div>{:else if children}{@render children()}{/if}
</div>
<style>
	.rx-skeleton-wrap { display: block; }
	.rx-skeleton { position:relative;width:100%;height:5rem;border-radius:var(--rx-radius);background:rgb(var(--rx-gray));overflow:hidden;transform-origin:center }
	.rx-skeleton--text { height: .85rem; border-radius: calc(var(--rx-radius) / 2); }
	.rx-skeleton--title { width: 60%; height: 1.4rem; border-radius: calc(var(--rx-radius) / 2); }
	.rx-skeleton--circle { width: 3rem; height: 3rem; border-radius: 50%; }
	.rx-skeleton--avatar { width: 4rem; height: 4rem; border-radius: 50%; }
	.rx-skeleton--base{-webkit-mask-image:linear-gradient(110deg,#000 15%,rgb(var(--rx-dark)/.15) 50%,#000 85%);mask-image:linear-gradient(110deg,#000 15%,rgb(var(--rx-dark)/.15) 50%,#000 85%);-webkit-mask-size:200% 100%;mask-size:200% 100%;animation:rx-skeleton-mask var(--rx-skeleton-duration) linear infinite}
	.rx-skeleton--pulse{animation:rx-skeleton-pulse var(--rx-skeleton-duration) ease-in-out infinite}.rx-skeleton--pulse::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:0 0 0 2px rgb(var(--rx-light)/calc(var(--rx-skeleton-glow)*.5));opacity:0;animation:rx-skeleton-halo var(--rx-skeleton-duration) ease-in-out infinite}
	.rx-skeleton--wave{animation:rx-skeleton-wave var(--rx-skeleton-duration) ease-in-out infinite;animation-delay:calc(var(--rx-skeleton-index)*90ms)}
	.rx-skeleton--shine::after{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgb(var(--rx-light)/var(--rx-skeleton-intensity)) 50%,transparent 70%);transform:translateX(-120%);animation:rx-skeleton-shine var(--rx-skeleton-duration) ease-in-out infinite}
	.rx-skeleton--gradient{background-image:linear-gradient(var(--rx-skeleton-angle),rgb(var(--rx-gray)),rgb(var(--rx-color,var(--rx-light))) 50%,rgb(var(--rx-gray)));background-size:200% 100%;animation:rx-skeleton-gradient var(--rx-skeleton-duration) linear infinite}
	.rx-skeleton--blink{animation:rx-skeleton-blink var(--rx-skeleton-duration) steps(1,end) infinite;animation-delay:calc(var(--rx-skeleton-index)*90ms)}
	@keyframes rx-skeleton-mask{from{-webkit-mask-position:-100% 0;mask-position:-100% 0}to{-webkit-mask-position:100% 0;mask-position:100% 0}}@keyframes rx-skeleton-pulse{0%,100%{opacity:.55}50%{opacity:1}}@keyframes rx-skeleton-halo{0%,50%,100%{opacity:0}25%,75%{opacity:1}}@keyframes rx-skeleton-wave{0%,100%{opacity:.55;transform:scaleY(.85)}50%{opacity:1;transform:scaleY(1.05)}}@keyframes rx-skeleton-shine{0%{transform:translateX(-120%)}60%,100%{transform:translateX(120%)}}@keyframes rx-skeleton-gradient{from{background-position:calc(200%*var(--rx-skeleton-direction)) 0}to{background-position:calc(-200%*var(--rx-skeleton-direction)) 0}}@keyframes rx-skeleton-blink{0%,49%{opacity:.35}50%,100%{opacity:1}}
	@media (prefers-reduced-motion: reduce) { .rx-skeleton,.rx-skeleton::after { animation:none!important;opacity:.85;transform:none }.rx-skeleton--shine::after,.rx-skeleton--pulse::after{display:none} }
</style>
