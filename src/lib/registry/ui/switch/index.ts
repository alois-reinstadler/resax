import { tv, type VariantProps } from 'tailwind-variants';
import Switch from './switch.svelte';

export const switchVariants = tv({
	base: 'rx-switch',
	variants: {
		size: { lg: 'rx-switch--lg', default: 'rx-switch--default', sm: 'rx-switch--sm' },
		shape: { pill: 'rx-switch--pill', square: 'rx-switch--square' }
	},
	defaultVariants: { size: 'default', shape: 'pill' }
});
export type SwitchVariantProps = VariantProps<typeof switchVariants>;
export { Switch };
export type { SwitchProps } from './switch.svelte';
