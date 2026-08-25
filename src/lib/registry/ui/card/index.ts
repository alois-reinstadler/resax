import { tv, type VariantProps } from 'tailwind-variants';
import Card from './card.svelte';
export const cardVariants = tv({
	base: 'rx-card',
	variants: { variant: { default: 'rx-card--default', shadow: 'rx-card--shadow', border: 'rx-card--border', flat: 'rx-card--flat', reveal: 'rx-card--reveal', zoom: 'rx-card--zoom', asset: 'rx-card--asset', glow: 'rx-card--glow', 'gradient-border': 'rx-card--gradient-border', lift: 'rx-card--lift', slider: 'rx-card--slider', spotlight: 'rx-card--spotlight', 'tilt-3d': 'rx-card--tilt-3d' } },
	defaultVariants: { variant: 'default' }
});
export type CardVariantProps = VariantProps<typeof cardVariants>;
export { Card };
export type { CardProps } from './card.svelte';
