import { tv, type VariantProps } from 'tailwind-variants';
import Chip from './chip.svelte';
export const chipVariants = tv({
	base: 'rx-chip', variants: {
		variant: { default: 'rx-chip--default', flat: 'rx-chip--flat', border: 'rx-chip--border', bounce:'rx-chip--bounce',fill:'rx-chip--fill',glow:'rx-chip--glow',gradient: 'rx-chip--gradient',outline:'rx-chip--outline' },
		size: { lg: 'rx-chip--lg', default: 'rx-chip--size-default', sm: 'rx-chip--sm' }
	}, defaultVariants: { variant: 'default', size: 'default' }
});
export type ChipVariantProps = VariantProps<typeof chipVariants>;
export { Chip };
export type { ChipProps } from './chip.svelte';
