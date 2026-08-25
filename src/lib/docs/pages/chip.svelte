<script lang="ts">
	import { User } from '@lucide/svelte'; import DemoSection from '../DemoSection.svelte'; import { Chip } from '$lib/registry/ui/chip'; import type { RxColor } from '$lib/registry/lib/color';
	const variants = ['default', 'flat', 'border', 'bounce', 'fill', 'glow', 'gradient', 'outline'] as const; const colors: RxColor[] = ['primary', 'success', 'danger']; let closed = $state(false);let selected=$state(true);
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Chip</h1><p>Small labels for choices, people, filters, and dismissible metadata.</p></div>
{#each variants as variant}<DemoSection title={`Variant: ${variant}`} source={`<Chip variant="${variant}">Label</Chip>`}><div class="chip-row" data-demo-section={`variant-${variant}`}>{#each colors as color}<Chip {variant} {color}>{color}</Chip>{/each}</div></DemoSection>{/each}
<DemoSection title="Sizes"><div class="chip-row" data-demo-section="sizes"><Chip size="lg">Large</Chip><Chip>Default</Chip><Chip size="sm">Small</Chip></div></DemoSection>
<DemoSection title="Icons and arbitrary color"><div class="chip-row"><Chip color="#7d33ff">{#snippet icon()}<User size={15}/>{/snippet}Profile</Chip><Chip variant="flat">{#snippet icon()}<User size={15}/>{/snippet}Member</Chip></div></DemoSection>
<DemoSection title="Closable"><div class="chip-row" data-demo-section="closable">{#if !closed}<Chip closable onClose={() => closed = true}>Dismiss me</Chip>{:else}<button onclick={() => closed = false}>Restore chip</button>{/if}<Chip closable disabled>Disabled</Chip></div></DemoSection>
<DemoSection title="Selected choreography"><div class="chip-row" data-demo-section="selected">{#each ['bounce','fill','glow','gradient','outline'] as variant}<Chip variant={variant as 'bounce'|'fill'|'glow'|'gradient'|'outline'} selectable bind:selected>{variant}</Chip>{/each}</div></DemoSection>
<style>.chip-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }</style>
