import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './checkbox-test-harness.svelte';
describe('Checkbox', () => {
	it('round-trips binding and fires its callback', async () => { render(Harness); const box = screen.getByRole('checkbox'); await fireEvent.click(box); expect(screen.getByLabelText('checkbox value').textContent).toBe('true'); expect(screen.getByLabelText('checkbox calls').textContent).toBe('1'); await fireEvent.click(screen.getByText('Set checked')); expect(box.getAttribute('data-state')).toBe('checked'); });
	it('toggles with space and its label', async () => { render(Harness); const box = screen.getByRole('checkbox'); box.focus(); await fireEvent.keyDown(box, { key: ' ', code: 'Space' }); await fireEvent.keyUp(box, { key: ' ', code: 'Space' }); expect(box.getAttribute('data-state')).toBe('checked'); await fireEvent.click(screen.getByText('Accept')); expect(box.getAttribute('data-state')).toBe('unchecked'); });
	it('blocks disabled interaction', async () => { render(Harness, { disabled: true }); const box = screen.getByRole('checkbox'); await fireEvent.click(box); expect(box.getAttribute('data-state')).toBe('unchecked'); });
});
