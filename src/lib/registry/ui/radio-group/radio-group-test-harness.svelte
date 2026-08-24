<script lang="ts">
	import { Radio, RadioGroup } from './index';
	let { disabled = false }: { disabled?: boolean } = $props();
	let value = $state('one'); let calls = $state(0);
</script>
<RadioGroup bind:value color="success" size="lg" {disabled} onValueChange={() => calls++}><Radio value="one">One</Radio><Radio value="two">Two</Radio><Radio value="three" disabled>Three</Radio></RadioGroup>
<button onclick={() => value = 'two'}>Set radio</button><output aria-label="radio value">{value}</output><output aria-label="radio calls">{calls}</output>
