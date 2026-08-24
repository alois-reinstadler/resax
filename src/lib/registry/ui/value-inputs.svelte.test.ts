import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import SliderHarness from './slider/slider-test-harness.svelte';
import Rating from './rating/rating.svelte';
import InputOtpHarness from './input-otp/input-otp-test-harness.svelte';

describe('Slider', () => {
	it('round-trips its bindable range and renders the range with two thumbs', async () => { const { container } = render(SliderHarness); expect(container.querySelector('[data-slider-range]')).toBeTruthy(); expect(container.querySelectorAll('[data-slider-thumb]')).toHaveLength(2); await fireEvent.click(screen.getByText('Set range')); expect(screen.getByText('30,70')).toBeTruthy(); });
});
describe('Rating', () => {
	it('changes with arrows and rounds halves', async () => { const changed = vi.fn(); render(Rating, { value: 2.2, halves: true, onValueChange: changed }); const group = screen.getByRole('radiogroup'); await fireEvent.keyDown(group, { key: 'ArrowRight' }); expect(changed).toHaveBeenLastCalledWith(2.5); });
	it('blocks readonly input', async () => { const changed = vi.fn(); render(Rating, { value: 2, readonly: true, onValueChange: changed }); await fireEvent.click(screen.getByLabelText('4 stars')); expect(changed).not.toHaveBeenCalled(); });
});
describe('InputOtp', () => {
	it('round-trips value and fires completion', async () => { render(InputOtpHarness); await fireEvent.click(screen.getByText('Set code')); expect(document.querySelector('output')?.textContent).toBe('123456'); expect(document.querySelector('[data-completed]')?.textContent).toBe('123456'); expect(screen.getByLabelText('One-time password')).toHaveProperty('value', '123456'); });
	it('masks rendered digits', async () => { const { container } = render(InputOtpHarness, { masked: true }); await fireEvent.click(screen.getByText('Set code')); expect(container.querySelector('.rx-input-otp')?.textContent).not.toContain('123456'); expect(container.querySelector('.rx-input-otp')?.textContent).toContain('•'); });
});
