<script lang="ts">
	import { Switch } from './index';
	import type { SwitchVariant } from './switch.svelte';
	let { disabled = false, loading = false, variant = 'base', glow = false }: { disabled?: boolean; loading?: boolean; variant?: SwitchVariant; glow?: boolean } = $props();
	let checked = $state(false); let calls = $state(0);
</script>
<Switch bind:checked {disabled} {loading} {variant} {glow} onCheckedChange={() => calls++} aria-label="Notifications" />
<button onclick={() => checked = true}>Set switch</button><output aria-label="switch value">{String(checked)}</output><output aria-label="switch calls">{calls}</output>
