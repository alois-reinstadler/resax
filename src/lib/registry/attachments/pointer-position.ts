import type { Attachment } from 'svelte/attachments';
import type { ReactiveOption } from './proximity-glow';

export interface PointerPositionOptions {
	disabled?: ReactiveOption<boolean>;
	activeClass?: string;
	focus?: boolean;
	onActiveChange?: (active: boolean, source: 'pointer' | 'focus') => void;
}

function value(option: ReactiveOption<boolean> | undefined): boolean {
	return typeof option === 'function' ? option() : (option ?? false);
}

function reducedMotion(): boolean {
	return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Bounded pointer coordinates for spotlight layers, with a keyboard-focus center. */
export function pointerPosition(options: PointerPositionOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		const activeClass = options.activeClass ?? 'is-lit';
		const previousX = node.style.getPropertyValue('--rx-mx');
		const previousY = node.style.getPropertyValue('--rx-my');
		const previousLit = node.style.getPropertyValue('--rx-lit');
		let rect: DOMRect | null = null;
		let frame = 0;
		let x = 0;
		let y = 0;
		let pointerActive = false;
		let focusActive = false;
		let boundsListening = false;

		const setActive = (active: boolean, source: 'pointer' | 'focus') => {
			node.classList.toggle(activeClass, active);
			node.style.setProperty('--rx-lit', active ? '1' : '0');
			options.onActiveChange?.(active, source);
		};
		const center = () => {
			node.style.setProperty('--rx-mx', '50%');
			node.style.setProperty('--rx-my', '50%');
		};
		const write = () => {
			frame = 0;
			if (value(options.disabled)) return;
			rect ??= node.getBoundingClientRect();
			if (!rect.width || !rect.height) return;
			node.style.setProperty('--rx-mx', `${((x - rect.left) / rect.width) * 100}%`);
			node.style.setProperty('--rx-my', `${((y - rect.top) / rect.height) * 100}%`);
		};
		const invalidate = () => { rect = null; };
		const listenToBounds = () => {
			if (boundsListening) return;
			boundsListening = true;
			window.addEventListener('scroll', invalidate, { passive: true, capture: true });
			window.addEventListener('resize', invalidate, { passive: true });
		};
		const unlistenToBounds = () => {
			if (!boundsListening) return;
			boundsListening = false;
			window.removeEventListener('scroll', invalidate, { capture: true });
			window.removeEventListener('resize', invalidate);
		};
		const onPointerEnter = (event: PointerEvent) => {
			if (value(options.disabled) || (event.pointerType && event.pointerType !== 'mouse')) return;
			pointerActive = true;
			rect = null;
			listenToBounds();
			setActive(true, 'pointer');
		};
		const onPointerMove = (event: PointerEvent) => {
			if (value(options.disabled) || (event.pointerType && event.pointerType !== 'mouse')) return;
			x = event.clientX;
			y = event.clientY;
			if (!pointerActive) onPointerEnter(event);
			if (reducedMotion()) write();
			else if (!frame) frame = requestAnimationFrame(write);
		};
		const onPointerLeave = () => {
			pointerActive = false;
			if (frame) cancelAnimationFrame(frame);
			frame = 0;
			rect = null;
			unlistenToBounds();
			if (!focusActive) setActive(false, 'pointer');
		};
		const onFocusIn = () => {
			if (options.focus === false || value(options.disabled)) return;
			focusActive = true;
			center();
			setActive(true, 'focus');
		};
		const onFocusOut = (event: FocusEvent) => {
			if (event.relatedTarget instanceof Node && node.contains(event.relatedTarget)) return;
			focusActive = false;
			if (!pointerActive) setActive(false, 'focus');
		};

		node.addEventListener('pointerenter', onPointerEnter);
		node.addEventListener('pointermove', onPointerMove);
		node.addEventListener('pointerleave', onPointerLeave);
		node.addEventListener('focusin', onFocusIn);
		node.addEventListener('focusout', onFocusOut);
		return () => {
			node.removeEventListener('pointerenter', onPointerEnter);
			node.removeEventListener('pointermove', onPointerMove);
			node.removeEventListener('pointerleave', onPointerLeave);
			node.removeEventListener('focusin', onFocusIn);
			node.removeEventListener('focusout', onFocusOut);
			if (frame) cancelAnimationFrame(frame);
			unlistenToBounds();
			node.classList.remove(activeClass);
			for (const [name, prior] of [['--rx-mx', previousX], ['--rx-my', previousY], ['--rx-lit', previousLit]]) {
				if (prior) node.style.setProperty(name, prior);
				else node.style.removeProperty(name);
			}
		};
	};
}
