<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface ContextMenuSubProps { label: string; children: Snippet; }
</script>
<script lang="ts">
	import * as ContextBase from '$lib/components/ui/context-menu/index.js';
	let { label, children }: ContextMenuSubProps = $props();
</script>
<ContextBase.Sub>
	<ContextBase.SubTrigger class="rx-context-menu__sub-trigger">{label}</ContextBase.SubTrigger>
	<ContextBase.SubContent class="rx-context-menu__sub">{@render children()}</ContextBase.SubContent>
</ContextBase.Sub>
