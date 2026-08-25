<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Textarea } from '$lib/registry/ui/textarea';
	let bio = $state('Resax brings Vuesax-inspired components to Svelte 5.');
	const variants = ['default', 'shadow', 'border', 'filled', 'gradient-border', 'pulse', 'spotlight', 'underline', 'code'] as const;
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Textarea</h1><p>Multi-line fields with floating labels, validation, counters, and content-aware growth.</p></div>
<DemoSection title="Variants" source={'<Textarea variant="code" color="primary" label="Code" />'}><div class="demo-grid" data-demo-section="variants">{#each variants as variant}<Textarea {variant} color={variant === 'gradient-border' ? 'success' : 'primary'} label={variant} value={variant === 'code' ? 'const resax = "Svelte 5";' : ''} />{/each}</div></DemoSection>
<DemoSection title="Labels and states"><div class="demo-grid" data-demo-section="states"><Textarea label="Biography" bind:value={bio} /><Textarea label="Feedback" labelPlaceholder state="success" message="Ready to submit" /><Textarea label="Required note" state="danger" message="Please add a note" /></div></DemoSection>
<DemoSection title="Auto resize"><div data-demo-section="autoresize"><Textarea label="Growing field" autoResize value="Type more lines here…" /><p class="demo-note">This field grows vertically as its content wraps or gains new lines.</p></div></DemoSection>
<DemoSection title="Source field controls" source={'<Textarea clearable resize="horizontal" glow block labelMaxChars={28} />'}><div class="demo-grid" data-demo-section="field-controls"><Textarea clearable resize="horizontal" glow label="Clearable horizontal field" value="Use the source clear action" /><Textarea resize="none" block label="Fixed field" value="Resize is disabled" /></div></DemoSection>
<DemoSection title="Character counter"><div data-demo-section="counter"><Textarea label="Short summary" maxlength={120} value="A concise summary" /></div></DemoSection>
<DemoSection title="Sizes"><div class="demo-grid"><Textarea size="lg" label="Large" /><Textarea label="Default size" /><Textarea size="sm" label="Small" /></div></DemoSection>
