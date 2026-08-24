<script lang="ts">import DemoSection from '../DemoSection.svelte';import {DotStepper} from '$lib/registry/ui/dot-stepper';let current=$state(1);const variants=['default','bars','elastic','glow','ring','worm'] as const;</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Dot Stepper</h1><p>A compact progress navigator with Vuesax-inspired motion.</p></div>
<DemoSection title="Labels"><DotStepper bind:current count={4} labels={['Cart','Shipping','Payment','Done']}/></DemoSection>
<DemoSection title="Variants"><div class="variants">{#each variants as variant}<div><code>{variant}</code><DotStepper current={2} count={5} {variant}/></div>{/each}</div></DemoSection>
<style>.variants{display:flex;flex-wrap:wrap;gap:2rem}.variants>div{display:grid;gap:.75rem}</style>
