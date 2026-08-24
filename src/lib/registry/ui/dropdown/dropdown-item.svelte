<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface DropdownItemProps { icon?: Snippet; danger?: boolean; disabled?: boolean; onSelect?: (event: Event) => void; children: Snippet; }
</script>
<script lang="ts">
	import * as DropdownBase from '$lib/components/ui/dropdown-menu/index.js';
	let { icon, danger = false, disabled = false, onSelect, children }: DropdownItemProps = $props();
</script>
<DropdownBase.Item class={`rx-menu__item${danger ? ' rx-menu__item--danger' : ''}`} variant={danger ? 'destructive' : 'default'} {disabled} {onSelect}>
	{#if icon}<span class="rx-menu__icon">{@render icon()}</span>{/if}{@render children()}
</DropdownBase.Item>
