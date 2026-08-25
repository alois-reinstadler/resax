import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Harness from './chip-test-harness.svelte';
import source from './chip.svelte?raw';

afterEach(cleanup);

describe('Chip source interactions', () => {
	it('keeps a theme-invariant contrast-safe pair beneath the relative-color accent layer', () => {
		expect(source).toContain('color:rgb(var(--rx-fixed-light))');
		expect(source).toContain('background-color:rgb(var(--rx-fixed-dark))');
		expect(source).toContain('background-image:linear-gradient(hsl(from rgb(var(--rx-color))');
	});
	it('toggles the selected bounce state with pointer and keyboard', async () => {
		render(Harness);
		const chip = screen.getByRole('button', { name: 'Svelte' });
		await fireEvent.click(chip);
		expect(chip.getAttribute('aria-pressed')).toBe('true');
		expect(chip.classList.contains('rx-chip--bounce')).toBe(true);
		expect(chip.classList.contains('is-selected')).toBe(true);
		await fireEvent.keyDown(chip, { key: ' ' });
		expect(chip.getAttribute('aria-pressed')).toBe('false');
	});

	it('creates a coordinate ripple and removes it on teardown', async () => {
		const animate = vi.fn(() => {
			const listeners = new Map<string, EventListener>();
			return { addEventListener: (name: string, listener: EventListener) => listeners.set(name, listener), cancel: vi.fn() } as unknown as Animation;
		});
		Element.prototype.animate = animate;
		const view = render(Harness);
		const chip = screen.getByRole('button', { name: 'Svelte' });
		await fireEvent.pointerDown(chip, { clientX: 8, clientY: 6 });
		expect(chip.querySelector('[data-rx-ripple]')).not.toBeNull();
		expect(animate).toHaveBeenCalledTimes(2);
		view.unmount();
		expect(document.querySelector('[data-rx-ripple]')).toBeNull();
	});

	it('does not toggle while disabled', async () => {
		render(Harness, { disabled: true });
		const chip = screen.getByText('Svelte').closest('.rx-chip')!;
		await fireEvent.click(chip);
		expect(screen.getByText('idle').textContent).toBe('idle');
	});
});
