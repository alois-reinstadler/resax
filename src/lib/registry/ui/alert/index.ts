import { tv, type VariantProps } from 'tailwind-variants';
import Alert from './alert.svelte';

export const alertVariants = tv({
	base: 'rx-alert',
	variants: {
		variant: {
			default: 'rx-alert--default', banner: 'rx-alert--banner', inline: 'rx-alert--inline',
			neon: 'rx-alert--neon', split: 'rx-alert--split', toast: 'rx-alert--toast'
		},
		appearance: { soft: 'rx-alert--soft', solid: 'rx-alert--solid', outline: 'rx-alert--outline' },
		radius: { subtle: 'rx-alert--subtle', rounded: 'rx-alert--rounded', pill: 'rx-alert--pill' }
	},
	defaultVariants: { variant: 'default', appearance: 'soft', radius: 'rounded' }
});

export type AlertVariantProps = VariantProps<typeof alertVariants>;
export { Alert };
export type { AlertProps } from './alert.svelte';
