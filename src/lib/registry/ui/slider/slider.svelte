<script lang="ts" module>
	import type { RxColor } from '$lib/registry/lib/color';
	export type SliderVariant = 'base' | 'fluent' | 'glow' | 'gradient' | 'ripple' | 'stepped' | 'stops' | 'ticks';
	export interface SliderStop { label: string; value: number; }
	export interface SliderProps {
		value?: number[]; min?: number; max?: number; step?: number; color?: RxColor;
		size?: 'lg' | 'default' | 'sm'; variant?: SliderVariant; knob?: 'circle' | 'square';
		tooltip?: 'hover' | 'always' | 'none'; ticks?: boolean; tickCount?: number; disabled?: boolean;
		label?: string; showValue?: boolean; radius?: 'none' | 'subtle' | 'rounded' | 'pill' | 'squircle';
		intensity?: number; fromColor?: RxColor; toColor?: RxColor; showNotches?: boolean;
		stops?: SliderStop[]; snap?: boolean; threshold?: number; dotCount?: number; dots?: boolean;
		stiffness?: number; damping?: number; lag?: number; blur?: number; squash?: number;
		block?: boolean; bare?: boolean;
		onValueChange?: (value: number[]) => void;
	}
</script>

<script lang="ts">
	import { Slider as SliderPrimitive } from 'bits-ui';
	import { onDestroy } from 'svelte';
	import { getColor, styleColor } from '$lib/registry/lib/color';
	let {
		value = $bindable([50]), min = 0, max = 100, step = 1, color, size = 'default', variant = 'base',
		knob = 'circle', tooltip = 'hover', ticks = false, tickCount = 11, disabled = false, label = 'Volume',
		showValue = true, radius = 'pill', intensity = .7, fromColor, toColor, showNotches = true,
		stops = [{ label: 'Minimalist', value: 0 }, { label: 'Standard', value: 50 }, { label: 'Comfort', value: 100 }],
		snap = true, threshold = 6, dotCount = 41, dots = false, stiffness = 260, damping = 17,
		lag = .45, blur = 5, squash = .045, block = false, bare = false, onValueChange
	}: SliderProps = $props();
	let shell: HTMLDivElement;
	let effectId = $state(0);
	let effectPct = $state(0);
	let ghostPct = $state(0);
	let ghostFrame = 0;
	let baseFrame = 0;
	let baseOverflow = 0;
	let baseSide = $state<'left' | 'right' | 'middle'>('middle');
	let baseSideTimer: ReturnType<typeof setTimeout> | undefined;
	let fluentDotCount = $state(2);
	let stopTrack = $state<HTMLDivElement>();
	let stopDragging = $state(false);
	let stopFrame = 0;
	let stopPreviousTime = 0;
	let stopInitialized = false;
	let stopDisplay = $state(.5);
	let stopLagDisplay = $state(.5);
	let stopVelocity = $state(0);
	let stopLevels = $state<number[]>([]);
	class Spring {
		x = 0; v = 0; target = 0;
		k: number; d: number;
		constructor(k: number, d: number) { this.k = k; this.d = d; }
		step(dt: number) { const half = dt / 2; for (let index = 0; index < 2; index += 1) { const force = -this.k * (this.x - this.target) - this.d * this.v; this.v += force * half; this.x += this.v * half; } }
		get settled() { return Math.abs(this.v) < .002 && Math.abs(this.x - this.target) < .002; }
		snap() { this.x = this.target; this.v = 0; }
	}
	const stopLead = new Spring(260, 17);
	const stopLag = new Spring(187.46, 14.705);
	let stopSprings: Spring[] = [];
	const intervalCount = $derived(Math.max(0, Math.round((max - min) / Math.max(step, Number.EPSILON))));
	const notchValues = $derived(Array.from({ length: intervalCount <= 200 ? intervalCount + 1 : 0 }, (_, index) => min + index * step));
	const normalizedTickCount = $derived(Math.max(2, Math.min(50, tickCount)));
	const normalizedDotCount = $derived(Math.max(5, Math.min(81, dotCount)));
	const stopHandleWidth = $derived(size === 'sm' ? 9 : size === 'lg' ? 12 : 10);
	const tickValues = $derived(Array.from({ length: normalizedTickCount }, (_, index) => min + index / (normalizedTickCount - 1) * (max - min)));
	const dotValues = $derived(Array.from({ length: normalizedDotCount }, (_, index) => index / (normalizedDotCount - 1) * 100));
	const primary = $derived(value[0] ?? min);
	const pct = $derived(max === min ? 0 : Math.max(0, Math.min(100, (primary - min) / (max - min) * 100)));
	const gradientFrom = $derived(getColor(fromColor ?? color ?? 'primary') ?? 'var(--rx-primary)');
	const gradientTo = $derived(getColor(toColor) ?? `var(--rx-color-hover, var(--rx-primary-hover))`);
	const selectionInk = $derived(color === 'success' || color === 'danger' || color === 'warn' ? '0 0 0' : color === 'dark' ? 'var(--rx-dark-contrast-rgb)' : !color || color === 'primary' ? '255 255 255' : 'var(--rx-color-contrast)');
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --slider-selection-ink:${selectionInk}; --slider-intensity:${Math.max(0, Math.min(1, intensity))}; --slider-from:${gradientFrom}; --slider-to:${gradientTo}; --slider-pct:${pct}%`);

	function percent(next: number) { return max === min ? 0 : Math.max(0, Math.min(100, (next - min) / (max - min) * 100)); }
	function changed(next: number[]) {
		value = next; effectPct = percent(next[0] ?? min); effectId += 1; onValueChange?.(next);
	}
	function setPrimary(next: number) { if (disabled) return; const copy = [...value]; copy[0] = Math.max(min, Math.min(max, next)); changed(copy); }
	function stepPrimary(direction: -1 | 1) { setPrimary(primary + direction * (variant === 'base' ? (max - min) / 20 || 1 : step)); if (variant === 'base') baseNudge(direction); }
	function paintBaseOverflow(next: number, side = baseSide) { baseOverflow = next; baseSide = side; const track = shell?.querySelector('.rx-slider')?.getBoundingClientRect(); const width = Math.max(1,track?.width ?? 1); shell?.style.setProperty('--stretch',String(1+next/width)); shell?.style.setProperty('--stretch-y',String(1+next/50*(.8-1))); shell?.style.setProperty('--stretch-origin',side === 'left' ? 'right' : side === 'right' ? 'left' : 'center'); shell?.style.setProperty('--left-shift',`${side === 'left' ? -next/1.2 : 0}px`); shell?.style.setProperty('--right-shift',`${side === 'right' ? next/1.2 : 0}px`); }
	function cancelBaseMotion() { if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(baseFrame); baseFrame = 0; }
	function animateBaseSpring(bounce = .4, duration = 500) { cancelBaseMotion(); const initial = baseOverflow; if (!initial || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)) { paintBaseOverflow(0,'middle'); return; } const started=performance.now(),omega=Math.sqrt(170),ratio=26*(1-bounce)/(2*Math.sqrt(170)),damped=omega*Math.sqrt(Math.max(0,1-ratio*ratio)); const frame=(now:number)=>{ const elapsed=now-started,t=elapsed/1000; const factor=ratio<1 ? Math.exp(-ratio*omega*t)*(Math.cos(damped*t)+ratio*omega/damped*Math.sin(damped*t)) : Math.exp(-omega*t); const next=initial*factor; paintBaseOverflow(next); if (!(Math.abs(next)<.01 && elapsed>100) && elapsed<duration*3) baseFrame=requestAnimationFrame(frame); else { baseFrame=0; paintBaseOverflow(0,'middle'); } }; baseFrame=requestAnimationFrame(frame); }
	function baseNudge(direction: -1|1) { cancelBaseMotion(); paintBaseOverflow(10.4,direction<0?'left':'right'); clearTimeout(baseSideTimer); baseSideTimer=setTimeout(()=>baseSide='middle',520); requestAnimationFrame(()=>animateBaseSpring(.12,420)); }
	function pointerGlow(event: PointerEvent) {
		if (variant !== 'base' && variant !== 'fluent') return;
		const box = shell.getBoundingClientRect(); shell.style.setProperty('--gx', `${event.clientX - box.left}px`); shell.style.setProperty('--gy', `${event.clientY - box.top}px`); shell.style.setProperty('--glow', '1');
		if (variant === 'base' && event.buttons !== 0) {
			const track = shell.querySelector('.rx-slider__track')?.getBoundingClientRect();
			if (track) { cancelBaseMotion(); const raw = event.clientX < track.left ? track.left-event.clientX : event.clientX > track.right ? event.clientX-track.right : 0; const elastic = 2*(1/(1+Math.exp(-(raw/50)))-.5)*50; paintBaseOverflow(elastic,event.clientX<track.left?'left':event.clientX>track.right?'right':'middle'); }
		}
	}
	function settle() { shell?.style.setProperty('--glow', '0'); if (variant === 'base') animateBaseSpring(.4,500); }
	function closestStop() { return stops.length ? stops.reduce((closest, stop) => Math.abs(stop.value - primary) < Math.abs(closest.value - primary) ? stop : closest, stops[0]) : undefined; }
	function selectStop(stop: SliderStop) { setPrimary(stop.value); }
	function stopIndex(next = primary) { const radius = Math.max(0, Math.min(50, threshold)) / 100 * Math.max(1, max - min); let index = -1; let distance = Infinity; stops.forEach((stop, candidate) => { const nextDistance = Math.abs(next - stop.value); if (nextDistance <= radius && nextDistance < distance) { index = candidate; distance = nextDistance; } }); return index; }
	function configureStopSprings() {
		stopLead.k = Math.max(20, Math.min(1200, stiffness)); stopLead.d = Math.max(2, Math.min(120, damping));
		stopLag.k = stopLead.k * (1 - Math.max(0, Math.min(1, lag)) * .62); stopLag.d = stopLead.d * (1 - Math.max(0, Math.min(1, lag)) * .3);
		if (stopSprings.length !== stops.length) stopSprings = stops.map((_, index) => { const spring = new Spring(stopLead.k * (1 + index * .04), stopLead.d); spring.x = 0; return spring; });
		const target = pct / 100; stopLead.target = target; stopLag.target = target; const active = stopIndex(); stopSprings.forEach((spring, index) => { spring.k = stopLead.k * (1 + index * .04); spring.d = stopLead.d; spring.target = index === active ? 1 : 0; });
	}
	function renderStopSpring() { stopDisplay = stopLead.x; stopLagDisplay = stopLag.x; stopVelocity = stopLead.v; stopLevels = stopSprings.map((spring) => spring.x); }
	function animateStops(time: number) {
		stopFrame = 0; const dt = Math.min(.032, stopPreviousTime ? (time - stopPreviousTime) / 1000 : 1 / 60); stopPreviousTime = time;
		stopLead.step(dt); stopLag.step(dt); stopSprings.forEach((spring) => spring.step(dt)); renderStopSpring();
		if (stopLead.settled && stopLag.settled && stopSprings.every((spring) => spring.settled)) { stopLead.snap(); stopLag.snap(); stopSprings.forEach((spring) => spring.snap()); renderStopSpring(); stopPreviousTime = 0; return; }
		stopFrame = requestAnimationFrame(animateStops);
	}
	function startStopSpring() {
		configureStopSprings();
		if (!stopInitialized) { stopInitialized = true; stopLead.snap(); stopLag.snap(); stopSprings.forEach((spring) => spring.snap()); renderStopSpring(); return; }
		if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) { stopLead.snap(); stopLag.snap(); stopSprings.forEach((spring) => spring.snap()); renderStopSpring(); return; }
		if (!stopFrame) { stopPreviousTime = 0; stopFrame = requestAnimationFrame(animateStops); }
	}
	function valueFromStopPointer(event: PointerEvent) { const track = event.currentTarget as HTMLDivElement; const box = track.getBoundingClientRect(); return min + Math.max(0, Math.min(1, (event.clientX - box.left) / Math.max(1, box.width))) * (max - min); }
	function snapStopValue(next: number) { if (!snap) return next; const radius = Math.max(0, Math.min(50, threshold)) / 100 * Math.max(1, max - min); const nearest = stops.reduce<SliderStop | undefined>((found, stop) => Math.abs(stop.value - next) <= radius && (!found || Math.abs(stop.value - next) < Math.abs(found.value - next)) ? stop : found, undefined); return nearest?.value ?? next; }
	function stopPointerDown(event: PointerEvent) { if (disabled) return; stopDragging = true; (event.currentTarget as HTMLDivElement).setPointerCapture?.(event.pointerId); effectPct = Math.max(0, Math.min(100, percent(valueFromStopPointer(event)))); effectId += 1; setPrimary(snapStopValue(valueFromStopPointer(event))); }
	function stopPointerMove(event: PointerEvent) { if (stopDragging) setPrimary(snapStopValue(valueFromStopPointer(event))); }
	function stopPointerUp(event: PointerEvent) { stopDragging = false; (event.currentTarget as HTMLDivElement).releasePointerCapture?.(event.pointerId); }
	function stopKeydown(event: KeyboardEvent) { const direction = event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'PageUp' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'PageDown' ? -1 : 0; if (event.key === 'Home') { event.preventDefault(); setPrimary(min); return; } if (event.key === 'End') { event.preventDefault(); setPrimary(max); return; } if (!direction) return; event.preventDefault(); if (snap || event.key.startsWith('Page')) { const ordered = [...stops].sort((a,b) => a.value-b.value); const next = direction > 0 ? ordered.find((item) => item.value > primary + (max-min)*.001) : [...ordered].reverse().find((item) => item.value < primary - (max-min)*.001); setPrimary(next?.value ?? (direction > 0 ? max : min)); } else setPrimary(primary + direction * ((max - min) / 100 || 1)); }
	function observeFluent(node: HTMLElement) { const update = () => { const width = node.clientWidth; const pad = size === 'sm' ? 13 : size === 'lg' ? 20 : 16; const available = Math.max(0, width - pad * 2); const capacity = available ? Math.max(2, Math.floor(available / 15) + 1) : 41; const steps = Math.max(1, Math.round((max-min)/Math.max(step, Number.EPSILON))); let count = Math.min(steps + 1, capacity); if (steps + 1 > capacity) { count = 2; for (let divisor = 2; divisor <= steps; divisor += 1) if (steps % divisor === 0 && steps / divisor + 1 <= capacity) { count = steps / divisor + 1; break; } for (const option of [20,16,12,10,8,6,5,4,3,2]) if (option + 1 <= capacity) count = Math.max(count, option + 1); } fluentDotCount = count; }; update(); const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update); observer?.observe(node); return () => observer?.disconnect(); }
	$effect(() => {
		const target = pct; cancelAnimationFrame(ghostFrame);
		const follow = () => { ghostPct += (target - ghostPct) * .12; if (Math.abs(target - ghostPct) > .04) ghostFrame = requestAnimationFrame(follow); else ghostPct = target; };
		ghostFrame = requestAnimationFrame(follow);
	});
	$effect(() => { if (variant === 'stops') { primary; stops; stiffness; damping; lag; startStopSpring(); } });
	onDestroy(() => { if (typeof cancelAnimationFrame !== 'undefined') { cancelAnimationFrame(ghostFrame); cancelAnimationFrame(stopFrame); cancelAnimationFrame(baseFrame); } clearTimeout(baseSideTimer); });
</script>

<div bind:this={shell} class={`rx-slider-shell rx-slider-shell--${size} rx-slider-shell--${variant} rx-slider-shell--r-${radius}`} class:is-block={block} class:is-bare={bare} class:side-left={baseSide === 'left'} class:side-right={baseSide === 'right'} style={inlineStyle} data-variant={variant} role="presentation" onpointermove={pointerGlow} onpointerleave={settle} onpointerup={settle} onpointercancel={settle}>
	{#if variant === 'stops'}
		<div class="rx-slider__labels">{#each stops as stop, index}<button type="button" disabled={disabled} style={`left:${percent(stop.value)}%;--pp:${Math.max(0,Math.min(1,stopLevels[index] ?? 0))*100}%;--label-x:${percent(stop.value)}%`} onclick={() => selectStop(stop)}>{stop.label}</button>{/each}</div>
	{/if}
	{#if showValue && variant !== 'fluent'}<output class="rx-slider__value">{Math.round(primary)}</output>{/if}
	{#if variant === 'stops'}
		<div bind:this={stopTrack} class="rx-slider__stop-track" class:is-dragging={stopDragging} role="slider" tabindex={disabled ? -1 : 0} aria-label={label} aria-valuemin={min} aria-valuemax={max} aria-valuenow={primary} aria-valuetext={closestStop()?.label ?? String(primary)} aria-disabled={disabled || undefined}
			onpointerdown={stopPointerDown} onpointermove={stopPointerMove} onpointerup={stopPointerUp} onpointercancel={stopPointerUp} onkeydown={stopKeydown}>
			{#each dotValues.filter((dot) => !stops.some((stop) => Math.abs(percent(stop.value)-dot) < (100/(normalizedDotCount-1))*.9)) as dot}<span class="rx-slider__dot" style={`left:${dot}%`}></span>{/each}
			{#each stops as stop, index}<span class="rx-slider__stop" style={`left:${percent(stop.value)}%;--pp:${Math.max(0,Math.min(1,stopLevels[index] ?? 0))*100}%`}><i></i></span>{/each}
			<span class="rx-slider__stop-rail" style={`transform:translate3d(${stopLagDisplay*100}%,0,0);filter:${Math.min(Math.max(0,blur),Math.abs(stopVelocity)*Math.max(1,stopTrack?.clientWidth ?? 0)*.004)>.05?`blur(${Math.min(Math.max(0,blur),Math.abs(stopVelocity)*Math.max(1,stopTrack?.clientWidth ?? 0)*.004)}px)`:'none'}`}>
				<span class="rx-slider__stop-handle" style={`transform:translate(-50%,-50%) scale(${Math.max(.5,Math.min(1.8,1+Math.max(-.3,Math.min(.3,stopVelocity*Math.max(0,Math.min(.12,squash))))))},${Math.max(.5,Math.min(1.8,1-Math.max(-.3,Math.min(.3,stopVelocity*Math.max(0,Math.min(.12,squash)))))*.62)})`}><i style={`transform:translate3d(${Math.max(-stopHandleWidth*.45,Math.min(stopHandleWidth*.45,(stopDisplay-stopLagDisplay)*(stopTrack?.clientWidth ?? 0)))}px,0,0)`}></i></span>
			</span>
			{#if effectId > 0}{#key effectId}<span class="rx-slider__wave" style={`left:${effectPct}%`}></span>{/key}{/if}
		</div>
	{:else}<div class="rx-slider__row">
		{#if variant === 'base'}<button type="button" class="rx-slider__icon" aria-label="Decrease" disabled={disabled || primary <= min} onclick={() => stepPrimary(-1)}>−</button>{/if}
		<SliderPrimitive.Root type="multiple" bind:value min={min} max={max} {step} {disabled} onValueChange={changed} class="rx-slider">
			{#snippet children({ thumbItems })}
				<span class="rx-slider__track">
					{#if variant === 'base'}<span class="rx-slider__ghost" style={`width:${ghostPct}%`} aria-hidden="true"></span>{/if}
					{#if variant === 'fluent'}
						{#if dots}<span class="rx-slider__fluent-dots" style={`--prog:${ghostPct};--labelw:${label.length};--valuew:${showValue?String(Math.round(primary)).length:0}`} {@attach observeFluent}>{#each Array.from({length:fluentDotCount})}<i></i>{/each}</span>{/if}
						<span class="rx-slider__fluent-fill" style={`width:${ghostPct}%`}></span><span class="rx-slider__fluent-thumb" style={`left:${ghostPct}%`}></span>
						<span class="rx-slider__fluent-content"><span>{label}</span>{#if showValue}<strong>{Math.round(primary)}</strong>{/if}</span>
					{/if}
					{#if variant === 'base' || variant === 'fluent'}<span class="rx-slider__proximity" aria-hidden="true"></span>{/if}
					{#if variant === 'stepped' && showNotches}{#each notchValues as notch}<span class="rx-slider__notch" style={`left:${percent(notch)}%`}></span>{/each}{/if}
					{#if variant === 'ticks' || ticks}{#each tickValues as tick}<span class="rx-slider__tick" class:is-on={primary >= tick} style={`left:${percent(tick)}%`}></span>{/each}{/if}
					<SliderPrimitive.Range class="rx-slider__range" />
					{#if variant === 'glow'}<span class="rx-slider__range-halo" aria-hidden="true"></span>{/if}
					{#if effectId > 0 && variant === 'ripple'}{#key effectId}<span class="rx-slider__wave" style={`left:${effectPct}%`}></span>{/key}{/if}
				</span>
				{#each thumbItems as thumb (thumb.index)}
					<SliderPrimitive.Thumb index={thumb.index} class={`rx-slider__thumb rx-slider__thumb--${knob}`} aria-label={`Value ${thumb.index + 1}`}>
						{#if effectId > 0 && variant === 'stepped'}{#key effectId}<span class="rx-slider__snap"></span>{/key}{/if}
						<span class={`rx-slider__tooltip rx-slider__tooltip--${tooltip}`}>{thumb.value}</span>
					</SliderPrimitive.Thumb>
				{/each}
			{/snippet}
		</SliderPrimitive.Root>
			{#if variant === 'base'}<button type="button" class="rx-slider__icon" aria-label="Increase" disabled={disabled || primary >= max} onclick={() => stepPrimary(1)}>+</button>{/if}
		</div>
	{/if}
</div>

<style>
	.rx-slider-shell { --slider-w: 200px; --slider-h: 8px; --slider-thumb: 16px; --slider-fs: 13px; position: relative; display: flex; width: var(--slider-w); max-width: 100%; flex-direction: column; align-items: center; gap: 8px; color: rgb(var(--rx-text)); user-select: none; }
	.rx-slider-shell--sm { --slider-w: 160px; --slider-h: 6px; --slider-thumb: 13px; }
	.rx-slider-shell--lg { --slider-w: 260px; --slider-h: 10px; --slider-thumb: 20px; }
	.rx-slider-shell.is-block { width: 100%; }
	.rx-slider__value { margin: 0; color: rgb(var(--rx-text-secondary)); font-size: var(--slider-fs); font-weight: 500; letter-spacing: .04em; }
	.rx-slider__row { display: flex; width: 100%; align-items: center; gap: 12px; transition: scale 200ms cubic-bezier(.22,1,.36,1), opacity 200ms ease; }
	.rx-slider-shell--base { --slider-w: 192px; }
	.rx-slider-shell--base.rx-slider-shell--sm { --slider-w: 150px; }
	.rx-slider-shell--base.rx-slider-shell--lg { --slider-w: 240px; }
	.rx-slider-shell--base .rx-slider__row { opacity: .7; }
	.rx-slider-shell--base .rx-slider__row:hover, .rx-slider-shell--base .rx-slider__row:focus-within { scale: 1.2; opacity: 1; }
	.rx-slider-shell--base :global(.rx-slider) { transform: scaleX(var(--stretch,1)) scaleY(var(--stretch-y,1)); transform-origin: var(--stretch-origin,center); will-change: transform; }
	.rx-slider-shell--base .rx-slider__track { height: 6px; transition: height 200ms cubic-bezier(.22,1,.36,1), margin 200ms cubic-bezier(.22,1,.36,1); }
	.rx-slider-shell--base .rx-slider__row:hover .rx-slider__track, .rx-slider-shell--base .rx-slider__row:focus-within .rx-slider__track { height: 12px; margin-block: -3px; }
	.rx-slider__icon { position: relative; display: inline-grid; width: 18px; height: 18px; flex: none; padding: 0; place-items: center; border: 0; border-radius: 50%; color: rgb(var(--rx-text-secondary)); background: transparent; cursor: pointer; font: inherit; font-size: 16px; line-height: 1; transition: transform 160ms cubic-bezier(.34,1.56,.64,1), color 140ms ease; }
	.rx-slider-shell--base .rx-slider__icon:first-child { translate: var(--left-shift,0) 0; }
	.rx-slider-shell--base .rx-slider__icon:last-child { translate: var(--right-shift,0) 0; }
	.rx-slider-shell--base.side-left .rx-slider__icon:first-child { animation: rx-slider-icon-pulse 250ms cubic-bezier(.22,1,.36,1); }
	.rx-slider-shell--base.side-right .rx-slider__icon:last-child { animation: rx-slider-icon-pulse 250ms cubic-bezier(.22,1,.36,1); }
	.rx-slider__icon:hover:not(:disabled) { color: rgb(var(--rx-text)); transform: scale(1.18); }
	.rx-slider__icon:active:not(:disabled) { transform: scale(.85); }
	.rx-slider__icon:focus-visible { outline: 2px solid rgb(var(--rx-color)); outline-offset: 3px; }
	.rx-slider__icon:disabled { opacity: .35; cursor: not-allowed; }
	:global(.rx-slider) { position: relative; display: flex; width: 100%; height: calc(var(--slider-thumb) + 16px); align-items: center; touch-action: none; }
	.rx-slider__track { position: relative; display: block; width: 100%; height: var(--slider-h); border: 1px solid rgb(var(--rx-border)); border-radius: 9999px; background: rgb(var(--rx-surface-2)); cursor: grab; }
	:global(.rx-slider__range) { position: absolute; inset-block: 0; height: 100%; border-radius: inherit; background: rgb(var(--rx-color)); }
	.rx-slider__ghost { position: absolute; inset: 0 auto 0 0; border-radius: inherit; background: rgb(var(--rx-text-muted)/.22); pointer-events: none; }
	:global(.rx-slider__thumb) { position: relative; display: block; box-sizing: border-box; width: var(--slider-thumb); height: var(--slider-thumb); border: 2px solid rgb(var(--rx-color)); border-radius: 9999px; background: rgb(var(--rx-background)); box-shadow: 0 2px 6px rgb(var(--rx-dark) / .35); transition: box-shadow 160ms ease, transform 180ms cubic-bezier(.22,1,.36,1); }
	:global(.rx-slider__thumb--square) { border-radius: calc(var(--rx-radius) * .35); }
	:global(.rx-slider__thumb:focus-visible) { outline: 2px solid rgb(var(--rx-color)); outline-offset: 4px; }
	:global(.rx-slider__thumb[data-active]) { transform: scale(1.08); }
	.rx-slider__tooltip { position: absolute; left: 50%; bottom: calc(100% + 8px); translate: -50% 3px; padding: 2px 7px; border: 1px solid rgb(var(--rx-text)); border-radius: 6px; color: rgb(var(--rx-background)); background: rgb(var(--rx-text)); font-size: 11px; font-weight: 600; line-height: 1; opacity: 0; pointer-events: none; white-space: nowrap; transition: opacity 160ms ease, translate 160ms ease; }
	.rx-slider__tooltip--always, :global(.rx-slider__thumb:hover) .rx-slider__tooltip--hover, :global(.rx-slider__thumb:focus-visible) .rx-slider__tooltip--hover, :global(.rx-slider__thumb[data-active]) .rx-slider__tooltip--hover { opacity: 1; translate: -50% 0; }
	.rx-slider__tooltip--none { display: none; }

	/* masked pointer-following border light used by the source base/fluent tracks. */
	.rx-slider__proximity { position: absolute; inset: -1px; z-index: 5; border-radius: inherit; padding: 1px; pointer-events: none; background: radial-gradient(60px circle at var(--gx,50%) var(--gy,50%), rgb(var(--rx-color)/.6), rgb(var(--rx-color)/.42) 30%, rgb(var(--rx-color)/.16) 58%, transparent 82%), radial-gradient(200px circle at var(--gx,50%) var(--gy,50%), rgb(var(--rx-color)/.6), rgb(var(--rx-color)/.27) 42%, rgb(var(--rx-color)/.08) 66%, transparent 85%); mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; opacity: calc(var(--glow,0) * .7); transition: opacity 140ms; }

	/* fluent: 260/48 geometry, frosted track/fill and its defining 2px handle line. */
	.rx-slider-shell--fluent { --slider-w: 260px; --slider-h: 48px; --slider-thumb: 2px; --slider-fs: 14px; }
	.rx-slider-shell--fluent.rx-slider-shell--sm { --slider-w: 210px; --slider-h: 40px; --slider-fs: 13px; }
	.rx-slider-shell--fluent.rx-slider-shell--lg { --slider-w: 320px; --slider-h: 58px; --slider-fs: 15px; }
	.rx-slider-shell--fluent :global(.rx-slider) { height: var(--slider-h); }
	.rx-slider-shell--fluent .rx-slider__track { height: 100%; overflow: hidden; border: 0; border-radius: 999px; background: rgb(var(--rx-text)/.06); backdrop-filter: blur(14px) saturate(1.4); box-shadow: inset 0 1px rgb(var(--rx-text)/.14), inset 0 0 0 1px rgb(var(--rx-text)/.08); }
	.rx-slider-shell--r-none .rx-slider__track { border-radius: 0; }
	.rx-slider-shell--r-subtle .rx-slider__track { border-radius: 8px; }
	.rx-slider-shell--r-rounded .rx-slider__track { border-radius: var(--rx-radius); }
	.rx-slider-shell--fluent :global(.rx-slider__range) { display: none; }
	.rx-slider__fluent-fill { position: absolute; inset: 0 auto 0 0; z-index: 3; height: 100%; border-radius: inherit; background: rgb(var(--rx-text)/.14); backdrop-filter: blur(10px) saturate(1.3); box-shadow: inset 0 1px rgb(var(--rx-text)/.16); }
	.rx-slider__fluent-thumb { position: absolute; top: 50%; z-index: 4; width: 2px; height: calc(var(--slider-fs) + 4px); border-radius: 999px; background: rgb(var(--rx-text)); opacity: 0; translate: -16px -50%; transition: opacity 160ms ease; }
	.rx-slider-shell--fluent:hover .rx-slider__fluent-thumb, .rx-slider-shell--fluent:focus-within .rx-slider__fluent-thumb { opacity: 1; }
	.rx-slider__fluent-content { position: absolute; inset: 0; z-index: 4; display: flex; padding: 0 16px; align-items: center; gap: 10px; pointer-events: none; font-size: var(--slider-fs); }
	.rx-slider__fluent-content strong { margin-left: auto; font-variant-numeric: tabular-nums; transition: transform 260ms cubic-bezier(.34,1.56,.64,1); }
	.rx-slider__fluent-dots { position: absolute; inset: 0 16px; z-index: 1; display: flex; align-items: center; justify-content: space-between; pointer-events: none; --lz: max(calc(var(--labelw,0) * 1ch + 6px), calc(var(--prog,0) * 1%)); --rz: calc(var(--valuew,0) * 1ch); mask-image: linear-gradient(90deg,transparent 0,transparent var(--lz),#000 calc(var(--lz) + 12px),#000 calc(100% - var(--rz) - 12px),transparent calc(100% - var(--rz)),transparent 100%); }
	.rx-slider-shell--fluent.rx-slider-shell--sm .rx-slider__fluent-dots { inset-inline: 13px; }
	.rx-slider-shell--fluent.rx-slider-shell--lg .rx-slider__fluent-dots { inset-inline: 20px; }
	.rx-slider__fluent-dots i { width: 3px; height: 3px; border-radius: 999px; background: rgb(var(--rx-text)/.4); }
	.rx-slider-shell--fluent :global(.rx-slider__thumb) { z-index: 4; height: calc(var(--slider-fs) + 4px); border: 0; border-radius: 999px; background: transparent; box-shadow: none; opacity: 0; }
	.rx-slider-shell--fluent .rx-slider__tooltip { display: none; }

	/* glow: exact two-shadow bloom and composited 2.2s brightness copy. */
	.rx-slider-shell--glow :global(.rx-slider__range) { box-shadow: 0 0 calc(6px * var(--slider-intensity)) rgb(var(--rx-color)/.9), 0 0 calc(16px * var(--slider-intensity)) rgb(var(--rx-color)/.6); }
	.rx-slider__range-halo { position: absolute; inset: 0 auto 0 0; width: var(--slider-pct); height: 100%; border-radius: inherit; background: rgb(var(--rx-color)); box-shadow: 0 0 calc(6px * var(--slider-intensity)) rgb(var(--rx-color)/.9), 0 0 calc(16px * var(--slider-intensity)) rgb(var(--rx-color)/.6); filter: brightness(calc(1 + .35 * var(--slider-intensity))); opacity: 0; animation: rx-slider-glow 2.2s ease-in-out infinite; }
	.rx-slider-shell--glow :global(.rx-slider__thumb) { background: rgb(var(--rx-color)); box-shadow: 0 0 calc(8px * var(--slider-intensity)) rgb(var(--rx-color)/.9), 0 0 calc(20px * var(--slider-intensity)) rgb(var(--rx-color)/.55); }

	/* gradient: source three-stop 200% fill pan and active 6px target ring. */
	.rx-slider-shell--gradient :global(.rx-slider__range) { background: linear-gradient(90deg, rgb(var(--slider-from)), rgb(var(--slider-to)), rgb(var(--slider-from))); background-size: 200% 100%; animation: rx-slider-gradient 3s linear infinite; }
	.rx-slider-shell--gradient :global(.rx-slider__thumb) { border-color: rgb(var(--slider-to)); background: rgb(var(--rx-light)); }
	.rx-slider-shell--gradient :global(.rx-slider__thumb:is([data-active],:focus-visible)) { box-shadow: 0 0 0 6px rgb(var(--slider-to)/.3); }

	.rx-slider__wave { position: absolute; top: 50%; z-index: 3; width: var(--slider-thumb); height: var(--slider-thumb); border: 2px solid rgb(var(--rx-color)); border-radius: 999px; translate: -50% -50%; pointer-events: none; animation: rx-slider-wave 550ms ease-out forwards; }
	.rx-slider-shell--stops .rx-slider__wave { width: 8px; height: 8px; border: 0; background: rgb(var(--rx-color)/.35); animation: rx-slider-stop-wave 520ms ease-out forwards; }

	.rx-slider__notch { position: absolute; top: 50%; width: 4px; height: 4px; border-radius: 999px; background: rgb(var(--rx-border)); translate: -50% -50%; }
	.rx-slider-shell--stepped :global(.rx-slider__range), .rx-slider-shell--stepped :global(.rx-slider__thumb) { transition: width 260ms cubic-bezier(.22,1.4,.36,1), left 260ms cubic-bezier(.22,1.4,.36,1); }
	.rx-slider__snap { position: absolute; inset: -2px; border-radius: inherit; animation: rx-slider-snap 220ms ease-out; }

	.rx-slider__tick { position: absolute; top: 50%; z-index: 2; width: 2px; height: calc(var(--slider-h) + 6px); border-radius: 999px; background: rgb(var(--rx-border)); translate: -50% -50%; transition: background 180ms ease, transform 180ms ease; }
	.rx-slider__tick.is-on { background: rgb(var(--rx-color)); transform: scaleY(1.15); }

	.rx-slider-shell--stops { --slider-w: 380px; --slider-thumb: 10px; gap: 10px; padding: 14px 20px 18px; box-sizing: border-box; border: 1px solid rgb(var(--rx-border)); border-radius: calc(var(--rx-radius) * 1.17); background: rgb(var(--rx-surface-2)); }
	.rx-slider-shell--stops.rx-slider-shell--sm { --slider-w: 300px; --slider-thumb: 9px; padding: 12px 16px 15px; }
	.rx-slider-shell--stops.rx-slider-shell--lg { --slider-w: 460px; --slider-thumb: 12px; padding: 16px 24px 21px; }
	.rx-slider-shell--stops.is-bare { padding: 0; border-color: transparent; background: transparent; }
	.rx-slider__labels { position: relative; width: 100%; height: 28px; }
	.rx-slider__labels button { position: absolute; top: 0; padding: 4px 12px; border: 0; border-radius: 999px; color: color-mix(in srgb,rgb(var(--slider-selection-ink)) var(--pp,0%),rgb(var(--rx-text-secondary))); background: color-mix(in srgb,rgb(var(--rx-color)) var(--pp,0%),transparent); cursor: pointer; font: inherit; font-size: var(--slider-fs); font-weight: 500; letter-spacing: -.01em; white-space: nowrap; transform: translateX(calc(-1 * var(--label-x))) scale(calc(1 + .055 * var(--pp,0%) / 100%)); }
	.rx-slider__labels button:focus-visible { outline: 2px solid rgb(var(--rx-color)/.8); outline-offset: 2px; }
	.rx-slider__dot { position: absolute; top: 50%; width: 3px; height: 3px; border-radius: 999px; background: rgb(var(--rx-border)); translate: -50% -50%; }
	.rx-slider__stop-track { position: relative; width: 100%; height: 28px; border-radius: 6px; cursor: pointer; touch-action: none; outline: none; }
	.rx-slider__stop-track.is-dragging { cursor: grabbing; }
	.rx-slider__stop-track:focus-visible { outline: 2px solid rgb(var(--rx-color)/.8); outline-offset: 5px; }
	.rx-slider__stop { position: absolute; top: 50%; z-index: 2; display: grid; width: 9px; height: 9px; box-sizing: border-box; place-items: center; border: 1px solid color-mix(in srgb,rgb(var(--rx-color)) var(--pp,0%),rgb(var(--rx-border))); border-radius: 999px; translate: -50% -50%; }
	.rx-slider__stop i { width: 3px; height: 3px; border-radius: 999px; background: color-mix(in srgb,rgb(var(--rx-color)) var(--pp,0%),rgb(var(--rx-border))); }
	.rx-slider__stop-rail { position: absolute; inset: 0; z-index: 3; pointer-events: none; will-change: transform,filter; }
	.rx-slider__stop-handle { position: absolute; left: 0; top: 50%; display: grid; width: var(--slider-thumb); height: 26px; place-items: center; border-radius: 999px; background: rgb(var(--rx-color)); box-shadow: 0 2px 8px rgb(var(--rx-dark)/.28); will-change: transform; }
	.rx-slider-shell--stops.rx-slider-shell--sm .rx-slider__stop-handle { height: 22px; }
	.rx-slider-shell--stops.rx-slider-shell--lg .rx-slider__stop-handle { height: 30px; }
	.rx-slider__stop-handle i { width: 3px; height: 34%; border-radius: 999px; background: rgb(var(--rx-color-foreground,var(--rx-light))); opacity: .92; will-change: transform; }

	@keyframes rx-slider-glow { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
	@keyframes rx-slider-gradient { to { background-position: -200% 0; } }
	@keyframes rx-slider-wave { from { transform: scale(.6); opacity: .6; } to { transform: scale(3.2); opacity: 0; } }
	@keyframes rx-slider-stop-wave { from { transform: scale(1); opacity: .45; } to { transform: scale(6); opacity: 0; } }
	@keyframes rx-slider-snap { 40% { box-shadow: 0 0 0 7px rgb(var(--rx-color)/.35); } }
	@keyframes rx-slider-icon-pulse { 50% { transform: scale(1.4); } }
	@media (prefers-reduced-motion: reduce) {
		.rx-slider__row, :global(.rx-slider__thumb), .rx-slider__tooltip, .rx-slider__proximity, :global(.rx-slider__range), .rx-slider__tick { transition: none !important; }
		.rx-slider-shell--base .rx-slider__icon { animation: none !important; }
		.rx-slider__stop-rail { filter: none !important; }
		.rx-slider__range-halo, .rx-slider__wave, .rx-slider__snap { display: none; }
		.rx-slider-shell--gradient :global(.rx-slider__range) { animation: none; background-position: 50% 0; }
	}
</style>
