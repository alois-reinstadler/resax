<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Separator } from '$lib/registry/ui/separator';
	import type { SeparatorVariant } from '$lib/registry/ui/separator';

	const separatorVariants: SeparatorVariant[] = ['solid', 'dashed', 'dotted', 'gradient'];
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Separator</h1><p>Resax visual primitive with theme-token styling.</p></div>

<DemoSection title="Variants and colors" source={'<Separator variant="dashed" color="danger" />'}><div class="demo-stack">{#each separatorVariants as variant}<code>{variant}</code><Separator {variant} color={variant === 'dotted' ? '#8b5cf6' : undefined} />{/each}</div></DemoSection>
<DemoSection title="Label and orientation" source={'<Separator>Continue</Separator>'}><Separator>{#snippet children()}Continue{/snippet}</Separator><div class="vertical-demo"><span>Left</span><Separator orientation="vertical" color="success" /><span>Right</span></div></DemoSection>

<style>
	.vertical-demo { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
	.demo-stack { display: grid; gap: 1rem; width: 100%; }
	.vertical-demo { height: 4rem; justify-content: center; margin-top: 2rem; }
</style>
