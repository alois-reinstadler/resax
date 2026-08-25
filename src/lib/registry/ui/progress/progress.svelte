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
		animationDuration?: number;
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: Snippet | boolean;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { progressVariants } from './index';

	let { value, max = 100, variant = 'default', shape = 'line', segments = 5, animationDuration, color,
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
	const accessibleName = $derived(restProps['aria-label'] ?? (restProps['aria-labelledby'] ? undefined : 'Progress'));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${animationDuration ?? 350}ms; --rx-ease: cubic-bezier(.4,0,.2,1); --rx-progress: ${percent / 100}; --rx-segment-count: ${segmentCount}; ${typeof style === 'string' ? style : ''}`);
</script>

<div {...restProps} class={classes} class:rx-progress--labelled={Boolean(label)} style={inlineStyle} role="progressbar" aria-label={accessibleName} aria-valuemin="0"
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
			{#each Array(segmentCount) as _, index}<span style={`--rx-index:${index}`} class:rx-progress__segment--filled={index < filledSegments}></span>{/each}
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
	.rx-progress__fill { position:relative;display:block;width:100%;height:100%;border-radius:inherit;background:rgb(var(--rx-color));transform-origin:left center;transform:scaleX(var(--rx-progress));transition:transform var(--rx-duration) var(--rx-ease);will-change:transform }
	.rx-progress--glow .rx-progress__fill{box-shadow:0 0 8px 1px rgb(var(--rx-color)/.55);animation:rx-progress-glow 1.8s ease-in-out infinite}.rx-progress--circle.rx-progress--glow .rx-progress__circle-fill { filter:drop-shadow(0 0 5px rgb(var(--rx-color)/.65));animation:rx-progress-glow-ring 1.8s ease-in-out infinite}.rx-progress--glow .rx-progress__fill::after{content:'';position:absolute;inset:0;width:36%;background:linear-gradient(90deg,transparent,rgb(var(--rx-light)/.7),transparent);animation:rx-progress-spark 2.2s cubic-bezier(.22,1,.36,1) infinite}
	.rx-progress--gradient .rx-progress__fill { background:linear-gradient(90deg,rgb(var(--rx-color)),hsl(from rgb(var(--rx-color)) calc(h + 32) s l),rgb(var(--rx-color)));background-size:200% 100%;animation:rx-progress-gradient 2.2s linear infinite }
	.rx-progress--striped .rx-progress__fill { background-color:rgb(var(--rx-color));background-image:repeating-linear-gradient(45deg,rgb(var(--rx-light)/.24) 0 6px,transparent 6px 12px);background-size:34px 34px;animation:rx-progress-stripes 1s linear infinite }
	.rx-progress--indeterminate .rx-progress__fill { width:38%;transform:translateX(-100%);animation:rx-progress-sweep 1.4s cubic-bezier(.65,.05,.36,1) infinite }
	.rx-progress__segments { display: grid; gap: .25rem; width: 100%; height: 100%; }
	.rx-progress__segments span { border-radius: 9999px; background: rgb(var(--rx-color) / .16); }
	.rx-progress__segments span{transform:scaleX(0);transform-origin:left;transition:transform 250ms cubic-bezier(.4,0,.2,1),background-color 250ms}.rx-progress__segments .rx-progress__segment--filled { background: rgb(var(--rx-color));box-shadow:0 0 6px rgb(var(--rx-color)/.55);transform:scaleX(1) }.rx-progress--segments.rx-progress--indeterminate .rx-progress__segments span{animation:rx-progress-segment-chase 1.2s ease-in-out infinite;animation-delay:calc(var(--rx-index,0)*100ms)}
	.rx-progress--segments .rx-progress__segments { grid-template-columns: repeat(var(--rx-segment-count, 5), 1fr); }
	.rx-progress--circle { --rx-ring-size: 7rem; display: inline-grid; place-items: center; width: var(--rx-ring-size); aspect-ratio: 1; }
	.rx-progress--circle.rx-progress--lg { --rx-ring-size: 9rem; }
	.rx-progress--circle.rx-progress--sm { --rx-ring-size: 5rem; }
	.rx-progress__ring { width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
	.rx-progress__ring circle { fill: none; stroke-width: 8; }
	.rx-progress--lg .rx-progress__ring circle { stroke-width: 9; } .rx-progress--sm .rx-progress__ring circle { stroke-width: 6; }
	.rx-progress__circle-track { stroke: rgb(var(--rx-color) / .16); }
	.rx-progress__circle-fill { stroke: rgb(var(--rx-color)); stroke-linecap: round; transition: stroke-dashoffset var(--rx-duration) var(--rx-ease); }
	.rx-progress--circle.rx-progress--indeterminate .rx-progress__circle-fill { stroke-dashoffset: calc(264 * .62); animation: rx-progress-ring 1s linear infinite; transform-origin: center; }
	.rx-progress__circle-label { position: absolute; font-weight: 700; color: rgb(var(--rx-text)); }
	.rx-progress--line.rx-progress--labelled { overflow: visible; }
	.rx-progress__line-label { position: absolute; top: 50%; left: 50%; z-index: 2; display: grid; place-items: center; width: max-content; min-height: 1.2rem; padding: 0 .28rem; transform: translate(-50%, -50%); border-radius: 999px; color: rgb(var(--rx-text)); background: rgb(var(--rx-background)); box-shadow: 0 0 0 1px rgb(var(--rx-text) / .08); font-size: .65rem; font-weight: 700; }
	@keyframes rx-progress-stripes { to { background-position:34px 0 } }@keyframes rx-progress-gradient{to{background-position:200% 0}}@keyframes rx-progress-glow{50%{filter:brightness(1.25)}}@keyframes rx-progress-glow-ring{50%{filter:brightness(1.25) drop-shadow(0 0 5px rgb(var(--rx-color)/.65))}}@keyframes rx-progress-spark{from{transform:translateX(-120%)}to{transform:translateX(320%)}}
	@keyframes rx-progress-sweep { from { transform: translateX(-100%); } to { transform: translateX(250%); } }@keyframes rx-progress-segment-chase{0%,100%{transform:scaleX(0);opacity:.3}50%{transform:scaleX(1);opacity:1}}
	@keyframes rx-progress-ring { to { transform: rotate(270deg); } }
	@media (prefers-reduced-motion: reduce) { .rx-progress__fill,.rx-progress__fill::after,.rx-progress__segments span,.rx-progress__circle-fill { transition:none;animation:none!important }.rx-progress--indeterminate .rx-progress__fill { width:38%;transform:translateX(80%) }.rx-progress--segments.rx-progress--indeterminate .rx-progress__segments span:nth-child(odd){transform:scaleX(1)} }
</style>
