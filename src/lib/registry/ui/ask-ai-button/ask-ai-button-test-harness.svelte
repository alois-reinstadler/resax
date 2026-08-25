<script lang="ts">
	import { AskAiButton } from './index';
	let { loading = false }: { loading?: boolean } = $props();
	let asks = $state(0);
</script>
<AskAiButton {loading} label="Ask Resax" onask={() => asks++} />
<output aria-label="ask count">{asks}</output>
