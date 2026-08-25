import { fireEvent, screen } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { notify } from './index';
import { notificationState, resetNotificationsForTesting } from './notify.svelte';

describe('notification engine', () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => { resetNotificationsForTesting(); vi.useRealTimers(); });

	it('adds a notification and auto-dismisses it', async () => {
		notify({ text: 'Saved', duration: 1000 });
		expect(notificationState.items).toHaveLength(1);
		expect(notificationState.items[0].variant).toBe('base');
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
		expect(toast.style.getPropertyValue('--rx-notify-roundness')).toBe('22px');
		await fireEvent.pointerEnter(toast);
		expect(toast.classList.contains('rx-notification--expanded')).toBe(true);
		await fireEvent.pointerLeave(toast);
		expect(toast.classList.contains('rx-notification--expanded')).toBe(false);
	});

	it('queues overflow and renders at most six in a stack', async () => {
		for (let index = 0; index < 8; index += 1) notify({ text: `Queued ${index}`, duration: 0 });
		await vi.runAllTicks();
		expect(notificationState.items).toHaveLength(8);
		const queued = [...document.querySelectorAll('.rx-notification-stack--top-right .rx-notification')]
			.filter((element) => element.textContent?.includes('Queued'));
		expect(queued).toHaveLength(6);
	});
});
