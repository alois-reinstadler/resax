<script lang="ts">
	import Chip from './chip.svelte';
	import type { ChipProps } from './chip.svelte';
	let { disabled = false, color = 'primary', variant = 'bounce', selected = $bindable(false) }:
		{ disabled?: boolean; color?: string; variant?: ChipProps['variant']; selected?: boolean } = $props();
</script>

<Chip {variant} {color} selectable bind:selected {disabled}>{#snippet children()}Svelte{/snippet}</Chip>
<output>{selected ? 'selected' : 'idle'}</output>
