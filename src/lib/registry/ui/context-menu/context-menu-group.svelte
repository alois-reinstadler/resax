<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface ContextMenuGroupProps { label: string; children: Snippet; }
</script>
<script lang="ts">
	import * as ContextBase from '$lib/components/ui/context-menu/index.js';
	let { label, children }: ContextMenuGroupProps = $props();
</script>
<ContextBase.Group><ContextBase.GroupHeading class="rx-context-menu__group-label">{label}</ContextBase.GroupHeading>{@render children()}</ContextBase.Group>
