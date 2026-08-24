<script lang="ts">import DemoSection from '../DemoSection.svelte'; import { Rating } from '$lib/registry/ui/rating'; let value = $state(3); let half = $state(3.5);</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Rating</h1><p>Keyboard-friendly ratings with hover previews and half-star precision.</p></div>
<DemoSection title="Interactive" source={'<Rating bind:value />'}><div data-demo-section="interactive"><Rating bind:value /><p>Rating: {value}</p></div></DemoSection>
<DemoSection title="Half stars"><div data-demo-section="halves"><Rating bind:value={half} halves color="primary" size="lg" /><p>Rating: {half}</p></div></DemoSection>
<DemoSection title="States"><div class="row" data-demo-section="states"><Rating value={4} readonly /><Rating value={2} disabled color="danger" /></div></DemoSection>
<style>.row { display:flex; flex-wrap:wrap; gap:2rem; }</style>
