<script lang="ts">
	import Chip from './chip.svelte';
	let { disabled = false }: { disabled?: boolean } = $props();
	let selected = $state(false);
</script>

<Chip variant="bounce" selectable bind:selected {disabled}>{#snippet children()}Svelte{/snippet}</Chip>
<output>{selected ? 'selected' : 'idle'}</output>
