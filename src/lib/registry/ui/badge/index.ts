import { tv, type VariantProps } from 'tailwind-variants';
import Badge from './badge.svelte';

export const badgeVariants = tv({
	base: 'rx-badge__pill',
	variants: { variant: {
		default: 'rx-badge--default', glow: 'rx-badge--glow', gradient: 'rx-badge--gradient',
		pulse: 'rx-badge--pulse', shimmer: 'rx-badge--shimmer', stripes: 'rx-badge--stripes'
	}, dot: { true: 'rx-badge--dot' } },
	defaultVariants: { variant: 'default', dot: false }
});
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
export { Badge };
export type { BadgeProps } from './badge.svelte';
