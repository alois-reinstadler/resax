import { tv, type VariantProps } from 'tailwind-variants';
import Avatar from './avatar.svelte';
import AvatarGroup from './avatar-group.svelte';

export const avatarVariants = tv({
	base: 'rx-avatar',
	variants: {
		size: { xl: 'rx-avatar--xl', lg: 'rx-avatar--lg', default: 'rx-avatar--default', sm: 'rx-avatar--sm', mini: 'rx-avatar--mini' },
		shape: { circle: 'rx-avatar--circle', square: 'rx-avatar--square', rounded: 'rx-avatar--rounded' },
		variant: { base: 'rx-avatar--base', glow: 'rx-avatar--glow', ring: 'rx-avatar--ring', squircle: 'rx-avatar--squircle', status: 'rx-avatar--status', tilt: 'rx-avatar--tilt' },
		history: { true: 'rx-avatar--history' }, loading: { true: 'rx-avatar--loading' }
	},
	defaultVariants: { size: 'default', shape: 'circle', variant: 'base' }
});
export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
export { Avatar, AvatarGroup };
export type { AvatarProps } from './avatar.svelte';
export type { AvatarGroupProps } from './avatar-group.svelte';
