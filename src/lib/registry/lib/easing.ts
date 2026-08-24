import { fly, scale, type FlyParams, type ScaleParams, type TransitionConfig } from 'svelte/transition';

export const RX_EASE = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
export const RX_EASE_BOUNCE = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
export const RX_DURATION = { fast: 150, base: 250, slow: 400 } as const;

const ease = (t: number): number => 1 - Math.pow(1 - t, 3);

export function rxScale(node: Element, params: ScaleParams = {}): TransitionConfig {
	return scale(node, { duration: RX_DURATION.base, start: 0.96, easing: ease, ...params });
}

export function rxSlideUp(node: Element, params: FlyParams = {}): TransitionConfig {
	return fly(node, { duration: RX_DURATION.base, y: 12, easing: ease, ...params });
}
