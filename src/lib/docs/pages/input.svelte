<script lang="ts">
	import { Lock, Mail, User } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Input } from '$lib/registry/ui/input';
	let programmed = $state('Programmatic value');
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Input</h1><p>Native text fields with animated labels, validation, icons, and Vuesax-inspired depth.</p></div>

<DemoSection title="Variants"><div class="demo-grid" data-demo-section="variants"><Input label="Default" /><Input variant="shadow" label="Shadow" /><Input variant="border" label="Border" /></div></DemoSection>
<DemoSection title="Floating labels"><div class="demo-grid" data-demo-section="floating-labels"><Input label="Inside label" bind:value={programmed} /><Input label="Label placeholder" labelPlaceholder /></div></DemoSection>
<DemoSection title="States and messages"><div class="demo-grid" data-demo-section="states"><Input state="success" label="Email" value="hello@resax.dev" message="Email valid" /><Input state="danger" label="Name" message="Required" /><Input state="warn" label="Password" type="password" message="Use at least 12 characters" /></div></DemoSection>
<DemoSection title="Icons"><div class="demo-grid" data-demo-section="icons"><Input label="Username">{#snippet icon()}<User size={17} />{/snippet}</Input><Input label="Email" iconAfter>{#snippet icon()}<Mail size={17} />{/snippet}</Input><Input label="Password" type="password">{#snippet icon()}<Lock size={17} />{/snippet}</Input></div></DemoSection>
<DemoSection title="Loading and sizes"><div class="demo-grid" data-demo-section="loading"><Input loading label="Checking availability" /><Input size="lg" label="Large" /><Input size="sm" label="Small" /></div></DemoSection>
