<script lang="ts" module>
	import type { Snippet } from 'svelte'; import type { RxColor } from '$lib/registry/lib/color';
	export interface ScrollbarProps { orientation?:'vertical'|'horizontal'|'both'; color?:RxColor; variant?:'default'|'dots'|'glow'|'gradient'|'minimal'|'rounded'; size?:'sm'|'default'|'lg'; hideDelay?:number; children:Snippet; }
</script>
<script lang="ts">
	import * as ScrollArea from '$lib/components/ui/scroll-area/index.js'; import { styleColor } from '$lib/registry/lib/color'; import { RX_DURATION } from '$lib/registry/lib/easing';
	let {orientation='vertical',color,variant='default',size='default',hideDelay=600,children}:ScrollbarProps=$props();
</script>
<ScrollArea.Root {orientation} class="rx-scrollbar rx-scrollbar--{variant} rx-scrollbar--{size}" type="scroll" scrollHideDelay={hideDelay} style={`${styleColor(color)??'--rx-color:var(--rx-primary)'};--rx-duration:${RX_DURATION.base}ms`}>
	{@render children()}
</ScrollArea.Root>
<style>
	:global(.rx-scrollbar){position:relative;overflow:hidden}:global(.rx-scrollbar [data-scroll-area-viewport]){width:100%;height:100%;border-radius:inherit}:global(.rx-scrollbar [data-orientation=vertical]){width:10px}:global(.rx-scrollbar [data-orientation=horizontal]){height:10px}:global(.rx-scrollbar--sm [data-orientation=vertical]){width:6px}:global(.rx-scrollbar--sm [data-orientation=horizontal]){height:6px}:global(.rx-scrollbar--lg [data-orientation=vertical]){width:14px}:global(.rx-scrollbar--lg [data-orientation=horizontal]){height:14px}:global(.rx-scrollbar [data-scroll-area-thumb]){border-radius:999px;background:rgb(var(--rx-color)/.65);transition:opacity var(--rx-duration)}:global(.rx-scrollbar--minimal [data-scroll-area-thumb]){background:rgb(var(--rx-text)/.28)}:global(.rx-scrollbar--glow [data-scroll-area-thumb]){box-shadow:0 0 10px rgb(var(--rx-color)/.7)}:global(.rx-scrollbar--gradient [data-scroll-area-thumb]){background:linear-gradient(rgb(var(--rx-color)),hsl(from rgb(var(--rx-color)) calc(h + 48) s l))}:global(.rx-scrollbar--dots [data-scroll-area-thumb]){background:radial-gradient(circle,rgb(var(--rx-color)) 1.5px,transparent 2px) center/6px 6px}:global(.rx-scrollbar--rounded){border-radius:calc(var(--rx-radius)*1.2)}@media(prefers-reduced-motion:reduce){:global(.rx-scrollbar [data-scroll-area-thumb]){transition:none}}
</style>
