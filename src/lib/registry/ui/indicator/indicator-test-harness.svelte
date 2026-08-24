<script lang="ts">
	import Indicator from './indicator.svelte';
	let { standalone = false }: { standalone?: boolean } = $props();
</script>
{#if standalone}<Indicator variant="count" content={7} />{:else}<Indicator><button>Inbox</button></Indicator>{/if}
