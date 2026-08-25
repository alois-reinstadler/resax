<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	import type { ButtonProps } from '../button/button.svelte';
	export interface SplitButtonProps {
		label: string;
		color?: RxColor;
		variant?: ButtonProps['variant'];
		size?: 'sm' | 'md' | 'lg';
		radius?: 'none' | 'subtle' | 'rounded' | 'pill' | 'squircle';
		tone?: 'default' | 'danger' | 'warn' | 'success';
		disabled?: boolean;
		loading?: boolean;
		open?: boolean;
		gap?: number;
		goo?: boolean;
		collapseOnSelect?: boolean;
		items?: string[];
		onclick?: (event: MouseEvent) => void;
		onopenchange?: (open: boolean) => void;
		onselect?: (detail: { index: number; value: string }) => void;
		menu: Snippet;
		icon?: Snippet;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	let { label, color, size = 'md', radius = 'pill', tone = 'default', disabled = false, loading = false, open = $bindable(false), gap = 8, goo = true, collapseOnSelect = true, items = [], onclick, onopenchange, onselect, menu, icon }: SplitButtonProps = $props();
	let moving = $state(false);
	let closing = $state(false);
	let timer: number | undefined;
	let stage: HTMLDivElement;
	let layoutFrame = 0;
	let gooFrame = 0;
	const inactive = $derived(disabled || loading);
	const filterId = 'rx-split-button-goo';

	function duration(nextOpen = open) { return nextOpen ? 560 : 440; }
	function layout() {
		if (!stage) return;
		const trigger = stage.querySelector<HTMLElement>('.sb__trigger');
		const custom = [...stage.querySelectorAll<HTMLElement>('.sb__custom :is(button,a,[role="menuitem"])')];
		for (const label of custom) { label.classList.add('sb__btn','sb__item','sb__compat-item'); label.classList.toggle('is-off',!open); if ('tabIndex' in label) label.tabIndex=open?0:-1; }
		const labels = items.length ? [...stage.querySelectorAll<HTMLElement>('.sb__back,.sb__items>.sb__item')] : [stage.querySelector<HTMLElement>('.sb__back')!, ...(custom.length ? custom : [stage.querySelector<HTMLElement>('.sb__custom')!])].filter(Boolean);
		const gooLayer=stage.querySelector<HTMLElement>('.sb__goo');let slots=[...stage.querySelectorAll<HTMLElement>('.sb__slot')];
		while(slots.length<labels.length&&gooLayer){const slot=document.createElement('span');slot.className='sb__slot sb__slot--compat';slot.innerHTML='<i class="sb__blob"></i>';gooLayer.insertBefore(slot,gooLayer.querySelector('svg'));slots.push(slot)}
		while(slots.length>labels.length&&slots.at(-1)?.classList.contains('sb__slot--compat')){slots.pop()?.remove()}
		if (!trigger || !labels.length || labels.length !== slots.length) return;
		const triggerWidth = trigger.offsetWidth;
		const widths = labels.map((label) => label.offsetWidth);
		if (!triggerWidth || widths.some((width) => !width)) return;
		const spacing = Math.max(0, gap);
		const total = widths.reduce((sum, width) => sum + width, 0) + spacing * (widths.length - 1);
		let cursor = -total / 2;
		const geometry = widths.map((width) => { const cx = cursor + width / 2; cursor += width + spacing; return { cx, width }; });
		const order = geometry.map((_, index) => index).sort((a, b) => Math.abs(geometry[a].cx) - Math.abs(geometry[b].cx));
		const rank: number[] = []; order.forEach((index, position) => rank[index] = position);
		const ratio = triggerWidth / total;
		const halfHeight = stage.offsetHeight / 2;
		const last = geometry.length - 1;
		stage.style.width = `${open ? total : triggerWidth}px`;
		trigger.style.setProperty('--x', '0px');
		trigger.style.setProperty('--ld', open ? '0ms' : `${Math.round(duration(false) * .62)}ms`);
		geometry.forEach(({ cx, width }, index) => {
			const delay = (open ? rank[index] : last - rank[index]) * 26;
			let x = cx; let mergedWidth = width;
			if (!open) {
				let left = (cx - width / 2) * ratio;
				let right = (cx + width / 2) * ratio;
				if (index > 0) left -= halfHeight;
				if (index < last) right += halfHeight;
				x = (left + right) / 2; mergedWidth = right - left;
			}
			for (const target of [slots[index]]) { target.style.setProperty('--x', `${x.toFixed(2)}px`); target.style.setProperty('--w', `${mergedWidth.toFixed(2)}px`); target.style.setProperty('--d', `${delay}ms`); }
			labels[index].style.setProperty('--x', `${(open ? cx : x).toFixed(2)}px`);
			labels[index].style.setProperty('--d', `${delay}ms`);
			labels[index].style.setProperty('--ld', open ? `${Math.round(duration(true) * .58) + delay}ms` : '0ms');
		});
		stage.classList.add('is-laid-out');
	}
	function scheduleLayout() { if (layoutFrame) return; layoutFrame = requestAnimationFrame(() => { layoutFrame = 0; layout(); }); }
	function rampGoo(milliseconds: number) {
		if (gooFrame) cancelAnimationFrame(gooFrame);
		const blur = stage?.querySelector<SVGFEGaussianBlurElement>('feGaussianBlur');
		const soft = stage?.querySelector<HTMLElement>('.sb__goo');
		if (!blur || !soft || !goo || matchMedia('(prefers-reduced-motion: reduce)').matches) { soft?.style.setProperty('filter', 'none'); return; }
		const strength = size === 'sm' ? 7.2 : size === 'lg' ? 10.8 : 9;
		const start = performance.now();
		const paint = (now: number) => { const progress = Math.min(1, (now - start) / milliseconds); const amount = strength * Math.sin(Math.PI * progress) ** .7; blur.setAttribute('stdDeviation', amount.toFixed(2)); soft.style.filter = amount > .15 ? `url(#${filterId})` : 'none'; if (progress < 1) gooFrame = requestAnimationFrame(paint); else gooFrame = 0; };
		gooFrame = requestAnimationFrame(paint);
	}

	function setOpen(value: boolean, event?: MouseEvent) {
		if (inactive || value === open) return;
		event && onclick?.(event);
		closing = !value;
		open = value;
		moving = true;
		onopenchange?.(value);
		if (timer) clearTimeout(timer);
		timer = window.setTimeout(() => moving = false, duration(value) + 26 * (items.length + 1) + 60);
		scheduleLayout();
		rampGoo(duration(value) + 26 * (items.length + 1));
	}
	function select(index: number, value: string) {
		onselect?.({ index, value });
		if (collapseOnSelect) setOpen(false);
	}
	function keyboard(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false); }
		if (!open || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
		const labels = [...stage.querySelectorAll<HTMLButtonElement>('.sb__item')];
		const current = labels.indexOf(document.activeElement as HTMLButtonElement);
		if (current < 0 || !labels.length) return;
		event.preventDefault();
		const next = event.key === 'Home' ? 0 : event.key === 'End' ? labels.length - 1 : event.key === 'ArrowRight' ? (current + 1) % labels.length : (current - 1 + labels.length) % labels.length;
		labels[next].focus();
	}
	function cleanup(node: HTMLElement) {
		const click = (event: Event) => {
			if (!open || !collapseOnSelect || items.length || !(event.target as Element).closest('.sb__items :is(button,a)')) return;
			setOpen(false);
		};
		const keys=(event:Event)=>keyboard(event as KeyboardEvent);
		node.addEventListener('click', click);
		node.addEventListener('keydown',keys);
		const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(scheduleLayout);
		const mutations = new MutationObserver(scheduleLayout);
		observer?.observe(stage);
		mutations.observe(stage,{childList:true,subtree:true});
		window.addEventListener('resize', scheduleLayout);
		scheduleLayout();
		return () => { node.removeEventListener('click', click);node.removeEventListener('keydown',keys); window.removeEventListener('resize', scheduleLayout); observer?.disconnect(); mutations.disconnect(); if (timer) clearTimeout(timer); if (layoutFrame) cancelAnimationFrame(layoutFrame); if (gooFrame) cancelAnimationFrame(gooFrame); };
	}
	$effect(() => { open; items; gap; size; scheduleLayout(); });
