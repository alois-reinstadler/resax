<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { RxColor } from '$lib/registry/lib/color';
	import type { DateValue } from '@internationalized/date';
	import type { CalendarValue } from './calendar.svelte';

	export interface DatePickerProps {
		value?: CalendarValue;
		mode?: 'single' | 'multiple' | 'range';
		color?: RxColor;
		minValue?: DateValue;
		maxValue?: DateValue;
		disabled?: boolean;
		isDateUnavailable?: (date: DateValue) => boolean;
		numberOfMonths?: number;
		onValueChange?: (value: CalendarValue | undefined) => void;
		label?: string;
		placeholder?: string;
		state?: 'default' | 'success' | 'danger' | 'warn';
		message?: string | Snippet;
		size?: 'lg' | 'default' | 'sm';
	}
</script>

<script lang="ts">
	import { Popover } from 'bits-ui';
	import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { CalendarDays } from '@lucide/svelte';
	import Calendar from './calendar.svelte';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';

	let {
		value = $bindable(), mode = 'single', color, minValue, maxValue, disabled = false,
		isDateUnavailable, numberOfMonths = 1, onValueChange, label, placeholder = 'Select a date',
		state: validationState = 'default', message, size = 'default'
	}: DatePickerProps = $props();
	let open = $state(false);
	const uid = $props.id();
	const inputId = `${uid}-control`;
	const messageId = `${uid}-message`;
	const formatter = new DateFormatter('en-US', { dateStyle: 'medium' });
	const stateColor = $derived(validationState === 'default' ? color : validationState);
	const inlineStyle = $derived(`${styleColor(stateColor) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}`);
	const displayed = $derived.by(() => {
		if (!value) return '';
		if (Array.isArray(value)) return value.map((date) => formatter.format(date.toDate(getLocalTimeZone()))).join(', ');
		if ('start' in value) return `${formatter.format(value.start.toDate(getLocalTimeZone()))} – ${formatter.format(value.end.toDate(getLocalTimeZone()))}`;
		return formatter.format(value.toDate(getLocalTimeZone()));
	});
	function changed(next: CalendarValue | undefined) {
		value = next;
		onValueChange?.(next);
		if (mode === 'single' || (mode === 'range' && next && !Array.isArray(next) && 'end' in next)) open = false;
	}
</script>

<div class={`rx-date-picker rx-date-picker--${size}`} class:rx-date-picker--floated={open || !!displayed} style={inlineStyle}>
	<Popover.Root bind:open>
		<div class="rx-date-picker__control">
			<Popover.Trigger disabled={disabled}>
				{#snippet child({ props })}
					<input {...props} id={inputId} class="rx-date-picker__input" value={displayed} {placeholder} readonly {disabled}
						aria-invalid={validationState === 'danger' ? 'true' : undefined}
						aria-describedby={validationState === 'danger' && message ? messageId : undefined} />
				{/snippet}
			</Popover.Trigger>
			{#if label}<label for={inputId}>{label}</label>{/if}
			<CalendarDays class="rx-date-picker__icon" size={18} aria-hidden="true" />
		</div>
		<Popover.Portal>
			<Popover.Content class="rx-date-picker__popover" sideOffset={8}>
				<Calendar bind:value {mode} {color} {minValue} {maxValue} {disabled} {isDateUnavailable} {numberOfMonths} onValueChange={changed} />
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
	{#if message}<div id={messageId} class="rx-date-picker__message" aria-live="polite">{#if typeof message === 'string'}{message}{:else}{@render message()}{/if}</div>{/if}
</div>

<style>
	.rx-date-picker { display: inline-grid; width: 100%; gap: .3rem; color: rgb(var(--rx-text)); }
	.rx-date-picker__control { position: relative; display: flex; align-items: center; border-radius: var(--rx-radius); background: rgb(var(--rx-surface-2)); transition: box-shadow var(--rx-duration) var(--rx-ease); }
	.rx-date-picker__control::after { content: ''; position: absolute; inset: auto 0 0; height: 2px; border-radius: 9999px; background: rgb(var(--rx-color)); transform: scaleX(0); transition: transform var(--rx-duration) var(--rx-ease); }
	.rx-date-picker__control:focus-within::after { transform: scaleX(1); }
	.rx-date-picker__input { width: 100%; min-width: 0; box-sizing: border-box; border: 1px solid transparent; outline: 0; border-radius: inherit; padding: 1.05rem 2.7rem .42rem .9rem; color: inherit; background: transparent; font: inherit; cursor: pointer; }
	.rx-date-picker__input::placeholder { color: rgb(var(--rx-text-muted)); }
	.rx-date-picker label { position: absolute; left: .9rem; top: 50%; color: rgb(var(--rx-text-muted)); pointer-events: none; transform: translateY(-50%); transform-origin: left center; transition: transform var(--rx-duration) var(--rx-ease), color var(--rx-duration) var(--rx-ease), top var(--rx-duration) var(--rx-ease); }
	.rx-date-picker--floated label, .rx-date-picker__control:focus-within label { top: .42rem; color: rgb(var(--rx-color)); transform: translateY(0) scale(.72); }
	.rx-date-picker__icon { position: absolute; right: .9rem; color: rgb(var(--rx-color)); pointer-events: none; }
	.rx-date-picker__message { padding-left: .35rem; color: rgb(var(--rx-color)); font-size: .76rem; }
	.rx-date-picker--lg .rx-date-picker__input { min-height: 3.5rem; font-size: 1rem; }
	.rx-date-picker--default .rx-date-picker__input { min-height: 3rem; font-size: .9rem; }
	.rx-date-picker--sm .rx-date-picker__input { min-height: 2.5rem; font-size: .82rem; }
	.rx-date-picker__input:disabled { opacity: .55; cursor: not-allowed; }
	:global(.rx-date-picker__popover) { z-index: 50; transform-origin: var(--bits-popover-content-transform-origin); outline: none; animation: rx-date-picker-in var(--rx-duration) var(--rx-ease); }
	@keyframes rx-date-picker-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
	@media (prefers-reduced-motion: reduce) { .rx-date-picker__control, .rx-date-picker__control::after, .rx-date-picker label { transition-duration: 0ms; } :global(.rx-date-picker__popover) { animation-duration: 1ms; } }
</style>
