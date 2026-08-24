import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Harness from './button-test-harness.svelte';
import { buttonVariants } from './index';

describe('Button', () => {
	it('renders children', () => {
		render(Harness);
		expect(screen.getByRole('button', { name: 'Press me' })).toBeTruthy();
	});

	it('renders href mode as an anchor', () => {
		render(Harness, { href: '/docs' });
		expect(screen.getByRole('link', { name: 'Press me' }).getAttribute('href')).toBe('/docs');
	});

	it('loading blocks clicks and exposes busy state', async () => {
		render(Harness, { loading: true });
		const button = screen.getByRole('button');
		await fireEvent.click(button);
		expect(button.getAttribute('aria-busy')).toBe('true');
		expect(screen.getByLabelText('click count').textContent).toBe('0');
	});

	it('disabled blocks clicks', async () => {
		render(Harness, { disabled: true });
		await fireEvent.click(screen.getByRole('button'));
		expect(screen.getByLabelText('click count').textContent).toBe('0');
	});

	it('places styleColor output on the root', () => {
		render(Harness, { color: '#7d33ff' });
		expect(screen.getByRole('button').getAttribute('style')).toContain('--rx-color: 125 51 255');
	});

	it('maps variant and size to stable classes', () => {
		expect(buttonVariants({ variant: 'flat', size: 'sm' })).toContain('rx-button--flat');
		expect(buttonVariants({ variant: 'flat', size: 'sm' })).toContain('rx-button--sm');
	});
});
