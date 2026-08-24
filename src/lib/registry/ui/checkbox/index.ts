import { tv, type VariantProps } from 'tailwind-variants';
import Checkbox from './checkbox.svelte';

export const checkboxVariants = tv({
	base: 'rx-checkbox',
	variants: {
		size: { lg: 'rx-checkbox--lg', default: 'rx-checkbox--default', sm: 'rx-checkbox--sm' }
	},
	defaultVariants: { size: 'default' }
});

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;
export { Checkbox };
export type { CheckboxProps } from './checkbox.svelte';
