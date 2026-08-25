<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export type SpinnerType = 'default' | 'waves' | 'corners' | 'border' | 'points' | 'square' | 'gradient' | 'rectangle' | 'circles' | 'scale' | 'bars' | 'bounce' | 'comet' | 'dots' | 'flip' | 'grid' | 'orbit' | 'pulse' | 'ring' | 'wave';
	export type SpinnerSize = 'xl' | 'lg' | 'default' | 'sm' | 'mini';
	export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
		type?: SpinnerType;
		variant?: 'arc' | 'dual' | 'gradient';
		color?: RxColor;
		size?: SpinnerSize;
		duration?: number;
		easing?: 'linear' | 'ease' | 'ease-in-out';
		thickness?: number;
		track?: boolean;
		overlay?: boolean;
		label?: string;
		text?: Snippet;
	}

	export const spinnerSizeClass: Record<SpinnerSize, string> = {
		xl: 'rx-spinner--xl', lg: 'rx-spinner--lg', default: 'rx-spinner--default', sm: 'rx-spinner--sm', mini: 'rx-spinner--mini'
	};
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { cn } from '$lib/utils.js';
	let { type = 'default', variant = 'arc', color = 'primary', size = 'default', duration = 900, easing = 'linear', thickness = 0,
		track = true, overlay = false, label = 'Loading', text, class: className, style, ...rest }: SpinnerProps = $props();
	const colorStyle = $derived([styleColor(color),`--rx-spinner-duration:${Math.max(120,duration)}ms`,`--rx-spinner-easing:${easing}`,
		thickness > 0 ? `--rx-spinner-thickness:${thickness}px` : undefined, typeof style === 'string' ? style : undefined].filter(Boolean).join('; '));
	const canonicalType = $derived(({ waves:'wave',corners:'grid',border:'default',points:'dots',square:'flip',gradient:'comet',rectangle:'bars',circles:'orbit',scale:'pulse' } as Partial<Record<SpinnerType, SpinnerType>>)[type] ?? type);
	const pieces = $derived(canonicalType === 'default' && variant === 'dual' ? 2 : canonicalType === 'bars' ? 5 : canonicalType === 'dots' ? 3 : canonicalType === 'grid' ? 9 : canonicalType === 'orbit' ? 3 : canonicalType === 'pulse' ? 3 : canonicalType === 'ring' ? 12 : canonicalType === 'wave' ? 6 : canonicalType === 'bounce' ? 2 : 1);
</script>

