import { describe, expect, it } from 'vitest';
import { RX_DURATION, RX_EASE, RX_EASE_BOUNCE, rxScale, rxSlideUp } from './easing';

describe('easing presets', () => {
	it('exports shared values and transitions', () => {
		expect(RX_EASE).toContain('cubic-bezier');
		expect(RX_EASE_BOUNCE).toContain('cubic-bezier');
		expect(RX_DURATION).toEqual({ fast: 150, base: 250, slow: 400 });
		expect(rxScale).toBeTypeOf('function');
		expect(rxSlideUp).toBeTypeOf('function');
	});
});
