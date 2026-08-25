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
		const button = screen.getByRole('button', { name: 'Press me' });
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

	it.each(['success', 'danger', 'warn'] as const)('uses contrast-safe semantic ink for %s solids', (color) => {
		render(Harness, { color });
		const style = screen.getByRole('button').getAttribute('style');
		expect(style).toContain(`--rx-color-foreground: var(--rx-${color}-foreground)`);
		expect(style).toContain('--rx-button-foreground: rgb(var(--rx-warn-contrast-rgb))');
	});

	it.each(['primary', 'dark', '#f0d234'])('keeps the palette foreground for %s solids', (color) => {
		const view = render(Harness, { color });
		expect(screen.getByRole('button').getAttribute('style')).toContain('--rx-button-foreground: var(--rx-color-foreground');
		view.unmount();
	});

	it('maps variant and size to stable classes', () => {
		expect(buttonVariants({ variant: 'flat', size: 'sm' })).toContain('rx-button--flat');
		expect(buttonVariants({ variant: 'flat', size: 'sm' })).toContain('rx-button--sm');
	});

	it('maps every source catalog variant', () => {
		for (const variant of ['border-draw', 'chrome', 'glitch', 'gooey', 'gradient', 'invert', 'liquid', 'magnetic', 'plasma', 'push', 'shine', 'v2'] as const) {
			expect(buttonVariants({ variant })).toContain(`rx-button--${variant}`);
		}
	});

	it('places source-origin ripples and cleans them up on destroy', async () => {
		const view = render(Harness);
		const button = screen.getByRole('button', { name: 'Press me' });
		await fireEvent.pointerDown(button, { clientX: 4, clientY: 7 });
		expect(button.querySelector('[data-rx-ripple]')).toBeTruthy();
		view.unmount();
		expect(document.querySelector('[data-rx-ripple]')).toBeNull();
	});

	it('renders and drives the gooey SVG spring/filter, then cleans its document tracker', async () => {
		const view = render(Harness, { variant: 'gooey', reach: 280, stiffness: 240, damping: 14, lag: .55, gooStrength: 8, squash: .08, filaments: 2, droplets: 4, gravity: 700, drag: 3.5, sag: .3 });
		const button = screen.getByRole('button', { name: 'Press me' });
		button.getBoundingClientRect = () => ({ x:0,y:0,left:0,top:0,right:120,bottom:40,width:120,height:40,toJSON(){} });
		const filter = button.querySelector('filter');
		expect(filter?.id).toContain('-goo');
		expect(button.querySelectorAll('.rx-button__goo-filament')).toHaveLength(2);
		expect(button.querySelectorAll('.rx-button__goo-drop')).toHaveLength(4);
		await fireEvent.pointerLeave(button, { clientX: 60, clientY: 50, pointerType: 'mouse' });
		await new Promise(requestAnimationFrame);
		expect(button.querySelector('.rx-button__goo-tail')?.getAttribute('d')).toContain('M ');
		view.unmount();
		expect(document.querySelector('.rx-button__goo-tail')).toBeNull();
	});

	it('ports the chrome noise field controls and all eight independently driven shards', async () => {
		const view = render(Harness, { variant: 'chrome', thickness: 5, speed: 180, chaos: 90, prism: 60 });
		const button = screen.getByRole('button', { name: 'Press me' });
		expect(button.getAttribute('style')).toContain('--chr-bw: 5px');
		expect(button.getAttribute('style')).toContain('--chr-prism: 0.6');
		expect(button.querySelectorAll('.rx-button__chrome-shard')).toHaveLength(11);
		expect(button.querySelectorAll('.rx-button__chrome-shard--prism')).toHaveLength(6);
		await new Promise(requestAnimationFrame);
		expect(button.querySelector('.rx-button__chrome-shard')?.getAttribute('style')).toContain('--p:');
		view.unmount();
	});

	it('uses independently sprung ink and a clipped duplicate label for invert', async () => {
		render(Harness, { variant: 'invert', stiffness: 260, damping: 17, lag: .45, squash: .05, blur: 2 });
		const button = screen.getByRole('button', { name: 'Press me' });
		button.getBoundingClientRect = () => ({ x:0,y:0,left:0,top:0,right:120,bottom:40,width:120,height:40,toJSON(){} });
		expect(button.querySelector('.rx-button__invert-clip')?.textContent).toContain('Press me');
		await fireEvent.pointerEnter(button, { clientX: 20, clientY: 10, pointerType: 'mouse' });
		await new Promise(requestAnimationFrame);
		expect(button.getAttribute('style')).toContain('--ink-r:');
		expect(button.getAttribute('style')).toContain('--lsx:');
	});
});
