<script lang="ts" module>
	import type { RxColor } from '../../lib/color';
	export interface InputOtpProps { value?: string; length?: number; type?: 'numeric' | 'text'; color?: RxColor; size?: 'lg' | 'default' | 'sm'; masked?: boolean; state?: 'default' | 'success' | 'danger'; disabled?: boolean; onComplete?: (value: string) => void; }
</script>
<script lang="ts">
	import { PinInput, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui';
	import { styleColor } from '../../lib/color';
	import { RX_DURATION, RX_EASE } from '../../lib/easing';
	let { value = $bindable(''), length = 6, type = 'numeric', color, size = 'default', masked = false, state = 'default', disabled = false, onComplete }: InputOtpProps = $props();
	const effectiveColor = $derived(state === 'success' ? 'success' : state === 'danger' ? 'danger' : color);
	const inlineStyle = $derived(`${styleColor(effectiveColor) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}`);
	function complete() { onComplete?.(value); }
</script>
<div class={`rx-input-otp rx-input-otp--${size} rx-input-otp--${state}`} style={inlineStyle}>
	<PinInput.Root bind:value maxlength={length} pattern={type === 'numeric' ? REGEXP_ONLY_DIGITS : REGEXP_ONLY_DIGITS_AND_CHARS} {disabled} onComplete={complete} class="rx-input-otp__root" aria-label="One-time password">
		{#snippet children({ cells })}{#each cells as cell, index (index)}<PinInput.Cell {cell} class="rx-input-otp__cell"><span>{cell.char ? (masked ? '•' : cell.char) : ''}</span>{#if cell.hasFakeCaret}<span class="rx-input-otp__caret" aria-hidden="true"></span>{/if}</PinInput.Cell>{/each}{/snippet}
	</PinInput.Root>
</div>
<style>
	.rx-input-otp { width: fit-content; } :global(.rx-input-otp__root) { display: flex; gap: .55rem; }
	:global(.rx-input-otp__cell) { position: relative; display: flex; width: 2.7rem; height: 2.9rem; box-sizing: border-box; align-items: center; justify-content: center; border: 1px solid rgb(var(--rx-gray)); border-radius: calc(var(--rx-radius) * .65); color: rgb(var(--rx-text)); background: rgb(var(--rx-background)); font-size: 1.2rem; font-weight: 700; transition: border-color var(--rx-duration) var(--rx-ease), box-shadow var(--rx-duration) var(--rx-ease), background var(--rx-duration) var(--rx-ease); }
	:global(.rx-input-otp__cell:has(span:not(:empty))) { border-color: rgb(var(--rx-color) / .35); background: rgb(var(--rx-color) / .1); }
	:global(.rx-input-otp__cell[data-active]) { border-color: rgb(var(--rx-color)); box-shadow: 0 0 0 3px rgb(var(--rx-color) / .2); }
	.rx-input-otp__caret { position: absolute; width: 1px; height: 1.25rem; background: rgb(var(--rx-color)); animation: rx-otp-caret 1s steps(1) infinite; }
	:global(.rx-input-otp--lg .rx-input-otp__cell) { width: 3.2rem; height: 3.4rem; font-size: 1.4rem; } :global(.rx-input-otp--sm .rx-input-otp__cell) { width: 2.2rem; height: 2.4rem; font-size: 1rem; }
	:global(.rx-input-otp--danger) { animation: rx-otp-shake .35s var(--rx-ease); }
	:global(.rx-input-otp:has(input:disabled)) { opacity: .5; cursor: not-allowed; }
	@keyframes rx-otp-shake { 25% { transform: translateX(-.3rem); } 50% { transform: translateX(.3rem); } 75% { transform: translateX(-.15rem); } }
	@keyframes rx-otp-caret { 50% { opacity: 0; } }
	@media (prefers-reduced-motion: reduce) { :global(.rx-input-otp--danger), .rx-input-otp__caret { animation: none; } :global(.rx-input-otp__cell) { transition-duration: 0ms; } }
</style>
