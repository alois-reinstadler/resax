<script lang="ts">
	import { untrack } from 'svelte';
	import { Textarea } from './index';
	let { initial = '', maxlength, autoResize = false, clearable = false, resize = 'vertical' }: { initial?: string; maxlength?: number; autoResize?: boolean; clearable?: boolean; resize?: 'none'|'vertical'|'horizontal'|'both' } = $props();
	let value = $state('');
	value = untrack(() => initial);
</script>
<Textarea bind:value label="Notes" {maxlength} {autoResize} {clearable} {resize} />
<output aria-label="bound value">{value}</output>
