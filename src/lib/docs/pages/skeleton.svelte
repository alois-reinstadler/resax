<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Skeleton } from '$lib/registry/ui/skeleton';
	import type { SkeletonShape, SkeletonVariant } from '$lib/registry/ui/skeleton';

	const skeletonVariants: SkeletonVariant[] = ['base', 'pulse', 'wave', 'shine', 'gradient', 'blink'];
	const skeletonShapes: SkeletonShape[] = ['rect', 'text', 'title', 'circle', 'avatar'];
	let loading = $state(true);
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Skeleton</h1><p>Resax visual primitive with theme-token styling.</p></div>

<DemoSection title="Animation variants" source={'<Skeleton variant="wave" class="h-20" />'}><div class="demo-stack">{#each skeletonVariants as variant}<div><code>{variant}</code><Skeleton {variant} class="demo-skeleton" /></div>{/each}</div></DemoSection>
<DemoSection title="Shape presets" source={'<Skeleton shape="avatar" />'}><div class="demo-row">{#each skeletonShapes as shape}<div class="demo-item"><Skeleton {shape} /><code>{shape}</code></div>{/each}</div></DemoSection>
<DemoSection title="Loading toggle" source={'<Skeleton {loading}>Loaded content</Skeleton>'}><button class="demo-button" onclick={() => loading = !loading}>Toggle loading</button><Skeleton {loading} class="demo-skeleton">{#snippet children()}<p data-demo-marker="skeleton-loaded">The content has loaded.</p>{/snippet}</Skeleton></DemoSection>
<DemoSection title="Stagger and direction"><div class="demo-stack" data-demo-section="skeleton-stagger">{#each [0,1,2] as index}<Skeleton variant="wave" {index} shape="text" />{/each}<Skeleton variant="gradient" direction="rtl" angle={115}/></div></DemoSection>

<style>
	.demo-row { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
	.demo-stack { display: grid; gap: 1rem; width: 100%; }
	.demo-item { display: grid; place-items: center; gap: .75rem; min-width: 5rem; }
	:global(.demo-skeleton) { width: 100%; }
	.demo-button { border: 1px solid rgb(var(--rx-gray)); border-radius: var(--rx-radius); padding: .5rem .8rem; color: rgb(var(--rx-text)); background: rgb(var(--rx-background)); }
</style>
