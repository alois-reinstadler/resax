<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { InputNumber } from '$lib/registry/ui/input-number';
	let quantity = $state(2);
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Input Number</h1><p>A compact native number field with bounded, press-and-hold stepper controls.</p></div>
<DemoSection title="Stepper"><div class="demo-row" data-demo-section="stepper"><InputNumber bind:value={quantity} min={0} max={10} /><output>Value: {quantity}</output></div><p class="demo-note">Press and hold either button to repeat the step.</p></DemoSection>
<DemoSection title="Step and bounds"><div class="demo-row" data-demo-section="bounds"><InputNumber value={0} min={0} max={1} step={0.1} color="success" /><InputNumber value={5} min={0} max={5} color="danger" /></div></DemoSection>
<DemoSection title="Sizes"><div class="demo-row" data-demo-section="sizes"><InputNumber size="lg" value={3} /><InputNumber value={3} /><InputNumber size="sm" value={3} /></div></DemoSection>
<DemoSection title="Disabled"><InputNumber disabled value={3} /></DemoSection>
