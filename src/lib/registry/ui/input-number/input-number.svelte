<script lang="ts" module>
	import type { RxColor } from '$lib/registry/lib/color';
	export type InputNumberVariant = 'base' | 'glow' | 'roll-digits' | 'segment' | 'slider' | 'stepper';
	export interface InputNumberProps {
		value?: number; min?: number; max?: number; step?: number; color?: RxColor;
		size?: 'lg' | 'default' | 'sm'; variant?: InputNumberVariant; disabled?: boolean;
		frame?: 'default' | 'bare'; prefix?: string; suffix?: string; decimals?: number; separator?: string; pad?: number; gap?: number;
		duration?: number; intensity?: number; draggable?: boolean; controlsSide?: 'left' | 'right'; glow?: boolean; startOnView?: boolean;
		onValueChange?: (value: number) => void; onComplete?: (value: number) => void;
	}
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { styleColor } from '$lib/registry/lib/color';
	let {
		value = $bindable(0), min, max, step = 1, color, size = 'default', variant = 'base', disabled = false,
		frame = 'default', prefix = '', suffix = '', decimals, separator = '', pad = 0, gap = 4, duration = 800,
		intensity = 1, draggable = true, controlsSide = 'right', glow = true, startOnView = false, onValueChange, onComplete
	}: InputNumberProps = $props();
	let repeatTimer: ReturnType<typeof setTimeout> | undefined;
	let repeatDelay = 340;
	let pulseTimer: ReturnType<typeof setTimeout> | undefined;
	let animationFrame = 0;
	let observed = value;
	let previous = $state(value);
	let displayed = $state(value);
	let direction = $state<-1 | 1>(1);
	let animationId = $state(0);
	let pulsing = $state(false);
	let dragging = $state(false);
	let editing = $state(false);
	let draft = $state('');
	let inputRef = $state<HTMLInputElement>();
	let resizing = $state(false);
	let resizeTimer: ReturnType<typeof setTimeout> | undefined;
	let root: HTMLDivElement;
	let rippleId = $state(0);
	let ripples = $state<Array<{ id: number; x: number; y: number; size: number }>>([]);
	const atMin = $derived(disabled || (min !== undefined && value <= min));
	const atMax = $derived(disabled || (max !== undefined && value >= max));
	const percentage = $derived(max === undefined || min === undefined || max === min ? 0 : Math.max(0, Math.min(100, (value - min) / (max - min) * 100)));
	const formatted = $derived(formatNumber(displayed));
	const currentFormatted = $derived(formatNumber(value));
	const previousFormatted = $derived(formatNumber(previous));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --number-intensity:${Math.max(0, Math.min(1, intensity))}; --number-fill:${percentage}%; --number-gap:${gap}px; --number-chars:${Math.min(5,Math.max(1,(editing?draft:currentFormatted).length))}`);

	function clamp(next: number) { return Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next)); }
	function formatNumber(next: number) {
		const stepDecimals = String(step).includes('.') ? String(step).split('.')[1].length : 0;
		const fixed = Math.abs(next).toFixed(Math.max(0, Math.min(8, decimals ?? stepDecimals)));
		let [whole, fraction] = fixed.split('.');
		if (pad > 0) whole = whole.padStart(pad, '0');
		if (separator) whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
		return `${next < 0 ? '-' : ''}${prefix}${whole}${fraction ? `.${fraction}` : ''}${suffix}`;
	}
	function notify(next: number) { value = clamp(next); onValueChange?.(value); }
	function change(directionNext: -1 | 1) { notify(value + directionNext * step); }
	function stopRepeat() { clearTimeout(repeatTimer); repeatTimer = undefined; }
	function repeat(directionNext: -1 | 1) { change(directionNext); repeatDelay = Math.max(40, repeatDelay * .8); repeatTimer = setTimeout(() => repeat(directionNext), repeatDelay); }
	function startRepeat(directionNext: -1 | 1, event: PointerEvent) {
		if (disabled) return;
		makeRipple(event); change(directionNext);
		repeatDelay = 340; repeatTimer = setTimeout(() => repeat(directionNext), repeatDelay);
	}
	function handleInput(event: Event) {
		const next = (event.currentTarget as HTMLInputElement).valueAsNumber;
		if (!Number.isNaN(next)) notify(next);
	}
	function startEdit() { if (variant !== 'base' || disabled || editing) return; draft = formatNumber(value).replace(prefix,'').replace(suffix,'').replaceAll(separator,''); editing = true; requestAnimationFrame(() => { inputRef?.focus(); inputRef?.select(); }); }
	function sanitizeDraft(next: string) { const negative = (min ?? 0) < 0 && next.trim().startsWith('-'); let cleaned = next.replace(/[^0-9.]/g,''); if ((decimals ?? (String(step).split('.')[1]?.length ?? 0)) > 0) { const dot = cleaned.indexOf('.'); if (dot !== -1) cleaned = cleaned.slice(0,dot+1)+cleaned.slice(dot+1).replaceAll('.',''); } else cleaned = cleaned.replaceAll('.',''); return `${negative?'-':''}${cleaned}`; }
	function editInput(event: Event) { draft = sanitizeDraft((event.currentTarget as HTMLInputElement).value); }
	function confirmEdit() { if (!editing) return; editing = false; const parsed = Number.parseFloat(draft); if (!Number.isNaN(parsed)) notify(parsed); }
	function cancelEdit() { editing = false; draft = ''; }
	function editKeydown(event: KeyboardEvent) { if (event.key === 'Enter') { event.preventDefault(); confirmEdit(); } else if (event.key === 'Escape') { event.preventDefault(); cancelEdit(); } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); change(event.key === 'ArrowUp' ? 1 : -1); draft = formatNumber(value).replace(prefix,'').replace(suffix,'').replaceAll(separator,''); } }
	function panelKeydown(event: KeyboardEvent) { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); startEdit(); } }
	function makeRipple(event: PointerEvent) {
		if (variant !== 'base') return;
		const box = root.getBoundingClientRect(); const size = Math.max(box.width, box.height) * 2;
		ripples = [...ripples.slice(-7), { id: ++rippleId, x: event.clientX - box.left, y: event.clientY - box.top, size }];
	}
	function pointerGlow(event: PointerEvent) {
		if (variant !== 'base' || !glow) return;
		const box = root.getBoundingClientRect();
		root.style.setProperty('--gx', `${event.clientX - box.left}px`); root.style.setProperty('--gy', `${event.clientY - box.top}px`); root.style.setProperty('--glow', '1');
	}
	function valueFromSliderPointer(event: PointerEvent) {
		const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
		if (min === undefined || max === undefined || !box.width) return value;
		return Math.round((min + Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)) * (max - min)) / step) * step;
	}
	function startSliderDrag(event: PointerEvent) {
		if (variant !== 'slider' || !draggable || disabled) return;
		dragging = true; notify(valueFromSliderPointer(event));
		(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
	}
	function moveSliderDrag(event: PointerEvent) {
		if (!dragging || min === undefined || max === undefined) return;
		notify(valueFromSliderPointer(event));
	}
	function endSliderDrag(event: PointerEvent) { dragging = false; (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId); }
	function animateCount(from: number, to: number) {
		if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(animationFrame);
		if (variant !== 'glow' || duration <= 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) { displayed = to; onComplete?.(to); return; }
		const started = performance.now();
		const frameNext = (now: number) => { const p = Math.min(1, (now - started) / duration); const eased = 1 - Math.pow(1 - p, 3); displayed = from + (to - from) * eased; if (p < 1) animationFrame = requestAnimationFrame(frameNext); else onComplete?.(to); };
		animationFrame = requestAnimationFrame(frameNext);
	}
	$effect(() => {
		const next = value;
		if (next === observed) return;
		previous = observed; direction = next >= observed ? 1 : -1; observed = next; animationId += 1;
		animateCount(previous, next);
		if (variant === 'glow') { pulsing = true; clearTimeout(pulseTimer); pulseTimer = setTimeout(() => pulsing = false, 520); }
	});
	$effect(() => { const count = currentFormatted.length; count; if (typeof window !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches) { resizing = true; clearTimeout(resizeTimer); resizeTimer = setTimeout(() => resizing = false, 320); } });
	onMount(() => {
		if (variant !== 'glow' || !startOnView) return;
		displayed = 0;
		const observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) { animateCount(0, value); observer.disconnect(); } }, { threshold: .2 });
		observer.observe(root); return () => observer.disconnect();
	});
	onDestroy(() => { stopRepeat(); clearTimeout(pulseTimer); clearTimeout(resizeTimer); if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(animationFrame); });
</script>

<div bind:this={root} class={`rx-input-number rx-input-number--${size} rx-input-number--${variant} rx-input-number--${frame} rx-input-number--controls-${controlsSide}`} class:is-pulsing={pulsing} class:is-dragging={dragging} style={inlineStyle} data-variant={variant} role="spinbutton" tabindex={disabled ? -1 : 0} aria-label="Number input" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max} aria-disabled={disabled || undefined} onpointermove={pointerGlow} onpointerleave={() => root?.style.setProperty('--glow', '0')}>
	{#if variant === 'glow'}<span class="rx-input-number__aura" aria-hidden="true"></span>{/if}
	{#if variant === 'base'}<span class="rx-input-number__glow" aria-hidden="true"></span><span class="rx-input-number__ripples" aria-hidden="true">{#each ripples as ripple (ripple.id)}<span class="rx-input-number__ripple" style={`left:${ripple.x}px;top:${ripple.y}px;width:${ripple.size}px;height:${ripple.size}px`} onanimationend={() => ripples = ripples.filter((entry) => entry.id !== ripple.id)}></span>{/each}</span>{/if}

	{#if variant === 'stepper'}
		<span class="rx-input-number__value" class:bump-up={direction > 0 && animationId > 0} class:bump-down={direction < 0 && animationId > 0}>{currentFormatted}</span>
		<span class="rx-input-number__controls">
			<button type="button" aria-label="Increase value" disabled={atMax} onpointerdown={(event) => startRepeat(1, event)} onpointerup={stopRepeat} onpointerleave={stopRepeat} onpointercancel={stopRepeat}>⌃</button>
			<button type="button" aria-label="Decrease value" disabled={atMin} onpointerdown={(event) => startRepeat(-1, event)} onpointerup={stopRepeat} onpointerleave={stopRepeat} onpointercancel={stopRepeat}>⌄</button>
		</span>
	{:else}
		<button type="button" aria-label="Decrease value" disabled={atMin} onpointerdown={(event) => startRepeat(-1, event)} onpointerup={stopRepeat} onpointerleave={stopRepeat} onpointercancel={stopRepeat}>−</button>
		{#if variant === 'roll-digits'}
			<span class="rx-input-number__panel rx-input-number__panel--roll" aria-hidden="true">
				{#each currentFormatted.split('') as char, index (`${index}-${char}`)}
					{#if /\d/.test(char)}<span class="rx-input-number__digit-col"><span class="rx-input-number__digit-strip" style={`transform:translateY(-${Number(char) * 10}%)`}>{#each Array(10) as _, digit}<span>{digit}</span>{/each}</span></span>{:else}<span class="rx-input-number__symbol">{char}</span>{/if}
				{/each}
			</span>
			{:else if variant === 'segment'}
				<span class="rx-input-number__panel rx-input-number__panel--segment" aria-hidden="true">
					{#each currentFormatted.split('') as char, index (`${index}-${char}-${animationId}`)}
						<span class="rx-input-number__segment-cell" class:is-symbol={char === '.' || char === '-'}>
							{#if previousFormatted[index] !== undefined && previousFormatted[index] !== char}<span class="rx-input-number__segment-old" data-direction={direction}>{previousFormatted[index]}</span>{/if}
							<span class="rx-input-number__segment-new" data-direction={direction}>{char}</span>
						</span>
					{/each}
				</span>
		{:else if variant === 'slider'}
			<span class="rx-input-number__panel rx-input-number__panel--slider" role="presentation" onpointerdown={startSliderDrag} onpointermove={moveSliderDrag} onpointerup={endSliderDrag} onpointercancel={endSliderDrag}>
				<span class="rx-input-number__slider-fill" aria-hidden="true"></span><span class="rx-input-number__slider-value" aria-hidden="true">{currentFormatted}</span>
				<input type="range" bind:value {min} {max} {step} {disabled} oninput={handleInput} aria-label="Number value" />
			</span>
		{:else}
				<span class="rx-input-number__panel rx-input-number__panel--value" class:is-editing={editing} class:is-resizing={resizing} role="button" tabindex={variant === 'base' && !disabled ? 0 : -1} aria-label="Edit value" onclick={startEdit} onkeydown={panelKeydown}>
					{#if editing}<input bind:this={inputRef} type="text" inputmode="decimal" value={draft} disabled={disabled} oninput={editInput} onkeydown={editKeydown} onblur={confirmEdit} onpointerdown={(event) => event.stopPropagation()} aria-label="Value" />
					{:else}
						{#if variant === 'base' && animationId > 0}<span class="rx-input-number__old-value" aria-hidden="true" data-direction={direction}>{previousFormatted}</span>{/if}
						{#key animationId}<span class="rx-input-number__animated-value" aria-hidden="true" data-direction={direction}>{formatted}</span>{/key}
					{/if}
				</span>
		{/if}
		<button type="button" aria-label="Increase value" disabled={atMax} onpointerdown={(event) => startRepeat(1, event)} onpointerup={stopRepeat} onpointerleave={stopRepeat} onpointercancel={stopRepeat}>+</button>
	{/if}
</div>

<style>
	.rx-input-number { --num-h: 2.5rem; --num-r: var(--rx-radius); --num-fs: .875rem; position: relative; isolation: isolate; display: inline-flex; height: var(--num-h); padding: 4px; align-items: center; gap: 6px; box-sizing: border-box; border: 1px solid rgb(var(--rx-border)); border-radius: calc(var(--num-r) * 1.25); color: rgb(var(--rx-text)); background: rgb(var(--rx-surface-2)); transition: transform 260ms cubic-bezier(.34,1.56,.64,1), border-color 200ms cubic-bezier(.22,1,.36,1), background-color 200ms ease, box-shadow 320ms ease; }
	.rx-input-number--sm { --num-h: 2rem; --num-r: calc(var(--rx-radius) * .83); --num-fs: .8125rem; gap: 4px; }
	.rx-input-number--lg { --num-h: 3rem; --num-r: calc(var(--rx-radius) * 1.17); --num-fs: 1rem; gap: 8px; }
	.rx-input-number--bare { padding: 0; border-color: transparent; background: transparent; }
	.rx-input-number:hover:not(:has(button:disabled + * + button:disabled)) { border-color: rgb(var(--rx-text-muted)); }
	.rx-input-number button { position: relative; z-index: 2; display: inline-flex; width: calc(var(--num-h) - 8px); height: calc(var(--num-h) - 8px); flex: none; padding: 0; align-items: center; justify-content: center; border: 1px solid rgb(var(--rx-border)); border-radius: calc(var(--num-r) * .9); color: rgb(var(--rx-text)); background: rgb(var(--rx-background)); cursor: pointer; font: inherit; font-size: 1.15em; transition: transform 240ms cubic-bezier(.34,1.56,.64,1), border-color 180ms cubic-bezier(.22,1,.36,1), background-color 180ms ease, opacity 180ms ease; }
	.rx-input-number button:hover:not(:disabled) { border-color: rgb(var(--rx-text-muted)); background: rgb(var(--rx-text) / .05); }
	.rx-input-number button:active:not(:disabled) { transform: scale(.88); }
	.rx-input-number button:focus-visible { border-color: rgb(var(--rx-color)); outline: none; box-shadow: 0 0 0 2px rgb(var(--rx-color) / .25); }
	.rx-input-number button:disabled { opacity: .35; cursor: not-allowed; }
	.rx-input-number__panel { position: relative; z-index: 2; min-width: 3.2ch; color: rgb(var(--rx-text)); font-size: var(--num-fs); font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums; }
	.rx-input-number__panel--value { display: inline-flex; width: max(3.2ch, calc((var(--number-chars, 3)) * 1ch + .5ch)); height: 100%; align-items: center; justify-content: center; overflow: hidden; cursor: text; transition: width 380ms cubic-bezier(.34,1.56,.64,1), filter 280ms ease; }
	.rx-input-number__panel--value.is-editing { overflow: visible; }
	.rx-input-number__panel--value.is-resizing { filter: blur(2.5px); }
	.rx-input-number__panel--value input { width: 100%; min-width: 0; height: 100%; box-sizing: border-box; padding: 0; border: 0; outline: 0; color: inherit; background: transparent; text-align: center; caret-color: rgb(var(--rx-color)); font: inherit; font-weight: inherit; appearance: textfield; }
	.rx-input-number__animated-value { transition: color 320ms ease, text-shadow 320ms ease; }
	.rx-input-number--base .rx-input-number__animated-value { animation: rx-number-roll-in 460ms cubic-bezier(.34,1.56,.64,1); }
	.rx-input-number__old-value { position: absolute; animation: rx-number-roll-out 360ms cubic-bezier(.22,1,.36,1) forwards; }
	.rx-input-number--base .rx-input-number__animated-value[data-direction='-1'] { animation-name: rx-number-roll-in-down; }
	.rx-input-number__old-value[data-direction='-1'] { animation-name: rx-number-roll-out-down; }
	.rx-input-number__panel input::-webkit-inner-spin-button { appearance: none; }

	.rx-input-number__glow { position: absolute; inset: -1px; z-index: 1; border-radius: inherit; padding: 1px; pointer-events: none; background: radial-gradient(60px circle at var(--gx,50%) var(--gy,50%), rgb(var(--rx-color)/.6), rgb(var(--rx-color)/.42) 30%, rgb(var(--rx-color)/.16) 58%, transparent 82%), radial-gradient(200px circle at var(--gx,50%) var(--gy,50%), rgb(var(--rx-color)/.6), rgb(var(--rx-color)/.27) 42%, rgb(var(--rx-color)/.08) 66%, transparent 85%); mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; opacity: calc(var(--glow,0) * .63); transition: opacity 140ms; }
	.rx-input-number__ripples { position: absolute; inset: 0; z-index: 1; overflow: hidden; border-radius: inherit; pointer-events: none; }
	.rx-input-number__ripple { position: absolute; border-radius: 50%; translate: -50% -50%; background: radial-gradient(circle, rgb(var(--rx-color)/.38), rgb(var(--rx-color)/.2) 24%, rgb(var(--rx-color)/.09) 44%, rgb(var(--rx-color)/.03) 60%, transparent 76%); animation: rx-number-ripple 780ms cubic-bezier(.22,1,.36,1) forwards; }

	.rx-input-number--glow { transition: border-color 260ms ease, box-shadow 320ms ease; }
	.rx-input-number__aura { position: absolute; inset: -2px; z-index: -1; border-radius: inherit; opacity: 0; background: radial-gradient(120% 120% at 50% 50%, rgb(var(--rx-color)/.55), transparent 70%); transition: opacity 480ms ease; }
	.rx-input-number--glow.is-pulsing { border-color: rgb(var(--rx-color) / .8); box-shadow: 0 0 calc(14px * var(--number-intensity)) rgb(var(--rx-color) / calc(.45 * var(--number-intensity))); }
	.rx-input-number--glow.is-pulsing .rx-input-number__aura { opacity: calc(.8 * var(--number-intensity)); }
	.rx-input-number--glow.is-pulsing .rx-input-number__animated-value { color: hsl(from rgb(var(--rx-color)) h s calc(l * .4 + 60% * .6)); text-shadow: 0 0 calc(10px * var(--number-intensity)) rgb(var(--rx-color) / .7); }

	.rx-input-number__panel--roll { display: inline-flex; height: 1em; padding: 0 .35ch; align-items: center; font-weight: 700; overflow: hidden; }
	.rx-input-number__digit-col { position: relative; display: inline-block; width: 1ch; height: 1em; overflow: hidden; text-align: center; }
	.rx-input-number__digit-strip { position: absolute; inset: 0; display: flex; height: 1000%; flex-direction: column; transition: transform 420ms cubic-bezier(.34,1.4,.5,1); }
	.rx-input-number__digit-strip span { display: flex; height: 10%; align-items: center; justify-content: center; }
	.rx-input-number__symbol { width: .55ch; color: hsl(from rgb(var(--rx-color)) h s calc(l * .7 + 50% * .3)); }

	.rx-input-number__panel--segment { display: inline-flex; height: calc(var(--num-h) - 8px); padding: 0 2px; align-items: stretch; gap: var(--number-gap); perspective: 180px; }
	.rx-input-number__segment-cell { position: relative; display: inline-flex; min-width: 1.1em; padding: 0 .15em; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgb(var(--rx-border)); border-radius: calc(var(--num-r) * .5); background: rgb(var(--rx-background)); font-weight: 700; transform-style: preserve-3d; }
	.rx-input-number__segment-cell.is-symbol { min-width: .5em; border-color: transparent; color: hsl(from rgb(var(--rx-color)) h s calc(l * .7 + 50% * .3)); background: transparent; }
	.rx-input-number__segment-old, .rx-input-number__segment-new { white-space: nowrap; backface-visibility: hidden; }
	.rx-input-number__segment-old { position: absolute; animation: rx-number-segment-out 200ms ease forwards; }
	.rx-input-number__segment-new { animation: rx-number-segment-in 260ms cubic-bezier(.34,1.56,.64,1); }

	.rx-input-number__panel--slider { display: inline-flex; min-width: 5ch; height: calc(var(--num-h) - 8px); padding: 0 .6ch; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgb(var(--rx-border)); border-radius: calc(var(--num-r) * .7); background: rgb(var(--rx-background)); touch-action: none; cursor: ew-resize; }
	.rx-input-number__slider-fill { position: absolute; inset: 0 auto 0 0; width: var(--number-fill); border-radius: inherit; background: linear-gradient(90deg, rgb(var(--rx-color)/.3), rgb(var(--rx-color)/.62)); transition: width 240ms cubic-bezier(.22,1,.36,1); }
	.is-dragging .rx-input-number__slider-fill { transition: none; }
	.rx-input-number__slider-value { position: relative; z-index: 1; }
	.rx-input-number__panel--slider input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: inherit; }

	.rx-input-number--stepper { border-radius: calc(var(--num-r) * 1.1); align-items: stretch; gap: 4px; }
	.rx-input-number--controls-left { flex-direction: row-reverse; }
	.rx-input-number__value { position: relative; z-index: 2; display: inline-flex; min-width: 3ch; padding: 0 .6ch; align-items: center; justify-content: center; font-size: var(--num-fs); font-weight: 600; transition: transform 340ms cubic-bezier(.34,1.56,.64,1); }
	.rx-input-number__value.bump-up { animation: rx-number-bump-up 340ms cubic-bezier(.34,1.56,.64,1); }
	.rx-input-number__value.bump-down { animation: rx-number-bump-down 340ms cubic-bezier(.34,1.56,.64,1); }
	.rx-input-number__controls { display: inline-flex; width: calc(var(--num-h) - 8px); flex-direction: column; gap: 2px; }
	.rx-input-number__controls button { width: 100%; height: auto; min-height: 0; flex: 1 1 0; padding: 0; border-radius: calc(var(--num-r) * .6); font-size: .8em; line-height: .7; }

	@keyframes rx-number-ripple { from { transform: scale(0); opacity: .8; } to { transform: scale(1); opacity: 0; } }
	@keyframes rx-number-roll-in { from { transform: translateY(100%); filter: blur(7px); opacity: 0; } }
	@keyframes rx-number-roll-out { to { transform: translateY(-100%); filter: blur(7px); opacity: 0; } }
	@keyframes rx-number-roll-in-down { from { transform: translateY(-100%); filter: blur(7px); opacity: 0; } }
	@keyframes rx-number-roll-out-down { to { transform: translateY(100%); filter: blur(7px); opacity: 0; } }
	@keyframes rx-number-segment-in { from { transform: translateY(60%) rotateX(-70deg); opacity: 0; } }
	@keyframes rx-number-segment-out { to { transform: translateY(-60%) rotateX(70deg); opacity: 0; } }
	@keyframes rx-number-bump-up { 45% { transform: translateY(-14%) scale(1.08); } }
	@keyframes rx-number-bump-down { 45% { transform: translateY(14%) scale(1.08); } }
	@media (prefers-reduced-motion: reduce) {
		.rx-input-number, .rx-input-number button, .rx-input-number__panel, .rx-input-number__animated-value, .rx-input-number__segment-old, .rx-input-number__segment-new, .rx-input-number__aura, .rx-input-number__digit-strip, .rx-input-number__slider-fill, .rx-input-number__value { transition: none; animation: none !important; filter: none !important; }
		.rx-input-number__ripple { display: none; }
		.rx-input-number--glow.is-pulsing { box-shadow: none; }
		.rx-input-number--glow.is-pulsing .rx-input-number__aura { opacity: 0; }
	}
</style>