<div {...rest} class={cn('rx-spinner', `rx-spinner--${canonicalType}`, `rx-spinner--${type}`, canonicalType === 'default' && `rx-spinner--base-${variant}`, !track && 'rx-spinner--no-track', overlay && 'rx-spinner--overlay', ['default','bars','bounce','comet','dots','flip','grid','orbit','pulse','ring','wave'].includes(type) && `rx-spinner--source-${type}`, canonicalType !== type && `rx-spinner--legacy-${type}`, spinnerSizeClass[size], className)} data-type={type} data-variant={canonicalType === 'default' ? variant : undefined} style={colorStyle} role="status" aria-label={label} aria-live="polite">
	<div class="rx-spinner__visual" aria-hidden="true">
		{#each Array(pieces) as _, index}<i class:rx-spinner__shadow={canonicalType === 'bounce' && index === 1} style={`--rx-index: ${index}`}></i>{/each}
	</div>
	{#if text}<div class="rx-spinner__text">{@render text()}</div>{:else}<span class="rx-sr-only">{label}</span>{/if}
</div>

<style>
	.rx-spinner { --rx-spinner-size:32px;--rx-spinner-dot:calc(var(--rx-spinner-size)*.18);--rx-spinner-thickness:3px;--rx-spinner-track:rgb(var(--rx-color)/.16);display:inline-flex;flex-direction:column;align-items:center;gap:.5rem;color:rgb(var(--rx-color));user-select:none }
	.rx-spinner--xl { --rx-spinner-size: 64px; } .rx-spinner--lg { --rx-spinner-size: 48px; } .rx-spinner--sm { --rx-spinner-size: 24px; } .rx-spinner--mini { --rx-spinner-size: 16px; }
	.rx-spinner__visual { position: relative; width: var(--rx-spinner-size); height: var(--rx-spinner-size); }
	i { position:absolute;display:block;box-sizing:border-box;background:currentColor }
	.rx-spinner--default i{inset:0;border-radius:50%;background:transparent;border:var(--rx-spinner-thickness) solid var(--rx-spinner-track);border-top-color:rgb(var(--rx-color));animation:rx-spinner-spin var(--rx-spinner-duration) var(--rx-spinner-easing) infinite}
	.rx-spinner--base-dual i{opacity:.5}.rx-spinner--base-dual i:first-child{opacity:1;animation-timing-function:linear}.rx-spinner--base-dual i:last-child{animation-timing-function:cubic-bezier(.65,.1,.35,.9)}
	.rx-spinner--base-gradient i{border:0;background:conic-gradient(from 0deg,transparent 0%,rgb(var(--rx-color)) 100%);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--rx-spinner-thickness)),#000 calc(100% - var(--rx-spinner-thickness)));mask:radial-gradient(farthest-side,transparent calc(100% - var(--rx-spinner-thickness)),#000 calc(100% - var(--rx-spinner-thickness)))}
	.rx-spinner--no-track{--rx-spinner-track:transparent}.rx-spinner--overlay{position:absolute;inset:0;z-index:10;width:100%;height:100%;justify-content:center;background:rgb(var(--rx-dark)/.45);backdrop-filter:blur(2px);border-radius:inherit}
	.rx-spinner--bars .rx-spinner__visual{display:flex;align-items:center;justify-content:space-between}.rx-spinner--bars i{position:static;width:12%;height:72%;border-radius:999px;transform-origin:center;animation:rx-spinner-bars var(--rx-spinner-duration) ease-in-out infinite;animation-delay:calc(var(--rx-index)*var(--rx-spinner-duration)/-5)}
	.rx-spinner--bounce i:first-child{left:35%;top:5%;width:30%;height:30%;border-radius:50%;transform-origin:50% 100%;animation:rx-spinner-bounce var(--rx-spinner-duration) cubic-bezier(.5,0,.5,1) infinite}.rx-spinner--bounce .rx-spinner__shadow{left:28%;bottom:3%;width:44%;height:10%;border-radius:50%;background:rgb(var(--rx-color)/.25);filter:blur(1px);animation:rx-spinner-bounce-shadow var(--rx-spinner-duration) cubic-bezier(.5,0,.5,1) infinite}
	.rx-spinner--comet i{inset:0;border-radius:50%;background:conic-gradient(transparent 0%,rgb(var(--rx-color)/.04) 35%,rgb(var(--rx-color)) 100%);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - max(2px,calc(var(--rx-spinner-size)/9))),#000 calc(100% - max(2px,calc(var(--rx-spinner-size)/9))));mask:radial-gradient(farthest-side,transparent calc(100% - max(2px,calc(var(--rx-spinner-size)/9))),#000 calc(100% - max(2px,calc(var(--rx-spinner-size)/9))));animation:rx-spinner-spin var(--rx-spinner-duration) linear infinite}.rx-spinner--comet i::after{content:'';position:absolute;top:0;left:50%;width:var(--rx-spinner-dot);height:var(--rx-spinner-dot);translate:-50% -10%;border-radius:50%;background:rgb(var(--rx-color));box-shadow:0 0 calc(var(--rx-spinner-dot)*2) rgb(var(--rx-color)/.7)}
	.rx-spinner--dots .rx-spinner__visual{display:flex;align-items:center;justify-content:space-around}.rx-spinner--dots i{position:static;width:var(--rx-spinner-dot);height:var(--rx-spinner-dot);border-radius:50%;animation:rx-spinner-dots var(--rx-spinner-duration) ease-in-out infinite;animation-delay:calc(var(--rx-index)*var(--rx-spinner-duration)*.16)}
	.rx-spinner--flip i{inset:14%;border-radius:12%;transform-style:preserve-3d;animation:rx-spinner-flip var(--rx-spinner-duration) cubic-bezier(.5,0,.5,1) infinite}
	.rx-spinner--grid .rx-spinner__visual{display:grid;grid-template-columns:repeat(3,1fr);gap:8%}.rx-spinner--grid i{position:static;border-radius:20%;animation:rx-spinner-grid var(--rx-spinner-duration) ease-in-out infinite;animation-delay:calc((var(--rx-index) - 4)*var(--rx-spinner-duration)/-9)}
	.rx-spinner--orbit .rx-spinner__visual{animation:rx-spinner-spin var(--rx-spinner-duration) linear infinite}.rx-spinner--orbit i{left:calc(50% - var(--rx-spinner-dot)/2);top:calc(50% - var(--rx-spinner-dot)/2);width:var(--rx-spinner-dot);height:var(--rx-spinner-dot);border-radius:50%;transform:rotate(calc(var(--rx-index)*120deg)) translateY(calc(var(--rx-spinner-size)*-.39));opacity:calc(.72 - var(--rx-index)*.14);box-shadow:0 0 calc(var(--rx-spinner-dot)*1.1) rgb(var(--rx-color)/.55)}
	.rx-spinner--pulse i{inset:8%;border-radius:50%;background:transparent;border:2px solid currentColor;animation:rx-spinner-pulse var(--rx-spinner-duration) cubic-bezier(.2,.6,.3,1) infinite;animation-delay:calc(var(--rx-index)*var(--rx-spinner-duration)/-2)}.rx-spinner--pulse i:last-child{inset:35%;background:currentColor;border:0;animation-name:rx-spinner-pulse-core}
	.rx-spinner--ring i{left:46%;top:4%;width:8%;height:24%;border-radius:999px;transform-origin:50% 192%;transform:rotate(calc(var(--rx-index)*30deg));opacity:.15;animation:rx-spinner-ring var(--rx-spinner-duration) linear infinite;animation-delay:calc(var(--rx-index)*var(--rx-spinner-duration)/-12)}
	.rx-spinner--wave .rx-spinner__visual{display:flex;align-items:center;justify-content:space-between}.rx-spinner--wave i{position:static;width:12%;aspect-ratio:1;border-radius:50%;animation:rx-spinner-wave var(--rx-spinner-duration) ease-in-out infinite;animation-delay:calc(var(--rx-index)*var(--rx-spinner-duration)/-6)}
	.rx-spinner__text { color:rgb(var(--rx-text));font-size: .875rem; } .rx-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
	@keyframes rx-spinner-spin{to{transform:rotate(1turn)}}@keyframes rx-spinner-bars{0%,100%{transform:scaleY(.35);opacity:.45}50%{transform:scaleY(1);opacity:1}}@keyframes rx-spinner-bounce{0%{transform:translateY(0) scale(1,.1)}12%{transform:translateY(5%) scale(.94,1.1)}45%{transform:translateY(145%) scale(1.35,.55)}62%{transform:translateY(118%) scale(.92,1.12)}100%{transform:translateY(0) scale(1)}}@keyframes rx-spinner-bounce-shadow{0%,100%{transform:scale(.5);opacity:.2}45%{transform:scale(1.2);opacity:.6}}@keyframes rx-spinner-dots{0%,100%{transform:translateY(0) scale(.6);opacity:.35}50%{transform:translateY(calc(var(--rx-spinner-dot)*-.7)) scale(1);opacity:1}}@keyframes rx-spinner-flip{0%{transform:rotateX(0) rotateY(0)}50%{transform:rotateX(180deg) rotateY(0)}100%{transform:rotateX(180deg) rotateY(180deg)}}@keyframes rx-spinner-grid{0%,100%{transform:scale(.4);opacity:.3}50%{transform:scale(1);opacity:1}}@keyframes rx-spinner-pulse{from{transform:scale(.25);opacity:.9}to{transform:scale(1);opacity:0}}@keyframes rx-spinner-pulse-core{0%,100%{transform:scale(.7);opacity:.65}50%{transform:scale(1);opacity:1}}@keyframes rx-spinner-ring{0%{opacity:1}100%{opacity:.15}}@keyframes rx-spinner-wave{0%,100%{transform:translateY(calc(var(--rx-spinner-size)*-.22))}50%{transform:translateY(calc(var(--rx-spinner-size)*.22))}}
	@media (prefers-reduced-motion: reduce) { i { animation-duration:2.4s!important; } }
</style>
