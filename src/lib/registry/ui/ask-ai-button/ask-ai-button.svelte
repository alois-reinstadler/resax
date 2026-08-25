<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { ButtonProps } from '../button/button.svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface AskAiButtonProps extends Omit<ButtonProps, 'variant' | 'children' | 'loading' | 'icon' | 'effect' | 'floating' | 'ripple'> {
		label?: string;
		loading?: boolean;
		color?: RxColor;
		speed?: number;
		glow?: number;
		radius?: 'rounded' | 'none' | 'subtle' | 'pill' | 'squircle';
		sparkle?: Snippet;
		onask?: (detail: { label: string }) => void;
	}
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { styleColor } from '$lib/registry/lib/color';

	let {
		label = 'Ask AI', loading = false, disabled = false, color, speed = 14, glow = 60,
		radius = 'rounded', size = 'default', block = false, href, sparkle, onask, onclick,
		class: className, style, ...restProps
	}: AskAiButtonProps = $props();

	const inactive = $derived(disabled || loading);
	const sourceSize = $derived(size === 'sm' || size === 'mini' ? 'sm' : size === 'lg' || size === 'xl' ? 'lg' : 'md');
	const speedValue = $derived(Math.min(60, Math.max(2, Number.isFinite(speed) ? speed : 14)));
	const glowValue = $derived(Math.min(100, Math.max(0, Number.isFinite(glow) ? glow : 60)) / 100);
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --sp:${speedValue}; --spm:${loading ? '.34' : '1'}; --bleed:${glowValue}; ${style ?? ''}`);
	const anchorProps = $derived(restProps as unknown as HTMLAnchorAttributes);

	function effects(node: HTMLElement) {
		let frame = 0;
		let lastEvent: PointerEvent | null = null;
		const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
		const flush = () => {
			frame = 0;
			if (!lastEvent) return;
			const rect = node.getBoundingClientRect();
			const x = lastEvent.clientX - rect.left;
			const y = lastEvent.clientY - rect.top;
			node.style.setProperty('--mx', `${x.toFixed(1)}px`);
			node.style.setProperty('--my', `${y.toFixed(1)}px`);
			node.style.setProperty('--par-x', `${((x / (rect.width || 1) - .5) * -9).toFixed(2)}px`);
			node.style.setProperty('--par-y', `${((y / (rect.height || 1) - .5) * -6).toFixed(2)}px`);
		};
		const move = (event: PointerEvent) => { lastEvent = event; if (!frame) frame = requestAnimationFrame(flush); };
		const leave = () => {
			if (frame) cancelAnimationFrame(frame);
			frame = 0; lastEvent = null;
			node.style.setProperty('--par-x', '0px');
			node.style.setProperty('--par-y', '0px');
		};
		const down = (event: PointerEvent) => {
			if (inactive || reduced()) return;
			const rect = node.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const diameter = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) * 2;
			const ripple = document.createElement('span');
			ripple.className = 'ask__ripple';
			ripple.setAttribute('aria-hidden', 'true');
			ripple.style.cssText = `left:${x}px;top:${y}px;width:${diameter}px;height:${diameter}px`;
			node.querySelector('.ask__skin')?.append(ripple);
			ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
			const ripples = node.querySelectorAll('.ask__ripple');
			if (ripples.length > 5) ripples[0]?.remove();
		};
		node.addEventListener('pointermove', move);
		node.addEventListener('pointerleave', leave);
		node.addEventListener('pointerdown', down);
		return () => {
			if (frame) cancelAnimationFrame(frame);
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
			node.removeEventListener('pointerdown', down);
			node.querySelectorAll('.ask__ripple').forEach((ripple) => ripple.remove());
		};
	}

	function handleClick(event: MouseEvent) {
		if (inactive) { event.preventDefault(); event.stopImmediatePropagation(); return; }
		onclick?.(event);
		onask?.({ label });
	}
</script>

{#snippet contents()}
	<span class="ask__skin mesh" aria-hidden="true">
		<span class="mesh__wrap">{#each [1, 2, 3, 4, 5, 6, 7] as field}<span class="blob b{field}"></span>{/each}</span>
		<span class="ask__spec"></span><span class="ask__shine"></span>
	</span>
	<span class="ask__label">
		{#if sparkle}<span class="ask__spark-custom" aria-hidden="true">{@render sparkle()}</span>
		{:else}<svg class="ask__spark" viewBox="0 0 24 24" aria-hidden="true"><g transform="translate(8.4 8.6) scale(.5) translate(-12 -12)"><path class="spark spark-b" d="M18.0841 11.612c.367.053.367.723 0 .776-3.98.574-5.122 1.715-5.696 5.696-.053.367-.723.367-.776 0-.574-3.98-1.716-5.122-5.696-5.696-.367-.053-.367-.723 0-.776 3.98-.574 5.122-1.716 5.696-5.696.053-.367.723-.367.776 0 .574 3.98 1.715 5.122 5.696 5.696Z" /></g><g transform="translate(14.2 14.6) scale(.92) translate(-12 -12)"><path class="spark spark-a" d="M18.0841 11.612c.367.053.367.723 0 .776-3.98.574-5.122 1.715-5.696 5.696-.053.367-.723.367-.776 0-.574-3.98-1.716-5.122-5.696-5.696-.367-.053-.367-.723 0-.776 3.98-.574 5.122-1.716 5.696-5.696.053-.367.723-.367.776 0 .574 3.98 1.715 5.122 5.696 5.696Z" /></g></svg>{/if}
		<span>{label}</span>
	</span>
{/snippet}

{#if href}
	<a {...anchorProps} {href} class={`ask ask--${sourceSize} ask--r-${radius} ${loading ? 'ask--loading' : ''} ${block ? 'ask--block' : ''} ${className ?? ''}`} style={inlineStyle} aria-disabled={inactive ? 'true' : undefined} aria-busy={loading ? 'true' : undefined} tabindex={inactive ? -1 : restProps.tabindex} onclick={handleClick} {@attach effects}>{@render contents()}</a>
{:else}
	<button {...restProps} type={restProps.type ?? 'button'} class={`ask ask--${sourceSize} ask--r-${radius} ${loading ? 'ask--loading' : ''} ${block ? 'ask--block' : ''} ${className ?? ''}`} style={inlineStyle} disabled={inactive} aria-busy={loading ? 'true' : undefined} onclick={handleClick} {@attach effects}>{@render contents()}</button>
{/if}

<style>
	.ask { --h:40px;--r:16px;--fs:14px;--pad:4px;--lx:16px;--c1:color-mix(in oklab,rgb(var(--rx-color)) 72%,#f8a35d);--c2:color-mix(in oklab,rgb(var(--rx-color)) 72%,#f0879b);--c3:color-mix(in oklab,rgb(var(--rx-color)) 58%,#fbe2d4);--c4:color-mix(in oklab,rgb(var(--rx-color)) 74%,#8b74f0);--c5:color-mix(in oklab,rgb(var(--rx-color)) 74%,#4a45d9);position:relative;isolation:isolate;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:calc(var(--h) + var(--pad)*2);padding:var(--pad);border:1px solid rgb(var(--rx-gray-4));border-radius:calc(var(--r) + var(--pad));background:rgb(var(--rx-background));font-family:inherit;cursor:pointer;appearance:none;text-decoration:none;transition:transform 260ms cubic-bezier(.34,1.56,.64,1),border-color 200ms,opacity 200ms; }
	.ask:active:not(:disabled):not([aria-disabled='true']){transform:scale(.972)}.ask:disabled,.ask[aria-disabled='true']{cursor:not-allowed;opacity:.55}.ask:focus-visible{outline:2px solid rgb(var(--rx-color)/.9);outline-offset:2px}.ask--sm{--h:32px;--r:12px;--fs:13px;--pad:3px;--lx:12px}.ask--lg{--h:48px;--r:20px;--fs:15px;--pad:5px;--lx:20px}.ask--r-none{--r:0px}.ask--r-subtle{--r:8px}.ask--r-pill{--r:999px}.ask--block{display:flex;width:100%}
	.ask--r-squircle{--r:26px}
	.ask__skin{position:absolute;inset:var(--pad);z-index:0;border-radius:var(--r);overflow:hidden;pointer-events:none;filter:drop-shadow(0 0 calc(18px * var(--bleed,.6)) rgb(var(--rx-color)/calc(.38 * var(--bleed,.6))))}.ask:disabled .ask__skin,.ask[aria-disabled='true'] .ask__skin{filter:saturate(.3)}.mesh{background:linear-gradient(168deg,var(--c1) 0%,var(--c2) 28%,var(--c3) 46%,var(--c4) 72%,var(--c5) 100%)}.mesh__wrap{position:absolute;inset:0;transform:translate3d(var(--par-x,0),var(--par-y,0),0);transition:transform 420ms cubic-bezier(.22,1,.36,1)}.blob{position:absolute;width:98%;height:250%;will-change:transform}
	.b1{left:-30%;top:-118%;background:radial-gradient(closest-side circle,var(--c1) 0 40%,transparent 100%);animation:ask-d1 calc(var(--sp)*var(--spm)*.71s) ease-in-out infinite;animation-delay:-.31s}.b2{left:14%;top:-132%;background:radial-gradient(closest-side circle,var(--c2) 0 38%,transparent 100%);animation:ask-d2 calc(var(--sp)*var(--spm)*.52s) ease-in-out infinite;animation-delay:-1.4s}.b3{left:50%;top:-82%;background:radial-gradient(closest-side circle,var(--c3) 0 34%,transparent 100%);animation:ask-d3 calc(var(--sp)*var(--spm)*.85s) ease-in-out infinite;animation-delay:-.63s}.b4{left:-24%;top:-14%;background:radial-gradient(closest-side circle,var(--c4) 0 40%,transparent 100%);animation:ask-d4 calc(var(--sp)*var(--spm)*.39s) ease-in-out infinite;animation-delay:-2.05s}.b5{left:44%;top:0;background:radial-gradient(closest-side circle,var(--c5) 0 42%,transparent 100%);animation:ask-d5 calc(var(--sp)*var(--spm)*.97s) ease-in-out infinite;animation-delay:-.18s}.b6{left:-4%;top:-62%;width:64%;height:196%;background:radial-gradient(closest-side circle,var(--c3) 0 36%,transparent 100%);animation:ask-d6 calc(var(--sp)*var(--spm)*.58s) ease-in-out infinite;animation-delay:-1.72s}.b7{left:62%;top:-48%;width:56%;height:180%;background:radial-gradient(closest-side circle,var(--c1) 0 36%,transparent 100%);animation:ask-d7 calc(var(--sp)*var(--spm)*.77s) ease-in-out infinite;animation-delay:-.94s}
	@keyframes ask-d1{0%,100%{transform:translate3d(0,0,0)}13%{transform:translate3d(11%,4%,0)}29%{transform:translate3d(-6%,10%,0)}44%{transform:translate3d(-14%,-3%,0)}58%{transform:translate3d(3%,-11%,0)}71%{transform:translate3d(9%,8%,0)}87%{transform:translate3d(-9%,-6%,0)}}@keyframes ask-d2{0%,100%{transform:translate3d(0,0,0)}17%{transform:translate3d(-13%,6%,0)}33%{transform:translate3d(4%,-9%,0)}49%{transform:translate3d(12%,10%,0)}62%{transform:translate3d(-8%,-4%,0)}78%{transform:translate3d(-3%,12%,0)}94%{transform:translate3d(7%,-7%,0)}}@keyframes ask-d3{0%,100%{transform:translate3d(0,0,0)}11%{transform:translate3d(-9%,-8%,0)}27%{transform:translate3d(13%,3%,0)}41%{transform:translate3d(-4%,11%,0)}56%{transform:translate3d(-11%,-5%,0)}69%{transform:translate3d(8%,-10%,0)}84%{transform:translate3d(5%,7%,0)}}@keyframes ask-d4{0%,100%{transform:translate3d(0,0,0)}15%{transform:translate3d(10%,-7%,0)}31%{transform:translate3d(-12%,4%,0)}47%{transform:translate3d(6%,12%,0)}61%{transform:translate3d(-5%,-11%,0)}76%{transform:translate3d(-10%,6%,0)}91%{transform:translate3d(9%,3%,0)}}@keyframes ask-d5{0%,100%{transform:translate3d(0,0,0)}19%{transform:translate3d(-7%,-10%,0)}34%{transform:translate3d(11%,5%,0)}48%{transform:translate3d(-3%,-6%,0)}63%{transform:translate3d(-13%,8%,0)}77%{transform:translate3d(7%,-4%,0)}92%{transform:translate3d(4%,11%,0)}}@keyframes ask-d6{0%,100%{transform:translate3d(0,0,0)}14%{transform:translate3d(8%,-11%,0)}28%{transform:translate3d(-10%,-3%,0)}43%{transform:translate3d(12%,7%,0)}59%{transform:translate3d(-6%,10%,0)}73%{transform:translate3d(-4%,-9%,0)}88%{transform:translate3d(9%,4%,0)}}@keyframes ask-d7{0%,100%{transform:translate3d(0,0,0)}12%{transform:translate3d(-8%,7%,0)}26%{transform:translate3d(10%,-6%,0)}42%{transform:translate3d(-13%,-9%,0)}57%{transform:translate3d(5%,11%,0)}72%{transform:translate3d(9%,-4%,0)}89%{transform:translate3d(-6%,8%,0)}}
	.ask__spec{position:absolute;inset:0;opacity:0;transition:opacity 260ms ease;background:radial-gradient(circle 96px at var(--mx,50%) var(--my,50%),rgb(var(--rx-light)/.38),rgb(var(--rx-light)/.12) 42%,transparent 72%)}.ask:hover .ask__spec{opacity:1}.ask__shine{position:absolute;inset:0;opacity:0;transform:translateX(-130%);background:linear-gradient(104deg,transparent 38%,rgb(var(--rx-light)/.4) 50%,transparent 62%)}.ask--loading .ask__shine{opacity:1;animation:ask-shine 1.45s linear infinite}@keyframes ask-shine{to{transform:translateX(130%)}}
	:global(.ask__ripple){position:absolute;border-radius:50%;pointer-events:none;transform:translate(-50%,-50%) scale(0);background:radial-gradient(circle,rgb(var(--rx-light)/.42) 0%,rgb(var(--rx-light)/.2) 26%,rgb(var(--rx-light)/.07) 48%,transparent 74%);opacity:0;will-change:transform,opacity;animation:ask-rip 760ms cubic-bezier(.22,1,.36,1) forwards,ask-fade 760ms cubic-bezier(.25,.1,.25,1) forwards}@keyframes ask-rip{to{transform:translate(-50%,-50%) scale(1)}}@keyframes ask-fade{from{opacity:.85}to{opacity:0}}
	.ask__label{position:relative;z-index:2;display:inline-flex;align-items:center;justify-content:center;gap:.55em;padding:0 var(--lx);font-size:var(--fs);font-weight:600;line-height:1;letter-spacing:-.01em;white-space:nowrap;color:rgb(var(--rx-light))}.ask__spark,.ask__spark-custom{display:block;flex:none;width:calc(var(--fs)*1.6);height:calc(var(--fs)*1.6);overflow:visible}.spark{fill:currentColor;transform-box:fill-box;transform-origin:center;transition:transform 460ms cubic-bezier(.34,1.56,.64,1),opacity 300ms ease}.spark-a{animation:ask-twinkle 3.4s ease-in-out infinite;filter:drop-shadow(0 0 5px rgb(var(--rx-light)/.6))}.spark-b{animation:ask-twinkle 2.6s ease-in-out .7s infinite;filter:drop-shadow(0 0 4px rgb(var(--rx-light)/.5))}@keyframes ask-twinkle{0%,100%{opacity:.82}50%{opacity:1}}.ask:hover:not(:disabled) .spark-a{transform:scale(1.14) rotate(22deg)}.ask:hover:not(:disabled) .spark-b{transform:scale(1.34) rotate(-26deg)}.ask:active:not(:disabled) .spark-a{transform:scale(.82) rotate(-14deg)}.ask:active:not(:disabled) .spark-b{transform:scale(1.6) rotate(34deg)}.ask--loading .spark-a{animation:ask-twinkle 3.4s ease-in-out infinite,ask-spin 2.1s linear infinite}.ask--loading .spark-b{animation:ask-twinkle 2.6s ease-in-out .7s infinite,ask-spin 3.4s linear reverse infinite}.ask--loading .ask__label{opacity:.86}@keyframes ask-spin{to{transform:rotate(360deg)}}
	@media(prefers-reduced-motion:reduce){.ask,.mesh__wrap,.spark{transition:none}.blob,.spark-a,.spark-b,.ask--loading .spark-a,.ask--loading .spark-b,.ask--loading .ask__shine{animation:none}.ask:active:not(:disabled){transform:none}:global(.ask__ripple){display:none}}
</style>
