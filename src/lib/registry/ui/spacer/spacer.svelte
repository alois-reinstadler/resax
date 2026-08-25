<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	export interface SpacerProps extends HTMLAttributes<HTMLDivElement> { size?:'none'|'xs'|'sm'|'md'|'lg'|'xl'|number|string; flex?:number; demo?:boolean; width?: string; height?: string; grow?: boolean; }
</script>
<script lang="ts">
	import { cn } from '$lib/utils.js';
	let { size, flex = 1, demo = false, width, height, grow = false, class: className, style, ...rest }: SpacerProps = $props();
	const sizes:Record<string,string>={none:'0',xs:'4px',sm:'8px',md:'16px',lg:'24px',xl:'40px'};
	const resolvedSize=$derived(size==null?undefined:typeof size==='number'?`${size}px`:sizes[size]??(/^[-\d.]+$/.test(size)?`${size}px`:size));
	const spacerStyle = $derived([`--rx-spacer-flex:${Math.max(0,flex)}`,resolvedSize?`--rx-spacer-size:${resolvedSize}`:'',width?`width:${width}`:'',height?`height:${height}`:'',grow?'flex-grow:1':'',typeof style==='string'?style:''].filter(Boolean).join(';'));
</script>
<div {...rest} class={cn('rx-spacer',resolvedSize&&'is-sized',demo&&'is-demo',className)} style={spacerStyle} aria-hidden="true"><span></span></div>
<style>.rx-spacer{display:block;box-sizing:border-box;flex:var(--rx-spacer-flex,1) 1 0%;align-self:stretch}.rx-spacer.is-sized{flex:0 0 var(--rx-spacer-size,0)}.rx-spacer>span{display:none}.rx-spacer.is-demo{width:100%;min-width:220px}.rx-spacer.is-demo>span{display:block;width:100%;height:100%;min-height:32px;border-radius:6px;background:repeating-linear-gradient(45deg,rgb(var(--rx-border)) 0 6px,transparent 6px 12px)}</style>
