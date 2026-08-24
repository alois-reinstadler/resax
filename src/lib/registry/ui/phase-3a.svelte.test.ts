import { cleanup, fireEvent, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Harness from './phase-3a-test-harness.svelte';

afterEach(async () => {
	cleanup();
	// bits-ui releases body-scroll-lock after its close animation.
	await new Promise((resolve) => setTimeout(resolve, 250));
});

describe('phase 3a dialogs', () => {
	it('renders an accessible popup and closes with escape', async () => {
		const view = render(Harness);
		await fireEvent.click(view.getByText('Show popup'));
		const dialog = view.getByRole('dialog');
		expect(dialog.getAttribute('aria-modal')).toBe('true');
		expect(view.getByText('Popup body')).toBeTruthy();
		await fireEvent.keyDown(document, { key: 'Escape' });
		expect(view.getByTestId('state').textContent).toContain('false:false:false:popup-false');
	});

	it('maps drawer placement', async () => {
		const view = render(Harness);
		await fireEvent.click(view.getByText('Show drawer'));
		const dialog = view.getByRole('dialog');
		expect(dialog.getAttribute('data-side')).toBe('right');
		await fireEvent.keyDown(document, { key: 'Escape' });
	});

	it('blocks escape when preventClose is enabled', async () => {
		const view = render(Harness);
		await fireEvent.click(view.getByText('Show protected popup'));
		await fireEvent.keyDown(document, { key: 'Escape' });
		expect(view.getByRole('dialog')).toBeTruthy();
		await fireEvent.click(view.getByRole('button', { name: 'Close' }));
	});

	it('fires confirm callback', async () => {
		const view = render(Harness);
		await fireEvent.click(view.getByText('Show confirm'));
		await fireEvent.click(view.getByRole('button', { name: 'Confirm' }));
		expect(view.getByTestId('state').textContent).toContain('confirmed');
	});

	it('fires cancel callback', async () => {
		const view = render(Harness);
		await fireEvent.click(view.getByText('Show confirm'));
		await fireEvent.click(view.getByRole('button', { name: 'Cancel' }));
		expect(view.getByTestId('state').textContent).toContain('cancelled');
	});
});
