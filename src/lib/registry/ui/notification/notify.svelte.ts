import { mount, unmount, type Snippet } from 'svelte';
import type { RxColor } from '../../lib/color';
import NotificationOutlet from './notification-outlet.svelte';

export type NotifyVariant = 'default' | 'banner' | 'card' | 'glow' | 'inline' | 'snackbar';
export type NotifyPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export type NotifyOptions = {
	title?: string;
	text?: string;
	content?: Snippet;
	color?: RxColor;
	variant?: NotifyVariant;
	position?: NotifyPosition;
	duration?: number;
	progress?: boolean;
	closable?: boolean;
	icon?: Snippet;
	onClick?: () => void;
	onClose?: () => void;
};

export type NotifyHandle = {
	close: () => void;
	update: (partial: Partial<NotifyOptions>) => void;
};

export type NotificationItem = Required<Pick<NotifyOptions, 'variant' | 'position' | 'duration' | 'progress' | 'closable'>> &
	Omit<NotifyOptions, 'variant' | 'position' | 'duration' | 'progress' | 'closable'> & {
		id: number;
		paused: boolean;
	};

export const notificationState = $state<{ items: NotificationItem[] }>({ items: [] });

let nextId = 1;
let outletCount = 0;
let lazyOutlet: ReturnType<typeof mount> | undefined;
const timers = new Map<number, ReturnType<typeof setTimeout>>();
const remaining = new Map<number, number>();
const startedAt = new Map<number, number>();

function clearTimer(id: number) {
	const timer = timers.get(id);
	if (timer !== undefined) clearTimeout(timer);
	timers.delete(id);
	startedAt.delete(id);
}

function schedule(item: NotificationItem, delay = item.duration) {
	clearTimer(item.id);
	if (delay <= 0) return;
	remaining.set(item.id, delay);
	startedAt.set(item.id, Date.now());
	timers.set(item.id, setTimeout(() => dismissNotification(item.id), delay));
}

export function dismissNotification(id: number) {
	const item = notificationState.items.find((candidate) => candidate.id === id);
	if (!item) return;
	clearTimer(id);
	remaining.delete(id);
	notificationState.items = notificationState.items.filter((candidate) => candidate.id !== id);
	item.onClose?.();
}

function ensureOutlet() {
	if (outletCount || lazyOutlet) return;
	lazyOutlet = mount(NotificationOutlet, { target: document.body });
}

export function registerNotificationOutlet() {
	outletCount += 1;
	if (outletCount > 1 && lazyOutlet) {
		const mounted = lazyOutlet;
		lazyOutlet = undefined;
		void unmount(mounted);
	}
	return () => { outletCount = Math.max(0, outletCount - 1); };
}

export function pauseNotification(id: number) {
	const item = notificationState.items.find((candidate) => candidate.id === id);
	if (!item || item.paused || item.duration === 0) return;
	const elapsed = Date.now() - (startedAt.get(id) ?? Date.now());
	remaining.set(id, Math.max(0, (remaining.get(id) ?? item.duration) - elapsed));
	clearTimer(id);
	item.paused = true;
}

export function resumeNotification(id: number) {
	const item = notificationState.items.find((candidate) => candidate.id === id);
	if (!item || !item.paused || item.duration === 0) return;
	item.paused = false;
	schedule(item, remaining.get(id) ?? item.duration);
}

function createNotification(options: NotifyOptions): NotifyHandle {
	if (typeof document === 'undefined') {
		throw new Error('notify() is client-only and cannot be called during server rendering.');
	}
	ensureOutlet();
	const item: NotificationItem = {
		id: nextId++, variant: options.variant ?? 'default', position: options.position ?? 'top-right',
		duration: Math.max(0, options.duration ?? 4000), progress: options.progress ?? false,
		closable: options.closable ?? true, paused: false, title: options.title, text: options.text,
		content: options.content, color: options.color, icon: options.icon, onClick: options.onClick, onClose: options.onClose
	};
	notificationState.items.push(item);
	schedule(item);
	return {
		close: () => dismissNotification(item.id),
		update: (partial) => {
			const current = notificationState.items.find((candidate) => candidate.id === item.id);
			if (!current) return;
			Object.assign(current, partial);
			if (partial.duration !== undefined) current.duration = Math.max(0, partial.duration);
			if (partial.position !== undefined) current.position = partial.position;
			if (partial.variant !== undefined) current.variant = partial.variant;
			current.paused = false;
			schedule(current);
		}
	};
}

type NotifyShortcut = (value: string | NotifyOptions) => NotifyHandle;
export const notify = Object.assign(createNotification, {
	success: ((value) => createNotification(typeof value === 'string' ? { text: value, color: 'success' } : { ...value, color: value.color ?? 'success' })) as NotifyShortcut,
	danger: ((value) => createNotification(typeof value === 'string' ? { text: value, color: 'danger' } : { ...value, color: value.color ?? 'danger' })) as NotifyShortcut,
	warn: ((value) => createNotification(typeof value === 'string' ? { text: value, color: 'warn' } : { ...value, color: value.color ?? 'warn' })) as NotifyShortcut,
	primary: ((value) => createNotification(typeof value === 'string' ? { text: value, color: 'primary' } : { ...value, color: value.color ?? 'primary' })) as NotifyShortcut
});

export function resetNotificationsForTesting() {
	for (const item of [...notificationState.items]) dismissNotification(item.id);
	nextId = 1;
}
