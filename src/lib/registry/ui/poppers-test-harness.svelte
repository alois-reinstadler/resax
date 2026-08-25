<script lang="ts">
	import { Tooltip } from './tooltip';
	import { Dropdown, DropdownItem } from './dropdown';
	import { ContextMenu, ContextMenuItem } from './context-menu';
	let { hover = false }: { hover?: boolean } = $props();
	let dropdownOpen = $state(false);
	let selected = $state<string[]>([]);
</script>

<Tooltip content="Helpful detail"><span>Focusable help</span></Tooltip>
<Dropdown bind:open={dropdownOpen} trigger={hover ? 'hover' : 'click'}>
	{#snippet children()}<span>{hover ? 'Hover actions' : 'Actions'}</span>{/snippet}
	{#snippet content()}
		<DropdownItem value="enabled" selected badge="Pro" onSelect={() => selected.push('enabled')}>Enabled action</DropdownItem>
		<DropdownItem disabled onSelect={() => selected.push('disabled')}>Disabled action</DropdownItem>
	{/snippet}
</Dropdown>
<ContextMenu>
	{#snippet children()}<div>Context target</div>{/snippet}
	{#snippet content()}<ContextMenuItem value="context" selected shortcut="⌘K" onSelect={() => selected.push('context')}>Context action</ContextMenuItem>{/snippet}
</ContextMenu>
<output aria-label="dropdown open">{dropdownOpen}</output>
<output aria-label="selections">{selected.join(',')}</output>
