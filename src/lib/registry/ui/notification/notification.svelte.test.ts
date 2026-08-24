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
		const toast = await screen.findByRole('status');
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
		success.update({ text: 'Updated', position: 'bottom-left' });
		expect(notificationState.items[0]).toMatchObject({ text: 'Updated', position: 'bottom-left' });
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
