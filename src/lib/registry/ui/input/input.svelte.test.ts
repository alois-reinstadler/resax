import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './input-test-harness.svelte';

describe('Input', () => {
	it('round-trips its bindable value', async () => {
		render(Harness);
		await fireEvent.input(screen.getByLabelText('Name'), { target: { value: 'Ada' } });
		expect(screen.getByLabelText('bound value').textContent).toBe('Ada');
	});
	it('floats its label when value is set programmatically', async () => {
		const { container } = render(Harness);
		await fireEvent.click(screen.getByRole('button', { name: 'Set value' }));
		expect(container.querySelector('.rx-input')?.classList.contains('rx-input--floated')).toBe(true);
	});
	it('wires danger accessibility attributes to the message', () => {
		render(Harness, { state: 'danger', message: 'Required' });
		const input = screen.getByLabelText('Name');
		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(document.getElementById(input.getAttribute('aria-describedby') ?? '')?.textContent).toContain('Required');
	});
});
