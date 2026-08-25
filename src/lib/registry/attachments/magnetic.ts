import type { Attachment } from 'svelte/attachments';
import type { ReactiveOption } from './proximity-glow';

export interface MagneticOptions {
	strength?: ReactiveOption<number>;
	labelStrength?: ReactiveOption<number>;
	label?: HTMLElement | string;
	disabled?: ReactiveOption<boolean>;
}

function value<T>(option: ReactiveOption<T> | undefined, fallback: T): T {
	return typeof option === 'function' ? (option as () => T)() : (option ?? fallback);
}

function motionDisabled(): boolean {
	return typeof matchMedia === 'function' && (
		matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches
	);
}

/** Source magnetic translation: .4 pull and a nested .4 label parallax. */
export function magnetic(options: MagneticOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		const label = typeof options.label === 'string' ? node.querySelector<HTMLElement>(options.label) : options.label;
		const previousTransform = node.style.transform;
		const previousLabelTransform = label?.style.transform ?? '';
		const reset = () => {
			node.style.transform = previousTransform;
			if (label) label.style.transform = previousLabelTransform;
		};
		const onPointerMove = (event: PointerEvent) => {
			if (
				value(options.disabled, false)
				|| motionDisabled()
				|| (event.pointerType && event.pointerType !== 'mouse')
			) return;
			const rect = node.getBoundingClientRect();
			const offsetX = event.clientX - rect.left - rect.width / 2;
			const offsetY = event.clientY - rect.top - rect.height / 2;
			const strength = value(options.strength, 0.4);
			const labelStrength = value(options.labelStrength, 0.4);
			node.style.transform = `translate(${(offsetX * strength).toFixed(2)}px, ${(offsetY * strength).toFixed(2)}px)`;
			if (label) {
				label.style.transform = `translate(${(offsetX * strength * labelStrength).toFixed(2)}px, ${(offsetY * strength * labelStrength).toFixed(2)}px)`;
			}
		};

		node.addEventListener('pointermove', onPointerMove);
		node.addEventListener('pointerleave', reset);
		node.addEventListener('pointercancel', reset);
		return () => {
			node.removeEventListener('pointermove', onPointerMove);
			node.removeEventListener('pointerleave', reset);
			node.removeEventListener('pointercancel', reset);
			reset();
		};
	};
}
