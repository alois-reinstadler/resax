<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '$lib/registry/lib/color';
	export type SeparatorOrientation = 'horizontal' | 'vertical';
	export type SeparatorVariant = 'solid' | 'dashed' | 'dotted' | 'gradient';
	export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> { orientation?: SeparatorOrientation; variant?: SeparatorVariant; color?: RxColor; children?: Snippet; }
</script>
<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { cn } from '$lib/utils.js';
	let { orientation = 'horizontal', variant = 'solid', color, children, class: className, style, ...rest }: SeparatorProps = $props();
	const colorStyle = $derived([color ? styleColor(color) : '--rx-color: var(--rx-gray)', typeof style === 'string' ? style : undefined].filter(Boolean).join('; '));
</script>
<div {...rest} class={cn('rx-separator', `rx-separator--${orientation}`, `rx-separator--${variant}`, children && 'rx-separator--labelled', className)} style={colorStyle} role={children ? 'none' : 'separator'} aria-orientation={children ? undefined : orientation}>
	{#if children && orientation === 'horizontal'}<span class="rx-separator__line"></span><span class="rx-separator__label">{@render children()}</span><span class="rx-separator__line"></span>{/if}
</div>
<style>
	.rx-separator { flex-shrink: 0; color: rgb(var(--rx-color)); }
	.rx-separator--horizontal { width: 100%; height: 1px; border-top: 1px solid currentColor; }
	.rx-separator--vertical { align-self: stretch; width: 1px; min-height: 1rem; border-left: 1px solid currentColor; }
	.rx-separator--dashed { border-style: dashed; } .rx-separator--dotted { border-style: dotted; }
	.rx-separator--gradient.rx-separator--horizontal { border: 0; background: linear-gradient(90deg, rgb(var(--rx-color) / 0), rgb(var(--rx-color)), rgb(var(--rx-color) / 0)); }
	.rx-separator--gradient.rx-separator--vertical { border: 0; background: linear-gradient(180deg, rgb(var(--rx-color) / 0), rgb(var(--rx-color)), rgb(var(--rx-color) / 0)); }
	.rx-separator--labelled { display: flex; height: auto; align-items: center; gap: .75rem; border: 0; background: none; }
	.rx-separator__line { height: 1px; flex: 1; background: currentColor; } .rx-separator__label { flex: none; color: rgb(var(--rx-text)); }
</style>
