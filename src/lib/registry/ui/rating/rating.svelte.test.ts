import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Rating from './rating.svelte';
import source from './rating.svelte?raw';

describe('Rating source renderers', () => {
	it.each(['base','bars','emoji','glow','hearts','numbers'] as const)('renders %s as one keyboard-controlled radio group', (variant) => {
		const { container } = render(Rating, { variant, value: 3, showValue: true });
		expect(container.querySelector(`[data-variant="${variant}"]`)).toBeTruthy();
		expect(screen.getByRole('radiogroup').getAttribute('aria-label')).toBe('Rating: 3 of 5');
		expect(screen.getAllByRole('radio', { checked: true })).toHaveLength(1);
	});

	it('supports halves, clearing, and keyboard boundaries', async () => {
		const changed = vi.fn(); render(Rating, { variant: 'hearts', value: 3, halves: true, clearable: true, onValueChange: changed });
		await fireEvent.click(screen.getByLabelText('3 of 5'));
		expect(changed).toHaveBeenLastCalledWith(0);
		await fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'End' });
		expect(changed).toHaveBeenLastCalledWith(5);
	});

	it('uses the exact emoji distribution and number circle option', () => {
		const emoji = render(Rating, { variant: 'emoji', value: 3 });
		expect(emoji.container.textContent).toContain('😖');
		emoji.unmount();
		const numbers = render(Rating, { variant: 'numbers', value: 2, shape: 'circle' });
		expect(numbers.container.querySelector('.rx-rating--circle')).toBeTruthy();
	});
	it('maps source heart/circle presets and emits distinct hover values', async () => {
		const hover = vi.fn(); const { container } = render(Rating, { icon: 'circle', onHover: hover });
		expect(container.querySelector('.rx-rating__fill')?.getAttribute('d')).toContain('a9.5 9.5');
		await fireEvent.pointerMove(screen.getByLabelText('2 of 5'), { clientX: 10 });
		expect(hover).toHaveBeenCalledWith(2);
		await fireEvent.pointerLeave(screen.getByRole('radiogroup'));
		expect(hover).toHaveBeenLastCalledWith(null);
	});
	it('suppresses every renderer animation and pointer ripple for reduced motion', () => { expect(source).toContain('@media (prefers-reduced-motion: reduce)'); expect(source).toContain('.rx-rating__ripple { display: none; }'); });
});
