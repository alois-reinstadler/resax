import type { Attachment } from 'svelte/attachments';

export interface RippleOptions {
	/** CSS RGB channels, for example `255 255 255` or `var(--my-ripple)`. */
	color?: string;
	maxRipples?: number;
	pressTilt?: boolean;
	disabled?: boolean | (() => boolean);
}

export function ripple(options: RippleOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		const computed = getComputedStyle(node);
		const changedPosition = computed.position === 'static';
		const changedOverflow = computed.overflow === 'visible';
		const previousPosition = node.style.position;
		const previousOverflow = node.style.overflow;
		const previousTransform = node.style.transform;
		if (changedPosition) node.style.position = 'relative';
		if (changedOverflow) node.style.overflow = 'hidden';
		const live = new Map<HTMLElement, Animation[]>();

		const removeRipple = (circle: HTMLElement, cancel = false) => {
			const animations = live.get(circle);
			if (!animations) return;
			live.delete(circle);
			circle.remove();
			if (cancel) for (const animation of animations) animation.cancel();
		};
		const resetPress = () => {
			if (options.pressTilt) node.style.transform = previousTransform;
		};
		const isDisabled = () => (
			(typeof options.disabled === 'function' ? options.disabled() : options.disabled)
			|| node.matches(':disabled, [aria-disabled="true"]')
		);

		const onPointerDown = (event: PointerEvent) => {
			if (isDisabled() || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			const rect = node.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const farthestX = Math.max(x, rect.width - x);
			const farthestY = Math.max(y, rect.height - y);
			const diameter = Math.hypot(farthestX, farthestY) * 2;
			const circle = document.createElement('span');
			circle.setAttribute('aria-hidden', 'true');
			circle.setAttribute('data-rx-ripple', '');
			const color = options.color ?? 'var(--rx-color-ripple, var(--rx-color, var(--rx-primary)))';
			Object.assign(circle.style, {
				position: 'absolute',
				zIndex: '1',
				pointerEvents: 'none',
				borderRadius: '50%',
				width: `${diameter}px`,
				height: `${diameter}px`,
				left: `${x}px`,
				top: `${y}px`,
				background: `radial-gradient(circle, rgb(${color} / .38) 0%, rgb(${color} / .20) 24%, rgb(${color} / .09) 44%, rgb(${color} / .03) 60%, transparent 76%)`,
				opacity: '0',
				transform: 'translate(-50%, -50%) scale(0)',
				willChange: 'transform, opacity'
			});
			node.append(circle);
			const scaleAnimation = circle.animate(
				[
					{ transform: 'translate(-50%, -50%) scale(0)' },
					{ transform: 'translate(-50%, -50%) scale(1)' }
				],
				{ duration: 780, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
			);
			const fadeAnimation = circle.animate(
				[{ opacity: 0.8 }, { opacity: 0 }],
				{ duration: 780, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', fill: 'forwards' }
			);
			const animations = [scaleAnimation, fadeAnimation];
			live.set(circle, animations);
			let completed = 0;
			for (const animation of animations) {
				animation.addEventListener('finish', () => {
					completed += 1;
					if (completed === animations.length) removeRipple(circle);
				}, { once: true });
				animation.addEventListener('cancel', () => removeRipple(circle), { once: true });
			}

			const maximum = Math.max(1, options.maxRipples ?? 6);
			while (live.size > maximum) {
				const oldest = live.keys().next().value;
				if (oldest) removeRipple(oldest, true);
			}

			if (options.pressTilt && rect.width && rect.height) {
				const horizontal = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
				const vertical = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));
				const edgeDamping = 1 - 0.2 * Math.min(Math.abs(horizontal), Math.abs(vertical));
				node.style.transform = `perspective(450px) rotateX(${(-vertical * 15 * edgeDamping).toFixed(2)}deg) rotateY(${(horizontal * 10 * edgeDamping).toFixed(2)}deg) scale(.96)`;
			}
		};

		node.addEventListener('pointerdown', onPointerDown);
		node.addEventListener('pointerup', resetPress);
		node.addEventListener('pointerleave', resetPress);
		node.addEventListener('pointercancel', resetPress);
		return () => {
			node.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('pointerup', resetPress);
			node.removeEventListener('pointerleave', resetPress);
			node.removeEventListener('pointercancel', resetPress);
			for (const circle of [...live.keys()]) removeRipple(circle, true);
			resetPress();
			if (changedPosition) node.style.position = previousPosition;
			if (changedOverflow) node.style.overflow = previousOverflow;
		};
	};
}
