import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './avatar-test-harness.svelte';
describe('Avatar', () => {
	it('renders its fallback', () => { render(Harness); expect(screen.getByText('RX')).toBeTruthy(); });
	it('falls back from a bad image to initials', async () => { render(Harness, { mode: 'broken' }); await fireEvent.error(screen.getByRole('img')); expect(screen.getByText('RX')).toBeTruthy(); });
	it('shows a context-counted group overflow', () => { render(Harness, { mode: 'group', max: 2 }); expect(screen.getByLabelText('2 more').textContent).toBe('+2'); expect(screen.queryByText('C')).toBeNull(); });
	it('distinguishes a status dot from a count', () => { const dot = render(Harness, { badge: true }); expect(screen.getByLabelText('Status').classList.contains('rx-avatar__badge--dot')).toBe(true); dot.unmount(); render(Harness, { badge: 4 }); expect(screen.getByLabelText('4').textContent).toBe('4'); });
});
