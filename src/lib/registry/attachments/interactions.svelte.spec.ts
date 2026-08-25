import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { magnetic } from './magnetic';
import { neighborLight } from './neighbor-light';
import { pointerPosition } from './pointer-position';
import { proximityGlow } from './proximity-glow';
import { ripple } from './ripple';
import { tilt3d } from './tilt3d';

type Cleanup = void | (() => void);

const cleanups: Cleanup[] = [];
const frames = new Map<number, FrameRequestCallback>();
let frameId = 0;
let reduced = false;
let coarse = false;
let intersectionCallback: IntersectionObserverCallback | undefined;

function attach(cleanup: Cleanup) {
	cleanups.push(cleanup);
}

function flushFrames() {
	const pending = [...frames.values()];
	frames.clear();
	for (const callback of pending) callback(performance.now());
}

function pointer(type: string, clientX: number, clientY: number, pointerType = 'mouse') {
	const event = new MouseEvent(type, { bubbles: true, clientX, clientY });
	Object.defineProperty(event, 'pointerType', { configurable: true, value: pointerType });
	return event as unknown as PointerEvent;
}

function rect(left: number, top: number, width: number, height: number): DOMRect {
	return {
		left, top, width, height, right: left + width, bottom: top + height,
		x: left, y: top, toJSON: () => ({})
	} as DOMRect;
}

beforeEach(() => {
	frames.clear();
	frameId = 0;
	reduced = false;
	coarse = false;
	intersectionCallback = undefined;
	vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
		frameId += 1;
		frames.set(frameId, callback);
		return frameId;
	}));
	vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => { frames.delete(id); }));
	vi.stubGlobal('IntersectionObserver', class MockIntersectionObserver {
		constructor(callback: IntersectionObserverCallback) { intersectionCallback = callback; }
		observe() {}
		unobserve() {}
		disconnect() {}
	});
	vi.mocked(matchMedia).mockImplementation((query: string) => ({
		matches: query.includes('reduced-motion') ? reduced : query.includes('pointer: coarse') ? coarse : false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}));
});

afterEach(() => {
	for (const cleanup of cleanups.splice(0)) if (typeof cleanup === 'function') cleanup();
	document.body.replaceChildren();
	vi.unstubAllGlobals();
});

describe('neighborLight', () => {
	it('recreates the source neighboring lamp fill and masked-ring fields', () => {
		const receiver = document.createElement('button');
		const lamp = document.createElement('button');
		lamp.dataset.rxLamp = '';
		lamp.style.setProperty('--rx-color-rgb', '25 91 255');
		document.body.append(receiver, lamp);
		vi.spyOn(receiver, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 40));
		vi.spyOn(lamp, 'getBoundingClientRect').mockReturnValue(rect(120, 0, 100, 40));
		attach(neighborLight()(receiver));
		flushFrames();
		expect(receiver.style.getPropertyValue('--rx-neighbor-lit')).toBe('1');
		expect(receiver.style.getPropertyValue('--rx-neighbor-ring')).toContain('radial-gradient(84.0px 54.0px at 170.0px 20.0px');
		expect(receiver.style.getPropertyValue('--rx-neighbor-ring')).toContain('rgb(25 91 255 / 0.600)');
		expect(receiver.style.getPropertyValue('--rx-neighbor-fill')).toContain('rgb(25 91 255 / 0.850)');
	});
});

