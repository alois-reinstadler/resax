<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	export type AccordionValue = string | string[];
	export interface AccordionProps { value?: AccordionValue; mode?: 'single' | 'multiple'; collapsible?: boolean; disabled?: boolean; color?: RxColor; variant?: 'default' | 'filled' | 'ghost'; effect?: 'none' | 'bounce' | 'glow' | 'slide'; onValueChange?: (value: AccordionValue) => void; children: Snippet; }
</script>
<script lang="ts">
	import { Accordion as Primitive } from 'bits-ui';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';
	import { setAccordionContext } from './context';
	let { value = $bindable(''), mode = 'single', collapsible = true, disabled = false, color, variant = 'default', effect = 'none', onValueChange, children }: AccordionProps = $props();
	setAccordionContext({ get variant(){return variant}, get effect(){return effect}, get color(){return color} });
	let last = $state<AccordionValue>(value);
	function changed(next: AccordionValue) { if (!collapsible && mode === 'single' && next === '') return; value = next; if (next !== last) { last = next; onValueChange?.(next); } }
	const css = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration:${RX_DURATION.base}ms; --rx-ease:${RX_EASE}`);
</script>
{#if mode === 'multiple'}
	<Primitive.Root type="multiple" value={Array.isArray(value) ? value : []} onValueChange={changed} {disabled} class="rx-accordion" style={css}>{@render children()}</Primitive.Root>
{:else}
	<Primitive.Root type="single" value={typeof value === 'string' ? value : ''} onValueChange={changed} {disabled} class="rx-accordion" style={css}>{@render children()}</Primitive.Root>
{/if}
<style>:global(.rx-accordion){display:grid;gap:.55rem;width:100%}</style>
