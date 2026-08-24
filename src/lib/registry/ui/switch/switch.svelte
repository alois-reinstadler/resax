<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { Switch as SwitchTypes } from 'bits-ui';
	import type { RxColor } from '$lib/registry/lib/color';
	export interface SwitchProps extends Omit<SwitchTypes.RootProps, 'checked' | 'disabled' | 'children' | 'child' | 'color' | 'onCheckedChange'> {
		checked?: boolean; color?: RxColor; size?: 'lg' | 'default' | 'sm'; shape?: 'pill' | 'square';
		loading?: boolean; disabled?: boolean; on?: Snippet; off?: Snippet;
		onCheckedChange?: (checked: boolean) => void;
	}
</script>

<script lang="ts">
	import { Switch as SwitchPrimitive } from 'bits-ui';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';
	import { switchVariants } from './index';
	let { checked = $bindable(false), color, size = 'default', shape = 'pill', loading = false, disabled = false,
		on, off, onCheckedChange, class: className, style, ...restProps }: SwitchProps = $props();
	const inactive = $derived(disabled || loading);
	const classes = $derived(switchVariants({ size, shape, class: typeof className === 'string' ? className : undefined }));
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}; ${style ?? ''}`);
</script>

<SwitchPrimitive.Root {...restProps} bind:checked disabled={inactive} {onCheckedChange} class={classes} style={inlineStyle} aria-busy={loading ? 'true' : undefined}>
	{#snippet children({ checked: isChecked })}
		<span class="rx-switch__content" aria-hidden="true">{#if isChecked}{#if on}{@render on()}{/if}{:else}{#if off}{@render off()}{/if}{/if}</span>
		<SwitchPrimitive.Thumb class="rx-switch__thumb">
			{#if loading}<span class="rx-switch__spinner" aria-hidden="true"></span>{/if}
		</SwitchPrimitive.Thumb>
	{/snippet}
</SwitchPrimitive.Root>

<style>
	:global {
	.rx-switch { --rx-thumb: 1.2rem; --rx-pad: .18rem; position: relative; display: inline-flex; align-items: center; box-sizing: border-box; width: calc(var(--rx-thumb) * 2 + var(--rx-pad) * 2); height: calc(var(--rx-thumb) + var(--rx-pad) * 2); padding: var(--rx-pad); border: 0; color: rgb(var(--rx-light)); background: rgb(var(--rx-dark) / .22); cursor: pointer; transition: background var(--rx-duration) var(--rx-ease), opacity var(--rx-duration) var(--rx-ease); }
	.rx-switch[data-state='checked'] { background: rgb(var(--rx-color)); }
	.rx-switch:focus-visible { outline: 3px solid rgb(var(--rx-color) / .25); outline-offset: 2px; }
	.rx-switch:disabled { cursor: not-allowed; opacity: .55; }
	.rx-switch--pill { border-radius: 9999px; }
	.rx-switch--square { border-radius: .32rem; }
	.rx-switch--lg { --rx-thumb: 1.5rem; --rx-pad: .22rem; }
	.rx-switch--default { --rx-thumb: 1.2rem; --rx-pad: .18rem; }
	.rx-switch--sm { --rx-thumb: .95rem; --rx-pad: .14rem; }
	.rx-switch__thumb { position: relative; z-index: 1; display: grid; place-items: center; width: var(--rx-thumb); height: var(--rx-thumb); border-radius: inherit; color: rgb(var(--rx-color)); background: rgb(var(--rx-light)); box-shadow: 0 2px 5px rgb(var(--rx-dark) / .22); transform: translateX(0); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-switch[data-state='checked'] .rx-switch__thumb { transform: translateX(var(--rx-thumb)); }
	.rx-switch__content { position: absolute; inset: 0; display: flex; align-items: center; justify-content: flex-end; padding: 0 calc(var(--rx-pad) + .25rem); font-size: calc(var(--rx-thumb) * .48); font-weight: 700; }
	.rx-switch[data-state='checked'] .rx-switch__content { justify-content: flex-start; }
	.rx-switch__spinner { width: 55%; height: 55%; box-sizing: border-box; border: 2px solid currentColor; border-right-color: transparent; border-radius: 9999px; animation: rx-switch-spin .7s linear infinite; }
	@keyframes rx-switch-spin { to { transform: rotate(1turn); } }
	@media (prefers-reduced-motion: reduce) { .rx-switch, .rx-switch__thumb { transition-duration: 0ms; } .rx-switch__spinner { animation-duration: 1ms; animation-iteration-count: 1; } }
	}
</style>
