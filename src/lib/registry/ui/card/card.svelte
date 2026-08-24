<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '../../lib/color';
	export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
		variant?: 'default' | 'shadow' | 'border' | 'flat' | 'reveal' | 'zoom';
		color?: RxColor; href?: string; media?: Snippet; header?: Snippet; footer?: Snippet; children?: Snippet;
	}
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { styleColor } from '../../lib/color';
	import { RX_DURATION, RX_EASE } from '../../lib/easing';
	import { cardVariants } from './index';
	let { variant = 'default', color, href, media, header, footer, children, class: className, style, ...restProps }: CardProps = $props();
	const classes = $derived(cardVariants({ variant, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-gray)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
	const anchorProps = $derived(restProps as unknown as HTMLAnchorAttributes);
</script>

{#snippet contents()}
	{#if media}<div class="rx-card__media">{@render media()}</div>{/if}
	{#if header}<div class="rx-card__header">{@render header()}</div>{/if}
	{#if children}<div class="rx-card__body">{@render children()}</div>{/if}
	{#if footer}<div class="rx-card__footer">{@render footer()}</div>{/if}
{/snippet}

{#if href}<a {...anchorProps} {href} class={classes} style={inlineStyle}>{@render contents()}</a>
{:else}<div {...restProps} class={classes} style={inlineStyle}>{@render contents()}</div>{/if}

<style>
	.rx-card { position: relative; display: flex; overflow: hidden; box-sizing: border-box; flex-direction: column; border-radius: calc(var(--rx-radius) * 1.5); color: rgb(var(--rx-text)); background: rgb(var(--rx-background)); text-decoration: none; transition: transform var(--rx-duration) var(--rx-ease), box-shadow var(--rx-duration) var(--rx-ease); }
	.rx-card:focus-visible { outline: 3px solid rgb(var(--rx-color) / .3); outline-offset: 3px; }
	.rx-card--default { box-shadow: 0 .45rem 1.5rem rgb(var(--rx-dark) / .1); }
	.rx-card--default:hover { transform: translateY(calc(var(--rx-radius) * -.25)); box-shadow: 0 .8rem 2rem rgb(var(--rx-dark) / .16); }
	.rx-card--shadow { box-shadow: 0 1rem 2.5rem rgb(var(--rx-color) / var(--rx-shadow-opacity)); }
	.rx-card--shadow:hover { transform: translateY(calc(var(--rx-radius) * -.2)); }
	.rx-card--border { border: 1px solid rgb(var(--rx-color)); box-shadow: none; }
	.rx-card--flat { background: rgb(var(--rx-color) / .14); }
	.rx-card__media { overflow: hidden; min-height: 8rem; }
	.rx-card__media :global(img), .rx-card__media :global(svg), .rx-card__media :global(video) { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-card__header, .rx-card__body, .rx-card__footer { padding: calc(var(--rx-radius) * 1.25); }
	.rx-card__header + .rx-card__body, .rx-card__body + .rx-card__footer { padding-top: 0; }
	.rx-card--zoom:hover .rx-card__media :global(img), .rx-card--zoom:focus-within .rx-card__media :global(img), .rx-card--zoom:hover .rx-card__media :global(svg), .rx-card--zoom:focus-within .rx-card__media :global(svg), .rx-card--zoom:hover .rx-card__media :global(video), .rx-card--zoom:focus-within .rx-card__media :global(video) { transform: scale(1.08); }
	.rx-card--reveal .rx-card__footer { position: absolute; right: 0; bottom: 0; left: 0; color: rgb(var(--rx-text)); background: rgb(var(--rx-background) / .94); transform: translateY(100%); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-card--reveal:hover .rx-card__footer, .rx-card--reveal:focus-within .rx-card__footer { transform: translateY(0); }
	@media (prefers-reduced-motion: reduce) { .rx-card, .rx-card__media :global(*), .rx-card__footer { transition-duration: 0ms; } }
</style>
