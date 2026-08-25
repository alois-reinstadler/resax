<script lang="ts">
	import { Bell, Check } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Button } from '$lib/registry/ui/button';
	import { Indicator } from '$lib/registry/ui/indicator';
	const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;
	const sourceVariants = ['base','bounce','odometer','ping','ring','shake'] as const;
	let liveCount = $state(8);
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Indicator</h1><p>Small status markers for controls, avatars, and standalone presence signals.</p></div>

<DemoSection title="Variants" source={'<Indicator variant="pulse"><Button>Updates</Button></Indicator>'}>
	<div class="indicator-row" data-demo-section="variants">
		<Indicator><span class="avatar">AV</span></Indicator>
		<Indicator variant="ring" color="primary"><span class="avatar">RN</span></Indicator>
		<Indicator variant="pulse"><Button variant="flat">Online</Button></Indicator>
		<Indicator variant="count" color="danger" content="9+"><Button>Inbox</Button></Indicator>
		<Indicator variant="odometer" color="primary" content={42}><Button variant="flat">Updates</Button></Indicator>
		<Indicator variant="icon" color="success">{#snippet icon()}<Check size={13} />{/snippet}<Button variant="border">Synced</Button></Indicator>
		<Indicator variant="border" color="warn"><span class="avatar">BD</span></Indicator>
	</div>
</DemoSection>

<DemoSection title="Source interaction variants"><div class="indicator-row" data-demo-section="source-variants">{#each sourceVariants as variant}<div class="source-item"><Indicator {variant} content={variant==='odometer'?42:undefined}><span class="avatar">RX</span></Indicator><code>{variant}</code></div>{/each}</div></DemoSection>

<DemoSection title="Count morph and odometer roll" source={'<Indicator count={count} max={99} showZero pulse />'}><div class="indicator-row" data-demo-section="indicator-count-morph"><Indicator count={liveCount} max={99} showZero pulse color="danger"><Button>Inbox</Button></Indicator><Indicator variant="odometer" count={liveCount} max={99} roll={620} color="primary"><Button variant="flat">Updates</Button></Indicator><Button size="sm" onclick={() => liveCount = liveCount >= 105 ? 0 : liveCount + 1}>Increment ({liveCount})</Button></div></DemoSection>

<DemoSection title="Positions">
		<div class="indicator-row" data-demo-section="positions">{#each positions as position}<Indicator {position} color="danger"><Button shape="circle" aria-label={position}><span class="sr-only">{position}</span>{#snippet icon()}<Bell size={17} />{/snippet}</Button></Indicator>{/each}</div>
</DemoSection>

<DemoSection title="Offset on circular content">
	<div class="indicator-row" data-demo-section="offset"><Indicator offset variant="pulse"><span class="avatar avatar-round">ON</span></Indicator><Indicator offset position="bottom-right" color="warn"><span class="avatar avatar-round">AW</span></Indicator></div>
</DemoSection>

<DemoSection title="Standalone">
	<div class="indicator-row" data-demo-section="standalone"><Indicator aria-label="Available" /><Indicator variant="ring" color="primary" aria-label="Away" /><Indicator variant="pulse" color="danger" aria-label="Busy" /><Indicator variant="count" content={4} aria-label="Four notifications" /></div>
</DemoSection>

<style>
	.indicator-row { display: flex; flex-wrap: wrap; align-items: center; gap: 2rem; padding: .75rem; }
	.avatar { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: var(--rx-radius); background: rgb(var(--rx-gray)); color: rgb(var(--rx-text)); font-weight: 700; }
	.avatar-round { border-radius: 9999px; }
	.source-item{display:grid;justify-items:center;gap:.75rem}
</style>
