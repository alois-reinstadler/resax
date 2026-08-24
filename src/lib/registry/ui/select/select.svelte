<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '../../lib/color';
	export interface SelectProps {
		value?: string | string[]; multiple?: boolean; filter?: boolean; chips?: boolean;
		label?: string; placeholder?: string; color?: RxColor; size?: 'lg' | 'default' | 'sm';
		state?: 'default' | 'success' | 'danger' | 'warn'; message?: string | Snippet;
		disabled?: boolean; loading?: boolean; children: Snippet;
		onValueChange?: (value: string | string[]) => void;
	}
</script>

<script lang="ts">
	import { Combobox, Select as BitsSelect } from 'bits-ui';
	import { Chip } from '../chip';
	import { styleColor } from '../../lib/color';
	import { RX_DURATION, RX_EASE, rxSlideUp } from '../../lib/easing';
	import { setSelectContext } from './context';
	let { value = $bindable(''), multiple = false, filter = false, chips = false, label, placeholder = 'Select an option',
		color, size = 'default', state: validationState = 'default', message, disabled = false, loading = false,
		children, onValueChange }: SelectProps = $props();
	let open = $state(false);
	let query = $state('');
	const uid = $props.id();
	const messageId = `${uid}-message`;
	const stateColor = $derived(validationState === 'default' ? color : validationState);
	const hasValue = $derived(Array.isArray(value) ? value.length > 0 : value.length > 0);
	const inlineStyle = $derived(`${styleColor(stateColor) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}`);
	function change(next: string | string[]) { value = next; onValueChange?.(next); }
	function remove(item: string) { if (Array.isArray(value)) change(value.filter((entry) => entry !== item)); }
	setSelectContext({ filter: () => filter, query: () => query, remove });
</script>

