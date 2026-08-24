<script lang="ts">
	import { untrack } from 'svelte';
	import { Input } from './index';
	let { initial = '', state: validationState = 'default', message, label = 'Name' }: { initial?: string; state?: 'default' | 'danger'; message?: string; label?: string } = $props();
	let value = $state('');
	value = untrack(() => initial);
</script>
<Input bind:value state={validationState} {message} {label} />
<button onclick={() => value = 'Programmatic'}>Set value</button>
<output aria-label="bound value">{value}</output>
