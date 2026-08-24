<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '$lib/registry/lib/color';
	export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> {
		variant?: 'default' | 'flat' | 'border' | 'gradient'; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		closable?: boolean; onClose?: () => void; disabled?: boolean; icon?: Snippet; children: Snippet;
	}
</script>
<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { chipVariants } from './index';
	let { variant = 'default', color, size = 'default', closable = false, onClose, disabled = false,
		icon, children, class: className, style, ...restProps }: ChipProps = $props();
	const classes = $derived(chipVariants({ variant, size, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; ${style ?? ''}`);
	function close(event: MouseEvent) { event.stopPropagation(); if (!disabled) onClose?.(); }
</script>
<span {...restProps} class={classes} class:rx-chip--disabled={disabled} style={inlineStyle} aria-disabled={disabled ? 'true' : undefined}>
	{#if icon}<span class="rx-chip__icon">{@render icon()}</span>{/if}<span class="rx-chip__content">{@render children()}</span>
	{#if closable}<button type="button" class="rx-chip__close" aria-label="Close" disabled={disabled} onclick={close}>×</button>{/if}
</span>
<style>
	.rx-chip { display: inline-flex; align-items: center; gap: .4rem; box-sizing: border-box; border: 1px solid transparent; border-radius: 9999px; color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); font-weight: 600; line-height: 1; }
	.rx-chip--flat { color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .15); }
	.rx-chip--border { color: rgb(var(--rx-color)); border-color: rgb(var(--rx-color)); background: transparent; }
	.rx-chip--gradient { background: linear-gradient(135deg, rgb(var(--rx-color)), hsl(from rgb(var(--rx-color)) calc(h + 40) s l)); }
	.rx-chip--lg { min-height: 2.25rem; padding: .35rem .8rem; font-size: .95rem; }
	.rx-chip--size-default { min-height: 1.8rem; padding: .25rem .65rem; font-size: .82rem; }
	.rx-chip--sm { min-height: 1.4rem; padding: .18rem .48rem; font-size: .7rem; }
	.rx-chip__icon { display: inline-flex; overflow: hidden; border-radius: 9999px; }
	.rx-chip__close { display: grid; width: 1.25em; height: 1.25em; place-items: center; padding: 0; border: 0; border-radius: 9999px; color: inherit; background: rgb(var(--rx-light) / .18); cursor: pointer; font: inherit; line-height: 1; }
	.rx-chip--flat .rx-chip__close, .rx-chip--border .rx-chip__close { background: rgb(var(--rx-color) / .15); }
	.rx-chip__close:focus-visible { outline: 2px solid rgb(var(--rx-color) / .4); outline-offset: 2px; }
	.rx-chip--disabled { opacity: .5; cursor: not-allowed; }
	@media (prefers-reduced-motion: reduce) { .rx-chip { transition-duration: 0ms; } }
</style>