<div class="rx-select rx-select--{size}" class:rx-select--open={open} class:rx-select--floated={open || hasValue || (filter && query.length > 0)} class:rx-select--chips={multiple && chips} class:rx-select--loading={loading} style={inlineStyle}>
	{#if filter}
		{#if multiple}
			<Combobox.Root type="multiple" value={Array.isArray(value) ? value : []} onValueChange={change} bind:open {disabled}>
				<div class="rx-select__control">
					{#if multiple && chips && Array.isArray(value) && value.length}<span class="rx-select__chips">{#each value as item (item)}<Chip size="sm" closable onClose={() => remove(item)}>{item}</Chip>{/each}</span>{/if}
					<Combobox.Input class="rx-select__input" oninput={(event) => query = event.currentTarget.value} {placeholder} aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined} />
					<span class="rx-select__chevron" aria-hidden="true">⌄</span>{#if loading}<span class="rx-select__loader" aria-hidden="true"></span>{/if}{#if label}<span class="rx-select__label">{label}</span>{/if}
				</div>
				<Combobox.Portal><Combobox.Content class="rx-select__content" sideOffset={6}><Combobox.Viewport>{@render children()}</Combobox.Viewport></Combobox.Content></Combobox.Portal>
			</Combobox.Root>
		{:else}
			<Combobox.Root type="single" value={typeof value === 'string' ? value : ''} onValueChange={change} bind:open {disabled}>
				<div class="rx-select__control"><Combobox.Input class="rx-select__input" oninput={(event) => query = event.currentTarget.value} {placeholder} aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined} /><span class="rx-select__chevron" aria-hidden="true">⌄</span>{#if loading}<span class="rx-select__loader" aria-hidden="true"></span>{/if}{#if label}<span class="rx-select__label">{label}</span>{/if}</div>
				<Combobox.Portal><Combobox.Content class="rx-select__content" sideOffset={6}><Combobox.Viewport>{@render children()}</Combobox.Viewport></Combobox.Content></Combobox.Portal>
			</Combobox.Root>
		{/if}
	{:else}
		{#if multiple}
			<BitsSelect.Root type="multiple" value={Array.isArray(value) ? value : []} onValueChange={change} bind:open {disabled}>
				<BitsSelect.Trigger class="rx-select__control" aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined}>
					{#if chips && Array.isArray(value) && value.length}<span class="rx-select__chips">{#each value as item (item)}<Chip size="sm" closable onClose={() => remove(item)}>{item}</Chip>{/each}</span>{:else}<BitsSelect.Value {placeholder} />{/if}<span class="rx-select__chevron" aria-hidden="true">⌄</span>{#if loading}<span class="rx-select__loader" aria-hidden="true"></span>{/if}{#if label}<span class="rx-select__label">{label}</span>{/if}
				</BitsSelect.Trigger>
				<BitsSelect.Portal><BitsSelect.Content class="rx-select__content" sideOffset={6}><BitsSelect.Viewport>{@render children()}</BitsSelect.Viewport></BitsSelect.Content></BitsSelect.Portal>
			</BitsSelect.Root>
		{:else}
			<BitsSelect.Root type="single" value={typeof value === 'string' ? value : ''} onValueChange={change} bind:open {disabled}>
				<BitsSelect.Trigger class="rx-select__control" aria-invalid={validationState === 'danger' ? 'true' : undefined} aria-describedby={validationState === 'danger' && message ? messageId : undefined}><BitsSelect.Value {placeholder} /><span class="rx-select__chevron" aria-hidden="true">⌄</span>{#if loading}<span class="rx-select__loader" aria-hidden="true"></span>{/if}{#if label}<span class="rx-select__label">{label}</span>{/if}</BitsSelect.Trigger>
				<BitsSelect.Portal><BitsSelect.Content class="rx-select__content" sideOffset={6}><BitsSelect.Viewport>{@render children()}</BitsSelect.Viewport></BitsSelect.Content></BitsSelect.Portal>
			</BitsSelect.Root>
		{/if}
	{/if}
	{#if message}<div id={messageId} class="rx-select__message" transition:rxSlideUp aria-live="polite">{#if typeof message === 'string'}{message}{:else}{@render message()}{/if}</div>{/if}
</div>

<style>
	.rx-select { display: inline-grid; gap: .3rem; width: 100%; color: rgb(var(--rx-text)); }
	.rx-select__control { position: relative; display: flex; width: 100%; align-items: center; box-sizing: border-box; border: 0; border-radius: var(--rx-radius); outline: 0; background: rgb(var(--rx-surface-2)); color: inherit; font: inherit; text-align: left; cursor: pointer; transition: box-shadow var(--rx-duration) var(--rx-ease), background var(--rx-duration) var(--rx-ease); }
	.rx-select__control::after { content: ''; position: absolute; inset: auto 0 0; height: 2px; border-radius: 9999px; background: rgb(var(--rx-color)); transform: scaleX(0); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-select--open .rx-select__control::after, .rx-select__control:focus-visible::after, .rx-select__control:focus-within::after { transform: scaleX(1); }
	.rx-select__control > :global([data-select-value]) { flex: 1; min-width: 0; padding: 1.05rem 2.6rem .42rem .9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.rx-select__input { width: 100%; min-width: 0; box-sizing: border-box; border: 0; outline: 0; border-radius: inherit; padding: 1.05rem 2.6rem .42rem .9rem; background: transparent; color: inherit; font: inherit; }
	.rx-select__input::placeholder { color: rgb(var(--rx-text-muted)); }
	.rx-select__label { position: absolute; left: .9rem; top: 50%; color: rgb(var(--rx-text-muted)); pointer-events: none; transform: translateY(-50%); transform-origin: left center; transition: transform var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease), top var(--rx-duration) var(--rx-ease); }
	.rx-select--floated .rx-select__label { top: .42rem; color: rgb(var(--rx-color)); transform: translateY(0) scale(.72); }
	.rx-select__chevron { position: absolute; right: .9rem; color: rgb(var(--rx-color)); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-select--open .rx-select__chevron { transform: rotate(180deg); }
	.rx-select__loader { position: absolute; right: 2.1rem; width: 1rem; height: 1rem; border: 2px solid rgb(var(--rx-color) / .3); border-top-color: rgb(var(--rx-color)); border-radius: 9999px; animation: rx-select-spin .7s linear infinite; }
	.rx-select__message { padding-left: .35rem; color: rgb(var(--rx-color)); font-size: .76rem; line-height: 1.25; }
	.rx-select__chips { display: flex; flex: 1; flex-wrap: wrap; gap: .3rem; padding: .65rem 4rem .35rem .65rem; }
	.rx-select--chips .rx-select__control { min-height: 3rem; }
	.rx-select--lg .rx-select__control { min-height: 3.5rem; font-size: 1rem; }
	.rx-select--size-default .rx-select__control { min-height: 3rem; font-size: .9rem; }
	.rx-select--sm .rx-select__control { min-height: 2.5rem; font-size: .82rem; }
	:global(.rx-select__control[data-disabled]), :global(.rx-select__control:disabled) { cursor: not-allowed; opacity: .55; }
	@keyframes rx-select-spin { to { transform: rotate(1turn); } }
	@media (prefers-reduced-motion: reduce) { .rx-select__control, .rx-select__control::after, .rx-select__label, .rx-select__chevron { transition-duration: 0ms; } .rx-select__loader { animation-duration: 1ms; animation-iteration-count: 1; } }
	:global(.rx-select__content) { z-index: 50; min-width: var(--bits-select-anchor-width); max-height: min(20rem, var(--bits-select-content-available-height)); overflow: auto; border: 1px solid rgb(var(--rx-border)); border-radius: var(--rx-radius); padding: .35rem; background: rgb(var(--rx-surface)); color: rgb(var(--rx-text)); box-shadow: 0 12px 30px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); transform-origin: var(--bits-select-content-transform-origin); animation: rx-select-in var(--rx-duration, 180ms) var(--rx-ease, ease) both; }
	:global(.rx-select__content[data-state='closed']) { animation-name: rx-select-out; }
	:global(.rx-select__item) { display: flex; align-items: center; gap: .55rem; padding: .55rem .65rem; border-radius: calc(var(--rx-radius) * .7); outline: 0; cursor: pointer; }
	:global(.rx-select__item[data-highlighted]) { color: rgb(var(--rx-color)); background: hsl(from rgb(var(--rx-color)) h s l / .13); }
	:global(.rx-select__item[data-disabled]) { opacity: .45; cursor: not-allowed; }
	:global(.rx-select__check) { width: 1rem; color: rgb(var(--rx-color)); font-weight: 800; }
	:global(.rx-select__group-heading) { padding: .5rem .65rem .25rem; color: rgb(var(--rx-text-muted)); font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
	@keyframes rx-select-in { from { opacity: 0; transform: scale(.96); } }
	@keyframes rx-select-out { to { opacity: 0; transform: scale(.96); } }
	@media (prefers-reduced-motion: reduce) { :global(.rx-select__content) { animation-duration: 1ms; } }
</style>
