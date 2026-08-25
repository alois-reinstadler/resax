<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { InputOtp } from '$lib/registry/ui/input-otp';
	let value = $state(''); let flip = $state('123456'); let status = $state('Enter all six digits');
	const variants = ['base','dots','filled','flip','glow','underline'] as const;
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>OTP</h1><p>Six paste-friendly cell treatments, preserving the original pop, split-flap, aura, and underline choreography.</p></div>
<DemoSection title="All source variants" item="input-otp" source={'<InputOtp variant="glow" bind:value />'}>
	<div class="gallery" data-demo-section="variants">{#each variants as variant}<label><span>{variant}</span><InputOtp {variant} value={variant === 'dots' ? '1234' : '123'} length={4} /></label>{/each}</div>
</DemoSection>
<DemoSection title="Paste, keyboard, and completion" item="input-otp" source={'<InputOtp bind:value onComplete={...} />'}>
	<div data-demo-section="interactive"><InputOtp bind:value autoFocus onComplete={(code) => status = `Completed: ${code}`} /><p>{status}</p><p class="demo-note">Each cell is a native one-character input: the base variant uses the browser caret, supports paste distribution, and advances focus.</p></div>
</DemoSection>
<DemoSection title="Replay the split-flap" item="input-otp">
	<div class="row" data-demo-section="flip"><InputOtp variant="flip" bind:value={flip} /><button class="demo-action" onclick={() => flip = flip === '123456' ? '907231' : '123456'}>Change code</button></div>
</DemoSection>
<DemoSection title="Radii, sizes, and masking" item="input-otp"><div class="gallery" data-demo-section="shape"><InputOtp value="2481" length={4} radius="subtle" size="sm" /><InputOtp value="2481" length={4} radius="pill" /><InputOtp value="secret" type="text" masked radius="squircle" size="lg" /></div></DemoSection>
<DemoSection title="Tone, validation, and disabled" item="input-otp"><div class="gallery" data-demo-section="states"><InputOtp variant="filled" value="4829" length={4} state="success" /><InputOtp variant="underline" value="120" length={4} state="danger" /><InputOtp variant="glow" value="7391" length={4} disabled /></div></DemoSection>

<style>.gallery{display:flex;flex-wrap:wrap;align-items:flex-end;gap:1.5rem}.gallery label{display:grid;gap:.6rem}.gallery label>span{text-transform:capitalize;color:rgb(var(--rx-text-secondary));font-size:.78rem}.row{display:flex;flex-wrap:wrap;align-items:center;gap:1rem}.demo-note{color:rgb(var(--rx-text-secondary));font-size:.82rem}.demo-action{padding:.55rem .8rem;border:1px solid rgb(var(--rx-border));border-radius:.6rem;color:rgb(var(--rx-text));background:rgb(var(--rx-surface-2));cursor:pointer}</style>
