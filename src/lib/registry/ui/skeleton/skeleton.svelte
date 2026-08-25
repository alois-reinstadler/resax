<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type SkeletonVariant = 'base' | 'pulse' | 'wave' | 'shine' | 'gradient' | 'blink';
	export type SkeletonShape = 'rect' | 'text' | 'title' | 'circle' | 'avatar' | 'card';
	export type SkeletonSpeed = 'slow' | 'normal' | 'fast';
	export type SkeletonAnimation = 'shimmer' | 'pulse' | 'both';

	export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
		variant?: SkeletonVariant;
		shape?: SkeletonShape;
		loading?: boolean;
		count?: number;
		width?: string | number;
		height?: string | number;
		radius?: string | number;
		speed?: SkeletonSpeed;
		animation?: SkeletonAnimation;
		duration?: number;
		index?: number;
		stagger?: number;
		angle?: number;
		intensity?: number;
		glow?: number;
		direction?: 'ltr' | 'rtl';
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		variant = 'base',
		shape = 'text',
		loading = true,
		count = 3,
		width,
		height,
		radius,
		speed = 'normal',
		animation = 'shimmer',
		duration,
		index = 0,
		stagger,
		angle = 100,
		intensity = .5,
		glow = .35,
		direction = 'ltr',
		children,
		class: className,
		style,
		...rest
	}: SkeletonProps = $props();

	function cssLength(value: string | number | undefined) {
		if (value === undefined || value === '') return undefined;
		return typeof value === 'number' ? `${value}px` : value;
	}

	const lineCount = $derived(Math.max(1, Math.trunc(Number.isFinite(count) ? count : 1)));
	const startIndex = $derived(Math.max(0, Math.trunc(Number.isFinite(index) ? index : 0)));
	const effectiveStagger = $derived(Math.max(0, stagger ?? (variant === 'blink' ? 160 : 120)));
	const inlineStyle = $derived([
		width === undefined ? '' : `--rx-skeleton-width:${cssLength(width)}`,
		height === undefined ? '' : `--rx-skeleton-height:${cssLength(height)}`,
		radius === undefined ? '' : `--rx-skeleton-radius:${cssLength(radius)}`,
		duration === undefined ? '' : `--rx-skeleton-duration:${Math.max(100, duration)}ms`,
		`--rx-skeleton-index:${startIndex}`,
		`--rx-skeleton-stagger:${effectiveStagger}ms`,
		`--rx-skeleton-angle:${angle}deg`,
		`--rx-skeleton-intensity:${Math.min(1, Math.max(0, intensity))}`,
		`--rx-skeleton-glow:${Math.min(1, Math.max(0, glow))}`,
		`--rx-skeleton-direction:${direction === 'rtl' ? -1 : 1}`,
		typeof style === 'string' ? style : ''
	].filter(Boolean).join(';'));
</script>

