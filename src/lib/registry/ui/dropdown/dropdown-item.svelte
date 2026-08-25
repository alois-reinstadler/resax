<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface DropdownItemProps { icon?: Snippet; value?: string; selected?: boolean; shortcut?: string; badge?: string; href?: string; external?: boolean; danger?: boolean; disabled?: boolean; onSelect?: (event: Event, value?: string) => void; children: Snippet; }
</script>
<script lang="ts">
	import * as DropdownBase from '$lib/components/ui/dropdown-menu/index.js';
	let { icon, value, selected = false, shortcut, badge, href, external = false, danger = false, disabled = false, onSelect, children }: DropdownItemProps = $props();
	function select(event: Event) { onSelect?.(event, value); if (href && typeof window !== 'undefined') external ? window.open(href, '_blank', 'noopener,noreferrer') : window.location.assign(href); }
</script>
<DropdownBase.Item class={`rx-menu__item${danger ? ' rx-menu__item--danger' : ''}${selected ? ' rx-menu__item--selected' : ''}`} variant={danger ? 'destructive' : 'default'} {disabled} onSelect={select} aria-current={selected ? 'true' : undefined}>
	{#if icon}<span class="rx-menu__icon">{@render icon()}</span>{/if}<span class="rx-menu__item-label">{@render children()}</span>{#if badge}<span class="rx-menu__badge">{badge}</span>{/if}{#if shortcut}<kbd class="rx-menu__shortcut">{shortcut}</kbd>{/if}{#if external}<svg class="rx-menu__external" viewBox="0 0 24 24" aria-label="Opens in a new window"><path d="M7 17 17 7M9 7h8v8"/></svg>{/if}{#if selected}<svg class="rx-menu__check" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m7.75 12 2.83 2.83 5.67-5.66"/></svg>{/if}
</DropdownBase.Item>
