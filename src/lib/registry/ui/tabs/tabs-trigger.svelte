<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export interface TabsTriggerProps { value: string; disabled?: boolean; icon?: Snippet; children: Snippet; }
</script>
<script lang="ts">
	import { Tabs as Primitive } from 'bits-ui';
	let { value, disabled = false, icon, children }: TabsTriggerProps = $props();
</script>
<Primitive.Trigger {value} {disabled} class="rx-trigger">{#if icon}<span>{@render icon()}</span>{/if}{@render children()}</Primitive.Trigger>
<style>
	:global {
		.rx-trigger{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;gap:.45rem;border:0;padding:.65rem 1rem;border-radius:calc(var(--rx-radius)*.8);color:rgb(var(--rx-text)/.65);background:transparent;font:inherit;font-weight:650;cursor:pointer;transition:color 180ms var(--rx-ease)}
		.rx-trigger[data-state=active]{color:rgb(var(--rx-light))}.rx-trigger:focus-visible{outline:3px solid rgb(var(--rx-color)/.28);outline-offset:2px}.rx-trigger:disabled{opacity:.45;cursor:not-allowed}
		@media(prefers-reduced-motion:reduce){.rx-trigger{transition:none}}
	}
</style>
