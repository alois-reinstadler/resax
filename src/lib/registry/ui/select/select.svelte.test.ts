import { fireEvent, render, screen, within } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './select-test-harness.svelte';

async function openSelect() {
	const trigger = screen.getByRole('button', { name: /Fruit/ });
	expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
	trigger.focus();
	await fireEvent.keyDown(trigger, { key: 'ArrowDown' });
	return await screen.findByRole('listbox');
}

describe('Select', () => {
	it('round-trips a single bound value and emits a string', async () => {
		render(Harness);
		const trigger = screen.getByRole('button', { name: /Fruit/ });
		const label = trigger.parentElement?.querySelector('.rx-select__label');
		expect(label?.textContent).toBe('Fruit');
		expect(label?.parentElement).toBe(trigger.parentElement);
		expect(trigger.textContent).not.toContain('Choose fruit');
		const listbox = await openSelect();
		const banana = within(listbox).getByRole('option', { name: /Banana/ });
		await fireEvent.pointerDown(banana, { button: 0 });
		await fireEvent.pointerUp(banana, { button: 0 });
		expect(screen.getByLabelText('select value').textContent).toContain('"banana"');
		expect(screen.getByLabelText('select payloads').textContent).toContain('string');
		await fireEvent.click(screen.getByText('Set value'));
		expect(screen.getByLabelText('select value').textContent).toContain('"banana"');
	});

	it('round-trips multiple values and emits an array', async () => {
		render(Harness, { multiple: true });
		const listbox = await openSelect();
		const banana = within(listbox).getByRole('option', { name: /Banana/ });
		await fireEvent.pointerDown(banana, { button: 0 });
		await fireEvent.pointerUp(banana, { button: 0 });
		expect(screen.getByLabelText('select value').textContent).toContain('["apple","banana"]');
		expect(screen.getByLabelText('select payloads').textContent).toContain('array');
	});

	it('removes a chip and updates the value', async () => {
		render(Harness, { multiple: true, chips: true });
		const trigger = screen.getByRole('button', { name: /Fruit/ });
		expect(trigger.querySelector('button')).toBeNull();
		await fireEvent.click(screen.getByRole('button', { name: 'Close' }));
		expect(screen.getByLabelText('select value').textContent).toContain('[]');
	});

	it('filters options in combobox mode and exposes aria roles', async () => {
		render(Harness, { filter: true });
		const input = screen.getByRole('combobox', { name: 'Fruit' });
		input.focus();
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		await fireEvent.input(input, { target: { value: 'ban' } });
		const listbox = await screen.findByRole('listbox');
		expect(within(listbox).getAllByRole('option')).toHaveLength(1);
		expect(within(listbox).getByText('Banana')).toBeTruthy();
	});

	it('does not select a disabled item', async () => {
		render(Harness);
		const listbox = await openSelect();
		await fireEvent.pointerUp(within(listbox).getByRole('option', { name: /Pear/ }));
		expect(screen.getByLabelText('select value').textContent).toContain('""');
	});

	it('keeps identifying text visible for every empty source variant', () => {
		for (const variant of ['default','floating','pill','search','slide','underline'] as const) {
			const view = render(Harness, { variant });
			const trigger = screen.getByRole('button', { name: 'Fruit' });
			const label = trigger.parentElement?.querySelector<HTMLElement>('.rx-select__label');
			if (variant === 'floating') expect(trigger.textContent).toContain('Choose fruit');
			else { expect(label?.textContent).toBe('Fruit'); expect(trigger.textContent).not.toContain('Choose fruit'); }
			view.unmount();
		}
	});
});
