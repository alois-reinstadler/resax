<script lang="ts" module>
	import type { RxColor } from '$lib/registry/lib/color';
	export interface SliderProps {
		value?: number[]; min?: number; max?: number; step?: number; color?: RxColor;
		size?: 'lg' | 'default' | 'sm'; knob?: 'circle' | 'square';
		tooltip?: 'hover' | 'always' | 'none'; ticks?: boolean; disabled?: boolean;
		onValueChange?: (value: number[]) => void;
	}
</script>

<script lang="ts">
	import { Slider as SliderPrimitive } from 'bits-ui';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';
	let { value = $bindable([0]), min = 0, max = 100, step = 1, color, size = 'default', knob = 'circle', tooltip = 'hover', ticks = false, disabled = false, onValueChange }: SliderProps = $props();
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}`);
	function changed(next: number[]) { value = next; onValueChange?.(next); }
</script>

<SliderPrimitive.Root type="multiple" bind:value min={min} max={max} step={step} {disabled} onValueChange={changed} class={`rx-slider rx-slider--${size}`} style={inlineStyle}>
	{#snippet children({ thumbItems, tickItems })}
		<span class="rx-slider__track"><SliderPrimitive.Range class="rx-slider__range" /></span>
		{#if ticks}{#each tickItems as tick (tick.index)}<SliderPrimitive.Tick index={tick.index} class="rx-slider__tick" />{/each}{/if}
		{#each thumbItems as thumb (thumb.index)}
			<SliderPrimitive.Thumb index={thumb.index} class={`rx-slider__thumb rx-slider__thumb--${knob}`} aria-label={`Value ${thumb.index + 1}`}>
				<span class={`rx-slider__tooltip rx-slider__tooltip--${tooltip}`}>{thumb.value}</span>
			</SliderPrimitive.Thumb>
		{/each}
	{/snippet}
</SliderPrimitive.Root>

<style>
	.rx-slider { position: relative; display: flex; width: 100%; min-width: 10rem; height: 2.5rem; align-items: center; touch-action: none; user-select: none; }
	.rx-slider__track { position: relative; display: block; width: 100%; height: .55rem; overflow: hidden; border-radius: 9999px; background: rgb(var(--rx-gray)); }
	.rx-slider__range { position: absolute; height: 100%; border-radius: inherit; background: rgb(var(--rx-color)); }
	.rx-slider__thumb { position: relative; display: block; box-sizing: border-box; width: 1.35rem; height: 1.35rem; border: 3px solid rgb(var(--rx-color)); background: rgb(var(--rx-background)); box-shadow: 0 3px 10px rgb(var(--rx-dark) / .18); transition: transform var(--rx-duration) var(--rx-ease), box-shadow var(--rx-duration) var(--rx-ease); }
	.rx-slider__thumb--circle { border-radius: 9999px; } .rx-slider__thumb--square { border-radius: calc(var(--rx-radius) * .35); }
	.rx-slider__thumb:focus-visible { outline: 3px solid rgb(var(--rx-color) / .25); outline-offset: 2px; }
	:global(.rx-slider__thumb[data-active]) { transform: scale(1.08); }
	.rx-slider__tooltip { position: absolute; left: 50%; bottom: calc(100% + .55rem); translate: -50% .3rem; padding: .2rem .4rem; border-radius: calc(var(--rx-radius) * .4); color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); font-size: .7rem; line-height: 1; opacity: 0; pointer-events: none; transition: opacity var(--rx-duration) var(--rx-ease), translate var(--rx-duration) var(--rx-ease); }
	.rx-slider__tooltip--always, :global(.rx-slider__thumb:hover) .rx-slider__tooltip--hover, :global(.rx-slider__thumb:focus-visible) .rx-slider__tooltip--hover, :global(.rx-slider__thumb[data-active]) .rx-slider__tooltip--hover { opacity: 1; translate: -50% 0; }
	.rx-slider__tooltip--none { display: none; }
	.rx-slider__tick { width: .25rem; height: .25rem; border-radius: 9999px; background: rgb(var(--rx-background)); }
	:global(.rx-slider--lg) .rx-slider__track { height: .7rem; } :global(.rx-slider--lg .rx-slider__thumb) { width: 1.6rem; height: 1.6rem; }
	:global(.rx-slider--sm) .rx-slider__track { height: .4rem; } :global(.rx-slider--sm .rx-slider__thumb) { width: 1.05rem; height: 1.05rem; border-width: 2px; }
	:global(.rx-slider[data-disabled]) { opacity: .5; cursor: not-allowed; }
	@media (prefers-reduced-motion: reduce) { .rx-slider__thumb, .rx-slider__tooltip { transition-duration: 0ms; } }
</style>
