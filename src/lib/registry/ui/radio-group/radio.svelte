<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RadioGroup as RadioGroupTypes } from 'bits-ui';
	export interface RadioProps extends Omit<RadioGroupTypes.ItemProps, 'value' | 'disabled' | 'children' | 'child'> {
		value: string; disabled?: boolean; children?: Snippet;
	}
</script>
<script lang="ts">
	import { getContext } from 'svelte';
	import { Label, RadioGroup as RadioGroupPrimitive, useId } from 'bits-ui';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_EASE_BOUNCE } from '$lib/registry/lib/easing';
	import { RADIO_GROUP, type RadioGroupContext } from './context';
	import { radioVariants } from './index';
	let { value, disabled = false, children, id = useId(), class: className, style, ...restProps }: RadioProps = $props();
	const context = getContext<RadioGroupContext>(RADIO_GROUP);
	const inactive = $derived(disabled || context?.disabled() || false);
	const classes = $derived(radioVariants({ size: context?.size() ?? 'default', class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(context?.color()) ?? ''}; --rx-bounce: ${RX_EASE_BOUNCE}; ${style ?? ''}`);
</script>
<span class="rx-radio-field" class:rx-radio-field--disabled={inactive}>
	<RadioGroupPrimitive.Item {...restProps} {id} {value} disabled={inactive} class={classes} style={inlineStyle}>
		<span class="rx-radio__dot" aria-hidden="true"></span>
	</RadioGroupPrimitive.Item>
	{#if children}<Label.Root for={id} class="rx-radio__label">{@render children()}</Label.Root>{/if}
</span>
<style>
	:global {
	.rx-radio-field { display: inline-flex; align-items: center; gap: .55rem; color: rgb(var(--rx-dark)); }
	.rx-radio-field--disabled { opacity: .55; }
	.rx-radio { display: inline-grid; flex: none; place-items: center; box-sizing: border-box; padding: 0; border: 2px solid rgb(var(--rx-color) / .48); border-radius: 9999px; background: transparent; cursor: pointer; transition: border-color var(--rx-duration) var(--rx-ease); }
	.rx-radio[data-state='checked'] { border-color: rgb(var(--rx-color)); }
	.rx-radio:focus-visible { outline: 3px solid rgb(var(--rx-color) / .25); outline-offset: 2px; }
	.rx-radio:disabled { cursor: not-allowed; }
	.rx-radio--lg { width: 1.55rem; height: 1.55rem; }
	.rx-radio--default { width: 1.3rem; height: 1.3rem; }
	.rx-radio--sm { width: 1.05rem; height: 1.05rem; }
	.rx-radio__dot { width: 52%; height: 52%; border-radius: inherit; background: rgb(var(--rx-color)); transform: scale(0); transition: transform var(--rx-duration) var(--rx-bounce); }
	.rx-radio[data-state='checked'] .rx-radio__dot { transform: scale(1); }
	.rx-radio__label { cursor: pointer; user-select: none; }
	.rx-radio-field--disabled .rx-radio__label { cursor: not-allowed; }
	@media (prefers-reduced-motion: reduce) { .rx-radio, .rx-radio__dot { transition-duration: 0ms; } }
	}
</style>
