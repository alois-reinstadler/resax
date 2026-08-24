import { tv, type VariantProps } from 'tailwind-variants';
import Indicator from './indicator.svelte';

export const indicatorVariants = tv({
	base: 'rx-indicator',
	variants: {
		variant: { dot: 'rx-indicator--dot', ring: 'rx-indicator--ring', pulse: 'rx-indicator--pulse', count: 'rx-indicator--count', icon: 'rx-indicator--icon', border: 'rx-indicator--border' },
		position: { 'top-right': 'rx-indicator--top-right', 'top-left': 'rx-indicator--top-left', 'bottom-right': 'rx-indicator--bottom-right', 'bottom-left': 'rx-indicator--bottom-left' },
		offset: { true: 'rx-indicator--offset' },
		standalone: { true: 'rx-indicator--standalone' }
	},
	defaultVariants: { variant: 'dot', position: 'top-right' }
});

export type IndicatorVariantProps = VariantProps<typeof indicatorVariants>;
export { Indicator };
export type { IndicatorProps } from './indicator.svelte';
