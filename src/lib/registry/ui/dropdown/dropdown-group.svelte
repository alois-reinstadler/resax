<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface DropdownGroupProps { label: string; children: Snippet; }
</script>
<script lang="ts">
	import * as DropdownBase from '$lib/components/ui/dropdown-menu/index.js';
	let { label, children }: DropdownGroupProps = $props();
</script>
<DropdownBase.Group><DropdownBase.GroupHeading class="rx-menu__group-label">{label}</DropdownBase.GroupHeading>{@render children()}</DropdownBase.Group>
