<script lang="ts">
	import { Checkbox } from './index';
	let { disabled = false, color = 'success' }: { disabled?: boolean; color?: string } = $props();
	let checked = $state(false);
	let calls = $state(0);
</script>
<Checkbox bind:checked {disabled} {color} onCheckedChange={() => calls++}>Accept</Checkbox>
<button onclick={() => checked = true}>Set checked</button>
<output aria-label="checkbox value">{String(checked)}</output><output aria-label="checkbox calls">{calls}</output>
