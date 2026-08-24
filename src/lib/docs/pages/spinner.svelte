<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Spinner } from '$lib/registry/ui/spinner';
	import type { SpinnerSize, SpinnerType } from '$lib/registry/ui/spinner';

	const spinnerTypes: SpinnerType[] = ['default', 'waves', 'corners', 'border', 'points', 'square', 'gradient', 'rectangle', 'circles', 'scale'];
	const spinnerSizes: SpinnerSize[] = ['xl', 'lg', 'default', 'sm', 'mini'];
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Spinner</h1><p>Resax visual primitive with theme-token styling.</p></div>

<DemoSection title="Variants" source={'<Spinner type="waves" />'}><div class="demo-grid">{#each spinnerTypes as type}<div class="demo-item"><Spinner {type} /><code>{type}</code></div>{/each}</div></DemoSection>
<DemoSection title="Sizes and colors" source={'<Spinner size="lg" color="success" />'}><div class="demo-row">{#each spinnerSizes as size}<Spinner {size} color={size === 'lg' ? '#8b5cf6' : 'success'} />{/each}</div></DemoSection>

<style>
	.demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr)); gap: 2rem; width: 100%; }
	.demo-row { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
	.demo-item { display: grid; place-items: center; gap: .75rem; min-width: 5rem; }
</style>
