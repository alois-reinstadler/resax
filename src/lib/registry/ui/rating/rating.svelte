<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	export type RatingVariant = 'base' | 'bars' | 'emoji' | 'glow' | 'hearts' | 'numbers';
	export interface RatingProps {
		value?: number; max?: number; halves?: boolean; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		variant?: RatingVariant; readonly?: boolean; disabled?: boolean; clearable?: boolean; showValue?: boolean;
		grayscale?: boolean; flat?: boolean; intensity?: 'low' | 'high'; beat?: 'soft' | 'strong'; shape?: 'square' | 'circle';
		icon?: 'star' | 'heart' | 'circle' | Snippet<[{ filled: boolean; half: boolean }]>;
		onValueChange?: (value: number) => void; onHover?: (value: number | null) => void;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	let {
		value = $bindable(0), max = 5, halves = false, color = 'warn', size = 'default', variant = 'base',
		readonly = false, disabled = false, clearable = false, showValue = false, grayscale = true, flat = false,
		intensity = 'high', beat = 'soft', shape = 'square', icon = 'star', onValueChange, onHover
	}: RatingProps = $props();
	let preview = $state<number | null>(null);
	let root: HTMLDivElement;
	let animated = $state(-1);
	let rippleId = $state(0);
	let ripples = $state<Array<{ id: number; index: number; x: number; y: number; size: number }>>([]);
	const shown = $derived(preview ?? value);
	const inlineStyle = $derived(styleColor(color) ?? '--rx-color: var(--rx-warn)');
	const interactive = $derived(!readonly && !disabled);
	const faces = ['😖', '🙁', '😐', '🙂', '😍', '🤩', '🥳', '😻', '🔥', '💯'];
	const starPath = 'm12 2.5 2.9 5.87 6.48.94-4.69 4.57 1.11 6.45L12 17.28l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.94z';
	const heartPath = 'M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z';
	const sourceHeartPath = 'M16.44 3.09961C14.63 3.09961 13.01 3.97961 12 5.32961C10.99 3.97961 9.37 3.09961 7.56 3.09961C4.49 3.09961 2 5.59961 2 8.68961C2 9.87961 2.19 10.9796 2.52 11.9996C4.1 16.9996 8.97 19.9896 11.38 20.8096C11.72 20.9296 12.28 20.9296 12.62 20.8096C15.03 19.9896 19.9 16.9996 21.48 11.9996C21.81 10.9796 22 9.87961 22 8.68961C22 5.59961 19.51 3.09961 16.44 3.09961Z';
	const circlePath = 'M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z';
	const iconPath = $derived(variant === 'hearts' ? heartPath : icon === 'heart' ? sourceHeartPath : icon === 'circle' ? circlePath : starPath);

	function normalized(next: number) { const unit = halves && variant !== 'emoji' && variant !== 'numbers' ? .5 : 1; return Math.max(0, Math.min(max, Math.round(next / unit) * unit)); }
	function fillAt(index: number) { return Math.max(0, Math.min(1, shown - index)); }
	function itemValue(event: MouseEvent | PointerEvent, index: number) {
		if (!halves || variant === 'emoji' || variant === 'numbers') return index + 1;
		const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
		return index + ((event.clientX - box.left) < box.width / 2 ? .5 : 1);
	}
	function select(next: number, index: number) {
		if (!interactive) return;
		next = normalized(next);
		if (clearable && next === value) next = 0;
		value = next; preview = null; animated = -1; queueMicrotask(() => animated = index); onValueChange?.(value);
	}
	function move(event: PointerEvent, index: number) {
		if (interactive) { const next = itemValue(event, index); if (next !== preview) { preview = next; onHover?.(next); } }
		if (variant !== 'base') return;
		for (const item of root.querySelectorAll<HTMLElement>('.rx-rating__item')) {
			const box = item.getBoundingClientRect(); const distance = Math.abs(event.clientX - (box.left + box.width / 2));
			item.style.setProperty('--p', String(Math.max(0, 1 - distance / 90)));
		}
	}
	function leave() { if (preview !== null) { preview = null; onHover?.(null); } if (root) for (const item of root.querySelectorAll<HTMLElement>('.rx-rating__item')) item.style.setProperty('--p', '0'); }
	function pointerDown(event: PointerEvent, index: number) {
		if (!interactive || variant !== 'base') return;
		const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const size = Math.max(box.width, box.height) * 2.8;
		ripples = [...ripples, { id: ++rippleId, index, x: event.clientX - box.left, y: event.clientY - box.top, size }];
	}
	function keydown(event: KeyboardEvent) {
		if (!interactive) return;
		const delta = halves && variant !== 'emoji' && variant !== 'numbers' ? .5 : 1;
		let next: number | undefined;
		if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = value + delta;
		if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = value - delta;
		if (event.key === 'Home') next = 0;
		if (event.key === 'End') next = max;
		if (next !== undefined) { event.preventDefault(); const normalizedNext = normalized(next); select(normalizedNext, Math.max(0, Math.ceil(normalizedNext) - 1)); }
	}
	function faceAt(index: number) { return faces[Math.round(index / Math.max(1, max - 1) * (faces.length - 1))]; }
	function animationDone(event: AnimationEvent, index: number) {
		if (event.animationName !== 'rx-rating-glow-pulse' && index === animated) animated = -1;
	}
</script>

<div bind:this={root}
	class={`rx-rating rx-rating--${size} rx-rating--${variant} rx-rating--i-${intensity} rx-rating--beat-${beat} rx-rating--${shape}`}
	class:is-gray={grayscale}
	style={inlineStyle}
	role="radiogroup"
	aria-label={`Rating: ${value} of ${max}`}
	aria-readonly={readonly || undefined}
	aria-disabled={disabled || undefined}
	tabindex={interactive ? 0 : -1}
	onkeydown={keydown}
	onpointerleave={leave}
	data-variant={variant}
>
	<span class="rx-rating__row">
		{#each Array(max) as _, index}
			{@const fill = fillAt(index)}
			{@const filled = fill >= 1}
			{@const half = fill > 0 && fill < 1}
			<button
				type="button"
				class="rx-rating__item"
				class:is-on={fill > 0}
				class:is-animated={animated === index}
				disabled={!interactive}
				aria-label={`${index + 1} of ${max}`}
				role="radio"
				aria-checked={value > index && value <= index + 1}
				tabindex="-1"
				style={`--fill: ${fill}; --bar-height: ${flat ? 1 : .34 + index / Math.max(1, max - 1) * .66}`}
				onpointermove={(event) => move(event, index)}
				onpointerdown={(event) => pointerDown(event, index)}
				onclick={(event) => select(itemValue(event, index), index)}
				onanimationend={(event) => animationDone(event, index)}
			>
				{#if variant === 'bars'}
					<span class="rx-rating__bar" aria-hidden="true"><span class="rx-rating__bar-fill"></span></span>
				{:else if variant === 'emoji'}
					<span class="rx-rating__face" aria-hidden="true">{faceAt(index)}</span>
				{:else if variant === 'numbers'}
					<span class="rx-rating__number" aria-hidden="true">{index + 1}</span>
				{:else if typeof icon === 'function'}
					{@render icon({ filled, half })}
				{:else}
					{#if variant === 'hearts'}<span class="rx-rating__aura" aria-hidden="true"></span>{/if}
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path class="rx-rating__empty" d={iconPath} />
						{#if variant === 'glow'}<path class="rx-rating__halo" d={iconPath} />{/if}
						<path class="rx-rating__fill" d={iconPath} />
					</svg>
				{/if}
				{#if variant === 'base'}
					<span class="rx-rating__ripples" aria-hidden="true">
						{#each ripples.filter((ripple) => ripple.index === index) as ripple (ripple.id)}
							<span class="rx-rating__ripple" style={`left:${ripple.x}px;top:${ripple.y}px;width:${ripple.size}px;height:${ripple.size}px`} onanimationend={() => ripples = ripples.filter((entry) => entry.id !== ripple.id)}></span>
						{/each}
					</span>
				{/if}
			</button>
		{/each}
	</span>
	{#if showValue}<span class="rx-rating__value" aria-hidden="true">{Number.isInteger(shown) ? shown : shown.toFixed(1)}</span>{/if}
</div>

<style>
	.rx-rating { --rating-size: 1.5rem; --rating-gap: .25rem; --rating-glow: 9px; display: inline-flex; align-items: center; gap: .5rem; color: rgb(var(--rx-color)); outline: none; user-select: none; }
	.rx-rating--sm { --rating-size: 1.125rem; --rating-gap: .1875rem; font-size: .75rem; }
	.rx-rating--lg { --rating-size: 1.875rem; --rating-gap: .375rem; font-size: .9375rem; }
	.rx-rating--i-low { --rating-glow: 4px; }
	.rx-rating__row { display: inline-flex; align-items: center; gap: var(--rating-gap); perspective: 400px; }
	.rx-rating:focus-visible { border-radius: .625rem; outline: 2px solid rgb(var(--rx-color)); outline-offset: 3px; }
	.rx-rating__item { position: relative; isolation: isolate; display: inline-flex; width: var(--rating-size); height: var(--rating-size); padding: 0; align-items: center; justify-content: center; border: 0; background: transparent; color: inherit; cursor: pointer; transition: transform 180ms cubic-bezier(.22,1,.36,1), background-color 160ms ease; }
	.rx-rating__item:disabled { cursor: default; }
	.rx-rating__item:focus-visible { border-radius: 5px; outline: 2px solid rgb(var(--rx-color)); outline-offset: 2px; }
	.rx-rating__item svg { position: relative; z-index: 1; width: 100%; height: 100%; overflow: visible; }
	.rx-rating__empty { fill: transparent; stroke: rgb(var(--rx-color) / calc(.28 + var(--p, 0) * .6)); stroke-width: calc(.8 + var(--p, 0) * .7); transition: stroke 160ms ease, stroke-width 160ms ease; }
	.rx-rating__fill, .rx-rating__halo { fill: rgb(var(--rx-color)); clip-path: inset(0 calc((1 - var(--fill)) * 100%) 0 0); transition: clip-path 200ms cubic-bezier(.22,1,.36,1), filter 220ms ease; }
	.rx-rating__value { min-width: 1.6em; color: rgb(var(--rx-text-secondary)); font-weight: 600; font-variant-numeric: tabular-nums; }

	/* base: fractional fill, source four-stage pop, and pointer-local 640ms light droplet. */
	.rx-rating--base .rx-rating__item.is-animated { animation: rx-rating-pop 420ms cubic-bezier(.34,1.56,.64,1); }
	.rx-rating__ripples { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
	.rx-rating__ripple { position: absolute; border-radius: 50%; translate: -50% -50%; background: radial-gradient(circle, rgb(var(--rx-color) / .42), rgb(var(--rx-color) / .22) 26%, rgb(var(--rx-color) / .08) 48%, transparent 70%); opacity: 0; animation: rx-rating-ripple 640ms cubic-bezier(.22,1,.36,1) forwards; }

	/* bars: rising columns and bottom-up fractional sweep. */
	.rx-rating--bars { --rating-size: 1.75rem; --rating-gap: .3125rem; }
	.rx-rating--bars.rx-rating--sm { --rating-size: 1.375rem; --rating-gap: .25rem; }
	.rx-rating--bars.rx-rating--lg { --rating-size: 2.25rem; --rating-gap: .375rem; }
	.rx-rating--bars .rx-rating__item { width: calc(var(--rating-size) * .286); align-items: flex-end; }
	.rx-rating--bars .rx-rating__item:hover:not(:disabled) { transform: translateY(-2px); }
	.rx-rating__bar { position: relative; width: 100%; height: calc(var(--rating-size) * var(--bar-height)); overflow: hidden; border-radius: 3px; background: rgb(var(--rx-text-muted) / .42); }
	.rx-rating__bar-fill { position: absolute; inset: auto 0 0; height: calc(var(--fill) * 100%); border-radius: inherit; background: linear-gradient(to top, rgb(var(--rx-color)), hsl(from rgb(var(--rx-color)) h s calc(l + (100% - l) * .3))); transition: height 240ms cubic-bezier(.22,1,.36,1); }
	.rx-rating--bars .is-animated { animation: rx-rating-rise 480ms cubic-bezier(.34,1.56,.64,1); }

	/* emoji: inactive faces gray to .45 and the selected face follows the source bounce stages. */
	.rx-rating--emoji { --rating-size: 1.625rem; --rating-gap: .375rem; }
	.rx-rating--emoji.rx-rating--sm { --rating-size: 1.25rem; --rating-gap: .25rem; }
	.rx-rating--emoji.rx-rating--lg { --rating-size: 2.125rem; --rating-gap: .5rem; }
	.rx-rating--emoji .rx-rating__item { width: calc(var(--rating-size) + .375rem); height: calc(var(--rating-size) + .375rem); border-radius: .5rem; }
	.rx-rating--emoji .rx-rating__item:hover:not(:disabled) { background: rgb(var(--rx-color) / .14); }
	.rx-rating__face { font-size: var(--rating-size); line-height: 1; transition: filter 200ms ease, opacity 200ms ease, transform 180ms cubic-bezier(.22,1,.36,1); }
	.rx-rating--emoji.is-gray .rx-rating__item:not(.is-on) .rx-rating__face { filter: grayscale(1); opacity: .45; }
	.rx-rating--emoji .is-on .rx-rating__face { transform: scale(1.04); }
	.rx-rating--emoji .is-animated .rx-rating__face { animation: rx-rating-emoji 560ms cubic-bezier(.34,1.56,.64,1); }

	/* glow: static two-pass neon plus a composited halo pulse and 520ms selection flash. */
	.rx-rating--glow .rx-rating__item:hover:not(:disabled) { transform: scale(1.08); }
	.rx-rating--glow .is-on .rx-rating__fill { filter: drop-shadow(0 0 var(--rating-glow) rgb(var(--rx-color))) drop-shadow(0 0 calc(var(--rating-glow) * 2) rgb(var(--rx-color))); }
	.rx-rating__halo { filter: drop-shadow(0 0 calc(var(--rating-glow) * 1.6) rgb(var(--rx-color))) drop-shadow(0 0 calc(var(--rating-glow) * 3) rgb(var(--rx-color))); opacity: 0; pointer-events: none; }
	.rx-rating--glow .is-on .rx-rating__halo { animation: rx-rating-glow-pulse 2.4s ease-in-out infinite; }
	.rx-rating--glow .is-animated { animation: rx-rating-flash 520ms ease-out; }
	.rx-rating--glow .rx-rating__value { color: color-mix(in srgb, rgb(var(--rx-color)) 45%, rgb(var(--rx-text))); text-shadow: 0 0 8px rgb(var(--rx-color) / .6); }

	/* hearts: pointer hover lift, radial aura, and soft/strong heartbeat. */
	.rx-rating--hearts .rx-rating__item:hover:not(:disabled) { transform: translateY(-1px); }
	.rx-rating__aura { position: absolute; inset: -30%; z-index: 0; border-radius: 50%; background: radial-gradient(circle, rgb(var(--rx-color) / .4), transparent 68%); opacity: 0; transform: scale(.4); pointer-events: none; }
	.rx-rating--hearts .is-animated { animation: rx-rating-heart 620ms cubic-bezier(.34,1.56,.64,1); }
	.rx-rating--hearts.rx-rating--beat-strong .is-animated { animation-duration: 720ms; }
	.rx-rating--hearts .is-animated .rx-rating__aura { animation: rx-rating-aura 620ms ease-out; }

	/* numbers: source chip renderer and 3D flip; circle is an additive source option. */
	.rx-rating--numbers { --rating-size: 1.75rem; --rating-gap: .375rem; }
	.rx-rating--numbers.rx-rating--sm { --rating-size: 1.375rem; --rating-gap: .3125rem; }
	.rx-rating--numbers.rx-rating--lg { --rating-size: 2.25rem; --rating-gap: .4375rem; }
	.rx-rating--numbers .rx-rating__item { border: 1.5px solid rgb(var(--rx-text-secondary) / .72); border-radius: .5rem; color: rgb(var(--rx-text-secondary)); }
	.rx-rating--numbers.rx-rating--circle .rx-rating__item { border-radius: 50%; }
	.rx-rating--numbers .rx-rating__item:hover:not(:disabled) { transform: translateY(-2px); }
	.rx-rating--numbers .rx-rating__item.is-on { border-color: rgb(var(--rx-color)); color: rgb(var(--rx-color-contrast, var(--rx-light))); background: rgb(var(--rx-color)); }
	.rx-rating__number { font-weight: 700; font-variant-numeric: tabular-nums; }
	.rx-rating--numbers .is-animated { animation: rx-rating-number 520ms cubic-bezier(.34,1.56,.64,1); }

	.rx-rating[aria-disabled='true'] { opacity: .5; }
	@keyframes rx-rating-pop { 0% { transform: scale(.82); } 45% { transform: scale(1.22); } 70% { transform: scale(.94); } 100% { transform: scale(1); } }
	@keyframes rx-rating-ripple { from { transform: scale(0); opacity: .8; } to { transform: scale(1); opacity: 0; } }
	@keyframes rx-rating-rise { 0% { transform: translateY(4px) scaleY(.85); } 55% { transform: translateY(-3px) scaleY(1.1); } 100% { transform: none; } }
	@keyframes rx-rating-emoji { 0% { transform: scale(.7) rotate(-8deg); } 40% { transform: scale(1.3) rotate(6deg); } 70% { transform: scale(.92) rotate(-2deg); } 100% { transform: scale(1.04); } }
	@keyframes rx-rating-glow-pulse { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
	@keyframes rx-rating-flash { 0% { transform: scale(1); } 30% { transform: scale(1.32); } 100% { transform: scale(1); } }
	@keyframes rx-rating-heart { 0% { transform: scale(1); } 20% { transform: scale(1.28); } 40% { transform: scale(.94); } 60% { transform: scale(1.16); } 100% { transform: scale(1); } }
	@keyframes rx-rating-aura { 0% { opacity: .9; transform: scale(.4); } 100% { opacity: 0; transform: scale(1.5); } }
	@keyframes rx-rating-number { 0% { transform: rotateY(0) scale(1); } 50% { transform: rotateY(180deg) scale(1.12); } 100% { transform: rotateY(360deg) scale(1); } }
	@media (prefers-reduced-motion: reduce) {
		.rx-rating__item, .rx-rating__fill, .rx-rating__bar-fill, .rx-rating__face { transition: none; }
		.rx-rating__item, .rx-rating__face, .rx-rating__halo, .rx-rating__aura { animation: none !important; }
		.rx-rating__ripple { display: none; }
		.rx-rating__item:hover:not(:disabled) { transform: none; }
	}
	@media (forced-colors: active) { .rx-rating__item.is-on { forced-color-adjust: none; background: Highlight; color: HighlightText; } }
</style>
