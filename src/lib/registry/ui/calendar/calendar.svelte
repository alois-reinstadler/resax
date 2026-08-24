<script lang="ts" module>
	import type { DateValue } from '@internationalized/date';
	import type { RxColor } from '$lib/registry/lib/color';

	export type CalendarValue = DateValue | DateValue[] | { start: DateValue; end: DateValue };
	export interface CalendarProps {
		value?: CalendarValue;
		mode?: 'single' | 'multiple' | 'range';
		color?: RxColor;
		minValue?: DateValue;
		maxValue?: DateValue;
		disabled?: boolean;
		isDateUnavailable?: (date: DateValue) => boolean;
		numberOfMonths?: number;
		onValueChange?: (value: CalendarValue | undefined) => void;
	}
</script>

<script lang="ts">
	import { Calendar as CalendarPrimitive, RangeCalendar } from 'bits-ui';
	import type { DateRange } from 'bits-ui';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { styleColor } from '$lib/registry/lib/color';
	import { RX_DURATION, RX_EASE } from '$lib/registry/lib/easing';

	let {
		value = $bindable(), mode = 'single', color, minValue, maxValue, disabled = false,
		isDateUnavailable, numberOfMonths = 1, onValueChange
	}: CalendarProps = $props();

	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --rx-duration: ${RX_DURATION.base}ms; --rx-ease: ${RX_EASE}`);
	const blockedDate = (date: DateValue) => isDateUnavailable?.(date) ?? false;
	function isRange(candidate: CalendarValue | undefined): candidate is { start: DateValue; end: DateValue } {
		return !!candidate && !Array.isArray(candidate) && 'start' in candidate;
	}
	function getSingle(): DateValue | undefined { return value && !Array.isArray(value) && !isRange(value) ? value : undefined; }
	function setSingle(next: DateValue | undefined) { value = next; onValueChange?.(next); }
	function getMultiple(): DateValue[] { return Array.isArray(value) ? value : []; }
	function setMultiple(next: DateValue[]) { value = next; onValueChange?.(next); }
	function getRange(): DateRange { return isRange(value) ? value : { start: undefined, end: undefined }; }
	function setRange(next: DateRange) {
		if (next.start && next.end) {
			value = next.start.compare(next.end) <= 0 ? { start: next.start, end: next.end } : { start: next.end, end: next.start };
			onValueChange?.(value);
		}
	}
</script>

{#snippet previous(Primitive: typeof CalendarPrimitive | typeof RangeCalendar)}
	<Primitive.PrevButton class="rx-calendar__nav" aria-label="Previous month"><ChevronLeft size={17} /></Primitive.PrevButton>
{/snippet}
{#snippet next(Primitive: typeof CalendarPrimitive | typeof RangeCalendar)}
	<Primitive.NextButton class="rx-calendar__nav" aria-label="Next month"><ChevronRight size={17} /></Primitive.NextButton>
{/snippet}

{#if mode === 'range'}
	<RangeCalendar.Root bind:value={getRange, setRange} {minValue} {maxValue} {disabled}
		isDateUnavailable={blockedDate} isDateDisabled={blockedDate} {numberOfMonths} weekdayFormat="short" fixedWeeks
		pagedNavigation={numberOfMonths > 1} class="rx-calendar" style={inlineStyle}>
		{#snippet children({ months, weekdays })}
			<RangeCalendar.Header class="rx-calendar__header">
				{@render previous(RangeCalendar)}<RangeCalendar.Heading class="rx-calendar__heading" />{@render next(RangeCalendar)}
			</RangeCalendar.Header>
			<div class="rx-calendar__months">
				{#each months as month (month.value.toString())}
					<RangeCalendar.Grid class="rx-calendar__grid">
						<RangeCalendar.GridHead><RangeCalendar.GridRow>{#each weekdays as day}<RangeCalendar.HeadCell class="rx-calendar__weekday">{day}</RangeCalendar.HeadCell>{/each}</RangeCalendar.GridRow></RangeCalendar.GridHead>
						<RangeCalendar.GridBody>{#each month.weeks as weekDates}<RangeCalendar.GridRow>{#each weekDates as date (date.toString())}<RangeCalendar.Cell {date} month={month.value} class="rx-calendar__cell"><RangeCalendar.Day class="rx-calendar__day" /></RangeCalendar.Cell>{/each}</RangeCalendar.GridRow>{/each}</RangeCalendar.GridBody>
					</RangeCalendar.Grid>
				{/each}
			</div>
		{/snippet}
	</RangeCalendar.Root>
{:else if mode === 'multiple'}
	<CalendarPrimitive.Root type="multiple" bind:value={getMultiple, setMultiple}
		{minValue} {maxValue} {disabled} isDateUnavailable={blockedDate} isDateDisabled={blockedDate}
		{numberOfMonths} weekdayFormat="short" fixedWeeks pagedNavigation={numberOfMonths > 1} class="rx-calendar" style={inlineStyle}>
		{#snippet children({ months, weekdays })}
			<CalendarPrimitive.Header class="rx-calendar__header">
				{@render previous(CalendarPrimitive)}<CalendarPrimitive.Heading class="rx-calendar__heading" />{@render next(CalendarPrimitive)}
			</CalendarPrimitive.Header>
			<div class="rx-calendar__months">
				{#each months as month (month.value.toString())}
					<CalendarPrimitive.Grid class="rx-calendar__grid">
						<CalendarPrimitive.GridHead><CalendarPrimitive.GridRow>{#each weekdays as day}<CalendarPrimitive.HeadCell class="rx-calendar__weekday">{day}</CalendarPrimitive.HeadCell>{/each}</CalendarPrimitive.GridRow></CalendarPrimitive.GridHead>
						<CalendarPrimitive.GridBody>{#each month.weeks as weekDates}<CalendarPrimitive.GridRow>{#each weekDates as date (date.toString())}<CalendarPrimitive.Cell {date} month={month.value} class="rx-calendar__cell"><CalendarPrimitive.Day class="rx-calendar__day" /></CalendarPrimitive.Cell>{/each}</CalendarPrimitive.GridRow>{/each}</CalendarPrimitive.GridBody>
					</CalendarPrimitive.Grid>
				{/each}
			</div>
		{/snippet}
	</CalendarPrimitive.Root>
{:else}
	<CalendarPrimitive.Root type="single" bind:value={getSingle, setSingle}
		{minValue} {maxValue} {disabled} isDateUnavailable={blockedDate} isDateDisabled={blockedDate}
		{numberOfMonths} weekdayFormat="short" fixedWeeks pagedNavigation={numberOfMonths > 1} class="rx-calendar" style={inlineStyle}>
		{#snippet children({ months, weekdays })}
			<CalendarPrimitive.Header class="rx-calendar__header">
				{@render previous(CalendarPrimitive)}<CalendarPrimitive.Heading class="rx-calendar__heading" />{@render next(CalendarPrimitive)}
			</CalendarPrimitive.Header>
			<div class="rx-calendar__months">
				{#each months as month (month.value.toString())}
					<CalendarPrimitive.Grid class="rx-calendar__grid">
						<CalendarPrimitive.GridHead><CalendarPrimitive.GridRow>{#each weekdays as day}<CalendarPrimitive.HeadCell class="rx-calendar__weekday">{day}</CalendarPrimitive.HeadCell>{/each}</CalendarPrimitive.GridRow></CalendarPrimitive.GridHead>
						<CalendarPrimitive.GridBody>{#each month.weeks as weekDates}<CalendarPrimitive.GridRow>{#each weekDates as date (date.toString())}<CalendarPrimitive.Cell {date} month={month.value} class="rx-calendar__cell"><CalendarPrimitive.Day class="rx-calendar__day" /></CalendarPrimitive.Cell>{/each}</CalendarPrimitive.GridRow>{/each}</CalendarPrimitive.GridBody>
					</CalendarPrimitive.Grid>
				{/each}
			</div>
		{/snippet}
	</CalendarPrimitive.Root>
{/if}

<style>
	:global(.rx-calendar) { display: inline-block; box-sizing: border-box; padding: 1rem; border: 1px solid rgb(var(--rx-border)); border-radius: calc(var(--rx-radius) * 1.35); color: rgb(var(--rx-text)); background: rgb(var(--rx-surface)); box-shadow: 0 12px 32px rgb(var(--rx-dark) / var(--rx-shadow-opacity)); }
	:global(.rx-calendar__header) { display: grid; grid-template-columns: 2rem 1fr 2rem; align-items: center; gap: .5rem; margin-bottom: .65rem; }
	:global(.rx-calendar__heading) { text-align: center; font-size: .9rem; font-weight: 700; }
	:global(.rx-calendar__nav) { display: inline-grid; width: 2rem; height: 2rem; place-items: center; border: 0; border-radius: calc(var(--rx-radius) * .65); color: rgb(var(--rx-text)); background: transparent; cursor: pointer; transition: color var(--rx-duration) var(--rx-ease), background var(--rx-duration) var(--rx-ease), transform var(--rx-duration) var(--rx-ease); }
	:global(.rx-calendar__nav:hover:not(:disabled)) { color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .12); transform: scale(1.06); }
	:global(.rx-calendar__nav:disabled) { opacity: .35; cursor: not-allowed; }
	:global(.rx-calendar__months) { display: flex; flex-wrap: wrap; gap: 1rem; }
	:global(.rx-calendar__grid) { border-collapse: collapse; border-spacing: 0; }
	:global(.rx-calendar__weekday) { width: 2.35rem; height: 1.8rem; color: rgb(var(--rx-text-muted)); font-size: .68rem; font-weight: 600; text-align: center; }
	:global(.rx-calendar__cell) { position: relative; width: 2.35rem; height: 2.35rem; padding: 0; text-align: center; }
	:global(.rx-calendar__day) { position: relative; z-index: 1; display: inline-grid; width: 2rem; height: 2rem; place-items: center; box-sizing: border-box; border: 1px solid transparent; border-radius: calc(var(--rx-radius) * .7); color: inherit; background: transparent; font: inherit; font-size: .78rem; cursor: pointer; transition: color var(--rx-duration) var(--rx-ease), background var(--rx-duration) var(--rx-ease), transform var(--rx-duration) var(--rx-ease), box-shadow var(--rx-duration) var(--rx-ease); }
	:global(.rx-calendar__day:hover:not([data-disabled])) { color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .13); transform: translateY(-1px); }
	:global(.rx-calendar__day[data-today]) { border-color: rgb(var(--rx-color)); }
	:global(.rx-calendar__day[data-selected]), :global(.rx-calendar__day[data-range-start]), :global(.rx-calendar__day[data-range-end]) { color: rgb(var(--rx-light)); border-color: rgb(var(--rx-color)); background: rgb(var(--rx-color)); box-shadow: 0 4px 12px rgb(var(--rx-color) / .24); }
	:global(.rx-calendar__cell:has(.rx-calendar__day[data-range-middle])) { background: rgb(var(--rx-color) / .13); }
	:global(.rx-calendar__day[data-range-middle]) { border-radius: 0; color: rgb(var(--rx-color)); background: rgb(var(--rx-color) / .13); }
	:global(.rx-calendar__day[data-outside-month]) { color: rgb(var(--rx-text-muted) / .45); }
	:global(.rx-calendar__day[data-disabled]), :global(.rx-calendar__day[data-unavailable]) { opacity: .35; text-decoration: line-through; cursor: not-allowed; }
	:global(.rx-calendar__day:focus-visible) { outline: 3px solid rgb(var(--rx-color) / .25); outline-offset: 1px; }
	:global(.rx-calendar[data-disabled]) { opacity: .55; }
	@media (prefers-reduced-motion: reduce) { :global(.rx-calendar__nav), :global(.rx-calendar__day) { transition-duration: 0ms; } }
</style>
