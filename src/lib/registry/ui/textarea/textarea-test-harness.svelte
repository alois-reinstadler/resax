<script lang="ts">
	import { untrack } from 'svelte';
	import { Textarea } from './index';
	let { initial = '', maxlength, autoResize = false }: { initial?: string; maxlength?: number; autoResize?: boolean } = $props();
	let value = $state('');
	value = untrack(() => initial);
</script>
<Textarea bind:value label="Notes" {maxlength} {autoResize} />
<output aria-label="bound value">{value}</output>
