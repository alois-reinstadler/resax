<script lang="ts" module>
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '../../lib/color';

	export interface TextareaProps extends Omit<HTMLTextareaAttributes, 'value' | 'color'> {
		value?: string;
		variant?: 'default' | 'shadow' | 'border';
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: string;
		labelPlaceholder?: boolean;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		autoResize?: boolean;
	}
</script>

<script lang="ts">
	import { styleColor } from '../../lib/color';
	import { RX_DURATION, RX_EASE, rxSlideUp } from '../../lib/easing';

	let { value = $bindable(''), variant = 'default', color, size = 'default', label, labelPlaceholder = false,
		state: validationState = 'default', message, autoResize = false, maxlength, id: suppliedId, class: className, style, disabled, ...restProps }: TextareaProps = $props();
	const uid = $props.id();
	let focused = $state(false);
	const inputId = $derived(suppliedId ?? `${uid}-control`);
	const messageId = $derived(`${inputId}-message`);
	const floated = $derived(focused || value.length > 0);
	const stateColor = $derived(validationState === 'default' ? color : validationState);
	const inlineStyle = $derived(`${styleColor(stateColor) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
	const rootClass = $derived(['rx-textarea', `rx-textarea--${variant}`, `rx-textarea--${size === 'default' ? 'size-default' : size}`, className].filter(Boolean).join(' '));

	function resize(node: HTMLTextAreaElement) {
		const update = () => {
			if (!autoResize) return;
			node.style.height = 'auto';
			node.style.height = `${node.scrollHeight}px`;
		};
		update();
		node.addEventListener('input', update);
		return () => node.removeEventListener('input', update);
	}
</script>

<div class={rootClass} class:rx-textarea--focused={focused} class:rx-textarea--floated={floated} class:rx-textarea--label-placeholder={labelPlaceholder} style={inlineStyle}>
	<div class="rx-textarea__control">
		<textarea {...restProps} id={inputId} bind:value {disabled} {maxlength} aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined} onfocus={() => focused = true} onblur={() => focused = false} {@attach resize}></textarea>
		{#if label}<label for={inputId}>{label}</label>{/if}
	</div>
	{#if message || maxlength}
		<div class="rx-textarea__meta" transition:rxSlideUp>
			{#if message}<div id={messageId} class="rx-textarea__message" aria-live="polite">{#if typeof message === 'string'}{message}{:else}{@render message()}{/if}</div>{/if}
			{#if maxlength}<span class="rx-textarea__counter" aria-label="character count">{value.length}/{maxlength}</span>{/if}
		</div>
	{/if}
</div>

<style>
	.rx-textarea { display: inline-grid; gap: .3rem; width: 100%; color: rgb(var(--rx-text)); }
	.rx-textarea__control { position: relative; border-radius: var(--rx-radius); background: rgb(var(--rx-surface-2)); transition: box-shadow var(--rx-duration) var(--rx-ease); }
	.rx-textarea__control::after { content: ''; position: absolute; inset: auto 0 0; height: 2px; background: rgb(var(--rx-color)); transform: scaleX(0); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-textarea--focused .rx-textarea__control::after, .rx-textarea--border .rx-textarea__control::after { transform: scaleX(1); }
	.rx-textarea textarea { box-sizing: border-box; display: block; width: 100%; min-height: 6rem; resize: vertical; border: 1px solid transparent; border-radius: inherit; outline: 0; padding: 1.35rem .9rem .65rem; background: transparent; color: inherit; font: inherit; }
	.rx-textarea textarea::placeholder { color: rgb(var(--rx-text-muted)); }
	.rx-textarea label { position: absolute; top: 1.05rem; left: .9rem; color: rgb(var(--rx-text-muted)); pointer-events: none; transform-origin: left; transition: transform var(--rx-duration) var(--rx-ease), top var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease); }
	.rx-textarea--floated label { top: .38rem; color: rgb(var(--rx-color)); transform: scale(.72); }
	.rx-textarea--label-placeholder.rx-textarea--floated label { top: -.5rem; padding: 0 .25rem; background: rgb(var(--rx-surface)); }
	.rx-textarea--shadow .rx-textarea__control { box-shadow: 0 8px 22px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); }
	.rx-textarea--border .rx-textarea__control { background: transparent; }
	.rx-textarea--border textarea { border-color: rgb(var(--rx-border)); }
	.rx-textarea--border.rx-textarea--focused textarea { border-color: rgb(var(--rx-color)); }
	.rx-textarea__meta { display: flex; justify-content: space-between; gap: 1rem; padding: 0 .35rem; color: rgb(var(--rx-color)); font-size: .76rem; }
	.rx-textarea__counter { margin-left: auto; color: rgb(var(--rx-text-muted)); }
	.rx-textarea--lg textarea { min-height: 8rem; font-size: 1rem; }
	.rx-textarea--sm textarea { min-height: 4.5rem; font-size: .82rem; }
	.rx-textarea textarea:disabled { cursor: not-allowed; opacity: .55; }
	@media (prefers-reduced-motion: reduce) { .rx-textarea__control, .rx-textarea__control::after, .rx-textarea label { transition-duration: 0ms; } }
</style>
