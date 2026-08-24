<script lang="ts" module>
	import type { RxColor } from '$lib/registry/lib/color';
	export interface InputNumberProps {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';

	let { value = $bindable(0), min, max, step = 1, color, size = 'default', disabled = false }: InputNumberProps = $props();
	let repeatTimer: ReturnType<typeof setTimeout> | undefined;
	let repeatInterval: ReturnType<typeof setInterval> | undefined;
	const atMin = $derived(disabled || (min !== undefined && value <= min));
	const atMax = $derived(disabled || (max !== undefined && value >= max));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}`);

	function clamp(next: number) { return Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next)); }
	function change(direction: -1 | 1) { value = clamp(value + direction * step); }
	function stopRepeat() { clearTimeout(repeatTimer); clearInterval(repeatInterval); repeatTimer = undefined; repeatInterval = undefined; }
	function startRepeat(direction: -1 | 1) {
		change(direction);
		repeatTimer = setTimeout(() => { repeatInterval = setInterval(() => change(direction), 85); }, 400);
	}
	function handleInput(event: Event) {
		const next = (event.currentTarget as HTMLInputElement).valueAsNumber;
		if (!Number.isNaN(next)) value = clamp(next);
	}
	onDestroy(stopRepeat);
</script>

<div class={`rx-input-number rx-input-number--${size}`} style={inlineStyle}>
	<button type="button" aria-label="Decrease value" disabled={atMin} onpointerdown={() => startRepeat(-1)} onpointerup={stopRepeat} onpointerleave={stopRepeat} onpointercancel={stopRepeat}>−</button>
	<input type="number" bind:value {min} {max} {step} {disabled} oninput={handleInput} aria-label="Number value" />
	<button type="button" aria-label="Increase value" disabled={atMax} onpointerdown={() => startRepeat(1)} onpointerup={stopRepeat} onpointerleave={stopRepeat} onpointercancel={stopRepeat}>+</button>
</div>

<style>
	.rx-input-number { display: inline-grid; grid-template-columns: auto minmax(2.6rem, 4rem) auto; align-items: center; overflow: hidden; border-radius: var(--rx-radius); background: rgb(var(--rx-surface-2)); color: rgb(var(--rx-text)); box-shadow: inset 0 0 0 1px rgb(var(--rx-border)); }
	.rx-input-number button { align-self: stretch; border: 0; background: transparent; color: rgb(var(--rx-color)); cursor: pointer; font: inherit; font-size: 1.25em; transition: background var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease); }
	.rx-input-number button:hover:not(:disabled), .rx-input-number button:focus-visible { background: rgb(var(--rx-color)); color: rgb(var(--rx-light)); outline: 0; }
	.rx-input-number button:disabled { cursor: not-allowed; color: rgb(var(--rx-text-muted)); opacity: .45; }
	.rx-input-number input { width: 100%; border: 0; border-inline: 1px solid rgb(var(--rx-border)); outline: 0; background: transparent; color: inherit; text-align: center; font: inherit; font-weight: 600; }
	.rx-input-number input:focus { box-shadow: inset 0 -2px rgb(var(--rx-color)); }
	.rx-input-number input::-webkit-inner-spin-button, .rx-input-number input::-webkit-outer-spin-button { margin: 0; appearance: none; }
	.rx-input-number input { appearance: textfield; }
	.rx-input-number--lg { min-height: 3rem; font-size: 1rem; }
	.rx-input-number--default { min-height: 2.55rem; font-size: .9rem; }
	.rx-input-number--sm { min-height: 2.1rem; font-size: .8rem; }
	@media (prefers-reduced-motion: reduce) { .rx-input-number button { transition-duration: 0ms; } }
</style>
