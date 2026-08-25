<script lang="ts">
	import DemoSection from '../DemoSection.svelte'; import { Badge } from '$lib/registry/ui/badge'; import type { RxColor } from '$lib/registry/lib/color';
	const variants = ['default', 'glow', 'gradient', 'pulse', 'shimmer', 'stripes'] as const; const colors: RxColor[] = ['primary', 'success', 'danger'];
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Badge</h1><p>Compact counts and status indicators, standalone or overlaid.</p></div>
{#each variants as variant}<DemoSection title={`Variant: ${variant}`} source={`<Badge variant="${variant}" content="12" />`}><div class="badge-row" data-demo-section={`variant-${variant}`}>{#each colors as color}<Badge {variant} {color} content={color}/>{/each}</div></DemoSection>{/each}
<DemoSection title="Dots and arbitrary color"><div class="badge-row" data-demo-section="dots"><Badge dot color="success"/><Badge dot color="danger" variant="pulse"/><Badge content="New" color="#7d33ff"/></div></DemoSection>
<DemoSection title="Soft, solid, and outline treatments"><div class="badge-row" data-demo-section="appearances">{#each ['soft','solid','outline'] as appearance}<Badge appearance={appearance as 'soft'|'solid'|'outline'} variant="gradient" content={appearance}/>{/each}</div></DemoSection>
<DemoSection title="Overlay positions"><div class="badge-row" data-demo-section="overlay">{#each ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as position}<Badge content="4" position={position as 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'}><span class="badge-target">Inbox</span></Badge>{/each}</div></DemoSection>
<style>.badge-row { display: flex; flex-wrap: wrap; align-items: center; gap: 2rem; }.badge-target { display: grid; width: 4.5rem; height: 3rem; place-items: center; border-radius: var(--rx-radius); background: rgb(var(--rx-surface-2)); font-size: .8rem; }</style>
