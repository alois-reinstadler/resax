<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	export type AccordionValue = string | string[];
	export interface AccordionProps { value?: AccordionValue; mode?: 'single' | 'multiple'; collapsible?: boolean; disabled?: boolean; color?: RxColor; variant?: 'default' | 'filled' | 'ghost'; effect?: 'none' | 'bounce' | 'glow' | 'slide'; layout?: 'separated' | 'contained' | 'line'; size?: 'sm' | 'md' | 'lg'; radius?: 'none' | 'subtle' | 'rounded' | 'squircle'; tone?: 'default' | 'danger' | 'warning' | 'success'; onValueChange?: (value: AccordionValue) => void; children: Snippet; }
</script>
<script lang="ts">
	import { Accordion as Primitive } from 'bits-ui';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';
	import { setAccordionContext } from './context';
	let { value = $bindable(''), mode = 'single', collapsible = true, disabled = false, color, variant = 'default', effect = 'none', layout = 'separated', size = 'md', radius = 'rounded', tone = 'default', onValueChange, children }: AccordionProps = $props();
	setAccordionContext({ get variant(){return variant}, get effect(){return effect}, get layout(){return layout}, get color(){return color} });
	let last = $state<AccordionValue>(value);
	function changed(next: AccordionValue) { if (!collapsible && mode === 'single' && next === '') return; value = next; if (next !== last) { last = next; onValueChange?.(next); } }
	const css = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration:${RX_DURATION.base}ms; --rx-ease:${RX_EASE}`);
</script>
{#if mode === 'multiple'}
	<Primitive.Root type="multiple" value={Array.isArray(value) ? value : []} onValueChange={changed} {disabled} class="rx-accordion" data-layout={layout} data-size={size} data-radius={radius} data-tone={tone} style={css}>{@render children()}</Primitive.Root>
{:else}
	<Primitive.Root type="single" value={typeof value === 'string' ? value : ''} onValueChange={changed} {disabled} class="rx-accordion" data-layout={layout} data-size={size} data-radius={radius} data-tone={tone} style={css}>{@render children()}</Primitive.Root>
{/if}
<style>
	:global(.rx-accordion){--rx-acc:rgb(var(--rx-color));--rx-acc-h:40px;--rx-acc-pad:16px;--rx-acc-r:12px;display:flex;flex-direction:column;gap:10px;width:100%;max-width:520px;font-size:14px}
	:global(.rx-accordion[data-size=sm]){--rx-acc-h:34px;--rx-acc-pad:13px;--rx-acc-r:10px;font-size:13px}
	:global(.rx-accordion[data-size=lg]){--rx-acc-h:48px;--rx-acc-pad:20px;--rx-acc-r:14px;font-size:15px}
	:global(.rx-accordion[data-radius=none]){--rx-acc-r:0px}:global(.rx-accordion[data-radius=subtle]){--rx-acc-r:8px}:global(.rx-accordion[data-radius=squircle]){--rx-acc-r:20px}
	:global(.rx-accordion[data-tone=danger]){--rx-acc:rgb(var(--rx-danger))}:global(.rx-accordion[data-tone=warning]){--rx-acc:rgb(var(--rx-warning))}:global(.rx-accordion[data-tone=success]){--rx-acc:rgb(var(--rx-success))}
	:global(.rx-accordion[data-layout=contained]){gap:0;border:1px solid rgb(var(--rx-border));border-radius:var(--rx-acc-r);overflow:hidden}
	:global(.rx-accordion[data-layout=line]){gap:0}
</style>
