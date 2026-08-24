import type { Attachment } from 'svelte/attachments';
import type { RxColor } from '$lib/registry/lib/color';
import { getColor } from '$lib/registry/lib/color';

export type CursorVariant = 'default' | 'blend' | 'blob' | 'glow' | 'label' | 'magnet' | 'reticle';
export interface CursorOptions { variant?: CursorVariant; color?: RxColor; size?: number; label?: string; selector?: string; disabled?: boolean; }

export function cursor(options: CursorOptions = {}): Attachment<HTMLElement> {
	return (boundary) => {
		if (typeof document === 'undefined' || typeof window === 'undefined' || options.disabled) return;
		const coarse = window.matchMedia?.('(pointer: coarse)').matches;
		const forced = window.matchMedia?.('(forced-colors: active)').matches;
		const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
		if (coarse || forced || reduced) return;

		const variant = options.variant ?? 'default';
		const size = Math.max(8, options.size ?? 28);
		const previousCursor = boundary.style.cursor;
		const overlay = document.createElement('div');
		overlay.dataset.rxCursor = variant;
		overlay.setAttribute('aria-hidden', 'true');
		overlay.style.cssText = `position:fixed;z-index:2147483646;left:0;top:0;width:${size}px;height:${size}px;border:1.5px solid rgb(var(--rx-cursor-color,var(--rx-primary)));border-radius:999px;pointer-events:none;opacity:0;transform:translate3d(-100px,-100px,0);transition:width 150ms,height 150ms,opacity 120ms,background 150ms;display:grid;place-items:center;color:rgb(var(--rx-light));background:rgb(var(--rx-cursor-color,var(--rx-primary))/.08);box-shadow:${variant === 'glow' ? '0 0 22px rgb(var(--rx-cursor-color,var(--rx-primary))/.65)' : 'none'};mix-blend-mode:${variant === 'blend' ? 'difference' : 'normal'};font:600 11px/1 sans-serif;white-space:nowrap;`;
		const cursorColor = getColor(options.color);
		if (cursorColor) overlay.style.setProperty('--rx-cursor-color', cursorColor);
		if (variant === 'reticle') overlay.style.borderRadius = '0';
		if (variant === 'blob') overlay.style.borderRadius = '45% 55% 52% 48%';
		document.body.append(overlay);
		boundary.style.cursor = 'none';

		let frame = 0;
		let x = -100, y = -100, targetX = x, targetY = y;
		function targetFrom(event: PointerEvent): HTMLElement | null {
			const path = event.composedPath();
			for (const entry of path) if (entry instanceof HTMLElement && boundary.contains(entry) && (!options.selector || entry.matches(options.selector))) return entry;
			return null;
		}
		function paint() {
			frame = 0; x += (targetX - x) * .62; y += (targetY - y) * .62;
			overlay.style.transform = `translate3d(${x - overlay.offsetWidth / 2}px,${y - overlay.offsetHeight / 2}px,0)`;
			if (Math.abs(targetX-x)>.1 || Math.abs(targetY-y)>.1) frame=requestAnimationFrame(paint);
		}
		function move(event: PointerEvent) {
			if (event.pointerType && event.pointerType !== 'mouse') return;
			const target = targetFrom(event);
			if (!target) { overlay.style.opacity='0'; return; }
			overlay.style.opacity = document.visibilityState === 'visible' ? '1' : '0';
			const magnet = target.closest<HTMLElement>('[data-rx-cursor-magnet]');
			if (variant === 'magnet' && magnet && boundary.contains(magnet)) { const r=magnet.getBoundingClientRect(); targetX=r.left+r.width/2; targetY=r.top+r.height/2; }
			else { targetX=event.clientX; targetY=event.clientY; }
			const text = target.closest<HTMLElement>('[data-rx-cursor-label]')?.dataset.rxCursorLabel ?? options.label ?? '';
			overlay.textContent = variant === 'label' ? text : '';
			if (variant === 'label' && text) { overlay.style.width='auto'; overlay.style.padding='0 9px'; }
			else { overlay.style.width=`${size}px`; overlay.style.padding='0'; }
			if (!frame) frame=requestAnimationFrame(paint);
		}
		function leave() { overlay.style.opacity='0'; }
		function visibility() { if (document.visibilityState !== 'visible') leave(); }
		boundary.addEventListener('pointermove', move);
		boundary.addEventListener('pointerleave', leave);
		document.addEventListener('visibilitychange', visibility);
		return () => {
			boundary.removeEventListener('pointermove', move); boundary.removeEventListener('pointerleave', leave);
			document.removeEventListener('visibilitychange', visibility); if (frame) cancelAnimationFrame(frame);
			overlay.remove(); boundary.style.cursor = previousCursor;
		};
	};
}
