<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Radio, RadioGroup } from '$lib/registry/ui/radio-group';
	let plan = $state('pro');
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Radio Group</h1><p>Token-colored radio choices with inherited sizing and native arrow-key navigation.</p></div>
<DemoSection title="Vertical group" source={'<RadioGroup bind:value><Radio value="pro">Pro</Radio></RadioGroup>'}><div data-demo-section="vertical"><RadioGroup bind:value={plan} color="primary"><Radio value="free">Free</Radio><Radio value="pro">Pro</Radio><Radio value="team">Team</Radio></RadioGroup><p>Selected: {plan}</p></div></DemoSection>
<DemoSection title="Horizontal, inherited color and size"><RadioGroup value="monthly" orientation="horizontal" color="success" size="lg" data-demo-section="context"><Radio value="monthly">Monthly</Radio><Radio value="annual">Annual</Radio><Radio value="legacy" disabled>Legacy</Radio></RadioGroup></DemoSection>
<DemoSection title="Disabled group"><RadioGroup value="email" disabled color="danger"><Radio value="email">Email</Radio><Radio value="sms">SMS</Radio></RadioGroup></DemoSection>
