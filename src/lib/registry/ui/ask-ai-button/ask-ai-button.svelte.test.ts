import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './ask-ai-button-test-harness.svelte';

describe('AskAiButton', () => {
	it('renders the seven source mesh fields and emits ask', async () => {
		render(Harness);
		const button = screen.getByRole('button', { name: 'Ask Resax' });
		expect(button.querySelectorAll('.blob')).toHaveLength(7);
		await fireEvent.click(button);
		expect(screen.getByLabelText('ask count').textContent).toBe('1');
	});

	it('updates source pointer variables and creates a clipped ripple', async () => {
		render(Harness);
		const button = screen.getByRole('button');
		await fireEvent.pointerMove(button, { clientX: 9, clientY: 6 });
		await new Promise(requestAnimationFrame);
		expect(button.getAttribute('style')).toContain('--mx: 9.0px');
		await fireEvent.pointerDown(button, { clientX: 9, clientY: 6 });
		expect(button.querySelector('.ask__ripple')).toBeTruthy();
	});

	it('loading disables interaction and enables the source sheen state', async () => {
		render(Harness, { loading: true });
		const button = screen.getByRole('button', { name: 'Ask Resax' });
		expect(button.getAttribute('aria-busy')).toBe('true');
		expect(button.classList.contains('ask--loading')).toBe(true);
		await fireEvent.click(button);
		expect(screen.getByLabelText('ask count').textContent).toBe('0');
	});
});
