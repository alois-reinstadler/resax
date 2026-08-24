<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	export type SkeletonVariant = 'pulse' | 'wave' | 'shine' | 'gradient' | 'blink';
	export type SkeletonShape = 'rect' | 'text' | 'title' | 'circle' | 'avatar';
	export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> { variant?: SkeletonVariant; shape?: SkeletonShape; loading?: boolean; children?: Snippet; }
</script>
<script lang="ts">
	import { cn } from '$lib/utils.js';
	let { variant = 'pulse', shape = 'rect', loading = true, children, class: className, ...rest }: SkeletonProps = $props();
</script>
<div {...rest} class={cn('rx-skeleton-wrap', className)} aria-busy={loading}>
	{#if loading}<div class={cn('rx-skeleton', `rx-skeleton--${variant}`, `rx-skeleton--${shape}`)} aria-hidden="true"></div>{:else if children}{@render children()}{/if}
</div>
<style>
	.rx-skeleton-wrap { display: block; }
	.rx-skeleton { width: 100%; height: 5rem; border-radius: var(--rx-radius); background: rgb(var(--rx-gray)); overflow: hidden; }
	.rx-skeleton--text { height: .85rem; border-radius: calc(var(--rx-radius) / 2); }
	.rx-skeleton--title { width: 60%; height: 1.4rem; border-radius: calc(var(--rx-radius) / 2); }
	.rx-skeleton--circle { width: 3rem; height: 3rem; border-radius: 50%; }
	.rx-skeleton--avatar { width: 4rem; height: 4rem; border-radius: 50%; }
	.rx-skeleton--pulse { animation: rx-pulse 1.5s ease-in-out infinite; }
	.rx-skeleton--wave, .rx-skeleton--shine, .rx-skeleton--gradient { background-image: linear-gradient(100deg, rgb(var(--rx-gray)), rgb(var(--rx-light)), rgb(var(--rx-gray))); background-size: 200% 100%; animation: rx-shimmer 1.6s linear infinite; }
	.rx-skeleton--shine { background-image: linear-gradient(110deg, rgb(var(--rx-gray)) 30%, rgb(var(--rx-background) / .7) 48%, rgb(var(--rx-gray)) 66%); }
	.rx-skeleton--gradient { background-image: linear-gradient(90deg, rgb(var(--rx-gray)), rgb(var(--rx-light)), rgb(var(--rx-gray))); }
	.rx-skeleton--blink { animation: rx-skeleton-blink 1.2s step-end infinite; }
	@keyframes rx-skeleton-blink { 50% { opacity: .35; } }
	@media (prefers-reduced-motion: reduce) { .rx-skeleton { animation: none; } }
</style>
