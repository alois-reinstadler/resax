<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Progress } from '$lib/registry/ui/progress';
	const variants = ['default', 'glow', 'gradient', 'striped', 'segments'] as const;
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Progress</h1><p>Accessible line and circular progress with expressive Vuesax-inspired treatments.</p></div>

<DemoSection title="Values and labels" source={'<Progress value={60} label />'}>
	<div class="progress-stack" data-demo-section="values">
		{#each [15, 45, 75, 100] as value}<Progress {value} label />{/each}
	</div>
</DemoSection>
<DemoSection title="Custom maximum"><div class="progress-stack"><Progress value={3} max={5} label /><span>Three of five complete</span></div></DemoSection>

<DemoSection title="Variants">
	<div class="progress-stack" data-demo-section="variants">
		{#each variants as variant}<div class="sample"><span>{variant}</span><Progress value={68} {variant} color={variant === 'glow' ? 'success' : 'primary'} /></div>{/each}
	</div>
</DemoSection>

<DemoSection title="Indeterminate">
	<div class="progress-stack" data-demo-section="indeterminate"><Progress aria-label="Loading" /><Progress variant="striped" color="warn" aria-label="Loading" /></div>
</DemoSection>

<DemoSection title="Sizes">
	<div class="progress-stack" data-demo-section="sizes"><Progress value={55} size="lg" /><Progress value={55} /><Progress value={55} size="sm" /></div>
</DemoSection>

<DemoSection title="Circular">
	<div class="circle-row" data-demo-section="circles">
		<Progress shape="circle" value={25} size="sm" label /><Progress shape="circle" value={60} variant="glow" color="success" label />
		<Progress shape="circle" value={82} size="lg" variant="gradient">{#snippet label()}Ready{/snippet}</Progress><Progress shape="circle" aria-label="Loading" />
	</div>
</DemoSection>

<style>
	.progress-stack { display: grid; gap: 1.25rem; width: min(100%, 42rem); }
	.sample { display: grid; grid-template-columns: 5.5rem 1fr; align-items: center; gap: 1rem; text-transform: capitalize; }
	.circle-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
</style>
