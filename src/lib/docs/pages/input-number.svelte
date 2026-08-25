<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { InputNumber } from '$lib/registry/ui/input-number';
	let base = $state(12); let glow = $state(128); let roll = $state(98); let segment = $state(24); let slider = $state(55); let stepper = $state(7);
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Input Number</h1><p>Six distinct source renderers with directional rolls, digit drums, segmented flips, draggable fill, and stacked controls.</p></div>
<DemoSection title="Base — edit, hold, glow, and directional roll" source={'<InputNumber variant="base" bind:value frame="default" />'}>
	<div class="row" data-demo-section="base"><InputNumber variant="base" bind:value={base} min={-20} max={200} /><InputNumber variant="base" value={12} frame="bare" color="success" /><output>{base}</output></div><p class="demo-note">Click the value to edit it. Press and hold a control to accelerate toward its bound.</p>
</DemoSection>
<DemoSection title="Glow count-up" source={'<InputNumber variant="glow" duration={800} intensity={0.9} />'}>
	<div class="row" data-demo-section="glow"><InputNumber variant="glow" bind:value={glow} duration={800} intensity={.9} prefix="$" separator="," /><button class="demo-action" onclick={() => glow += 137}>Add 137</button></div>
</DemoSection>
<DemoSection title="Rolling digits and per-position segmented flip" source={'<InputNumber variant="roll-digits" pad={4} />\n<InputNumber variant="segment" gap={4} />'}>
	<div class="row" data-demo-section="digit-motion"><InputNumber variant="roll-digits" bind:value={roll} pad={4} /><InputNumber variant="segment" bind:value={segment} gap={4} color="warn" /><button class="demo-action" onclick={() => { roll += 3; segment += 1; }}>Advance changed cells</button></div>
</DemoSection>
<DemoSection title="Drag slider and vertical stepper" source={'<InputNumber variant="slider" draggable min={0} max={100} />\n<InputNumber variant="stepper" controlsSide="right" />'}>
	<div class="row" data-demo-section="controls"><InputNumber variant="slider" bind:value={slider} min={0} max={100} step={5} color="success" /><InputNumber variant="stepper" bind:value={stepper} controlsSide="right" /><InputNumber variant="stepper" value={4} controlsSide="left" color="danger" /></div>
</DemoSection>
<DemoSection title="Formatting, sizes, bounds, and disabled"><div class="row" data-demo-section="states"><InputNumber variant="roll-digits" value={42.5} decimals={1} suffix="%" size="lg" /><InputNumber variant="segment" value={3} size="sm" /><InputNumber variant="base" value={5} min={0} max={5} /><InputNumber variant="stepper" value={3} disabled /></div></DemoSection>

<style>.row{display:flex;flex-wrap:wrap;align-items:center;gap:1rem}.demo-action{padding:.55rem .8rem;border:1px solid rgb(var(--rx-border));border-radius:.6rem;color:rgb(var(--rx-text));background:rgb(var(--rx-surface-2));cursor:pointer}output{color:rgb(var(--rx-text-secondary))}</style>
