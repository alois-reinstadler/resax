import { cleanup, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Skeleton from './skeleton.svelte';
import source from './skeleton.svelte?raw';

afterEach(cleanup);

describe('Skeleton source fidelity', () => {
	it('defaults to three grouped 14px text bones with one coherent shimmer', () => {
		const { container } = render(Skeleton);
		const group = screen.getByRole('status', { name: 'Loading' });
		const bones = group.querySelectorAll('.rx-skeleton__bone--line');

		expect(group.classList).toContain('rx-skeleton--text');
		expect(group.classList).toContain('rx-skeleton--animation-shimmer');
		expect(bones).toHaveLength(3);
		expect((bones[0] as HTMLElement).style.getPropertyValue('--i')).toBe('0');
		expect((bones[2] as HTMLElement).style.getPropertyValue('--w')).toBe('65%');
		expect(container.querySelector('.rx-skeleton-wrap')?.getAttribute('aria-busy')).toBe('true');
		expect(source).toContain('--h: var(--rx-skeleton-height, 14px);');
		expect(source).toContain('container-type: inline-size;');
		expect(source).toContain('mask-size: 100cqw 100%;');
		expect(source).toContain('+ 100cqw');
	});

	it('renders the source card as one avatar and a 60/90/75 line stack', () => {
		const { container } = render(Skeleton, { shape: 'card', animation: 'both' });
		const group = screen.getByRole('status', { name: 'Loading' });
		const lines = group.querySelectorAll('.rx-skeleton__stack .rx-skeleton__bone--line');

		expect(group.classList).toContain('rx-skeleton--card');
		expect(group.classList).toContain('rx-skeleton--animation-both');
		expect(container.querySelectorAll('.rx-skeleton__bone--avatar')).toHaveLength(1);
		expect(Array.from(lines, (line) => (line as HTMLElement).style.getPropertyValue('--w'))).toEqual(['60%', '90%', '75%']);
		expect(source).toContain('--ox: -62px;');
	});

	it('maps source count, geometry, speed, and stagger props while retaining duration and index', () => {
		const { container } = render(Skeleton, {
			variant: 'blink',
			count: 4,
			width: 320,
			height: '12px',
			radius: '999px',
			speed: 'fast',
			duration: 725,
			index: 2,
			stagger: 80
		});
		const wrapper = container.querySelector<HTMLElement>('.rx-skeleton-wrap')!;
		const group = screen.getByRole('status', { name: 'Loading' });
		const bones = group.querySelectorAll('.rx-skeleton__bone--line');
		const computedWrapper = getComputedStyle(wrapper);

		expect(group.classList).toContain('rx-skeleton--speed-fast');
		expect(bones).toHaveLength(4);
		expect((bones[0] as HTMLElement).style.getPropertyValue('--i')).toBe('2');
		expect(computedWrapper.getPropertyValue('--rx-skeleton-width')).toBe('320px');
		expect(computedWrapper.getPropertyValue('--rx-skeleton-height')).toBe('12px');
		expect(computedWrapper.getPropertyValue('--rx-skeleton-radius')).toBe('999px');
		expect(computedWrapper.getPropertyValue('--rx-skeleton-duration')).toBe('725ms');
		expect(wrapper.style.getPropertyValue('--rx-skeleton-stagger')).toBe('80ms');
		expect(source).toContain('--dur: var(--rx-skeleton-duration, var(--rx-skeleton-speed-duration, 1.4s));');
	});

	it('keeps the source rect geometry and distinct specialized renderers', () => {
		for (const variant of ['pulse', 'wave', 'shine', 'gradient', 'blink'] as const) {
			const view = render(Skeleton, { variant, shape: 'rect' });
			expect(screen.getByRole('status', { name: 'Loading' }).classList).toContain(`rx-skeleton--${variant}`);
			view.unmount();
		}
		expect(source).toContain('.rx-skeleton--rect { --h: var(--rx-skeleton-height, 120px);');
		expect(source).toContain('steps(1, end) infinite');
		expect(source).toContain('transform: scaleY(.85);');
		expect(source).toContain('transparent 30%, rgb(var(--rx-fixed-light) / var(--rx-skeleton-intensity)) 50%, transparent 70%');
	});
});
