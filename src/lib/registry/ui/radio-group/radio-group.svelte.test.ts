import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './radio-group-test-harness.svelte';
describe('RadioGroup', () => {
	it('round-trips value and fires its callback', async () => { render(Harness); await fireEvent.click(screen.getByRole('radio', { name: 'Two' })); expect(screen.getByLabelText('radio value').textContent).toBe('two'); expect(screen.getByLabelText('radio calls').textContent).toBe('1'); await fireEvent.click(screen.getByText('Set radio')); expect(screen.getByRole('radio', { name: 'Two' }).getAttribute('data-state')).toBe('checked'); });
	it('uses bits-ui arrow navigation', async () => { render(Harness); const one = screen.getByRole('radio', { name: 'One' }); one.focus(); await fireEvent.keyDown(one, { key: 'ArrowDown', code: 'ArrowDown' }); expect(screen.getByLabelText('radio value').textContent).toBe('two'); });
	it('blocks disabled interaction', async () => { render(Harness, { disabled: true }); await fireEvent.click(screen.getByRole('radio', { name: 'Two' })); expect(screen.getByLabelText('radio value').textContent).toBe('one'); });
	it('propagates group color and size through context', () => { render(Harness); const item = screen.getByRole('radio', { name: 'One' }); expect(item.className).toContain('rx-radio--lg'); expect(item.getAttribute('style')).toContain('--rx-color: var(--rx-success)'); });
});
