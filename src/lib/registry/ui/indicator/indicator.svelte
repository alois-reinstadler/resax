<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface IndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'content' | 'children'> {
		variant?: 'base' | 'dot' | 'bounce' | 'odometer' | 'ping' | 'ring' | 'shake' | 'pulse' | 'count' | 'icon' | 'border';
		color?: RxColor;
		content?: string | number;
		count?: number;
		max?: number;
		dot?: boolean;
		showZero?: boolean;
		pulse?: boolean;
		size?: 'sm' | 'md' | 'lg';
		roll?: number;
		icon?: Snippet;
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
		offset?: boolean;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_EASE } from '$lib/registry/lib/easing';
	import { indicatorVariants } from './index';

	let { variant = 'base', color = 'success', content, count, max = 99, dot = false, showZero = false, pulse = false, size = 'md', roll = 620, icon, position = 'top-right', offset = false,
		children, class: className, style, ...restProps }: IndicatorProps = $props();
	const classes = $derived(indicatorVariants({ variant, position, offset, standalone: !children,
		class: typeof className === 'string' ? className : undefined }));
	const numericValue = $derived(count ?? (typeof content === 'number' ? content : undefined));
	const cappedContent = $derived(numericValue === undefined ? content : numericValue > max ? `${max}+` : `${numericValue}`);
	const visible = $derived(dot || icon !== undefined || numericValue === undefined || numericValue > 0 || showZero);
	const inlineStyle = $derived(`${styleColor(color)}; --rx-ease: ${RX_EASE}; --rx-indicator-roll:${Math.max(120,roll)}ms; --rx-indicator-digits:${String(cappedContent ?? '').length || 1}; ${typeof style === 'string' ? style : ''}`);
	const digits = $derived(String(cappedContent ?? '').split(''));
	const digitCells = ['0','1','2','3','4','5','6','7','8','9'];

	function indicatorEffects(node: HTMLSpanElement) {
		let firstFrame = 0;
		let secondFrame = 0;
		let timer = 0;
		const animateSwap = () => {
			cancelAnimationFrame(firstFrame);
			cancelAnimationFrame(secondFrame);
			clearTimeout(timer);
			firstFrame = requestAnimationFrame(() => {
				const marker = node.querySelector<HTMLElement>('.rx-indicator__marker');
				if (!marker) return;
				marker.getBoundingClientRect();
				secondFrame = requestAnimationFrame(() => {
					marker.classList.remove('rx-indicator__marker--swapping');
					marker.offsetWidth;
					marker.classList.add('rx-indicator__marker--swapping');
					timer = window.setTimeout(() => marker.classList.remove('rx-indicator__marker--swapping'), 300);
				});
			});
		};
		const observer = new MutationObserver(animateSwap);
		observer.observe(node, { childList: true, subtree: true, characterData: true });
		animateSwap();
		return () => { observer.disconnect(); cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); clearTimeout(timer); };
	}
</script>

