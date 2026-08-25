<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '$lib/registry/lib/color';
	export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'content' | 'children'> {
		variant?: 'default' | 'glow' | 'gradient' | 'pulse' | 'shimmer' | 'stripes'; color?: RxColor;
		appearance?: 'soft' | 'solid' | 'outline'; animated?: boolean; duration?: number;
		content?: string | number; dot?: boolean; position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; children?: Snippet;
	}
</script>
<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { neighborLight } from '$lib/registry/attachments/neighbor-light';
	import { badgeVariants } from './index';
	let { variant = 'default', color, appearance = 'solid', animated = true, duration, content, dot = false, position = 'top-right', children,
		class: className, style, ...restProps }: BadgeProps = $props();
	const pillClasses = $derived(badgeVariants({ variant, appearance, dot: dot && content === undefined, class: !children && typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-badge-cycle:${duration ?? (variant === 'pulse' ? 2000 : variant === 'shimmer' ? 3200 : 2600)}ms; ${style ?? ''}`);
	const attachNeighbor = $derived(neighborLight({ disabled: () => variant !== 'default' }));
	function badgeEffects(node: HTMLSpanElement) {
		let frame=0;const move = (event: PointerEvent) => { cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const rect=node.getBoundingClientRect();const x=event.clientX-rect.left;const y=event.clientY-rect.top;const nx=Math.max(0,Math.min(rect.width,x));const ny=Math.max(0,Math.min(rect.height,y));const glow=Math.max(0,1-Math.hypot(x-nx,y-ny)/220);node.style.setProperty('--gx',`${x}px`);node.style.setProperty('--gy',`${y}px`);node.style.setProperty('--glow',glow.toFixed(3))}) };
		const down=(event:PointerEvent)=>{if(variant!=='default')return;const rect=node.getBoundingClientRect();const diameter=Math.hypot(rect.width,rect.height)*2;const ripple=document.createElement('i');ripple.className='rx-badge__ripple';ripple.style.cssText=`left:${event.clientX-rect.left}px;top:${event.clientY-rect.top}px;width:${diameter}px;height:${diameter}px`;node.querySelector('.rx-badge__ripples')?.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true})};
		window.addEventListener('pointermove',move,{passive:true});node.addEventListener('pointerdown',down,{passive:true});return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move);node.removeEventListener('pointerdown',down)};
	}
</script>
{#snippet pill()}<span class={pillClasses} class:rx-badge--animated={animated} data-rx-color={color ?? 'primary'} aria-hidden={dot && content === undefined ? 'true' : undefined} {@attach badgeEffects} {@attach attachNeighbor}><span class="rx-badge__glow"></span><span class="rx-badge__ripples"></span>{#if variant === 'pulse'}<i class="rx-badge__pulse-ring"></i>{/if}{#if variant === 'shimmer'}<i class="rx-badge__sheen"></i>{/if}{#if variant === 'stripes'}<i class="rx-badge__stripes"></i>{/if}<b>{content ?? ''}</b></span>{/snippet}
{#if children}
	<span {...restProps} class={['rx-badge__wrapper', `rx-badge__wrapper--${position}`, className]} style={inlineStyle}>
		{@render children()}{@render pill()}
	</span>
{:else}
	<span {...restProps} class={pillClasses} class:rx-badge--animated={animated} style={inlineStyle} data-rx-color={color ?? 'primary'} {@attach badgeEffects} {@attach attachNeighbor}><span class="rx-badge__glow"></span><span class="rx-badge__ripples"></span>{#if variant === 'pulse'}<i class="rx-badge__pulse-ring"></i>{/if}{#if variant === 'shimmer'}<i class="rx-badge__sheen"></i>{/if}{#if variant === 'stripes'}<i class="rx-badge__stripes"></i>{/if}<b>{content ?? ''}</b></span>
{/if}
<style>
	.rx-badge__wrapper { position: relative; display: inline-flex; }
	.rx-badge__wrapper > .rx-badge__pill { position: absolute; z-index: 1; }
	.rx-badge__wrapper--top-right > .rx-badge__pill { top: 0; right: 0; transform: translate(45%, -45%); }
	.rx-badge__wrapper--top-left > .rx-badge__pill { top: 0; left: 0; transform: translate(-45%, -45%); }
	.rx-badge__wrapper--bottom-right > .rx-badge__pill { right: 0; bottom: 0; transform: translate(45%, 45%); }
	.rx-badge__wrapper--bottom-left > .rx-badge__pill { bottom: 0; left: 0; transform: translate(-45%, 45%); }
	.rx-badge__pill { --rx-badge-foreground: var(--rx-color-foreground,var(--rx-primary-foreground)); position:relative;isolation:isolate;overflow:hidden; display: inline-grid; min-width: 1.4rem; min-height: 1.4rem; place-items: center; box-sizing: border-box; padding: .15rem .45rem; border: 1px solid transparent; border-radius: 9999px; color: var(--rx-badge-foreground); background: rgb(var(--rx-color)); font-size: .7rem; font-weight: 700; line-height: 1; white-space: nowrap; }
	.rx-badge__pill b{position:relative;z-index:2;font:inherit}.rx-badge--soft{color:rgb(var(--rx-color));background:rgb(var(--rx-color)/.14);border-color:rgb(var(--rx-color)/.22)}.rx-badge--outline{color:rgb(var(--rx-color));background:transparent;border-color:rgb(var(--rx-color)/.5)}.rx-badge--solid{background:rgb(var(--rx-color)/.92)}
	.rx-badge--default{--lit-fill:var(--rx-neighbor-fill,none);--lit-ring:var(--rx-neighbor-ring,none);--lit:var(--rx-neighbor-lit,0)}.rx-badge--default::before{content:'';position:absolute;inset:0;z-index:0;border-radius:inherit;pointer-events:none;background:var(--lit-fill);opacity:calc(var(--lit)*.3);transition:opacity 140ms}.rx-badge--default::after{content:'';position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:var(--lit-ring);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;opacity:var(--lit);transition:opacity 140ms}
	.rx-badge__pill[data-rx-color='success'], .rx-badge__pill[data-rx-color='danger'], .rx-badge__pill[data-rx-color='warn'] { --rx-badge-foreground: rgb(var(--rx-dark)); }
	.rx-badge__pill[data-rx-color='dark'] { --rx-badge-foreground: rgb(var(--rx-background)); }
	:global(.dark) .rx-badge__pill[data-rx-color='success'], :global(.dark) .rx-badge__pill[data-rx-color='danger'], :global(.dark) .rx-badge__pill[data-rx-color='warn'] { --rx-badge-foreground: rgb(var(--rx-background)); }
	.rx-badge--dot { min-width: .65rem; min-height: .65rem; width: .65rem; height: .65rem; padding: 0; }
	.rx-badge__glow{position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:radial-gradient(60px circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.42) 30%,rgb(var(--rx-color)/.16) 58%,transparent 82%),radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.27) 42%,rgb(var(--rx-color)/.08) 66%,transparent 85%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;opacity:calc(var(--glow,0)*.45);transition:opacity 140ms}.rx-badge__ripples{position:absolute;inset:0;z-index:1;border-radius:inherit;overflow:hidden;pointer-events:none}:global(.rx-badge__ripple){position:absolute;border-radius:50%;transform:translate(-50%,-50%) scale(0);background:radial-gradient(circle,rgb(var(--rx-color)/.38),rgb(var(--rx-color)/.2) 24%,rgb(var(--rx-color)/.09) 44%,rgb(var(--rx-color)/.03) 60%,transparent 76%);animation:rx-badge-rip 780ms cubic-bezier(.22,1,.36,1) forwards,rx-badge-fade 780ms cubic-bezier(.25,.1,.25,1) forwards}
	.rx-badge--glow { box-shadow:0 0 8px rgb(var(--rx-color)/.35) }.rx-badge--glow.rx-badge--animated{box-shadow:0 0 6px rgb(var(--rx-color)/.28)}.rx-badge--glow.rx-badge--animated::after{content:'';position:absolute;inset:0;z-index:-1;border-radius:inherit;box-shadow:0 0 16px 2px rgb(var(--rx-color)/.55);opacity:0;animation:rx-badge-breathe 2.6s ease-in-out infinite}
	.rx-badge--gradient{background-size:200% 100%}.rx-badge--gradient.rx-badge--soft{background-image:linear-gradient(100deg,rgb(var(--rx-color)/.1),rgb(var(--rx-color)/.24) 50%,rgb(var(--rx-color)/.1))}.rx-badge--gradient.rx-badge--solid{background-image:linear-gradient(100deg,rgb(var(--rx-color)/.78),rgb(var(--rx-color)) 50%,rgb(var(--rx-color)/.78))}.rx-badge--gradient.rx-badge--outline{background-image:linear-gradient(100deg,transparent,rgb(var(--rx-color)/.16) 50%,transparent)}.rx-badge--gradient.rx-badge--animated{animation:rx-badge-gradient 3.2s ease-in-out infinite}
	.rx-badge__pulse-ring{position:absolute;inset:0;z-index:-1;border-radius:inherit;border:1px solid rgb(var(--rx-color)/.6);pointer-events:none}.rx-badge--pulse.rx-badge--animated{overflow:visible}.rx-badge--pulse.rx-badge--animated .rx-badge__pulse-ring{animation:rx-badge-pulse var(--rx-badge-cycle) cubic-bezier(.22,1,.36,1) infinite}
	.rx-badge__sheen{position:absolute;top:-60%;left:0;z-index:1;width:45%;height:220%;pointer-events:none;transform:translateX(-260%) rotate(20deg);background:linear-gradient(90deg,transparent,rgb(var(--rx-light)/.55) 50%,transparent)}.rx-badge--shimmer.rx-badge--animated .rx-badge__sheen{animation:rx-badge-sheen var(--rx-badge-cycle) cubic-bezier(.3,.7,.3,1) infinite}
	.rx-badge__stripes{position:absolute;inset:0;z-index:0;border-radius:inherit;pointer-events:none;background-image:repeating-linear-gradient(45deg,rgb(var(--rx-color)/.18) 0 6px,transparent 6px 12px);background-size:34px 34px;opacity:.9}.rx-badge--solid .rx-badge__stripes{background-image:repeating-linear-gradient(45deg,rgb(var(--rx-dark)/.16) 0 6px,transparent 6px 12px)}.rx-badge--stripes.rx-badge--animated .rx-badge__stripes{animation:rx-badge-stripes .9s linear infinite}
	@keyframes rx-badge-rip{to{transform:translate(-50%,-50%) scale(1)}}@keyframes rx-badge-fade{from{opacity:.8}to{opacity:0}}@keyframes rx-badge-breathe{50%{opacity:1}}@keyframes rx-badge-gradient{50%{background-position:100% 50%}}@keyframes rx-badge-pulse{0%{opacity:.55;transform:scale(1)}70%,100%{opacity:0;transform:scale(1.35)}}@keyframes rx-badge-sheen{0%{transform:translateX(-260%) rotate(20deg)}22%,100%{transform:translateX(320%) rotate(20deg)}}@keyframes rx-badge-stripes { to { background-position: 34px 0; } }
	@media (prefers-reduced-motion: reduce) { .rx-badge--glow::after,.rx-badge--gradient,.rx-badge__pulse-ring,.rx-badge__sheen,.rx-badge__stripes { animation:none!important }.rx-badge__sheen,:global(.rx-badge__ripple){display:none} }
</style>
