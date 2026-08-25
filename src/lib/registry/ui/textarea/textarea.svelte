<script lang="ts" module>
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface TextareaProps extends Omit<HTMLTextareaAttributes, 'value' | 'color'> {
		value?: string;
		variant?: 'default' | 'shadow' | 'border' | 'filled' | 'gradient-border' | 'pulse' | 'spotlight' | 'underline' | 'code';
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		label?: string;
		labelPlaceholder?: boolean;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		autoResize?: boolean;
		resize?: 'none' | 'vertical' | 'horizontal' | 'both';
		clearable?: boolean;
		labelMaxChars?: number;
		block?: boolean;
		glow?: boolean;
		onClear?: () => void;
	}
</script>

<script lang="ts">
	import { styleColor } from '$lib/registry/lib/color';
	import { proximityGlow } from '$lib/registry/attachments/proximity-glow';
	import { pointerPosition } from '$lib/registry/attachments/pointer-position';
	import { ripple } from '$lib/registry/attachments/ripple';
	import { RX_DURATION, RX_EASE, rxSlideUp } from '$lib/registry/lib/easing';

	let { value = $bindable(''), variant = 'default', color, size = 'default', label, labelPlaceholder = false,
		state: validationState = 'default', message, autoResize = false, resize: resizeMode = 'vertical', clearable = false, labelMaxChars = 28, block = false, glow = true, onClear,
		maxlength, id: suppliedId, class: className, style, disabled, readonly, ...restProps }: TextareaProps = $props();
	const uid = $props.id();
	let focused = $state(false);
	const inputId = $derived(suppliedId ?? `${uid}-control`);
	const messageId = $derived(`${inputId}-message`);
	const floated = $derived(focused || value.length > 0);
	const displayLabel = $derived(label && floated && labelMaxChars > 0 && label.length > labelMaxChars ? `${label.slice(0, labelMaxChars).trimEnd()}…` : label);
	const stateColor = $derived(validationState === 'default' ? color : validationState);
	const inlineStyle = $derived(`${styleColor(stateColor) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
	const rootClass = $derived(['rx-textarea', `rx-textarea--${variant}`, `rx-textarea--${size === 'default' ? 'size-default' : size}`, `rx-textarea--resize-${autoResize ? 'none' : resizeMode}`, block && 'rx-textarea--block', className].filter(Boolean).join(' '));
	const attachGlow = $derived(proximityGlow({ radius: 240, disabled: () => !!disabled || !!readonly || !glow || focused }));
	const attachPointer = $derived(pointerPosition({ disabled: () => !!disabled || variant !== 'spotlight', activeClass: 'rx-textarea--pointer-lit', focus: false }));
	const attachRipple = $derived(ripple({ disabled: () => !!disabled || !!readonly }));

	function labelMask(node: HTMLElement) {
		let frame = 0;
		const update = () => { frame = 0; const target = node.querySelector<HTMLElement>('label'); if (!target || !floated) { for (const key of ['--lmx','--lmy','--lmw','--lmh']) node.style.setProperty(key, '0px'); return; } const labelRect=target.getBoundingClientRect(),fieldRect=node.getBoundingClientRect(),gap=3;node.style.setProperty('--lmx',`${labelRect.left-fieldRect.left-gap}px`);node.style.setProperty('--lmy',`${labelRect.top-fieldRect.top-gap}px`);node.style.setProperty('--lmw',`${labelRect.width+gap*2}px`);node.style.setProperty('--lmh',`${labelRect.height+gap*2}px`); };
		const schedule = () => { if (!frame) frame=requestAnimationFrame(update); };
		const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule); resizeObserver?.observe(node);
		const mutationObserver = new MutationObserver(schedule); mutationObserver.observe(node.parentElement ?? node,{attributes:true,attributeFilter:['class'],subtree:false}); schedule();
		return () => { if(frame)cancelAnimationFrame(frame);resizeObserver?.disconnect();mutationObserver.disconnect(); };
	}

	function resize(node: HTMLTextAreaElement) {
		const update = () => {
			if (!autoResize) return;
			node.style.height = 'auto';
			node.style.height = `${node.scrollHeight}px`;
		};
		update();
		node.addEventListener('input', update);
		return () => node.removeEventListener('input', update);
	}
	function clear() { if (disabled || readonly) return; value=''; onClear?.(); }
</script>

<div class={rootClass} class:rx-textarea--focused={focused} class:rx-textarea--floated={floated} class:rx-textarea--label-placeholder={labelPlaceholder} style={inlineStyle}>
	<div class="rx-textarea__control" {@attach attachGlow} {@attach attachPointer} {@attach attachRipple} {@attach labelMask}>
		<span class="rx-textarea__pointer-ring" aria-hidden="true"></span><span class="rx-textarea__spot" aria-hidden="true"></span><span class="rx-textarea__gradient-ring" aria-hidden="true"></span>
		<fieldset class="rx-textarea__outline" aria-hidden="true"><legend><span>{displayLabel ?? ' '}</span></legend></fieldset>
		<textarea {...restProps} id={inputId} bind:value {disabled} {readonly} {maxlength} aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined} onfocus={() => focused = true} onblur={() => focused = false} {@attach resize}></textarea>
		{#if label}<label for={inputId} title={label}>{displayLabel}</label>{/if}
		{#if clearable && value && !disabled && !readonly}<button type="button" class="rx-textarea__clear" tabindex="-1" aria-label="Clear" onclick={clear}>×</button>{/if}
	</div>
	{#if message || maxlength}
		<div class="rx-textarea__meta" transition:rxSlideUp>
			{#if message}<div id={messageId} class="rx-textarea__message" aria-live="polite">{#if typeof message === 'string'}{message}{:else}{@render message()}{/if}</div>{/if}
			{#if maxlength}<span class="rx-textarea__counter" aria-label="character count">{value.length}/{maxlength}</span>{/if}
		</div>
	{/if}
</div>

<style>
	.rx-textarea { display: inline-grid; gap: .3rem; width: 100%; color: rgb(var(--rx-text)); }
	.rx-textarea--block{display:grid;width:100%;min-width:0}
	.rx-textarea__control { position: relative; border-radius: var(--rx-radius); background: rgb(var(--rx-surface-2)); transition: box-shadow var(--rx-duration) var(--rx-ease); }
	.rx-textarea__outline{position:absolute;inset:0;z-index:0;min-inline-size:0;margin:0;padding:0 calc(.9rem - 5px);border:1px solid rgb(var(--rx-border));border-radius:inherit;pointer-events:none;transition:border-color 220ms cubic-bezier(.22,1,.36,1)}.rx-textarea__outline legend{display:block;width:auto;max-width:.01px;height:0;padding:0;font-size:calc(.9rem * .82);line-height:0;white-space:nowrap;visibility:hidden;transition:max-width 220ms cubic-bezier(.34,1.4,.5,1)}.rx-textarea__outline legend span{display:inline-block;padding:0 4px}.rx-textarea--floated .rx-textarea__outline legend{max-width:100%}.rx-textarea__control:hover .rx-textarea__outline{border-color:rgb(var(--rx-gray-4))}.rx-textarea--focused .rx-textarea__outline{border-color:rgb(var(--rx-color))}
	.rx-textarea__control::after { content: ''; position: absolute; inset: auto 0 0; height: 2px; background: rgb(var(--rx-color)); transform: scaleX(0); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-textarea--focused .rx-textarea__control::after, .rx-textarea--border .rx-textarea__control::after { transform: scaleX(1); }
	.rx-textarea textarea { box-sizing: border-box; display: block; width: 100%; min-height: 6rem; resize: vertical; border: 1px solid transparent; border-radius: inherit; outline: 0; padding: 1.35rem .9rem .65rem; background: transparent; color: inherit; font: inherit; }
	.rx-textarea textarea::placeholder { color: rgb(var(--rx-text-muted)); }
	.rx-textarea label { position: absolute; top: 1.05rem; left: .9rem; color: rgb(var(--rx-text-secondary)); pointer-events: none; transform-origin: left; transition: transform var(--rx-duration) var(--rx-ease), top var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease); }
	.rx-textarea--floated label { top: .38rem; color: color-mix(in srgb, rgb(var(--rx-color)) 50%, rgb(var(--rx-text))); transform: scale(.82); white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
	.rx-textarea--label-placeholder.rx-textarea--floated label { top: -.5rem; padding: 0 .25rem; background: rgb(var(--rx-surface)); }
	.rx-textarea--shadow .rx-textarea__control { box-shadow: 0 8px 22px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); }
	.rx-textarea--border .rx-textarea__control { background: transparent; }
	.rx-textarea--border textarea { border-color: rgb(var(--rx-border)); }
	.rx-textarea--border.rx-textarea--focused textarea { border-color: rgb(var(--rx-color)); }
	.rx-textarea--filled .rx-textarea__control { background: rgb(var(--rx-color) / .12); }
	.rx-textarea--gradient-border .rx-textarea__control { padding: 1px; background: linear-gradient(120deg, rgb(var(--rx-color)), rgb(var(--rx-color) / .18)); }
	.rx-textarea--gradient-border textarea { background: rgb(var(--rx-surface)); }
	.rx-textarea--pulse.rx-textarea--focused .rx-textarea__control { animation: rx-textarea-pulse .5s var(--rx-ease); }
	.rx-textarea--spotlight.rx-textarea--focused .rx-textarea__control { box-shadow: 0 0 0 4px rgb(var(--rx-color) / .12), 0 10px 28px rgb(var(--rx-color) / .16); }
	.rx-textarea--underline .rx-textarea__control { border-radius: 0; background: transparent; }
	.rx-textarea--code textarea { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; tab-size: 2; }
	.rx-textarea__meta { display: flex; justify-content: space-between; gap: 1rem; padding: 0 .35rem; color: color-mix(in srgb, rgb(var(--rx-color)) 50%, rgb(var(--rx-text))); font-size: .76rem; }
	.rx-textarea__clear{position:absolute;z-index:3;top:8px;right:8px;display:grid;place-items:center;width:26px;height:26px;padding:0;border:0;border-radius:50%;background:transparent;color:rgb(var(--rx-text-muted));cursor:pointer;font:inherit;transition:background-color 160ms,color 160ms,transform 160ms cubic-bezier(.34,1.56,.64,1)}.rx-textarea__clear:hover{color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.1)}.rx-textarea__clear:active{transform:scale(.86)}
	.rx-textarea--resize-none textarea{resize:none}.rx-textarea--resize-horizontal textarea{resize:horizontal}.rx-textarea--resize-both textarea{resize:both}.rx-textarea--resize-vertical textarea{resize:vertical}
	.rx-textarea__counter { margin-left: auto; color: rgb(var(--rx-text-secondary)); }
	.rx-textarea--lg textarea { min-height: 8rem; font-size: 1rem; }
	.rx-textarea--sm textarea { min-height: 4.5rem; font-size: .82rem; }
	.rx-textarea textarea:disabled { cursor: not-allowed; opacity: .55; }
	.rx-textarea__control{border:0;transition:background-color 220ms ease,box-shadow 200ms}.rx-textarea__control:hover{background:rgb(var(--rx-light)/.05)}.rx-textarea label{transition:transform 240ms cubic-bezier(.34,1.4,.5,1),top 240ms cubic-bezier(.34,1.4,.5,1),color 220ms}
	.rx-textarea__pointer-ring{position:absolute;inset:-1px;z-index:2;border-radius:inherit;padding:1px;pointer-events:none;background:radial-gradient(60px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.42) 30%,rgb(var(--rx-color)/.16) 58%,transparent 82%),radial-gradient(200px circle at var(--rx-gx,50%) var(--rx-gy,50%),rgb(var(--rx-color)/.6),rgb(var(--rx-color)/.27) 42%,rgb(var(--rx-color)/.08) 66%,transparent 85%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0),linear-gradient(#000 0 0);-webkit-mask-position:0 0,0 0,var(--lmx,0) var(--lmy,0);-webkit-mask-size:auto,auto,var(--lmw,0) var(--lmh,0);-webkit-mask-repeat:no-repeat;-webkit-mask-composite:xor,source-out;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0),linear-gradient(#000 0 0);mask-position:0 0,0 0,var(--lmx,0) var(--lmy,0);mask-size:auto,auto,var(--lmw,0) var(--lmh,0);mask-repeat:no-repeat;mask-composite:exclude,subtract;opacity:calc(var(--rx-glow,0)*.63);transition:opacity 140ms}.rx-textarea--focused .rx-textarea__pointer-ring{opacity:0}
	.rx-textarea__spot,.rx-textarea__gradient-ring{display:none;position:absolute;inset:0;border-radius:inherit;pointer-events:none}.rx-textarea--spotlight .rx-textarea__spot{display:block;background:radial-gradient(220px circle at var(--rx-mx,50%) var(--rx-my,50%),color-mix(in srgb,rgb(var(--rx-color)) 28%,transparent),transparent 60%);opacity:var(--rx-lit,0);transition:opacity 260ms}.rx-textarea--spotlight.rx-textarea--focused .rx-textarea__control{box-shadow:none}
	.rx-textarea--gradient-border .rx-textarea__control{padding:1px;background:rgb(var(--rx-surface));border-color:transparent}.rx-textarea--gradient-border .rx-textarea__gradient-ring{display:block;inset:-1px;padding:1.5px;background:conic-gradient(from var(--ring-angle,0deg),rgb(var(--rx-color)),transparent,rgb(var(--rx-color)),transparent,rgb(var(--rx-color)));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.7;animation:rx-textarea-ring 3.5s linear infinite}@keyframes rx-textarea-ring{to{transform:rotate(1turn)}}
	.rx-textarea--filled .rx-textarea__control{background:rgb(var(--rx-color)/.06)}.rx-textarea--filled .rx-textarea__control:hover{background:rgb(var(--rx-color)/.09)}.rx-textarea--filled.rx-textarea--focused .rx-textarea__control{background:rgb(var(--rx-color)/.11)}.rx-textarea--filled .rx-textarea__control::after,.rx-textarea--underline .rx-textarea__control::after{transition:transform 320ms cubic-bezier(.22,1,.36,1);transform-origin:center}.rx-textarea--code .rx-textarea__control{background:rgb(var(--rx-gray-1))}.rx-textarea--code.rx-textarea--focused .rx-textarea__control{box-shadow:0 0 0 3px rgb(var(--rx-color)/.12)}
	.rx-textarea--filled.rx-textarea--floated label{top:1.05rem;transform:translateY(-16px) scale(.78)}.rx-textarea--underline.rx-textarea--floated label{top:1.05rem;transform:translateY(calc(-1em - 4px)) scale(.82)}
	@keyframes rx-textarea-pulse { 50% { box-shadow: 0 0 0 6px rgb(var(--rx-color) / .12); } }
	@media (prefers-reduced-motion: reduce) { .rx-textarea__control, .rx-textarea__control::after, .rx-textarea label,.rx-textarea__spot,.rx-textarea__pointer-ring { transition-duration: 0ms; animation: none; }.rx-textarea__gradient-ring{animation:none} }
</style>
