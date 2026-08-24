<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
		value?: number;
		max?: number;
		variant?: 'default' | 'glow' | 'gradient' | 'striped' | 'segments';
		shape?: 'line' | 'circle';
		segments?: number;
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: Snippet | boolean;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';
	import { progressVariants } from './index';

	let { value, max = 100, variant = 'default', shape = 'line', segments = 5, color,
		size = 'default', label = false, class: className, style, ...restProps }: ProgressProps = $props();

	const safeMax = $derived(Math.max(0, max));
	const clampedValue = $derived(value === undefined ? undefined : Math.min(safeMax, Math.max(0, value)));
	const percent = $derived(clampedValue === undefined || safeMax === 0 ? 0 : (clampedValue / safeMax) * 100);
	const segmentCount = $derived(Math.max(1, Math.floor(segments)));
	const filledSegments = $derived(Math.round((percent / 100) * segmentCount));
	const radius = 42;
	const circumference = 2 * Math.PI * radius;
	const gradientId = $props.id();
	const classes = $derived(progressVariants({ variant, shape, size, indeterminate: value === undefined,
		class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; --rx-progress: ${percent}%; --rx-segment-count: ${segmentCount}; ${typeof style === 'string' ? style : ''}`);
</script>

<div {...restProps} class={classes} style={inlineStyle} role="progressbar" aria-valuemin="0"
	aria-valuemax={safeMax} aria-valuenow={clampedValue}>
	{#if shape === 'circle'}
		<svg class="rx-progress__ring" viewBox="0 0 100 100" aria-hidden="true">
			<defs><linearGradient id={gradientId}><stop stop-color="rgb(var(--rx-color))"></stop><stop offset="1" stop-color="hsl(from rgb(var(--rx-color)) calc(h + 32) s l)"></stop></linearGradient></defs>
			<circle class="rx-progress__circle-track" cx="50" cy="50" r={radius}></circle>
			<circle class="rx-progress__circle-fill" cx="50" cy="50" r={radius} style:stroke={variant === 'gradient' ? `url(#${gradientId})` : undefined}
				stroke-dasharray={circumference} stroke-dashoffset={circumference * (1 - percent / 100)}></circle>
		</svg>
		{#if label}<span class="rx-progress__circle-label">{#if typeof label === 'boolean'}{Math.round(percent)}%{:else}{@render label()}{/if}</span>{/if}
	{:else if variant === 'segments'}
		<div class="rx-progress__segments" aria-hidden="true">
			{#each Array(segmentCount) as _, index}<span class:rx-progress__segment--filled={index < filledSegments}></span>{/each}
		</div>
		{#if label}<span class="rx-progress__line-label">{#if typeof label === 'boolean'}{Math.round(percent)}%{:else}{@render label()}{/if}</span>{/if}
	{:else}
		<span class="rx-progress__fill" aria-hidden="true"></span>
		{#if label}<span class="rx-progress__line-label">{#if typeof label === 'boolean'}{Math.round(percent)}%{:else}{@render label()}{/if}</span>{/if}
	{/if}
</div>

<style>
	.rx-progress { position: relative; box-sizing: border-box; color: rgb(var(--rx-color)); }
	.rx-progress--line { --rx-progress-height: .6rem; width: 100%; height: var(--rx-progress-height); border-radius: 9999px; background: rgb(var(--rx-color) / .16); overflow: hidden; }
	.rx-progress--line.rx-progress--lg { --rx-progress-height: .9rem; }
	.rx-progress--line.rx-progress--sm { --rx-progress-height: .35rem; }
	.rx-progress__fill { display: block; width: var(--rx-progress); height: 100%; border-radius: inherit; background: rgb(var(--rx-color)); transition: width var(--rx-duration) var(--rx-ease); }
	.rx-progress--glow .rx-progress__fill, .rx-progress--circle.rx-progress--glow .rx-progress__circle-fill { filter: drop-shadow(0 0 5px rgb(var(--rx-color) / .65)); }
	.rx-progress--gradient .rx-progress__fill { background: linear-gradient(90deg, rgb(var(--rx-color)), hsl(from rgb(var(--rx-color)) calc(h + 32) s l)); }
	.rx-progress--striped .rx-progress__fill { background-color: rgb(var(--rx-color)); background-image: linear-gradient(45deg, rgb(var(--rx-light) / .24) 25%, transparent 25%, transparent 50%, rgb(var(--rx-light) / .24) 50%, rgb(var(--rx-light) / .24) 75%, transparent 75%); background-size: 1rem 1rem; animation: rx-progress-stripes .8s linear infinite; }
	.rx-progress--indeterminate .rx-progress__fill { width: 38%; animation: rx-progress-sweep 1.4s var(--rx-ease) infinite; }
	.rx-progress__segments { display: grid; gap: .25rem; width: 100%; height: 100%; }
	.rx-progress__segments span { border-radius: 9999px; background: rgb(var(--rx-color) / .16); }
	.rx-progress__segments .rx-progress__segment--filled { background: rgb(var(--rx-color)); }
	.rx-progress--segments .rx-progress__segments { grid-template-columns: repeat(var(--rx-segment-count, 5), 1fr); }
	.rx-progress--circle { --rx-ring-size: 7rem; display: inline-grid; place-items: center; width: var(--rx-ring-size); aspect-ratio: 1; }
	.rx-progress--circle.rx-progress--lg { --rx-ring-size: 9rem; }
	.rx-progress--circle.rx-progress--sm { --rx-ring-size: 5rem; }
	.rx-progress__ring { width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
	.rx-progress__ring circle { fill: none; stroke-width: 8; }
	.rx-progress--lg .rx-progress__ring circle { stroke-width: 9; } .rx-progress--sm .rx-progress__ring circle { stroke-width: 6; }
	.rx-progress__circle-track { stroke: rgb(var(--rx-color) / .16); }
	.rx-progress__circle-fill { stroke: rgb(var(--rx-color)); stroke-linecap: round; transition: stroke-dashoffset var(--rx-duration) var(--rx-ease); }
	.rx-progress--circle.rx-progress--indeterminate .rx-progress__circle-fill { stroke-dashoffset: calc(264 * .62); animation: rx-progress-ring 1.3s linear infinite; transform-origin: center; }
	.rx-progress__circle-label { position: absolute; font-weight: 700; color: rgb(var(--rx-text)); }
	.rx-progress__line-label { position: absolute; inset: 0; display: grid; place-items: center; font-size: .65rem; font-weight: 700; color: rgb(var(--rx-text)); }
	@keyframes rx-progress-stripes { to { background-position: 1rem 0; } }
	@keyframes rx-progress-sweep { from { transform: translateX(-105%); } to { transform: translateX(275%); } }
	@keyframes rx-progress-ring { to { transform: rotate(1turn); } }
	@media (prefers-reduced-motion: reduce) { .rx-progress__fill, .rx-progress__circle-fill { transition: none; animation: none !important; } .rx-progress--indeterminate .rx-progress__fill { width: 38%; transform: translateX(80%); } }
</style>
