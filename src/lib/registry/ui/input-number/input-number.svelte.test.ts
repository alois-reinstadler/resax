import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './input-number-test-harness.svelte';

describe('InputNumber', () => {
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
		const input = screen.getByRole('spinbutton') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: '-4' } });
		expect(screen.getByLabelText('bound value').textContent).toBe('0');
		expect(screen.getByRole('button', { name: 'Decrease value' }).hasAttribute('disabled')).toBe(true);
	});
});
