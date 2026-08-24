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
});
