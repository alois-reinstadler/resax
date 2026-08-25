import type { RxColor } from '$lib/registry/lib/color';
export const RADIO_GROUP = Symbol('rx-radio-group');
export type RadioGroupVariant = 'base' | 'cards' | 'glow' | 'pill' | 'segment' | 'slide';
export interface RadioGroupContext {
	color: () => RxColor | undefined;
	size: () => 'lg' | 'default' | 'sm';
	disabled: () => boolean;
	variant: () => RadioGroupVariant;
}
