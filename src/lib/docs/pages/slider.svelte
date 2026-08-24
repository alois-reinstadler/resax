<script lang="ts">
	import DemoSection from '../DemoSection.svelte'; import { Slider } from '$lib/registry/ui/slider';
	let single = $state([35]); let range = $state([20, 75]);
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Slider</h1><p>Chunky value controls with ranges, ticks, and floating feedback.</p></div>
<DemoSection title="Value" source={'<Slider bind:value />'}><div class="stack" data-demo-section="value"><Slider bind:value={single} /><span>Value: {single[0]}</span></div></DemoSection>
<DemoSection title="Range and ticks"><div class="stack" data-demo-section="range"><Slider bind:value={range} min={0} max={100} step={10} ticks tooltip="always" color="success" /><span>{range.join(' – ')}</span></div></DemoSection>
<DemoSection title="Sizes and knobs"><div class="stack" data-demo-section="sizes"><Slider value={[45]} size="lg" knob="square" color="danger" /><Slider value={[60]} size="sm" tooltip="none" /></div></DemoSection>
<style>.stack { display:grid; gap:1rem; width:min(100%,36rem); padding-top:1.5rem; }</style>
