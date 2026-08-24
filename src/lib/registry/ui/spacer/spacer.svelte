<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	export interface SpacerProps extends HTMLAttributes<HTMLDivElement> { width?: string; height?: string; grow?: boolean; }
</script>
<script lang="ts">
	import { cn } from '$lib/utils.js';
	let { width, height, grow = false, class: className, style, ...rest }: SpacerProps = $props();
	const spacerStyle = $derived([width ? `width: ${width}` : '', height ? `height: ${height}` : '', grow ? 'flex-grow: 1' : '', typeof style === 'string' ? style : ''].filter(Boolean).join('; '));
</script>
<div {...rest} class={cn('rx-spacer', className)} style={spacerStyle} aria-hidden="true"></div>
