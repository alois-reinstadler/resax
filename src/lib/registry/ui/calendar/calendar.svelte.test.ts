import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './calendar-test-harness.svelte';

describe('Calendar', () => {
	it.each(['single', 'multiple'] as const)('round-trips its %s binding', async (mode) => {
		render(Harness, { mode });
		await fireEvent.click(screen.getByText('Set value'));
		expect(screen.getByLabelText('calendar value').textContent).toContain('2025-06-20');
	});

	it('produces a completed start/end range', async () => {
		render(Harness, { mode: 'range' });
		await fireEvent.click(screen.getByRole('button', { name: /Sunday, June 15, 2025/i }));
		expect(screen.getByLabelText('calendar value').textContent).toBe('2025-06-10/2025-06-15');
	});

	it('does not select an unavailable date', async () => {
		render(Harness, { unavailable: true });
		const unavailable = screen.getByRole('button', { name: /Monday, June 16, 2025/i });
		expect(unavailable.getAttribute('aria-disabled')).toBe('true');
		await fireEvent.click(unavailable);
		expect(screen.getByLabelText('calendar value').textContent).toBe('2025-06-15');
	});

	it('clamps navigation at min and max month bounds', () => {
		render(Harness, { bounded: true });
		expect(screen.getByRole('button', { name: 'Previous' }).getAttribute('disabled')).not.toBeNull();
		expect(screen.getByRole('button', { name: 'Next' }).getAttribute('disabled')).not.toBeNull();
	});

	it('wires DatePicker input aria-expanded to its popover', async () => {
		render(Harness, { picker: true });
		const input = screen.getByLabelText('Appointment');
		expect(input.getAttribute('aria-expanded')).toBe('false');
		await fireEvent.click(input);
		expect(input.getAttribute('aria-expanded')).toBe('true');
	});
});
