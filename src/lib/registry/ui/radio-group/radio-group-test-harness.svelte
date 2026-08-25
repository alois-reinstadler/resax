<script lang="ts">
	import { Radio, RadioGroup } from './index';
	import type { RadioGroupVariant, RadioVariant } from './index';
	let { disabled = false, variant = 'base', radioVariant = 'base' }: { disabled?: boolean; variant?: RadioGroupVariant; radioVariant?: RadioVariant } = $props();
	let value = $state('one'); let calls = $state(0);
</script>
<RadioGroup bind:value color="success" size="lg" {disabled} {variant} onValueChange={() => calls++}><Radio value="one" variant={radioVariant}>One</Radio><Radio value="two" variant={radioVariant}>Two</Radio><Radio value="three" disabled variant={radioVariant}>Three</Radio></RadioGroup>
<button onclick={() => value = 'two'}>Set radio</button><output aria-label="radio value">{value}</output><output aria-label="radio calls">{calls}</output>
