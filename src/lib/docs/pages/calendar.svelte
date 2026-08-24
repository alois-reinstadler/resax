<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';
	import DemoSection from '../DemoSection.svelte';
	import { Calendar, DatePicker, type CalendarValue } from '$lib/registry/ui/calendar';
	let single = $state<CalendarValue>(new CalendarDate(2026, 8, 24));
	let multiple = $state<CalendarValue>([new CalendarDate(2026, 8, 4), new CalendarDate(2026, 8, 12)]);
	let range = $state<CalendarValue>({ start: new CalendarDate(2026, 8, 8), end: new CalendarDate(2026, 8, 14) });
	let picker = $state<CalendarValue>();
	const unavailable = (date: DateValue) => date.day === 11 || date.day === 18;
</script>

<div class="page-heading"><p class="eyebrow">Component</p><h1>Calendar</h1><p>Accessible date selection with single, multiple, range, and popover input experiences.</p></div>
<DemoSection title="Single and multiple" source={'<Calendar bind:value />\n<Calendar mode="multiple" bind:value />'}>
	<div class="calendar-demo" data-demo-section="single-multiple"><Calendar bind:value={single} /><Calendar mode="multiple" color="success" bind:value={multiple} /></div>
</DemoSection>
<DemoSection title="Range and two months" source={'<Calendar mode="range" numberOfMonths={2} bind:value />'}>
	<div class="calendar-demo" data-demo-section="range"><Calendar mode="range" color="warn" bind:value={range} /><Calendar mode="range" numberOfMonths={2} bind:value={range} /></div>
</DemoSection>
<DemoSection title="Limits and unavailable dates" source={'<Calendar minValue={min} maxValue={max} {isDateUnavailable} />'}>
	<div class="calendar-demo"><Calendar value={new CalendarDate(2026, 8, 15)} minValue={new CalendarDate(2026, 8, 5)} maxValue={new CalendarDate(2026, 9, 20)} isDateUnavailable={unavailable} color="danger" /><Calendar disabled value={new CalendarDate(2026, 8, 15)} /></div>
</DemoSection>
<DemoSection title="DatePicker states, sizes, and colors" source={'<DatePicker label="Appointment" state="success" message="Available" />'}>
	<div class="picker-demo" data-demo-section="date-picker"><DatePicker bind:value={picker} label="Appointment" placeholder="Choose a date" message="Pick your preferred day" /><DatePicker label="Approved" state="success" message="Available" size="lg" /><DatePicker label="Review date" state="warn" message="Confirmation required" /><DatePicker label="Deadline" state="danger" message="Date is required" size="sm" /></div>
</DemoSection>

<style>
	.calendar-demo { display: flex; align-items: flex-start; flex-wrap: wrap; gap: 1.25rem; }
	.picker-demo { display: grid; width: min(100%, 30rem); gap: 1rem; }
</style>