<span {...restProps} class={classes} class:rx-indicator--sm={size === 'sm'} class:rx-indicator--lg={size === 'lg'} style={inlineStyle} data-rx-color={color} role={!children ? 'status' : undefined} {@attach indicatorEffects}>
	{#if children}<span class="rx-indicator__content">{@render children()}</span>{/if}
	{#if variant !== 'border'}
		<span class="rx-indicator__marker" class:rx-indicator__marker--hidden={!visible} class:rx-indicator__marker--dot={dot} aria-hidden={!visible || variant === 'base' || variant === 'dot' || variant === 'ring' || variant === 'ping' || variant === 'pulse'} aria-label={visible && cappedContent !== undefined && !dot ? `${cappedContent} notifications` : undefined}>
			{#if variant === 'odometer'}<span class="rx-indicator__reels">{#each digits as digit, index (index)}{#if /^\d$/.test(digit)}<i class="rx-indicator__reel"><span class="rx-indicator__strip" style={`transform:translateY(${Number(digit) * -10}%);--rx-index:${index}`}>{#each digitCells as cell}<b>{cell}</b>{/each}</span></i>{:else}<i class="rx-indicator__fixed">{digit}</i>{/if}{/each}</span>{:else if variant === 'count' || (variant === 'base' && !dot)}{cappedContent}{:else if variant === 'icon' && icon}{@render icon()}{/if}
		</span>
		{#if pulse && visible}<span class="rx-indicator__source-pulse" aria-hidden="true"></span>{/if}
	{/if}
</span>

<style>
	.rx-indicator { position: relative; display: inline-flex; vertical-align: middle; }
	.rx-indicator__content { display: inline-flex; }
	.rx-indicator { --rx-indicator-foreground: var(--rx-light); }
	.rx-indicator[data-rx-color='success'], .rx-indicator[data-rx-color='danger'], .rx-indicator[data-rx-color='warn'] { --rx-indicator-foreground: var(--rx-dark); }
	.rx-indicator[data-rx-color='dark'] { --rx-indicator-foreground: var(--rx-background); }
	.rx-indicator__marker { position: absolute; z-index: 1; display: grid; place-items: center; box-sizing: border-box; min-width: .7rem; height: .7rem; border-radius: 9999px; color: rgb(var(--rx-indicator-foreground)); background: rgb(var(--rx-color)); box-shadow: 0 0 0 2px rgb(var(--rx-background)); font-size: .65rem; font-weight: 700; line-height: 1; }
	.rx-indicator__marker{animation:rx-indicator-enter 260ms cubic-bezier(.34,1.56,.64,1)}
	.rx-indicator__marker{width:calc(1.25rem + (var(--rx-indicator-digits,1) - 1)*.6em);transition:width 520ms var(--rx-ease),height 520ms var(--rx-ease),border-radius 300ms cubic-bezier(.22,1,.36,1),background-color 300ms ease,transform 520ms var(--rx-ease),opacity 220ms ease,filter 280ms ease}.rx-indicator__marker--hidden{opacity:0;filter:blur(7px);scale:0;pointer-events:none}.rx-indicator__marker--dot{width:.7rem;min-width:.7rem}.rx-indicator--sm .rx-indicator__marker{height:1rem;min-width:1rem}.rx-indicator--lg .rx-indicator__marker{height:1.5rem;min-width:1.5rem}.rx-indicator__marker--swapping{animation:rx-indicator-content-swap 260ms var(--rx-ease)}
	.rx-indicator--top-right .rx-indicator__marker { top: 0; right: 0; transform: translate(50%, -50%); }
	.rx-indicator--top-left .rx-indicator__marker { top: 0; left: 0; transform: translate(-50%, -50%); }
	.rx-indicator--bottom-right .rx-indicator__marker { right: 0; bottom: 0; transform: translate(50%, 50%); }
	.rx-indicator--bottom-left .rx-indicator__marker { bottom: 0; left: 0; transform: translate(-50%, 50%); }
	.rx-indicator--offset.rx-indicator--top-right .rx-indicator__marker { transform: translate(20%, -20%); }
	.rx-indicator--offset.rx-indicator--top-left .rx-indicator__marker { transform: translate(-20%, -20%); }
	.rx-indicator--offset.rx-indicator--bottom-right .rx-indicator__marker { transform: translate(20%, 20%); }
	.rx-indicator--offset.rx-indicator--bottom-left .rx-indicator__marker { transform: translate(-20%, 20%); }
	.rx-indicator--ring .rx-indicator__marker { background: rgb(var(--rx-background)); border:0;box-shadow:0 0 0 2px rgb(var(--rx-background)) }.rx-indicator--ring .rx-indicator__marker::before{content:'';position:absolute;inset:-3px;border-radius:inherit;background:conic-gradient(rgb(var(--rx-color)),transparent 60%,rgb(var(--rx-color)));-webkit-mask:radial-gradient(farthest-side,transparent 60%,#000 62%);mask:radial-gradient(farthest-side,transparent 60%,#000 62%);animation:rx-indicator-ring 1.4s linear infinite}
	.rx-indicator--pulse .rx-indicator__marker::after,.rx-indicator--ping .rx-indicator__marker::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: rgb(var(--rx-color)); animation: rx-indicator-pulse 1.8s cubic-bezier(.22,1,.36,1) infinite; z-index: -1; }.rx-indicator--ping .rx-indicator__marker{box-shadow:0 0 0 2px rgb(var(--rx-background)),inset 0 0 0 2px rgb(var(--rx-color)/.55)}.rx-indicator--ping .rx-indicator__marker::after{animation-name:rx-indicator-ping}
	.rx-indicator--count .rx-indicator__marker { min-width: 1.25rem; height: 1.25rem; padding: 0 .3rem; }
	.rx-indicator--odometer .rx-indicator__marker { min-width: 1.25rem; height: 1.25rem; overflow: hidden; padding: 0 .3rem; font-variant-numeric: tabular-nums; }.rx-indicator__reels{display:flex;height:1em;overflow:hidden}.rx-indicator__reel,.rx-indicator__fixed{display:block;height:1em;overflow:hidden;font:inherit;font-style:normal;line-height:1}.rx-indicator__strip{display:flex;flex-direction:column;transition:transform var(--rx-indicator-roll) cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--rx-index)*35ms)}.rx-indicator__strip b{display:grid;flex:0 0 1em;height:1em;place-items:center;font:inherit}.rx-indicator__source-pulse{position:absolute;z-index:0;width:.7rem;height:.7rem;border-radius:999px;background:rgb(var(--rx-color));animation:rx-indicator-pulse 1.8s ease-out infinite}
	.rx-indicator--bounce .rx-indicator__marker{animation:rx-indicator-enter 420ms cubic-bezier(.34,1.56,.64,1),rx-indicator-bounce 1.2s ease-in-out infinite}.rx-indicator--shake .rx-indicator__marker{transform-origin:50% 100%;animation:rx-indicator-enter 420ms cubic-bezier(.34,1.56,.64,1),rx-indicator-shake 2.4s ease-in-out infinite}
	.rx-indicator--icon .rx-indicator__marker { width: 1.4rem; height: 1.4rem; }
	.rx-indicator--border { padding: 3px; border: 2px solid rgb(var(--rx-color)); border-radius: calc(var(--rx-radius) + 3px); }
	.rx-indicator--standalone { width: auto; min-width: .7rem; min-height: .7rem; }
	.rx-indicator--standalone .rx-indicator__marker { position: relative; inset: auto; transform: none; }
	:global(.dark) .rx-indicator[data-rx-color='success'], :global(.dark) .rx-indicator[data-rx-color='danger'], :global(.dark) .rx-indicator[data-rx-color='warn'] { --rx-indicator-foreground: var(--rx-background); }
	@keyframes rx-indicator-enter{from{opacity:0;filter:blur(7px);transform:scale(0)}to{opacity:1;filter:blur(0);transform:scale(1)}}@keyframes rx-indicator-pulse { 0%{opacity:.55;transform:scale(1)}70%,100%{opacity:0;transform:scale(2.1)} }@keyframes rx-indicator-ping{0%{opacity:.65;transform:scale(.9)}80%,100%{opacity:0;transform:scale(2.6)}}
	@keyframes rx-indicator-odometer { from { opacity: 0;filter:blur(6px);transform:translateY(-100%) scale(.35)}to{opacity:1;filter:blur(0);transform:none} }
	@keyframes rx-indicator-content-swap{from{opacity:0;filter:blur(6px);scale:.45}to{opacity:1;filter:blur(0);scale:1}}
	@keyframes rx-indicator-ring{to{transform:rotate(1turn)}}@keyframes rx-indicator-bounce{0%,100%{translate:0 0;scale:1.1 .9}30%{translate:0 -42%;scale:.94 1.08}55%{translate:0 0;scale:1.08 .92}70%{scale:.98 1.02}}@keyframes rx-indicator-shake{0%,21%,100%{rotate:0deg}3%{rotate:14deg}6%{rotate:-12deg}9%{rotate:10deg}12%{rotate:-8deg}15%{rotate:5deg}18%{rotate:-3deg}}
	@media (prefers-reduced-motion: reduce) { .rx-indicator__marker,.rx-indicator__marker::before,.rx-indicator__marker::after,.rx-indicator__reels i,.rx-indicator__source-pulse { animation: none!important;transition:none!important } }
</style>
