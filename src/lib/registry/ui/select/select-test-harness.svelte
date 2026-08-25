<script lang="ts">
	import { untrack } from 'svelte';
	import { Select, SelectGroup, SelectItem } from './index';
	let { multiple = false, filter = false, chips = false, variant = 'default', initial = multiple ? ['apple'] : '' }: { multiple?: boolean; filter?: boolean; chips?: boolean; variant?: 'default'|'floating'|'pill'|'search'|'slide'|'underline'; initial?: string | string[] } = $props();
	let value = $state<string | string[]>('');
	value = untrack(() => initial);
	let calls = $state<string[]>([]);
</script>

<Select bind:value {multiple} {filter} {chips} {variant} label="Fruit" placeholder="Choose fruit" onValueChange={(next) => calls.push(Array.isArray(next) ? 'array' : 'string')}>
	<SelectGroup label="Fruit">
		<SelectItem value="apple" label="Apple">Apple</SelectItem>
		<SelectItem value="banana" label="Banana">Banana</SelectItem>
		<SelectItem value="pear" label="Pear" disabled>Pear</SelectItem>
	</SelectGroup>
</Select>
<button onclick={() => value = multiple ? ['banana'] : 'banana'}>Set value</button>
<output aria-label="select value">{JSON.stringify(value)}</output>
<output aria-label="select payloads">{calls.join(',')}</output>
