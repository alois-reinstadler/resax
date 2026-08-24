<script lang="ts">
	import DemoSection from '$lib/docs/DemoSection.svelte';
	import ButtonPage from '$lib/docs/ButtonPage.svelte';
	import { Spinner } from '$lib/registry/ui/spinner';
	import type { SpinnerSize, SpinnerType } from '$lib/registry/ui/spinner';
	import { Skeleton } from '$lib/registry/ui/skeleton';
	import type { SkeletonShape, SkeletonVariant } from '$lib/registry/ui/skeleton';
	import { Separator } from '$lib/registry/ui/separator';
	import type { SeparatorVariant } from '$lib/registry/ui/separator';
	import { Spacer } from '$lib/registry/ui/spacer';
	let { data }: { data: { slug: string } } = $props();
	const title = $derived(data.slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '));
	const spinnerTypes: SpinnerType[] = ['default', 'waves', 'corners', 'border', 'points', 'square', 'gradient', 'rectangle', 'circles', 'scale'];
	const spinnerSizes: SpinnerSize[] = ['xl', 'lg', 'default', 'sm', 'mini'];
	const skeletonVariants: SkeletonVariant[] = ['pulse', 'wave', 'shine', 'gradient', 'blink'];
	const skeletonShapes: SkeletonShape[] = ['rect', 'text', 'title', 'circle', 'avatar'];
	const separatorVariants: SeparatorVariant[] = ['solid', 'dashed', 'dotted', 'gradient'];
	let loading = $state(true);
</script>

<svelte:head><title>{title} — Resax</title></svelte:head>
{#if data.slug === 'button'}
	<ButtonPage />
{:else}
<div class="page-heading"><p class="eyebrow">Component</p><h1>{title}</h1><p>Resax visual primitive with theme-token styling.</p></div>

{#if data.slug === 'spinner'}
	<DemoSection title="Variants" source={'<Spinner type="waves" />'}><div class="demo-grid">{#each spinnerTypes as type}<div class="demo-item"><Spinner {type} /><code>{type}</code></div>{/each}</div></DemoSection>
	<DemoSection title="Sizes and colors" source={'<Spinner size="lg" color="success" />'}><div class="demo-row">{#each spinnerSizes as size}<Spinner {size} color={size === 'lg' ? '#8b5cf6' : 'success'} />{/each}</div></DemoSection>
{:else if data.slug === 'skeleton'}
	<DemoSection title="Animation variants" source={'<Skeleton variant="wave" class="h-20" />'}><div class="demo-stack">{#each skeletonVariants as variant}<div><code>{variant}</code><Skeleton {variant} class="demo-skeleton" /></div>{/each}</div></DemoSection>
	<DemoSection title="Shape presets" source={'<Skeleton shape="avatar" />'}><div class="demo-row">{#each skeletonShapes as shape}<div class="demo-item"><Skeleton {shape} /><code>{shape}</code></div>{/each}</div></DemoSection>
	<DemoSection title="Loading toggle" source={'<Skeleton {loading}>Loaded content</Skeleton>'}><button class="demo-button" onclick={() => loading = !loading}>Toggle loading</button><Skeleton {loading} class="demo-skeleton">{#snippet children()}<p data-demo-marker="skeleton-loaded">The content has loaded.</p>{/snippet}</Skeleton></DemoSection>
{:else if data.slug === 'separator'}
	<DemoSection title="Variants and colors" source={'<Separator variant="dashed" color="danger" />'}><div class="demo-stack">{#each separatorVariants as variant}<code>{variant}</code><Separator {variant} color={variant === 'dotted' ? '#8b5cf6' : undefined} />{/each}</div></DemoSection>
	<DemoSection title="Label and orientation" source={'<Separator>Continue</Separator>'}><Separator>{#snippet children()}Continue{/snippet}</Separator><div class="vertical-demo"><span>Left</span><Separator orientation="vertical" color="success" /><span>Right</span></div></DemoSection>
{:else if data.slug === 'spacer'}
	<DemoSection title="Fixed and flexible spacing" source={'<Spacer width="2rem" />'}><div class="spacer-demo"><span>Fixed</span><Spacer width="3rem" height="1rem" /><span>gap</span></div><div class="spacer-demo"><span>Flexible</span><Spacer grow /><span>edge</span></div></DemoSection>
{:else}
	<DemoSection title="Preview"><p class="coming-soon">Coming soon in a later Resax phase.</p></DemoSection>
{/if}
{/if}

<style>
	.demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr)); gap: 2rem; width: 100%; }
	.demo-row, .vertical-demo, .spacer-demo { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
	.demo-stack { display: grid; gap: 1rem; width: 100%; }
	.demo-item { display: grid; place-items: center; gap: .75rem; min-width: 5rem; }
	:global(.demo-skeleton) { width: 100%; }
	.demo-button { border: 1px solid rgb(var(--rx-gray)); border-radius: var(--rx-radius); padding: .5rem .8rem; color: rgb(var(--rx-text)); background: rgb(var(--rx-background)); }
	.vertical-demo { height: 4rem; justify-content: center; margin-top: 2rem; }
	.spacer-demo { padding: .75rem; border: 1px solid rgb(var(--rx-gray)); border-radius: var(--rx-radius); }
</style>
