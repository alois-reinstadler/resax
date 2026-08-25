import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import InputOtp from './input-otp.svelte';
import source from './input-otp.svelte?raw';

describe('InputOtp source variants', () => {
	const flushPinInputSync = () => new Promise((resolve) => setTimeout(resolve, 70));
	it.each(['base','dots','filled','flip','glow','underline'] as const)('renders the %s treatment', async (variant) => {
		const { container } = render(InputOtp, { variant, value: '12', length: 4 });
		expect(container.querySelector(`[data-variant="${variant}"]`)).toBeTruthy();
		if (variant === 'dots') expect(container.querySelectorAll('.rx-input-otp__dot')).toHaveLength(4);
		if (variant === 'flip') expect(container.querySelectorAll('.rx-input-otp__hinge')).toHaveLength(4);
		if (variant === 'glow') expect(container.querySelectorAll('.rx-input-otp__aura')).toHaveLength(4);
		if (variant === 'underline') expect(container.querySelectorAll('.rx-input-otp__line')).toHaveLength(4);
		await flushPinInputSync();
	});

	it('masks every native cell while preserving the code across inputs', async () => {
		const { container } = render(InputOtp, { value: 'secret', type: 'text', masked: true });
		expect(container.querySelector('.rx-input-otp')?.textContent).not.toContain('secret');
		expect([...container.querySelectorAll<HTMLInputElement>('.rx-input-otp__cell input')].map((input) => input.value).join('')).toBe('secret');
		expect([...container.querySelectorAll<HTMLInputElement>('.rx-input-otp__cell input')].every((input) => input.type === 'password')).toBe(true);
		await flushPinInputSync();
	});
	it('uses source-native per-cell inputs and supports the autoFocus alias', async () => {
		render(InputOtp, { length: 4, autoFocus: true });
		await new Promise((resolve) => requestAnimationFrame(resolve));
		expect(screen.getByRole('textbox', { name: 'Digit 1 of 4' })).toBe(document.activeElement);
	});
	it('suppresses flip, aura, dot, caret, and ripple motion for reduced motion', () => { expect(source).toContain('@media (prefers-reduced-motion: reduce)'); expect(source).toContain('.rx-input-otp__ripple { display: none; }'); });
});
