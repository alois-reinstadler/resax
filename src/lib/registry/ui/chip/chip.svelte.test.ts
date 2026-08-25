import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Harness from './chip-test-harness.svelte';
import source from './chip.svelte?raw';

afterEach(cleanup);

describe('Chip source interactions', () => {
	it('uses the source soft surface directly instead of a dead capped-color fallback', () => {
		expect(source).toContain('.rx-chip--default,.rx-chip--bounce,.rx-chip--glow{color:rgb(var(--rx-text));background:rgb(var(--rx-color)/.12);border-color:rgb(var(--rx-color)/.2)}');
		expect(source).toContain('.rx-chip--default.is-selected,.rx-chip--flat.is-selected,.rx-chip--border.is-selected{color:var(--rx-chip-solid-foreground);background:rgb(var(--rx-color)/.95);border-color:transparent}');
		expect(source).not.toContain('--rx-chip-capped');
		expect(source).not.toContain('min(l,');
	});
	it('computes distinct semantic color channels while keeping source-soft geometry', () => {
		const primary = render(Harness, { color: 'primary', variant: 'default' });
		const primaryChip = screen.getByRole('button', { name: 'Svelte' });
		const primaryColor = getComputedStyle(primaryChip).getPropertyValue('--rx-color').trim();
		expect(primaryColor).toBe('var(--rx-primary)');
		expect(primaryChip.classList).toContain('rx-chip--size-default');
		primary.unmount();

		const success = render(Harness, { color: 'success', variant: 'default', selected: true });
		const successChip = screen.getByRole('button', { name: 'Svelte' });
		const successStyle = getComputedStyle(successChip);
		expect(successStyle.getPropertyValue('--rx-color').trim()).toBe('var(--rx-success)');
		expect(successStyle.getPropertyValue('--rx-color').trim()).not.toBe(primaryColor);
		expect(successStyle.getPropertyValue('--rx-chip-solid-foreground').trim()).toBe('rgb(var(--rx-fixed-dark))');
		expect(successChip.getAttribute('aria-pressed')).toBe('true');
		success.unmount();
	});
	it('toggles the selected bounce state with pointer and keyboard', async () => {
		render(Harness);
		const chip = screen.getByRole('button', { name: 'Svelte' });
		await fireEvent.click(chip);
		expect(chip.getAttribute('aria-pressed')).toBe('true');
		expect(chip.classList.contains('rx-chip--bounce')).toBe(true);
		expect(chip.classList.contains('is-selected')).toBe(true);
		await new Promise((resolve) => requestAnimationFrame(resolve));
		expect(chip.classList.contains('is-bouncing')).toBe(true);
		await fireEvent.animationEnd(chip, { animationName: 'rx-chip-bounce' });
		expect(chip.classList.contains('is-bouncing')).toBe(false);
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
