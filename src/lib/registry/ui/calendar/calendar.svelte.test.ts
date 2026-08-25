import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './calendar-test-harness.svelte';
import Calendar from './calendar.svelte';
import { CalendarDate } from '@internationalized/date';
import source from './calendar.svelte?raw';
import datePickerSource from './date-picker.svelte?raw';

describe('Calendar', () => {
	it.each(['base','compact','dots','glow','minimal','range-fill'] as const)('renders the source %s surface', (variant) => {
		const mode = variant === 'range-fill' ? 'range' : variant === 'dots' ? 'multiple' : 'single';
		const initial = mode === 'range' ? { start: new CalendarDate(2025,6,10), end: new CalendarDate(2025,6,15) } : mode === 'multiple' ? [new CalendarDate(2025,6,15)] : new CalendarDate(2025,6,15);
		const { container } = render(Calendar, { variant, mode, value: initial });
		expect(container.querySelector(`[data-variant="${variant}"]`)).toBeTruthy();
		if (variant === 'glow') expect(container.querySelector('.rx-calendar-shell--glow')).toBeTruthy();
		if (variant === 'range-fill') expect(container.querySelector('.rx-calendar-shell--range-fill')).toBeTruthy();
	});
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
	it('renders live range hover preview and source trigger morph choreography', async () => {
		const { container } = render(Calendar, { variant: 'range-fill', mode: 'range' });
		await fireEvent.click(container.querySelector('.rx-calendar__day[data-value="2026-08-26"]')!);
		await fireEvent.pointerMove(container.querySelector('.rx-calendar__day[data-value="2026-08-29"]')!);
		expect(container.querySelector('[data-range-preview]')).toBeTruthy();
		expect(datePickerSource).toContain('rx-date-picker-morph-in');
	});
	it('stops persistent overlays, sheen, month motion, and ripples for reduced motion', () => { expect(source).toContain('@media (prefers-reduced-motion: reduce)'); expect(source).toContain('.rx-calendar__ripple { display: none; }'); });
});
