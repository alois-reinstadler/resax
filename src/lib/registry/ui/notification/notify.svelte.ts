import { mount, unmount, type Snippet } from 'svelte';
import type { RxColor } from '$lib/registry/lib/color';
import NotificationOutlet from './notification-outlet.svelte';

export type NotifyVariant = 'base' | 'default' | 'banner' | 'card' | 'glow' | 'inline' | 'snackbar';
export type NotifySurface = 'solid' | 'fluent' | 'outline' | 'glass';
export type NotifyPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
export type NotifyState = 'success' | 'error' | 'warn' | 'loading' | 'info';
export type NotifyAction = { label: string; onClick: () => void };

export type NotifyOptions = {
	title?: string;
	text?: string;
	description?: string;
	state?: NotifyState;
	action?: NotifyAction;
	content?: Snippet;
	color?: RxColor;
	variant?: NotifyVariant;
	surface?: NotifySurface;
	roundness?: number;
	position?: NotifyPosition;
	target?: HTMLElement;
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

export type NotificationItem = Required<Pick<NotifyOptions, 'variant' | 'surface' | 'roundness' | 'position' | 'duration' | 'progress' | 'closable'>> &
	Omit<NotifyOptions, 'variant' | 'surface' | 'roundness' | 'position' | 'duration' | 'progress' | 'closable'> & {
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

function defaultPosition(variant: NotifyVariant): NotifyPosition {
	if (variant === 'card' || variant === 'glow') return 'top-right';
	if (variant === 'snackbar') return 'bottom-center';
	return 'top-center';
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
	const variant = options.variant ?? 'base';
	const item: NotificationItem = {
		id: nextId++, variant, surface: options.surface ?? 'solid', roundness: Math.max(0, options.roundness ?? 16), position: options.position ?? defaultPosition(variant),
		duration: Math.max(0, options.duration ?? 4000), progress: options.progress ?? false,
		closable: options.closable ?? (variant !== 'base' && variant !== 'default'), paused: false, title: options.title, text: options.text,
		description: options.description, state: options.state, action: options.action,
		content: options.content, color: options.color ?? stateColor(options.state), icon: options.icon, target: options.target, onClick: options.onClick, onClose: options.onClose
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
			if (partial.roundness !== undefined) current.roundness = Math.max(0, partial.roundness);
			if (partial.position !== undefined) current.position = partial.position;
			if (partial.variant !== undefined) current.variant = partial.variant;
			current.paused = false;
			schedule(current);
		}
	};
}

type NotifyShortcut = (value: string | NotifyOptions) => NotifyHandle;
function stateColor(state: NotifyState | undefined): RxColor | undefined {
	if (state === 'success') return 'success';
	if (state === 'error') return 'danger';
	if (state === 'warn') return 'warn';
	if (state === 'info') return 'primary';
	return undefined;
}

function shortcut(value: string | NotifyOptions, state: NotifyState, duration?: number) {
	const options = typeof value === 'string' ? { title: value } : value;
	return createNotification({ ...options, state, color: options.color ?? stateColor(state), duration: options.duration ?? duration });
}

export const notify = Object.assign(createNotification, {
	success: ((value) => shortcut(value, 'success')) as NotifyShortcut,
	error: ((value) => shortcut(value, 'error')) as NotifyShortcut,
	danger: ((value) => shortcut(value, 'error')) as NotifyShortcut,
	warn: ((value) => shortcut(value, 'warn')) as NotifyShortcut,
	info: ((value) => shortcut(value, 'info')) as NotifyShortcut,
	primary: ((value) => shortcut(value, 'info')) as NotifyShortcut,
	loading: ((value) => shortcut(value, 'loading', 0)) as NotifyShortcut
});

export function resetNotificationsForTesting() {
	for (const item of [...notificationState.items]) dismissNotification(item.id);
	nextId = 1;
}
