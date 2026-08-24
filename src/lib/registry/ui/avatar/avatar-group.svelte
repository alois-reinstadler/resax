<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface AvatarGroupProps { max?: number; float?: boolean; children: Snippet; }
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { AVATAR_GROUP, type AvatarGroupContext } from './context';
	let { max, float = false, children }: AvatarGroupProps = $props();
	let ids = $state<symbol[]>([]);
	const limit = $derived(max === undefined ? Number.POSITIVE_INFINITY : Math.max(0, max));
	const overflow = $derived(Math.max(0, ids.length - limit));
	const context: AvatarGroupContext = {
		register(id) { ids = [...ids, id]; return () => { ids = ids.filter((value) => value !== id); }; },
		isVisible(id) { return ids.indexOf(id) < limit; }
	};
	setContext(AVATAR_GROUP, context);
</script>

<div class:rx-avatar-group--float={float} class="rx-avatar-group" aria-label="Avatar group">
	{@render children()}
	{#if overflow > 0}<span class="rx-avatar-group__overflow" aria-label={`${overflow} more`}>+{overflow}</span>{/if}
</div>

<style>
	.rx-avatar-group { display: flex; align-items: center; isolation: isolate; }
	.rx-avatar-group :global(.rx-avatar), .rx-avatar-group__overflow { margin-inline-start: calc(var(--rx-radius) * -.65); box-shadow: 0 0 0 .16rem rgb(var(--rx-background)); }
	.rx-avatar-group :global(.rx-avatar:first-child) { margin-inline-start: 0; }
	.rx-avatar-group--float :global(.rx-avatar:hover), .rx-avatar-group--float :global(.rx-avatar:focus-within) { z-index: 2; transform: translateY(calc(var(--rx-radius) * -.3)); }
	.rx-avatar-group__overflow { z-index: 1; display: grid; width: 3rem; height: 3rem; place-items: center; border-radius: 9999px; color: rgb(var(--rx-text)); background: rgb(var(--rx-gray)); font-size: .8rem; font-weight: 800; }
	@media (prefers-reduced-motion: reduce) { .rx-avatar-group--float :global(.rx-avatar) { transition: none; } }
</style>
