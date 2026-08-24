<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '../../lib/color';

	export interface IndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'content' | 'children'> {
		variant?: 'dot' | 'ring' | 'pulse' | 'count' | 'icon' | 'border';
		color?: RxColor;
		content?: string | number;
		icon?: Snippet;
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
		offset?: boolean;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { styleColor } from '../../lib/color';
	import { RX_EASE } from '../../lib/easing';
	import { indicatorVariants } from './index';

	let { variant = 'dot', color = 'success', content, icon, position = 'top-right', offset = false,
		children, class: className, style, ...restProps }: IndicatorProps = $props();
	const classes = $derived(indicatorVariants({ variant, position, offset, standalone: !children,
		class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color)}; --rx-ease: ${RX_EASE}; ${typeof style === 'string' ? style : ''}`);
</script>

<span {...restProps} class={classes} style={inlineStyle}>
	{#if children}<span class="rx-indicator__content">{@render children()}</span>{/if}
	{#if variant !== 'border'}
		<span class="rx-indicator__marker" aria-hidden={variant === 'dot' || variant === 'ring' || variant === 'pulse'}>
			{#if variant === 'count'}{content}{:else if variant === 'icon' && icon}{@render icon()}{/if}
		</span>
	{/if}
</span>

<style>
	.rx-indicator { position: relative; display: inline-flex; vertical-align: middle; }
	.rx-indicator__content { display: inline-flex; }
	.rx-indicator__marker { position: absolute; z-index: 1; display: grid; place-items: center; box-sizing: border-box; min-width: .7rem; height: .7rem; border-radius: 9999px; color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); box-shadow: 0 0 0 2px rgb(var(--rx-background)); font-size: .65rem; font-weight: 700; line-height: 1; }
	.rx-indicator--top-right .rx-indicator__marker { top: 0; right: 0; transform: translate(50%, -50%); }
	.rx-indicator--top-left .rx-indicator__marker { top: 0; left: 0; transform: translate(-50%, -50%); }
	.rx-indicator--bottom-right .rx-indicator__marker { right: 0; bottom: 0; transform: translate(50%, 50%); }
	.rx-indicator--bottom-left .rx-indicator__marker { bottom: 0; left: 0; transform: translate(-50%, 50%); }
	.rx-indicator--offset.rx-indicator--top-right .rx-indicator__marker { transform: translate(20%, -20%); }
	.rx-indicator--offset.rx-indicator--top-left .rx-indicator__marker { transform: translate(-20%, -20%); }
	.rx-indicator--offset.rx-indicator--bottom-right .rx-indicator__marker { transform: translate(20%, 20%); }
	.rx-indicator--offset.rx-indicator--bottom-left .rx-indicator__marker { transform: translate(-20%, 20%); }
	.rx-indicator--ring .rx-indicator__marker { background: rgb(var(--rx-background)); border: 2px solid rgb(var(--rx-color)); }
	.rx-indicator--pulse .rx-indicator__marker::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: rgb(var(--rx-color)); animation: rx-indicator-pulse 1.5s var(--rx-ease) infinite; z-index: -1; }
	.rx-indicator--count .rx-indicator__marker { min-width: 1.25rem; height: 1.25rem; padding: 0 .3rem; }
	.rx-indicator--icon .rx-indicator__marker { width: 1.4rem; height: 1.4rem; }
	.rx-indicator--border { padding: 3px; border: 2px solid rgb(var(--rx-color)); border-radius: calc(var(--rx-radius) + 3px); }
	.rx-indicator--standalone { width: auto; min-width: .7rem; min-height: .7rem; }
	.rx-indicator--standalone .rx-indicator__marker { position: relative; inset: auto; transform: none; }
	@keyframes rx-indicator-pulse { from { opacity: .65; transform: scale(1); } to { opacity: 0; transform: scale(2.4); } }
	@media (prefers-reduced-motion: reduce) { .rx-indicator--pulse .rx-indicator__marker::after { animation: none; } }
</style>
