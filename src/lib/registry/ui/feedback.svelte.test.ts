import { fireEvent, render as renderDom, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import AlertHarness from './alert/alert-test-harness.svelte';
import Alert from './alert/alert.svelte';
import { alertVariants } from './alert';
import Badge from './badge/badge.svelte';
import { badgeVariants } from './badge';
import Chip from './chip/chip.svelte';
import { chipVariants } from './chip';

const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

describe('feedback components', () => {
	it('renders alert role and maps variants', () => {
		const { container } = renderDom(Alert, { variant: 'neon', title: 'Notice', children: text('Message') });
		expect(container.querySelector('[role="alert"]')).toBeTruthy();
		expect(container.querySelector('.rx-alert--neon')).toBeTruthy();
		expect(alertVariants({ variant: 'split' })).toContain('rx-alert--split');
		expect(container.querySelector('.rx-alert__neon-ring')).toBeTruthy();
	});

	it('closes a bindable alert and calls onClose', async () => {
		const onClose = vi.fn();
		renderDom(AlertHarness, { onClose });
		await fireEvent.click(screen.getByRole('button', { name: 'Close' }));
		expect(onClose).toHaveBeenCalledOnce();
		expect(screen.getByLabelText('open state').textContent).toBe('false');
	});

	it('renders standalone and overlay badge shapes', () => {
		const standalone = renderDom(Badge, { content: 3, variant: 'glow' }).container;
		const overlay = renderDom(Badge, { content: 3, children: text('<button>Inbox</button>'), position: 'bottom-left' }).container;
		expect(standalone.querySelector('.rx-badge--glow')).toBeTruthy();
		expect(standalone.querySelector('.rx-badge__wrapper')).toBeNull();
		expect(overlay.querySelector('.rx-badge__wrapper--bottom-left')).toBeTruthy();
		expect(overlay.querySelector('button')?.textContent).toBe('Inbox');
		expect(badgeVariants({ variant: 'stripes', dot: true })).toContain('rx-badge--dot');
		expect(standalone.querySelector('.rx-badge__glow')).toBeTruthy();
	});

	it('renders each source badge layer and appearance',()=>{for(const variant of ['default','glow','gradient','pulse','shimmer','stripes'] as const){const {container,unmount}=renderDom(Badge,{variant,appearance:'outline',content:variant});expect(container.querySelector(`.rx-badge--${variant}`)).toBeTruthy();expect(container.querySelector('.rx-badge--outline')).toBeTruthy();unmount()}});

	it('creates and cleans up the source badge ripple',async()=>{const view=renderDom(Badge,{content:'New'});const badge=view.container.querySelector('.rx-badge__pill') as HTMLElement;await fireEvent.pointerDown(badge,{clientX:5,clientY:6});expect(badge.querySelector('.rx-badge__ripple')).toBeTruthy();expect(()=>view.unmount()).not.toThrow()});

	it('maps chip variant and size classes', () => {
		expect(chipVariants({ variant: 'border', size: 'sm' })).toContain('rx-chip--border');
		expect(chipVariants({ variant: 'border', size: 'sm' })).toContain('rx-chip--sm');
	});

	it('fires chip close without bubbling', async () => {
		const onClose = vi.fn(); const parentClick = vi.fn();
		const view = renderDom(Chip, { children: text('Filter'), closable: true, onClose, onclick: parentClick });
		await fireEvent.click(view.getByRole('button', { name: 'Close' }));
		expect(onClose).toHaveBeenCalledOnce(); expect(parentClick).not.toHaveBeenCalled();
	});

	it('does not fire chip close when disabled', async () => {
		const onClose = vi.fn();
		const view = renderDom(Chip, { children: text('Filter'), closable: true, disabled: true, onClose });
		await fireEvent.click(view.getByRole('button', { name: 'Close' }));
		expect(onClose).not.toHaveBeenCalled();
	});
});
