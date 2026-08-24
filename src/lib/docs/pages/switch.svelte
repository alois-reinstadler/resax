<script lang="ts">
	import { Check, X } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Switch } from '$lib/registry/ui/switch';
	let enabled = $state(false);
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Switch</h1><p>Pill and square toggles with sliding thumbs, state content, and loading feedback.</p></div>
<DemoSection title="Colors and sizes"><div class="toggle-demo-row" data-demo-section="colors-sizes"><Switch checked size="lg" aria-label="Large switch"/><Switch checked color="success" aria-label="Success switch"/><Switch checked color="danger" size="sm" aria-label="Small switch"/></div></DemoSection>
<DemoSection title="Shapes and binding"><div class="toggle-demo-row" data-demo-section="shapes"><Switch bind:checked={enabled} aria-label="Bound switch"/><span>{enabled ? 'Enabled' : 'Disabled'}</span><Switch shape="square" checked aria-label="Square switch"/></div></DemoSection>
<DemoSection title="Inner content"><div class="toggle-demo-row" data-demo-section="inner-content"><Switch checked aria-label="Icon switch">{#snippet on()}<Check size={11}/>{/snippet}{#snippet off()}<X size={11}/>{/snippet}</Switch><Switch checked aria-label="Text switch">{#snippet on()}ON{/snippet}{#snippet off()}OFF{/snippet}</Switch></div></DemoSection>
<DemoSection title="Loading and disabled"><div class="toggle-demo-row" data-demo-section="inactive"><Switch loading checked aria-label="Loading switch"/><Switch disabled aria-label="Disabled switch"/></div></DemoSection>
