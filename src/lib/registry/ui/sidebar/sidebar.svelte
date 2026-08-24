<script lang="ts" module>
	import type {Snippet} from 'svelte'; import type {HTMLAnchorAttributes} from 'svelte/elements'; import type {RxColor} from '$lib/registry/lib/color';
	export interface SidebarItem {id:string;label:string;href?:string;icon?:Snippet;badge?:string|number;disabled?:boolean;children?:SidebarItem[];}
	export interface SidebarProps {items:SidebarItem[];active?:string;open?:boolean;collapsed?:boolean;color?:RxColor;variant?:'default'|'classic'|'floating'|'glow'|'gradient'|'minimal'|'rail';side?:'left'|'right';header?:Snippet;footer?:Snippet;onActiveChange?:(id:string)=>void;}
</script>
<script lang="ts">
	import * as SidebarBase from '$lib/components/ui/sidebar/index.js'; import {styleColor} from '$lib/registry/lib/color'; import {RX_DURATION,RX_EASE} from '$lib/registry/lib/easing';
	let {items,active=$bindable(''),open=$bindable(true),collapsed=$bindable(false),color,variant='default',side='left',header,footer,onActiveChange}:SidebarProps=$props();
	function select(item:SidebarItem,e:MouseEvent){if(item.disabled){e.preventDefault();return}active=item.id;onActiveChange?.(item.id)}
	function openChanged(next:boolean){open=next;collapsed=!next}
</script>
<SidebarBase.Provider bind:open onOpenChange={openChanged} style={`${styleColor(color)??'--rx-color:var(--rx-primary)'};--rx-duration:${RX_DURATION.base}ms;--rx-ease:${RX_EASE}`}>
	<SidebarBase.Root {side} variant={variant==='floating'?'floating':'sidebar'} collapsible={variant==='rail'||collapsed?'icon':'offcanvas'} class="rx-sidebar rx-sidebar--{variant}">
		{#if header}<SidebarBase.Header class="rx-sidebar__header">{@render header()}</SidebarBase.Header>{/if}
		<SidebarBase.Content><SidebarBase.Group><SidebarBase.GroupContent><SidebarBase.Menu>
			{#each items as item(item.id)}<SidebarBase.MenuItem>
				<SidebarBase.MenuButton isActive={active===item.id} tooltipContent={item.label} class="rx-sidebar__item">
					{#snippet child({props}: {props: HTMLAnchorAttributes})}<a {...props} href={item.href??'#'} aria-disabled={item.disabled?'true':undefined} tabindex={item.disabled?-1:undefined} onclick={(e)=>select(item,e)}>{#if item.icon}<span class="rx-sidebar__icon" aria-hidden="true">{@render item.icon()}</span>{/if}<span>{item.label}</span>{#if item.badge!==undefined}<SidebarBase.MenuBadge>{item.badge}</SidebarBase.MenuBadge>{/if}</a>{/snippet}
				</SidebarBase.MenuButton>
				{#if item.children?.length}<SidebarBase.MenuSub>{#each item.children as subItem(subItem.id)}<SidebarBase.MenuSubItem><SidebarBase.MenuSubButton isActive={active===subItem.id}>{#snippet child({props}: {props: HTMLAnchorAttributes})}<a {...props} href={subItem.href??'#'} aria-disabled={subItem.disabled?'true':undefined} tabindex={subItem.disabled?-1:undefined} onclick={(e)=>select(subItem,e)}>{subItem.label}</a>{/snippet}</SidebarBase.MenuSubButton></SidebarBase.MenuSubItem>{/each}</SidebarBase.MenuSub>{/if}
			</SidebarBase.MenuItem>{/each}
		</SidebarBase.Menu></SidebarBase.GroupContent></SidebarBase.Group></SidebarBase.Content>
		{#if footer}<SidebarBase.Footer class="rx-sidebar__footer">{@render footer()}</SidebarBase.Footer>{/if}<SidebarBase.Rail />
	</SidebarBase.Root>
</SidebarBase.Provider>
<style>
	:global(.rx-sidebar){--sidebar:rgb(var(--rx-bg));--sidebar-foreground:rgb(var(--rx-text));--sidebar-primary:rgb(var(--rx-color));--sidebar-primary-foreground:rgb(var(--rx-light));--sidebar-accent:rgb(var(--rx-color)/.12);--sidebar-accent-foreground:rgb(var(--rx-color));--sidebar-border:rgb(var(--rx-text)/.08);--sidebar-ring:rgb(var(--rx-color)/.3)}:global(.rx-sidebar__item){border-radius:var(--rx-radius);transition:background var(--rx-duration) var(--rx-ease),color var(--rx-duration) var(--rx-ease),transform var(--rx-duration) var(--rx-ease)}:global(.rx-sidebar__item[data-active=true]){color:rgb(var(--rx-color));background:rgb(var(--rx-color)/.14);font-weight:650}:global(.rx-sidebar--classic){border-inline-end:1px solid rgb(var(--rx-text)/.1)}:global(.rx-sidebar--glow .rx-sidebar__item[data-active=true]){box-shadow:0 0 20px rgb(var(--rx-color)/.35)}:global(.rx-sidebar--gradient .rx-sidebar__item[data-active=true]){color:rgb(var(--rx-light));background:linear-gradient(135deg,rgb(var(--rx-color)),hsl(from rgb(var(--rx-color)) calc(h + 38) s l))}:global(.rx-sidebar--minimal){--sidebar-border:transparent}:global(.rx-sidebar__icon){display:inline-flex}:global(.rx-sidebar [aria-disabled=true]){pointer-events:none;opacity:.42}@media(prefers-reduced-motion:reduce){:global(.rx-sidebar__item){transition:none}}
</style>
