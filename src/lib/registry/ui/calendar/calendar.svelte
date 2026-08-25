<script lang="ts" module>
	import type { DateValue } from '@internationalized/date';
	import type { RxColor } from '$lib/registry/lib/color';
	export type CalendarValue = DateValue | DateValue[] | { start: DateValue; end: DateValue };
	export type CalendarVariant = 'base' | 'compact' | 'dots' | 'glow' | 'minimal' | 'range-fill';
	export interface CalendarProps {
		value?: CalendarValue; mode?: 'single' | 'multiple' | 'range'; variant?: CalendarVariant;
		color?: RxColor; size?: 'sm' | 'default' | 'lg'; radius?: 'none' | 'subtle' | 'rounded' | 'pill' | 'squircle';
		minValue?: DateValue; maxValue?: DateValue; disabled?: boolean; glow?: boolean;
		isDateUnavailable?: (date: DateValue) => boolean; events?: (date: DateValue) => boolean | number;
		numberOfMonths?: number; onValueChange?: (value: CalendarValue | undefined) => void;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Calendar as CalendarPrimitive, RangeCalendar } from 'bits-ui';
	import type { DateRange, Month } from 'bits-ui';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { styleColor } from '$lib/registry/lib/color';
	let {
		value = $bindable(), mode: requestedMode, variant = 'base', color, size = 'default', radius = 'rounded',
		minValue, maxValue, disabled = false, glow = true, isDateUnavailable, events, numberOfMonths = 1, onValueChange
	}: CalendarProps = $props();
	let shell: HTMLDivElement;
	let selection = $state({ x: 0, y: 0, width: 0, height: 0, visible: false });
	let hover = $state({ x: 0, y: 0, width: 0, height: 0, visible: false });
	let rangeBands = $state<Array<{ x: number; y: number; width: number; height: number; preview: boolean }>>([]);
	let draftRange = $state<DateRange>({ start: undefined, end: undefined });
	let rippleId = $state(0);
	let ripples = $state<Array<{ id: number; x: number; y: number; size: number }>>([]);
	let monthAnimationId = $state(0);
	let monthDirection = $state(1);
	let frame = 0;
	const mode = $derived(requestedMode ?? (variant === 'dots' ? 'multiple' : variant === 'range-fill' ? 'range' : 'single'));
	const selectionInk = $derived(color === 'success' || color === 'danger' || color === 'warn' ? '0 0 0' : color === 'dark' ? 'var(--rx-dark-contrast-rgb)' : !color || color === 'primary' ? '255 255 255' : 'var(--rx-color-contrast)');
	const inlineStyle = $derived(`${styleColor(color) ?? '--rx-color: var(--rx-primary)'}; --cal-selection-ink:${selectionInk}`);
	const blockedDate = (date: DateValue) => isDateUnavailable?.(date) ?? false;
	const eventCount = (date: DateValue) => Math.min(3, Math.max(0, Number(events?.(date) ?? 0)));
	function isRange(candidate: CalendarValue | undefined): candidate is { start: DateValue; end: DateValue } { return !!candidate && !Array.isArray(candidate) && 'start' in candidate; }
	function getSingle(): DateValue | undefined { return value && !Array.isArray(value) && !isRange(value) ? value : undefined; }
	function setSingle(next: DateValue | undefined) { value = next; onValueChange?.(next); scheduleOverlays(); }
	function getMultiple(): DateValue[] { return Array.isArray(value) ? value : []; }
	function setMultiple(next: DateValue[]) { value = next; onValueChange?.(next); scheduleOverlays(); }
	function getRange(): DateRange { return isRange(value) ? value : draftRange; }
	function setRange(next: DateRange) { draftRange = next; if (next.start && next.end) { value = next.start.compare(next.end) <= 0 ? { start: next.start, end: next.end } : { start: next.end, end: next.start }; draftRange = value; onValueChange?.(value); } scheduleOverlays(); }
	function scheduleOverlays() { cancelAnimationFrame(frame); frame = requestAnimationFrame(updateOverlays); }
	function boxFor(element: Element) { const host = shell.getBoundingClientRect(); const box = element.getBoundingClientRect(); return { x: box.left - host.left, y: box.top - host.top, width: box.width, height: box.height }; }
	function updateOverlays() {
		if (!shell) return;
		const selected = shell.querySelector('.rx-calendar__day[data-selected],.rx-calendar__day[data-range-start]');
		selection = selected && mode === 'single' ? { ...boxFor(selected), visible: true } : { ...selection, visible: false };
		rangeBands = [...shell.querySelectorAll('.rx-calendar__week')].flatMap((week) => {
				const days = [...week.querySelectorAll('.rx-calendar__day[data-range-start],.rx-calendar__day[data-range-middle],.rx-calendar__day[data-range-end],.rx-calendar__day[data-range-preview]')];
				if (!days.length) return [];
				const first = boxFor(days[0]); const last = boxFor(days[days.length - 1]);
				return [{ x: first.x + 3, y: first.y + 4, width: last.x + last.width - first.x - 6, height: first.height - 8, preview: days.some((day) => day.hasAttribute('data-range-preview')) }];
			});
	}
	function clearRangePreview() { for (const day of shell?.querySelectorAll('.rx-calendar__day[data-range-preview]') ?? []) day.removeAttribute('data-range-preview'); scheduleOverlays(); }
	function previewRange(day: Element | null) {
		for (const item of shell.querySelectorAll('.rx-calendar__day[data-range-preview]')) item.removeAttribute('data-range-preview');
		if (mode !== 'range' || isRange(value) || !day) return;
		const startNode = shell.querySelector('.rx-calendar__day[data-range-start],.rx-calendar__day[data-selected]');
		const hovered = day.getAttribute('data-value'); const start = draftRange.start?.toString() ?? startNode?.getAttribute('data-value'); if (!hovered || !start) return;
		const low = start < hovered ? start : hovered; const high = start < hovered ? hovered : start;
		for (const item of shell.querySelectorAll('.rx-calendar__day[data-value]')) { const date = item.getAttribute('data-value'); if (date && date >= low && date <= high && date !== start) item.setAttribute('data-range-preview',''); }
		scheduleOverlays();
	}
	function pointerMove(event: PointerEvent) {
		const box = shell.getBoundingClientRect(); shell.style.setProperty('--gx', `${event.clientX - box.left}px`); shell.style.setProperty('--gy', `${event.clientY - box.top}px`); shell.style.setProperty('--glow', '1');
		const day = (event.target as Element).closest('.rx-calendar__day');
		hover = day ? { ...boxFor(day), visible: !day.hasAttribute('data-selected') } : { ...hover, visible: false };
		previewRange(day);
	}
	function pointerDown(event: PointerEvent) {
		if (variant !== 'base') return;
		const day = (event.target as Element).closest('.rx-calendar__day'); if (!day) return;
		const box = boxFor(day); ripples = [...ripples.slice(-7), { id: ++rippleId, x: box.x + event.offsetX, y: box.y + event.offsetY, size: Math.max(box.width, box.height) * 2.2 }];
	}
	function navigate(direction: -1 | 1) { monthDirection = direction; monthAnimationId += 1; requestAnimationFrame(scheduleOverlays); }
	onMount(() => { const resize = new ResizeObserver(scheduleOverlays); resize.observe(shell); scheduleOverlays(); return () => { resize.disconnect(); cancelAnimationFrame(frame); }; });
	$effect(() => { value; variant; if (isRange(value)) draftRange = value; scheduleOverlays(); });
