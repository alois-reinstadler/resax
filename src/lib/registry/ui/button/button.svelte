<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface ButtonProps extends Omit<HTMLButtonAttributes, 'color' | 'children' | 'onclick'> {
		variant?: 'default' | 'flat' | 'border' | 'gradient' | 'shadow' | 'relief' | 'transparent';
		color?: RxColor;
		size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
		shape?: 'default' | 'circle' | 'square';
		effect?: 'none' | 'glow' | 'pulse';
		block?: boolean;
		floating?: boolean;
		loading?: boolean;
		disabled?: boolean;
		href?: string;
		ripple?: boolean;
		children: Snippet;
		icon?: Snippet;
		onclick?: (event: MouseEvent) => void;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';
	import { ripple as rippleAttachment } from '$lib/registry/attachments/ripple';
	import { buttonVariants } from './index';

	let {
		variant = 'default', color, size = 'default', shape = 'default', effect = 'none',
		block = false, floating = false, loading = false, disabled = false, href,
		ripple = true, children, icon, class: className, style, onclick, ...restProps
	}: ButtonProps = $props();

	const inactive = $derived(disabled || loading);
	const classes = $derived(buttonVariants({ variant, size, shape, effect, block, floating, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(
		`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`
	);
	const attachRipple = $derived(ripple && !inactive ? rippleAttachment() : () => {});
	const anchorProps = $derived(restProps as unknown as HTMLAnchorAttributes);

	function handleClick(event: MouseEvent) {
		if (inactive) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}
		onclick?.(event);
	}
</script>

{#snippet contents()}
	<span class="rx-button__content" class:rx-button__content--hidden={loading}>
		{#if icon}<span class="rx-button__icon">{@render icon()}</span>{/if}
		{@render children()}
	</span>
	{#if loading}
		<span class="rx-button__loader" aria-hidden="true"></span>
	{/if}
{/snippet}

{#if href}
	<a
		{...anchorProps}
		{href}
		class={classes}
		style={inlineStyle}
		aria-disabled={inactive ? 'true' : undefined}
		aria-busy={loading ? 'true' : undefined}
		tabindex={inactive ? -1 : restProps.tabindex}
		onclick={handleClick}
		{@attach attachRipple}
	>
		{@render contents()}
	</a>
{:else}
	<button
		{...restProps}
		class={classes}
		style={inlineStyle}
		disabled={inactive}
		aria-busy={loading ? 'true' : undefined}
		onclick={handleClick}
		{@attach attachRipple}
	>
		{@render contents()}
	</button>
{/if}

<style>
	.rx-button {
		position: relative; display: inline-flex; align-items: center; justify-content: center; gap: .5em;
		box-sizing: border-box; border: 0; border-radius: var(--rx-radius); cursor: pointer;
		font-weight: 600; line-height: 1; text-decoration: none; white-space: nowrap; user-select: none;
		transition: transform var(--rx-duration) var(--rx-ease), box-shadow var(--rx-duration) var(--rx-ease),
			background var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease), border-color var(--rx-duration) var(--rx-ease);
	}
	.rx-button:focus-visible { outline: 3px solid rgb(var(--rx-color) / .28); outline-offset: 2px; }
	.rx-button:disabled, .rx-button[aria-disabled='true'] { cursor: not-allowed; opacity: .55; pointer-events: none; }
	.rx-button--default, .rx-button--shadow, .rx-button--relief, .rx-button--gradient { color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); }
	.rx-button--default:hover { box-shadow: 0 6px 16px rgb(var(--rx-color) / .28); transform: translateY(-1px); }
	.rx-button--flat { color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .15); }
	.rx-button--flat:hover { color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); }
	.rx-button--border { color: rgb(var(--rx-color)); background: transparent; border: 1px solid rgb(var(--rx-color)); }
	.rx-button--border:hover { color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); }
	.rx-button--gradient { background: linear-gradient(135deg, rgb(var(--rx-color)), hsl(from rgb(var(--rx-color)) calc(h + 32) s l)); }
	.rx-button--gradient:hover { transform: translateY(-1px); filter: saturate(1.15); }
	.rx-button--shadow { box-shadow: 0 10px 24px rgb(var(--rx-color) / var(--rx-shadow-opacity)); }
	.rx-button--shadow:hover { box-shadow: 0 14px 30px rgb(var(--rx-color) / var(--rx-shadow-opacity)); transform: translateY(-2px); }
	.rx-button--relief { box-shadow: 0 4px 0 rgb(var(--rx-color) / .55); transform: translateY(-2px); }
	.rx-button--relief:active { box-shadow: 0 1px 0 rgb(var(--rx-color) / .55); transform: translateY(1px); }
	.rx-button--transparent { color: rgb(var(--rx-color)); background: transparent; }
	.rx-button--transparent:hover { background: rgb(var(--rx-color) / .12); }
	.rx-button--xl { min-height: 3.5rem; padding: 0 1.75rem; font-size: 1.08rem; }
	.rx-button--lg { min-height: 3rem; padding: 0 1.4rem; font-size: 1rem; }
	.rx-button--size-default { min-height: 2.55rem; padding: 0 1.15rem; font-size: .9rem; }
	.rx-button--sm { min-height: 2.15rem; padding: 0 .9rem; font-size: .82rem; }
	.rx-button--mini { min-height: 1.75rem; padding: 0 .65rem; font-size: .72rem; border-radius: calc(var(--rx-radius) * .7); }
	.rx-button--circle, .rx-button--square { width: 2.55rem; padding: 0; }
	.rx-button--circle { border-radius: 9999px; }
	.rx-button--square { border-radius: calc(var(--rx-radius) * .7); }
	.rx-button--xl.rx-button--circle, .rx-button--xl.rx-button--square { width: 3.5rem; }
	.rx-button--lg.rx-button--circle, .rx-button--lg.rx-button--square { width: 3rem; }
	.rx-button--sm.rx-button--circle, .rx-button--sm.rx-button--square { width: 2.15rem; }
	.rx-button--mini.rx-button--circle, .rx-button--mini.rx-button--square { width: 1.75rem; }
	.rx-button--block { display: flex; width: 100%; }
	.rx-button--floating { box-shadow: 0 10px 24px rgb(var(--rx-color) / .36); }
	.rx-button--floating:hover { box-shadow: 0 16px 32px rgb(var(--rx-color) / .42); transform: translateY(-3px); }
	.rx-button--glow { animation: rx-glow 1.8s var(--rx-ease) infinite; }
	.rx-button--pulse { animation: rx-pulse 1.4s var(--rx-ease) infinite; }
	.rx-button__content { display: inline-flex; align-items: center; justify-content: center; gap: .5em; }
	.rx-button__content--hidden { visibility: hidden; }
	.rx-button__icon { display: inline-flex; }
	.rx-button__loader { position: absolute; width: 1em; height: 1em; border: 2px solid currentColor; border-right-color: transparent; border-radius: 9999px; animation: rx-button-spin .7s linear infinite; }
	@keyframes rx-button-spin { to { transform: rotate(1turn); } }
	@media (prefers-reduced-motion: reduce) { .rx-button { transition-duration: 0ms; } .rx-button--glow, .rx-button--pulse, .rx-button__loader { animation-duration: 1ms; animation-iteration-count: 1; } }
</style>
