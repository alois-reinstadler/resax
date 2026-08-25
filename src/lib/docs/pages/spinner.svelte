<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Spinner } from '$lib/registry/ui/spinner';
	import type { SpinnerSize, SpinnerType } from '$lib/registry/ui/spinner';

	const spinnerTypes: SpinnerType[] = ['default', 'bars', 'bounce', 'comet', 'dots', 'flip', 'grid', 'orbit', 'pulse', 'ring', 'wave'];
	const spinnerSizes: SpinnerSize[] = ['xl', 'lg', 'default', 'sm', 'mini'];
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Spinner</h1><p>Resax visual primitive with theme-token styling.</p></div>

<DemoSection title="Source variants" source={'<Spinner type="wave" />'}><div class="demo-grid" data-demo-section="spinner-source-variants">{#each spinnerTypes as type}<div class="demo-item"><Spinner {type} /><code>{type}</code></div>{/each}</div></DemoSection>
<DemoSection title="Sizes and colors" source={'<Spinner size="lg" color="success" />'}><div class="demo-row">{#each spinnerSizes as size}<Spinner {size} color={size === 'lg' ? '#8b5cf6' : 'success'} />{/each}</div></DemoSection>
<DemoSection title="Base ring controls" source={'<Spinner variant="dual" thickness={5} track={false} />'}><div class="demo-row" data-demo-section="spinner-base-controls"><Spinner variant="arc" /><Spinner variant="dual" thickness={4} color="success" /><Spinner variant="gradient" thickness={5} track={false} color="warn" /></div></DemoSection>
<DemoSection title="Overlay and backdrop blur" source={'<Spinner overlay label="Loading preview" />'}><div class="overlay-demo" data-demo-section="spinner-overlay"><span>Content beneath the source overlay</span><Spinner overlay variant="gradient" label="Loading preview" /></div></DemoSection>
<DemoSection title="Accessible status text" source={'<Spinner>{#snippet text()}Synchronizing{/snippet}</Spinner>'}><Spinner color="primary">{#snippet text()}Synchronizing{/snippet}</Spinner></DemoSection>

<style>
	.demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr)); gap: 2rem; width: 100%; }
	.demo-row { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
	.demo-item { display: grid; place-items: center; gap: .75rem; min-width: 5rem; }
	.overlay-demo{position:relative;display:grid;min-height:10rem;place-items:center;width:100%;overflow:hidden;border:1px solid rgb(var(--rx-border));border-radius:var(--rx-radius);background:linear-gradient(135deg,rgb(var(--rx-primary)/.18),rgb(var(--rx-surface)))}
</style>
