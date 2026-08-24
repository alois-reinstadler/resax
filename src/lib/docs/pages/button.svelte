<script lang="ts">
	import { Heart, Plus } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Button } from '$lib/registry/ui/button';
	import type { RxColor } from '$lib/registry/lib/color';

	const colors: RxColor[] = ['primary', 'success', 'danger', 'warn', 'dark'];
	const variants = ['default', 'flat', 'border', 'gradient', 'shadow', 'relief', 'transparent'] as const;
</script>

<div class="page-heading">
	<p class="eyebrow">Component</p>
	<h1>Button</h1>
	<p>Actions with Vuesax-inspired color, depth, motion, and icon treatments.</p>
</div>

{#each variants as variant}
	<DemoSection title={`Variant: ${variant}`} source={`<Button variant="${variant}" color="primary">Primary</Button>`}>
		<div class="button-demo-row" data-demo-section={`variant-${variant}`}>
			{#each colors as color}<Button {variant} {color}>{color}</Button>{/each}
		</div>
	</DemoSection>
{/each}

<DemoSection title="Arbitrary colors" source={'<Button color="#7d33ff">Hex</Button>'}>
	<div class="button-demo-row" data-demo-section="arbitrary-colors">
		<Button color="#7d33ff">Hex #7d33ff</Button>
		<Button color="rgb(12, 156, 132)" variant="flat">RGB value</Button>
	</div>
</DemoSection>

<DemoSection title="Sizes">
	<div class="button-demo-row" data-demo-section="sizes">
		<Button size="xl">Extra large</Button><Button size="lg">Large</Button><Button>Default</Button><Button size="sm">Small</Button><Button size="mini">Mini</Button>
	</div>
</DemoSection>

<DemoSection title="Shapes">
	<div class="button-demo-row" data-demo-section="shapes">
		<Button shape="circle" aria-label="Favorite"><span class="sr-only">Favorite</span>{#snippet icon()}<Heart size={18} />{/snippet}</Button>
		<Button shape="square" color="success" aria-label="Add"><span class="sr-only">Add</span>{#snippet icon()}<Plus size={18} />{/snippet}</Button>
		<Button variant="flat">{#snippet icon()}<Heart size={16} />{/snippet}Favorite</Button>
	</div>
</DemoSection>

<DemoSection title="Effects">
	<div class="button-demo-row" data-demo-section="effects"><Button effect="glow">Glow</Button><Button effect="pulse" color="danger">Pulse</Button></div>
</DemoSection>

<DemoSection title="Loading">
	<div class="button-demo-row" data-demo-section="loading"><Button loading>Saving changes</Button><Button loading variant="flat" color="success">Publishing</Button></div>
</DemoSection>

<DemoSection title="Block">
	<div class="button-demo-block" data-demo-section="block"><Button block>Full-width action</Button></div>
</DemoSection>

<DemoSection title="Floating action">
	<div class="button-demo-row" data-demo-section="floating"><Button floating shape="circle" aria-label="Add item"><span class="sr-only">Add item</span>{#snippet icon()}<Plus size={19} />{/snippet}</Button></div>
</DemoSection>

<DemoSection title="Anchor">
	<div class="button-demo-row" data-demo-section="anchor"><Button href="#button-link-target">Go to target</Button><span id="button-link-target">Anchor target</span></div>
</DemoSection>

<DemoSection title="Ripple disabled">
	<div class="button-demo-row" data-demo-section="ripple-off"><Button ripple={false} variant="border">No ripple</Button></div>
</DemoSection>
