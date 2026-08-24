import { tv, type VariantProps } from 'tailwind-variants';
import Button from './button.svelte';

export const buttonVariants = tv({
	base: 'rx-button',
	variants: {
		variant: {
			default: 'rx-button--default',
			flat: 'rx-button--flat',
			border: 'rx-button--border',
			gradient: 'rx-button--gradient',
			shadow: 'rx-button--shadow',
			relief: 'rx-button--relief',
			transparent: 'rx-button--transparent'
		},
		size: {
			xl: 'rx-button--xl',
			lg: 'rx-button--lg',
			default: 'rx-button--size-default',
			sm: 'rx-button--sm',
			mini: 'rx-button--mini'
		},
		shape: {
			default: 'rx-button--shape-default',
			circle: 'rx-button--circle',
			square: 'rx-button--square'
		},
		effect: {
			none: '',
			glow: 'rx-button--glow',
			pulse: 'rx-button--pulse'
		},
		block: { true: 'rx-button--block' },
		floating: { true: 'rx-button--floating' }
	},
	defaultVariants: { variant: 'default', size: 'default', shape: 'default', effect: 'none' }
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export { Button };
export type { ButtonProps } from './button.svelte';
