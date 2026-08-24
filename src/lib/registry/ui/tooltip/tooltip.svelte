<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '../../lib/color';

	export interface TooltipProps {
		content: string | Snippet;
		side?: 'top' | 'right' | 'bottom' | 'left';
		align?: 'start' | 'center' | 'end';
		color?: RxColor;
		variant?: 'default' | 'border' | 'shadow';
		delayDuration?: number;
		children: Snippet;
	}
</script>

<script lang="ts">
	import * as TooltipBase from '$lib/components/ui/tooltip/index.js';
	import { styleColor } from '../../lib/color';
	import { RX_DURATION, RX_EASE } from '../../lib/easing';

	let { content, side = 'top', align = 'center', color, variant = 'default', delayDuration = 0, children }: TooltipProps = $props();
	const inlineStyle = $derived(`${styleColor(color ?? 'dark')}; --rx-duration: ${RX_DURATION.fast}ms; --rx-ease: ${RX_EASE}`);
</script>

<TooltipBase.Provider {delayDuration}>
	<TooltipBase.Root>
		<TooltipBase.Trigger class="rx-tooltip__trigger">{@render children()}</TooltipBase.Trigger>
		<TooltipBase.Content {side} {align} sideOffset={7} class={`rx-tooltip rx-tooltip--${variant}`} arrowClasses="rx-tooltip__arrow" style={inlineStyle}>
			{#if typeof content === 'string'}{content}{:else}{@render content()}{/if}
		</TooltipBase.Content>
	</TooltipBase.Root>
</TooltipBase.Provider>

<style>
	:global(.rx-tooltip__trigger) { border: 0; padding: 0; color: inherit; background: transparent; font: inherit; }
	:global(.rx-tooltip) { border: 1px solid transparent; border-radius: calc(var(--rx-radius) * .8); padding: .45rem .7rem; color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); font-size: .78rem; line-height: 1.3; box-shadow: none; animation-duration: var(--rx-duration); animation-timing-function: var(--rx-ease); }
	:global(.rx-tooltip--border) { color: rgb(var(--rx-color)); background: rgb(var(--rx-bg)); border-color: rgb(var(--rx-color)); }
	:global(.rx-tooltip--shadow) { box-shadow: 0 8px 24px rgb(var(--rx-color) / .3); }
	:global(.rx-tooltip__arrow) { background: rgb(var(--rx-color)); fill: rgb(var(--rx-color)); }
	:global(.rx-tooltip--border .rx-tooltip__arrow) { background: rgb(var(--rx-bg)); fill: rgb(var(--rx-bg)); border: 1px solid rgb(var(--rx-color)); }
	@media (prefers-reduced-motion: reduce) { :global(.rx-tooltip) { animation-duration: 1ms; } }
</style>
