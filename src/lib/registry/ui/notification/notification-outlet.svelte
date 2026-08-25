<script lang="ts">
	import { onMount } from 'svelte';
	import Notification from './notification.svelte';
	import { notificationState, registerNotificationOutlet, type NotifyPosition } from './notify.svelte';
	const positions: NotifyPosition[] = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
	const stacks = $derived(positions.map((position) => {
		const items = notificationState.items.filter((item) => item.position === position && !item.target);
		return { position, items: position.startsWith('top') ? items.slice(0, 6).reverse() : items.slice(0, 6) };
	}));
	const targetedItems = $derived(notificationState.items.filter((item) => item.target));
	onMount(registerNotificationOutlet);
	function portal(node: HTMLElement) { document.body.append(node); return () => node.remove(); }
	function portalTo(target: HTMLElement) { return (node: HTMLElement) => { target.append(node); return () => node.remove(); }; }
</script>

<div class="rx-notification-outlet" {@attach portal}>
	{#each stacks as stack (stack.position)}
		<section class="rx-notification-stack rx-notification-stack--{stack.position}" aria-live="polite" aria-label={`${stack.position} notifications`}>
			{#each stack.items as item (item.id)}<Notification {item} />{/each}
		</section>
	{/each}
	{#each targetedItems as item (item.id)}
		<div class="rx-notification-target" {@attach portalTo(item.target!)}><Notification {item} /></div>
	{/each}
</div>

<style>
	.rx-notification-outlet { position: fixed; inset: 0; z-index: 1000; pointer-events: none; }
	.rx-notification-stack { position: absolute; display: flex; gap: 12px; padding: 20px; }
	.rx-notification-stack--top-left, .rx-notification-stack--top-center, .rx-notification-stack--top-right { top: 0; flex-direction: column; }
	.rx-notification-stack--bottom-left, .rx-notification-stack--bottom-center, .rx-notification-stack--bottom-right { bottom: 0; flex-direction: column; }
	.rx-notification-stack--top-left, .rx-notification-stack--bottom-left { left: 0; align-items: flex-start; }
	.rx-notification-stack--top-right, .rx-notification-stack--bottom-right { right: 0; align-items: flex-end; }
	.rx-notification-stack--top-center, .rx-notification-stack--bottom-center { left: 50%; align-items: center; transform: translateX(-50%); }
	.rx-notification-target { position: relative; display: block; width: 100%; max-width: 480px; pointer-events: none; }
</style>
