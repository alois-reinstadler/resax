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
	import { styleColor } from '$lib/registry/lib/color';
	import { proximityGlow } from '$lib/registry/attachments/proximity-glow';
	import { ripple } from '$lib/registry/attachments/ripple';
	import { neighborLight } from '$lib/registry/attachments/neighbor-light';
	import { chipVariants } from './index';
	let { variant = 'default', color, size = 'default', closable = false, onClose, disabled = false, selectable=false,selected=$bindable(false),onSelectedChange,
		icon, children, class: className, style, ...restProps }: ChipProps = $props();
	const classes = $derived(chipVariants({ variant, size, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; ${style ?? ''}`);
	const attachGlow = $derived(proximityGlow({ radius: 200, disabled: () => disabled }));
	const attachRipple = $derived(ripple({ disabled: () => disabled }));
	const attachNeighbor = $derived(neighborLight({ disabled: () => disabled }));
	function close(event: MouseEvent) { event.stopPropagation(); if (!disabled) onClose?.(); }
	function toggle(){if(disabled||!selectable)return;selected=!selected;onSelectedChange?.(selected)}
	function key(event:KeyboardEvent){if(selectable&&(event.key==='Enter'||event.key===' ')){event.preventDefault();toggle()}}
</script>
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<span {...restProps} class={classes} class:rx-chip--disabled={disabled} class:is-selected={selected} style={inlineStyle} data-rx-lamp aria-disabled={disabled ? 'true' : undefined} role={selectable?'button':undefined} tabindex={selectable&&!disabled?0:undefined} aria-pressed={selectable?selected:undefined} onclick={toggle} onkeydown={key} {@attach attachGlow} {@attach attachNeighbor} {@attach attachRipple}>
	<span class="rx-chip__glow" aria-hidden="true"></span><span class="rx-chip__neighbor" aria-hidden="true"></span><span class="rx-chip__fill" aria-hidden="true"></span><span class="rx-chip__outline" aria-hidden="true"></span><span class="rx-chip__ripples" aria-hidden="true"></span>
	{#if icon}<span class="rx-chip__icon">{@render icon()}</span>{/if}<span class="rx-chip__content">{@render children()}</span>
	{#if closable}<button type="button" class="rx-chip__close" aria-label="Close" disabled={disabled} onclick={close}>×</button>{/if}
</span>
<style>
	.rx-chip { display: inline-flex; align-items: center; gap: .4rem; box-sizing: border-box; border: 1px solid transparent; border-radius: 9999px; color:rgb(var(--rx-fixed-light));background-color:rgb(var(--rx-fixed-dark));background-image:linear-gradient(hsl(from rgb(var(--rx-color)) h s min(l,32%)),hsl(from rgb(var(--rx-color)) h s min(l,32%))); font-weight: 600; line-height: 1; }
	.rx-chip--flat { color: hsl(from rgb(var(--rx-color)) h s min(l, 30%)); background: rgb(var(--rx-color) / .15); }
	.rx-chip--border { color: hsl(from rgb(var(--rx-color)) h s min(l, 30%)); border-color: rgb(var(--rx-color)); background: transparent; }
	.rx-chip--gradient { background: linear-gradient(135deg, hsl(from rgb(var(--rx-color)) h s min(l, 30%)), hsl(from rgb(var(--rx-color)) calc(h + 40) s min(l, 28%))); }
	.rx-chip--lg { min-height: 2.25rem; padding: .35rem .8rem; font-size: .95rem; }
	.rx-chip--size-default { min-height: 1.8rem; padding: .25rem .65rem; font-size: .82rem; }
	.rx-chip--sm { min-height: 1.4rem; padding: .18rem .48rem; font-size: .7rem; }
	.rx-chip__icon { display: inline-flex; overflow: hidden; border-radius: 9999px; }
	.rx-chip__close { display: grid; width: 1.25em; height: 1.25em; place-items: center; padding: 0; border: 0; border-radius: 9999px; color: inherit; background: rgb(var(--rx-light) / .18); cursor: pointer; font: inherit; line-height: 1; opacity:.72; transition:opacity 160ms,background-color 160ms,transform 160ms cubic-bezier(.34,1.56,.64,1) }.rx-chip__close:hover{opacity:1;background:rgb(var(--rx-light)/.28)}.rx-chip__close:active{transform:scale(.82)}
	.rx-chip--flat .rx-chip__close, .rx-chip--border .rx-chip__close { background: rgb(var(--rx-color) / .15); }
	.rx-chip__close:focus-visible { outline: 2px solid rgb(var(--rx-color) / .4); outline-offset: 2px; }
	.rx-chip--disabled { opacity: .5; cursor: not-allowed; }
	.rx-chip{position:relative;isolation:isolate;overflow:hidden;cursor:default;transition:transform 220ms cubic-bezier(.34,1.56,.64,1),box-shadow 220ms,background-color 220ms}.rx-chip[role=button]{cursor:pointer}.rx-chip:active[role=button]{transform:scale(.94)}.rx-chip__content,.rx-chip__icon,.rx-chip__close{position:relative;z-index:3}.rx-chip__glow{position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:radial-gradient(60px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.42) 30%,rgb(var(--rx-color)/.16) 58%,transparent 82%),radial-gradient(200px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.27) 42%,rgb(var(--rx-color)/.08) 66%,transparent 85%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:calc(var(--rx-glow,0)*.63);transition:opacity 140ms}.rx-chip__ripples{position:absolute;inset:0;z-index:2;pointer-events:none}
	.rx-chip__neighbor{position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:var(--rx-neighbor-ring,none);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:var(--rx-neighbor-lit,0);transition:opacity 140ms}.rx-chip__neighbor::after{content:'';position:absolute;inset:1px;border-radius:inherit;background:var(--rx-neighbor-fill,none);opacity:.3}
	.rx-chip--bounce.is-selected{animation:rx-chip-bounce 520ms cubic-bezier(.34,1.56,.64,1)}.rx-chip--bounce.is-selected .rx-chip__icon{animation:rx-chip-icon-pop 420ms cubic-bezier(.34,1.56,.64,1)}@keyframes rx-chip-bounce{0%{transform:scale(.9,1.05)}28%{transform:scale(1.12,.9)}55%{transform:scale(.96,1.04)}78%{transform:scale(1.03,.98)}100%{transform:scale(1)}}@keyframes rx-chip-icon-pop{from{transform:scale(0)}55%{transform:scale(1.35)}to{transform:scale(1)}}
	.rx-chip__fill{display:none;position:absolute;inset:0;z-index:0;background:rgb(var(--rx-color));transform:scaleX(0);transform-origin:left;transition:transform 340ms cubic-bezier(.22,1,.36,1)}.rx-chip--fill .rx-chip__fill{display:block}.rx-chip--fill.is-selected .rx-chip__fill{transform:scaleX(1)}.rx-chip--fill.is-selected{color:rgb(var(--rx-light))}
	.rx-chip--glow{box-shadow:0 0 8px rgb(var(--rx-color)/.35)}.rx-chip--glow:hover{box-shadow:0 0 14px -1px rgb(var(--rx-color)/.55)}.rx-chip--glow.is-selected{box-shadow:0 0 20px 2px rgb(var(--rx-color)/.75)}.rx-chip--glow::before{content:'';position:absolute;inset:-2px;border-radius:inherit;box-shadow:0 0 18px rgb(var(--rx-color)/.55);opacity:0;animation:rx-chip-glow 1.9s ease-in-out infinite}@keyframes rx-chip-glow{50%{opacity:.8}}
	.rx-chip--gradient{color:rgb(var(--rx-light));background:linear-gradient(100deg,rgb(var(--rx-color)/.1) 0%,rgb(var(--rx-color)/.42) 35%,hsl(from rgb(var(--rx-color)) calc(h + 48) s l) 55%,rgb(var(--rx-color)/.42) 75%,rgb(var(--rx-color)/.1) 100%);background-size:260% 100%;opacity:.6;animation:rx-chip-gradient 5s linear infinite}.rx-chip--gradient:hover{opacity:1}.rx-chip--gradient.is-selected{opacity:1;animation-duration:3s}@keyframes rx-chip-gradient{to{background-position:260% 0}}
	.rx-chip__outline{display:none;position:absolute;inset:0;z-index:1;padding:1px;border-radius:inherit;background:conic-gradient(rgb(var(--rx-color)/.25),hsl(from rgb(var(--rx-color)) calc(h + 48) s l),rgb(var(--rx-color)/.25),rgb(var(--rx-color)));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.55;animation:rx-chip-outline 2.4s linear infinite}.rx-chip--outline .rx-chip__outline{display:block}.rx-chip--outline.is-selected .rx-chip__outline{opacity:.9;animation-duration:1.6s}@keyframes rx-chip-outline{to{transform:rotate(1turn)}}
	@media (prefers-reduced-motion: reduce) { .rx-chip,.rx-chip__fill,.rx-chip__glow { transition-duration: 0ms; }.rx-chip,.rx-chip :global(*){animation:none!important} }
</style>
