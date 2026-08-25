<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface CardSlide { src: string; alt: string; }
	export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
		variant?: 'default' | 'shadow' | 'border' | 'flat' | 'reveal' | 'zoom' | 'asset' | 'glow' | 'gradient-border' | 'lift' | 'slider' | 'spotlight' | 'tilt-3d';
		color?: RxColor;
		href?: string;
		size?: 'sm' | 'md' | 'lg';
		radius?: 'rounded' | 'none' | 'subtle' | 'pill' | 'squircle';
		disabled?: boolean;
		media?: Snippet;
		header?: Snippet;
		footer?: Snippet;
		actions?: Snippet;
		children?: Snippet;
		slides?: CardSlide[];
		autoplay?: number;
		onslidechange?: (index: number) => void;
	}
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { styleColor } from '$lib/registry/lib/color';
	import { pointerPosition } from '$lib/registry/attachments/pointer-position';
	import { tilt3d } from '$lib/registry/attachments/tilt3d';
	import { cardVariants } from './index';

	let { variant = 'default', color, href, size = 'md', radius = 'rounded', disabled = false, media, header, footer, actions, children, slides = [], autoplay = 0, onslidechange, class: className, style, ...restProps }: CardProps = $props();
	let slide = $state(0);
	const classes = $derived(`${cardVariants({ variant, class: typeof className === 'string' ? className : undefined })} rx-card--${size} rx-card--r-${radius} ${href ? 'rx-card--interactive' : ''} ${disabled ? 'is-disabled' : ''}`);
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; ${style ?? ''}`);
	const anchorProps = $derived(restProps as unknown as HTMLAnchorAttributes);
	const attachSpotlight = $derived(pointerPosition({ disabled: () => disabled || variant !== 'spotlight' }));
	const attachTilt = $derived(tilt3d({ degrees: 6, disabled: () => disabled || variant !== 'tilt-3d' }));

	$effect(() => {
		if (variant !== 'slider' || autoplay <= 0 || slides.length < 2) return;
		const timer = window.setInterval(() => selectSlide((slide + 1) % slides.length), autoplay);
		return () => window.clearInterval(timer);
	});

	function selectSlide(index: number) {
		if (!slides.length) return;
		slide = (index + slides.length) % slides.length;
		onslidechange?.(slide);
	}

</script>

{#snippet contents()}
	<span class="rx-card__aura" aria-hidden="true"></span>
	<span class="rx-card__gradient-ring" aria-hidden="true"></span>
	<span class="rx-card__spotlight" aria-hidden="true"></span>
	<div class="rx-card__inner">
		{#if variant === 'slider' && slides.length}
			<div class="rx-card__slider-media">
				<div class="rx-card__track" style={`transform:translateX(${-slide * 100}%)`}>
					{#each slides as item}<div class="rx-card__slide"><img src={item.src} alt={item.alt} /></div>{/each}
				</div>
				<span class="rx-card__scrim" aria-hidden="true"></span>
				<button class="rx-card__nav rx-card__nav--prev" type="button" aria-label="Previous slide" disabled={slide === 0} onclick={(event) => { event.preventDefault(); selectSlide(slide - 1); }}>‹</button>
				<button class="rx-card__nav rx-card__nav--next" type="button" aria-label="Next slide" disabled={slide === slides.length - 1} onclick={(event) => { event.preventDefault(); selectSlide(slide + 1); }}>›</button>
				<span class="rx-card__count"><b>{slide + 1}</b><i>/</i>{slides.length}</span>
				<div class="rx-card__dots">{#each slides as _, index}<button type="button" class:active={index === slide} aria-label={`Go to slide ${index + 1}`} aria-current={index === slide ? 'true' : undefined} onclick={(event) => { event.preventDefault(); selectSlide(index); }}></button>{/each}</div>
			</div>
		{:else if media}<div class="rx-card__media">{@render media()}</div>{/if}
		{#if actions}<div class="rx-card__actions">{@render actions()}</div>{/if}
		{#if header}<div class="rx-card__header">{@render header()}</div>{/if}
		{#if children}<div class="rx-card__body">{@render children()}</div>{/if}
		{#if footer}<div class="rx-card__footer">{@render footer()}</div>{/if}
	</div>
{/snippet}

{#if href}<a {...anchorProps} {href} class={classes} style={inlineStyle} aria-disabled={disabled ? 'true' : undefined} tabindex={disabled ? -1 : restProps.tabindex} {@attach attachSpotlight} {@attach attachTilt}>{@render contents()}</a>
{:else}<div {...restProps} class={classes} style={inlineStyle} {@attach attachSpotlight} {@attach attachTilt}>{@render contents()}</div>{/if}

<style>
	@property --rx-card-angle{syntax:'<angle>';inherits:false;initial-value:0deg}
	.rx-card{--card-r:12px;--card-pad:18px;--card-gap:8px;position:relative;isolation:isolate;display:flex;flex-direction:column;box-sizing:border-box;width:100%;max-width:380px;margin-inline:auto;text-align:left;color:rgb(var(--rx-text));border:1px solid rgb(var(--rx-gray-3));border-radius:var(--card-r);background:rgb(var(--rx-background));text-decoration:none;transition:transform 320ms cubic-bezier(.34,1.4,.64,1),background-color 220ms cubic-bezier(.22,1,.36,1),border-color 220ms cubic-bezier(.22,1,.36,1),box-shadow 280ms cubic-bezier(.22,1,.36,1)}.rx-card--sm{--card-r:10px;--card-pad:14px;max-width:320px}.rx-card--lg{--card-r:14px;--card-pad:24px;max-width:440px}.rx-card--r-none{--card-r:0}.rx-card--r-subtle{--card-r:8px}.rx-card--r-pill{--card-r:28px}.rx-card--interactive{cursor:pointer;user-select:none;touch-action:manipulation}.rx-card--interactive:focus-visible{outline:2px solid rgb(var(--rx-color));outline-offset:2px}.rx-card.is-disabled{opacity:.5;pointer-events:none}
	.rx-card--default{box-shadow:0 1px 2px rgb(var(--rx-dark)/.08),0 6px 18px -14px rgb(var(--rx-dark)/.16)}.rx-card--default.rx-card--interactive:hover{border-color:rgb(var(--rx-gray-5));box-shadow:0 1px 3px rgb(var(--rx-dark)/.1),0 12px 30px -18px rgb(var(--rx-dark)/.22);transform:translateY(-2px)}.rx-card--default.rx-card--interactive:active{transform:scale(.97)}.rx-card--shadow{box-shadow:0 1px 2px rgb(var(--rx-dark)/.12),0 10px 28px -14px rgb(var(--rx-color)/.4)}.rx-card--border{background:transparent;border-color:rgb(var(--rx-color))}.rx-card--flat{background:rgb(var(--rx-color)/.08);border-color:transparent}
	.rx-card__inner{position:relative;z-index:0;display:flex;flex-direction:column;border-radius:inherit;overflow:clip;background:inherit}.rx-card__media{position:relative;overflow:hidden;width:100%;min-height:8rem;background:rgb(var(--rx-gray-1))}.rx-card__media :global(img),.rx-card__media :global(svg),.rx-card__media :global(video){display:block;width:100%;height:100%;object-fit:cover;transition:transform 620ms cubic-bezier(.22,1,.36,1)}.rx-card__header,.rx-card__body,.rx-card__footer{position:relative;z-index:2;padding:var(--card-pad)}.rx-card__header+.rx-card__body,.rx-card__body+.rx-card__footer{padding-top:0}.rx-card__footer{display:flex;align-items:center;gap:8px}.rx-card--zoom:hover .rx-card__media :global(*),.rx-card--zoom:focus-within .rx-card__media :global(*){transform:scale(1.08)}.rx-card--reveal .rx-card__footer{position:absolute;right:0;bottom:0;left:0;background:rgb(var(--rx-background)/.94);backdrop-filter:blur(12px);transform:translateY(100%);transition:transform 320ms cubic-bezier(.22,1,.36,1)}.rx-card--reveal:hover .rx-card__footer,.rx-card--reveal:focus-within .rx-card__footer{transform:translateY(0)}
	/* Asset: inset media and blurred actions */
	.rx-card--asset{border-radius:calc(var(--card-r) + 10px);transition:border-color 180ms cubic-bezier(.22,1,.36,1)}.rx-card--asset:hover,.rx-card--asset:focus-visible{border-color:rgb(var(--rx-text))}.rx-card--asset .rx-card__media{margin:10px;width:calc(100% - 20px);border-radius:var(--card-r);clip-path:inset(0 round var(--card-r))}.rx-card--asset:hover .rx-card__media :global(*){transform:scale(1.03)}.rx-card__actions{position:absolute;z-index:4;top:18px;right:18px;display:flex;gap:6px}.rx-card__actions :global(button){width:36px;height:36px;padding:0;display:grid;place-items:center;border-radius:12px;border:1px solid rgb(var(--rx-light)/.22);background:rgb(var(--rx-dark)/.42);backdrop-filter:blur(12px) saturate(140%);color:rgb(var(--rx-light));cursor:pointer;opacity:0;transform:scale(.7);filter:blur(6px);transition:opacity 200ms cubic-bezier(.22,1,.36,1),filter 200ms cubic-bezier(.22,1,.36,1),background-color 180ms,transform 240ms cubic-bezier(.34,1.56,.64,1)}.rx-card--asset:hover .rx-card__actions :global(button),.rx-card__actions :global(button:focus-visible){opacity:1;transform:none;filter:none}.rx-card__actions :global(button:active){transform:scale(.94)}
	/* Ambient glow */
	.rx-card__aura{display:none;position:absolute;inset:-2px;z-index:-1;border-radius:inherit;pointer-events:none;background:radial-gradient(120% 120% at 50% 0%,color-mix(in srgb,rgb(var(--rx-color)) 55%,transparent),transparent 70%);filter:blur(14px);opacity:.35;animation:rx-card-breathe 4.5s ease-in-out infinite}.rx-card--glow .rx-card__aura{display:block}.rx-card--glow:hover{transform:translateY(-2px);border-color:color-mix(in srgb,rgb(var(--rx-color)) 60%,rgb(var(--rx-gray-3)))}.rx-card--glow:hover .rx-card__aura{opacity:.7;animation-play-state:paused}@keyframes rx-card-breathe{0%,100%{opacity:.3;transform:scale(.98)}50%{opacity:.5;transform:scale(1.02)}}
	/* Gradient border */
	.rx-card--gradient-border{border-color:transparent}.rx-card__gradient-ring{display:none;position:absolute;inset:-1.5px;z-index:-1;border-radius:inherit;pointer-events:none;background:conic-gradient(from var(--rx-card-angle),rgb(var(--rx-color)),color-mix(in srgb,rgb(var(--rx-color)) 40%,rgb(var(--rx-light))) 25%,color-mix(in srgb,rgb(var(--rx-color)) 60%,transparent) 50%,color-mix(in srgb,rgb(var(--rx-color)) 40%,rgb(var(--rx-light))) 75%,rgb(var(--rx-color)));opacity:.55;animation:rx-card-ring 6s linear infinite}.rx-card--gradient-border .rx-card__gradient-ring{display:block}.rx-card--gradient-border:hover{transform:translateY(-2px)}.rx-card--gradient-border:hover .rx-card__gradient-ring{opacity:.95}@keyframes rx-card-ring{to{--rx-card-angle:360deg}}
	/* Lift */
	.rx-card--lift{box-shadow:0 1px 2px rgb(var(--rx-dark)/.12),0 6px 18px -14px rgb(var(--rx-dark)/.3);transition:transform 380ms cubic-bezier(.34,1.56,.64,1),box-shadow 320ms cubic-bezier(.22,1,.36,1),border-color 220ms cubic-bezier(.22,1,.36,1)}.rx-card--lift:hover{transform:translateY(-8px) scale(1.015);box-shadow:0 2px 6px rgb(var(--rx-dark)/.18),0 26px 50px -22px rgb(var(--rx-dark)/.5);border-color:color-mix(in srgb,rgb(var(--rx-color)) 30%,rgb(var(--rx-gray-3)))}.rx-card--lift:active{transform:translateY(-3px) scale(1.005)}.rx-card--lift:hover .rx-card__media :global(*){transform:scale(1.06) translateY(-2%)}
	/* Slider */
	.rx-card__slider-media{position:relative;overflow:hidden;background:rgb(var(--rx-gray-1));aspect-ratio:16/10}.rx-card__track{display:flex;width:100%;height:100%;transition:transform 760ms cubic-bezier(.22,1,.36,1)}.rx-card__slide{flex:0 0 100%;overflow:hidden}.rx-card__slide img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 620ms cubic-bezier(.22,1,.36,1)}.rx-card--slider:hover .rx-card__slide img{transform:scale(1.06)}.rx-card__scrim{position:absolute;inset:auto 0 0;height:46%;background:linear-gradient(to top,rgb(var(--rx-dark)/.5),rgb(var(--rx-dark)/.14) 45%,transparent);pointer-events:none}.rx-card__nav{position:absolute;top:50%;translate:0 -50%;width:32px;height:32px;padding:0;display:grid;place-items:center;border-radius:50%;border:1px solid rgb(var(--rx-light)/.28);background:rgb(var(--rx-dark)/.34);backdrop-filter:blur(10px) saturate(140%);color:rgb(var(--rx-light));cursor:pointer;opacity:0;transform:scale(.72);filter:blur(4px);transition:opacity 200ms,transform 240ms cubic-bezier(.34,1.56,.64,1),filter 200ms,background-color 180ms}.rx-card__nav--prev{left:10px}.rx-card__nav--next{right:10px}.rx-card__slider-media:hover .rx-card__nav,.rx-card__nav:focus-visible{opacity:1;transform:none;filter:none}.rx-card__nav:disabled{opacity:0;pointer-events:none}.rx-card__count{position:absolute;top:10px;right:10px;display:inline-flex;gap:2px;height:20px;padding:0 8px;align-items:center;border-radius:999px;background:rgb(var(--rx-dark)/.42);backdrop-filter:blur(8px);color:rgb(var(--rx-light));font-size:10.5px;font-weight:600}.rx-card__count i{font-style:normal;opacity:.55}.rx-card__dots{position:absolute;left:0;right:0;bottom:10px;display:flex;justify-content:center;align-items:center;gap:18px}.rx-card__dots button{position:relative;box-sizing:content-box;width:6px;height:6px;padding:9px;margin:-9px;border:0;border-radius:999px;background:none;cursor:pointer;transition:width 420ms cubic-bezier(.22,1,.36,1)}.rx-card__dots button::before{content:'';position:absolute;inset:9px;border-radius:inherit;background:rgb(var(--rx-light)/.42)}.rx-card__dots button.active{width:22px}.rx-card__dots button.active::before{background:rgb(var(--rx-light))}
	/* Live pointer spotlight */
	.rx-card__spotlight{display:none;position:absolute;inset:0;z-index:3;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity 240ms;background:radial-gradient(240px circle at var(--rx-mx,50%) var(--rx-my,50%),color-mix(in srgb,rgb(var(--rx-color)) 22%,transparent),transparent 60%);mix-blend-mode:screen}.rx-card--spotlight .rx-card__spotlight{display:block}.rx-card--spotlight.is-lit .rx-card__spotlight{opacity:var(--rx-lit,1)}.rx-card--spotlight:hover{border-color:rgb(var(--rx-gray-5));transform:translateY(-2px)}
	/* Live 3D tilt */
	.rx-card--tilt-3d{--rx-tilt-x:0deg;--rx-tilt-y:0deg;transform-style:preserve-3d;transform:perspective(900px) rotateX(calc(var(--rx-tilt-x)*.833333)) rotateY(var(--rx-tilt-y));transition:transform 400ms cubic-bezier(.22,1,.36,1),border-color 220ms cubic-bezier(.22,1,.36,1)}.rx-card--tilt-3d.is-active{transition:transform 90ms linear,border-color 220ms ease;border-color:color-mix(in srgb,rgb(var(--rx-color)) 40%,rgb(var(--rx-gray-3)))}.rx-card--tilt-3d::after{content:'';position:absolute;inset:0;z-index:-1;border-radius:inherit;box-shadow:0 24px 48px -24px rgb(var(--rx-dark)/.5);opacity:0;transition:opacity 280ms cubic-bezier(.22,1,.36,1)}.rx-card--tilt-3d.is-active::after{opacity:1}.rx-card--tilt-3d .rx-card__inner{transform:translateZ(.01px)}
	@media(hover:none){.rx-card__actions :global(button),.rx-card__nav{opacity:1;transform:none;filter:none}}
	@media(prefers-reduced-motion:reduce){.rx-card,.rx-card--tilt-3d,.rx-card__track,.rx-card__media :global(*),.rx-card__slide img,.rx-card__nav,.rx-card__dots button{transition:none!important;transform:none!important}.rx-card__aura,.rx-card__gradient-ring{animation:none}.rx-card__actions :global(button){transform:none;filter:none}}
</style>
