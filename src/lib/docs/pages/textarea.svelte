<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Textarea } from '$lib/registry/ui/textarea';
	let bio = $state('Resax brings Vuesax-inspired components to Svelte 5.');
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Textarea</h1><p>Multi-line fields with floating labels, validation, counters, and content-aware growth.</p></div>
<DemoSection title="Variants"><div class="demo-grid" data-demo-section="variants"><Textarea label="Default" /><Textarea variant="shadow" label="Shadow" /><Textarea variant="border" label="Border" /></div></DemoSection>
<DemoSection title="Labels and states"><div class="demo-grid" data-demo-section="states"><Textarea label="Biography" bind:value={bio} /><Textarea label="Feedback" labelPlaceholder state="success" message="Ready to submit" /><Textarea label="Required note" state="danger" message="Please add a note" /></div></DemoSection>
<DemoSection title="Auto resize"><div data-demo-section="autoresize"><Textarea label="Growing field" autoResize value="Type more lines here…" /><p class="demo-note">This field grows vertically as its content wraps or gains new lines.</p></div></DemoSection>
<DemoSection title="Character counter"><div data-demo-section="counter"><Textarea label="Short summary" maxlength={120} value="A concise summary" /></div></DemoSection>
