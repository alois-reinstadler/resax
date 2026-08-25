import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import Harness from './phase-4a-test-harness.svelte';

class ResizeObserverMock { observe = vi.fn(); disconnect = vi.fn(); }
describe('phase 4a navigation interactions', () => {
	beforeEach(() => vi.stubGlobal('ResizeObserver', ResizeObserverMock));
	afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
	it('moves accordion focus and updates the single binding', async () => {
		const view = render(Harness); const first = view.getByRole('button', { name: 'First' });
		first.focus(); await fireEvent.keyDown(first, { key: 'ArrowDown' });
		expect(document.activeElement).toBe(view.getByRole('button', { name: 'Second' }));
		await fireEvent.click(view.getByRole('button', { name: 'Second' }));
		expect(view.getByTestId('accordion-value').textContent).toContain('two');
	});
	it('uses roving focus without activating manual tabs until commit', async () => {
		const view = render(Harness); const overview = view.getByRole('tab', { name: 'Overview' }); overview.focus();
		const visualIndicator=view.container.querySelector<HTMLElement>('.rx-indicator')!;expect(visualIndicator.hasAttribute('inert')).toBe(true);expect(visualIndicator.querySelector('.rx-indicator-clip .rx-indicator-mask')).not.toBeNull();const visualClones=[...view.container.querySelectorAll<HTMLElement>('.rx-mask-label')];expect(visualClones.every((clone)=>clone.hasAttribute('inert')&&clone.tabIndex===-1)).toBe(true);
		await fireEvent.keyDown(overview, { key: 'ArrowRight' }); const settings = view.getByRole('tab', { name: 'Settings' });
		expect(document.activeElement).toBe(settings); expect(view.getByTestId('tab-value').textContent).toBe('one');
		await fireEvent.keyDown(settings, { key: 'Enter' }); expect(view.getByTestId('tab-value').textContent).toBe('two');
	});
	it('keeps breadcrumb semantics and exposes collapsed items through a menu', async () => {
		const view = render(Harness); expect(view.getByRole('navigation', { name: 'Breadcrumb' }).querySelector('ol')).not.toBeNull();
		expect(view.getByText('Current').getAttribute('aria-current')).toBe('page');
		await fireEvent.click(view.getByRole('button', { name: 'Show collapsed breadcrumb items' }));
		const hidden = await view.findByRole('menuitem', { name: 'Docs' }); await fireEvent.click(hidden);
		expect(view.getByTestId('navigated').textContent).toBe('Docs');
	});
	it('supports controls and clamps goto commits', async () => {
		const view = render(Harness); await fireEvent.click(view.getByRole('button', { name: 'Next page' }));
		expect(view.getByTestId('page-value').textContent).toBe('3'); const input = view.getByRole('textbox', { name: 'Go to page' });
		await fireEvent.input(input, { target: { value: '99' } }); await fireEvent.keyDown(input, { key: 'Enter' });
		expect(view.getByTestId('page-value').textContent).toBe('10');
	});
});
