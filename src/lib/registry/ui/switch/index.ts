import { tv, type VariantProps } from 'tailwind-variants';
import Switch from './switch.svelte';

export const switchVariants = tv({
	base: 'rx-switch',
	variants: {
		size: { lg: 'rx-switch--lg', default: 'rx-switch--default', sm: 'rx-switch--sm' },
		shape: { pill: 'rx-switch--pill', rounded: 'rx-switch--rounded', square: 'rx-switch--square' },
		variant: { base: 'rx-switch--variant-base', 'day-night': 'rx-switch--variant-day-night', dot: 'rx-switch--variant-dot', glow: 'rx-switch--variant-glow', label: 'rx-switch--variant-label', liquid: 'rx-switch--variant-liquid', material: 'rx-switch--variant-material' }
	},
	defaultVariants: { size: 'default', shape: 'pill', variant: 'base' }
});
export type SwitchVariantProps = VariantProps<typeof switchVariants>;
export { Switch };
export type { SwitchProps } from './switch.svelte';
