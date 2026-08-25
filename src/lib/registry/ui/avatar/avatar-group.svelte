<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface AvatarGroupProps { max?: number; float?: boolean; variant?: 'base' | 'fan' | 'flip' | 'grid' | 'ring' | 'wave'; columns?: number; flipLabel?: string; children: Snippet; }
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { AVATAR_GROUP, type AvatarGroupContext } from './context';
	let { max, float = false, variant = 'base', columns = 4, flipLabel = 'View profile', children }: AvatarGroupProps = $props();
	let ids = $state<symbol[]>([]);
	const limit = $derived(max === undefined ? Number.POSITIVE_INFINITY : Math.max(0, max));
	const overflow = $derived(Math.max(0, ids.length - limit));
	const context: AvatarGroupContext = {
		register(id) { ids = [...ids, id]; return () => { ids = ids.filter((value) => value !== id); }; },
		isVisible(id) { return variant === 'base' || variant === 'grid' || ids.indexOf(id) < limit; },
		isExtra(id) { return ids.indexOf(id) >= limit; },
		get flipLabel() { return flipLabel; }
	};
	setContext(AVATAR_GROUP, context);

	function avatarGroupMenu(node: HTMLDivElement) {
		if (variant !== 'base') return;
		let portal: HTMLDivElement | undefined;
		let panel: HTMLDivElement | undefined;
		let closeTimer = 0;
		let openFrame = 0;
		const trigger = () => node.querySelector<HTMLButtonElement>('.rx-avatar-group__overflow');
		const position = () => {
			const anchor = trigger();
			if (!anchor || !panel) return;
			const rect = anchor.getBoundingClientRect();
			const width = panel.offsetWidth || 200;
			const height = panel.offsetHeight || 120;
			const edge = 8;
			const gap = 10;
			let left = rect.left;
			let top = rect.bottom + gap;
			let above = false;
			if (top + height + edge > window.innerHeight) { top = rect.top - height - gap; above = true; }
			if (left + width + edge > window.innerWidth) left = rect.right - width;
			left = Math.max(edge, Math.min(left, window.innerWidth - width - edge));
			top = Math.max(edge, Math.min(top, window.innerHeight - height - edge));
			panel.style.left = `${left}px`;
			panel.style.top = `${top}px`;
			panel.style.setProperty('--rx-avatar-menu-ox', `${Math.max(0, Math.min(width, rect.left + rect.width / 2 - left))}px`);
			panel.style.setProperty('--rx-avatar-menu-oy', above ? `${height}px` : '0px');
		};
		const detach = () => {
			document.removeEventListener('pointerdown', outside, true);
			document.removeEventListener('keydown', keydown, true);
			window.removeEventListener('scroll', position, true);
			window.removeEventListener('resize', position);
		};
		const finishClose = () => {
			portal?.remove();
			portal = undefined;
			panel = undefined;
			node.removeAttribute('data-open');
		};
		const close = (restoreFocus = false, immediate = false) => {
			if (!portal || !panel) return;
			clearTimeout(closeTimer);
			cancelAnimationFrame(openFrame);
			detach();
			trigger()?.setAttribute('aria-expanded', 'false');
			panel.classList.remove('is-open');
			if (immediate || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) finishClose();
			else closeTimer = window.setTimeout(finishClose, 380);
			if (restoreFocus) trigger()?.focus();
		};
		function outside(event: PointerEvent) {
			const path = event.composedPath();
			if (!path.includes(node) && (!portal || !path.includes(portal))) close();
		}
		function keydown(event: KeyboardEvent) {
			if (event.key !== 'Escape') return;
			event.preventDefault();
			close(true);
		}
		const open = () => {
			const anchor = trigger();
			if (!anchor || portal) return;
			const extras = [...node.querySelectorAll<HTMLElement>('.rx-avatar[data-group-extra="true"]')];
			if (!extras.length) return;
			portal = document.createElement('div');
			portal.className = 'rx-avatar-group__portal';
			panel = document.createElement('div');
			panel.className = 'rx-avatar-group__menu';
			panel.setAttribute('role', 'menu');
			for (const extra of extras) {
				const item = document.createElement('button');
				item.type = 'button';
				item.className = 'rx-avatar-group__menu-item';
				item.setAttribute('role', 'menuitem');
				item.setAttribute('aria-label', extra.getAttribute('aria-label') || extra.textContent?.trim() || 'Avatar');
				const clone = extra.cloneNode(true) as HTMLElement;
				clone.setAttribute('aria-hidden', 'true');
				clone.removeAttribute('data-group-extra');
				clone.style.removeProperty('transform');
				item.append(clone);
				item.addEventListener('click', () => close(true));
				panel.append(item);
			}
			portal.append(panel);
			document.body.append(portal);
			node.setAttribute('data-open', 'true');
			anchor.setAttribute('aria-expanded', 'true');
			position();
			panel.offsetWidth;
			openFrame = requestAnimationFrame(() => panel?.classList.add('is-open'));
			document.addEventListener('pointerdown', outside, true);
			document.addEventListener('keydown', keydown, true);
			window.addEventListener('scroll', position, true);
			window.addEventListener('resize', position);
		};
		const click = (event: MouseEvent) => {
			if (!(event.target as Element).closest('.rx-avatar-group__overflow')) return;
			portal ? close() : open();
		};
		node.addEventListener('click', click);
		return () => { node.removeEventListener('click', click); clearTimeout(closeTimer); cancelAnimationFrame(openFrame); detach(); finishClose(); };
	}
