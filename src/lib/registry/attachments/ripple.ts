import type { Attachment } from 'svelte/attachments';

export interface RippleOptions {
	color?: string;
}

export function ripple(options: RippleOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		const computed = getComputedStyle(node);
		const changedPosition = computed.position === 'static';
		const changedOverflow = computed.overflow === 'visible';
		const previousPosition = node.style.position;
		const previousOverflow = node.style.overflow;
		if (changedPosition) node.style.position = 'relative';
		if (changedOverflow) node.style.overflow = 'hidden';

		const onPointerDown = (event: PointerEvent) => {
			if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			const rect = node.getBoundingClientRect();
			const diameter = Math.hypot(rect.width, rect.height) * 2;
			const circle = document.createElement('span');
			circle.setAttribute('aria-hidden', 'true');
			circle.setAttribute('data-rx-ripple', '');
			Object.assign(circle.style, {
				position: 'absolute', pointerEvents: 'none', borderRadius: '9999px',
				width: `${diameter}px`, height: `${diameter}px`,
				left: `${event.clientX - rect.left - diameter / 2}px`,
				top: `${event.clientY - rect.top - diameter / 2}px`,
				background: options.color ?? 'currentColor', opacity: '0.18', transform: 'scale(0)'
			});
			node.append(circle);
			const animation = circle.animate(
				[{ transform: 'scale(0)', opacity: 0.18 }, { transform: 'scale(1)', opacity: 0 }],
				{ duration: 600, easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)' }
			);
			animation.addEventListener('finish', () => circle.remove(), { once: true });
			animation.addEventListener('cancel', () => circle.remove(), { once: true });
		};

		node.addEventListener('pointerdown', onPointerDown);
		return () => {
			node.removeEventListener('pointerdown', onPointerDown);
			node.querySelectorAll(':scope > span[data-rx-ripple]').forEach((circle) => circle.remove());
			if (changedPosition) node.style.position = previousPosition;
			if (changedOverflow) node.style.overflow = previousOverflow;
		};
	};
}
