<script lang="ts">
	import { Bell, CircleCheck, TriangleAlert } from '@lucide/svelte';
	import DemoSection from '../DemoSection.svelte';
	import { Button } from '$lib/registry/ui/button';
	import { notify, type NotifyHandle, type NotifyPosition, type NotifyVariant } from '$lib/registry/ui/notification';
	const variants: NotifyVariant[] = ['default', 'banner', 'card', 'glow', 'inline', 'snackbar'];
	const positions: NotifyPosition[] = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'];
	let active: NotifyHandle | undefined;
	function updateDemo() {
		active = notify({ title: 'Uploading', text: 'Preparing your files…', duration: 0, progress: true, color: 'primary' });
		setTimeout(() => active?.update({ title: 'Upload complete', text: 'Your files are ready.', color: 'success', duration: 4000 }), 1200);
	}
</script>

{#snippet warningIcon()}<TriangleAlert size={18} />{/snippet}
{#snippet successIcon()}<CircleCheck size={18} />{/snippet}
{#snippet bellContent()}<span class="snippet-message"><Bell size={18} /> Custom snippet content</span>{/snippet}

<div class="page-heading"><p class="eyebrow">Component</p><h1>Notification</h1><p>Imperative, queued notifications with six Vuesax-inspired variants and independent position stacks.</p></div>
<DemoSection title="Variants and colors" source={`notify({ text: 'Saved', variant: 'card', color: 'success' })`}><div class="button-demo-row" data-demo-section="variants">{#each variants as variant}<Button size="sm" color={variant === 'glow' ? 'primary' : variant === 'snackbar' ? 'dark' : 'success'} onclick={() => notify({ title: variant, text: 'Notification preview', variant, color: variant === 'snackbar' ? 'dark' : 'success' })}>{variant}</Button>{/each}</div></DemoSection>
<DemoSection title="Positions"><div class="button-demo-row" data-demo-section="positions">{#each positions as position}<Button size="sm" variant="border" onclick={() => notify({ text: position, position })}>{position}</Button>{/each}</div></DemoSection>
<DemoSection title="Sticky, progress, and snippets"><div class="button-demo-row" data-demo-section="timing"><Button color="warn" onclick={() => notify({ title: 'Sticky warning', text: 'Close this manually.', duration: 0, icon: warningIcon })}>Sticky</Button><Button color="success" onclick={() => notify({ text: 'Publishing…', progress: true, duration: 6000, icon: successIcon })}>Progress</Button><Button onclick={() => notify({ content: bellContent, duration: 3000 })}>Snippet content</Button></div></DemoSection>
<DemoSection title="Update and close handles"><div class="button-demo-row" data-demo-section="handles"><Button onclick={updateDemo}>Create then update</Button><Button color="danger" variant="border" onclick={() => active?.close()}>Close active</Button></div></DemoSection>
<DemoSection title="Queue and outlet" source={'<NotificationOutlet />\nnotify({ text: "Ready" });'}><div class="button-demo-row" data-demo-section="queue"><Button variant="flat" onclick={() => { for (let index = 1; index <= 8; index += 1) notify({ text: `Queue item ${index}`, duration: 7000 }); }}>Queue eight</Button></div><p class="demo-note">Mount one <code>NotificationOutlet</code> near the application root. Each position shows at most six notifications; overflow waits until space opens.</p></DemoSection>
<style>.snippet-message { display: inline-flex; align-items: center; gap: .5rem; }</style>
