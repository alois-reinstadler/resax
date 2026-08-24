<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { Checkbox as CheckboxTypes } from 'bits-ui';
	import type { RxColor } from '../../lib/color';

	export interface CheckboxProps extends Omit<CheckboxTypes.RootProps, 'checked' | 'indeterminate' | 'disabled' | 'children' | 'child' | 'color' | 'onCheckedChange'> {
		checked?: boolean;
		indeterminate?: boolean;
		color?: RxColor;
		size?: 'lg' | 'default' | 'sm';
		lineThrough?: boolean;
		disabled?: boolean;
		children?: Snippet;
		onCheckedChange?: (checked: boolean) => void;
	}
</script>

<script lang="ts">
	import { Checkbox as CheckboxPrimitive, Label, useId } from 'bits-ui';
	import { styleColor } from '../../lib/color';
	import { RX_DURATION, RX_EASE } from '../../lib/easing';
	import { checkboxVariants } from './index';

	let { checked = $bindable(false), indeterminate = $bindable(false), color, size = 'default', lineThrough = false,
		disabled = false, children, onCheckedChange, id = useId(), class: className, style, ...restProps }: CheckboxProps = $props();
	const classes = $derived(checkboxVariants({ size, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
</script>

<span class="rx-checkbox-field" class:rx-checkbox-field--struck={lineThrough && checked} class:rx-checkbox-field--disabled={disabled}>
	<CheckboxPrimitive.Root {...restProps} {id} bind:checked bind:indeterminate {disabled} {onCheckedChange} class={classes} style={inlineStyle}>
		{#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
			<svg class="rx-checkbox__mark" viewBox="0 0 20 20" aria-hidden="true">
				{#if isIndeterminate}<path class="rx-checkbox__dash" d="M5 10h10" />
				{:else}<path class:rx-checkbox__path--drawn={isChecked} class="rx-checkbox__path" d="m4.5 10 3.5 3.5 7.5-8" />{/if}
			</svg>
		{/snippet}
	</CheckboxPrimitive.Root>
	{#if children}<Label.Root for={id} class="rx-checkbox__label">{@render children()}</Label.Root>{/if}
</span>

<style>
	:global {
	.rx-checkbox-field { display: inline-flex; align-items: center; gap: .55rem; color: rgb(var(--rx-dark)); }
	.rx-checkbox-field--disabled { opacity: .55; }
	.rx-checkbox { display: inline-flex; flex: none; align-items: center; justify-content: center; box-sizing: border-box; padding: 0; border: 2px solid rgb(var(--rx-color) / .45); border-radius: .38em; color: rgb(var(--rx-light)); background: transparent; cursor: pointer; transition: background var(--rx-duration) var(--rx-ease), border-color var(--rx-duration) var(--rx-ease), transform var(--rx-duration) var(--rx-ease); }
	.rx-checkbox[data-state='checked'], .rx-checkbox[data-state='indeterminate'] { border-color: rgb(var(--rx-color)); background: rgb(var(--rx-color)); }
	.rx-checkbox:focus-visible { outline: 3px solid rgb(var(--rx-color) / .25); outline-offset: 2px; }
	.rx-checkbox:active:not(:disabled) { transform: scale(.94); }
	.rx-checkbox:disabled { cursor: not-allowed; }
	.rx-checkbox--lg { width: 1.55rem; height: 1.55rem; }
	.rx-checkbox--default { width: 1.3rem; height: 1.3rem; }
	.rx-checkbox--sm { width: 1.05rem; height: 1.05rem; }
	.rx-checkbox__mark { width: 82%; height: 82%; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
	.rx-checkbox__path { stroke-dasharray: 18; stroke-dashoffset: 18; transition: stroke-dashoffset var(--rx-duration) var(--rx-ease); }
	.rx-checkbox__path--drawn { stroke-dashoffset: 0; }
	.rx-checkbox__label { cursor: pointer; user-select: none; transition: text-decoration-color var(--rx-duration) var(--rx-ease), opacity var(--rx-duration) var(--rx-ease); }
	.rx-checkbox-field--struck .rx-checkbox__label { text-decoration: line-through 2px rgb(var(--rx-color)); }
	.rx-checkbox-field--disabled .rx-checkbox__label { cursor: not-allowed; }
	@media (prefers-reduced-motion: reduce) { .rx-checkbox, .rx-checkbox__path, .rx-checkbox__label { transition-duration: 0ms; } }
	}
</style>
