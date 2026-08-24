<script lang="ts" module>
	import type { Snippet } from 'svelte'; import type { RxColor } from '$lib/registry/lib/color';
	export interface DockItem { id:string; label:string; icon:Snippet; href?:string; disabled?:boolean; onSelect?:()=>void; }
	export interface DockProps { items:DockItem[]; color?:RxColor; variant?:'default'|'aurora'|'bounce'|'glass'|'gooey'|'magnet'|'neon'; placement?:'top'|'bottom'|'left'|'right'; magnification?:number; distance?:number; onSelect?:(item:DockItem)=>void; }
</script>
<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color'; import { RX_DURATION,RX_EASE } from '$lib/registry/lib/easing';
	let {items,color,variant='default',placement='bottom',magnification=1.55,distance=110,onSelect}:DockProps=$props();
	function proximity(node:HTMLElement){function move(e:PointerEvent){const vertical=placement==='left'||placement==='right';for(const el of node.querySelectorAll<HTMLElement>('.rx-dock__item')){const r=el.getBoundingClientRect(),center=vertical?r.top+r.height/2:r.left+r.width/2,d=Math.abs((vertical?e.clientY:e.clientX)-center),scale=1+(magnification-1)*Math.max(0,1-d/distance);el.style.setProperty('--rx-dock-scale',String(scale));}}function reset(){for(const el of node.querySelectorAll<HTMLElement>('.rx-dock__item'))el.style.removeProperty('--rx-dock-scale')}node.addEventListener('pointermove',move);node.addEventListener('pointerleave',reset);return()=>{node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',reset)}}
	function choose(item:DockItem,e:MouseEvent){if(item.disabled){e.preventDefault();return}item.onSelect?.();onSelect?.(item)}
</script>
<nav class="rx-dock rx-dock--{variant} rx-dock--{placement}" aria-label="Application dock" style={`${styleColor(color)??'--rx-color:var(--rx-primary)'};--rx-duration:${RX_DURATION.base}ms;--rx-ease:${RX_EASE}`} {@attach proximity}>
	{#each items as item(item.id)}<a class="rx-dock__item" href={item.href??'#'} aria-label={item.label} title={item.label} aria-disabled={item.disabled?'true':undefined} tabindex={item.disabled?-1:undefined} onclick={(e)=>choose(item,e)}><span aria-hidden="true">{@render item.icon()}</span><span class="rx-dock__label">{item.label}</span></a>{/each}
</nav>
<style>
	.rx-dock{display:flex;align-items:center;gap:.45rem;width:max-content;padding:.55rem;border:1px solid rgb(var(--rx-text)/.09);border-radius:calc(var(--rx-radius)*1.6);background:rgb(var(--rx-bg)/.88);box-shadow:0 14px 38px rgb(var(--rx-dark)/var(--rx-shadow-opacity));backdrop-filter:blur(16px)}.rx-dock--left,.rx-dock--right{flex-direction:column}
	.rx-dock__item{position:relative;display:grid;place-items:center;width:2.75rem;height:2.75rem;border-radius:calc(var(--rx-radius)*.9);color:rgb(var(--rx-text));background:rgb(var(--rx-text)/.06);text-decoration:none;transform:scale(var(--rx-dock-scale,1));transition:transform var(--rx-duration) var(--rx-ease),box-shadow var(--rx-duration)}.rx-dock__item:focus-visible{outline:3px solid rgb(var(--rx-color)/.3)}.rx-dock__item[aria-disabled=true]{opacity:.4}.rx-dock__label{position:absolute;bottom:calc(100% + .5rem);padding:.25rem .45rem;border-radius:.35rem;color:rgb(var(--rx-light));background:rgb(var(--rx-dark));font-size:.7rem;opacity:0;pointer-events:none}.rx-dock__item:is(:hover,:focus-visible) .rx-dock__label{opacity:1}
	.rx-dock--glass{background:rgb(var(--rx-light)/.18)}.rx-dock--neon{box-shadow:0 0 26px rgb(var(--rx-color)/.38)}.rx-dock--aurora{background:linear-gradient(135deg,rgb(var(--rx-color)/.18),hsl(from rgb(var(--rx-color)) calc(h + 80) s l/.18),rgb(var(--rx-bg)/.9))}.rx-dock--gooey{filter:drop-shadow(0 10px 18px rgb(var(--rx-color)/.2))}.rx-dock--bounce .rx-dock__item:hover{animation:rx-dock-bounce .45s var(--rx-ease)}@keyframes rx-dock-bounce{50%{translate:0 -7px}}
	@media (pointer:coarse),(prefers-reduced-motion:reduce){.rx-dock__item{transform:none!important;transition:none}.rx-dock--bounce .rx-dock__item:hover{animation:none}}
</style>
