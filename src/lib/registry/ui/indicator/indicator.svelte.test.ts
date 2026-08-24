import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Indicator from './indicator.svelte';
import Harness from './indicator-test-harness.svelte';

describe('Indicator', () => {
	it.each(['dot', 'ring', 'pulse', 'count', 'icon', 'border'] as const)('maps the %s variant class', (variant) => {
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
});
