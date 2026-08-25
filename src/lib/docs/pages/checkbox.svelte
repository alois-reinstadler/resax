<script lang="ts">
	import DemoSection from '../DemoSection.svelte'; import { Checkbox } from '$lib/registry/ui/checkbox';
	let bound=$state(false),indeterminate=$state(true),base=$state(false),bounce=$state(false),fill=$state(false),flip=$state(false),neon=$state(true),card=$state(false);
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Checkbox</h1><p>Liquid ripples, spring labels, fill, flip, neon, bounce, and selectable-card treatments.</p></div>
<DemoSection title="Base liquid interaction" source={'<Checkbox variant="base" glow bind:checked>Press the box and label</Checkbox>'}><div class="toggle-demo-row"><Checkbox variant="base" glow bind:checked={base}>Press the box and label</Checkbox><Checkbox bind:indeterminate>Indeterminate</Checkbox></div></DemoSection>
<DemoSection title="Animated variants"><div class="variant-grid"><Checkbox variant="bounce" bind:checked={bounce}>Bounce + ping</Checkbox><Checkbox variant="fill" bind:checked={fill} color="success">Center fill</Checkbox><Checkbox variant="flip" bind:checked={flip} color="warn">3D flip</Checkbox><Checkbox variant="neon" bind:checked={neon}>Neon bloom</Checkbox></div></DemoSection>
<DemoSection title="Selectable card"><Checkbox variant="card" bind:checked={card} color="success">Pro plan{#snippet description()}Advanced collaboration and history{/snippet}</Checkbox></DemoSection>
<DemoSection title="Radii, sizes, and states"><div class="toggle-demo-row"><Checkbox checked size="lg" radius="pill">Large pill</Checkbox><Checkbox checked color="danger" size="sm" radius="none">Sharp</Checkbox><Checkbox bind:checked={bound} lineThrough>Bound: {bound?'on':'off'}</Checkbox><Checkbox disabled>Disabled</Checkbox></div></DemoSection>
<style>.variant-grid{display:flex;align-items:flex-start;gap:1.5rem;flex-wrap:wrap}</style>
