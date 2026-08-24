<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '../../lib/color';

	export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title' | 'children'> {
		variant?: 'default' | 'banner' | 'inline' | 'neon' | 'split' | 'toast';
		color?: RxColor;
		title?: string | Snippet;
		icon?: Snippet;
		closable?: boolean;
		open?: boolean;
		onClose?: () => void;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { styleColor } from '../../lib/color';
	import { RX_DURATION, RX_EASE, rxSlideUp } from '../../lib/easing';
	import { alertVariants } from './index';

	let { variant = 'default', color, title, icon, closable = false, open = $bindable(true), onClose,
		children, class: className, style, ...restProps }: AlertProps = $props();
	const classes = $derived(alertVariants({ variant, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
	const titleSnippet = $derived(typeof title === 'function' ? title : undefined);

	function close() { open = false; onClose?.(); }
</script>

{#if open}
	<div {...restProps} role="alert" class={classes} style={inlineStyle} transition:rxSlideUp>
		<div class="rx-alert__icon" aria-hidden="true">
			{#if icon}{@render icon()}{:else}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5h.01"/></svg>{/if}
		</div>
		<div class="rx-alert__content">
			{#if title}{#if titleSnippet}{@render titleSnippet()}{:else}<strong class="rx-alert__title">{title}</strong>{/if}{/if}
			{#if children}<div class="rx-alert__body">{@render children()}</div>{/if}
		</div>
		{#if closable}<button type="button" class="rx-alert__close" aria-label="Close" onclick={close}>×</button>{/if}
	</div>
{/if}

<style>
	.rx-alert { position: relative; display: flex; align-items: flex-start; gap: .8rem; box-sizing: border-box; width: 100%; padding: 1rem 1.1rem; border-radius: var(--rx-radius); color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .15); line-height: 1.45; }
	.rx-alert__icon { display: grid; flex: 0 0 1.45rem; place-items: center; }
	.rx-alert__icon :global(svg) { width: 1.35rem; height: 1.35rem; stroke-width: 2; }
	.rx-alert__content { min-width: 0; flex: 1; }
	.rx-alert__title { display: block; margin-bottom: .2rem; }
	.rx-alert__body { color: rgb(var(--rx-text)); }
	.rx-alert__close { display: grid; flex: 0 0 1.6rem; width: 1.6rem; height: 1.6rem; place-items: center; padding: 0; border: 0; border-radius: 9999px; color: currentColor; background: transparent; cursor: pointer; font: inherit; font-size: 1.25rem; line-height: 1; }
	.rx-alert__close:hover { background: rgb(var(--rx-color) / .14); }
	.rx-alert__close:focus-visible { outline: 2px solid rgb(var(--rx-color) / .4); outline-offset: 2px; }
	.rx-alert--banner { border-radius: 0; }
	.rx-alert--inline { align-items: center; width: fit-content; padding: .55rem .8rem; font-size: .875rem; }
	.rx-alert--inline .rx-alert__title { display: inline; margin: 0 .35rem 0 0; }
	.rx-alert--inline .rx-alert__body { display: inline; }
	.rx-alert--neon { border: 1px solid rgb(var(--rx-color)); color: rgb(var(--rx-color)); background: rgb(var(--rx-dark)); box-shadow: 0 0 18px rgb(var(--rx-color) / .38), inset 0 0 14px rgb(var(--rx-color) / .08); }
	.rx-alert--neon .rx-alert__body { color: rgb(var(--rx-light)); }
	.rx-alert--split { padding: 0; overflow: hidden; }
	.rx-alert--split .rx-alert__icon { align-self: stretch; flex-basis: 3.5rem; color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); }
	.rx-alert--split .rx-alert__content { padding: 1rem 0; }
	.rx-alert--split .rx-alert__close { margin: .85rem .8rem; }
	.rx-alert--toast { width: min(100%, 28rem); border-left: 4px solid rgb(var(--rx-color)); color: rgb(var(--rx-color)); background: rgb(var(--rx-background)); box-shadow: 0 10px 30px rgb(var(--rx-dark) / .16); }
	@media (prefers-reduced-motion: reduce) { .rx-alert { transition-duration: 0ms; } }
</style>
