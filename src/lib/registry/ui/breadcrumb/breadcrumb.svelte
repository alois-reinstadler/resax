<script lang="ts" module>
	import type { Snippet } from 'svelte'; import type { RxColor } from '$lib/registry/lib/color';
	export interface BreadcrumbItem { label:string; href?:string; icon?:Snippet; disabled?:boolean }
	export interface BreadcrumbProps { items:BreadcrumbItem[]; color?:RxColor; variant?:'default'|'arrow'|'pill'|'slash'|'glow'; maxItems?:number; separator?:string|Snippet; onNavigate?:(item:BreadcrumbItem,index:number)=>void }
</script>
<script lang="ts">
	import * as Menu from '$lib/components/ui/dropdown-menu'; import { styleColor } from '$lib/registry/lib/color';
	let{items,color,variant='default',maxItems,separator,onNavigate}:BreadcrumbProps=$props();
	const limit=$derived(maxItems===undefined?undefined:Math.max(3,maxItems)); const collapsed=$derived(limit!==undefined&&items.length>limit); const head=$derived(collapsed?items.slice(0,1):items); const hidden=$derived(collapsed?items.slice(1,items.length-(limit!-2)):[]); const tail=$derived(collapsed?items.slice(items.length-(limit!-2)):items.slice(1));
	function choose(item:BreadcrumbItem,index:number,e?:MouseEvent){if(item.disabled){e?.preventDefault();return}onNavigate?.(item,index)}
	function actualIndex(index:number){return collapsed?items.length-tail.length+index:index+1}
	const sep=$derived(variant==='slash'?'/':'›');
</script>
<nav aria-label="Breadcrumb" class="rx-breadcrumb" data-variant={variant} style={styleColor(color)??'--rx-color:var(--rx-primary)'}><ol>
	{#each head as item,index}<li class="rx-item">{#if item.href}<a href={item.href} aria-disabled={item.disabled?'true':undefined} onclick={(e)=>choose(item,index,e)}>{#if item.icon}{@render item.icon()}{/if}{item.label}</a>{:else}<span>{item.label}</span>{/if}</li>{/each}
	{#if collapsed}<li class="rx-sep" aria-hidden="true">{#if typeof separator==='function'}{@render separator()}{:else}{separator??sep}{/if}</li><li>
		<Menu.Root><Menu.Trigger aria-label="Show collapsed breadcrumb items"><span class="rx-more">•••</span></Menu.Trigger><Menu.Content align="start">{#each hidden as item,i}<Menu.Item disabled={item.disabled} onSelect={()=>choose(item,i+1)}>{item.label}</Menu.Item>{/each}</Menu.Content></Menu.Root>
	</li>{/if}
	{#each tail as item,index}<li class="rx-sep" aria-hidden="true">{#if typeof separator==='function'}{@render separator()}{:else}{separator??sep}{/if}</li><li class="rx-item">{#if actualIndex(index)===items.length-1}<span aria-current="page">{#if item.icon}{@render item.icon()}{/if}{item.label}</span>{:else if item.href}<a href={item.href} aria-disabled={item.disabled?'true':undefined} onclick={(e)=>choose(item,actualIndex(index),e)}>{#if item.icon}{@render item.icon()}{/if}{item.label}</a>{:else}<button disabled={item.disabled} onclick={()=>choose(item,actualIndex(index))}>{item.label}</button>{/if}</li>{/each}
</ol></nav>
<style>.rx-breadcrumb ol{display:flex;align-items:center;flex-wrap:wrap;gap:.45rem;margin:0;padding:0;list-style:none}.rx-item a,.rx-item span,.rx-item button,.rx-more{display:inline-flex;align-items:center;gap:.35rem;border:0;border-radius:calc(var(--rx-radius)*.7);padding:.4rem .55rem;color:rgb(var(--rx-text)/.68);background:transparent;font:inherit;text-decoration:none}.rx-item a:hover,.rx-item button:hover{color:rgb(var(--rx-color));background:rgb(var(--rx-color)/.1)}.rx-item [aria-current=page]{color:rgb(var(--rx-text));font-weight:700}.rx-sep{color:rgb(var(--rx-text)/.35)}[data-variant=pill] .rx-item>*{border-radius:999px;background:rgb(var(--rx-color)/.1)}[data-variant=arrow] .rx-sep{color:rgb(var(--rx-color));font-weight:800}[data-variant=glow] .rx-item [aria-current=page]{box-shadow:0 0 18px hsl(from rgb(var(--rx-color)) h s l/.25)}[aria-disabled=true]{pointer-events:none;opacity:.45}.rx-more{cursor:pointer}@media(prefers-reduced-motion:reduce){.rx-breadcrumb *{transition:none!important}}</style>
