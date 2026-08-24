<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { ContextMenu, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuSub } from '$lib/registry/ui/context-menu';
	let action = $state('Right-click the panel');
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Context Menu</h1><p>Right-click actions with groups, destructive states, and one-level submenus.</p></div>
<DemoSection title="Context actions and submenu" source={'<ContextMenu><ContextMenuSub label="Share">...</ContextMenuSub></ContextMenu>'}>
	<ContextMenu color="primary">
		{#snippet children()}<div class="target">{action}</div>{/snippet}
		{#snippet content()}<ContextMenuGroup label="Document"><ContextMenuItem onSelect={() => action = 'Opened'}>Open</ContextMenuItem><ContextMenuItem disabled>Locked</ContextMenuItem></ContextMenuGroup><ContextMenuSub label="Share"><ContextMenuItem onSelect={() => action = 'Link copied'}>Copy link</ContextMenuItem><ContextMenuItem>Email</ContextMenuItem></ContextMenuSub><ContextMenuSeparator /><ContextMenuItem danger onSelect={() => action = 'Deleted'}>Delete</ContextMenuItem>{/snippet}
	</ContextMenu>
</DemoSection>
<style>.target { display: grid; min-height: 12rem; place-items: center; border: 1px dashed rgb(var(--rx-primary) / .45); border-radius: var(--rx-radius); color: rgb(var(--rx-text) / .65); background: rgb(var(--rx-primary) / .06); user-select: none; }</style>
