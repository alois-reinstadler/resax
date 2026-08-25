import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Slider from './slider.svelte';
import source from './slider.svelte?raw';

describe('Slider source variants', () => {
	it.each(['base','fluent','glow','gradient','ripple','stepped','stops','ticks'] as const)('renders the %s anatomy', (variant) => {
		const { container } = render(Slider, { variant, value: [50], step: 10 });
		expect(container.querySelector(`[data-variant="${variant}"]`)).toBeTruthy();
		if (variant === 'glow') expect(container.querySelector('.rx-slider__range-halo')).toBeTruthy();
		if (variant === 'stops') expect(container.querySelectorAll('.rx-slider__labels button')).toHaveLength(3);
		if (variant === 'ticks') expect(container.querySelectorAll('.rx-slider__tick')).toHaveLength(11);
	});

	it('snaps with keyboard and emits its additive array API', async () => {
		const changed = vi.fn(); const { container } = render(Slider, { variant: 'stepped', value: [40], step: 10, onValueChange: changed });
		await fireEvent.keyDown(container.querySelector('[data-slider-thumb]')!, { key: 'ArrowRight' });
		expect(changed).toHaveBeenCalledWith([50]);
		expect(container.querySelector('.rx-slider__snap')).toBeTruthy();
	});

	it('named stop buttons select exact values', async () => {
		const changed = vi.fn(); render(Slider, { variant: 'stops', value: [0], onValueChange: changed, stops: [{label:'Low',value:0},{label:'High',value:100}] });
		await fireEvent.click(screen.getByRole('button', { name: 'High' }));
		expect(changed).toHaveBeenLastCalledWith([100]);
	});
	it('uses the source spring slider semantics and Fluent dynamic dot mask', async () => {
		const changed = vi.fn(); const stops = render(Slider, { variant: 'stops', value: [0], onValueChange: changed });
		await fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
		expect(changed).toHaveBeenLastCalledWith([50]);
		stops.unmount();
		const fluent = render(Slider, { variant: 'fluent', dots: true, value: [40] });
		expect(fluent.container.querySelector('.rx-slider__fluent-dots')).toBeTruthy();
		expect(fluent.container.querySelectorAll('.rx-slider__fluent-dots i').length).toBeGreaterThan(1);
	});
	it('keeps Bits range/thumb styling global and defines reduced-motion fallbacks', () => {
		expect(source).toContain(':global(.rx-slider__range)');
		expect(source).toContain(':global(.rx-slider__thumb)');
		expect(source).toContain('@media (prefers-reduced-motion: reduce)');
		expect(source).toContain('.rx-slider__range-halo, .rx-slider__wave, .rx-slider__snap { display: none; }');
	});
});
