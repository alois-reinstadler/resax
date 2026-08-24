import { cleanup, fireEvent, render, screen, within } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Harness from './poppers-test-harness.svelte';

afterEach(async () => {
	vi.useRealTimers();
	cleanup();
	// bits-ui releases body-scroll-lock after its close animation.
	await new Promise((resolve) => setTimeout(resolve, 250));
});

describe('poppers', () => {
	it('shows tooltip content when its trigger receives focus', async () => {
		render(Harness);
		const trigger = screen.getByText('Focusable help').closest('button')!;
		await fireEvent.focus(trigger);
		expect((await screen.findByText('Helpful detail')).getAttribute('data-state')).toBe('instant-open');
		await fireEvent.blur(trigger);
	});

	it('round-trips dropdown open and exposes menu roles', async () => {
		render(Harness);
		await fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
		const menu = await screen.findByRole('menu');
		expect(screen.getByLabelText('dropdown open').textContent).toBe('true');
		expect(within(menu).getAllByRole('menuitem')).toHaveLength(2);
		await fireEvent.keyDown(menu, { key: 'Escape' });
	});

	it('opens and closes a hover dropdown after its close delay', async () => {
		vi.useFakeTimers();
		render(Harness, { hover: true });
		const trigger = screen.getByRole('button', { name: 'Hover actions' });
		await fireEvent.pointerEnter(trigger);
		expect(screen.getByLabelText('dropdown open').textContent).toBe('true');
		await fireEvent.pointerLeave(trigger);
		expect(screen.getByLabelText('dropdown open').textContent).toBe('true');
		await vi.advanceTimersByTimeAsync(150);
		expect(screen.getByLabelText('dropdown open').textContent).toBe('false');
	});

	it('fires enabled item selection but not disabled item selection', async () => {
		render(Harness);
		await fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
		const menu = await screen.findByRole('menu');
		await fireEvent.click(within(menu).getByRole('menuitem', { name: 'Disabled action' }));
		expect(screen.getByLabelText('selections').textContent).toBe('');
		await fireEvent.click(within(menu).getByRole('menuitem', { name: 'Enabled action' }));
		expect(screen.getByLabelText('selections').textContent).toBe('enabled');
	});

	it('opens a context menu from the contextmenu event', async () => {
		render(Harness);
		await fireEvent.contextMenu(screen.getByText('Context target'));
		const menu = await screen.findByRole('menu');
		expect(within(menu).getByRole('menuitem', { name: 'Context action' })).toBeTruthy();
		await fireEvent.keyDown(menu, { key: 'Escape' });
	});
});