</script>

<div role="group" aria-label={`${label} actions`} class={`sb sb--${size} sb--r-${radius} sb--t-${tone} ${open ? 'is-open' : ''} ${closing ? 'is-closing' : ''} ${moving ? 'is-moving' : ''} ${inactive ? 'is-disabled' : ''}`} style={`${styleColor(color) ?? '--rx-color:var(--rx-primary)'};--sb-gap:${gap}px`} {@attach cleanup}>
	<div class="sb__stage" class:is-moving={moving} bind:this={stage}>
		<div class="sb__goo" aria-hidden="true">
			<span class="sb__slot sb__slot--back"><i class="sb__blob"></i></span>
			{#if items.length}{#each items as _}<span class="sb__slot sb__slot--item"><i class="sb__blob"></i></span>{/each}{:else}<span class="sb__slot sb__slot--menu"><i class="sb__blob"></i></span>{/if}
			<svg width="0" height="0" aria-hidden="true" focusable="false"><defs><filter id={filterId} x="-25%" y="-80%" width="150%" height="260%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo"/><feComposite in="SourceGraphic" in2="goo" operator="atop"/></filter></defs></svg>
		</div>
		<div class="sb__layer">
			<button type="button" class="sb__btn sb__trigger" class:is-off={open} tabindex={open ? -1 : 0} disabled={inactive} aria-expanded={open} onclick={(event) => setOpen(true, event)}>{#if icon}{@render icon()}{/if}<span>{label}</span></button>
			<button type="button" class="sb__btn sb__back" class:is-off={!open} tabindex={open ? 0 : -1} disabled={inactive} aria-label="Back" onclick={() => setOpen(false)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
			<div class="sb__items" class:is-off={!open} aria-hidden={!open}>
				{#if items.length}{#each items as item, index}<button type="button" class="sb__btn sb__item" class:is-off={!open} style:opacity={open ? undefined : 0} style:filter={open ? undefined : 'blur(6px)'} style:scale={open ? undefined : .86} style:pointer-events={open ? undefined : 'none'} tabindex={open ? 0 : -1} disabled={inactive} onclick={() => select(index, item)}>{item}</button>{/each}{:else}<div class="sb__custom">{@render menu()}</div>{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.sb{--h:40px;--fs:14px;--px:18px;--r:999px;--fill:rgb(var(--rx-color));--on-fill:rgb(var(--rx-light));--open-ms:560ms;--close-ms:440ms;--dur:var(--open-ms);--ease:cubic-bezier(.34,1.26,.4,1);position:relative;display:inline-flex;height:var(--h);font-family:inherit;font-size:var(--fs);line-height:1}.sb--sm{--h:32px;--fs:13px;--px:14px}.sb--lg{--h:48px;--fs:15px;--px:22px}.sb--r-none{--r:0}.sb--r-subtle{--r:10px}.sb--r-rounded{--r:14px}.sb--r-pill{--r:999px}.sb--r-squircle{--r:calc(var(--h)*.5)}.sb--t-danger{--fill:rgb(var(--rx-danger));--on-fill:#fff}.sb--t-warn{--fill:rgb(var(--rx-warn));--on-fill:#1a1206}.sb--t-success{--fill:rgb(var(--rx-success));--on-fill:#06231a}.sb.is-closing{--dur:var(--close-ms);--ease:cubic-bezier(.32,.72,0,1)}.sb.is-disabled{opacity:.5;pointer-events:none}
	.sb__stage{position:relative;height:100%;width:0;transition:width var(--dur) var(--ease)}.sb__goo,.sb__layer{position:absolute;inset:0}.sb__goo{pointer-events:none;opacity:1}.sb__goo svg{position:absolute;width:0;height:0}.sb__slot{position:absolute;top:50%;left:50%;display:block;width:var(--w,0);height:var(--h);transform:translate(calc(-50% + var(--x,0px)),-50%);transition:width var(--dur) var(--ease) var(--d,0ms),transform var(--dur) var(--ease) var(--d,0ms)}.sb__blob{display:block;width:100%;height:100%;border-radius:var(--r);background:var(--fill);transform-origin:center;transition:background 200ms ease}.sb__stage.is-moving .sb__blob{animation:sb-liquid var(--dur) cubic-bezier(.32,.72,0,1) var(--d,0ms)}@keyframes sb-liquid{0%{transform:scale(1)}28%{transform:scale(1.12,.86)}64%{transform:scale(.97,1.05)}100%{transform:scale(1)}}
	.sb__btn{position:absolute;top:50%;left:50%;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:var(--h);padding:0 var(--px);margin:0;border:0;border-radius:var(--r);background:transparent;color:var(--on-fill);font:inherit;font-weight:500;white-space:nowrap;cursor:pointer;filter:blur(0);transform:translate(calc(-50% + var(--x,0px)),-50%);transition:transform var(--dur) var(--ease) var(--d,0ms),opacity 220ms cubic-bezier(.32,.72,0,1) var(--ld,0ms),scale 320ms cubic-bezier(.34,1.26,.4,1) var(--ld,0ms),filter 300ms cubic-bezier(.32,.72,0,1) var(--ld,0ms)}.sb__btn:focus-visible{outline:none;background:color-mix(in srgb,var(--fill) 82%,var(--on-fill))}.sb__btn:active:not(:disabled){scale:.96}.sb__trigger{min-width:120px;background:var(--fill)}.sb__back{width:var(--h);padding:0}.sb__back svg{width:18px;height:18px}.sb__items{display:contents}.sb__items :global(button),.sb__items :global(a){display:inline-flex;align-items:center;justify-content:center;height:var(--h);padding:0 var(--px);border:0;border-radius:var(--r);background:transparent;color:var(--on-fill);font:inherit;text-decoration:none;cursor:pointer}.is-off{opacity:0;scale:.86;filter:blur(6px);pointer-events:none;transition-duration:var(--dur),110ms,220ms,170ms}
	.sb__custom{display:contents}:global(.sb__compat-item){position:absolute!important;top:50%;left:50%;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:var(--h);padding:0 var(--px);margin:0;border:0;border-radius:var(--r);background:transparent;color:var(--on-fill);font:inherit;font-weight:500;white-space:nowrap;cursor:pointer;filter:blur(0);transform:translate(calc(-50% + var(--x,0px)),-50%);transition:transform var(--dur) var(--ease) var(--d,0ms),opacity 220ms cubic-bezier(.32,.72,0,1) var(--ld,0ms),scale 320ms cubic-bezier(.34,1.26,.4,1) var(--ld,0ms),filter 300ms cubic-bezier(.32,.72,0,1) var(--ld,0ms)}:global(.sb__compat-item.is-off){opacity:0;scale:.86;filter:blur(6px);pointer-events:none}:global(.sb__compat-item:focus-visible){outline:none;background:color-mix(in srgb,var(--fill) 82%,var(--on-fill))}
	.sb__stage:not(.is-laid-out){width:auto;min-width:120px}.sb__stage:not(.is-laid-out) .sb__layer{position:relative;display:flex;height:100%;align-items:center;justify-content:center}.sb__stage:not(.is-laid-out) .sb__items{position:relative;display:flex;align-items:center;gap:var(--sb-gap)}.sb__stage:not(.is-laid-out) .sb__items>.sb__item{position:relative;inset:auto;top:auto;left:auto;transform:none}.sb__stage:not(.is-laid-out) .sb__trigger,.sb__stage:not(.is-laid-out) .sb__back{z-index:2}
	@media(prefers-reduced-motion:reduce){.sb__stage,.sb__slot,.sb__btn,.sb__items{transition-duration:1ms;transition-delay:0ms}.sb.is-moving .sb__blob{animation:none}.sb__btn,.is-off{filter:none}}
</style>
