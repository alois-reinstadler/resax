<script lang="ts">
	import { Bell, CircleCheck, TriangleAlert } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Button } from '$lib/registry/ui/button';
	import { notify, type NotifyHandle, type NotifyPosition, type NotifyVariant, type NotifySurface } from '$lib/registry/ui/notification';
	const variants: NotifyVariant[] = ['base', 'banner', 'card', 'glow', 'inline', 'snackbar'];
	const positions: NotifyPosition[] = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'];
	const surfaces: NotifySurface[] = ['solid', 'fluent', 'outline', 'glass'];
	let active: NotifyHandle | undefined;
	function updateDemo() {
		active = notify({ title: 'Uploading', text: 'Preparing your files…', duration: 0, progress: true, color: 'primary' });
		setTimeout(() => active?.update({ title: 'Upload complete', text: 'Your files are ready.', color: 'success', duration: 4000 }), 1200);
	}
</script>

{#snippet warningIcon()}<TriangleAlert size={18} />{/snippet}
{#snippet successIcon()}<CircleCheck size={18} />{/snippet}
{#snippet bellContent()}<span class="snippet-message"><Bell size={18} /> Custom snippet content</span>{/snippet}

<div class="page-heading"><p class="eyebrow">Component</p><h1>Notification</h1><p>Source notification systems: springing goo pills, top banners, stacked cards, pulsing glow, inline notices, and bottom snackbars.</p></div>
<DemoSection title="Variants and colors" source={`notify({ text: 'Saved', variant: 'card', color: 'success' })`}><div class="button-demo-row" data-demo-section="variants">{#each variants as variant}<Button size="sm" color={variant === 'snackbar' ? 'dark' : 'primary'} onclick={() => notify({ title: variant, text: 'Notification preview', variant, color: variant === 'snackbar' ? 'dark' : 'success' })}>{variant}</Button>{/each}</div></DemoSection>
<DemoSection title="Positions"><div class="button-demo-row" data-demo-section="positions">{#each positions as position}<Button size="sm" variant="border" onclick={() => notify({ text: position, position })}>{position}</Button>{/each}</div></DemoSection>
<DemoSection title="Goo surfaces and roundness" source={`notify({ title: 'Saved', text: 'Changes persisted', surface: 'glass', roundness: 20 })`}><div class="button-demo-row" data-demo-section="surfaces">{#each surfaces as surface}<Button size="sm" variant="flat" style="color:color-mix(in srgb,rgb(var(--rx-color)) 20%,rgb(var(--rx-text)))" onclick={() => notify({ title: surface, text: 'Hover to expand the morphing body.', surface, roundness: surface==='glass'?22:16, position:'top-center', duration:5000 })}>{surface}</Button>{/each}</div></DemoSection>
<DemoSection title="Source states, descriptions, and actions" source={`notify({ state: 'info', title: 'Message sent', description: 'Delivered', action: { label: 'Undo', onClick: undo } })`}><div class="button-demo-row" data-demo-section="source-api"><Button color="success" onclick={() => notify.success({ title: 'Changes saved', description: 'The source success state supplies its icon.' })}>Success</Button><Button color="danger" onclick={() => notify.error({ title: 'Could not save', description: 'Try again in a moment.' })}>Error</Button><Button color="warn" onclick={() => notify.loading({ title: 'Uploading', description: 'This source loading state is sticky.' })}>Loading</Button><Button onclick={() => notify({ state: 'info', title: 'Message sent', description: 'The action dismisses after it runs.', variant: 'snackbar', action: { label: 'Undo', onClick: () => undefined } })}>Snackbar action</Button></div></DemoSection>
<DemoSection title="Sticky, progress, and snippets"><div class="button-demo-row" data-demo-section="timing"><Button color="dark" onclick={() => notify({ title: 'Sticky warning', text: 'Close this manually.', duration: 0, color: 'warn', icon: warningIcon })}>Sticky</Button><Button color="primary" onclick={() => notify({ text: 'Publishing…', progress: true, duration: 6000, color: 'success', icon: successIcon })}>Progress</Button><Button onclick={() => notify({ content: bellContent, duration: 3000 })}>Snippet content</Button></div></DemoSection>
<DemoSection title="Update and close handles"><div class="button-demo-row" data-demo-section="handles"><Button onclick={updateDemo}>Create then update</Button><Button color="danger" variant="border" onclick={() => active?.close()}>Close active</Button></div></DemoSection>
<DemoSection title="Queue and outlet" source={'<NotificationOutlet />\nnotify({ text: "Ready" });'}><div class="button-demo-row" data-demo-section="queue"><Button variant="flat" style="color:color-mix(in srgb,rgb(var(--rx-color)) 20%,rgb(var(--rx-text)))" onclick={() => { for (let index = 1; index <= 8; index += 1) notify({ text: `Queue item ${index}`, duration: 7000 }); }}>Queue eight</Button></div><p class="demo-note">Mount one <code>NotificationOutlet</code> near the application root. Each position shows at most six notifications; overflow waits until space opens.</p></DemoSection>
<style>.snippet-message { display: inline-flex; align-items: center; gap: .5rem; }</style>
