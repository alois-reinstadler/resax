import { tv, type VariantProps } from 'tailwind-variants';
import Input from './input.svelte';

export const inputVariants = tv({
	base: 'rx-input',
	variants: {
		variant: { default: 'rx-input--default', shadow: 'rx-input--shadow', border: 'rx-input--border', filled: 'rx-input--filled', 'gradient-border': 'rx-input--gradient-border', pulse: 'rx-input--pulse', spotlight: 'rx-input--spotlight', underline: 'rx-input--underline' },
		size: { lg: 'rx-input--lg', default: 'rx-input--size-default', sm: 'rx-input--sm' },
		iconAfter: { true: 'rx-input--icon-after' }
	},
	defaultVariants: { variant: 'default', size: 'default' }
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
export { Input };
export type { InputProps } from './input.svelte';
