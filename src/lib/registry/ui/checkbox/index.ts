import { tv, type VariantProps } from 'tailwind-variants';
import Checkbox from './checkbox.svelte';

export const checkboxVariants = tv({
	base: 'rx-checkbox',
	variants: {
		size: { lg: 'rx-checkbox--lg', default: 'rx-checkbox--default', sm: 'rx-checkbox--sm' },
		variant: { base: 'rx-checkbox--variant-base', bounce: 'rx-checkbox--variant-bounce', card: 'rx-checkbox--variant-card', fill: 'rx-checkbox--variant-fill', flip: 'rx-checkbox--variant-flip', neon: 'rx-checkbox--variant-neon' },
		radius: { none: 'rx-checkbox--radius-none', subtle: 'rx-checkbox--radius-subtle', rounded: 'rx-checkbox--radius-rounded', pill: 'rx-checkbox--radius-pill', squircle: 'rx-checkbox--radius-squircle' }
	},
	defaultVariants: { size: 'default', variant: 'base', radius: 'subtle' }
});

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;
export { Checkbox };
export type { CheckboxProps } from './checkbox.svelte';
