import { tv, type VariantProps } from 'tailwind-variants';
import Progress from './progress.svelte';

export const progressVariants = tv({
	base: 'rx-progress',
	variants: {
		variant: {
			default: 'rx-progress--default', glow: 'rx-progress--glow', gradient: 'rx-progress--gradient',
			striped: 'rx-progress--striped', segments: 'rx-progress--segments'
		},
		shape: { line: 'rx-progress--line', circle: 'rx-progress--circle' },
		size: { lg: 'rx-progress--lg', default: 'rx-progress--size-default', sm: 'rx-progress--sm' },
		indeterminate: { true: 'rx-progress--indeterminate' }
	},
	defaultVariants: { variant: 'default', shape: 'line', size: 'default' }
});

export type ProgressVariantProps = VariantProps<typeof progressVariants>;
export { Progress };
export type { ProgressProps } from './progress.svelte';
