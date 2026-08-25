import { fireEvent, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { notify } from './index';
import { notificationState, resetNotificationsForTesting } from './notify.svelte';
import notificationSource from './notification.svelte?raw';
import outletSource from './notification-outlet.svelte?raw';

describe('notification engine', () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => { resetNotificationsForTesting(); vi.useRealTimers(); vi.restoreAllMocks(); });

	it('adds a notification and auto-dismisses it', async () => {
		notify({ text: 'Saved', duration: 1000 });
		expect(notificationState.items).toHaveLength(1);
		expect(notificationState.items[0]).toMatchObject({ variant: 'base', position: 'top-center', duration: 1000, closable: false });
		await vi.advanceTimersByTimeAsync(1000);
		expect(notificationState.items).toHaveLength(0);
	});

	it('keeps sticky notifications until closed by their handle', async () => {
		const handle = notify({ text: 'Sticky', duration: 0 });
		await vi.advanceTimersByTimeAsync(10_000);
		expect(notificationState.items).toHaveLength(1);
		handle.close();
		expect(notificationState.items).toHaveLength(0);
	});

	it('pauses timeout and progress while hovered', async () => {
		notify({ text: 'Hover me', duration: 1000, progress: true });
		await vi.runAllTicks();
		const toast = document.querySelector<HTMLElement>('[role="status"]');
		expect(toast).toBeTruthy();
		if (!toast) return;
		await vi.advanceTimersByTimeAsync(400);
		await fireEvent.pointerEnter(toast);
		const bar = toast.querySelector('.rx-notification__progress');
		expect(bar?.classList.contains('rx-notification__progress--paused')).toBe(true);
		await vi.advanceTimersByTimeAsync(1000);
		expect(notificationState.items).toHaveLength(1);
		await fireEvent.pointerLeave(toast);
		await vi.advanceTimersByTimeAsync(600);
		expect(notificationState.items).toHaveLength(0);
	});

	it('applies shorthand colors and supports updates', () => {
		const success = notify.success('Complete');
		notify.danger('Failed'); notify.warn('Careful'); notify.primary('Hello');
		expect(notificationState.items.map((item) => item.color)).toEqual(['success', 'danger', 'warn', 'primary']);
		expect(notificationState.items.map((item) => item.state)).toEqual(['success', 'error', 'warn', 'info']);
		success.update({ text: 'Updated', position: 'bottom-left', roundness: -4 });
		expect(notificationState.items[0]).toMatchObject({ text: 'Updated', position: 'bottom-left', roundness: 0 });
	});

	it('supports the source state, description, action, and loading shortcuts', async () => {
		const action = vi.fn();
		notify({ title: 'Message sent', description: 'Your note is on its way.', state: 'info', action: { label: 'Undo', onClick: action }, duration: 0 });
		await vi.runAllTicks();
		expect(screen.getByText('Your note is on its way.')).toBeTruthy();
		await fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
		expect(action).toHaveBeenCalledOnce();
		expect(notificationState.items).toHaveLength(0);
		notify.loading('Uploading');
		expect(notificationState.items[0]).toMatchObject({ state: 'loading', duration: 0 });
	});

	it('renders the source goo layers and preserves the orthogonal surface axis', async () => {
		vi.useRealTimers();
		notify({ title: 'Saved', text: 'Changes persisted', duration: 0, surface: 'glass', roundness: 22 });
		await Promise.resolve();
		const toast = document.querySelector<HTMLElement>('.rx-notification--surface-glass');
		expect(toast).toBeTruthy();
		if (!toast) return;
		expect(toast.classList.contains('rx-notification--surface-glass')).toBe(true);
		expect(toast.querySelector('.rx-notification__goo')).toBeTruthy();
		expect(toast.querySelector('.rx-notification__badge')).toBeTruthy();
		expect(toast.querySelector('.rx-notification__close')).toBeNull();
		expect(toast.querySelector('.rx-notification__morph-content-inner')).toBeTruthy();
		expect(toast.style.getPropertyValue('--rx-notify-roundness')).toBe('22px');
		await fireEvent.pointerEnter(toast);
		expect(toast.classList.contains('rx-notification--expanded')).toBe(true);
		await fireEvent.pointerLeave(toast);
		expect(toast.classList.contains('rx-notification--expanded')).toBe(false);
	});

	it('includes the measured padded content and 16px goo bridge in the open panel height', async () => {
		vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(32);
		notify({ title: 'Measured', description: 'Panel content', duration: 0 });
		await tick();
		const toast = screen.getByText('Measured').closest<HTMLElement>('.rx-notification--base');
		expect(toast).toBeTruthy();
		if (!toast) return;
		await fireEvent.pointerEnter(toast);
		await tick();
		expect(toast.style.getPropertyValue('--rx-notification-h')).toBe('92px');
	});

	it('uses source family positions and preserves explicit close controls', () => {
		notify({ text: 'Base', duration: 0 });
		notify({ text: 'Card', variant: 'card', duration: 0 });
		notify({ text: 'Snackbar', variant: 'snackbar', duration: 0 });
		notify({ text: 'Closable base', closable: true, duration: 0 });
		expect(notificationState.items.map(({ position, closable }) => ({ position, closable }))).toEqual([
			{ position: 'top-center', closable: false },
			{ position: 'top-right', closable: true },
			{ position: 'bottom-center', closable: true },
			{ position: 'top-center', closable: true }
		]);
	});

	it('mounts an inline notification in a caller target instead of the fixed stack', async () => {
		const target = document.createElement('div');
		document.body.append(target);
		const handle = notify({ title: 'Inline', text: 'In flow', variant: 'inline', target, duration: 0 });
		await vi.runAllTicks();
		expect(target.querySelector('.rx-notification--inline.rx-notification--in-flow')).toBeTruthy();
		expect(document.querySelector('.rx-notification-stack .rx-notification--inline')).toBeNull();
		handle.close();
		await vi.runAllTicks();
		target.remove();
	});

	it('preserves source badge, alignment, content padding, and host geometry rules', () => {
		expect(notificationSource).toContain('width:22px;height:22px');
		expect(notificationSource).toContain('width:14px;height:14px');
		expect(notificationSource).toContain('.rx-notification--align-right .rx-notification__morph-content{text-align:right}');
		expect(notificationSource).toContain('.rx-notification--align-center .rx-notification__morph-content{text-align:center}');
		expect(notificationSource).toContain('padding-top:16px;padding-bottom:6px');
		expect(outletSource).toContain('gap: 12px; padding: 20px');
	});

	it('queues overflow and renders at most six in a stack', async () => {
		for (let index = 0; index < 8; index += 1) notify({ text: `Queued ${index}`, duration: 0 });
		await vi.runAllTicks();
		expect(notificationState.items).toHaveLength(8);
		const queued = [...document.querySelectorAll('.rx-notification-stack--top-center .rx-notification')]
			.filter((element) => element.textContent?.includes('Queued'));
		expect(queued).toHaveLength(6);
	});
});
