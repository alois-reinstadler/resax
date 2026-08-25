<script lang="ts">
	import SplitButton from './split-button.svelte';
	let { custom = false }: { custom?: boolean } = $props();
</script>

{#if custom}
	<SplitButton label="Create">
		{#snippet menu()}<button type="button">Draft</button><button type="button">Template</button>{/snippet}
	</SplitButton>
{:else}
	<SplitButton label="Create" items={['Draft','Template']}>{#snippet menu()}<span></span>{/snippet}</SplitButton>
{/if}
