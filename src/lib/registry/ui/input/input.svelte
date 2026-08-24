<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface InputProps extends Omit<HTMLInputAttributes, 'size' | 'value' | 'color'> {
		value?: string;
		variant?: 'default' | 'shadow' | 'border' | 'filled' | 'gradient-border' | 'pulse' | 'spotlight' | 'underline';
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: string;
		labelPlaceholder?: boolean;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		icon?: Snippet;
		iconAfter?: boolean;
		loading?: boolean;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE, rxSlideUp } from '$lib/registry/lib/easing';
	import { inputVariants } from './index';

	let {
		value = $bindable(''), variant = 'default', color, size = 'default', label,
		labelPlaceholder = false, state: validationState = 'default', message, icon, iconAfter = false,
		loading = false, id: suppliedId, class: className, style, disabled, ...restProps
	}: InputProps = $props();
	const uid = $props.id();
	let focused = $state(false);
	const inputId = $derived(suppliedId ?? `${uid}-control`);
	const messageId = $derived(`${inputId}-message`);
	const floated = $derived(focused || value.length > 0);
	const stateColor = $derived(validationState === 'default' ? color : validationState);
	const classes = $derived(inputVariants({ variant, size, iconAfter: iconAfter && !!icon, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(stateColor) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
</script>

<div class={classes} class:rx-input--focused={focused} class:rx-input--floated={floated} class:rx-input--label-placeholder={labelPlaceholder} class:rx-input--has-icon={!!icon} class:rx-input--loading={loading} style={inlineStyle}>
	<div class="rx-input__control">
		{#if icon}<span class="rx-input__icon" aria-hidden="true">{@render icon()}</span>{/if}
		<input
			{...restProps} id={inputId} bind:value {disabled}
			aria-invalid={validationState === 'danger' ? 'true' : undefined}
			aria-describedby={validationState === 'danger' && message ? messageId : undefined}
			onfocus={() => focused = true} onblur={() => focused = false}
		/>
		{#if label}<label for={inputId}>{label}</label>{/if}
		{#if loading}<span class="rx-input__loader" aria-hidden="true"></span>{/if}
	</div>
	{#if message}
		<div id={messageId} class="rx-input__message" transition:rxSlideUp aria-live="polite">
			{#if typeof message === 'string'}{message}{:else}{@render message()}{/if}
		</div>
	{/if}
</div>

<style>
	.rx-input { display: inline-grid; gap: .3rem; width: 100%; color: rgb(var(--rx-text)); }
	.rx-input__control { position: relative; display: flex; align-items: center; border-radius: var(--rx-radius); background: rgb(var(--rx-surface-2)); transition: box-shadow var(--rx-duration) var(--rx-ease), background var(--rx-duration) var(--rx-ease); }
	.rx-input__control::after { content: ''; position: absolute; inset: auto 0 0; height: 2px; border-radius: 9999px; background: rgb(var(--rx-color)); transform: scaleX(0); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-input--focused .rx-input__control::after, .rx-input--border .rx-input__control::after { transform: scaleX(1); }
	.rx-input input { width: 100%; min-width: 0; border: 1px solid transparent; outline: 0; border-radius: inherit; background: transparent; color: inherit; font: inherit; padding: 1.05rem .9rem .42rem; }
	.rx-input input::placeholder { color: rgb(var(--rx-text-muted)); }
	.rx-input label { position: absolute; left: .9rem; top: 50%; color: rgb(var(--rx-text-muted)); pointer-events: none; transform: translateY(-50%); transform-origin: left center; transition: transform var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease), top var(--rx-duration) var(--rx-ease); }
	.rx-input--floated label { top: .42rem; color: rgb(var(--rx-color)); transform: translateY(0) scale(.72); }
	.rx-input--label-placeholder.rx-input--floated label { top: -.48rem; padding: 0 .25rem; background: rgb(var(--rx-surface)); }
	.rx-input--shadow .rx-input__control { box-shadow: 0 8px 22px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); }
	.rx-input--focused.rx-input--shadow .rx-input__control { box-shadow: 0 9px 24px rgb(var(--rx-color) / .2); }
	.rx-input--border .rx-input__control { background: transparent; }
	.rx-input--border input { border-color: rgb(var(--rx-border)); }
	.rx-input--border.rx-input--focused input { border-color: rgb(var(--rx-color)); }
	.rx-input--filled .rx-input__control { background: rgb(var(--rx-color) / .12); }
	.rx-input--gradient-border .rx-input__control { padding: 1px; background: linear-gradient(120deg, rgb(var(--rx-color)), rgb(var(--rx-color) / .18)); }
	.rx-input--gradient-border input { background: rgb(var(--rx-surface)); }
	.rx-input--pulse.rx-input--focused .rx-input__control { animation: rx-input-pulse .5s var(--rx-ease); }
	.rx-input--spotlight.rx-input--focused .rx-input__control { box-shadow: 0 0 0 4px rgb(var(--rx-color) / .12), 0 10px 28px rgb(var(--rx-color) / .16); }
	.rx-input--underline .rx-input__control { border-radius: 0; background: transparent; }
	.rx-input__icon { position: absolute; left: .85rem; z-index: 1; display: inline-flex; color: rgb(var(--rx-color)); }
	.rx-input--has-icon input { padding-left: 2.65rem; }
	.rx-input--has-icon label { left: 2.65rem; }
	.rx-input--icon-after .rx-input__icon { left: auto; right: .85rem; }
	.rx-input--icon-after input, .rx-input--loading input { padding-right: 2.65rem; }
	.rx-input--icon-after label { left: .9rem; }
	.rx-input__loader { position: absolute; right: .85rem; width: 1rem; height: 1rem; border: 2px solid rgb(var(--rx-color) / .3); border-top-color: rgb(var(--rx-color)); border-radius: 9999px; animation: rx-input-spin .7s linear infinite; }
	.rx-input__message { padding-left: .35rem; color: rgb(var(--rx-color)); font-size: .76rem; line-height: 1.25; }
	.rx-input--lg input { min-height: 3.5rem; font-size: 1rem; }
	.rx-input--size-default input { min-height: 3rem; font-size: .9rem; }
	.rx-input--sm input { min-height: 2.5rem; font-size: .82rem; }
	.rx-input input:disabled { cursor: not-allowed; opacity: .55; }
	@keyframes rx-input-spin { to { transform: rotate(1turn); } }
	@keyframes rx-input-pulse { 50% { box-shadow: 0 0 0 6px rgb(var(--rx-color) / .12); } }
	@media (prefers-reduced-motion: reduce) { .rx-input__control, .rx-input__control::after, .rx-input label { transition-duration: 0ms; } .rx-input__loader { animation-duration: 1ms; animation-iteration-count: 1; } }
</style>
