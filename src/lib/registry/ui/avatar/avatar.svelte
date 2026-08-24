<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RxColor } from '$lib/registry/lib/color';

	export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
		src?: string;
		alt?: string;
		fallback?: string;
		icon?: Snippet;
		color?: RxColor;
		size?: 'xl' | 'lg' | 'default' | 'sm' | 'mini';
		shape?: 'circle' | 'square' | 'rounded';
		badge?: string | number | boolean;
		badgeColor?: RxColor;
		history?: boolean;
		loading?: boolean;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { styleColor } from '$lib/registry/lib/color';
	import { AVATAR_GROUP, type AvatarGroupContext } from './context';
	import { avatarVariants } from './index';

	let { src, alt = '', fallback, icon, color, size = 'default', shape = 'circle', badge,
		badgeColor = 'danger', history = false, loading = false, children, class: className,
		style, ...restProps }: AvatarProps = $props();
	let imageFailed = $state(false);
	const group = getContext<AvatarGroupContext | undefined>(AVATAR_GROUP);
	const groupId = Symbol('avatar');
	const unregister = group?.register(groupId);
	onDestroy(() => unregister?.());
	const visible = $derived(group?.isVisible(groupId) ?? true);
	const classes = $derived(avatarVariants({ size, shape, history, loading, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-gray)'}; ${style ?? ''}`);
	const badgeStyle = $derived(styleColor(badgeColor) ?? '--rx-color: var(--rx-danger)');
</script>

{#if visible}
	<div {...restProps} class={classes} style={inlineStyle} aria-busy={loading ? 'true' : undefined}>
		<div class="rx-avatar__content">
			{#if loading}
				<span class="rx-avatar__shimmer" aria-hidden="true"></span>
			{:else if children}
				{@render children()}
			{:else if src && !imageFailed}
				<img {src} {alt} onerror={() => imageFailed = true} />
			{:else if fallback}
				<span class="rx-avatar__fallback" aria-label={alt || undefined}>{fallback}</span>
			{:else if icon}
				<span class="rx-avatar__icon" aria-label={alt || undefined}>{@render icon()}</span>
			{/if}
		</div>
		{#if badge !== undefined && badge !== false}
			<span class:rx-avatar__badge--dot={badge === true} class="rx-avatar__badge" style={badgeStyle} aria-label={badge === true ? 'Status' : `${badge}`}>
				{badge === true ? '' : badge}
			</span>
		{/if}
	</div>
{/if}

<style>
	.rx-avatar { --rx-avatar-size: 3rem; position: relative; display: inline-grid; flex: 0 0 auto; box-sizing: border-box; width: var(--rx-avatar-size); height: var(--rx-avatar-size); color: rgb(var(--rx-text)); vertical-align: middle; }
	.rx-avatar__content { display: grid; width: 100%; height: 100%; place-items: center; overflow: hidden; border-radius: inherit; background: rgb(var(--rx-color)); font-weight: 700; line-height: 1; }
	.rx-avatar img { width: 100%; height: 100%; object-fit: cover; }
	.rx-avatar__fallback, .rx-avatar__icon { display: grid; place-items: center; width: 100%; height: 100%; }
	.rx-avatar--xl { --rx-avatar-size: 5rem; font-size: 1.35rem; }
	.rx-avatar--lg { --rx-avatar-size: 4rem; font-size: 1.1rem; }
	.rx-avatar--default { --rx-avatar-size: 3rem; font-size: .9rem; }
	.rx-avatar--sm { --rx-avatar-size: 2.4rem; font-size: .75rem; }
	.rx-avatar--mini { --rx-avatar-size: 1.8rem; font-size: .62rem; }
	.rx-avatar--circle { border-radius: 9999px; }
	.rx-avatar--square { border-radius: 0; }
	.rx-avatar--rounded { border-radius: var(--rx-radius); }
	.rx-avatar--history { padding: .18rem; background: conic-gradient(rgb(var(--rx-color)), hsl(from rgb(var(--rx-color)) calc(h + 80) s l), rgb(var(--rx-color))); }
	.rx-avatar--history .rx-avatar__content { box-shadow: inset 0 0 0 .15rem rgb(var(--rx-background)); }
	.rx-avatar__badge { --rx-badge-size: 1.35rem; position: absolute; z-index: 2; right: -.25rem; bottom: -.15rem; display: grid; min-width: var(--rx-badge-size); height: var(--rx-badge-size); padding: 0 .3rem; place-items: center; box-sizing: border-box; border: .14rem solid rgb(var(--rx-background)); border-radius: 9999px; color: rgb(var(--rx-light)); background: rgb(var(--rx-color)); font-size: .62em; font-weight: 800; }
	.rx-avatar__badge--dot { --rx-badge-size: .75rem; padding: 0; }
	.rx-avatar__shimmer { width: 100%; height: 100%; background: linear-gradient(100deg, rgb(var(--rx-color) / .55) 30%, rgb(var(--rx-light) / .55) 50%, rgb(var(--rx-color) / .55) 70%); background-size: 200% 100%; animation: rx-shimmer 1.4s linear infinite; }
	@media (prefers-reduced-motion: reduce) { .rx-avatar__shimmer { animation: none; } }
</style>