describe('proximityGlow', () => {
	it('shares one listener, batches writes, invalidates bounds, and tears down', () => {
		const add = vi.spyOn(document, 'addEventListener');
		const remove = vi.spyOn(document, 'removeEventListener');
		const first = document.createElement('button');
		const second = document.createElement('button');
		document.body.append(first, second);
		const firstRect = vi.spyOn(first, 'getBoundingClientRect').mockReturnValue(rect(100, 100, 100, 40));
		vi.spyOn(second, 'getBoundingClientRect').mockReturnValue(rect(400, 100, 100, 40));

		attach(proximityGlow()(first));
		attach(proximityGlow()(second));
		for (let index = 0; index < 98; index += 1) {
			const extra = document.createElement('button');
			vi.spyOn(extra, 'getBoundingClientRect').mockReturnValue(rect(800 + index * 110, 100, 100, 40));
			attach(proximityGlow()(extra));
		}
		expect(add.mock.calls.filter(([type]) => type === 'pointermove')).toHaveLength(1);

		document.dispatchEvent(pointer('pointermove', 50, 120));
		expect(first.style.getPropertyValue('--rx-glow')).toBe('');
		flushFrames();
		expect(first.style.getPropertyValue('--rx-gx')).toBe('-50px');
		expect(first.style.getPropertyValue('--rx-gy')).toBe('20px');
		expect(first.style.getPropertyValue('--rx-glow')).toBe('0.750');
		expect(second.style.getPropertyValue('--rx-glow')).toBe('');
		expect(firstRect).toHaveBeenCalledTimes(1);

		window.dispatchEvent(new Event('scroll'));
		flushFrames();
		expect(firstRect).toHaveBeenCalledTimes(2);
		for (const cleanup of cleanups.splice(0)) if (typeof cleanup === 'function') cleanup();
		expect(remove.mock.calls.some(([type]) => type === 'pointermove')).toBe(true);
		expect(first.style.getPropertyValue('--rx-glow')).toBe('');
	});

	it('skips style writes while an observed element is offscreen', () => {
		const node = document.createElement('div');
		const bounds = vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
		attach(proximityGlow()(node));
		intersectionCallback?.([
			{ target: node, isIntersecting: false } as unknown as IntersectionObserverEntry
		], {} as IntersectionObserver);
		document.dispatchEvent(pointer('pointermove', 50, 50));
		flushFrames();
		expect(bounds).not.toHaveBeenCalled();
		expect(node.style.getPropertyValue('--rx-glow')).toBe('');
	});

	it('opts out on coarse pointers without removing keyboard-independent state', () => {
		coarse = true;
		const node = document.createElement('div');
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
		attach(proximityGlow()(node));
		document.dispatchEvent(pointer('pointermove', 50, 50));
		flushFrames();
		expect(node.style.getPropertyValue('--rx-glow')).toBe('');
	});

	it('retains the non-trailing proximity field under reduced motion', () => {
		reduced = true;
		const node = document.createElement('div');
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
		attach(proximityGlow()(node));
		document.dispatchEvent(pointer('pointermove', 50, 50));
		flushFrames();
		expect(node.style.getPropertyValue('--rx-glow')).toBe('1.000');
	});
});

describe('pointerPosition', () => {
	it('writes bounded percentages once per frame and centers on focus', () => {
		const node = document.createElement('div');
		const input = document.createElement('input');
		node.append(input);
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(10, 20, 200, 100));
		attach(pointerPosition()(node));
		node.dispatchEvent(pointer('pointermove', 60, 45));
		flushFrames();
		expect(node.style.getPropertyValue('--rx-mx')).toBe('25%');
		expect(node.style.getPropertyValue('--rx-my')).toBe('25%');
		expect(node.style.getPropertyValue('--rx-lit')).toBe('1');

		input.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
		expect(node.style.getPropertyValue('--rx-mx')).toBe('50%');
		expect(node.classList.contains('is-lit')).toBe(true);
	});

	it('samples immediately under reduced motion but retains the spotlight', () => {
		reduced = true;
		const node = document.createElement('div');
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
		attach(pointerPosition()(node));
		node.dispatchEvent(pointer('pointermove', 80, 20));
		expect(node.style.getPropertyValue('--rx-mx')).toBe('80%');
		expect(node.style.getPropertyValue('--rx-my')).toBe('20%');
		expect(frames.size).toBe(0);
	});
});