</script>

{#snippet previous(Primitive: typeof CalendarPrimitive | typeof RangeCalendar)}
	<Primitive.PrevButton class="rx-calendar__nav" aria-label="Previous month" onclick={() => navigate(-1)}><ChevronLeft size={17} /></Primitive.PrevButton>
{/snippet}
{#snippet next(Primitive: typeof CalendarPrimitive | typeof RangeCalendar)}
	<Primitive.NextButton class="rx-calendar__nav" aria-label="Next month" onclick={() => navigate(1)}><ChevronRight size={17} /></Primitive.NextButton>
{/snippet}
{#snippet overlays()}
	{#if mode === 'single' && (variant === 'base' || variant === 'compact' || variant === 'minimal')}
		<span class="rx-calendar__selection" class:is-visible={selection.visible} style={`--x:${selection.x}px;--y:${selection.y}px;--w:${selection.width}px;--h:${selection.height}px`} aria-hidden="true"></span>
	{/if}
	{#if variant === 'base'}<span class="rx-calendar__hover" class:is-visible={hover.visible} style={`--x:${hover.x}px;--y:${hover.y}px;--w:${hover.width}px;--h:${hover.height}px`} aria-hidden="true"></span>{/if}
		{#if variant === 'range-fill'}{#each rangeBands as band, index (index)}<span class="rx-calendar__range-band" class:is-preview={band.preview} style={`--x:${band.x}px;--y:${band.y}px;--w:${band.width}px;--h:${band.height}px`} aria-hidden="true"></span>{/each}{/if}
	{#each ripples as ripple (ripple.id)}<span class="rx-calendar__ripple" style={`left:${ripple.x}px;top:${ripple.y}px;width:${ripple.size}px;height:${ripple.size}px`} onanimationend={() => ripples = ripples.filter((entry) => entry.id !== ripple.id)} aria-hidden="true"></span>{/each}
{/snippet}
{#snippet monthGrid(Primitive: typeof CalendarPrimitive | typeof RangeCalendar, months: Month<DateValue>[], weekdays: string[])}
	<div class="rx-calendar__months" style={`--month-direction:${monthDirection}`}>
		{#each months as month (month.value.toString())}
			<Primitive.Grid class="rx-calendar__grid">
				<Primitive.GridHead><Primitive.GridRow class="rx-calendar__week"><!-- svelte-ignore a11y_consider_explicit_label -->{#each weekdays as day}<Primitive.HeadCell class="rx-calendar__weekday">{day}</Primitive.HeadCell>{/each}</Primitive.GridRow></Primitive.GridHead>
				<Primitive.GridBody>{#each month.weeks as weekDates}<Primitive.GridRow class="rx-calendar__week">{#each weekDates as date (date.toString())}<Primitive.Cell {date} month={month.value} class={`rx-calendar__cell${eventCount(date) ? ' has-events' : ''}`}><Primitive.Day class="rx-calendar__day" />{#if variant === 'dots' && eventCount(date)}<span class="rx-calendar__events" aria-hidden="true">{#each Array(eventCount(date)) as _}<i></i>{/each}</span>{/if}</Primitive.Cell>{/each}</Primitive.GridRow>{/each}</Primitive.GridBody>
			</Primitive.Grid>
		{/each}
	</div>
{/snippet}

	<div bind:this={shell} class={`rx-calendar-shell rx-calendar-shell--${variant} rx-calendar-shell--${size} rx-calendar-shell--r-${radius} rx-calendar-shell--mode-${mode}`} class:no-glow={!glow} style={inlineStyle} data-variant={variant} role="group" aria-label="Calendar" onpointermove={pointerMove} onpointerleave={() => { shell?.style.setProperty('--glow', '0'); hover.visible = false; clearRangePreview(); }} onpointerdown={pointerDown}>
	<span class="rx-calendar__surface-glow" aria-hidden="true"></span>
	{#if mode === 'range'}
		<RangeCalendar.Root bind:value={getRange, setRange} {minValue} {maxValue} {disabled} isDateUnavailable={blockedDate} isDateDisabled={blockedDate} {numberOfMonths} weekdayFormat="short" fixedWeeks pagedNavigation={numberOfMonths > 1} class="rx-calendar">
			{#snippet children({ months, weekdays })}<RangeCalendar.Header class="rx-calendar__header">{@render previous(RangeCalendar)}<RangeCalendar.Heading class="rx-calendar__heading" />{@render next(RangeCalendar)}</RangeCalendar.Header>{#key monthAnimationId}{@render monthGrid(RangeCalendar, months, weekdays)}{/key}{/snippet}
		</RangeCalendar.Root>
	{:else if mode === 'multiple'}
		<CalendarPrimitive.Root type="multiple" bind:value={getMultiple, setMultiple} {minValue} {maxValue} {disabled} isDateUnavailable={blockedDate} isDateDisabled={blockedDate} {numberOfMonths} weekdayFormat="short" fixedWeeks pagedNavigation={numberOfMonths > 1} class="rx-calendar">
			{#snippet children({ months, weekdays })}<CalendarPrimitive.Header class="rx-calendar__header">{@render previous(CalendarPrimitive)}<CalendarPrimitive.Heading class="rx-calendar__heading" />{@render next(CalendarPrimitive)}</CalendarPrimitive.Header>{#key monthAnimationId}{@render monthGrid(CalendarPrimitive, months, weekdays)}{/key}{/snippet}
		</CalendarPrimitive.Root>
	{:else}
		<CalendarPrimitive.Root type="single" bind:value={getSingle, setSingle} {minValue} {maxValue} {disabled} isDateUnavailable={blockedDate} isDateDisabled={blockedDate} {numberOfMonths} weekdayFormat="short" fixedWeeks pagedNavigation={numberOfMonths > 1} class="rx-calendar">
			{#snippet children({ months, weekdays })}<CalendarPrimitive.Header class="rx-calendar__header">{@render previous(CalendarPrimitive)}<CalendarPrimitive.Heading class="rx-calendar__heading" />{@render next(CalendarPrimitive)}</CalendarPrimitive.Header>{#key monthAnimationId}{@render monthGrid(CalendarPrimitive, months, weekdays)}{/key}{/snippet}
		</CalendarPrimitive.Root>
	{/if}
	{@render overlays()}
</div>

<style>
	.rx-calendar-shell { --cal-cell: 38px; --cal-panel-r: 18px; --cal-day-r: 12px; position: relative; isolation: isolate; display: inline-block; width: max-content; border-radius: var(--cal-panel-r); color: rgb(var(--rx-text)); background: rgb(var(--rx-surface)); box-shadow: 0 12px 40px rgb(var(--rx-dark) / .5); }
	.rx-calendar-shell--sm { --cal-cell: 32px; --cal-panel-r: 14px; font-size: .8125rem; }
	.rx-calendar-shell--lg { --cal-cell: 44px; --cal-panel-r: 20px; font-size: .9375rem; }
	.rx-calendar-shell--r-none { --cal-panel-r: 0; --cal-day-r: 6px; }
	.rx-calendar-shell--r-subtle { --cal-panel-r: 8px; --cal-day-r: 8px; }
	.rx-calendar-shell--r-rounded { --cal-panel-r: 14px; --cal-day-r: 11px; }
	.rx-calendar-shell--r-pill { --cal-panel-r: 20px; --cal-day-r: 999px; }
	:global(.rx-calendar) { position: relative; z-index: 2; display: inline-block; box-sizing: border-box; padding: 12px; border: 0; border-radius: inherit; color: inherit; background: transparent; }
	:global(.rx-calendar__header) { display: grid; grid-template-columns: 30px 1fr 30px; align-items: center; gap: .5rem; margin-bottom: 6px; }
	:global(.rx-calendar__heading) { text-align: center; font-size: .875rem; font-weight: 600; text-transform: capitalize; letter-spacing: -.01em; }
	:global(.rx-calendar__nav) { display: inline-grid; width: 30px; height: 30px; place-items: center; border: 0; border-radius: 9px; color: rgb(var(--rx-text-secondary)); background: transparent; cursor: pointer; transition: color 140ms ease, background-color 140ms ease, transform 160ms cubic-bezier(.34,1.56,.64,1); }
	:global(.rx-calendar__nav:hover:not(:disabled)) { color: rgb(var(--rx-text)); background: rgb(var(--rx-text) / .06); }
	:global(.rx-calendar__nav:active:not(:disabled)) { transform: scale(.88); }
	:global(.rx-calendar__nav:disabled) { opacity: .35; cursor: not-allowed; }
	:global(.rx-calendar__months) { display: flex; flex-wrap: wrap; gap: 1rem; animation: rx-calendar-month 460ms cubic-bezier(.34,1.56,.64,1); }
	:global(.rx-calendar__grid) { border-collapse: collapse; border-spacing: 0; outline: none; }
	:global(.rx-calendar__weekday) { width: var(--cal-cell); height: 28px; color: rgb(var(--rx-text-secondary)); font-size: 11px; font-weight: 600; text-align: center; text-transform: uppercase; letter-spacing: .04em; }
	:global(.rx-calendar__cell) { position: relative; width: var(--cal-cell); height: var(--cal-cell); padding: 0; text-align: center; }
	:global(.rx-calendar__day) { position: relative; z-index: 3; display: inline-grid; width: var(--cal-cell); height: var(--cal-cell); place-items: center; box-sizing: border-box; border: 0; border-radius: var(--cal-day-r); color: inherit; background: transparent; font: inherit; font-size: calc(1em - 1px); cursor: pointer; transition: background-color 160ms ease, color 160ms ease, transform 200ms cubic-bezier(.34,1.56,.64,1), box-shadow 200ms ease; }
	:global(.rx-calendar__day:hover:not([data-disabled]):not([data-selected])) { background: rgb(var(--rx-text) / .06); }
	:global(.rx-calendar__day:active:not([data-disabled])) { transform: scale(.9); }
	:global(.rx-calendar__day[data-today])::after { content: ''; position: absolute; bottom: 5px; left: 50%; z-index: 1; width: 3px; height: 3px; border-radius: 50%; translate: -50% 0; background: currentColor; }
	:global(.rx-calendar__day[data-selected]), :global(.rx-calendar__day[data-range-start]), :global(.rx-calendar__day[data-range-end]) { z-index: 4; color: rgb(var(--cal-selection-ink)); background: rgb(var(--rx-color)); }
	/* Keep the destination chip atomic while the separate source motion layer travels into place. */
	.rx-calendar-shell--mode-single:is(.rx-calendar-shell--base,.rx-calendar-shell--compact) :global(.rx-calendar__day[data-selected]) { background: rgb(var(--rx-color)); }
	.rx-calendar-shell--mode-single.rx-calendar-shell--minimal :global(.rx-calendar__day[data-selected]) { background: transparent; }
	:global(.rx-calendar__day[data-range-middle]) { border-radius: 0; color: rgb(var(--rx-text)); background: rgb(var(--rx-color) / .1); }
	:global(.rx-calendar__day[data-range-preview]) { border-radius: 0; background: rgb(var(--rx-color) / .06); }
	:global(.rx-calendar__day[data-outside-month]) { opacity: .3; }
	:global(.rx-calendar__day[data-disabled]), :global(.rx-calendar__day[data-unavailable]) { opacity: .22; text-decoration: line-through; cursor: not-allowed; }
	:global(.rx-calendar__day:focus-visible) { outline: 2px solid rgb(var(--rx-color)); outline-offset: -2px; }
	.rx-calendar__surface-glow { position: absolute; inset: -1px; z-index: 5; border-radius: inherit; padding: 1px; pointer-events: none; background: radial-gradient(90px circle at var(--gx,50%) var(--gy,50%), rgb(var(--rx-light)/.4), rgb(var(--rx-light)/.2) 38%, transparent 72%), radial-gradient(240px circle at var(--gx,50%) var(--gy,50%), rgb(var(--rx-light)/.3), rgb(var(--rx-light)/.1) 45%, transparent 82%); mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; opacity: calc(var(--glow,0) * .8); transition: opacity 140ms; }
	.rx-calendar__hover, .rx-calendar__selection { position: absolute; z-index: 2; left: 0; top: 0; width: var(--w); height: var(--h); border-radius: var(--cal-day-r); opacity: 0; transform: translate(var(--x),var(--y)); pointer-events: none; }
	.rx-calendar__hover { background: rgb(var(--rx-text) / .06); transition: transform 280ms cubic-bezier(.34,1.56,.64,1), opacity 180ms ease; }
	.rx-calendar__selection { z-index: 3; background: rgb(var(--rx-color)); transition: transform 400ms cubic-bezier(.34,1.4,.64,1), opacity 200ms ease; }
	.rx-calendar__hover.is-visible, .rx-calendar__selection.is-visible { opacity: 1; }
	.rx-calendar__selection.is-visible { animation: rx-calendar-select 460ms cubic-bezier(.34,1.4,.64,1); }
	.rx-calendar__ripple { position: absolute; z-index: 3; border-radius: 50%; translate: -50% -50%; background: radial-gradient(circle, rgb(var(--rx-color)/.3), rgb(var(--rx-color)/.16) 30%, rgb(var(--rx-color)/.06) 55%, transparent 76%); pointer-events: none; animation: rx-calendar-ripple 620ms cubic-bezier(.22,1,.36,1) forwards; }

	/* compact source geometry and its 320ms moving pill. */
	.rx-calendar-shell--compact { --cal-cell: 30px; --cal-day-r: 8px; box-shadow: 0 12px 40px rgb(var(--rx-dark)/.5); }
	.rx-calendar-shell--compact.rx-calendar-shell--sm { --cal-cell: 26px; --cal-day-r: 7px; }
	.rx-calendar-shell--compact.rx-calendar-shell--lg { --cal-cell: 36px; --cal-day-r: 10px; }
	.rx-calendar-shell--compact :global(.rx-calendar) { padding: 8px; }
	.rx-calendar-shell--compact :global(.rx-calendar__header) { grid-template-columns: 24px 1fr 24px; }
	.rx-calendar-shell--compact :global(.rx-calendar__nav) { width: 24px; height: 24px; border-radius: 7px; }
	.rx-calendar-shell--compact :global(.rx-calendar__weekday) { height: 20px; font-size: 10px; }
	.rx-calendar-shell--compact .rx-calendar__selection { transition: transform 320ms cubic-bezier(.34,1.5,.64,1), opacity 180ms ease; }
	.rx-calendar-shell--compact :global(.rx-calendar__day:active:not([data-disabled])) { transform: scale(.88); }

	/* dots source: selection/event markers replace solid single-day chips. */
	.rx-calendar-shell--dots :global(.rx-calendar__day[data-selected]) { color: rgb(var(--rx-text)); background: transparent; }
	.rx-calendar-shell--dots :global(.rx-calendar__day[data-selected])::before { content: ''; position: absolute; bottom: 5px; width: 5px; height: 5px; border-radius: 50%; background: rgb(var(--rx-color)); animation: rx-calendar-dot 260ms cubic-bezier(.34,1.8,.36,1); }
	.rx-calendar__events { position: absolute; z-index: 5; inset: auto 4px 2px; display: flex; justify-content: center; gap: 2px; pointer-events: none; }
	.rx-calendar__events i { width: 4px; height: 4px; border-radius: 50%; background: rgb(var(--rx-color)); animation: rx-calendar-event 280ms cubic-bezier(.34,1.8,.36,1) forwards; }

	/* selected glow is a static base plus separately composited 2s pulse. */
	.rx-calendar-shell--glow :global(.rx-calendar__day[data-selected]), .rx-calendar-shell--glow :global(.rx-calendar__day[data-range-start]), .rx-calendar-shell--glow :global(.rx-calendar__day[data-range-end]) { box-shadow: 0 0 6px rgb(var(--rx-color)/.55); }
	.rx-calendar-shell--glow :global(.rx-calendar__day[data-selected])::before, .rx-calendar-shell--glow :global(.rx-calendar__day[data-range-start])::before, .rx-calendar-shell--glow :global(.rx-calendar__day[data-range-end])::before { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: 0 0 16px 4px rgb(var(--rx-color)/.7); opacity: 0; animation: rx-calendar-glow 2s ease-in-out infinite; }
	.rx-calendar-shell--glow.no-glow :global(.rx-calendar__day[data-selected]) { box-shadow: none; }
	.rx-calendar-shell--glow.no-glow :global(.rx-calendar__day[data-selected])::before { display: none; }

	/* minimal source: flat surface and a moving 2px selection underline. */
	.rx-calendar-shell--minimal { background: transparent; box-shadow: none; }
	.rx-calendar-shell--minimal :global(.rx-calendar) { padding: 8px 4px; }
	.rx-calendar-shell--minimal :global(.rx-calendar__day[data-selected]) { color: color-mix(in srgb, rgb(var(--rx-color)) 45%, rgb(var(--rx-text))); background: transparent; }
	.rx-calendar-shell--minimal .rx-calendar__selection { top: calc(var(--h) - 7px); width: calc(var(--w) - 12px); height: 2px; margin-left: 6px; border-radius: 2px; transition: transform 340ms cubic-bezier(.34,1.4,.64,1), opacity 200ms ease; }

	/* one measured spanning fill per week, with source sheen and grow. */
	.rx-calendar-shell--range-fill :global(.rx-calendar__day[data-range-middle]) { z-index: 4; background: transparent; }
	.rx-calendar__range-band { position: absolute; z-index: 3; left: 0; top: 0; width: var(--w); height: var(--h); border-radius: var(--cal-day-r); transform: translate(var(--x),var(--y)); transform-origin: center; background: linear-gradient(110deg, transparent 0 35%, rgb(var(--rx-color)/.55) 48%, transparent 61%) 200% 0 / 220% 100%, rgb(var(--rx-color)/.22); pointer-events: none; animation: rx-calendar-sheen 2600ms linear infinite, rx-calendar-range-grow 380ms cubic-bezier(.22,1,.36,1); }
	.rx-calendar__range-band.is-preview { opacity: .6; }

	@keyframes rx-calendar-select { 38% { scale: 1.086; } }
	@keyframes rx-calendar-month { from { opacity: 0; transform: translateX(calc(var(--month-direction) * 42px)) scale(.92); filter: blur(9px); } }
	@keyframes rx-calendar-ripple { from { transform: scale(0); opacity: .8; } to { transform: scale(1); opacity: 0; } }
	@keyframes rx-calendar-dot { from { transform: scale(0); } to { transform: scale(1); } }
	@keyframes rx-calendar-event { from { transform: scale(0); } to { transform: scale(1); } }
	@keyframes rx-calendar-glow { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
	@keyframes rx-calendar-sheen { to { background-position: -60% 0; } }
	@keyframes rx-calendar-range-grow { from { transform: translate(var(--x),var(--y)) scaleX(.4); opacity: 0; } }
	@media (prefers-reduced-motion: reduce) {
		:global(.rx-calendar__months), :global(.rx-calendar__nav), :global(.rx-calendar__day), .rx-calendar__surface-glow, .rx-calendar__hover, .rx-calendar__selection, .rx-calendar__events i, .rx-calendar__range-band { transition: none; animation: none !important; }
		.rx-calendar__ripple { display: none; }
		.rx-calendar-shell--glow :global(.rx-calendar__day[data-selected]) { box-shadow: 0 0 8px 1px rgb(var(--rx-color)/.55); }
		.rx-calendar-shell--glow :global(.rx-calendar__day[data-selected])::before { display: none; }
	}
</style>
