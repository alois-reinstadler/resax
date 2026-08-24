<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface SelectGroupProps { label: string; children: Snippet; }
</script>

<script lang="ts">
	import { Combobox, Select } from 'bits-ui';
	import { getSelectContext } from './context';
	let { label, children }: SelectGroupProps = $props();
	const context = getSelectContext();
</script>

{#if context.filter()}
	<Combobox.Group><Combobox.GroupHeading class="rx-select__group-heading">{label}</Combobox.GroupHeading>{@render children()}</Combobox.Group>
{:else}
	<Select.Group><Select.GroupHeading class="rx-select__group-heading">{label}</Select.GroupHeading>{@render children()}</Select.Group>
{/if}
