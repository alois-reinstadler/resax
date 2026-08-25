import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './textarea-test-harness.svelte';

describe('Textarea', () => {
	it('round-trips value and displays the counter', async () => {
		render(Harness, { maxlength: 10 });
		await fireEvent.input(screen.getByLabelText('Notes'), { target: { value: 'hello' } });
		expect(screen.getByLabelText('bound value').textContent).toBe('hello');
		expect(screen.getByLabelText('character count').textContent).toBe('5/10');
	});
	it('auto-resize attachment updates inline height', async () => {
		render(Harness, { autoResize: true });
		const textarea = screen.getByLabelText('Notes') as HTMLTextAreaElement;
		Object.defineProperty(textarea, 'scrollHeight', { configurable: true, value: 144 });
		await fireEvent.input(textarea, { target: { value: 'two\nlines' } });
		expect(textarea.style.height).toBe('144px');
	});
	it('uses a real fieldset gap, source ripple host, resize modes, and clear action', async () => {
		render(Harness, { initial: 'remove me', clearable: true, resize: 'horizontal' });
		const textarea = screen.getByLabelText('Notes');
		expect(textarea.closest('.rx-textarea--resize-horizontal')).toBeTruthy();
		expect(textarea.parentElement?.querySelector('fieldset legend')?.textContent).toContain('Notes');
		await fireEvent.pointerDown(textarea.parentElement!, { clientX: 10, clientY: 12 });
		expect(textarea.parentElement?.querySelector('[data-rx-ripple]')).toBeTruthy();
		await fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
		expect(screen.getByLabelText('bound value').textContent).toBe('');
	});
});
