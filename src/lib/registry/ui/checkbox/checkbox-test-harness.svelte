<script lang="ts">
	import { Checkbox } from './index';
	import type { CheckboxVariant } from './checkbox.svelte';
	let { disabled = false, color = 'success', variant = 'base', glow = false }: { disabled?: boolean; color?: string; variant?: CheckboxVariant; glow?: boolean } = $props();
	let checked = $state(false);
	let calls = $state(0);
</script>
<Checkbox bind:checked {disabled} {color} {variant} {glow} onCheckedChange={() => calls++}>Accept</Checkbox>
<button onclick={() => checked = true}>Set checked</button>
<output aria-label="checkbox value">{String(checked)}</output><output aria-label="checkbox calls">{calls}</output>
