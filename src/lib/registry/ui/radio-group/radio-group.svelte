<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RadioGroup as RadioGroupTypes } from 'bits-ui';
	import type { RxColor } from '$lib/registry/lib/color';
	export interface RadioGroupProps extends Omit<RadioGroupTypes.RootProps, 'value' | 'orientation' | 'disabled' | 'children' | 'child' | 'color' | 'onValueChange'> {
		value?: string; color?: RxColor; size?: 'lg' | 'default' | 'sm'; orientation?: 'vertical' | 'horizontal';
		disabled?: boolean; children: Snippet; onValueChange?: (value: string) => void;
	}
</script>
<script lang="ts">
	import { setContext } from 'svelte';
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';
	import { RADIO_GROUP, type RadioGroupContext } from './context';
	let { value = $bindable(''), color, size = 'default', orientation = 'vertical', disabled = false, children,
		onValueChange, class: className, style, ...restProps }: RadioGroupProps = $props();
	setContext<RadioGroupContext>(RADIO_GROUP, { color: () => color, size: () => size, disabled: () => disabled });
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
</script>
<RadioGroupPrimitive.Root {...restProps} bind:value {orientation} {disabled} {onValueChange}
	class={[`rx-radio-group rx-radio-group--${orientation}`, className]} style={inlineStyle}>
	{@render children()}
</RadioGroupPrimitive.Root>
<style>
	:global {
	.rx-radio-group { display: flex; gap: .8rem; }
	.rx-radio-group--vertical { flex-direction: column; align-items: flex-start; }
	.rx-radio-group--horizontal { flex-direction: row; flex-wrap: wrap; align-items: center; }
	}
</style>
