<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Slider } from '$lib/registry/ui/slider';
	let base = $state([35]); let fluent = $state([58]); let glow = $state([66]); let gradient = $state([48]);
	let ripple = $state([42]); let stepped = $state([40]); let stops = $state([50]); let ticked = $state([60]);
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Slider</h1><p>Eight source-faithful value controls: elastic, frosted, neon, gradient, ripple, snapped, named-stop, and ticked.</p></div>
<DemoSection title="Base — elastic rail and pointer glow" source={'<Slider variant="base" bind:value showValue />'}>
	<div class="demo" data-demo-section="base"><Slider variant="base" bind:value={base} showValue /><span>{base[0]}</span></div>
</DemoSection>
<DemoSection title="Fluent — frosted content track and adaptive dot mask" source={'<Slider variant="fluent" label="Volume" dots bind:value />'}>
	<div class="demo dark-stage" data-demo-section="fluent"><Slider variant="fluent" label="Volume" dots bind:value={fluent} /></div>
</DemoSection>
<DemoSection title="Glow and gradient" source={'<Slider variant="glow" intensity={0.85} />\n<Slider variant="gradient" fromColor="#7c3aed" toColor="#06b6d4" />'}>
	<div class="grid" data-demo-section="light-effects"><div><b>Glow</b><Slider variant="glow" bind:value={glow} intensity={.85} tooltip="always" /></div><div><b>Gradient</b><Slider variant="gradient" bind:value={gradient} fromColor="#7c3aed" toColor="#06b6d4" tooltip="always" /></div></div>
</DemoSection>
<DemoSection title="Ripple and stepped snap" source={'<Slider variant="ripple" />\n<Slider variant="stepped" step={10} showNotches />'}>
	<div class="grid" data-demo-section="motion"><div><b>Ripple</b><Slider variant="ripple" bind:value={ripple} /></div><div><b>Stepped</b><Slider variant="stepped" bind:value={stepped} step={10} showNotches tooltip="always" /></div></div>
</DemoSection>
<DemoSection title="Named stops and ticks" source={'<Slider variant="stops" stops={[...]} />\n<Slider variant="ticks" tickCount={11} />'}>
	<div class="stack" data-demo-section="discrete"><Slider variant="stops" bind:value={stops} block stiffness={260} damping={17} lag={.45} blur={5} squash={.045} threshold={6} stops={[{label:'Quiet',value:0},{label:'Balanced',value:50},{label:'Bold',value:100}]} /><Slider variant="ticks" bind:value={ticked} step={10} tickCount={11} color="success" /></div>
</DemoSection>
<DemoSection title="Sizes, range compatibility, and disabled"><div class="stack" data-demo-section="states"><Slider size="sm" value={[25]} variant="glow" /><Slider size="lg" value={[20,75]} variant="ticks" tooltip="always" /><Slider disabled value={[45]} variant="gradient" /></div></DemoSection>

<style>
	.demo,.grid,.stack{display:flex;flex-wrap:wrap;align-items:center;gap:1.5rem}.grid>div{display:grid;gap:1rem}.stack{display:grid;width:min(100%,40rem)}b{position:relative;z-index:1;width:max-content;padding:.1rem .2rem;border-radius:.2rem;color:rgb(var(--rx-text-secondary));background:rgb(var(--rx-background));font-size:.78rem}.dark-stage{width:min(100%,38rem);padding:2rem;border-radius:1rem;background:linear-gradient(135deg,rgb(var(--rx-dark)),rgb(var(--rx-primary)/.35))}
</style>
