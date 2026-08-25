<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
		src?: string;
		alt?: string;
		fallback?: string;
		icon?: Snippet;
		color?: RxColor;
		size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
		shape?: 'circle' | 'square' | 'rounded';
		variant?: 'base' | 'glow' | 'ring' | 'squircle' | 'status' | 'tilt';
		badge?: string | number | boolean;
		badgeColor?: RxColor;
		status?: 'online' | 'idle' | 'dnd' | 'offline';
		statusPulse?: boolean;
		history?: boolean;
		loading?: boolean;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { styleColor } from '$lib/registry/lib/color';
	import { neighborLight } from '$lib/registry/attachments/neighbor-light';
	import { AVATAR_GROUP, type AvatarGroupContext } from './context';
	import { avatarVariants } from './index';

	let { src, alt = '', fallback, icon, color, size = 'default', shape = 'circle', variant = 'base', badge,
		badgeColor = 'danger', status = 'online', statusPulse = true, history = false, loading = false, children, class: className,
		style, ...restProps }: AvatarProps = $props();
	let imageFailed = $state(false);
	const group = getContext<AvatarGroupContext | undefined>(AVATAR_GROUP);
	const groupId = Symbol('avatar');
	const unregister = group?.register(groupId);
	onDestroy(() => unregister?.());
	const visible = $derived(group?.isVisible(groupId) ?? true);
	const groupExtra = $derived(group?.isExtra(groupId) ?? false);
	const classes = $derived(avatarVariants({ size, shape, variant, history, loading, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-gray)'}; ${style ?? ''}`);
	const badgeStyle = $derived(styleColor(badgeColor) ?? '--rx-color: var(--rx-danger)');
	const attachNeighbor = $derived(neighborLight({ disabled: () => variant !== 'base' }));

	function avatarEffects(node: HTMLDivElement) {
		let frame = 0;
		const proximity = (event: PointerEvent) => {
			if (variant !== 'base') return;
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const rect = node.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;
				const nearestX = Math.max(0, Math.min(rect.width, x));
				const nearestY = Math.max(0, Math.min(rect.height, y));
				const glow = Math.max(0, 1 - Math.hypot(x - nearestX, y - nearestY) / 220);
				node.style.setProperty('--gx', `${x}px`);
				node.style.setProperty('--gy', `${y}px`);
				node.style.setProperty('--glow', glow.toFixed(3));
			});
		};
		const tiltMove=(event:PointerEvent)=>{if(variant!=='tilt')return;const rect=node.getBoundingClientRect();const x=event.clientX-rect.left;const y=event.clientY-rect.top;node.style.setProperty('--gx',`${x}px`);node.style.setProperty('--gy',`${y}px`);node.style.setProperty('--tilt-x',`${((.5-y/rect.height)*18).toFixed(2)}deg`);node.style.setProperty('--tilt-y',`${((x/rect.width-.5)*18).toFixed(2)}deg`);node.dataset.active='true'};
		const leave = () => {
			node.style.setProperty('--glow', '0');
			node.style.setProperty('--tilt-x', '0deg');
			node.style.setProperty('--tilt-y', '0deg');
			if (variant === 'base') node.style.removeProperty('transform');
			delete node.dataset.active;
		};
		const down = (event: PointerEvent) => {
			if (variant !== 'base') return;
			const rect = node.getBoundingClientRect();
			const px = rect.width ? event.clientX - rect.left : rect.width / 2;
			const py = rect.height ? event.clientY - rect.top : rect.height / 2;
			const rotateX = rect.height ? Math.max(-14, Math.min(14, (.5 - py / rect.height) * 28)) : 0;
			const rotateY = rect.width ? Math.max(-10, Math.min(10, (px / rect.width - .5) * 20)) : 0;
			node.style.transform = `perspective(320px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(.94)`;
			const diameter = Math.hypot(rect.width, rect.height) * 2;
			const ripple = document.createElement('span');
			ripple.className = 'rx-avatar__ripple';
			ripple.style.cssText = `left:${event.clientX - rect.left}px;top:${event.clientY - rect.top}px;width:${diameter}px;height:${diameter}px`;
			node.querySelector('.rx-avatar__ripples')?.append(ripple);
			ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
		};
		const release = () => { if (variant === 'base') node.style.removeProperty('transform'); };
		window.addEventListener('pointermove', proximity, { passive: true });
		node.addEventListener('pointermove', tiltMove, { passive: true });
		node.addEventListener('pointerleave', leave, { passive: true });
		node.addEventListener('pointerdown', down, { passive: true });
		node.addEventListener('pointerup', release, { passive: true });
		node.addEventListener('pointercancel', release, { passive: true });
		return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', proximity); node.removeEventListener('pointermove', tiltMove); node.removeEventListener('pointerleave', leave); node.removeEventListener('pointerdown', down); node.removeEventListener('pointerup', release); node.removeEventListener('pointercancel', release); };
	}
