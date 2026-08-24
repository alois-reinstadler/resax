<script lang="ts">
	import { Switch } from './index';
	let { disabled = false, loading = false }: { disabled?: boolean; loading?: boolean } = $props();
	let checked = $state(false); let calls = $state(0);
</script>
<Switch bind:checked {disabled} {loading} onCheckedChange={() => calls++} aria-label="Notifications" />
<button onclick={() => checked = true}>Set switch</button><output aria-label="switch value">{String(checked)}</output><output aria-label="switch calls">{calls}</output>
