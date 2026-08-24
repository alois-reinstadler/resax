<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '../../lib/color';
	export interface ContextMenuProps { open?: boolean; color?: RxColor; children: Snippet; content: Snippet; }
</script>
<script lang="ts">
	import * as ContextBase from '$lib/components/ui/context-menu/index.js';
	import { styleColor } from '../../lib/color';
	import { RX_DURATION, RX_EASE } from '../../lib/easing';
	let { open = $bindable(false), color, children, content }: ContextMenuProps = $props();
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.fast}ms; --rx-ease: ${RX_EASE}`);
</script>
<ContextBase.Root bind:open>
	<ContextBase.Trigger class="rx-context-menu__trigger">{@render children()}</ContextBase.Trigger>
	<ContextBase.Content class="rx-context-menu" style={inlineStyle}>{@render content()}</ContextBase.Content>
</ContextBase.Root>
<style>
	:global(.rx-context-menu__trigger) { color: inherit; }
	:global(.rx-context-menu), :global(.rx-context-menu__sub) { min-width: 11rem; border: 1px solid rgb(var(--rx-text) / .08); border-radius: var(--rx-radius); padding: .4rem; color: rgb(var(--rx-text)); background: rgb(var(--rx-bg)); box-shadow: 0 12px 32px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); animation-duration: var(--rx-duration); animation-timing-function: var(--rx-ease); }
	:global(.rx-context-menu__item), :global(.rx-context-menu__sub-trigger) { display: flex; align-items: center; gap: .55rem; min-height: 2.2rem; border-radius: calc(var(--rx-radius) * .65); padding: .4rem .65rem; cursor: pointer; outline: none; }
	:global(.rx-context-menu__item:focus), :global(.rx-context-menu__item[data-highlighted]), :global(.rx-context-menu__sub-trigger:focus), :global(.rx-context-menu__sub-trigger[data-highlighted]) { color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .13); }
	:global(.rx-context-menu__item--danger) { color: rgb(var(--rx-danger)); --rx-color: var(--rx-danger); }
	:global(.rx-context-menu__item[data-disabled]) { cursor: not-allowed; opacity: .45; }
	:global(.rx-context-menu__icon) { display: inline-flex; flex: 0 0 auto; }
	:global(.rx-context-menu__group-label) { padding: .4rem .65rem .25rem; color: rgb(var(--rx-text) / .58); font-size: .72rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
	:global(.rx-context-menu__separator) { height: 1px; margin: .35rem .25rem; background: rgb(var(--rx-text) / .1); }
	@media (prefers-reduced-motion: reduce) { :global(.rx-context-menu), :global(.rx-context-menu__sub) { animation-duration: 1ms; } }
</style>
