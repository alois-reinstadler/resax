import type { RxColor } from '../../lib/color';
export const RADIO_GROUP = Symbol('rx-radio-group');
export interface RadioGroupContext {
	color: () => RxColor | undefined;
	size: () => 'lg' | 'default' | 'sm';
	disabled: () => boolean;
}
