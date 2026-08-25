import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Indicator from './indicator.svelte';
import Harness from './indicator-test-harness.svelte';

describe('Indicator', () => {
	it.each(['base','bounce','odometer','ping','ring','shake','dot','pulse','count','icon','border'] as const)('maps the %s variant class', (variant) => {
		const { container } = render(Indicator, { variant });
		expect(container.firstElementChild?.classList.contains(`rx-indicator--${variant}`)).toBe(true);
	});

	it('renders overlay and standalone DOM modes', () => {
		const overlay = render(Harness);
		expect(screen.getByRole('button', { name: 'Inbox' })).toBeTruthy();
		expect(overlay.container.querySelector('.rx-indicator--standalone')).toBeNull();
		overlay.unmount();
		const standalone = render(Harness, { standalone: true });
		expect(standalone.container.querySelector('.rx-indicator--standalone .rx-indicator__marker')).toBeTruthy();
	});

	it('renders count content', () => {
		render(Indicator, { variant: 'count', content: '9+' });
		expect(screen.getByText('9+')).toBeTruthy();
	});

	it('gives labelled standalone indicators valid status semantics', () => {
		render(Indicator, { 'aria-label': 'Available' });
		expect(screen.getByRole('status', { name: 'Available' })).toBeTruthy();
	});

	it('caps counts, exposes the hidden zero state, and replays the measured content swap', async () => {
		const view = render(Indicator, { variant: 'base', count: 120, max: 99 });
		expect(screen.getByText('99+')).toBeTruthy();
		expect(view.container.querySelector('.rx-indicator__marker')?.getAttribute('aria-label')).toBe('99+ notifications');
		await view.rerender({ variant: 'base', count: 0, max: 99 });
		expect(view.container.querySelector('.rx-indicator__marker')?.classList.contains('rx-indicator__marker--hidden')).toBe(true);
		await view.rerender({ variant: 'base', count: 2, max: 99, showZero: true });
		await waitFor(() => expect(view.container.querySelector('.rx-indicator__marker')?.classList.contains('rx-indicator__marker--swapping')).toBe(true));
	});

	it('renders odometer digits as persistent ten-cell reels', () => {
		const view = render(Indicator, { variant: 'odometer', count: 42 });
		expect(view.container.querySelectorAll('.rx-indicator__strip')).toHaveLength(2);
		expect(view.container.querySelectorAll('.rx-indicator__strip b')).toHaveLength(20);
		expect((view.container.querySelector('.rx-indicator__strip') as HTMLElement).style.transform).toBe('translateY(-40%)');
	});
});
