import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './split-button-test-harness.svelte';

function dimensions(node: Element, width: number, height = 40) {
	Object.defineProperty(node, 'offsetWidth', { configurable: true, get: () => width });
	Object.defineProperty(node, 'offsetHeight', { configurable: true, get: () => height });
}

describe('SplitButton liquid choreography', () => {
	it('measures internal items into centered liquid slots', async () => {
		render(Harness);
		const trigger = screen.getByRole('button', { name: 'Create' });
		const stage = trigger.closest('.sb__stage')!;
		dimensions(trigger, 120); dimensions(stage, 120);
		const back = screen.getByRole('button', { name: 'Back', hidden: true });
		const draft = screen.getByRole('button', { name: 'Draft', hidden: true });
		const template = screen.getByRole('button', { name: 'Template', hidden: true });
		dimensions(back, 40); dimensions(draft, 68); dimensions(template, 88);
		expect(draft.classList.contains('is-off')).toBe(true);
		expect(getComputedStyle(draft).opacity).toBe('0');
		await fireEvent.click(trigger); await new Promise(requestAnimationFrame);
		expect((stage as HTMLElement).style.width).toBe('212px');
		expect(stage.classList.contains('is-laid-out')).toBe(true);
		expect(stage.querySelectorAll('.sb__slot')).toHaveLength(3);
		expect((draft as HTMLElement).style.getPropertyValue('--d')).toMatch(/ms$/);
		expect((draft as HTMLElement).style.getPropertyValue('--x')).not.toBe((template as HTMLElement).style.getPropertyValue('--x'));
		expect(draft.classList.contains('is-off')).toBe(false);
		expect(getComputedStyle(draft).opacity).toBe('1');
	});

	it('gives every legacy menu-snippet action its own measured blob and label delay', async () => {
		render(Harness, { custom: true });
		const trigger = screen.getByRole('button', { name: 'Create' });
		const stage = trigger.closest('.sb__stage')!;
		dimensions(trigger, 120); dimensions(stage, 120);
		const back = screen.getByRole('button', { name: 'Back', hidden: true });
		const draft = screen.getByRole('button', { name: 'Draft', hidden: true });
		const template = screen.getByRole('button', { name: 'Template', hidden: true });
		dimensions(back, 40); dimensions(draft, 68); dimensions(template, 88);
		window.dispatchEvent(new Event('resize')); await new Promise(requestAnimationFrame);
		await fireEvent.click(trigger); await new Promise(requestAnimationFrame);
		expect(stage.querySelectorAll('.sb__slot')).toHaveLength(3);
		expect(draft.classList.contains('sb__compat-item')).toBe(true);
		expect((template as HTMLElement).style.getPropertyValue('--x')).toMatch(/px$/);
	});
});
