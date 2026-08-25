import type { Attachment } from 'svelte/attachments';
import type { ReactiveOption } from './proximity-glow';

export interface NeighborLightOptions {
	reach?: ReactiveOption<number>;
	exponent?: ReactiveOption<number>;
	strength?: ReactiveOption<number>;
	disabled?: ReactiveOption<boolean>;
	lampSelector?: string;
}

interface Receiver {
	node: HTMLElement;
	options: NeighborLightOptions;
	visible: boolean;
	previous: Record<'--rx-neighbor-ring' | '--rx-neighbor-fill' | '--rx-neighbor-lit', string>;
}

interface Lamp {
	node: HTMLElement;
	rgb: string;
	rect: DOMRect;
}

interface LightField {
	rgb: string;
	intensity: number;
	width: number;
	height: number;
	x: number;
	y: number;
}

const receivers = new Set<Receiver>();
let frame = 0;
let observing = false;
let intersectionObserver: IntersectionObserver | undefined;

const coreStops = [[.6, 0], [.42, 30], [.16, 58], [0, 82]] as const;
const softStops = [[.6, 0], [.27, 42], [.08, 66], [0, 85]] as const;
const fillStops = [[.85, 0], [.4, 42], [.12, 66], [0, 84]] as const;

function value<T>(option: ReactiveOption<T> | undefined, fallback: T): T {
	return typeof option === 'function' ? (option as () => T)() : (option ?? fallback);
}

function gradient(extra: number, field: LightField, stops: readonly (readonly [number, number])[]) {
	const width = field.width / 2 + extra;
	const height = field.height / 2 + extra;
	const edge = field.height / 2 / height;
	const colors = stops.map(([alpha, position]) => (
		` rgb(${field.rgb} / ${(alpha * field.intensity).toFixed(3)}) ${((edge + position / 100 * (1 - edge)) * 100).toFixed(1)}%`
	));
	return `radial-gradient(${width.toFixed(1)}px ${height.toFixed(1)}px at ${field.x.toFixed(1)}px ${field.y.toFixed(1)}px,${colors.join(',')})`;
}

function rgbFrom(node: HTMLElement): string | undefined {
	const style = getComputedStyle(node);
	const custom = style.getPropertyValue('--rx-color-rgb').trim() || style.getPropertyValue('--rx-color').trim();
	if (/^\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+\d+(?:\.\d+)?$/.test(custom)) return custom;
	const channels = style.backgroundColor.match(/[\d.]+/g)?.slice(0, 3);
	return channels?.length === 3 ? channels.join(' ') : undefined;
}

function lamps(selector: string): Lamp[] {
	const result: Lamp[] = [];
	for (const candidate of document.querySelectorAll<HTMLElement>(selector)) {
		const rgb = rgbFrom(candidate);
		if (rgb) result.push({ node: candidate, rgb, rect: candidate.getBoundingClientRect() });
	}
	return result;
}

function render() {
	frame = 0;
	const lampCache = new Map<string, Lamp[]>();
	for (const receiver of receivers) {
		if (!receiver.visible) continue;
		if (value(receiver.options.disabled, false)) {
			receiver.node.style.setProperty('--rx-neighbor-lit', '0');
			continue;
		}
		const nodeRect = receiver.node.getBoundingClientRect();
		const centerX = nodeRect.left + nodeRect.width / 2;
		const centerY = nodeRect.top + nodeRect.height / 2;
		const fields: LightField[] = [];
		const reach = Math.max(1, value(receiver.options.reach, 110));
		const exponent = value(receiver.options.exponent, 1.6);
		const strength = value(receiver.options.strength, 1.7);
		const selector = receiver.options.lampSelector ?? '[data-rx-lamp], [data-lamp], [color]';
		let nearbyLamps = lampCache.get(selector);
		if (!nearbyLamps) {
			nearbyLamps = lamps(selector);
			lampCache.set(selector, nearbyLamps);
		}
		for (const lamp of nearbyLamps) {
			if (lamp.node === receiver.node || lamp.node.contains(receiver.node) || receiver.node.contains(lamp.node)) continue;
			const lampX = Math.max(lamp.rect.left, Math.min(centerX, lamp.rect.right));
			const lampY = Math.max(lamp.rect.top, Math.min(centerY, lamp.rect.bottom));
			const nodeX = Math.max(nodeRect.left, Math.min(lampX, nodeRect.right));
			const nodeY = Math.max(nodeRect.top, Math.min(lampY, nodeRect.bottom));
			const intensity = Math.max(0, 1 - Math.hypot(lampX - nodeX, lampY - nodeY) / reach) ** exponent * strength;
			if (!intensity) continue;
			fields.push({
				rgb: lamp.rgb,
				intensity: Math.min(1, intensity),
				width: lamp.rect.width,
				height: lamp.rect.height,
				x: lamp.rect.left + lamp.rect.width / 2 - nodeRect.left,
				y: lamp.rect.top + lamp.rect.height / 2 - nodeRect.top
			});
		}
		if (!fields.length) {
			receiver.node.style.setProperty('--rx-neighbor-lit', '0');
			continue;
		}
		fields.sort((a, b) => a.intensity - b.intensity);
		receiver.node.style.setProperty('--rx-neighbor-ring', fields.flatMap((field) => [
			gradient(34, field, coreStops), gradient(72, field, softStops)
		]).join(','));
		receiver.node.style.setProperty('--rx-neighbor-fill', fields.map((field) => gradient(72, field, fillStops)).join(','));
		receiver.node.style.setProperty('--rx-neighbor-lit', '1');
	}
}

function schedule() {
	if (!frame) frame = requestAnimationFrame(render);
}

function startHub() {
	if (observing || typeof document === 'undefined') return;
	observing = true;
	window.addEventListener('scroll', schedule, { passive: true, capture: true });
	window.addEventListener('resize', schedule, { passive: true });
	if (typeof IntersectionObserver !== 'undefined') {
		intersectionObserver = new IntersectionObserver((changes) => {
			for (const change of changes) for (const receiver of receivers) {
				if (receiver.node === change.target) receiver.visible = change.isIntersecting;
			}
			schedule();
		});
	}
}

function stopHub() {
	if (!observing || receivers.size) return;
	window.removeEventListener('scroll', schedule, { capture: true });
	window.removeEventListener('resize', schedule);
	intersectionObserver?.disconnect();
	intersectionObserver = undefined;
	if (frame) cancelAnimationFrame(frame);
	frame = 0;
	observing = false;
}

/** Schedule a neighbor-light recompute after a lamp color or position changes. */
export function refreshNeighborLights() {
	if (receivers.size) schedule();
}

/** The source's 110px, exponent-1.6, strength-1.7 neighboring color field. */
export function neighborLight(options: NeighborLightOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		const previous = {
			'--rx-neighbor-ring': node.style.getPropertyValue('--rx-neighbor-ring'),
			'--rx-neighbor-fill': node.style.getPropertyValue('--rx-neighbor-fill'),
			'--rx-neighbor-lit': node.style.getPropertyValue('--rx-neighbor-lit')
		};
		const receiver: Receiver = { node, options, visible: true, previous };
		receivers.add(receiver);
		startHub();
		intersectionObserver?.observe(node);
		schedule();
		return () => {
			receivers.delete(receiver);
			intersectionObserver?.unobserve(node);
			for (const [name, prior] of Object.entries(previous)) {
				if (prior) node.style.setProperty(name, prior);
				else node.style.removeProperty(name);
			}
			stopHub();
		};
	};
}
