import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './card-test-harness.svelte';
import { cardVariants } from './index';
describe('Card', () => {
	it('renders content', () => { render(Harness); expect(screen.getByText('Card body')).toBeTruthy(); });
	it('maps every variant to a stable class', () => { for (const variant of ['default', 'shadow', 'border', 'flat', 'reveal', 'zoom'] as const) expect(cardVariants({ variant })).toContain(`rx-card--${variant}`); });
	it('marks reveal cards for focus-within footer exposure', () => { render(Harness, { variant: 'reveal' }); expect(screen.getByTestId('card').classList.contains('rx-card--reveal')).toBe(true); expect(screen.getByRole('button', { name: 'Action' })).toBeTruthy(); });
	it('renders href mode as an anchor', () => { render(Harness, { href: '/cards' }); const card = screen.getByRole('link'); expect(card.getAttribute('href')).toBe('/cards'); });
});
