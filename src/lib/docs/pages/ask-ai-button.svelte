<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { AskAiButton } from '$lib/registry/ui/ask-ai-button';
	let loading = $state(false);
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Ask AI Button</h1><p>The source seven-field mesh with pointer parallax, specular light, press ripples, twinkles, and loading sheen.</p></div>
<DemoSection title="Interactive mesh" source={'<AskAiButton label="Ask AI" speed={14} glow={60} />'}><div class="button-demo-row" data-demo-section="ask-ai-interactive"><AskAiButton label="Ask Resax" /><AskAiButton label="Fast fields" speed={5} glow={90} color="#f0879b" /></div></DemoSection>
<DemoSection title="Loading choreography" source={'<AskAiButton loading label="Thinking" />'}><div class="button-demo-row" data-demo-section="ask-ai-loading"><AskAiButton {loading} label={loading ? 'Thinking' : 'Toggle loading'} onclick={() => loading = !loading}/><button type="button" onclick={() => loading = !loading}>Toggle state</button></div></DemoSection>
<DemoSection title="Sizes and radii"><div class="button-demo-row" data-demo-section="ask-ai-props"><AskAiButton size="sm" radius="subtle" label="Small"/><AskAiButton radius="pill" label="Pill"/><AskAiButton size="lg" radius="squircle" label="Large"/></div></DemoSection>
