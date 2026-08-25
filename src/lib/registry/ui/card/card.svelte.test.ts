import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './card-test-harness.svelte';
import { cardVariants } from './index';
describe('Card', () => {
	it('renders content', () => { render(Harness); expect(screen.getByText('Card body')).toBeTruthy(); });
	it('maps every variant to a stable class', () => { for (const variant of ['default', 'shadow', 'border', 'flat', 'reveal', 'zoom', 'asset', 'glow', 'gradient-border', 'lift', 'slider', 'spotlight', 'tilt-3d'] as const) expect(cardVariants({ variant })).toContain(`rx-card--${variant}`); });
	it('marks reveal cards for focus-within footer exposure', () => { render(Harness, { variant: 'reveal' }); expect(screen.getByTestId('card').classList.contains('rx-card--reveal')).toBe(true); expect(screen.getByRole('button', { name: 'Action' })).toBeTruthy(); });
	it('renders href mode as an anchor', () => { render(Harness, { href: '/cards' }); const card = screen.getByRole('link'); expect(card.getAttribute('href')).toBe('/cards'); });
	it('tracks pointer spotlight coordinates and clears active state', async () => {
		render(Harness, { variant: 'spotlight' });
		const card = screen.getByTestId('card');
		card.getBoundingClientRect = () => ({ x: 0, y: 0, left: 0, top: 0, right: 100, bottom: 80, width: 100, height: 80, toJSON() {} });
		await fireEvent.pointerEnter(card, { clientX: 8, clientY: 12 });
		await fireEvent.pointerMove(card, { clientX: 8, clientY: 12 });
		await new Promise(requestAnimationFrame);
		expect(card.classList.contains('is-lit')).toBe(true);
		expect(card.getAttribute('style')).toContain('--rx-mx: 8%');
		await fireEvent.pointerLeave(card);
		expect(card.classList.contains('is-lit')).toBe(false);
	});
});
