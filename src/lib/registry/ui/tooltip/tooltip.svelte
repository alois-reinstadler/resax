<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	export type TooltipMotion = 'base'|'fade'|'blur'|'glow'|'scale'|'slide'|'default'|'border'|'shadow';
	export type TooltipSurface = 'solid'|'fluent'|'outline'|'glass';
	export type TooltipRadius = 'none'|'subtle'|'rounded'|'pill'|'squircle';
	export interface TooltipProps { open?:boolean;content:string|Snippet;side?:'top'|'right'|'bottom'|'left';align?:'start'|'center'|'end';color?:RxColor;variant?:TooltipMotion;surface?:TooltipSurface;radius?:TooltipRadius;offset?:number;delayDuration?:number;disabled?:boolean;children:Snippet;onOpenChange?:(open:boolean)=>void }
</script>
<script lang="ts">
	import * as TooltipBase from '$lib/components/ui/tooltip/index.js';
	import {styleColor} from '$lib/registry/lib/color';
	let{open=$bindable(false),content,side='top',align='center',color,variant='base',surface='solid',radius='squircle',offset=10,delayDuration=120,disabled=false,children,onOpenChange}:TooltipProps=$props();
	const motion=$derived(variant==='default'?'base':variant==='border'?'fade':variant==='shadow'?'glow':variant);
	const resolvedSurface=$derived(variant==='border'?'outline':surface);
	const inlineStyle=$derived(styleColor(color??'dark')??'--rx-color:var(--rx-dark)');
	function changed(value:boolean){open=value;onOpenChange?.(value)}
