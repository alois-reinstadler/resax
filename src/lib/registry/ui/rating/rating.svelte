<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	export interface RatingProps {
		value?: number; max?: number; halves?: boolean; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		readonly?: boolean; disabled?: boolean; icon?: Snippet<[{ filled: boolean; half: boolean }]>;
		onValueChange?: (value: number) => void;
	}
</script>
<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE_BOUNCE } from '$lib/registry/lib/easing';
	let { value = $bindable(0), max = 5, halves = false, color = 'warn', size = 'default', readonly = false, disabled = false, icon, onValueChange }: RatingProps = $props();
	let preview = $state<number | null>(null); let popped = $state(0);
	const shown = $derived(preview ?? value);
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-warn)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-bounce: ${RX_EASE_BOUNCE}`);
	function normalized(next: number) { const unit = halves ? .5 : 1; return Math.max(0, Math.min(max, Math.round(next / unit) * unit)); }
	function select(next: number) { if (readonly || disabled) return; value = normalized(next); popped = Math.ceil(value); onValueChange?.(value); }
	function pointerValue(event: MouseEvent | PointerEvent, index: number) { if (!halves) return index; const box = (event.currentTarget as HTMLElement).getBoundingClientRect(); return index - (event.clientX - box.left < box.width / 2 ? .5 : 0); }
	function keydown(event: KeyboardEvent) { if (readonly || disabled) return; const delta = halves ? .5 : 1; let next: number | undefined; if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = value + delta; if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = value - delta; if (event.key === 'Home') next = 0; if (event.key === 'End') next = max; if (next !== undefined) { event.preventDefault(); select(next); } }
</script>

<div class={`rx-rating rx-rating--${size}`} style={inlineStyle} role="radiogroup" aria-label="Rating" aria-readonly={readonly} aria-disabled={disabled} tabindex={readonly || disabled ? -1 : 0} onkeydown={keydown} onpointerleave={() => preview = null}>
	{#each Array(max) as _, offset}
		{@const index = offset + 1}{@const filled = shown >= index}{@const half = !filled && shown >= index - .5}
		<span class="rx-rating__item" class:rx-rating__item--pop={popped === index} role="radio" tabindex="-1" aria-checked={value >= index - (halves ? .5 : 0)} aria-label={`${index} star${index === 1 ? '' : 's'}`} onclick={(event) => select(pointerValue(event, index))} onkeydown={() => {}} onpointermove={(event) => { if (!readonly && !disabled) preview = pointerValue(event, index); }}>
			{#if icon}{@render icon({ filled, half })}{:else}<svg viewBox="0 0 24 24" aria-hidden="true"><path class="rx-rating__empty" d="m12 2.5 2.9 5.87 6.48.94-4.69 4.57 1.11 6.45L12 17.28l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.94z" />{#if filled || half}<path class="rx-rating__fill" class:rx-rating__fill--half={half} d="m12 2.5 2.9 5.87 6.48.94-4.69 4.57 1.11 6.45L12 17.28l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.94z" />{/if}</svg>{/if}
		</span>
	{/each}
</div>
<style>
	.rx-rating { display: inline-flex; gap: .2rem; color: rgb(var(--rx-color)); outline: none; }
	.rx-rating:focus-visible { border-radius: var(--rx-radius); outline: 3px solid rgb(var(--rx-color) / .25); outline-offset: 3px; }
	.rx-rating__item { display: inline-flex; width: 2rem; height: 2rem; cursor: pointer; }
	.rx-rating__item svg { width: 100%; height: 100%; overflow: visible; }
	.rx-rating__empty { fill: rgb(var(--rx-gray)); stroke: rgb(var(--rx-color) / .45); stroke-width: 1; }
	.rx-rating__fill { fill: rgb(var(--rx-color)); transform-origin: center; }
	.rx-rating__fill--half { clip-path: inset(0 50% 0 0); }
	.rx-rating__item--pop .rx-rating__fill { animation: rx-rating-pop var(--rx-duration) var(--rx-bounce); }
	.rx-rating--lg .rx-rating__item { width: 2.5rem; height: 2.5rem; } .rx-rating--sm .rx-rating__item { width: 1.5rem; height: 1.5rem; }
	.rx-rating[aria-disabled='true'] { opacity: .5; } .rx-rating[aria-disabled='true'] .rx-rating__item, .rx-rating[aria-readonly='true'] .rx-rating__item { cursor: default; }
	@keyframes rx-rating-pop { 50% { transform: scale(1.25); } }
	@media (prefers-reduced-motion: reduce) { .rx-rating__item--pop .rx-rating__fill { animation: none; } }
</style>
