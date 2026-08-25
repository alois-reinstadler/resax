<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title' | 'children'> {
		variant?: 'default' | 'banner' | 'inline' | 'neon' | 'split' | 'toast';
		appearance?: 'soft' | 'solid' | 'outline';
		radius?: 'subtle' | 'rounded' | 'pill';
		color?: RxColor;
		title?: string | Snippet;
		icon?: Snippet;
		closable?: boolean;
		open?: boolean;
		dismissAfter?: number;
		onClose?: () => void;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { neighborLight } from '$lib/registry/attachments/neighbor-light';
	import type { TransitionConfig } from 'svelte/transition';
	import { alertVariants } from './index';

	let { variant = 'default', appearance = 'soft', radius = 'rounded', color, title, icon, closable = false, open = $bindable(true), dismissAfter, onClose, onOpenChange,
		children, class: className, style, ...restProps }: AlertProps = $props();
	const classes = $derived(alertVariants({ variant, appearance, radius, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-alert-timeout:${Math.max(0,dismissAfter ?? 0)}ms; ${style ?? ''}`);
	const titleSnippet = $derived(typeof title === 'function' ? title : undefined);
	const attachNeighbor = $derived(neighborLight({ disabled: () => variant !== 'default' }));

	$effect(()=>{ if(!open||!dismissAfter)return;const timer=setTimeout(close,dismissAfter);return()=>clearTimeout(timer) });
	function close() { open = false; onOpenChange?.(false);onClose?.(); }
	function alertTransition(node:Element,{variant:kind}:{variant:string}):TransitionConfig{const rect=node.getBoundingClientRect();const computed=getComputedStyle(node);const pt=parseFloat(computed.paddingTop)||0;const pb=parseFloat(computed.paddingBottom)||0;const inline=kind==='inline';return{duration:inline?420:kind==='toast'?480:440,easing:t=>1-Math.pow(1-t,3),css:(t,u)=>`${kind==='toast'?`transform:translateY(${u*14}px) scale(${.97+t*.03})`:`transform:scale(${(inline ? .96 : .97)+t*(inline ? .04 : .03)})`};opacity:${t};filter:blur(${u*(inline?5:6)}px);max-height:${rect.height*t}px;padding-top:${pt*t}px;padding-bottom:${pb*t}px`}}
	function alertEffects(node:HTMLDivElement){let frame=0;const move=(event:PointerEvent)=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const rect=node.getBoundingClientRect();const x=event.clientX-rect.left;const y=event.clientY-rect.top;const nx=Math.max(0,Math.min(rect.width,x));const ny=Math.max(0,Math.min(rect.height,y));const glow=Math.max(0,1-Math.hypot(x-nx,y-ny)/240);node.style.setProperty('--gx',`${x}px`);node.style.setProperty('--gy',`${y}px`);node.style.setProperty('--glow',glow.toFixed(3))})};const down=(event:PointerEvent)=>{if(variant!=='default')return;const closeButton=(event.target as Element).closest('.rx-alert__close');if(!closeButton)return;const rect=closeButton.getBoundingClientRect();const size=Math.hypot(rect.width,rect.height)*2;const ripple=document.createElement('i');ripple.className='rx-alert__ripple';ripple.style.cssText=`left:${event.clientX-rect.left}px;top:${event.clientY-rect.top}px;width:${size}px;height:${size}px`;closeButton.querySelector('.rx-alert__ripples')?.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true})};window.addEventListener('pointermove',move,{passive:true});node.addEventListener('pointerdown',down,{passive:true});return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move);node.removeEventListener('pointerdown',down)}}
</script>

{#if open}
	<div {...restProps} role="alert" class={classes} style={inlineStyle} data-rx-color={color ?? 'primary'} transition:alertTransition={{variant}} {@attach alertEffects} {@attach attachNeighbor}>
		<span class="rx-alert__glow" aria-hidden="true"></span>{#if variant==='neon'}<span class="rx-alert__neon-ring" aria-hidden="true"></span>{/if}
		<div class="rx-alert__icon" aria-hidden="true">
			{#if icon}{@render icon()}{:else}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5h.01"/></svg>{/if}
		</div>
		<div class="rx-alert__content">
			{#if title}{#if titleSnippet}{@render titleSnippet()}{:else}<strong class="rx-alert__title">{title}</strong>{/if}{/if}
			{#if children}<div class="rx-alert__body">{@render children()}</div>{/if}
		</div>
		{#if closable}<button type="button" class="rx-alert__close" aria-label="Close" onclick={close}><span class="rx-alert__ripples" aria-hidden="true"></span><span aria-hidden="true">×</span></button>{/if}
		{#if dismissAfter && (variant==='banner'||variant==='toast')}<span class="rx-alert__timeout" aria-hidden="true"></span>{/if}
	</div>
{/if}

<style>
	.rx-alert { --rx-alert-on-bright: var(--rx-dark); position:relative;isolation:isolate;overflow:hidden;display:flex;align-items:flex-start;gap:.8rem;box-sizing:border-box;width:100%;padding:1rem 1.1rem;border:1px solid rgb(var(--rx-color)/.22);border-radius:var(--rx-radius);color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.15);line-height:1.45 }
	.rx-alert__icon { position:relative;z-index:2;display: grid; flex: 0 0 1.45rem; place-items: center; }
	.rx-alert__icon :global(svg) { width: 1.35rem; height: 1.35rem; stroke-width: 2; }
	.rx-alert__content { position:relative;z-index:2;min-width:0;flex:1 }
	.rx-alert__title { display: block; margin-bottom: .2rem; }
	.rx-alert__body { color: rgb(var(--rx-text)); }
	.rx-alert__close { position:relative;z-index:3;overflow:hidden;display:grid;flex:0 0 1.6rem;width:1.6rem;height:1.6rem;place-items:center;padding:0;border:0;border-radius:9999px;color:currentColor;background:transparent;cursor:pointer;font:inherit;font-size:1.25rem;line-height:1;transition:background-color 160ms,transform 160ms }.rx-alert__close>span:last-child{position:relative;z-index:2}
	.rx-alert__close:hover { background: rgb(var(--rx-color) / .14); }
	.rx-alert__close:focus-visible { outline: 2px solid rgb(var(--rx-color) / .4); outline-offset: 2px; }
	.rx-alert__glow{position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:radial-gradient(60px circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.42) 30%,rgb(var(--rx-color)/.16) 58%,transparent 82%),radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.27) 42%,rgb(var(--rx-color)/.08) 66%,transparent 85%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;opacity:calc(var(--glow,0)*.63);transition:opacity 140ms}.rx-alert__ripples{position:absolute;inset:0;z-index:1;border-radius:inherit;overflow:hidden;pointer-events:none}:global(.rx-alert__ripple){position:absolute;border-radius:50%;transform:translate(-50%,-50%) scale(0);background:radial-gradient(circle,rgb(var(--rx-color)/.38),rgb(var(--rx-color)/.2) 24%,rgb(var(--rx-color)/.09) 44%,rgb(var(--rx-color)/.03) 60%,transparent 76%);animation:rx-alert-rip 780ms cubic-bezier(.22,1,.36,1) forwards,rx-alert-fade 780ms cubic-bezier(.25,.1,.25,1) forwards}
	.rx-alert--default{--lit-fill:var(--rx-neighbor-fill,none);--lit-ring:var(--rx-neighbor-ring,none);--lit:var(--rx-neighbor-lit,0)}.rx-alert--default::before{content:'';position:absolute;inset:0;z-index:0;border-radius:inherit;pointer-events:none;background:var(--lit-fill);opacity:calc(var(--lit)*.3);transition:opacity 140ms}.rx-alert--default::after{content:'';position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:var(--lit-ring);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;opacity:var(--lit);transition:opacity 140ms}
	.rx-alert--default{max-width:440px;padding:13px 14px;gap:11px}.rx-alert--default.rx-alert--subtle{border-radius:8px}.rx-alert--default.rx-alert--rounded{border-radius:12px}.rx-alert--default.rx-alert--pill{border-radius:18px}.rx-alert--default.rx-alert--soft{color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.1);border-color:rgb(var(--rx-color)/.2)}.rx-alert--default.rx-alert--solid{--rx-alert-solid-fg:var(--rx-color-foreground,var(--rx-primary-foreground));color:var(--rx-alert-solid-fg);background:rgb(var(--rx-color)/.92);border-color:transparent}.rx-alert--default.rx-alert--solid[data-rx-color='success'],.rx-alert--default.rx-alert--solid[data-rx-color='danger'],.rx-alert--default.rx-alert--solid[data-rx-color='warn']{--rx-alert-solid-fg:rgb(var(--rx-fixed-dark))}.rx-alert--default.rx-alert--solid .rx-alert__body{color:inherit;opacity:.88}.rx-alert--default.rx-alert--solid .rx-alert__icon{color:inherit}.rx-alert--default.rx-alert--outline{color:rgb(var(--rx-text));background:transparent;border-color:rgb(var(--rx-color)/.45)}
	.rx-alert--banner { border-radius:0;background:linear-gradient(90deg,rgb(var(--rx-color)/.12),transparent 30%),rgb(var(--rx-surface));box-shadow:inset 3px 0 rgb(var(--rx-color)),0 0 12px rgb(var(--rx-color)/.24) }
	.rx-alert--inline { align-items:center;width:fit-content;padding:.55rem .8rem;font-size:.875rem }.rx-alert--inline .rx-alert__icon{width:.55rem;height:.55rem;flex-basis:.55rem;border-radius:50%;background:rgb(var(--rx-color));color:transparent}.rx-alert--inline .rx-alert__icon::after{content:'';position:absolute;inset:0;z-index:-1;border-radius:inherit;background:rgb(var(--rx-color));animation:rx-alert-ping 1.8s cubic-bezier(.22,1,.36,1) infinite}.rx-alert--inline .rx-alert__icon :global(svg){display:none}
	.rx-alert--inline .rx-alert__title { display: inline; margin: 0 .35rem 0 0; }
	.rx-alert--inline .rx-alert__body { display: inline; }
	.rx-alert--neon {overflow:visible;border:0;color:rgb(var(--rx-color));background:radial-gradient(125% 150% at 0 0,rgb(var(--rx-color)/.18),transparent 62%),rgb(var(--rx-dark));box-shadow:0 16px 40px -24px rgb(var(--rx-dark)),0 0 34px -12px rgb(var(--rx-color)/.75);transition:box-shadow 240ms }.rx-alert--neon:hover{box-shadow:0 16px 40px -24px rgb(var(--rx-dark)),0 0 46px -12px rgb(var(--rx-color)/.9)}.rx-alert__neon-ring{position:absolute;inset:-1px;z-index:-1;border-radius:inherit;padding:1px;background:conic-gradient(from var(--rx-alert-angle),rgb(var(--rx-color)) 0deg,transparent 145deg,rgb(var(--rx-color)/.8) 255deg,transparent 312deg,rgb(var(--rx-color)) 340deg,transparent 350deg,rgb(var(--rx-color)) 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;animation:rx-alert-neon-spin 4.4s linear infinite,rx-alert-neon-breathe 3.4s ease-in-out infinite}
	.rx-alert--neon .rx-alert__body { color: rgb(var(--rx-light)); }
	.rx-alert--split {max-width:440px;min-height:66px;padding:0;overflow:hidden;border-radius:14px;background:rgb(var(--rx-surface))}
	.rx-alert--split .rx-alert__icon { align-self:stretch;flex-basis:54px;color:var(--rx-color-foreground,rgb(var(--rx-light)));background:rgb(var(--rx-color));box-shadow:inset -1px 0 rgb(var(--rx-dark)/.18) }
	.rx-alert--split[data-rx-color='success'] .rx-alert__icon, .rx-alert--split[data-rx-color='danger'] .rx-alert__icon, .rx-alert--split[data-rx-color='warn'] .rx-alert__icon { color: rgb(var(--rx-alert-on-bright)); }
	.rx-alert--split .rx-alert__content {align-self:center;padding:13px 14px}.rx-alert--split .rx-alert__title{color:color-mix(in srgb,rgb(var(--rx-color)) 50%,rgb(var(--rx-text)));font-weight:650}
	.rx-alert--split .rx-alert__close { margin: .85rem .8rem; }
	.rx-alert--toast {width:100%;max-width:400px;padding:14px;gap:12px;border:1px solid rgb(var(--rx-color)/.14);border-radius:16px;color:rgb(var(--rx-color));background:rgb(var(--rx-surface));box-shadow:0 20px 48px -16px rgb(var(--rx-dark)/.55),0 2px 8px rgb(var(--rx-dark)/.3) }
	.rx-alert--toast .rx-alert__icon{display:inline-flex;flex-basis:34px;width:34px;height:34px;border-radius:999px;color:rgb(var(--rx-color));background:rgb(var(--rx-color)/.18)}.rx-alert--toast .rx-alert__icon :global(svg){width:1.1em;height:1.1em}
	.rx-alert--toast .rx-alert__title{color:rgb(var(--rx-text))}
	.rx-alert__timeout{position:absolute;z-index:4;left:0;right:0;bottom:0;height:3px;background:rgb(var(--rx-color));transform-origin:left;animation:rx-alert-timeout var(--rx-alert-timeout) linear forwards}
	.rx-alert--banner:hover .rx-alert__timeout,.rx-alert--toast:hover .rx-alert__timeout{animation-play-state:paused}
	:global(.dark) .rx-alert { --rx-alert-on-bright: var(--rx-background); }
	@keyframes rx-alert-rip{to{transform:translate(-50%,-50%) scale(1)}}@keyframes rx-alert-fade{from{opacity:.8}to{opacity:0}}@keyframes rx-alert-ping{0%{opacity:.55;transform:scale(1)}70%,100%{opacity:0;transform:scale(2.6)}}@keyframes rx-alert-neon-spin{to{--rx-alert-angle:360deg;transform:rotate(1turn)}}@keyframes rx-alert-neon-breathe{50%{filter:blur(1.5px);opacity:.72}}@keyframes rx-alert-timeout{to{transform:scaleX(0)}}
	@media (prefers-reduced-motion: reduce) { .rx-alert,.rx-alert__close{transition:none}.rx-alert__icon::after,.rx-alert__neon-ring,.rx-alert__timeout{animation:none!important}.rx-alert__timeout{transform:scaleX(0)}:global(.rx-alert__ripple){display:none} }
</style>
