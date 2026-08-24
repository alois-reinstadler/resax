import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './switch-test-harness.svelte';
describe('Switch', () => {
	it('round-trips binding and fires its callback', async () => { render(Harness); const control = screen.getByRole('switch'); await fireEvent.click(control); expect(screen.getByLabelText('switch value').textContent).toBe('true'); expect(screen.getByLabelText('switch calls').textContent).toBe('1'); await fireEvent.click(screen.getByText('Set switch')); expect(control.getAttribute('data-state')).toBe('checked'); });
	it('toggles with space', async () => { render(Harness); const control = screen.getByRole('switch'); control.focus(); await fireEvent.keyDown(control, { key: ' ', code: 'Space' }); await fireEvent.keyUp(control, { key: ' ', code: 'Space' }); expect(control.getAttribute('data-state')).toBe('checked'); });
	it('blocks disabled and loading interaction', async () => { for (const props of [{ disabled: true }, { loading: true }]) { const view = render(Harness, props); await fireEvent.click(screen.getByRole('switch')); expect(screen.getByRole('switch').getAttribute('data-state')).toBe('unchecked'); view.unmount(); } });
});
