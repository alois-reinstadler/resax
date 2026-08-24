<script lang="ts" module>
	import type {Snippet} from 'svelte'; import type {HTMLAnchorAttributes} from 'svelte/elements'; import type {RxColor} from '$lib/registry/lib/color';
	export interface NavMenuItem {label:string;href?:string;icon?:Snippet;description?:string;children?:NavMenuItem[];content?:Snippet;}
	export interface NavMenuProps {items:NavMenuItem[];value?:string;color?:RxColor;variant?:'default'|'glow'|'mega'|'pill'|'spotlight'|'underline';orientation?:'horizontal'|'vertical';onValueChange?:(value:string)=>void;}
</script>
<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js'; import {styleColor} from '$lib/registry/lib/color'; import {RX_DURATION,RX_EASE} from '$lib/registry/lib/easing';
	let {items,value=$bindable(''),color,variant='default',orientation='horizontal',onValueChange}:NavMenuProps=$props();
	function changed(next:string){value=next;onValueChange?.(next)}
</script>
<NavigationMenu.Root {value} orientation={orientation} onValueChange={changed} class="rx-nav rx-nav--{variant} rx-nav--{orientation}" style={`${styleColor(color)??'--rx-color:var(--rx-primary)'};--rx-duration:${RX_DURATION.base}ms;--rx-ease:${RX_EASE}`}>
	<NavigationMenu.List class="rx-nav__list">
	{#each items as item,i(item.label)}<NavigationMenu.Item value={`item-${i}`}>
		{#if item.children?.length||item.content}<NavigationMenu.Trigger class="rx-nav__trigger">{#if item.icon}<span aria-hidden="true">{@render item.icon()}</span>{/if}{item.label}</NavigationMenu.Trigger><NavigationMenu.Content class="rx-nav__content">{#if item.content}{@render item.content()}{:else}<ul class="rx-nav__grid">{#each item.children??[] as menuChild}<li><NavigationMenu.Link>{#snippet child({props}: {props: HTMLAnchorAttributes})}<a {...props} href={menuChild.href??'#'}><strong>{menuChild.label}</strong>{#if menuChild.description}<span>{menuChild.description}</span>{/if}</a>{/snippet}</NavigationMenu.Link></li>{/each}</ul>{/if}</NavigationMenu.Content>
		{:else}<NavigationMenu.Link>{#snippet child({props}: {props: HTMLAnchorAttributes})}<a {...props} class="rx-nav__trigger" href={item.href??'#'}>{#if item.icon}<span aria-hidden="true">{@render item.icon()}</span>{/if}{item.label}</a>{/snippet}</NavigationMenu.Link>{/if}
	</NavigationMenu.Item>{/each}
	</NavigationMenu.List>
</NavigationMenu.Root>
<style>
	:global(.rx-nav__list){display:flex;gap:.2rem;list-style:none;margin:0;padding:.3rem}:global(.rx-nav--vertical .rx-nav__list){flex-direction:column}:global(.rx-nav__trigger){display:flex;align-items:center;gap:.4rem;border:0;border-radius:var(--rx-radius);padding:.6rem .85rem;color:rgb(var(--rx-text)/.7);background:transparent;font:inherit;text-decoration:none;transition:color var(--rx-duration),background var(--rx-duration)}:global(.rx-nav__trigger:is(:hover,:focus-visible,[data-state=open])){color:rgb(var(--rx-color));background:rgb(var(--rx-color)/.12);outline:none}:global(.rx-nav__content){min-width:18rem;border:1px solid rgb(var(--rx-text)/.08);border-radius:var(--rx-radius);padding:.5rem;background:rgb(var(--rx-bg));box-shadow:0 16px 38px rgb(var(--rx-dark)/var(--rx-shadow-opacity))}:global(.rx-nav__grid){display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.25rem;margin:0;padding:0;list-style:none}:global(.rx-nav__grid a){display:flex;flex-direction:column;gap:.2rem;border-radius:calc(var(--rx-radius)*.7);padding:.7rem;color:rgb(var(--rx-text));text-decoration:none}:global(.rx-nav__grid a:hover){background:rgb(var(--rx-color)/.1)}:global(.rx-nav__grid span){color:rgb(var(--rx-text)/.58);font-size:.8rem}:global(.rx-nav--underline .rx-nav__trigger[data-state=open]){box-shadow:inset 0 -2px rgb(var(--rx-color))}:global(.rx-nav--pill .rx-nav__trigger[data-state=open]){color:rgb(var(--rx-light));background:rgb(var(--rx-color))}:global(.rx-nav--glow .rx-nav__content){box-shadow:0 8px 35px rgb(var(--rx-color)/.3)}:global(.rx-nav--mega .rx-nav__content){min-width:min(42rem,90vw)}@media(prefers-reduced-motion:reduce){:global(.rx-nav__trigger){transition:none}}
</style>
