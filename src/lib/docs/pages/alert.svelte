<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Alert } from '$lib/registry/ui/alert';
	import { Button } from '$lib/registry/ui/button';
	import type { RxColor } from '$lib/registry/lib/color';
	const variants = ['default', 'banner', 'inline', 'neon', 'split', 'toast'] as const;
	const colors: RxColor[] = ['primary', 'success', 'danger'];
	let open = $state(true);
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Alert</h1><p>Contextual feedback with soft, split, neon, banner, inline, and toast treatments.</p></div>
{#each variants as variant}<DemoSection title={`Variant: ${variant}`} source={`<Alert variant="${variant}" title="Update">Message</Alert>`}><div class="alert-stack" data-demo-section={`variant-${variant}`}>{#each colors as color}<Alert {variant} {color} title={`${color} update`}>A clear and useful feedback message.</Alert>{/each}</div></DemoSection>{/each}
<DemoSection title="Arbitrary color"><Alert color="#7d33ff" title="Custom accent">Any supported CSS color can set the accent.</Alert></DemoSection>
<DemoSection title="Custom icon"><Alert color="warn" title="Attention">{#snippet icon()}<span aria-hidden="true">!</span>{/snippet}The icon snippet accepts any compact visual.</Alert></DemoSection>
<DemoSection title="Closable and controlled"><div class="alert-stack" data-demo-section="open-toggle"><Button size="sm" onclick={() => open = !open}>{open ? 'Close alert' : 'Open alert'}</Button><Alert closable bind:open title="Controlled alert">Dismiss this alert and restore it with the button.</Alert></div></DemoSection>
<DemoSection title="Timed banner and toast"><div class="alert-stack" data-demo-section="timed"><Alert variant="banner" dismissAfter={10000} title="Deployment in progress">The source timeout rail runs from left to right.</Alert><Alert variant="toast" dismissAfter={10000} title="Changes saved">Toast entry combines blur, lift, and scale.</Alert></div></DemoSection>
<style>.alert-stack { display: grid; gap: 1rem; width: 100%; }</style>
