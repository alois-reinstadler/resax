import type { Attachment } from 'svelte/attachments';

export type ReactiveOption<T> = T | (() => T);

export interface ProximityGlowOptions {
	radius?: ReactiveOption<number>;
	disabled?: ReactiveOption<boolean>;
	coarsePointer?: 'allow' | 'disable';
}

interface GlowEntry {
	node: HTMLElement;
	options: ProximityGlowOptions;
	rect: DOMRect | null;
	visible: boolean;
	lastIntensity: number;
	previous: Record<'--rx-gx' | '--rx-gy' | '--rx-glow', string>;
}

const entries = new Set<GlowEntry>();
let pointerX = 0;
let pointerY = 0;
let pointerKnown = false;
let frame = 0;
let observing = false;
let intersectionObserver: IntersectionObserver | undefined;

function value<T>(option: ReactiveOption<T> | undefined, fallback: T): T {
	return typeof option === 'function' ? (option as () => T)() : (option ?? fallback);
}

function coarsePointer(): boolean {
	return typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
}

function setIntensity(entry: GlowEntry, intensity: number) {
	if (intensity === 0 && entry.lastIntensity === 0) return;
	entry.node.style.setProperty('--rx-glow', intensity.toFixed(3));
	entry.lastIntensity = intensity;
}

function render() {
	frame = 0;
	if (!pointerKnown) return;
	const isCoarse = coarsePointer();
	for (const entry of entries) {
		if (!entry.visible) continue;
		if (
			value(entry.options.disabled, false)
			|| (entry.options.coarsePointer !== 'allow' && isCoarse)
		) {
			setIntensity(entry, 0);
			continue;
		}
		entry.rect ??= entry.node.getBoundingClientRect();
		const rect = entry.rect;
		const nearestX = Math.max(rect.left, Math.min(pointerX, rect.right));
		const nearestY = Math.max(rect.top, Math.min(pointerY, rect.bottom));
		const radius = Math.max(1, value(entry.options.radius, 200));
		const intensity = Math.max(0, 1 - Math.hypot(pointerX - nearestX, pointerY - nearestY) / radius);
		if (intensity === 0 && entry.lastIntensity === 0) continue;
		entry.node.style.setProperty('--rx-gx', `${pointerX - rect.left}px`);
		entry.node.style.setProperty('--rx-gy', `${pointerY - rect.top}px`);
		setIntensity(entry, intensity);
	}
}

function schedule() {
	if (!frame) frame = requestAnimationFrame(render);
}

function onPointerMove(event: PointerEvent) {
	pointerX = event.clientX;
	pointerY = event.clientY;
	pointerKnown = true;
	schedule();
}

function invalidateRects() {
	for (const entry of entries) entry.rect = null;
	if (pointerKnown) schedule();
}

function startHub() {
	if (observing || typeof document === 'undefined') return;
	observing = true;
	document.addEventListener('pointermove', onPointerMove, { passive: true });
	window.addEventListener('scroll', invalidateRects, { passive: true, capture: true });
	window.addEventListener('resize', invalidateRects, { passive: true });
	if (typeof IntersectionObserver !== 'undefined') {
		intersectionObserver = new IntersectionObserver((changes) => {
			for (const change of changes) {
				for (const entry of entries) {
					if (entry.node !== change.target) continue;
					entry.visible = change.isIntersecting;
					if (change.isIntersecting) entry.rect = null;
				}
			}
		});
	}
}

function stopHub() {
	if (!observing || entries.size) return;
	document.removeEventListener('pointermove', onPointerMove);
	window.removeEventListener('scroll', invalidateRects, { capture: true });
	window.removeEventListener('resize', invalidateRects);
	intersectionObserver?.disconnect();
	intersectionObserver = undefined;
	if (frame) cancelAnimationFrame(frame);
	frame = 0;
	pointerKnown = false;
	observing = false;
}

/**
 * Source-shaped global proximity field: one document pointer listener and one
 * rAF batch serve every attached element.
 */
export function proximityGlow(options: ProximityGlowOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		const previous = {
			'--rx-gx': node.style.getPropertyValue('--rx-gx'),
			'--rx-gy': node.style.getPropertyValue('--rx-gy'),
			'--rx-glow': node.style.getPropertyValue('--rx-glow')
		};
		const entry: GlowEntry = { node, options, rect: null, visible: true, lastIntensity: 0, previous };
		entries.add(entry);
		startHub();
		intersectionObserver?.observe(node);
		if (pointerKnown) schedule();

		return () => {
			entries.delete(entry);
			intersectionObserver?.unobserve(node);
			for (const [name, prior] of Object.entries(previous)) {
				if (prior) node.style.setProperty(name, prior);
				else node.style.removeProperty(name);
			}
			stopHub();
		};
	};
}
