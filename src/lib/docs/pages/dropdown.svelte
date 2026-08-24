<script lang="ts">
	import DemoSection from '../DemoSection.svelte';
	import { Dropdown, DropdownGroup, DropdownItem, DropdownSeparator } from '$lib/registry/ui/dropdown';
	let selection = $state('None');
</script>
<div class="page-heading"><p class="eyebrow">Component</p><h1>Dropdown</h1><p>Click or hover menus with soft accent bands and accessible menu semantics.</p></div>
<DemoSection title="Click menu" source={'<Dropdown><DropdownItem>...</DropdownItem></Dropdown>'}>
	<Dropdown color="primary">
		{#snippet children()}<span class="trigger">Open actions</span>{/snippet}
		{#snippet content()}<DropdownGroup label="Workspace"><DropdownItem onSelect={() => selection = 'Profile'}>Profile</DropdownItem><DropdownItem disabled>Unavailable</DropdownItem></DropdownGroup><DropdownSeparator /><DropdownItem danger onSelect={() => selection = 'Delete'}>Delete</DropdownItem>{/snippet}
	</Dropdown><span>Selected: {selection}</span>
</DemoSection>
<DemoSection title="Hover and placement" source={'<Dropdown trigger="hover" placement="right">...</Dropdown>'}>
	<Dropdown trigger="hover" placement="right" color="success">{#snippet children()}<span class="trigger">Hover actions</span>{/snippet}{#snippet content()}<DropdownItem>Duplicate</DropdownItem><DropdownItem>Archive</DropdownItem>{/snippet}</Dropdown>
</DemoSection>
<style>.trigger { border: 0; border-radius: var(--rx-radius); padding: .7rem 1rem; color: rgb(var(--rx-light)); background: rgb(var(--rx-primary)); font-weight: 650; }</style>
