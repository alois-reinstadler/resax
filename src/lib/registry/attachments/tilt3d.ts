import type { Attachment } from 'svelte/attachments';
import type { ReactiveOption } from './proximity-glow';

export interface Tilt3dOptions {
	degrees?: ReactiveOption<number>;
	disabled?: ReactiveOption<boolean>;
	activeClass?: string;
	focus?: boolean;
}

function value<T>(option: ReactiveOption<T> | undefined, fallback: T): T {
	return typeof option === 'function' ? (option as () => T)() : (option ?? fallback);
}

function displacementDisabled(): boolean {
	return typeof matchMedia === 'function' && (
		matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches
	);
}

/** Pointer-following ±9° card tilt with one rAF write per frame and focus state. */
export function tilt3d(options: Tilt3dOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		const activeClass = options.activeClass ?? 'is-active';
		const previousX = node.style.getPropertyValue('--rx-tilt-x');
		const previousY = node.style.getPropertyValue('--rx-tilt-y');
		let rect: DOMRect | null = null;
		let frame = 0;
		let x = 0;
		let y = 0;
		let pointerActive = false;
		let focusActive = false;
		let boundsListening = false;

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
		const center = () => {
			node.style.setProperty('--rx-tilt-x', '0deg');
			node.style.setProperty('--rx-tilt-y', '0deg');
		};
		const render = () => {
			frame = 0;
			if (value(options.disabled, false) || displacementDisabled()) return;
			rect ??= node.getBoundingClientRect();
			if (!rect.width || !rect.height) return;
			const horizontal = (x - rect.left) / rect.width;
			const vertical = (y - rect.top) / rect.height;
			const degrees = value(options.degrees, 9);
			node.style.setProperty('--rx-tilt-y', `${(horizontal - 0.5) * 2 * degrees}deg`);
			node.style.setProperty('--rx-tilt-x', `${-(vertical - 0.5) * 2 * degrees}deg`);
		};
		const onPointerEnter = (event: PointerEvent) => {
			if (value(options.disabled, false) || (event.pointerType && event.pointerType !== 'mouse')) return;
			pointerActive = true;
			rect = null;
			node.classList.add(activeClass);
			listenToBounds();
			if (displacementDisabled()) center();
		};
		const onPointerMove = (event: PointerEvent) => {
			if (value(options.disabled, false) || (event.pointerType && event.pointerType !== 'mouse')) return;
			x = event.clientX;
			y = event.clientY;
			if (!pointerActive) onPointerEnter(event);
			if (!frame) frame = requestAnimationFrame(render);
		};
		const onPointerLeave = () => {
			pointerActive = false;
			if (frame) cancelAnimationFrame(frame);
			frame = 0;
			rect = null;
			unlistenToBounds();
			center();
			if (!focusActive) node.classList.remove(activeClass);
		};
		const onFocusIn = () => {
			if (options.focus === false || value(options.disabled, false)) return;
			focusActive = true;
			center();
			node.classList.add(activeClass);
		};
		const onFocusOut = (event: FocusEvent) => {
			if (event.relatedTarget instanceof Node && node.contains(event.relatedTarget)) return;
			focusActive = false;
			if (!pointerActive) node.classList.remove(activeClass);
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
			if (previousX) node.style.setProperty('--rx-tilt-x', previousX);
			else node.style.removeProperty('--rx-tilt-x');
			if (previousY) node.style.setProperty('--rx-tilt-y', previousY);
			else node.style.removeProperty('--rx-tilt-y');
		};
	};
}
