<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface InputProps extends Omit<HTMLInputAttributes, 'size' | 'value' | 'color'> {
		value?: string;
		variant?: 'default' | 'shadow' | 'border' | 'filled' | 'gradient-border' | 'pulse' | 'spotlight' | 'underline';
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: string;
		labelPlaceholder?: boolean;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		icon?: Snippet;
		iconAfter?: boolean;
		loading?: boolean;
		clearable?: boolean;
		onClear?: () => void;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { proximityGlow } from '$lib/registry/attachments/proximity-glow';
	import { pointerPosition } from '$lib/registry/attachments/pointer-position';
	import { ripple } from '$lib/registry/attachments/ripple';
	import { RX_DURATION, RX_EASE, rxSlideUp } from '$lib/registry/lib/easing';
	import { inputVariants } from './index';

	let {
		value = $bindable(''), variant = 'default', color, size = 'default', label,
		labelPlaceholder = false, state: validationState = 'default', message, icon, iconAfter = false,
		loading = false, clearable = false, onClear, type = 'text', id: suppliedId, class: className, style, disabled, readonly, ...restProps
	}: InputProps = $props();
	const uid = $props.id();
	let focused = $state(false);
	let reveal = $state(false);
	const inputId = $derived(suppliedId ?? `${uid}-control`);
	const messageId = $derived(`${inputId}-message`);
	const floated = $derived(focused || value.length > 0);
	const stateColor = $derived(validationState === 'default' ? color : validationState);
	const classes = $derived(inputVariants({ variant, size, iconAfter: iconAfter && !!icon, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(stateColor) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
	const attachGlow = $derived(proximityGlow({ radius: 200, disabled: () => !!disabled }));
	const attachPointer = $derived(pointerPosition({ disabled: () => !!disabled || variant !== 'spotlight', activeClass: 'rx-input--pointer-lit', focus: false }));
	const attachRipple = $derived(ripple({ disabled: () => !!disabled || !!readonly }));
	const inputType = $derived(type === 'password' && reveal ? 'text' : type);
	function press(node:HTMLElement){const reset=()=>node.style.removeProperty('transform');const down=(event:PointerEvent)=>{if(disabled||readonly||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const rect=node.getBoundingClientRect(),nx=Math.max(-1,Math.min(1,((event.clientX-rect.left)/(rect.width||1)-.5)*2)),ny=Math.max(-1,Math.min(1,((event.clientY-rect.top)/(rect.height||1)-.5)*2)),damping=1-.2*Math.min(Math.abs(nx),Math.abs(ny));node.style.transform=`perspective(600px) rotateX(${(-ny*5*damping).toFixed(2)}deg) rotateY(${(nx*8*damping).toFixed(2)}deg) scale(.985)`};node.addEventListener('pointerdown',down);node.addEventListener('pointerup',reset);node.addEventListener('pointerleave',reset);node.addEventListener('pointercancel',reset);return()=>{node.removeEventListener('pointerdown',down);node.removeEventListener('pointerup',reset);node.removeEventListener('pointerleave',reset);node.removeEventListener('pointercancel',reset);reset()}}
	function clear(){if(disabled||readonly)return;value='';onClear?.()}
</script>

<div class={classes} class:rx-input--focused={focused} class:rx-input--floated={floated} class:rx-input--label-placeholder={labelPlaceholder} class:rx-input--has-icon={!!icon} class:rx-input--loading={loading} style={inlineStyle}>
	<div class="rx-input__control" {@attach attachGlow} {@attach attachPointer} {@attach attachRipple} {@attach press}>
		<span class="rx-input__pointer-ring" aria-hidden="true"></span><span class="rx-input__spot" aria-hidden="true"></span><span class="rx-input__gradient-ring" aria-hidden="true"></span><span class="rx-input__ping" aria-hidden="true"></span>
		<fieldset class="rx-input__outline" aria-hidden="true"><legend><span>{label ?? ' '}</span></legend></fieldset>
		{#if icon}<span class="rx-input__icon" aria-hidden="true">{@render icon()}</span>{/if}
		<input
			{...restProps} id={inputId} bind:value {disabled} {readonly} type={inputType}
			aria-invalid={validationState === 'danger' ? 'true' : undefined}
			aria-describedby={validationState === 'danger' && message ? messageId : undefined}
			onfocus={() => focused = true} onblur={() => focused = false}
		/>
		{#if label}<label for={inputId}>{label}</label>{/if}
		{#if clearable && value && !disabled && !readonly}<button type="button" class="rx-input__action" aria-label="Clear" tabindex="-1" onclick={clear}>×</button>{/if}
		{#if type === 'password'}<button type="button" class="rx-input__action" aria-label={reveal ? 'Hide password' : 'Show password'} tabindex="-1" onclick={() => reveal = !reveal}>{reveal ? '◉' : '◎'}</button>{/if}
		{#if loading}<span class="rx-input__loader" aria-hidden="true"></span>{/if}
	</div>
	{#if message}
		<div id={messageId} class="rx-input__message" transition:rxSlideUp aria-live="polite">
			{#if typeof message === 'string'}{message}{:else}{@render message()}{/if}
		</div>
	{/if}
</div>

<style>
	.rx-input { display: inline-grid; gap: .3rem; width: 100%; color: rgb(var(--rx-text)); }
	.rx-input__control { position: relative; display: flex; align-items: center; border-radius: var(--rx-radius); background: rgb(var(--rx-surface-2)); transition: box-shadow var(--rx-duration) var(--rx-ease), background var(--rx-duration) var(--rx-ease); }
	.rx-input__outline{position:absolute;inset:0;z-index:0;min-inline-size:0;margin:0;padding:0 calc(.9rem - 5px);border:1px solid rgb(var(--rx-border));border-radius:inherit;pointer-events:none;transition:border-color 220ms cubic-bezier(.22,1,.36,1)}.rx-input__outline legend{display:block;width:auto;max-width:.01px;height:0;padding:0;font-size:.738rem;line-height:0;white-space:nowrap;visibility:hidden;transition:max-width 220ms cubic-bezier(.34,1.4,.5,1)}.rx-input__outline legend span{display:inline-block;padding:0 4px}.rx-input--floated .rx-input__outline legend{max-width:100%}.rx-input--focused .rx-input__outline{border-color:rgb(var(--rx-color))}
	.rx-input__control::after { content: ''; position: absolute; inset: auto 0 0; height: 2px; border-radius: 9999px; background: rgb(var(--rx-color)); transform: scaleX(0); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-input--focused .rx-input__control::after, .rx-input--border .rx-input__control::after { transform: scaleX(1); }
	.rx-input input { width: 100%; min-width: 0; border: 1px solid transparent; outline: 0; border-radius: inherit; background: transparent; color: inherit; font: inherit; padding: 1.05rem .9rem .42rem; }
	.rx-input input::placeholder { color: rgb(var(--rx-text-muted)); }
	.rx-input label { position: absolute; left: .9rem; top: 50%; color: rgb(var(--rx-text-secondary)); pointer-events: none; transform: translateY(-50%); transform-origin: left center; transition: transform var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease), top var(--rx-duration) var(--rx-ease); }
	.rx-input--floated label { top: .42rem; color: color-mix(in srgb, rgb(var(--rx-color)) 50%, rgb(var(--rx-text))); transform: translateY(0) scale(.72); }
	.rx-input--label-placeholder.rx-input--floated label { top: -.48rem; padding: 0 .25rem; background: rgb(var(--rx-surface)); }
	.rx-input--shadow .rx-input__control { box-shadow: 0 8px 22px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); }
	.rx-input--focused.rx-input--shadow .rx-input__control { box-shadow: 0 9px 24px rgb(var(--rx-color) / .2); }
	.rx-input--border .rx-input__control { background: transparent; }
	.rx-input--border input { border-color: rgb(var(--rx-border)); }
	.rx-input--border.rx-input--focused input { border-color: rgb(var(--rx-color)); }
	.rx-input--filled .rx-input__control { background: rgb(var(--rx-color) / .12); }
	.rx-input--gradient-border .rx-input__control { padding: 1px; background: linear-gradient(120deg, rgb(var(--rx-color)), rgb(var(--rx-color) / .18)); }
	.rx-input--gradient-border input { background: rgb(var(--rx-surface)); }
	.rx-input--pulse.rx-input--focused .rx-input__control { animation: rx-input-pulse .5s var(--rx-ease); }
	.rx-input--spotlight.rx-input--focused .rx-input__control { box-shadow: 0 0 0 4px rgb(var(--rx-color) / .12), 0 10px 28px rgb(var(--rx-color) / .16); }
	.rx-input--underline .rx-input__control { border-radius: 0; background: transparent; }
	.rx-input__icon { position: absolute; left: .85rem; z-index: 1; display: inline-flex; color: rgb(var(--rx-color)); }
	.rx-input--has-icon input { padding-left: 2.65rem; }
	.rx-input--has-icon label { left: 2.65rem; }
	.rx-input--icon-after .rx-input__icon { left: auto; right: .85rem; }
	.rx-input--icon-after input, .rx-input--loading input { padding-right: 2.65rem; }
	.rx-input--icon-after label { left: .9rem; }
	.rx-input__loader { position: absolute; right: .85rem; width: 1rem; height: 1rem; border: 2px solid rgb(var(--rx-color) / .3); border-top-color: rgb(var(--rx-color)); border-radius: 9999px; animation: rx-input-spin .7s linear infinite; }
	.rx-input__message { padding-left: .35rem; color: color-mix(in srgb, rgb(var(--rx-color)) 50%, rgb(var(--rx-text))); font-size: .76rem; line-height: 1.25; }
	.rx-input--lg input { min-height: 3.5rem; font-size: 1rem; }
	.rx-input--size-default input { min-height: 3rem; font-size: .9rem; }
	.rx-input--sm input { min-height: 2.5rem; font-size: .82rem; }
	.rx-input input:disabled { cursor: not-allowed; opacity: .55; }
	.rx-input__action{position:relative;z-index:3;display:grid;place-items:center;flex:none;width:26px;height:26px;margin-right:8px;padding:0;border:0;border-radius:50%;background:transparent;color:rgb(var(--rx-text-muted));cursor:pointer;font:inherit;transition:background-color 160ms,color 160ms,transform 160ms cubic-bezier(.34,1.56,.64,1)}.rx-input__action:hover{color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.1)}.rx-input__action:active{transform:scale(.86)}
	/* Source-literal field mechanics */
	.rx-input__control{border:0;transition:transform 260ms cubic-bezier(.34,1.56,.64,1),background-color 200ms cubic-bezier(.22,1,.36,1)}
	.rx-input label{transition:transform 240ms cubic-bezier(.34,1.4,.5,1),color 220ms cubic-bezier(.22,1,.36,1),top 240ms cubic-bezier(.34,1.4,.5,1)}
	.rx-input__pointer-ring{position:absolute;inset:-1px;z-index:2;border-radius:inherit;padding:1px;pointer-events:none;background:radial-gradient(60px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.42) 30%,rgb(var(--rx-color)/.16) 58%,transparent 82%),radial-gradient(200px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.27) 42%,rgb(var(--rx-color)/.08) 66%,transparent 85%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:calc(var(--rx-glow,0)*.63);transition:opacity 140ms}
	.rx-input__spot,.rx-input__gradient-ring,.rx-input__ping{display:none;position:absolute;inset:0;border-radius:inherit;pointer-events:none}.rx-input--spotlight .rx-input__spot{display:block;background:radial-gradient(150px circle at var(--rx-mx,50%) var(--rx-my,50%),rgb(var(--rx-color)/.16),transparent 60%);opacity:var(--rx-lit,0);transition:opacity 220ms}.rx-input--spotlight.rx-input--focused .rx-input__control{box-shadow:none}
	.rx-input--gradient-border .rx-input__control{padding:1px;background:rgb(var(--rx-surface));border-color:transparent}.rx-input--gradient-border .rx-input__gradient-ring{display:block;inset:-1px;padding:1.5px;background:conic-gradient(from var(--ring-angle,0deg),transparent 0deg,rgb(var(--rx-color)) 90deg,rgb(var(--rx-color)/.3) 180deg,rgb(var(--rx-color)) 300deg,transparent 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.7}.rx-input--gradient-border.rx-input--focused .rx-input__gradient-ring{animation:rx-input-ring 2.4s linear infinite}@keyframes rx-input-ring{to{transform:rotate(1turn)}}
	.rx-input--pulse.rx-input--focused .rx-input__ping{display:block;animation:rx-input-source-ping 620ms cubic-bezier(.22,1,.36,1)}@keyframes rx-input-source-ping{from{box-shadow:0 0 0 0 rgb(var(--rx-color)/.65);opacity:1;transform:scale(1)}to{box-shadow:0 0 0 8px rgb(var(--rx-color)/0);opacity:0;transform:scale(1.12)}}
	.rx-input--filled .rx-input__control{background:rgb(var(--rx-color)/.06)}.rx-input--filled .rx-input__control:hover{background:rgb(var(--rx-color)/.09)}.rx-input--filled.rx-input--focused .rx-input__control{background:rgb(var(--rx-color)/.11)}.rx-input--filled .rx-input__control::after,.rx-input--underline .rx-input__control::after{transform-origin:center;transition:transform 320ms cubic-bezier(.22,1,.36,1)}
	.rx-input--filled.rx-input--floated label,.rx-input--underline.rx-input--floated label{transform:translateY(calc(-50% - 20px)) scale(.8)}
	.rx-input--size-default input{min-height:2.5rem}.rx-input--sm input{min-height:2rem}
	@keyframes rx-input-spin { to { transform: rotate(1turn); } }
	@keyframes rx-input-pulse { 50% { box-shadow: 0 0 0 6px rgb(var(--rx-color) / .12); } }
	@media (prefers-reduced-motion: reduce) { .rx-input__control, .rx-input__control::after, .rx-input label,.rx-input__spot,.rx-input__pointer-ring { transition-duration: 0ms; } .rx-input__loader,.rx-input__gradient-ring,.rx-input__ping { animation-duration: 1ms; animation-iteration-count: 1; } }
</style>
