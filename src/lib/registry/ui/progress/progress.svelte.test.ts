import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Progress from './progress.svelte';

describe('Progress', () => {
	it('exposes determinate aria values and clamps to max', () => {
		const { rerender } = render(Progress, { value: 120, max: 80 });
		expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('80');
		expect(screen.getByRole('progressbar').getAttribute('aria-valuemin')).toBe('0');
		expect(screen.getByRole('progressbar').getAttribute('aria-valuemax')).toBe('80');
		rerender({ value: -10, max: 80 });
		expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0');
	});

	it('omits aria-valuenow when indeterminate', () => {
		render(Progress);
		const progress = screen.getByRole('progressbar', { name: 'Progress' });
		expect(progress.hasAttribute('aria-valuenow')).toBe(false);
	});

	it('preserves an explicit accessible name', () => {
		render(Progress, { value: 40, 'aria-label': 'Upload progress' });
		expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toBeTruthy();
	});

	it('renders the derived filled segment count', () => {
		const { container } = render(Progress, { value: 60, variant: 'segments', segments: 5 });
		expect(container.querySelectorAll('.rx-progress__segment--filled')).toHaveLength(3);
	});

	it('renders an SVG ring for circle shape', () => {
		const { container } = render(Progress, { value: 40, shape: 'circle' });
		expect(container.querySelector('svg.rx-progress__ring')).toBeTruthy();
	});
	it('maps each source effect and transform-based progress',()=>{for(const variant of ['default','glow','gradient','segments','striped'] as const){const {container,unmount}=render(Progress,{value:50,variant});expect(container.querySelector(`.rx-progress--${variant}`)).toBeTruthy();expect(container.firstElementChild?.getAttribute('style')).toContain('--rx-progress: 0.5');unmount()}});
});
