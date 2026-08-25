<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface ContextMenuItemProps { icon?: Snippet; value?: string; selected?: boolean; shortcut?: string; href?: string; external?: boolean; danger?: boolean; disabled?: boolean; onSelect?: (event: Event, value?: string) => void; children: Snippet; }
</script>
<script lang="ts">
	import * as ContextBase from '$lib/components/ui/context-menu/index.js';
	let { icon, value, selected = false, shortcut, href, external = false, danger = false, disabled = false, onSelect, children }: ContextMenuItemProps = $props();
	function select(event: Event) { onSelect?.(event, value); if (href && typeof window !== 'undefined') external ? window.open(href, '_blank', 'noopener,noreferrer') : window.location.assign(href); }
</script>
<ContextBase.Item class={`rx-context-menu__item${danger ? ' rx-context-menu__item--danger' : ''}${selected ? ' rx-context-menu__item--selected' : ''}`} variant={danger ? 'destructive' : 'default'} {disabled} onSelect={select} aria-current={selected ? 'true' : undefined}>
	{#if icon}<span class="rx-context-menu__icon">{@render icon()}</span>{/if}<span class="rx-context-menu__item-label">{@render children()}</span>{#if shortcut}<kbd class="rx-context-menu__shortcut">{shortcut}</kbd>{:else if selected}<svg class="rx-context-menu__check" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m7.75 12 2.83 2.83 5.67-5.66"/></svg>{/if}
</ContextBase.Item>
