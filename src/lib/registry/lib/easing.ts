import { fly, scale, type FlyParams, type ScaleParams, type TransitionConfig } from 'svelte/transition';

/** Source Vuesax motion curves. Keep the CSS strings and JS easings paired. */
export const RX_EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const RX_EASE_SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

/** Backwards-compatible names used by the first Resax components. */
export const RX_EASE = RX_EASE_OUT;
export const RX_EASE_BOUNCE = RX_EASE_SPRING;

export const RX_DURATION = {
	fast: 200,
	mid: 260,
	base: 260,
	slow: 320
} as const;

/** Timings whose identity belongs to a source mechanic rather than the shared scale. */
export const RX_MECHANIC_DURATION = {
	buttonTransform: 240,
	magneticFollow: 300,
	magneticActive: 90,
	cardBorder: 220,
	cardTiltFollow: 90,
	cardTiltReturn: 400,
	inputLabel: 240,
	inputLegend: 220,
	accordionChevron: 480,
	accordionPanel: 560,
	accordionBody: 520,
	ripple: 780
} as const;

/**
 * Resolve a CSS cubic-bezier at a given time. CSS easing curves map x (time) to
 * y (progress), so evaluating y(t) directly is incorrect for non-linear x.
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
	const sample = (t: number, a1: number, a2: number) => {
		const c = 3 * a1;
		const b = 3 * (a2 - a1) - c;
		const a = 1 - c - b;
		return ((a * t + b) * t + c) * t;
	};
	const slope = (t: number) => {
		const c = 3 * x1;
		const b = 3 * (x2 - x1) - c;
		const a = 1 - c - b;
		return (3 * a * t + 2 * b) * t + c;
	};

	return (time: number): number => {
		if (time <= 0 || time >= 1) return time;
		let parameter = time;
		for (let iteration = 0; iteration < 8; iteration += 1) {
			const error = sample(parameter, x1, x2) - time;
			const currentSlope = slope(parameter);
			if (Math.abs(error) < 1e-7 || Math.abs(currentSlope) < 1e-7) break;
			parameter -= error / currentSlope;
		}
		if (parameter < 0 || parameter > 1) {
			let low = 0;
			let high = 1;
			parameter = time;
			for (let iteration = 0; iteration < 12; iteration += 1) {
				if (sample(parameter, x1, x2) < time) low = parameter;
				else high = parameter;
				parameter = (low + high) / 2;
			}
		}
		return sample(parameter, y1, y2);
	};
}

export const rxEaseOut = cubicBezier(0.22, 1, 0.36, 1);
export const rxEaseSpring = cubicBezier(0.34, 1.56, 0.64, 1);

export function rxScale(node: Element, params: ScaleParams = {}): TransitionConfig {
	return scale(node, { duration: RX_DURATION.mid, start: 0.96, easing: rxEaseSpring, ...params });
}

export function rxSlideUp(node: Element, params: FlyParams = {}): TransitionConfig {
	return fly(node, { duration: RX_DURATION.mid, y: 12, easing: rxEaseOut, ...params });
}