describe('magnetic', () => {
	it('matches the source .4 pull and .4 label parallax, then resets', () => {
		const node = document.createElement('button');
		const label = document.createElement('span');
		label.className = 'label';
		node.append(label);
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 40));
		attach(magnetic({ label: '.label' })(node));
		node.dispatchEvent(pointer('pointermove', 100, 40));
		expect(node.style.transform).toBe('translate(20.00px, 8.00px)');
		expect(label.style.transform).toBe('translate(8.00px, 3.20px)');
		node.dispatchEvent(pointer('pointerleave', 100, 40));
		expect(node.style.transform).toBe('');
	});

	it('does not displace for reduced motion or coarse pointers', () => {
		reduced = true;
		const node = document.createElement('button');
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 40));
		attach(magnetic()(node));
		node.dispatchEvent(pointer('pointermove', 100, 40));
		expect(node.style.transform).toBe('');
	});
});

describe('tilt3d', () => {
	it('writes the source ±9 degree field through one frame and resets on leave', () => {
		const node = document.createElement('article');
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
		attach(tilt3d()(node));
		node.dispatchEvent(pointer('pointermove', 100, 0));
		expect(node.classList.contains('is-active')).toBe(true);
		flushFrames();
		expect(node.style.getPropertyValue('--rx-tilt-x')).toBe('9deg');
		expect(node.style.getPropertyValue('--rx-tilt-y')).toBe('9deg');
		node.dispatchEvent(pointer('pointerleave', 100, 0));
		expect(node.style.getPropertyValue('--rx-tilt-x')).toBe('0deg');
		expect(node.classList.contains('is-active')).toBe(false);
	});

	it('retains focus state while removing reduced-motion displacement', () => {
		reduced = true;
		const node = document.createElement('article');
		attach(tilt3d()(node));
		node.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
		expect(node.classList.contains('is-active')).toBe(true);
		expect(node.style.getPropertyValue('--rx-tilt-x')).toBe('0deg');
	});
});

describe('ripple', () => {
	it('uses farthest-corner geometry, source paint, dual timing, and a six-node cap', () => {
		const animations: Array<{ keyframes: Keyframe[]; options: KeyframeAnimationOptions; animation: Animation }> = [];
		vi.mocked(Element.prototype.animate).mockImplementation((keyframes, options) => {
			const animation = { addEventListener: vi.fn(), cancel: vi.fn() } as unknown as Animation;
			animations.push({ keyframes: keyframes as Keyframe[], options: options as KeyframeAnimationOptions, animation });
			return animation;
		});
		const node = document.createElement('button');
		document.body.append(node);
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 40));
		attach(ripple()(node));
		for (let count = 0; count < 7; count += 1) node.dispatchEvent(pointer('pointerdown', 10, 20));

		const circles = node.querySelectorAll<HTMLElement>('[data-rx-ripple]');
		expect(circles).toHaveLength(6);
		expect(Number.parseFloat(circles[0].style.width)).toBeCloseTo(Math.hypot(90, 20) * 2, 4);
		expect(circles[0].style.left).toBe('10px');
		expect(circles[0].style.background).toContain('/ .38) 0%');
		expect(circles[0].style.background).toContain('/ .20) 24%');
		expect(circles[0].style.background).toContain('transparent 76%');
		expect(animations[0].options).toMatchObject({ duration: 780, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
		expect(animations[1].options).toMatchObject({ duration: 780, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', fill: 'forwards' });
		expect(vi.mocked(animations[0].animation.cancel)).toHaveBeenCalledOnce();
	});

	it('supports the separately selectable source press tilt and reset', () => {
		const node = document.createElement('button');
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 40));
		attach(ripple({ pressTilt: true })(node));
		node.dispatchEvent(pointer('pointerdown', 100, 40));
		expect(node.style.transform).toBe('perspective(450px) rotateX(-12.00deg) rotateY(8.00deg) scale(.96)');
		node.dispatchEvent(pointer('pointerup', 100, 40));
		expect(node.style.transform).toBe('');
	});

	it('suppresses decorative ripple and press displacement for reduced motion', () => {
		reduced = true;
		const node = document.createElement('button');
		vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 40));
		attach(ripple({ pressTilt: true })(node));
		node.dispatchEvent(pointer('pointerdown', 50, 20));
		expect(node.querySelector('[data-rx-ripple]')).toBeNull();
		expect(node.style.transform).toBe('');
	});
});
