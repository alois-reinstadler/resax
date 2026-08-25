import { tv, type VariantProps } from 'tailwind-variants';
import RadioGroup from './radio-group.svelte';
import Radio from './radio.svelte';

export const radioVariants = tv({
	base: 'rx-radio',
	variants: {
		size: { lg: 'rx-radio--lg', default: 'rx-radio--default', sm: 'rx-radio--sm' },
		variant: { base: 'rx-radio--variant-base', bounce: 'rx-radio--variant-bounce', card: 'rx-radio--variant-card', fill: 'rx-radio--variant-fill', glow: 'rx-radio--variant-glow', ring: 'rx-radio--variant-ring' }
	},
	defaultVariants: { size: 'default', variant: 'base' }
});
export type RadioVariantProps = VariantProps<typeof radioVariants>;
export { RadioGroup, Radio };
export type { RadioGroupProps } from './radio-group.svelte';
export type { RadioProps, RadioVariant } from './radio.svelte';
export type { RadioGroupVariant } from './context';