</script>
<TooltipBase.Provider {delayDuration}>
	<TooltipBase.Root bind:open {disabled} onOpenChange={changed}>
		<TooltipBase.Trigger class="rx-tooltip__trigger">{@render children()}</TooltipBase.Trigger>
		<TooltipBase.Content {side} {align} sideOffset={offset} class="rx-tooltip rx-tooltip--{motion} rx-tooltip--surface-{resolvedSurface} rx-tooltip--radius-{radius}" arrowClasses="rx-tooltip__arrow" style={inlineStyle}>
			<span class="rx-tooltip__flare" aria-hidden="true"></span>
			{#key content}<span class="rx-tooltip__content" data-state={open?'instant-open':'closed'}>{#if typeof content==='string'}{content}{:else}{@render content()}{/if}</span>{/key}
		</TooltipBase.Content>
	</TooltipBase.Root>
</TooltipBase.Provider>
<style>
	:global(.rx-tooltip__trigger){display:inline-flex;align-items:center;border:0;padding:0;color:inherit;background:transparent;font:inherit;border-radius:var(--rx-control-radius-sm,8px);outline:none}
	:global(.rx-tooltip__trigger:focus-visible){box-shadow:0 0 0 2px rgb(var(--rx-color))}
	:global(.rx-tooltip){--rx-tip-origin:bottom center;--rx-tip-x:0px;--rx-tip-y:8px;position:relative;isolation:isolate;overflow:visible;max-width:260px;border:1px solid rgb(var(--rx-border));border-radius:10px;padding:7px 11px;color:rgb(var(--rx-text));background:rgb(var(--rx-surface-2));font-size:12.5px;font-weight:500;line-height:1.4;white-space:normal;box-shadow:0 8px 24px -12px rgb(var(--rx-dark)/.6);transform-origin:var(--rx-tip-origin)}
	:global(.rx-tooltip[data-side=top]){--rx-tip-origin:bottom center;--rx-tip-y:8px}:global(.rx-tooltip[data-side=bottom]){--rx-tip-origin:top center;--rx-tip-y:-8px}:global(.rx-tooltip[data-side=left]){--rx-tip-origin:right center;--rx-tip-x:8px;--rx-tip-y:0px}:global(.rx-tooltip[data-side=right]){--rx-tip-origin:left center;--rx-tip-x:-8px;--rx-tip-y:0px}
	:global(.rx-tooltip--radius-none){border-radius:0}:global(.rx-tooltip--radius-subtle){border-radius:6px}:global(.rx-tooltip--radius-rounded){border-radius:10px}:global(.rx-tooltip--radius-pill){border-radius:999px}:global(.rx-tooltip--radius-squircle){border-radius:19px}
	:global(.rx-tooltip--surface-fluent){background:color-mix(in srgb,rgb(var(--rx-surface-2)) 90%,transparent);box-shadow:0 0 0 .5px rgb(var(--rx-light)/.12);backdrop-filter:blur(12px)}:global(.rx-tooltip--surface-outline){background:rgb(var(--rx-dark));box-shadow:0 0 0 1px rgb(var(--rx-light)/.12)}:global(.rx-tooltip--surface-glass){background:rgb(var(--rx-surface-2)/.42);box-shadow:0 0 0 .5px rgb(var(--rx-light)/.32);backdrop-filter:blur(16px) saturate(160%)}
	:global(.rx-tooltip__content){position:relative;z-index:2;display:inline-block;max-width:238px;animation:rx-tooltip-swap 400ms cubic-bezier(.34,1.46,.44,1)}:global(.rx-tooltip__flare){position:absolute;inset:-1px;z-index:-1;border-radius:inherit;pointer-events:none;opacity:0}:global(.rx-tooltip__arrow){width:10px;height:10px;border:0;border-radius:2px;background:rgb(var(--rx-surface-2));fill:rgb(var(--rx-surface-2));box-shadow:none;z-index:-1}
	:global(.rx-tooltip[data-state=open] .rx-tooltip__arrow),:global(.rx-tooltip[data-state=delayed-open] .rx-tooltip__arrow){animation:rx-tooltip-arrow-pop 420ms cubic-bezier(.34,1.56,.44,1)}
	:global(.rx-tooltip--base[data-state=open]),:global(.rx-tooltip--base[data-state=delayed-open]){animation:rx-tooltip-pop 320ms cubic-bezier(.34,1.46,.44,1) both}:global(.rx-tooltip--base[data-state=closed]){animation:rx-tooltip-out 360ms cubic-bezier(.36,0,.66,-.36) both}
	:global(.rx-tooltip--fade[data-state=open]),:global(.rx-tooltip--fade[data-state=delayed-open]){animation:rx-tooltip-fade-in 220ms cubic-bezier(.25,.8,.35,1) both}:global(.rx-tooltip--fade[data-state=closed]){animation:rx-tooltip-fade-out 180ms ease both}
	:global(.rx-tooltip--blur[data-state=open]),:global(.rx-tooltip--blur[data-state=delayed-open]){animation:rx-tooltip-blur-in 300ms cubic-bezier(.25,.8,.35,1) both}:global(.rx-tooltip--blur[data-state=closed]){animation:rx-tooltip-blur-out 220ms ease both}
	:global(.rx-tooltip--scale[data-state=open]),:global(.rx-tooltip--scale[data-state=delayed-open]){animation:rx-tooltip-scale-in 260ms cubic-bezier(.34,1.56,.44,1) both}:global(.rx-tooltip--scale[data-state=closed]){animation:rx-tooltip-scale-out 180ms ease both}
	:global(.rx-tooltip--slide[data-state=open]),:global(.rx-tooltip--slide[data-state=delayed-open]){animation:rx-tooltip-slide-in 300ms cubic-bezier(.22,1,.36,1) both}:global(.rx-tooltip--slide[data-state=closed]){animation:rx-tooltip-slide-out 200ms ease both}
	:global(.rx-tooltip--glow){border-color:color-mix(in srgb,rgb(var(--rx-color)) 45%,rgb(var(--rx-border)));box-shadow:0 0 0 1px rgb(var(--rx-color)/.3),0 0 16px -2px rgb(var(--rx-color)/.55)}:global(.rx-tooltip--glow[data-state=open]),:global(.rx-tooltip--glow[data-state=delayed-open]){animation:rx-tooltip-fade-in 200ms ease both}:global(.rx-tooltip--glow[data-state=open] .rx-tooltip__flare),:global(.rx-tooltip--glow[data-state=delayed-open] .rx-tooltip__flare){box-shadow:0 0 0 3px rgb(var(--rx-color)/.45),0 0 28px 2px rgb(var(--rx-color)/.7);animation:rx-tooltip-flare 620ms ease-out}:global(.rx-tooltip--glow[data-state=closed]){animation:rx-tooltip-fade-out 180ms ease both}
	@keyframes rx-tooltip-pop{0%{opacity:0;scale:.7;filter:blur(8px);translate:var(--rx-tip-x) var(--rx-tip-y)}60%{opacity:1;scale:1.04;filter:blur(0);translate:0 0}100%{opacity:1;scale:1;translate:0 0}}@keyframes rx-tooltip-out{0%{opacity:1;scale:1;filter:blur(0);translate:0 0}30%{scale:1.05}100%{opacity:0;scale:.6;filter:blur(8px);translate:var(--rx-tip-x) var(--rx-tip-y)}}@keyframes rx-tooltip-arrow-pop{0%{scale:0}55%{scale:1.3}78%{scale:.92}100%{scale:1}}@keyframes rx-tooltip-swap{0%{filter:blur(0);opacity:1;scale:1}40%{filter:blur(5px);opacity:.3;scale:.9}70%{filter:blur(0);opacity:1;scale:1.03}100%{filter:blur(0);opacity:1;scale:1}}@keyframes rx-tooltip-fade-in{from{opacity:0}to{opacity:1}}@keyframes rx-tooltip-fade-out{from{opacity:1}to{opacity:0}}@keyframes rx-tooltip-blur-in{from{opacity:0;filter:blur(10px)}to{opacity:1;filter:blur(0)}}@keyframes rx-tooltip-blur-out{from{opacity:1;filter:blur(0)}to{opacity:0;filter:blur(7px)}}@keyframes rx-tooltip-scale-in{from{opacity:0;scale:.7}to{opacity:1;scale:1}}@keyframes rx-tooltip-scale-out{from{opacity:1;scale:1}to{opacity:0;scale:.7}}@keyframes rx-tooltip-slide-in{from{opacity:0;translate:var(--rx-tip-x) var(--rx-tip-y)}to{opacity:1;translate:0 0}}@keyframes rx-tooltip-slide-out{from{opacity:1;translate:0 0}to{opacity:0;translate:var(--rx-tip-x) var(--rx-tip-y)}}@keyframes rx-tooltip-flare{0%,100%{opacity:0}40%{opacity:1}}
	@media(prefers-reduced-motion:reduce){:global(.rx-tooltip),:global(.rx-tooltip__arrow),:global(.rx-tooltip__content),:global(.rx-tooltip__flare){animation-duration:1ms!important;animation-iteration-count:1!important;filter:none!important;translate:none!important;scale:1!important}}@media(forced-colors:active){:global(.rx-tooltip){border:1px solid CanvasText;box-shadow:none}}
</style>
