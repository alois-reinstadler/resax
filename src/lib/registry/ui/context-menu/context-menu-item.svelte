<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface ContextMenuItemProps { icon?: Snippet; danger?: boolean; disabled?: boolean; onSelect?: (event: Event) => void; children: Snippet; }
</script>
<script lang="ts">
	import * as ContextBase from '$lib/components/ui/context-menu/index.js';
	let { icon, danger = false, disabled = false, onSelect, children }: ContextMenuItemProps = $props();
</script>
<ContextBase.Item class={`rx-context-menu__item${danger ? ' rx-context-menu__item--danger' : ''}`} variant={danger ? 'destructive' : 'default'} {disabled} {onSelect}>
	{#if icon}<span class="rx-context-menu__icon">{@render icon()}</span>{/if}{@render children()}
</ContextBase.Item>
