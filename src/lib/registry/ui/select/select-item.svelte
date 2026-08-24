<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface SelectItemProps { value: string; label?: string; disabled?: boolean; children?: Snippet; }
</script>

<script lang="ts">
	import { Combobox, Select } from 'bits-ui';
	import { getSelectContext } from './context';
	let { value, label = value, disabled = false, children: userChildren }: SelectItemProps = $props();
	const context = getSelectContext();
	const visible = $derived(!context.filter() || label.toLocaleLowerCase().includes(context.query().trim().toLocaleLowerCase()));
</script>

{#if visible}
	{#if context.filter()}
		<Combobox.Item {value} {label} {disabled} class="rx-select__item">
			{#snippet children({ selected }: { selected: boolean; highlighted: boolean })}
				<span class="rx-select__check" aria-hidden="true">{selected ? '✓' : ''}</span>
				<span>{#if userChildren}{@render userChildren()}{:else}{label}{/if}</span>
			{/snippet}
		</Combobox.Item>
	{:else}
		<Select.Item {value} {label} {disabled} class="rx-select__item">
			{#snippet children({ selected }: { selected: boolean; highlighted: boolean })}
				<span class="rx-select__check" aria-hidden="true">{selected ? '✓' : ''}</span>
				<span>{#if userChildren}{@render userChildren()}{:else}{label}{/if}</span>
			{/snippet}
		</Select.Item>
	{/if}
{/if}
