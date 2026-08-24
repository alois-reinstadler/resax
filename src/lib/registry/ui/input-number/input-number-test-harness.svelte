<script lang="ts">
	import { untrack } from 'svelte';
	import { InputNumber } from './index';
	let { initial = 0, min, max, step = 1 }: { initial?: number; min?: number; max?: number; step?: number } = $props();
	let value = $state(0);
	value = untrack(() => initial);
</script>
<InputNumber bind:value {min} {max} {step} />
<output aria-label="bound value">{value}</output>
