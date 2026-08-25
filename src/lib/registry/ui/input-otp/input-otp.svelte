<script lang="ts" module>
	import type { RxColor } from '$lib/registry/lib/color';
	export type InputOtpVariant = 'base' | 'dots' | 'filled' | 'flip' | 'glow' | 'underline';
	export interface InputOtpProps {
		value?: string; length?: number; type?: 'numeric' | 'text'; color?: RxColor;
		size?: 'lg' | 'default' | 'sm'; variant?: InputOtpVariant;
		radius?: 'subtle' | 'rounded' | 'pill' | 'squircle'; masked?: boolean;
		state?: 'default' | 'success' | 'danger'; disabled?: boolean;
		autoFocus?: boolean; autofocus?: boolean;
		onComplete?: (value: string) => void;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { styleColor } from '$lib/registry/lib/color';
	let {
		value = $bindable(''), length = 6, type = 'numeric', color, size = 'default', variant = 'base',
		radius = 'squircle', masked = false, state: validationState = 'default', disabled = false, autoFocus = false, autofocus = false, onComplete
	}: InputOtpProps = $props();
	let inputs: HTMLInputElement[] = [];
	let focused = $state(-1);
	let lastCompleted = '';
	let rippleId = $state(0);
	let ripples = $state<Array<{ id: number; index: number; x: number; y: number; size: number }>>([]);
	const effectiveColor = $derived(validationState === 'success' ? 'success' : validationState === 'danger' ? 'danger' : color);
	const inlineStyle = $derived(styleColor(effectiveColor) ?? '--rx-color: var(--rx-primary)');
	const characters = $derived(Array.from({ length }, (_, index) => value[index] ?? ''));
	function filter(next: string) { return next.replace(type === 'numeric' ? /[^0-9]/g : /[^a-zA-Z0-9]/g, ''); }
	function focus(index: number) { const target = inputs[Math.max(0,Math.min(length-1,index))]; target?.focus(); target?.select(); }
	function commit(next: string) { value = filter(next).slice(0,length); }
	function distribute(next: string, start: number) { const chars = [...characters]; let index = start; for (const char of filter(next)) { if (index >= length) break; chars[index] = char; index += 1; } commit(chars.join('')); focus(Math.min(index,length-1)); }
	function input(event: Event, index: number) { const target = event.currentTarget as HTMLInputElement; const next = filter(target.value); if (!next) { const chars = [...characters]; chars[index] = ''; commit(chars.join('')); return; } if (next.length > 1) { distribute(next,index); return; } const chars = [...characters]; chars[index] = next[0]; commit(chars.join('')); if (index < length-1) focus(index+1); }
	function keydown(event: KeyboardEvent, index: number) { if (event.key === 'Backspace') { event.preventDefault(); const chars = [...characters]; if (chars[index]) chars[index]=''; else if (index>0) { chars[index-1]=''; focus(index-1); } commit(chars.join('')); } else if (event.key === 'Delete') { event.preventDefault(); const chars=[...characters]; chars[index]=''; commit(chars.join('')); } else if (event.key === 'ArrowLeft' && index>0) { event.preventDefault(); focus(index-1); } else if (event.key === 'ArrowRight' && index<length-1) { event.preventDefault(); focus(index+1); } }
	function paste(event: ClipboardEvent,index:number) { event.preventDefault(); distribute(event.clipboardData?.getData('text') ?? '',index); }
	function pointerGlow(event: PointerEvent) {
		if (variant !== 'base') return;
		const cell = (event.currentTarget as HTMLElement).closest<HTMLElement>('.rx-input-otp__cell'); if (!cell) return; const box = cell.getBoundingClientRect();
		cell.style.setProperty('--gx', `${event.clientX - box.left}px`); cell.style.setProperty('--gy', `${event.clientY - box.top}px`); cell.style.setProperty('--glow', '1');
	}
	function ripple(event: PointerEvent, index: number) {
		if (variant !== 'base' || disabled) return;
		const cell = (event.currentTarget as HTMLElement).closest<HTMLElement>('.rx-input-otp__cell'); if (!cell) return; const box = cell.getBoundingClientRect(); const size = Math.max(box.width, box.height) * 2.4;
		ripples = [...ripples.slice(-7), { id: ++rippleId, index, x: event.clientX - box.left, y: event.clientY - box.top, size }];
	}
	$effect(() => { const next = filter(value).slice(0,length); if (next !== value) value = next; if (next.length === length && next !== lastCompleted) { lastCompleted = next; onComplete?.(next); } else if (next.length !== length) lastCompleted = ''; });
	onMount(() => { if (autoFocus || autofocus) requestAnimationFrame(() => focus(0)); });
</script>

<div class={`rx-input-otp rx-input-otp--${size} rx-input-otp--${validationState} rx-input-otp--${variant} rx-input-otp--r-${radius}`} style={inlineStyle} data-variant={variant}>
	<input class="rx-input-otp__aggregate" aria-label="One-time password" value={value} readonly tabindex="-1" aria-hidden="true" />
	<div class="rx-input-otp__root" role="group" aria-label="One-time code">
			{#each characters as char, index (index)}
				<div class={`rx-input-otp__cell${char ? ' has-value' : ''}`} data-active={focused === index ? '' : undefined}>
					{#if variant === 'dots'}
						<span class="rx-input-otp__dot" aria-hidden="true"></span>
					{:else if variant !== 'base' || masked}
						{#key char}<span class="rx-input-otp__flipper">{char ? (masked ? '•' : char) : ''}</span>{/key}
					{/if}
					{#if variant === 'flip'}<span class="rx-input-otp__hinge" aria-hidden="true"></span>{/if}
					{#if variant === 'glow'}<span class="rx-input-otp__aura" aria-hidden="true"></span>{/if}
					{#if variant === 'underline'}<span class="rx-input-otp__line" aria-hidden="true"></span>{/if}
					{#if variant === 'base'}<span class="rx-input-otp__proximity" aria-hidden="true"></span><span class="rx-input-otp__ripples" aria-hidden="true">{#each ripples.filter((entry) => entry.index === index) as entry (entry.id)}<span class="rx-input-otp__ripple" style={`left:${entry.x}px;top:${entry.y}px;width:${entry.size}px;height:${entry.size}px`} onanimationend={() => ripples = ripples.filter((candidate) => candidate.id !== entry.id)}></span>{/each}</span>{/if}
					<input bind:this={inputs[index]} class="rx-input-otp__control" type={masked ? 'password' : 'text'} maxlength="1" autocomplete="one-time-code" inputmode={type === 'numeric' ? 'numeric' : 'text'} value={char} {disabled} aria-label={`Digit ${index + 1} of ${length}`} oninput={(event) => input(event,index)} onkeydown={(event) => keydown(event,index)} onpaste={(event) => paste(event,index)} onfocus={() => focused=index} onblur={() => focused=-1} onpointermove={pointerGlow} onpointerleave={(event) => (event.currentTarget as HTMLElement).closest<HTMLElement>('.rx-input-otp__cell')?.style.setProperty('--glow', '0')} onpointerdown={(event) => ripple(event,index)} />
				</div>
			{/each}
	</div>
</div>

<style>
	.rx-input-otp { --otp-h: 2.5rem; --otp-r: var(--rx-radius); --otp-fs: 1rem; --otp-gap: .5rem; width: fit-content; }
	.rx-input-otp--sm { --otp-h: 2rem; --otp-r: calc(var(--rx-radius) * .83); --otp-fs: .875rem; --otp-gap: .375rem; }
	.rx-input-otp--lg { --otp-h: 3rem; --otp-r: calc(var(--rx-radius) * 1.17); --otp-fs: 1.125rem; --otp-gap: .625rem; }
	.rx-input-otp--r-subtle { --otp-r: .5rem; }
	.rx-input-otp--r-pill { --otp-r: 999px; }
	.rx-input-otp--r-squircle { --otp-r: calc(var(--rx-radius) * 1.7); }
	:global(.rx-input-otp__root) { display: flex; align-items: center; gap: var(--otp-gap); perspective: 500px; }
	.rx-input-otp__aggregate { position: absolute; width: 1px; height: 1px; padding: 0; border: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
	:global(.rx-input-otp__cell) { position: relative; display: flex; width: var(--otp-h); height: var(--otp-h); box-sizing: border-box; align-items: center; justify-content: center; border: 1px solid rgb(var(--rx-border)); border-radius: var(--otp-r); color: rgb(var(--rx-text)); background: transparent; font-size: var(--otp-fs); font-weight: 600; transform-style: preserve-3d; transition: border-color 220ms cubic-bezier(.22,1,.36,1), background-color 220ms ease, color 200ms ease, transform 320ms cubic-bezier(.22,1,.36,1), box-shadow 200ms ease; }
	:global(.rx-input-otp__cell:hover) { border-color: rgb(var(--rx-text-muted)); background: rgb(var(--rx-text) / .05); }
	:global(.rx-input-otp__cell.has-value) { border-color: rgb(var(--rx-text-muted)); }
	:global(.rx-input-otp__cell[data-active]) { border-color: rgb(var(--rx-color)); box-shadow: 0 0 0 3px rgb(var(--rx-color) / .22); }
	:global(.rx-input-otp--base .rx-input-otp__cell[data-active]) { box-shadow: none; }
	.rx-input-otp__control { position: absolute; inset: 0; z-index: 3; width: 100%; height: 100%; box-sizing: border-box; padding: 0; border: 0; border-radius: inherit; outline: 0; color: transparent; background: transparent; caret-color: transparent; text-align: center; font: inherit; font-size: var(--otp-fs); font-weight: 600; }
	:global(.rx-input-otp--base) .rx-input-otp__control { color: rgb(var(--rx-text)); caret-color: rgb(var(--rx-color)); }
	:global(.rx-input-otp--base:has(.rx-input-otp__control[type='password'])) .rx-input-otp__control { color: transparent; }
	.rx-input-otp__control:disabled { cursor: not-allowed; }
	.rx-input-otp__proximity { position: absolute; inset: -1px; z-index: 2; border-radius: inherit; padding: 1px; pointer-events: none; background: radial-gradient(60px circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.42) 30%,rgb(var(--rx-color)/.16) 58%,transparent 82%),radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.27) 42%,rgb(var(--rx-color)/.08) 66%,transparent 85%); mask: linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite: exclude; opacity: calc(var(--glow,0) * .7); transition: opacity 140ms; }
	:global(.rx-input-otp--base .rx-input-otp__cell[data-active]) .rx-input-otp__proximity { opacity: 0; }
	.rx-input-otp__ripples { position: absolute; inset: 0; z-index: 0; overflow: hidden; border-radius: inherit; pointer-events: none; }
	.rx-input-otp__ripple { position: absolute; border-radius: 50%; translate: -50% -50%; background: radial-gradient(circle,rgb(var(--rx-color)/.38),rgb(var(--rx-color)/.2) 24%,rgb(var(--rx-color)/.09) 44%,rgb(var(--rx-color)/.03) 60%,transparent 76%); animation: rx-otp-ripple 780ms cubic-bezier(.22,1,.36,1) forwards; }
	.rx-input-otp__flipper { position: relative; z-index: 1; }

	:global(.rx-input-otp--dots .rx-input-otp__cell) { border: 0; background: transparent; box-shadow: none; }
	.rx-input-otp__dot { width: 40%; height: 40%; box-sizing: border-box; border: 2px solid rgb(var(--rx-border)); border-radius: 999px; transition: transform 260ms cubic-bezier(.34,1.56,.64,1), background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease; }
	:global(.rx-input-otp--dots .rx-input-otp__cell:hover) .rx-input-otp__dot { border-color: rgb(var(--rx-text-muted)); }
	:global(.rx-input-otp--dots .rx-input-otp__cell[data-active]) .rx-input-otp__dot { border-color: rgb(var(--rx-color)); box-shadow: 0 0 0 4px rgb(var(--rx-color) / .2); }
	:global(.rx-input-otp--dots .rx-input-otp__cell.has-value) .rx-input-otp__dot { border-color: rgb(var(--rx-color)); background: rgb(var(--rx-color)); box-shadow: 0 0 10px rgb(var(--rx-color) / .55); animation: rx-otp-dot-fill 300ms cubic-bezier(.34,1.56,.64,1) both; }

	:global(.rx-input-otp--filled .rx-input-otp__cell.has-value) { border-color: rgb(var(--rx-color)); color: rgb(var(--rx-color-contrast, var(--rx-light))); background: rgb(var(--rx-color)); transform: scale(1.06); }
	:global(.rx-input-otp--filled .rx-input-otp__cell[data-active]) { box-shadow: 0 0 0 3px rgb(var(--rx-color) / .25); }

	:global(.rx-input-otp--flip .rx-input-otp__cell) { background: rgb(var(--rx-surface-2)); }
	:global(.rx-input-otp--flip .rx-input-otp__cell.has-value) .rx-input-otp__flipper { animation: rx-otp-flip 360ms cubic-bezier(.34,1.3,.5,1); }
	.rx-input-otp__hinge { position: absolute; left: 6%; right: 6%; top: 50%; height: 1px; translate: 0 -.5px; background: rgb(var(--rx-border)); opacity: .6; pointer-events: none; }

	:global(.rx-input-otp--glow .rx-input-otp__cell) { background: rgb(var(--rx-surface-2)); }
	.rx-input-otp__aura { position: absolute; inset: -2px; border-radius: calc(var(--otp-r) + 2px); opacity: 0; pointer-events: none; box-shadow: 0 0 0 1px rgb(var(--rx-color) / .8), 0 0 16px 2px rgb(var(--rx-color) / .55); transition: opacity 240ms ease; }
	:global(.rx-input-otp--glow .rx-input-otp__cell.has-value) .rx-input-otp__aura { opacity: .5; }
	:global(.rx-input-otp--glow .rx-input-otp__cell[data-active]) .rx-input-otp__aura { opacity: 1; box-shadow: 0 0 0 1px rgb(var(--rx-color) / .8), 0 0 14px 2px rgb(var(--rx-color) / .45); }
	.rx-input-otp__aura::after { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: 0 0 0 1px rgb(var(--rx-color)), 0 0 26px 5px rgb(var(--rx-color) / .7); opacity: 0; }
	:global(.rx-input-otp--glow .rx-input-otp__cell[data-active]) .rx-input-otp__aura::after { animation: rx-otp-glow 1.6s ease-in-out infinite; }

	:global(.rx-input-otp--underline .rx-input-otp__root) { gap: .75rem; }
	:global(.rx-input-otp--underline .rx-input-otp__cell) { width: calc(var(--otp-h) * .8); border: 0; border-radius: 0; background: transparent; box-shadow: none; }
	.rx-input-otp__line { position: absolute; inset: auto 0 0; height: 2px; border-radius: 2px; background: rgb(var(--rx-border)); transform: scaleX(.9); transition: transform 260ms cubic-bezier(.22,1,.36,1), background-color 220ms ease, height 220ms ease, box-shadow 260ms ease; }
	:global(.rx-input-otp--underline .rx-input-otp__cell.has-value) .rx-input-otp__line { background: rgb(var(--rx-text-muted)); transform: scaleX(1); }
	:global(.rx-input-otp--underline .rx-input-otp__cell[data-active]) .rx-input-otp__line { height: 3px; background: rgb(var(--rx-color)); transform: scaleX(1); box-shadow: 0 0 12px rgb(var(--rx-color) / .6); }

	:global(.rx-input-otp:has(input:disabled)) { opacity: .5; cursor: not-allowed; }
	@keyframes rx-otp-dot-fill { 0% { transform: scale(.4); } 60% { transform: scale(1.35); } 100% { transform: scale(1.25); } }
	@keyframes rx-otp-flip { from { transform: rotateX(0); } to { transform: rotateX(360deg); } }
	@keyframes rx-otp-glow { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
	@keyframes rx-otp-ripple { from { transform: scale(0); opacity: .8; } to { transform: scale(1); opacity: 0; } }
	@media (prefers-reduced-motion: reduce) {
		.rx-input-otp__dot, .rx-input-otp__flipper, .rx-input-otp__aura::after { animation: none !important; }
		.rx-input-otp__ripple { display: none; }
		:global(.rx-input-otp__cell), .rx-input-otp__dot, .rx-input-otp__aura, .rx-input-otp__line { transition: none; }
		:global(.rx-input-otp--dots .rx-input-otp__cell.has-value) .rx-input-otp__dot { transform: none; }
	}
	@media (forced-colors: active) { :global(.rx-input-otp__cell[data-active]) { outline: 2px solid Highlight; } }
</style>
