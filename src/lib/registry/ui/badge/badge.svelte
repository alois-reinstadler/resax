<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '../../lib/color';
	export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'content' | 'children'> {
		variant?: 'default' | 'glow' | 'gradient' | 'pulse' | 'shimmer' | 'stripes'; color?: RxColor;
		content?: string | number; dot?: boolean; position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; children?: Snippet;
	}
</script>
<script lang="ts">
	import { styleColor } from '../../lib/color';
	import { badgeVariants } from './index';
	let { variant = 'default', color, content, dot = false, position = 'top-right', children,
		class: className, style, ...restProps }: BadgeProps = $props();
	const pillClasses = $derived(badgeVariants({ variant, dot: dot && content === undefined, class: !children && typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; ${style ?? ''}`);
</script>
{#snippet pill()}<span class={pillClasses} aria-hidden={dot && content === undefined ? 'true' : undefined}>{content ?? ''}</span>{/snippet}
{#if children}
	<span {...restProps} class={['rx-badge__wrapper', `rx-badge__wrapper--${position}`, className]} style={inlineStyle}>
		{@render children()}{@render pill()}
	</span>
{:else}
	<span {...restProps} class={pillClasses} style={inlineStyle}>{content ?? ''}</span>
{/if}
<style>
	.rx-badge__wrapper { position: relative; display: inline-flex; }
	.rx-badge__wrapper > .rx-badge__pill { position: absolute; z-index: 1; }
	.rx-badge__wrapper--top-right > .rx-badge__pill { top: 0; right: 0; transform: translate(45%, -45%); }
	.rx-badge__wrapper--top-left > .rx-badge__pill { top: 0; left: 0; transform: translate(-45%, -45%); }
	.rx-badge__wrapper--bottom-right > .rx-badge__pill { right: 0; bottom: 0; transform: translate(45%, 45%); }
	.rx-badge__wrapper--bottom-left > .rx-badge__pill { bottom: 0; left: 0; transform: translate(-45%, 45%); }
	.rx-badge__pill { display: inline-grid; min-width: 1.4rem; min-height: 1.4rem; place-items: center; box-sizing: border-box; padding: .15rem .45rem; border: 2px solid rgb(var(--rx-background)); border-radius: 9999px; color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); font-size: .7rem; font-weight: 700; line-height: 1; white-space: nowrap; }
	.rx-badge--dot { min-width: .65rem; min-height: .65rem; width: .65rem; height: .65rem; padding: 0; }
	.rx-badge--glow { animation: rx-glow 1.8s ease-in-out infinite; box-shadow: 0 0 14px rgb(var(--rx-color) / .55); }
	.rx-badge--gradient { background: linear-gradient(135deg, rgb(var(--rx-color)), hsl(from rgb(var(--rx-color)) calc(h + 42) s l)); }
	.rx-badge--pulse { animation: rx-pulse 1.4s ease-in-out infinite; }
	.rx-badge--shimmer { background: linear-gradient(105deg, rgb(var(--rx-color)) 30%, rgb(var(--rx-light) / .55) 48%, rgb(var(--rx-color)) 66%); background-size: 220% 100%; animation: rx-shimmer 1.8s linear infinite; }
	.rx-badge--stripes { background: repeating-linear-gradient(45deg, rgb(var(--rx-color)) 0 6px, hsl(from rgb(var(--rx-color)) h s calc(l + 12)) 6px 12px); background-size: 34px 34px; animation: rx-badge-stripes 1.3s linear infinite; }
	@keyframes rx-badge-stripes { to { background-position: 34px 0; } }
	@media (prefers-reduced-motion: reduce) { .rx-badge--glow, .rx-badge--pulse, .rx-badge--shimmer, .rx-badge--stripes { animation-duration: 1ms; animation-iteration-count: 1; } }
</style>