</script>

<div class:rx-avatar-group--float={float} class="rx-avatar-group rx-avatar-group--{variant}" style={`--rx-group-cols:${columns}`} data-flip-label={flipLabel} aria-label="Avatar group" {@attach avatarGroupMenu}>
	{@render children()}
	{#if overflow > 0}<button type="button" class="rx-avatar-group__overflow" aria-label={`${overflow} more`} aria-haspopup={variant === 'base' ? 'menu' : undefined} aria-expanded={variant === 'base' ? 'false' : undefined}>+{overflow}</button>{/if}
</div>

<style>
	.rx-avatar-group { --rx-group-overlap:-18px;display: inline-flex; align-items: center; isolation: isolate;perspective:620px;transform-style:preserve-3d }
	.rx-avatar-group :global(.rx-avatar), .rx-avatar-group__overflow { margin-inline-start:var(--rx-group-overlap); box-shadow: 0 0 0 2px rgb(var(--rx-background));transition:transform 460ms cubic-bezier(.34,1.8,.5,1),margin 420ms cubic-bezier(.22,1,.36,1),opacity 240ms ease }
	.rx-avatar-group :global(.rx-avatar:first-child) { margin-inline-start: 0; }
	.rx-avatar-group--base:hover :global(.rx-avatar),.rx-avatar-group--float:hover :global(.rx-avatar){transform:translateX(calc(var(--rx-group-i,0)*8px)) translateY(-2px)}
	.rx-avatar-group--base :global(.rx-avatar[data-group-extra=true]){display:none}
	:global(.rx-avatar-group--base[data-open=true]){transform-style:preserve-3d}:global(.rx-avatar-group--base[data-open=true]) .rx-avatar-group__overflow{color:rgb(var(--rx-text));background:rgb(var(--rx-surface-2))}
	.rx-avatar-group--base :global(.rx-avatar:hover),.rx-avatar-group--float :global(.rx-avatar:hover), .rx-avatar-group--float :global(.rx-avatar:focus-within) { z-index: 50; transform: translateY(-5px) translateZ(38px); }
	.rx-avatar-group--fan{align-items:flex-end}.rx-avatar-group--fan :global(.rx-avatar){transform-origin:50% 130%}.rx-avatar-group--fan:hover :global(.rx-avatar:nth-child(1)){transform:rotate(-12deg)}.rx-avatar-group--fan:hover :global(.rx-avatar:nth-child(2)){transform:rotate(-6deg)}.rx-avatar-group--fan:hover :global(.rx-avatar:nth-child(4)){transform:rotate(6deg)}.rx-avatar-group--fan:hover :global(.rx-avatar:nth-child(5)){transform:rotate(12deg)}
	.rx-avatar-group--flip{perspective:620px}.rx-avatar-group--flip :global(.rx-avatar){transform-style:preserve-3d;transition:transform 560ms cubic-bezier(.34,1.4,.5,1)}.rx-avatar-group--flip :global(.rx-avatar__content){backface-visibility:hidden}.rx-avatar-group--flip :global(.rx-avatar::after){content:attr(data-flip-label);position:absolute;inset:0;display:grid;place-items:center;border-radius:inherit;color:rgb(var(--rx-text));background:rgb(var(--rx-surface-2));box-shadow:0 0 0 2px rgb(var(--rx-background));font-size:.5rem;line-height:1.1;text-align:center;transform:rotateY(180deg);backface-visibility:hidden}.rx-avatar-group--flip :global(.rx-avatar:hover){transform:rotateY(180deg)}
	.rx-avatar-group--grid{display:inline-grid;grid-auto-flow:column;transition:gap 420ms cubic-bezier(.22,1,.36,1)}.rx-avatar-group--grid :global(.rx-avatar[data-group-extra=true]){width:0;opacity:0;pointer-events:none;margin-left:0}.rx-avatar-group--grid:hover,.rx-avatar-group--grid:focus-within{grid-auto-flow:row;grid-template-columns:repeat(var(--rx-group-cols),3rem);gap:8px}.rx-avatar-group--grid:hover :global(.rx-avatar),.rx-avatar-group--grid:focus-within :global(.rx-avatar){width:var(--rx-avatar-size);opacity:1;pointer-events:auto;margin:0}.rx-avatar-group--grid :global(.rx-avatar:hover){transform:scale(1.12)}.rx-avatar-group--grid:hover .rx-avatar-group__overflow,.rx-avatar-group--grid:focus-within .rx-avatar-group__overflow{position:absolute;width:0;opacity:0;pointer-events:none}
	.rx-avatar-group--ring :global(.rx-avatar){transition:transform 320ms cubic-bezier(.34,1.56,.5,1)}.rx-avatar-group--ring :global(.rx-avatar::after){content:'';position:absolute;inset:-4px;z-index:-1;border-radius:inherit;background:conic-gradient(rgb(var(--rx-color)),transparent 55%,rgb(var(--rx-color)));mask:radial-gradient(farthest-side,transparent calc(100% - 2.5px),#000 calc(100% - 2.5px));animation:rx-avatar-group-ring 3.4s linear infinite}.rx-avatar-group--ring :global(.rx-avatar:hover){transform:translateY(-4px) scale(1.06)}.rx-avatar-group--ring :global(.rx-avatar:hover::after){animation-duration:.9s}
	.rx-avatar-group--wave:hover :global(.rx-avatar){animation:rx-avatar-group-wave 1.1s ease-in-out infinite}.rx-avatar-group--wave :global(.rx-avatar:nth-child(2)){animation-delay:110ms}.rx-avatar-group--wave :global(.rx-avatar:nth-child(3)){animation-delay:220ms}.rx-avatar-group--wave :global(.rx-avatar:nth-child(4)){animation-delay:330ms}.rx-avatar-group--wave :global(.rx-avatar:nth-child(5)){animation-delay:440ms}
	.rx-avatar-group__overflow { z-index: 1; display: grid; width: 3rem; height: 3rem; place-items: center;padding:0;border:0; border-radius: 9999px; color: rgb(var(--rx-text)); background: rgb(var(--rx-surface-2)); font:inherit;font-size: .8rem; font-weight: 800;cursor:pointer }
	:global(.rx-avatar-group__portal){position:fixed;inset:0;z-index:2147483000;pointer-events:none}:global(.rx-avatar-group__menu){position:fixed;display:grid;min-width:200px;max-height:264px;overflow-y:auto;padding:4px;border:1px solid rgb(var(--rx-border));border-radius:20px;background:rgb(var(--rx-surface));opacity:0;filter:blur(6px);transform:scale(.92);transform-origin:var(--rx-avatar-menu-ox,50%) var(--rx-avatar-menu-oy,0);transition:opacity 200ms ease,transform 320ms cubic-bezier(.34,1.56,.64,1),filter 200ms ease;pointer-events:auto}:global(.rx-avatar-group__menu.is-open){opacity:1;filter:blur(0);transform:scale(1)}:global(.rx-avatar-group__menu-item){display:flex;align-items:center;gap:10px;width:100%;height:54px;padding:0 10px;border:0;border-radius:16px;background:transparent;color:rgb(var(--rx-text));font:inherit;text-align:left;cursor:pointer;transition:background 160ms ease}:global(.rx-avatar-group__menu-item:hover),:global(.rx-avatar-group__menu-item:focus-visible){outline:none;background:rgb(var(--rx-gray)/.18)}:global(.rx-avatar-group__menu-item .rx-avatar){width:40px;height:40px;margin:0;box-shadow:none}
	@keyframes rx-avatar-group-ring{to{transform:rotate(1turn)}}@keyframes rx-avatar-group-wave{0%,100%{transform:translateY(0)}30%{transform:translateY(-10px)}60%{transform:translateY(0)}}
	@media (prefers-reduced-motion: reduce) { .rx-avatar-group :global(.rx-avatar){transition:none!important;animation:none!important}.rx-avatar-group:hover :global(.rx-avatar){transform:none}.rx-avatar-group--ring :global(.rx-avatar::after){animation:none}:global(.rx-avatar-group__menu){transition:none} }
</style>
