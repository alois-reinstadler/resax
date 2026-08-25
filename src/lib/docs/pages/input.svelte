<script lang="ts">
	import { Lock, Mail, User } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Input } from '$lib/registry/ui/input';
	let programmed = $state('Programmatic value');
	const variants = ['default', 'shadow', 'border', 'filled', 'gradient-border', 'pulse', 'spotlight', 'underline'] as const;
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Input</h1><p>Native text fields with animated labels, validation, icons, and Vuesax-inspired depth.</p></div>

<DemoSection title="Variants" source={'<Input variant="spotlight" color="primary" label="Spotlight" />'}><div class="demo-grid" data-demo-section="variants">{#each variants as variant}<Input {variant} color={variant === 'gradient-border' ? 'success' : 'primary'} label={variant} />{/each}</div></DemoSection>
<DemoSection title="Floating labels and actions"><div class="demo-grid" data-demo-section="floating-labels"><Input label="Inside label" bind:value={programmed} clearable /><Input label="Label placeholder" labelPlaceholder /><Input label="Reveal password" type="password" value="source-parity" /></div></DemoSection>
<DemoSection title="States and messages"><div class="demo-grid" data-demo-section="states"><Input state="success" label="Email" value="hello@resax.dev" message="Email valid" /><Input state="danger" label="Name" message="Required" /><Input state="warn" label="Password" type="password" message="Use at least 12 characters" /></div></DemoSection>
<DemoSection title="Icons"><div class="demo-grid" data-demo-section="icons"><Input label="Username">{#snippet icon()}<User size={17} />{/snippet}</Input><Input label="Email" iconAfter>{#snippet icon()}<Mail size={17} />{/snippet}</Input><Input label="Password" type="password">{#snippet icon()}<Lock size={17} />{/snippet}</Input></div></DemoSection>
<DemoSection title="Loading and sizes"><div class="demo-grid" data-demo-section="loading"><Input loading label="Checking availability" /><Input size="lg" label="Large" /><Input size="sm" label="Small" /></div></DemoSection>
