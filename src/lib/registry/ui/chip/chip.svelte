<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '$lib/registry/lib/color';
	export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> {
		variant?: 'default' | 'flat' | 'border' | 'bounce' | 'fill' | 'glow' | 'gradient' | 'outline'; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		closable?: boolean; onClose?: () => void; disabled?: boolean; selectable?:boolean; selected?:boolean; onSelectedChange?:(selected:boolean)=>void; icon?: Snippet; children: Snippet;
	}
</script>
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { styleColor } from '$lib/registry/lib/color';
	import { proximityGlow } from '$lib/registry/attachments/proximity-glow';
	import { ripple } from '$lib/registry/attachments/ripple';
	import { neighborLight } from '$lib/registry/attachments/neighbor-light';
	import { chipVariants } from './index';
	let { variant = 'default', color, size = 'default', closable = false, onClose, disabled = false, selectable=false,selected=$bindable(false),onSelectedChange,
		icon, children, class: className, style, ...restProps }: ChipProps = $props();
	const classes = $derived(chipVariants({ variant, size, class: typeof className === 'string' ? className : undefined }));
	const solidForeground = $derived(color === 'success' || color === 'danger' || color === 'warn'
		? 'rgb(var(--rx-fixed-dark))'
		: 'var(--rx-color-foreground, rgb(var(--rx-fixed-light)))');
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-chip-solid-foreground:${solidForeground}; ${style ?? ''}`);
	const attachGlow = $derived(proximityGlow({ radius: 200, disabled: () => disabled }));
	const attachRipple = $derived(ripple({ disabled: () => disabled }));
	const attachNeighbor = $derived(neighborLight({ disabled: () => disabled }));
	let bouncing = $state(false);
	let bounceFrame = 0;
	function triggerBounce() {
		if (variant !== 'bounce' || typeof requestAnimationFrame === 'undefined') return;
		bouncing = false;
		if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(bounceFrame);
		bounceFrame = requestAnimationFrame(() => { bounceFrame = 0; bouncing = true; });
	}
	function close(event: MouseEvent) { event.stopPropagation(); if (!disabled) onClose?.(); }
	function toggle(){if(disabled||!selectable)return;triggerBounce();selected=!selected;onSelectedChange?.(selected)}
	function key(event:KeyboardEvent){if(selectable&&(event.key==='Enter'||event.key===' ')){event.preventDefault();toggle()}}
	function animationEnd(event: AnimationEvent) { if (event.target === event.currentTarget) bouncing = false; }
	onDestroy(() => { if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(bounceFrame); });
</script>
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<span {...restProps} class={classes} class:rx-chip--disabled={disabled} class:is-selected={selected} class:is-bouncing={bouncing} style={inlineStyle} data-rx-lamp aria-disabled={disabled ? 'true' : undefined} role={selectable?'button':undefined} tabindex={selectable&&!disabled?0:undefined} aria-pressed={selectable?selected:undefined} onclick={toggle} onkeydown={key} onanimationend={animationEnd} {@attach attachGlow} {@attach attachNeighbor} {@attach attachRipple}>
	<span class="rx-chip__glow" aria-hidden="true"></span><span class="rx-chip__neighbor" aria-hidden="true"></span><span class="rx-chip__fill" aria-hidden="true"></span><span class="rx-chip__outline" aria-hidden="true"></span><span class="rx-chip__ripples" aria-hidden="true"></span>
	{#if icon}<span class="rx-chip__icon">{@render icon()}</span>{/if}
	{#if selectable && selected}<svg class="rx-chip__check" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>{/if}
	<span class="rx-chip__content">{@render children()}</span>
	{#if closable}<button type="button" class="rx-chip__close" aria-label="Close" disabled={disabled} onclick={close}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>{/if}
</span>
<style>
	.rx-chip{position:relative;isolation:isolate;display:inline-flex;align-items:center;gap:6px;box-sizing:border-box;height:28px;padding:0 11px;border:1px solid transparent;border-radius:9999px;color:inherit;background:none;font:inherit;font-size:13px;font-weight:500;line-height:1;white-space:nowrap;user-select:none;overflow:hidden;cursor:default;transition:transform 240ms cubic-bezier(.34,1.56,.64,1),box-shadow 260ms ease,background-color 200ms ease,border-color 200ms cubic-bezier(.22,1,.36,1),color 200ms ease}
	.rx-chip--default,.rx-chip--bounce,.rx-chip--glow{color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.12);border-color:rgb(var(--rx-color)/.2)}
	.rx-chip--flat{color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.12);border-color:rgb(var(--rx-color)/.2)}
	.rx-chip--border{color:rgb(var(--rx-text));border-color:rgb(var(--rx-color)/.45);background:transparent}
	.rx-chip--fill{color:rgb(var(--rx-text));border-color:rgb(var(--rx-color)/.3);background:transparent}
	.rx-chip--gradient{color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.12);border-color:rgb(var(--rx-color)/.2)}
	.rx-chip--outline{color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.1);border:0}
	.rx-chip--lg{height:32px;padding:0 14px;gap:7px;font-size:14px}.rx-chip--size-default{height:28px;padding:0 11px;font-size:13px}.rx-chip--sm{height:24px;padding:0 9px;gap:5px;font-size:12px}
	.rx-chip__icon { display: inline-flex; overflow: hidden; border-radius: 9999px; }.rx-chip__check{position:relative;z-index:3;flex:0 0 auto;width:1em;height:1em;margin-left:-1px}.rx-chip__close svg{display:block;width:1em;height:1em}
	.rx-chip__close { display: grid; width: 1.25em; height: 1.25em; margin-right:-3px; place-items: center; padding: 0; border: 0; border-radius: 9999px; color: inherit; background: transparent; cursor: pointer; font: inherit; line-height: 1; opacity:.7; transition:opacity 160ms,background-color 160ms,transform 160ms cubic-bezier(.34,1.56,.64,1) }.rx-chip__close:hover{opacity:1;background:rgb(var(--rx-color)/.25)}.rx-chip__close:active{transform:scale(.85)}
	.rx-chip__close:focus-visible { outline: 2px solid rgb(var(--rx-color) / .4); outline-offset: 2px; }
	.rx-chip--disabled { opacity: .5; cursor: not-allowed; }
	.rx-chip[role=button]{cursor:pointer}.rx-chip:active[role=button]{transform:scale(.94)}.rx-chip[role=button]:hover{border-color:rgb(var(--rx-color)/.5)}.rx-chip--default[role=button]:hover,.rx-chip--flat[role=button]:hover{background:rgb(var(--rx-color)/.2)}.rx-chip__content,.rx-chip__icon,.rx-chip__close{position:relative;z-index:3}.rx-chip__glow{position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:radial-gradient(60px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.42) 30%,rgb(var(--rx-color)/.16) 58%,transparent 82%),radial-gradient(200px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.27) 42%,rgb(var(--rx-color)/.08) 66%,transparent 85%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:calc(var(--rx-glow,0)*.63);transition:opacity 140ms}.rx-chip__ripples{position:absolute;inset:0;z-index:2;pointer-events:none}
	.rx-chip__neighbor{position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:var(--rx-neighbor-ring,none);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:var(--rx-neighbor-lit,0);transition:opacity 140ms}.rx-chip__neighbor::after{content:'';position:absolute;inset:1px;border-radius:inherit;background:var(--rx-neighbor-fill,none);opacity:.3}
	.rx-chip--default.is-selected,.rx-chip--flat.is-selected,.rx-chip--border.is-selected{color:var(--rx-chip-solid-foreground);background:rgb(var(--rx-color)/.95);border-color:transparent}.rx-chip--default.is-selected[role=button]:hover,.rx-chip--flat.is-selected[role=button]:hover,.rx-chip--border.is-selected[role=button]:hover{background:rgb(var(--rx-color));border-color:transparent}.rx-chip--bounce.is-selected,.rx-chip--glow.is-selected{color:var(--rx-chip-solid-foreground);background:rgb(var(--rx-color)/.9);border-color:transparent}.rx-chip--default.is-selected .rx-chip__close:hover,.rx-chip--flat.is-selected .rx-chip__close:hover,.rx-chip--border.is-selected .rx-chip__close:hover,.rx-chip--fill .rx-chip__close:hover{background:rgb(var(--rx-fixed-dark)/.18)}
	.rx-chip--bounce.is-bouncing{animation:rx-chip-bounce 520ms cubic-bezier(.34,1.56,.64,1)}.rx-chip--bounce .rx-chip__check{animation:rx-chip-icon-pop 420ms cubic-bezier(.34,1.56,.64,1)}@keyframes rx-chip-bounce{0%{transform:scale(.9,1.05)}35%{transform:scale(1.12,.9)}60%{transform:scale(.96,1.04)}80%{transform:scale(1.03,.98)}100%{transform:scale(1)}}@keyframes rx-chip-icon-pop{from{transform:scale(0)}60%{transform:scale(1.35)}to{transform:scale(1)}}
	.rx-chip__fill{display:none;position:absolute;inset:0;z-index:0;background:rgb(var(--rx-color)/.95);transform:scaleX(0);transform-origin:left center;transition:transform 340ms cubic-bezier(.22,1,.36,1)}.rx-chip--fill .rx-chip__fill{display:block}.rx-chip--fill[role=button]:hover .rx-chip__fill,.rx-chip--fill.is-selected .rx-chip__fill{transform:scaleX(1)}.rx-chip--fill[role=button]:hover,.rx-chip--fill.is-selected{color:var(--rx-chip-solid-foreground);border-color:transparent}
	.rx-chip--glow:hover{box-shadow:0 0 14px -1px rgb(var(--rx-color)/.55)}.rx-chip--glow.is-selected{box-shadow:0 0 10px -2px rgb(var(--rx-color)/.5)}.rx-chip--glow::before{content:'';position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 20px 2px rgb(var(--rx-color)/.75);opacity:0}.rx-chip--glow.is-selected::before{animation:rx-chip-glow 1.9s ease-in-out infinite}@keyframes rx-chip-glow{50%{opacity:1}}
	.rx-chip--gradient .rx-chip__fill{display:block;transform:none;background:linear-gradient(100deg,rgb(var(--rx-color)/.1) 0%,rgb(var(--rx-color)/.42) 35%,hsl(from rgb(var(--rx-color)) calc(h + 48) s l) 55%,rgb(var(--rx-color)/.42) 75%,rgb(var(--rx-color)/.1) 100%);background-size:260% 100%;opacity:.35;animation:rx-chip-gradient 5s linear infinite;transition:opacity 220ms ease}.rx-chip--gradient[role=button]:hover .rx-chip__fill{opacity:.6}.rx-chip--gradient.is-selected{color:var(--rx-chip-solid-foreground);border-color:transparent}.rx-chip--gradient.is-selected .rx-chip__fill{opacity:1;animation-duration:3s}@keyframes rx-chip-gradient{to{background-position:260% 50%}}
	.rx-chip__outline{display:none;position:absolute;inset:0;z-index:1;padding:1.5px;border-radius:inherit;background:conic-gradient(rgb(var(--rx-color)/.25),hsl(from rgb(var(--rx-color)) calc(h + 48) s l),rgb(var(--rx-color)/.25),rgb(var(--rx-color)),rgb(var(--rx-color)/.25));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.55}.rx-chip--outline .rx-chip__outline{display:block}.rx-chip--outline[role=button]:hover .rx-chip__outline{opacity:.9;animation:rx-chip-outline 2.4s linear infinite}.rx-chip--outline.is-selected{background:rgb(var(--rx-color)/.18)}.rx-chip--outline.is-selected .rx-chip__outline{opacity:1;animation:rx-chip-outline 1.6s linear infinite}@keyframes rx-chip-outline{to{transform:rotate(1turn)}}
	@media (prefers-reduced-motion: reduce) { .rx-chip,.rx-chip__fill,.rx-chip__glow { transition-duration: 0ms; }.rx-chip,.rx-chip :global(*){animation:none!important} }
</style>
