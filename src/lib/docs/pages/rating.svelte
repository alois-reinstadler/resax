<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Rating } from '$lib/registry/ui/rating';
	let star = $state(3.5); let bars = $state(3); let emoji = $state(4); let glow = $state(3.5); let hearts = $state(4); let numbers = $state(2); let hovered = $state<number | null>(null);
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Rating</h1><p>Six source renderers with fractional fills, pointer ripples, column rises, emoji bounce, neon pulse, heartbeat, and 3D chips.</p></div>
<DemoSection title="Base — fractional star and pointer ripple" source={'<Rating variant="base" halves clearable showValue bind:value />'}><div data-demo-section="base"><Rating variant="base" bind:value={star} halves clearable showValue /><p>Rating: {star}</p></div></DemoSection>
<DemoSection title="Bars and emoji" source={'<Rating variant="bars" flat={false} />\n<Rating variant="emoji" grayscale />'}>
	<div class="gallery" data-demo-section="alternate"><label><span>Rising bars</span><Rating variant="bars" bind:value={bars} halves showValue /></label><label><span>Emoji scale</span><Rating variant="emoji" bind:value={emoji} grayscale showValue /></label></div>
</DemoSection>
<DemoSection title="Glow and hearts" source={'<Rating variant="glow" intensity="high" />\n<Rating variant="hearts" beat="strong" />'}>
	<div class="gallery" data-demo-section="effects"><label><span>Neon pulse</span><Rating variant="glow" bind:value={glow} halves intensity="high" showValue color="success" /></label><label><span>Strong heartbeat</span><Rating variant="hearts" bind:value={hearts} beat="strong" clearable color="danger" /></label></div>
</DemoSection>
<DemoSection title="3D number chips" source={'<Rating variant="numbers" shape="circle" />'}><div class="gallery" data-demo-section="numbers"><Rating variant="numbers" bind:value={numbers} showValue /><Rating variant="numbers" value={4} shape="circle" color="primary" /></div></DemoSection>
<DemoSection title="Source icon presets and hover callback" source={'<Rating icon="heart" onHover={(value) => ...} />'}><div class="gallery" data-demo-section="icon-presets"><Rating value={3} icon="heart" color="danger" onHover={(value) => hovered=value} /><Rating value={2.5} halves icon="circle" color="success" onHover={(value) => hovered=value} /><output>Hover: {hovered ?? 'none'}</output></div></DemoSection>
<DemoSection title="Sizes and states"><div class="gallery" data-demo-section="states"><Rating value={4} size="sm" readonly /><Rating variant="hearts" value={3} size="lg" /><Rating variant="glow" value={2} disabled color="danger" /></div></DemoSection>

<style>.gallery{display:flex;flex-wrap:wrap;align-items:center;gap:2rem}.gallery label{display:grid;gap:.8rem}.gallery label>span{color:rgb(var(--rx-text-secondary));font-size:.78rem}</style>
