<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Separator } from '$lib/registry/ui/separator';
	import type { SeparatorVariant } from '$lib/registry/ui/separator';

	const separatorVariants: SeparatorVariant[] = ['base', 'solid', 'dashed', 'dotted', 'flow', 'glow', 'gradient', 'icon', 'zigzag'];
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Separator</h1><p>Resax visual primitive with theme-token styling.</p></div>

<DemoSection title="Source variants and colors" source={'<Separator variant="flow" tone="danger" speed={1.2} />'}><div class="demo-stack">{#each separatorVariants as variant}<code>{variant}</code><Separator {variant} tone={variant==='glow'?'success':'default'}>{#if variant==='icon'}{#snippet children()}Milestone{/snippet}{/if}</Separator>{/each}</div></DemoSection>
<DemoSection title="Label and orientation" source={'<Separator variant="zigzag" labelPosition="start">Continue</Separator>'}><Separator variant="gradient" labelPosition="start">{#snippet children()}Continue{/snippet}</Separator><div class="vertical-demo"><span>Left</span><Separator orientation="vertical" variant="flow" tone="success">{#snippet children()}or{/snippet}</Separator><span>Right</span></div></DemoSection>

<style>
	.vertical-demo { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
	.demo-stack { display: grid; gap: 1rem; width: 100%; }
	.vertical-demo { height: 4rem; justify-content: center; margin-top: 2rem; }
</style>
