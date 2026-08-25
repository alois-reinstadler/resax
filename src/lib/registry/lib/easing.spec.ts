import { describe, expect, it } from 'vitest';
import {
	RX_DURATION,
	RX_EASE,
	RX_EASE_BOUNCE,
	RX_EASE_OUT,
	RX_EASE_SPRING,
	RX_MECHANIC_DURATION,
	cubicBezier,
	rxEaseOut,
	rxEaseSpring,
	rxScale,
	rxSlideUp
} from './easing';

describe('source easing presets', () => {
	it('exports the exact shared source curves and duration scale', () => {
		expect(RX_EASE_OUT).toBe('cubic-bezier(0.22, 1, 0.36, 1)');
		expect(RX_EASE_SPRING).toBe('cubic-bezier(0.34, 1.56, 0.64, 1)');
		expect(RX_EASE).toBe(RX_EASE_OUT);
		expect(RX_EASE_BOUNCE).toBe(RX_EASE_SPRING);
		expect(RX_DURATION).toEqual({ fast: 200, mid: 260, base: 260, slow: 320 });
	});

	it('keeps source-mechanic timings distinct', () => {
		expect(RX_MECHANIC_DURATION).toMatchObject({
			buttonTransform: 240,
			magneticFollow: 300,
			magneticActive: 90,
			cardTiltFollow: 90,
			cardTiltReturn: 400,
			ripple: 780
		});
	});

	it('evaluates CSS cubic beziers as time-to-progress curves', () => {
		expect(cubicBezier(0, 0, 1, 1)(0.5)).toBeCloseTo(0.5, 6);
		expect(rxEaseOut(0)).toBe(0);
		expect(rxEaseOut(0.5)).toBeGreaterThan(0.8);
		expect(rxEaseSpring(0.5)).toBeGreaterThan(1);
		expect(rxEaseSpring(1)).toBe(1);
	});

	it('exports Svelte transition helpers', () => {
		expect(rxScale).toBeTypeOf('function');
		expect(rxSlideUp).toBeTypeOf('function');
	});
});
