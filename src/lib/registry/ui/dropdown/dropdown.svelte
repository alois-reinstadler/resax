<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export type Side = 'top' | 'right' | 'bottom' | 'left';
	export interface DropdownProps {
		open?: boolean;
		trigger?: 'click' | 'hover';
		color?: RxColor;
		placement?: Side;
		children: Snippet;
		content: Snippet;
	}
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import * as DropdownBase from '$lib/components/ui/dropdown-menu/index.js';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';

	let { open = $bindable(false), trigger = 'click', color, placement = 'bottom', children, content }: DropdownProps = $props();
	let closeTimer: ReturnType<typeof setTimeout> | undefined;
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.fast}ms; --rx-ease: ${RX_EASE}`);

	function cancelClose() { if (closeTimer) clearTimeout(closeTimer); closeTimer = undefined; }
	function show() { if (trigger !== 'hover') return; cancelClose(); open = true; }
	function hide() { if (trigger !== 'hover') return; cancelClose(); closeTimer = setTimeout(() => open = false, RX_DURATION.fast); }
	onDestroy(cancelClose);
</script>

<DropdownBase.Root bind:open>
	<DropdownBase.Trigger class="rx-dropdown__trigger" onpointerenter={show} onpointerleave={hide}>{@render children()}</DropdownBase.Trigger>
	<DropdownBase.Content side={placement} sideOffset={7} class="rx-menu" style={inlineStyle} onpointerenter={show} onpointerleave={hide}>
		{@render content()}
	</DropdownBase.Content>
</DropdownBase.Root>

<style>
	:global(.rx-dropdown__trigger) { border: 0; padding: 0; color: inherit; background: transparent; font: inherit; }
	:global(.rx-menu) { min-width: 11rem; border: 1px solid rgb(var(--rx-text) / .08); border-radius: var(--rx-radius); padding: .4rem; color: rgb(var(--rx-text)); background: rgb(var(--rx-bg)); box-shadow: 0 12px 32px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); animation-duration: var(--rx-duration); animation-timing-function: var(--rx-ease); }
	:global(.rx-menu__item) { display: flex; align-items: center; gap: .55rem; min-height: 2.2rem; border-radius: calc(var(--rx-radius) * .65); padding: .4rem .65rem; cursor: pointer; outline: none; }
	:global(.rx-menu__item:focus), :global(.rx-menu__item[data-highlighted]) { color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .13); }
	:global(.rx-menu__item--danger) { color: rgb(var(--rx-danger)); --rx-color: var(--rx-danger); }
	:global(.rx-menu__item[data-disabled]) { cursor: not-allowed; opacity: .45; }
	:global(.rx-menu__icon) { display: inline-flex; flex: 0 0 auto; }
	:global(.rx-menu__group-label) { padding: .4rem .65rem .25rem; color: rgb(var(--rx-text) / .58); font-size: .72rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
	:global(.rx-menu__separator) { height: 1px; margin: .35rem .25rem; background: rgb(var(--rx-text) / .1); }
	@media (prefers-reduced-motion: reduce) { :global(.rx-menu) { animation-duration: 1ms; } }
</style>