</script>

{#if visible}
	<div {...restProps} class={classes} style={inlineStyle} data-rx-color={color ?? 'gray'} data-group-extra={groupExtra || undefined} data-flip-label={group?.flipLabel} aria-busy={loading ? 'true' : undefined} {@attach avatarEffects} {@attach attachNeighbor}>
		{#if variant === 'glow'}<span class="rx-avatar__halo" aria-hidden="true"></span>{/if}
		{#if variant === 'ring'}<span class="rx-avatar__ring" aria-hidden="true"></span>{/if}
		<div class="rx-avatar__content">
			{#if loading}
				<span class="rx-avatar__shimmer" aria-hidden="true"></span>
			{:else if children}
				{@render children()}
			{:else if src && !imageFailed}
				<img {src} {alt} onerror={() => imageFailed = true} />
			{:else if fallback}
				<span class="rx-avatar__fallback" aria-label={alt || undefined}>{fallback}</span>
			{:else if icon}
				<span class="rx-avatar__icon" role={alt ? 'img' : undefined} aria-label={alt || undefined}>{@render icon()}</span>
			{/if}
		</div>
		{#if variant === 'base'}<span class="rx-avatar__glow" aria-hidden="true"></span><span class="rx-avatar__ripples" aria-hidden="true"></span>{/if}
		{#if variant === 'tilt'}<span class="rx-avatar__glare" aria-hidden="true"></span>{/if}
		{#if variant === 'status'}<span class:rx-avatar__status--pulse={statusPulse && status === 'online'} class="rx-avatar__status rx-avatar__status--{status}" role="status" aria-label={status}></span>{/if}
		{#if badge !== undefined && badge !== false}
			<span class:rx-avatar__badge--dot={badge === true} class="rx-avatar__badge" style={badgeStyle} data-rx-color={badgeColor} role="status" aria-label={badge === true ? 'Status' : `${badge}`}>
				{badge === true ? '' : badge}
			</span>
		{/if}
	</div>
{/if}

<style>
	.rx-avatar { --rx-avatar-size: 3rem; --rx-avatar-foreground: var(--rx-text); position: relative; isolation:isolate; display: inline-grid; flex: 0 0 auto; box-sizing: border-box; width: var(--rx-avatar-size); height: var(--rx-avatar-size); color: rgb(var(--rx-avatar-foreground)); vertical-align: middle; transition:transform 240ms cubic-bezier(.34,1.56,.64,1); }
	.rx-avatar[data-rx-color='primary'], .rx-avatar[data-rx-color='dark'] { --rx-avatar-foreground: var(--rx-light); }
	.rx-avatar[data-rx-color='success'], .rx-avatar[data-rx-color='danger'], .rx-avatar[data-rx-color='warn'] { --rx-avatar-foreground: var(--rx-dark); }
	.rx-avatar__content { display: grid; width: 100%; height: 100%; place-items: center; overflow: hidden; border-radius: inherit; background: rgb(var(--rx-color)); font-weight: 700; line-height: 1; }
	.rx-avatar--base .rx-avatar__content,.rx-avatar--tilt .rx-avatar__content { z-index:1; }
	.rx-avatar--base{--lit-fill:var(--rx-neighbor-fill,none);--lit-ring:var(--rx-neighbor-ring,none);--lit:var(--rx-neighbor-lit,0)}.rx-avatar--base::before{content:'';position:absolute;inset:0;z-index:0;border-radius:inherit;pointer-events:none;background:var(--lit-fill);opacity:calc(var(--lit)*.3);transition:opacity 140ms}.rx-avatar--base::after{content:'';position:absolute;inset:-1px;z-index:1;border-radius:inherit;padding:1px;pointer-events:none;background:var(--lit-ring);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;opacity:var(--lit);transition:opacity 140ms}
	.rx-avatar img { width: 100%; height: 100%; object-fit: cover; }
	.rx-avatar__fallback, .rx-avatar__icon { display: grid; place-items: center; width: 100%; height: 100%; }
	.rx-avatar--xl { --rx-avatar-size: 5rem; font-size: 1.35rem; }
	.rx-avatar--lg { --rx-avatar-size: 4rem; font-size: 1.1rem; }
	.rx-avatar--default { --rx-avatar-size: 3rem; font-size: .9rem; }
	.rx-avatar--sm { --rx-avatar-size: 2.4rem; font-size: .75rem; }
	.rx-avatar--mini { --rx-avatar-size: 1.8rem; font-size: .62rem; }
	.rx-avatar--circle { border-radius: 9999px; }
	.rx-avatar--square { border-radius: 0; }
	.rx-avatar--rounded { border-radius: var(--rx-radius); }
	.rx-avatar--squircle { border-radius:28%; cursor:pointer; transition:transform 520ms linear(0, .009, .035, .078, .137, .211, .298, .396, .501, .609, .715, .815, .905, .981, 1.04, 1.083, 1.108, 1.117, 1.114, 1.1, 1.08, 1.057, 1.034, 1.014, .998, .987, .981, .979, .981, .985, .99, .995, .999, 1.001, 1.002, 1.001, 1); }
	.rx-avatar--squircle:hover { transform:scale(1.12) rotate(-2deg); }.rx-avatar--squircle:active { transform:scale(.96);transition-duration:160ms; }
	@supports(border-radius:38%){.rx-avatar--squircle,.rx-avatar--squircle .rx-avatar__content{border-radius:38%;}}
	.rx-avatar--history { padding: .18rem; background: conic-gradient(rgb(var(--rx-color)), hsl(from rgb(var(--rx-color)) calc(h + 80) s l), rgb(var(--rx-color))); }
	.rx-avatar--history .rx-avatar__content { box-shadow: inset 0 0 0 .15rem rgb(var(--rx-background)); }
	.rx-avatar__badge { --rx-badge-size: 1.35rem; --rx-badge-foreground: var(--rx-light); position: absolute; z-index: 2; right: -.25rem; bottom: -.15rem; display: grid; min-width: var(--rx-badge-size); height: var(--rx-badge-size); padding: 0 .3rem; place-items: center; box-sizing: border-box; border: .14rem solid rgb(var(--rx-background)); border-radius: 9999px; color: rgb(var(--rx-badge-foreground)); background: rgb(var(--rx-color)); font-size: .62em; font-weight: 800; }
	.rx-avatar__badge[data-rx-color='success'], .rx-avatar__badge[data-rx-color='danger'], .rx-avatar__badge[data-rx-color='warn'] { --rx-badge-foreground: var(--rx-dark); }
	.rx-avatar__badge[data-rx-color='dark'] { --rx-badge-foreground: var(--rx-background); }
	.rx-avatar__badge--dot { --rx-badge-size: .75rem; padding: 0; }
	.rx-avatar__shimmer { width: 100%; height: 100%; background: linear-gradient(100deg, rgb(var(--rx-color) / .55) 30%, rgb(var(--rx-light) / .55) 50%, rgb(var(--rx-color) / .55) 70%); background-size: 200% 100%; animation: rx-shimmer 1.4s linear infinite; }
	.rx-avatar__halo{position:absolute;inset:0;z-index:-1;border-radius:inherit;pointer-events:none;box-shadow:0 0 6px 1.8px rgb(var(--rx-color)/.35),0 0 12px 3.6px rgb(var(--rx-color)/.18);animation:rx-avatar-breathe 3s ease-in-out infinite}.rx-avatar--glow:hover .rx-avatar__halo{box-shadow:0 0 11px 3.3px rgb(var(--rx-color)/.45),0 0 22px 6.6px rgb(var(--rx-color)/.22);animation-duration:1.6s}
	.rx-avatar__ring{position:absolute;inset:-6px;z-index:-1;border-radius:inherit;background:conic-gradient(from var(--rx-avatar-angle),rgb(var(--rx-color)),hsl(from rgb(var(--rx-color)) h 80% 62%),rgb(var(--rx-color)),hsl(from rgb(var(--rx-color)) h 80% 62%),rgb(var(--rx-color)));animation:rx-avatar-ring 5s linear infinite}.rx-avatar--ring .rx-avatar__content{box-shadow:0 0 0 3px rgb(var(--rx-background))}.rx-avatar--ring:hover .rx-avatar__ring{animation-duration:2s}
	.rx-avatar__glow{position:absolute;inset:-3px;z-index:2;border-radius:inherit;padding:2px;pointer-events:none;background:radial-gradient(36px circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-color-ripple,255 255 255)/.6),rgb(var(--rx-color-ripple,255 255 255)/.42) 30%,rgb(var(--rx-color-ripple,255 255 255)/.16) 58%,transparent 82%),radial-gradient(130px circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-color-ripple,255 255 255)/.6),rgb(var(--rx-color-ripple,255 255 255)/.27) 42%,rgb(var(--rx-color-ripple,255 255 255)/.08) 66%,transparent 85%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;opacity:calc(var(--glow,0)*.75);transition:opacity 140ms}
	.rx-avatar__ripples{position:absolute;inset:0;z-index:3;border-radius:inherit;overflow:hidden;pointer-events:none}:global(.rx-avatar__ripple){position:absolute;border-radius:50%;transform:translate(-50%,-50%) scale(0);background:radial-gradient(circle,rgb(var(--rx-color-ripple,255 255 255)/.4),rgb(var(--rx-color-ripple,255 255 255)/.22) 24%,rgb(var(--rx-color-ripple,255 255 255)/.1) 44%,rgb(var(--rx-color-ripple,255 255 255)/.03) 60%,transparent 76%);animation:rx-avatar-ripple-scale 720ms cubic-bezier(.22,1,.36,1) forwards,rx-avatar-ripple-fade 720ms cubic-bezier(.25,.1,.25,1) forwards}
	.rx-avatar--tilt{perspective:340px;transform-style:preserve-3d;transform:rotateX(var(--tilt-x,0deg)) rotateY(var(--tilt-y,0deg));transition:transform 320ms cubic-bezier(.22,1,.36,1);cursor:pointer}.rx-avatar--tilt[data-active=true]{transition-duration:60ms}.rx-avatar__glare{position:absolute;inset:0;z-index:2;border-radius:inherit;pointer-events:none;opacity:0;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgb(var(--rx-light)/.5),rgb(var(--rx-light)/.14) 24%,transparent 52%);transition:opacity 220ms ease}.rx-avatar--tilt[data-active=true] .rx-avatar__glare{opacity:1}
	.rx-avatar__status{position:absolute;right:0;bottom:0;z-index:4;width:23%;height:23%;min-width:7px;min-height:7px;border-radius:50%;box-shadow:0 0 0 2px rgb(var(--rx-background));transform:translate(-8%,-8%)}.rx-avatar__status--online{background:rgb(var(--rx-success))}.rx-avatar__status--idle{background:rgb(var(--rx-warn))}.rx-avatar__status--dnd{background:rgb(var(--rx-danger))}.rx-avatar__status--offline{background:rgb(var(--rx-background));box-shadow:0 0 0 2px rgb(var(--rx-background)),inset 0 0 0 2.5px rgb(var(--rx-border))}.rx-avatar__status--pulse::after{content:'';position:absolute;inset:0;border-radius:inherit;background:inherit;z-index:-1;animation:rx-avatar-status 1.8s ease-out infinite}
	@keyframes rx-avatar-breathe{0%,100%{opacity:.55;transform:scale(.985)}50%{opacity:1;transform:scale(1.015)}}@keyframes rx-avatar-ring{to{--rx-avatar-angle:360deg;transform:rotate(1turn)}}@keyframes rx-avatar-ripple-scale{to{transform:translate(-50%,-50%) scale(1)}}@keyframes rx-avatar-ripple-fade{from{opacity:.85}to{opacity:0}}@keyframes rx-avatar-status{0%{transform:scale(1);opacity:.55}70%,100%{transform:scale(2.4);opacity:0}}
	:global(.dark) .rx-avatar[data-rx-color='success'], :global(.dark) .rx-avatar[data-rx-color='danger'], :global(.dark) .rx-avatar[data-rx-color='warn'] { --rx-avatar-foreground: var(--rx-background); }
	:global(.dark) .rx-avatar__badge[data-rx-color='success'], :global(.dark) .rx-avatar__badge[data-rx-color='danger'], :global(.dark) .rx-avatar__badge[data-rx-color='warn'] { --rx-badge-foreground: var(--rx-background); }
	@media (prefers-reduced-motion: reduce) { .rx-avatar__shimmer,.rx-avatar__halo,.rx-avatar__ring,.rx-avatar__status::after { animation: none; } .rx-avatar--squircle:hover,.rx-avatar--squircle:active,.rx-avatar--tilt{transform:none!important;transition:none}.rx-avatar__glare{display:none}:global(.rx-avatar__ripple){display:none} }
</style>
