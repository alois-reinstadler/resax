<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';
	import { Calendar, DatePicker, type CalendarValue } from '.';
	let { mode = 'single', unavailable = false, bounded = false, picker = false }: { mode?: 'single' | 'multiple' | 'range'; unavailable?: boolean; bounded?: boolean; picker?: boolean } = $props();
	function makeInitial(selectedMode: typeof mode): CalendarValue {
		return selectedMode === 'multiple'
		? [new CalendarDate(2025, 6, 15)]
		: selectedMode === 'range'
			? { start: new CalendarDate(2025, 6, 10), end: new CalendarDate(2025, 6, 10) }
			: new CalendarDate(2025, 6, 15);
	}
	// svelte-ignore state_referenced_locally -- test props are intentionally immutable after mount
	let value = $state<CalendarValue | undefined>(makeInitial(mode));
	let calls = $state(0);
	const blocked = (date: DateValue) => unavailable && date.day === 16;
	const text = $derived(Array.isArray(value) ? value.map(String).join(',') : value && 'start' in value ? `${value.start}/${value.end}` : String(value ?? ''));
</script>

{#if picker}
	<DatePicker bind:value {mode} minValue={bounded ? new CalendarDate(2025, 6, 1) : undefined}
		maxValue={bounded ? new CalendarDate(2025, 6, 30) : undefined} isDateUnavailable={blocked}
		label="Appointment" onValueChange={() => calls += 1} />
{:else}
	<Calendar bind:value {mode} minValue={bounded ? new CalendarDate(2025, 6, 1) : undefined}
		maxValue={bounded ? new CalendarDate(2025, 6, 30) : undefined} isDateUnavailable={blocked}
		onValueChange={() => calls += 1} />
{/if}
<output aria-label="calendar value">{text}</output>
<output aria-label="calendar calls">{calls}</output>
<button onclick={() => value = mode === 'multiple' ? [new CalendarDate(2025, 6, 20)] : new CalendarDate(2025, 6, 20)}>Set value</button>
