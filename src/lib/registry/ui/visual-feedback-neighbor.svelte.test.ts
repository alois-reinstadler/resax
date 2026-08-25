import { cleanup, render } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { refreshNeighborLights } from '../attachments/neighbor-light';
import Alert from './alert/alert.svelte';
import Avatar from './avatar/avatar.svelte';
import Badge from './badge/badge.svelte';

const frames = new Map<number, FrameRequestCallback>();
let frameId = 0;

function rect(left: number, top: number, width: number, height: number): DOMRect {
	return { left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON: () => ({}) } as DOMRect;
}

function flushFrames() {
	const pending = [...frames.values()];
	frames.clear();
	for (const callback of pending) callback(performance.now());
}

beforeEach(() => {
	frames.clear();
	frameId = 0;
	vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
		frames.set(++frameId, callback);
		return frameId;
	}));
	vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => frames.delete(id)));
	vi.stubGlobal('IntersectionObserver', class MockIntersectionObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	});
});

afterEach(() => {
	cleanup();
	document.body.replaceChildren();
	vi.unstubAllGlobals();
});

describe('visual feedback neighboring light receivers', () => {
	it('feeds source-shaped cross-component fill and ring fields to base Avatar, Badge, and Alert, then cleans up', () => {
		const lamp = document.createElement('button');
		lamp.dataset.rxLamp = '';
		lamp.style.setProperty('--rx-color-rgb', '25 91 255');
		document.body.append(lamp);
		vi.spyOn(lamp, 'getBoundingClientRect').mockReturnValue(rect(120, 0, 40, 40));

		const avatarView = render(Avatar, { fallback: 'RX', variant: 'base' });
		const badgeView = render(Badge, { content: 'New', variant: 'default' });
		const alertView = render(Alert, { title: 'Notice', variant: 'default' });
		const receivers = [
			avatarView.container.querySelector('.rx-avatar') as HTMLElement,
			badgeView.container.querySelector('.rx-badge__pill') as HTMLElement,
			alertView.container.querySelector('.rx-alert') as HTMLElement
		];
		vi.spyOn(receivers[0], 'getBoundingClientRect').mockReturnValue(rect(0, 0, 40, 40));
		vi.spyOn(receivers[1], 'getBoundingClientRect').mockReturnValue(rect(0, 50, 56, 24));
		vi.spyOn(receivers[2], 'getBoundingClientRect').mockReturnValue(rect(0, 100, 100, 40));

		refreshNeighborLights();
		flushFrames();
		for (const receiver of receivers) {
			expect(receiver.style.getPropertyValue('--rx-neighbor-lit')).toBe('1');
			expect(receiver.style.getPropertyValue('--rx-neighbor-fill')).toContain('rgb(25 91 255 /');
			expect(receiver.style.getPropertyValue('--rx-neighbor-ring')).toContain('radial-gradient(');
		}

		avatarView.unmount();
		badgeView.unmount();
		alertView.unmount();
		for (const receiver of receivers) {
			expect(receiver.style.getPropertyValue('--rx-neighbor-lit')).toBe('');
			expect(receiver.style.getPropertyValue('--rx-neighbor-fill')).toBe('');
			expect(receiver.style.getPropertyValue('--rx-neighbor-ring')).toBe('');
		}
	});
});
