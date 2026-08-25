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
			transparent: 'rx-button--transparent',
			'border-draw': 'rx-button--border-draw',
			chrome: 'rx-button--chrome',
			glitch: 'rx-button--glitch',
			gooey: 'rx-button--gooey',
			invert: 'rx-button--invert',
			liquid: 'rx-button--liquid',
			magnetic: 'rx-button--magnetic',
			plasma: 'rx-button--plasma',
			push: 'rx-button--push',
			shine: 'rx-button--shine',
			v2: 'rx-button--v2'
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