<div {...rest} class={cn('rx-skeleton-wrap', className)} style={inlineStyle} aria-busy={loading}>
	{#if loading}
		<div
			class={cn('rx-skeleton', `rx-skeleton--${variant}`, `rx-skeleton--${shape}`, `rx-skeleton--speed-${speed}`, variant === 'base' && `rx-skeleton--animation-${animation}`)}
			role="status"
			aria-busy="true"
			aria-label="Loading"
		>
			{#if shape === 'card'}
				<span class="rx-skeleton__bone rx-skeleton__bone--avatar" style={`--i:${startIndex}`} aria-hidden="true"></span>
				<span class="rx-skeleton__stack" aria-hidden="true">
					<span class="rx-skeleton__bone rx-skeleton__bone--line" style={`--w:60%;--i:${startIndex + 1}`}></span>
					<span class="rx-skeleton__bone rx-skeleton__bone--line" style={`--w:90%;--i:${startIndex + 2}`}></span>
					<span class="rx-skeleton__bone rx-skeleton__bone--line" style={`--w:75%;--i:${startIndex + 3}`}></span>
				</span>
			{:else if shape === 'text'}
				{#each Array.from({ length: lineCount }) as _, lineIndex}
					<span
						class="rx-skeleton__bone rx-skeleton__bone--line"
						style={`--i:${startIndex + lineIndex};${lineIndex === lineCount - 1 && lineCount > 1 ? '--w:65%;' : ''}`}
						aria-hidden="true"
					></span>
				{/each}
			{:else}
				<span class="rx-skeleton__bone rx-skeleton__bone--solid" style={`--i:${startIndex}`} aria-hidden="true"></span>
			{/if}
		</div>
	{:else if children}
		{@render children()}
	{/if}
</div>

<style>
	.rx-skeleton-wrap { display: block; }
	.rx-skeleton {
		--w: var(--rx-skeleton-width, 100%);
		--h: var(--rx-skeleton-height, 14px);
		--r: var(--rx-skeleton-radius, var(--rx-control-r-sm, 6px));
		--dur: var(--rx-skeleton-duration, var(--rx-skeleton-speed-duration, 1.4s));
		--rx-skeleton-tilt: -20px;
		display: flex;
		width: 100%;
		min-width: 240px;
		flex-direction: column;
		gap: 10px;
		container-type: inline-size;
	}
	.rx-skeleton__bone {
		position: relative;
		display: block;
		width: var(--w);
		height: var(--h);
		overflow: hidden;
		border-radius: var(--r);
		background: rgb(var(--rx-color, var(--rx-gray-4)));
		transform-origin: center;
	}
	.rx-skeleton--base .rx-skeleton__bone { background: rgb(var(--rx-color, var(--rx-text)) / .1); }
	.rx-skeleton--speed-slow { --rx-skeleton-speed-duration: 2.1s; }
	.rx-skeleton--speed-normal { --rx-skeleton-speed-duration: 1.4s; }
	.rx-skeleton--speed-fast { --rx-skeleton-speed-duration: .9s; }

	.rx-skeleton--rect { --h: var(--rx-skeleton-height, 120px); --r: var(--rx-skeleton-radius, var(--rx-control-r-md, 10px)); gap: 0; }
	.rx-skeleton--title { --w: var(--rx-skeleton-width, 60%); --h: var(--rx-skeleton-height, 1.4rem); }
	.rx-skeleton--circle, .rx-skeleton--avatar { gap: 0; }
	.rx-skeleton--circle .rx-skeleton__bone--solid,
	.rx-skeleton--avatar .rx-skeleton__bone--solid { --w: var(--rx-skeleton-width, 48px); --h: var(--rx-skeleton-height, 48px); --r: var(--rx-skeleton-radius, 999px); }
	.rx-skeleton--card { flex-direction: row; align-items: flex-start; gap: 14px; }
	.rx-skeleton__bone--avatar { width: 48px; height: 48px; flex: 0 0 auto; border-radius: 999px; }
	.rx-skeleton__stack { display: flex; flex: 1 1 auto; flex-direction: column; gap: 10px; }
	.rx-skeleton--card .rx-skeleton__stack .rx-skeleton__bone { --ox: -62px; }

	.rx-skeleton--animation-shimmer .rx-skeleton__bone,
	.rx-skeleton--animation-both .rx-skeleton__bone {
		-webkit-mask-image: linear-gradient(110deg, rgb(0 0 0 / 1) 15%, rgb(0 0 0 / .15) 50%, rgb(0 0 0 / 1) 85%);
		mask-image: linear-gradient(110deg, rgb(0 0 0 / 1) 15%, rgb(0 0 0 / .15) 50%, rgb(0 0 0 / 1) 85%);
		-webkit-mask-size: 100cqw 100%;
		mask-size: 100cqw 100%;
		-webkit-mask-repeat: repeat;
		mask-repeat: repeat;
	}
	.rx-skeleton--animation-shimmer .rx-skeleton__bone { animation: rx-skeleton-mask var(--dur) linear infinite; }
	.rx-skeleton--animation-pulse .rx-skeleton__bone { animation: rx-skeleton-base-pulse var(--dur) ease-in-out infinite; }
	.rx-skeleton--animation-both .rx-skeleton__bone { animation: rx-skeleton-mask var(--dur) linear infinite, rx-skeleton-base-pulse var(--dur) ease-in-out infinite; }
	@keyframes rx-skeleton-mask {
		from { -webkit-mask-position: calc(var(--ox, 0px) + var(--i, 0) * var(--rx-skeleton-tilt)) 0; mask-position: calc(var(--ox, 0px) + var(--i, 0) * var(--rx-skeleton-tilt)) 0; }
		to { -webkit-mask-position: calc(var(--ox, 0px) + var(--i, 0) * var(--rx-skeleton-tilt) + 100cqw) 0; mask-position: calc(var(--ox, 0px) + var(--i, 0) * var(--rx-skeleton-tilt) + 100cqw) 0; }
	}
	@keyframes rx-skeleton-base-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .45; } }

	.rx-skeleton--pulse .rx-skeleton__bone { animation: rx-skeleton-pulse var(--dur) ease-in-out infinite; }
	.rx-skeleton--pulse .rx-skeleton__bone::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: 0 0 0 2px rgb(var(--rx-fixed-light) / calc(var(--rx-skeleton-glow) * .5));
		opacity: 0;
		pointer-events: none;
		animation: rx-skeleton-halo var(--dur) ease-in-out infinite;
	}
	.rx-skeleton--wave .rx-skeleton__bone { animation: rx-skeleton-wave var(--dur) ease-in-out infinite; animation-delay: calc(var(--i, 0) * var(--rx-skeleton-stagger)); }
	.rx-skeleton--shine .rx-skeleton__bone::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(115deg, transparent 30%, rgb(var(--rx-fixed-light) / var(--rx-skeleton-intensity)) 50%, transparent 70%);
		transform: translateX(-120%);
		animation: rx-skeleton-shine var(--dur) ease-in-out infinite;
	}
	.rx-skeleton--gradient .rx-skeleton__bone {
		background: linear-gradient(var(--rx-skeleton-angle), rgb(var(--rx-surface)) 0%, rgb(var(--rx-color, var(--rx-gray-4))) 50%, rgb(var(--rx-surface)) 100%);
		background-size: 200% 100%;
		background-position: 0 0;
		animation: rx-skeleton-gradient var(--dur) linear infinite;
	}
	.rx-skeleton--blink .rx-skeleton__bone { animation: rx-skeleton-blink var(--dur) steps(1, end) infinite; animation-delay: calc(var(--i, 0) * var(--rx-skeleton-stagger)); }
	@keyframes rx-skeleton-pulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
	@keyframes rx-skeleton-halo { 0%, 50%, 100% { opacity: 0; } 25%, 75% { opacity: 1; } }
	@keyframes rx-skeleton-wave { 0%, 100% { opacity: .55; transform: scaleY(.85); } 50% { opacity: 1; transform: scaleY(1.05); } }
	@keyframes rx-skeleton-shine { 0% { transform: translateX(-120%); } 60%, 100% { transform: translateX(120%); } }
	@keyframes rx-skeleton-gradient { from { background-position: calc(200% * var(--rx-skeleton-direction)) 0; } to { background-position: calc(-200% * var(--rx-skeleton-direction)) 0; } }
	@keyframes rx-skeleton-blink { 0%, 49% { opacity: .35; } 50%, 100% { opacity: 1; } }

	@media (prefers-reduced-motion: reduce) {
		.rx-skeleton--base .rx-skeleton__bone { animation-duration: 3s; }
		.rx-skeleton--pulse .rx-skeleton__bone,
		.rx-skeleton--wave .rx-skeleton__bone,
		.rx-skeleton--shine .rx-skeleton__bone,
		.rx-skeleton--gradient .rx-skeleton__bone,
		.rx-skeleton--blink .rx-skeleton__bone,
		.rx-skeleton--pulse .rx-skeleton__bone::after,
		.rx-skeleton--shine .rx-skeleton__bone::after { animation: none !important; opacity: .85; transform: none; }
		.rx-skeleton--pulse .rx-skeleton__bone::after,
		.rx-skeleton--shine .rx-skeleton__bone::after { display: none; }
	}
</style>
