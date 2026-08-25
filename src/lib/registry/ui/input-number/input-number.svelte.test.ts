import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './input-number-test-harness.svelte';
import InputNumber from './input-number.svelte';
import source from './input-number.svelte?raw';

describe('InputNumber', () => {
	it.each(['base','glow','roll-digits','segment','slider','stepper'] as const)('renders the source %s structure', (variant) => {
		const { container } = render(InputNumber, { variant, value: 42, min: 0, max: 100 });
		expect(container.querySelector(`[data-variant="${variant}"]`)).toBeTruthy();
		if (variant === 'roll-digits') expect(container.querySelector('.rx-input-number__digit-strip')).toBeTruthy();
		if (variant === 'segment') expect(container.querySelector('.rx-input-number__segment-new')).toBeTruthy();
		if (variant === 'slider') expect(container.querySelector('input[type="range"]')).toBeTruthy();
		if (variant === 'stepper') expect(container.querySelector('.rx-input-number__controls')).toBeTruthy();
	});
	it('clamps increments and disables at the upper bound', async () => {
		render(Harness, { initial: 1, min: 0, max: 2 });
		const increase = screen.getByRole('button', { name: 'Increase value' });
		await fireEvent.pointerDown(increase);
		await fireEvent.pointerUp(increase);
		expect(screen.getByLabelText('bound value').textContent).toBe('2');
		expect(increase.hasAttribute('disabled')).toBe(true);
	});
	it('clamps native input and disables at the lower bound', async () => {
		render(Harness, { initial: 1, min: 0, max: 2 });
		await fireEvent.click(screen.getByRole('button', { name: 'Edit value' }));
		const input = screen.getByRole('textbox', { name: 'Value' });
		await fireEvent.input(input, { target: { value: '0' } });
		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(screen.getByLabelText('bound value').textContent).toBe('0');
		expect(screen.getByRole('button', { name: 'Decrease value' }).hasAttribute('disabled')).toBe(true);
	});
	it('cancels a click-edit draft with Escape and flips only changed segment positions', async () => {
		const { container } = render(InputNumber, { variant: 'base', value: 12, min: 0, max: 99 });
		await fireEvent.click(screen.getByRole('button', { name: 'Edit value' }));
		const input = screen.getByRole('textbox', { name: 'Value' });
		await fireEvent.input(input, { target: { value: '77' } });
		await fireEvent.keyDown(input, { key: 'Escape' });
		expect(screen.getByRole('spinbutton').getAttribute('aria-valuenow')).toBe('12');
		container.remove();
		const segment = render(InputNumber, { variant: 'segment', value: 42 });
		expect(segment.container.querySelectorAll('.rx-input-number__segment-cell')).toHaveLength(2);
	});
	it('removes roll, flip, glow, and ripple motion under reduced motion', () => { expect(source).toContain('@media (prefers-reduced-motion: reduce)'); expect(source).toContain('.rx-input-number__ripple { display: none; }'); });
});
